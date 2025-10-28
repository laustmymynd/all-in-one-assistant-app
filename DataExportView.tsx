import { Interaction } from '../types';
import { exportHistoryAsJSON, exportHistoryAsMarkdown } from '../utils/export';
import { DownloadIcon } from './icons/DownloadIcon';

interface DataExportViewProps {
  history: Interaction[];
}

const DataExportView: React.FC<DataExportViewProps> = ({ history }) => {
  return (
    <div className="p-4 text-zinc-300">
      <h3 className="text-lg font-semibold text-zinc-100 mb-4">Export Session History</h3>
      <p className="text-sm mb-6">
        Download your complete interaction history in one of the formats below. This is useful for archiving, sharing, or further analysis.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => exportHistoryAsJSON(history)}
          disabled={history.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Export as JSON</span>
        </button>
        <button
          onClick={() => exportHistoryAsMarkdown(history)}
          disabled={history.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Export as Markdown</span>
        </button>
      </div>
       {history.length === 0 && (
        <p className="text-sm text-zinc-500 mt-4">No history to export yet.</p>
      )}
    </div>
  );
};

export default DataExportView;
