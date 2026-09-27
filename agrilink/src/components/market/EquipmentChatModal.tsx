import React, { useState } from 'react';
import { X, Send, ShieldCheck, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EquipmentChatModal: React.FC = () => {
  const {
    isEquipmentChatOpen,
    setIsEquipmentChatOpen,
    selectedEquipmentId,
    equipment,
    equipmentChats,
    sendEquipmentMessage,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  if (!isEquipmentChatOpen || !selectedEquipmentId) return null;

  const item = equipment.find((eq) => eq.id === selectedEquipmentId) || equipment[0];
  const messages = equipmentChats[item.id] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendEquipmentMessage(item.id, inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-stone-50 w-full max-w-md h-full sm:h-[85vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header with Item Context */}
        <div className="p-3.5 bg-white border-b border-stone-200 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src={item.image}
              alt={item.title}
              className="w-10 h-10 rounded-xl object-cover border border-stone-200"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-stone-900 truncate max-w-[170px]">
                  {item.seller}
                </h3>
                {item.isVerifiedSeller && (
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1 rounded">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-[10px] text-stone-500 truncate max-w-[200px]">
                {item.title} · <strong className="text-stone-900">RM {item.priceRM}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEquipmentChatOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="bg-white border border-stone-200 p-2.5 rounded-xl text-center text-xs space-y-1">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase">
              Equipment Inquiry
            </span>
            <p className="text-[11px] text-stone-600">
              You are inquiring about the <strong>{item.title}</strong> listed in {item.location} ({item.distanceKm} km away).
            </p>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-stone-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about machinery condition, pickup location..."
            className="flex-1 px-3.5 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-9 h-9 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
