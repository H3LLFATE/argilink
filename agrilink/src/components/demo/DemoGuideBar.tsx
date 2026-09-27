import React, { useState } from 'react';
import { PlayCircle, Wifi, WifiOff, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoGuideBar: React.FC = () => {
  const {
    connectivity,
    toggleConnectivity,
    triggerDemoStep,
    outbox,
    isSyncing,
    syncOutbox,
    setIsOutboxModalOpen,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { num: 1, label: '1. Log In & eKYC', desc: 'Reset & launch onboarding sequence' },
    { num: 2, label: '2. Dashboard', desc: 'Active crops, farm health & tasks' },
    { num: 3, label: '3. AI Scan', desc: 'Chili Anthracnose 88% confidence' },
    { num: 4, label: '4. Crop Details', desc: 'Plot A history & connected issues' },
    { num: 5, label: '5. Ask Mentor', desc: 'Low confidence scan → Dr. Aisha' },
    { num: 6, label: '6. Marketplace', desc: 'Bio-copper fungicide recommendation' },
    { num: 7, label: '7. Used Equipment', desc: 'Honda water pump & message seller' },
    { num: 8, label: '8. Community', desc: 'Verified answers & Leaderboard' },
    { num: 9, label: '9. Farm Map', desc: 'Kedah plot boundaries & suppliers' },
    { num: 10, label: '10. Smart Tasks', desc: 'Weather-aware spraying reminders' },
    { num: 11, label: '11. Offline Sync', desc: 'Offline scan + Outbox queue' },
  ];

  const handleStepClick = (num: number) => {
    setActiveStep(num);
    triggerDemoStep(num);
  };

  return (
    <div className="w-full bg-stone-900 border-b border-stone-800 text-stone-200 text-xs">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Left: Brand & Storyline Trigger */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm">AgriLink</span>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Demo Suite</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-[11px] font-medium text-stone-300 hover:text-white px-2 py-1 rounded bg-stone-800/80 hover:bg-stone-800 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>11-Step Storyline</span>
            {isOpen ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
          </button>
        </div>

        {/* Center / Right: Connectivity Toggle & Outbox */}
        <div className="flex items-center gap-2.5">
          {outbox.length > 0 && (
            <button
              onClick={() => setIsOutboxModalOpen(true)}
              className="px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[11px] font-medium hover:bg-amber-500/30 transition-colors flex items-center gap-1"
            >
              <span>Outbox: {outbox.length} pending</span>
            </button>
          )}

          <button
            onClick={toggleConnectivity}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              connectivity === 'online'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900'
                : 'bg-amber-950 text-amber-300 border border-amber-600/60 hover:bg-amber-900'
            }`}
          >
            {connectivity === 'online' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>Offline Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Quick-Jump Drawer */}
      {isOpen && (
        <div className="border-t border-stone-800 bg-stone-950/95 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Hackathon Judge Demo Flow (Click any step to test):
              </span>
              <span className="text-[11px] text-stone-400">
                Demo Farm: Kedah, Malaysia (Arjun Kumar)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {steps.map((s) => {
                const isSelected = activeStep === s.num;
                return (
                  <button
                    key={s.num}
                    onClick={() => handleStepClick(s.num)}
                    className={`text-left p-2 rounded border text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                        : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-850 hover:border-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-emerald-400 text-[11px] truncate flex items-center justify-between">
                      <span>{s.label}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                    </div>
                    <div className="text-[10px] text-stone-400 truncate mt-0.5">{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
