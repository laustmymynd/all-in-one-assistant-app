import { ComparisonTurn, DebateTurn, CollaborationTurn, AnalysisTurn, AssistantResult } from '../types';

// Per guidelines, API key must be from process.env.API_KEY
// and the client should be initialized with it directly.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });


const generateContent = async (model: string, prompt: string, webSearchEnabled?: boolean): Promise<AssistantResult> => {
    try {
        const ai = getAI();
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: webSearchEnabled ? { tools: [{googleSearch: {}}] } : {},
        });
        return {
            text: response.text,
            groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks,
        };
    } catch (error: any) {
        console.error(`Error generating content with ${model}:`, error);
        let message = 'An unknown error occurred.';
        if (error instanceof Error) {
            message = error.message;
            if (message.includes('API key not valid')) {
                message = 'The API key is not valid. Please check your configuration.';
            } else if (message.includes('429')) { // Too Many Requests
                message = 'The model is currently overloaded with requests. Please try again in a few moments.';
            } else if (message.toLowerCase().includes('quota')) {
                message = 'You have exceeded your API quota. Please check your usage limits.';
            } else if (message.toLowerCase().includes('safety')) {
                message = 'The response was blocked due to safety settings. Please adjust your prompt.';
            }
        } else if (typeof error === 'string') {
            message = error;
        }

        throw new Error(`[${model}] ${message}`);
    }
};

export const runAssistant = (model: string, code: string, language: string, action: string, persona: string, webSearchEnabled?: boolean): Promise<AssistantResult> => {
    let prompt = `
        You are a ${persona}.
        Your task is to ${action} the following ${language} code.
        Provide a detailed and helpful response. Format your response using Markdown.
    `;

    if (webSearchEnabled) {
        prompt += `
If relevant, use Google Search to find the most current information. Cite your sources.`;
    }

    prompt += `
        \`\`\`${language}
        ${code}
        \`\`\`
    `;
    return generateContent(model, prompt, webSearchEnabled);
};

export const runComparison = async (models: string[], code: string, language: string, action: string, persona: string): Promise<ComparisonTurn[]> => {
    const results: ComparisonTurn[] = await Promise.all(models.map(async (model) => {
        try {
            const { text: output } = await runAssistant(model, code, language, action, persona);
            return { model, output };
        } catch (error) {
            console.error(`Error with model ${model} in comparison:`, error);
            return { model, output: '', error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }));
    return results;
};

export const runDebate = async (models: string[], code: string, language: string, action: string, persona: string): Promise<{ turns: DebateTurn[], synthesis: string }> => {
    if (models.length < 2) {
        throw new Error("Debate mode requires at least two models.");
    }
    