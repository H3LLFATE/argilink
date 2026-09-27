import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Image as ImageIcon,
  CheckCheck,
  Star,
  ShieldCheck,
  Clock,
  Phone,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MentorChatModal: React.FC = () => {
  const {
    selectedMentorId,
    setSelectedMentorId,
    mentors,
    conversations,
    sendMentorMessage,
    connectivity,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mentor = mentors.find((m) => m.id === selectedMentorId) || mentors[0];
  const conversation = selectedMentorId
    ? conversations.find((c) => c.mentorId === selectedMentorId)
    : undefined;
  const messages = conversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedMentorId) {
      scrollToBottom();
    }
  }, [messages, isTyping, selectedMentorId]);

  if (!selectedMentorId) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMentorMessage(mentor.id, inputMessage.trim());
    setInputMessage('');

    if (connectivity === 'online') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-stone-50 w-full max-w-md h-full sm:h-[88vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Mentor Header */}
        <div className="p-3.5 bg-white border-b border-stone-200 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-10 h-10 rounded-full object-cover border border-emerald-600 shadow-xs"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  mentor.isAvailable ? 'bg-emerald-500' : 'bg-stone-400'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-stone-900">{mentor.name}</h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>{mentor.verifiedBadge}</span>
                </span>
              </div>
              <p className="text-[10px] text-stone-500 truncate max-w-[200px]">
                {mentor.organization}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedMentorId(null)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mentor Trust Bar */}
        <div className="px-4 py-1.5 bg-emerald-900 text-emerald-100 text-[10px] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-white">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{mentor.rating}</span>
            </span>
            <span>·</span>
            <span>{mentor.answersCount} answers</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>{mentor.responseTime}</span>
            </span>
          </div>
          {connectivity === 'offline' && (
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <WifiOff className="w-2.5 h-2.5" />
              <span>Offline (Queued)</span>
            </span>
          )}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Issue Context Pill */}
          {conversation && (
            <div className="bg-white border border-stone-200 p-2.5 rounded-2xl shadow-xs text-xs space-y-1">
              <div className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                Active Crop Inquiry
              </div>
              <div className="font-bold text-stone-900">{conversation.cropName}</div>
              <div className="text-[11px] text-stone-600">{conversation.issueTitle}</div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isOfflineQueued = msg.status === 'queued_offline';

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
                  {/* Photo Attachment if present */}
                  {msg.imageUrl && (
                    <div className="mb-2 rounded-xl overflow-hidden max-h-40 border border-white/20">
                      <img
                        src={msg.imageUrl}
                        alt="Crop leaf sample"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-400 px-1">
                  <span>{msg.timestamp}</span>
                  {isUser && (
                    <span>
                      {isOfflineQueued ? (
                        <span className="text-amber-600 font-bold">· Queued offline</span>
                      ) : (
                        <CheckCheck className="w-3 h-3 text-emerald-600 inline" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-2 bg-white rounded-2xl border border-stone-200 max-w-[100px] text-[11px] text-stone-500 animate-pulse">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-200" />
              <span className="text-[10px] text-stone-400 ml-1">Typing</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
            title="Attach crop leaf photo"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              connectivity === 'offline'
                ? 'Type question (will sync when online)...'
                : 'Ask Dr. Aisha about leaf spots...'
            }
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
