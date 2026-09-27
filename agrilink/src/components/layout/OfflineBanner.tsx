import React from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBanner: React.FC = () => {
  const { connectivity, outbox, isSyncing, syncOutbox, setIsOutboxModalOpen } = useApp();

  if (connectivity === 'online' && !isSyncing) {
    return null;
  }

  return (
    <div className="bg-amber-600/95 text-white px-3.5 py-2 text-xs flex items-center justify-between shadow-md transition-all">
      <div className="flex items-center gap-2 font-medium">
        {isSyncing ? (
          <RefreshCw className="w-4 h-4 animate-spin text-amber-100" />
        ) : (
          <WifiOff className="w-4 h-4 text-amber-200" />
        )}
        <span>
          {isSyncing
            ? 'Syncing offline records with cloud...'
            : 'Offline Mode — Local data & scans active'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {outbox.length > 0 && !isSyncing && (
          <button
            onClick={() => setIsOutboxModalOpen(true)}
            className="px-2 py-0.5 bg-amber-700/80 hover:bg-amber-800 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors"
          >
            <span>{outbox.length} pending</span>
          </button>
        )}

        {isSyncing ? (
          <span className="text-[11px] text-amber-100 italic">Syncing...</span>
        ) : (
          <button
            onClick={syncOutbox}
            className="px-2 py-0.5 bg-white text-amber-900 rounded font-bold text-[11px] hover:bg-amber-50 active:scale-95 transition-all"
          >
            Go Online
          </button>
        )}
      </div>
    </div>
  );
};
