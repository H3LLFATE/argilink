import React from 'react';
import {
  X,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  Clock,
  Layers,
  MessageSquare,
  Sprout,
  Calendar,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OutboxModal: React.FC = () => {
  const {
    outbox,
    isSyncing,
    syncOutbox,
    isOutboxModalOpen,
    setIsOutboxModalOpen,
    connectivity,
    toggleConnectivity,
    lastSyncTime,
  } = useApp();

  if (!isOutboxModalOpen) return null;

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'mentor_request':
        return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'crop_update':
        return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'reminder_add':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'community_post':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <Layers className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-stone-900">Offline Synchronization Outbox</h2>
          </div>
          <button
            onClick={() => setIsOutboxModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Status Explanation Banner */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>AgriLink Offline-First Architecture</span>
            </div>
            <p className="text-[11px] text-amber-900/90 leading-relaxed">
              When disconnected from cellular network or broadband in rural fields, your scans, plot updates, reminders, and mentor inquiries are safely committed to local storage. They sync automatically when connectivity resumes.
            </p>
          </div>

          {/* Pending Items List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Pending Sync Queue ({outbox.length})
              </h3>
              <span className="text-[10px] text-stone-400">Last sync: {lastSyncTime}</span>
            </div>

            {outbox.length === 0 ? (
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-stone-900">All Changes Synchronized</div>
                <p className="text-[11px] text-stone-500">
                  Your local device database is in full sync with the AgriLink central registry.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {outbox.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                      {getItemIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">
                        {item.description}
                      </div>
                      <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>Queued at {item.timestamp}</span>
                        <span>·</span>
                        <span className="text-amber-700 font-semibold">Pending upload</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 shrink-0 space-y-2">
          {connectivity === 'offline' ? (
            <button
              onClick={() => {
                toggleConnectivity();
              }}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restore Connection & Sync Now</span>
            </button>
          ) : (
            <button
              onClick={syncOutbox}
              disabled={isSyncing || outbox.length === 0}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Pending Records'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
