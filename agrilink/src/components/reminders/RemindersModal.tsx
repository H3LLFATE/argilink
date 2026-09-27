import React, { useState } from 'react';
import {
  X,
  Plus,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Droplets,
  AlertCircle,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Reminder } from '../../types';

export const RemindersModal: React.FC = () => {
  const {
    reminders,
    toggleReminder,
    addReminder,
    isRemindersModalOpen,
    setIsRemindersModalOpen,
    crops,
    plots,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Reminder form state
  const [title, setTitle] = useState('');
  const [cropId, setCropId] = useState(crops[0]?.id || 'crop-chili');
  const [type, setType] = useState<Reminder['type']>('spraying');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('08:00 AM');
  const [priority, setPriority] = useState<Reminder['priority']>('medium');

  if (!isRemindersModalOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const todayReminders = reminders.filter(
    (r) => !r.isCompleted && (r.dueDate === todayStr || r.dueDate < todayStr)
  );
  const upcomingReminders = reminders.filter(
    (r) => !r.isCompleted && r.dueDate > todayStr
  );
  const completedReminders = reminders.filter((r) => r.isCompleted);

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedCrop = crops.find((c) => c.id === cropId);

    addReminder({
      title: title.trim(),
      cropId,
      cropName: selectedCrop?.name || 'Chili',
      plotName: selectedCrop?.plotName || 'Plot A',
      dueDate,
      dueTime,
      type,
      priority,
      smartWeatherNote: type === 'spraying' ? 'Avoid high winds; verify weather forecast before spraying.' : undefined,
    });

    setTitle('');
    setShowAddForm(false);
  };

  const currentList =
    activeTab === 'today'
      ? todayReminders
      : activeTab === 'upcoming'
      ? upcomingReminders
      : completedReminders;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Crop Reminders & Schedules</h2>
            <p className="text-[11px] text-stone-500">
              Connected farming tasks with smart weather notifications
            </p>
          </div>
          <button
            onClick={() => setIsRemindersModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-3 p-1.5 bg-stone-100 border-b border-stone-200 shrink-0 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('today');
              setShowAddForm(false);
            }}
            className={`py-1.5 rounded-lg transition-colors ${
              activeTab === 'today' && !showAddForm
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Today ({todayReminders.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('upcoming');
              setShowAddForm(false);
            }}
            className={`py-1.5 rounded-lg transition-colors ${
              activeTab === 'upcoming' && !showAddForm
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Upcoming ({upcomingReminders.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('completed');
              setShowAddForm(false);
            }}
            className={`py-1.5 rounded-lg transition-colors ${
              activeTab === 'completed' && !showAddForm
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Completed ({completedReminders.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {/* Smart Weather Tip Banner */}
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Smart Farming Recommendation:</strong> Rain expected tomorrow afternoon. Ensure all protective copper and bio-spray applications are executed during today’s late afternoon window.
            </div>
          </div>

          {showAddForm ? (
            /* Add Reminder Form */
            <form onSubmit={handleCreateReminder} className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl space-y-3 text-xs">
              <div className="font-bold text-stone-900 text-xs">Schedule New Crop Task</div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Inspect chili leaves for anthracnose spread"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Target Crop</label>
                  <select
                    value={cropId}
                    onChange={(e) => setCropId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900"
                  >
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.plotName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Task Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Reminder['type'])}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900"
                  >
                    <option value="disease_check">Disease Check</option>
                    <option value="spraying">Protective Spray</option>
                    <option value="watering">Irrigation Check</option>
                    <option value="fertilizing">Fertilizing</option>
                    <option value="harvest">Harvest</option>
                    <option value="equipment">Machinery Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Due Time</label>
                  <input
                    type="text"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    placeholder="08:00 AM"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Schedule Task
                </button>
              </div>
            </form>
          ) : (
            /* Reminders List */
            <div className="space-y-2">
              {currentList.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500 italic">
                  No reminders found in this view.
                </div>
              ) : (
                currentList.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleReminder(task.id)}
                    className={`p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      task.isCompleted
                        ? 'bg-stone-50 border-stone-200 opacity-60'
                        : 'bg-white border-stone-200 hover:border-emerald-300 shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                        task.isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-stone-300 hover:border-emerald-600'
                      }`}
                    >
                      {task.isCompleted && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4
                          className={`text-xs font-semibold truncate ${
                            task.isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                          }`}
                        >
                          {task.title}
                        </h4>
                        <span className="text-[10px] text-stone-500 shrink-0 tabular-nums">
                          {task.dueTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-0.5">
                        <span className="font-semibold text-stone-700">{task.cropName}</span>
                        <span>·</span>
                        <span>{task.plotName}</span>
                        <span>·</span>
                        <span>{task.dueDate}</span>
                      </div>

                      {task.smartWeatherNote && !task.isCompleted && (
                        <p className="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded-lg mt-1.5">
                          💡 {task.smartWeatherNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer Add Task Button */}
        {!showAddForm && (
          <div className="p-3 border-t border-stone-200 bg-stone-50 shrink-0">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Crop Task</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
