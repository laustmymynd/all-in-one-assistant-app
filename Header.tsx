import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface HeaderProps {
  onToggleSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSettings }) => {
  return (
    <header className="p-4 border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-lg sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <SparklesIcon className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">All-in-One Digital Assistant</h1>
        </div>
        <nav className="flex items-center gap-2">
            <a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">
                API Docs
            </a>
             <button onClick={onToggleSettings} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Settings">
                <SettingsIcon className="w-5 h-5" />
            </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;