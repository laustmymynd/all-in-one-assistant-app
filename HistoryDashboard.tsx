import { Interaction } from '../types';
import TimelineView from './TimelineView';
import KnowledgeGraph from './KnowledgeGraph';
import DataExportView from './DataExportView';
import { HistoryIcon } from './icons/HistoryIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface HistoryDashboardProps {
  history: Interaction[];
  onRestore: (item: Interaction) => void;
  onClearHistory: () => void;
}

type DashboardView = 'timeline' | 'graph' | 'export';

const HistoryDashboard: React.FC<HistoryDashboardProps> = ({ history, onRestore, onClearHistory }) => {
  const [view, setView] = useState<DashboardView>('timeline');

  const navItems = [
    { id: 'timeline', label: 'Timeline', icon: HistoryIcon },
    { id: 'graph', label: 'Knowledge Graph', icon: BrainCircuitIcon },
    { id: 'export', label: 'Export', icon: DownloadIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-zinc-950/50">
      <div className="p-2 border-b border-zinc-800 flex items-center justify-between">
        <nav className="flex items-center gap-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as DashboardView)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                view === item.id
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button 
          onClick={onClearHistory} 
          disabled={history.length === 0}
          className="text-xs text-zinc-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear History
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {view === 'timeline' && <TimelineView history={history} onRestore={onRestore} />}
        {view === 'graph' && <KnowledgeGraph history={history} onRestore={onRestore} />}
        {view === 'export' && <DataExportView history={history} />}
      </div>
    </div>
  );
};

export default HistoryDashboard;
