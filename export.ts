import { Interaction } from '../types';

const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const exportHistoryAsJSON = (history: Interaction[]) => {
    const content = JSON.stringify(history, null, 2);
    downloadFile('assistant-history.json', content, 'application/json');
};

export const exportHistoryAsMarkdown = (history: Interaction[]) => {
    const content = history.map(item => {
        let resultText = '';
        if (item.error) {
            resultText = `**Error:** ${item.error}`;
        } else if (typeof item.result === 'string') {
            resultText = item.result;
        } else if (item.result && 'turns' in item.result) { // Debate
            resultText = `**Synthesis:**\n${item.result.synthesis}\n\n` + item.result.turns.map(t => `**${t.model}**\n*Initial:* ${t.initialResponse}\n*Rebuttal:* ${t.rebuttal}`).join('\n\n');
        } else if (Array.isArray(item.result)) { // Comparison, Collaboration, Analysis
            resultText = (item.result as any[]).map(r => {
                if ('model' in r && 'output' in r) return `**${r.model} Output:**\n${r.output}`; // Comparison
                if ('model' in r && 'suggestion' in r) return `**Turn ${r.turn} (${r.model}):**\n\`\`\`\n${r.suggestion}\n\`\`\``; // Collaboration
                if ('model' in r && 'analysis' in r) return `**${r.model} Analysis:**\n${r.analysis}`; // Analysis
                return '';
            }).join('\n\n---\n\n');
        }

        return `
## Interaction on ${new Date(item.timestamp).toLocaleString()}

- **Mode:** ${item.mode}
- **Action:** ${item.action}
- **Language:** ${item.language}
- **Persona:** ${item.persona}

### Input Code
\`\`\`${item.language}
${item.code}
\`\`\`

### Output
${resultText}

---
        `;
    }).join('\n');

    downloadFile('assistant-history.md', content, 'text/markdown');
};
