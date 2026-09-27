import React from 'react';
import {
  CloudSun,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sprout,
  ShieldAlert,
  Droplets,
  Wind,
  Plus,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Crop } from '../../types';

export const HomeDashboard: React.FC = () => {
  const {
    user,
    crops,
    plots,
    reminders,
    toggleReminder,
    setSelectedCropId,
    setIsAddCropOpen,
    setIsRemindersModalOpen,
    setIsNotificationsModalOpen,
    setActiveTab,
    setIsFarmMapOpen,
    runAnalysis,
    downloadedPlantIds,
  } = useApp();

  // Summary counts
  const totalCrops = crops.length;
  const healthyCount = crops.filter((c) => c.healthStatus === 'healthy').length;
  const attentionCount = crops.filter((c) => c.healthStatus === 'attention' || c.healthStatus === 'critical').length;
  const todayReminders = reminders.filter((r) => !r.isCompleted).slice(0, 4);

  return (
    <div className="px-4 py-4 space-y-5">
      {/* 1. Greeting & Farm Status */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-200/90 font-medium">Kedah, Malaysia</p>
              <h2 className="text-lg font-bold tracking-tight mt-0.5">Good morning, {user.name}</h2>
            </div>
            <button
              onClick={() => setIsFarmMapOpen(true)}
              className="px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-500/30"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-300" />
              <span>Farm Map</span>
            </button>
          </div>

          <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
            {crops.length === 0
              ? 'Welcome to AgriLink! Start your farming journey by registering your crops or testing leaf pathology in AI Scan.'
              : 'Your farm is generally stable today. Monitored crops are tracked with real-time status.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-emerald-700/50 text-center">
            <div>
              <div className="text-base font-bold tabular-nums">{totalCrops}</div>
              <div className="text-[10px] text-emerald-200/80">Active Crops</div>
            </div>
            <div>
              <div className="text-base font-bold tabular-nums">{plots.length}</div>
              <div className="text-[10px] text-emerald-200/80">Plots</div>
            </div>
            <div>
              <div className="text-base font-bold text-emerald-300 tabular-nums">{healthyCount}</div>
              <div className="text-[10px] text-emerald-200/80">Healthy</div>
            </div>
            <div>
              <div className="text-base font-bold text-amber-300 tabular-nums">{attentionCount}</div>
              <div className="text-[10px] text-emerald-200/80">Attention</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Weather & Farming Conditions */}
      <section className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight text-stone-900 tabular-nums">29°C</span>
                <span className="text-xs text-stone-500 font-medium">Partly Sunny</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-sky-500" />
                  <span>Rain: 30%</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-stone-400" />
                  <span>Humidity: 78%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md border border-emerald-200">
              Field Inspection OK
            </span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-600 flex items-center justify-between">
          <span className="truncate">Late afternoon rain forecasted (30-40mm). Complete open spraying before 11 AM.</span>
        </div>
      </section>

      {/* 3. Crop Health Overview Cards */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-stone-900">Crop Health & Plots</h3>
          </div>
          <button
            onClick={() => setActiveTab('crops')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
          >
            <span>View all ({crops.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {crops.length === 0 ? (
          <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-5 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Welcome to Your New Farm!</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto leading-relaxed">
                You do not have any registered crops or plots yet. Start by adding your first crop or exploring AI leaf diagnostics with pre-planned samples.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                onClick={() => setIsAddCropOpen(true)}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register First Crop</span>
              </button>
              <button
                onClick={() => setActiveTab('scan')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
              >
                <span>Try AI Scan (Ready Samples)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {crops.slice(0, 4).map((crop) => (
              <div
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className="bg-white border border-stone-200 hover:border-emerald-600/50 rounded-2xl overflow-hidden shadow-xs cursor-pointer transition-all hover:shadow-md group flex flex-col"
              >
                <div className="relative h-24 bg-stone-100 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                      crop.healthStatus === 'healthy'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white animate-pulse'
                    }`}
                  >
                    {crop.healthStatus === 'healthy' ? 'Healthy' : 'Needs Check'}
                  </span>
                  <div className="absolute bottom-1 left-2 text-[10px] text-white/95 font-semibold drop-shadow-md">
                    {crop.plotName}
                  </div>
                </div>

                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 truncate">{crop.name}</h4>
                    <p className="text-[11px] text-stone-500 truncate">{crop.variety}</p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                    <span>Score: <strong className="tabular-nums text-stone-800">{crop.healthScore}%</strong></span>
                    <span className="truncate">{crop.lastChecked.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Crop Alerts */}
      <section className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Active Farm Alerts</span>
          </div>
          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="text-[11px] font-semibold text-amber-800 hover:underline"
          >
            All alerts
          </button>
        </div>

        <div className="space-y-2">
          {crops.length > 0 ? (
            <div
              onClick={() => setSelectedCropId(crops[0].id)}
              className="bg-white p-2.5 rounded-xl border border-amber-200/80 cursor-pointer hover:bg-amber-50/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{crops[0].plotName} · {crops[0].name}</span>
                  <p className="text-xs font-semibold text-stone-900 mt-0.5">
                    Foliage health monitored
                  </p>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    {crops[0].notes || 'Routine field inspection scheduled.'}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
              </div>
            </div>
          ) : (
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-center text-xs text-stone-600">
              <span>No crop disease outbreaks detected on your parcel. Regional weather is clear for planting.</span>
            </div>
          )}

          <div
            onClick={() => setIsRemindersModalOpen(true)}
            className="bg-white p-2.5 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">Weather Alert</span>
                <p className="text-xs font-semibold text-stone-900 mt-0.5">
                  Kedah downpour expected tomorrow afternoon
                </p>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Review tomorrow’s scheduled foliar spray task.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Today's Farming Tasks (Checkable) */}
      <section className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Today's Tasks</h3>
            <p className="text-[11px] text-stone-500">
              {reminders.filter((r) => r.isCompleted).length} of {reminders.length} completed
            </p>
          </div>
          <button
            onClick={() => setIsRemindersModalOpen(true)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Manage</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {todayReminders.map((task) => (
            <div
              key={task.id}
              className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                task.isCompleted
                  ? 'bg-stone-50 border-stone-200 opacity-60'
                  : 'bg-white border-stone-200 hover:border-emerald-300'
              }`}
            >
              <button
                onClick={() => toggleReminder(task.id)}
                className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  task.isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'border-2 border-stone-300 hover:border-emerald-600 text-transparent'
                }`}
                title={task.isCompleted ? 'Mark incomplete' : 'Mark completed'}
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex-1 min-w-0" onClick={() => toggleReminder(task.id)}>
                <div className="flex items-center justify-between gap-1">
                  <h4
                    className={`text-xs font-semibold truncate ${
                      task.isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <span className="text-[10px] text-stone-500 shrink-0 font-medium tabular-nums">
                    {task.dueTime}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-1">
                  <span className="font-semibold text-stone-700">{task.cropName}</span>
                  <span>·</span>
                  <span>{task.plotName}</span>
                </div>

                {task.smartWeatherNote && !task.isCompleted && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                    💡 {task.smartWeatherNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsRemindersModalOpen(true)}
          className="w-full mt-3 py-2 border border-dashed border-stone-300 rounded-xl text-xs font-semibold text-stone-600 hover:text-emerald-700 hover:border-emerald-500 flex items-center justify-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Farm Reminder</span>
        </button>
      </section>

      {/* 6. Agricultural Guide & Knowledge Library Card */}
      <section
        onClick={() => setActiveTab('study')}
        className="bg-white border border-stone-200 hover:border-emerald-500 p-3.5 rounded-2xl cursor-pointer transition-all shadow-2xs group space-y-1.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                Agricultural Guide & Knowledge Library
              </h4>
              <p className="text-[11px] text-stone-500">Offline crop guides, pest pathology & field procedures</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{downloadedPlantIds.length} Offline</span>
          </span>
        </div>
      </section>

      {/* 7. Quick Action Floating Banner for AI Scan */}
      <section className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-emerald-950">Notice unusual leaf symptoms?</h4>
          <p className="text-[11px] text-emerald-800 mt-0.5">
            Use AI Crop Health Scanner for instant offline preliminary assessment.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('scan')}
          className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-sm transition-all"
        >
          Scan Crop
        </button>
      </section>
    </div>
  );
};
