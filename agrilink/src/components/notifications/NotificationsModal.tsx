import React from 'react';
import {
  X,
  Bell,
  MessageSquare,
  AlertTriangle,
  CloudRain,
  CheckCircle2,
  ShoppingBag,
  Users,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const {
    notifications,
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab,
    setSelectedCropId,
    setSelectedMentorId,
    setSelectedProductId,
    setSelectedEquipmentId,
    setIsEquipmentChatOpen,
  } = useApp();

  if (!isNotificationsModalOpen) return null;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    setIsNotificationsModalOpen(false);

    if (notif.linkAction) {
      setActiveTab(notif.linkAction.tab);
      if (notif.linkAction.targetId) {
        if (notif.linkAction.targetId === 'crop-chili') {
          setSelectedCropId('crop-chili');
        } else if (notif.linkAction.targetId === 'conv-1') {
          setSelectedMentorId('m1');
        } else if (notif.linkAction.targetId === 'prod-copper-fungicide') {
          setSelectedProductId('prod-copper-fungicide');
        } else if (notif.linkAction.targetId === 'eq-water-pump') {
          setSelectedEquipmentId('eq-water-pump');
          setIsEquipmentChatOpen(true);
        }
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'mentor':
        return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'pest_alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'weather':
        return <CloudRain className="w-4 h-4 text-sky-600" />;
      case 'market':
        return <ShoppingBag className="w-4 h-4 text-purple-600" />;
      case 'community':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-stone-900">Notifications & Alerts</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] font-semibold text-emerald-800 hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={() => setIsNotificationsModalOpen(false)}
              className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                notif.isRead
                  ? 'bg-white border-stone-200 opacity-75'
                  : 'bg-emerald-50/40 border-emerald-200 shadow-xs'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4
                    className={`text-xs truncate ${
                      notif.isRead ? 'font-semibold text-stone-800' : 'font-bold text-stone-900'
                    }`}
                  >
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 shrink-0 tabular-nums">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>

                {notif.linkAction && (
                  <span className="inline-block text-[10px] font-bold text-emerald-700 mt-1.5 hover:underline">
                    View in {notif.linkAction.tab} →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
