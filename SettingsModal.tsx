import { AVAILABLE_MODELS, GEMMA_MODELS, MODEL_PRESETS } from '../constants';
import { ModelSelection, InteractionMode } from '../types';
import { XIcon } from './icons/XIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ModelSelection;
  onSettingsChange: (newSettings: ModelSelection) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;

  const handleModelChange = (mode: InteractionMode, model: string, isMultiSelect: boolean) => {
    const currentSelection = settings[mode];
    let newSelection: string | string[];

    if (isMultiSelect) {
      const currentArray = Array.isArray(currentSelection) ? currentSelection : (currentSelection ? [currentSelection] : []);
      if (currentArray.includes(model)) {
        newSelection = currentArray.filter(m => m !== model);
      } else {
        newSelection = [...currentArray, model];
      }
      if (newSelection.length === 0) {
        return;
      }
    } else {
      newSelection = model;
    }

    onSettingsChange({ ...settings, [mode]: newSelection });
  };

  const handleApplySingleModel = (model: string) => {
    if (!model) return;
    const newSettings: ModelSelection = {
        assistant: model,
        comparison: [model, model],
        debate: [model, model],
        collaboration: [model, model],
        analysis: [model, model],
        'scholarly-review': model,
    };
    onSettingsChange(newSettings);
  };
  
  const allModels = [...AVAILABLE_MODELS, ...GEMMA_MODELS];

  const renderSingleSelect = (mode: InteractionMode, label: string) => (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      <select
        value={settings[mode] || allModels[0]}
        onChange={(e) => handleModelChange(mode, e.target.value, false)}
        className="bg-zinc-800 border border-zinc-700 text-white text-sm rounded-md focus:ring-orange-500 focus:border-orange-500 block w-full p-2"
      >
        {allModels.map(model => <option key={model} value={model}>{model}</option>)}
      </select>
    </div>
  );

  const renderMultiSelect = (mode: InteractionMode, label: string) => {
    const selected = Array.isArray(settings[mode]) ? settings[mode] : (settings[mode] ? [settings[mode]] : []);
    return (
        <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">{label} (select one or more)</label>
            <div className="grid grid-cols-2 gap-2">
                {allModels.map(model => (
                    <button
                        key={model}
                        onClick={() => handleModelChange(mode, model, true)}
                        className={`text-left p-2 text-sm rounded-md transition-colors ${selected.includes(model) ? 'bg-orange-600 text-white ring-2 ring-orange-400' : 'bg-zinc-700 hover:bg-zinc-600'}`}
                    >
                        {model}
                    </button>
                ))}
            </div>
        </div>
    )
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Model Settings</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-3">Quick Configuration</h3>
            <div className="space-y-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div>
                    <label htmlFor="single-model-select" className="block text-sm font-medium text-zinc-300 mb-2">Apply Single Model to All Modes</label>