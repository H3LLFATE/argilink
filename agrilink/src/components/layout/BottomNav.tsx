import React from 'react';
import { Home, Sprout, ScanLine, Users, ShoppingBag, Compass } from 'lucide-react';
import { TabType } from '../../types';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedCropId, setSelectedMentorId } = useApp();

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    // Reset specific item view when clicking tab
    if (tab !== 'crops') setSelectedCropId(null);
    if (tab !== 'community') setSelectedMentorId(null);
  };

  const navItems: { tab: TabType; label: string; icon: React.ElementType }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'crops', label: 'Crops', icon: Sprout },
    { tab: 'scan', label: 'AI Scan', icon: ScanLine },
    { tab: 'study', label: 'Guide', icon: Compass },
    { tab: 'community', label: 'Community', icon: Users },
    { tab: 'market', label: 'Market', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-stone-200">
      <div className="grid grid-cols-6 items-center h-16 px-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          const isScan = item.tab === 'scan';

          if (isScan) {
            return (
              <button
                key={item.tab}
                onClick={() => handleTabClick(item.tab)}
                className="flex flex-col items-center justify-center -mt-4 group relative"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                      : 'bg-emerald-700 text-white hover:bg-emerald-600 active:scale-95'
                  }`}
                >
                  <ScanLine className="w-6 h-6" />
                </div>
                <span
                  className={`text-[10px] font-semibold mt-1 transition-colors ${
                    isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className="flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] py-1 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'text-emerald-700 scale-110' : 'text-stone-400'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 ${
                  isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
