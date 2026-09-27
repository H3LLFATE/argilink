import React from 'react';
import { Bell, ShoppingBag, User, Wifi, WifiOff, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from './BottomNav';
import { OfflineBanner } from './OfflineBanner';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    connectivity,
    toggleConnectivity,
    user,
    notifications,
    setIsNotificationsModalOpen,
    setIsProfileModalOpen,
    setIsCartOpen,
    cart,
    demoToast,
    clearDemoToast,
    activeTab,
    selectedStudyPlantId,
  } = useApp();

  const mainRef = React.useRef<HTMLElement>(null);

  // Auto-reset scroll position when switching tabs or opening a plant guide
  React.useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, selectedStudyPlantId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-stone-50 text-stone-900 flex flex-col shadow-2xl relative border-x border-stone-200 selection:bg-emerald-200">
      {/* Top App Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-2.5 flex items-center justify-between">
        {/* Left: Brand & Connection Status */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="relative flex items-center focus:outline-none"
            title="Open Farmer Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                connectivity === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-stone-900 tracking-tight">AgriLink</h1>
              <span className="text-[11px] text-stone-400">·</span>
              <button
                onClick={toggleConnectivity}
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded transition-colors ${
                  connectivity === 'online'
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
                title="Click to toggle Online/Offline Mode"
              >
                {connectivity === 'online' ? 'Online' : 'Offline'}
              </button>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>Pendang, Kedah</span>
            </div>
          </div>
        </div>

        {/* Right Actions: Notifications, Cart, Profile */}
        <div className="flex items-center gap-1">
          {/* Notification Button */}
          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 relative rounded-lg hover:bg-stone-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 relative rounded-lg hover:bg-stone-100 transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Offline Banner if offline or syncing */}
      <OfflineBanner />

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 pb-20 overflow-y-auto bg-stone-50 min-h-[calc(100vh-120px)]">
        {children}
      </main>

      {/* Interactive Toast Message */}
      {demoToast && (
        <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-50 animate-bounce duration-300">
          <div className="bg-stone-900 text-stone-100 px-3.5 py-2.5 rounded-xl shadow-xl border border-stone-700 text-xs flex items-center justify-between gap-3">
            <span className="font-medium">{demoToast}</span>
            <button
              onClick={clearDemoToast}
              className="text-stone-400 hover:text-white text-[11px] font-bold px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
