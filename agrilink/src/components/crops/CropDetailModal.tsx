import React from 'react';
import {
  X,
  ScanLine,
  MessageSquare,
  ShoppingBag,
  Bell,
  MapPin,
  Calendar,
  Layers,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AI_SCAN_PRESETS } from '../../data/mockData';

export const CropDetailModal: React.FC = () => {
  const {
    crops,
    plots,
    selectedCropId,
    setSelectedCropId,
    reminders,
    toggleReminder,
    setActiveTab,
    runAnalysis,
    setSelectedMentorId,
    setSelectedProductId,
    setIsRemindersModalOpen,
  } = useApp();

  if (!selectedCropId) return null;

  const crop = crops.find((c) => c.id === selectedCropId);
  if (!crop) return null;

  const plot = plots.find((p) => p.id === crop.plotId);
  const cropReminders = reminders.filter((r) => r.cropId === crop.id);

  const handleScanThisCrop = () => {
    setSelectedCropId(null);
    setActiveTab('scan');
    // Pre-select preset based on crop
    if (crop.name.toLowerCase().includes('chili')) {
      runAnalysis(AI_SCAN_PRESETS[0]);
    } else if (crop.name.toLowerCase().includes('paddy')) {
      runAnalysis(AI_SCAN_PRESETS[1]);
    } else {
      runAnalysis(AI_SCAN_PRESETS[3]);
    }
  };

  const handleAskMentor = () => {
    setSelectedCropId(null);
    setActiveTab('community');
    setSelectedMentorId('m1'); // Dr. Aisha Rahman
  };

  const handleFindSupplies = () => {
    setSelectedCropId(null);
    setActiveTab('market');
    setSelectedProductId('prod-copper-fungicide');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="relative h-44 bg-stone-900 overflow-hidden shrink-0">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedCropId(null)}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
                  crop.healthStatus === 'healthy' ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              >
                {crop.healthStatus === 'healthy' ? 'Healthy Condition' : 'Attention Required'}
              </span>
              <span className="text-xs text-stone-300 font-medium">Plot: {crop.plotName}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight mt-1">{crop.name}</h2>
            <p className="text-xs text-stone-300">{crop.variety} · {crop.areaAcres} Acres</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-stone-900">
          {/* Health & Pathology Card */}
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-900">Health Index</span>
              <span className="text-sm font-extrabold tabular-nums text-stone-900">
                {crop.healthScore} / 100
              </span>
            </div>

            {/* Health Bar */}
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all ${
                  crop.healthScore > 80 ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
                style={{ width: `${crop.healthScore}%` }}
              />
            </div>

            {crop.recentIssues && crop.recentIssues.length > 0 ? (
              <div className="bg-amber-100/60 border border-amber-200 p-2.5 rounded-xl text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Flagged Pathological Symptoms</span>
                </div>
                <ul className="text-amber-800 list-disc list-inside space-y-0.5 text-[11px]">
                  {crop.recentIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No active fungal, viral, or insect pests flagged in latest check.</span>
              </div>
            )}
          </div>

          {/* Plot & Agronomic Specs */}
          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl space-y-2.5">
            <h3 className="text-xs font-bold text-stone-900">Agronomic Information</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block">Growth Stage</span>
                <span className="font-semibold text-stone-800">{crop.stage}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block">Planted Date</span>
                <span className="font-semibold text-stone-800">{crop.plantedDate}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block">Expected Harvest</span>
                <span className="font-semibold text-stone-800">{crop.expectedHarvestDate}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block">Irrigation Type</span>
                <span className="font-semibold text-stone-800">{plot?.irrigation || 'Drip line'}</span>
              </div>
            </div>

            {crop.notes && (
              <div className="pt-1 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="font-bold text-stone-800 block mb-0.5">Field Notes:</span>
                {crop.notes}
              </div>
            )}
          </div>

          {/* Crop Reminders */}
          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-900">Crop Reminders</h3>
              <span className="text-[11px] text-stone-500">
                {cropReminders.filter((r) => !r.isCompleted).length} pending
              </span>
            </div>

            {cropReminders.length === 0 ? (
              <p className="text-xs text-stone-500 italic py-2 text-center">
                No reminders scheduled for this crop.
              </p>
            ) : (
              <div className="space-y-1.5">
                {cropReminders.map((rem) => (
                  <div
                    key={rem.id}
                    onClick={() => toggleReminder(rem.id)}
                    className="p-2 rounded-xl border border-stone-200 hover:border-emerald-300 flex items-center justify-between gap-2 text-xs cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center ${
                          rem.isCompleted ? 'bg-emerald-600 text-white' : 'border border-stone-300'
                        }`}
                      >
                        {rem.isCompleted && <Check className="w-3 h-3" />}
                      </div>
                      <span className={`truncate ${rem.isCompleted ? 'line-through text-stone-400' : 'font-medium text-stone-900'}`}>
                        {rem.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 shrink-0 tabular-nums">
                      {rem.dueTime}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Connected Action Buttons (The Ecosystem Bridge) */}
          <div className="space-y-2 pt-1 pb-2">
            <button
              onClick={handleScanThisCrop}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <ScanLine className="w-4 h-4" />
              <span>Scan Crop Foliage with AI</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAskMentor}
                className="py-2 px-3 bg-white border border-stone-300 hover:border-emerald-600 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ask a Mentor</span>
              </button>

              <button
                onClick={handleFindSupplies}
                className="py-2 px-3 bg-white border border-stone-300 hover:border-emerald-600 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                <span>Find Supplies</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
