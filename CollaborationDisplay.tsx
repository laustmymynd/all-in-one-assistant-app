import Editor from '@monaco-editor/react';
import { CollaborationTurn } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface CollaborationDisplayProps {
    collaborationResult: CollaborationTurn[] | null;
    isLoading: boolean;
    language: string;
}

const CollaborationDisplay: React.FC<CollaborationDisplayProps> = ({ collaborationResult, isLoading, language }) => {
    if (isLoading) {
        return null;
    }

    if (!collaborationResult || collaborationResult.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-zinc-600 text-center p-4">
                <InfoIcon className="w-12 h-12 mb-4" />
                <p className="text-lg font-medium text-zinc-400">Collaboration Results</p>
                <p className="text-sm max-w-sm">The collaborative code refinement will appear here.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            {collaborationResult.map((turn, index) => (
                <div key={index} className="border border-zinc-800 rounded-lg bg-zinc-900/50">
                    <h3 className="text-md font-bold text-zinc-200 capitalize p-3 bg-zinc-800/50 rounded-t-lg border-b border-zinc-800">
                        Turn {turn.turn}: Suggestion from {turn.model.replace(/gemini-2.5-|gemma-2-|-it/g, '')}
                    </h3>
                    <div className="h-64">
                         <Editor
                            height="100%"
                            language={language.toLowerCase()}
                            value={turn.suggestion}
                            theme="vs-dark"
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollaborationDisplay;