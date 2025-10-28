import Editor from '@monaco-editor/react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CopyIcon } from './icons/CopyIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { InfoIcon } from './icons/InfoIcon';
import { LANGUAGE_DETAILS } from '../constants';

interface ComparisonPanelProps {
  modelName: string;
  content: string;
  isLoading: boolean;
  error: string | null;
  language: string;
}

const extractCode = (markdown: string) => {
    const codeBlockRegex = /```(?:\w*\n)?([\s\S]*?)```/;
    const match = markdown.match(codeBlockRegex);
    return match ? match[1].trim() : markdown;
};

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ modelName, content, isLoading, error, language }) => {
    const [copied, setCopied] = useState(false);
    
    useEffect(() => {
        if (copied) {
          const timer = setTimeout(() => setCopied(false), 2000);
          return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        if (!content) return;
        navigator.clipboard.writeText(extractCode(content));
        setCopied(true);
    };
    
    const handleDownload = () => {
        const languageDetails = LANGUAGE_DETAILS[language];
        let filename = `generated_code_${modelName}.txt`;
        let mimeType = 'text/plain';

        if (languageDetails) {
            filename = `generated_code_${modelName}.${languageDetails.extension}`;
            mimeType = languageDetails.mime;
        }
        
        const blob = new Blob([extractCode(content)], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                    <SpinnerIcon className="w-8 h-8 animate-spin text-red-500" />
                    <p className="mt-2 text-sm">Waiting for {modelName}...</p>
                </div>
            )
        }
        if (error) {
            return (
                <div className="flex items-center justify-center h-full p-2">
                    <div className="bg-red-900/30 border border-red-800 text-red-300 px-3 py-2 rounded-lg text-center text-sm">
                        <strong className="font-bold block mb-1">Error</strong>
                        <span>{error}</span>
                    </div>
                </div>
            )
        }
        if (!content) {
            return (