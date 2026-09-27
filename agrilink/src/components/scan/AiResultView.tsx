import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShoppingBag,
  MessageSquare,
  Calendar,
  Layers,
  ShieldCheck,
  Share2,
  Compass,
  Sprout,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AiScanPreset } from '../../types';

interface AiResultViewProps {
  result: AiScanPreset;
  onReset: () => void;
}

export const AiResultView: React.FC<{ result: AiScanPreset; onReset: () => void }> = ({
  result,
  onReset,
}) => {
  const {
    plots,
    setActiveTab,
    setSelectedProductId,
    setSelectedCropId,
    startMentorInquiry,
    setSelectedMentorId,
    addReminder,
    updateCropHealth,
    assignScanToExistingPlot,
    startNewPlotDesign,
    setIsFarmMapOpen,
    setSelectedPlotDrawerId,
    openStudyForPlant,
  } = useApp();

  const [attachedToCrop, setAttachedToCrop] = useState(false);
  const [reminderAdded, setReminderAdded] = useState(false);
  const [showExistingPlots, setShowExistingPlots] = useState(false);
  const [locationSavedPlot, setLocationSavedPlot] = useState<typeof plots[0] | null>(null);

  const matchedPlantId = useMemo(() => {
    const cropLower = (result.cropName || '').toLowerCase();
    if (cropLower.includes('chili') || cropLower.includes('capsicum')) return 'chili';
    if (cropLower.includes('tomato')) return 'tomato';
    if (cropLower.includes('paddy') || cropLower.includes('rice')) return 'rice';
    if (cropLower.includes('durian')) return 'durian';
    if (cropLower.includes('corn') || cropLower.includes('maize')) return 'corn';
    if (cropLower.includes('potato')) return 'potato';
    if (cropLower.includes('apple')) return 'apple';
    return 'chili';
  }, [result.cropName]);

  const matchedDiseaseId = useMemo(() => {
    const disLower = (result.diseaseName || '').toLowerCase();
    if (disLower.includes('anthracnose')) return 'chili-anthracnose';
    if (disLower.includes('bacterial wilt')) return 'chili-bacterial-wilt';
    if (disLower.includes('early blight')) return 'tomato-early-blight';
    if (disLower.includes('late blight')) return 'tomato-late-blight';
    if (disLower.includes('blast')) return 'rice-blast';
    if (disLower.includes('patch canker') || disLower.includes('phytophthora')) return 'durian-patch-canker';
    if (disLower.includes('leaf curl')) return 'chili-leaf-curl-virus';
    return undefined;
  }, [result.diseaseName]);

  const handleSelectExistingPlot = (plotId: string) => {
    const target = plots.find((p) => p.id === plotId);
    if (target) {
      assignScanToExistingPlot(plotId, result);
      setLocationSavedPlot(target);
      setShowExistingPlots(false);
    }
  };

  const handleDesignNewPlot = () => {
    startNewPlotDesign(result);
  };

  const isHighConf = result.confidence >= 75;
  const isMedConf = result.confidence >= 50 && result.confidence < 75;
  const isLowConf = result.confidence < 50;

  const handleAskMentor = () => {
    // Jump straight to Dr. Aisha Rahman (Mentor m1) with inquiry pre-populated
    startMentorInquiry(
      'm1',
      result.cropName,
      `AI Assessment Query: ${result.diseaseName}`,
      `Hi Dr. Aisha, I ran an AI scan on my ${result.cropName} foliage. Confidence is ${result.confidence}% for ${result.diseaseName}. Could you verify the lesions in this photo?`,
      result.image
    );
    setSelectedMentorId('m1');
    setActiveTab('community');
  };

  const handleFindSupplies = () => {
    setActiveTab('market');
    if (result.suggestedProductId) {
      setSelectedProductId(result.suggestedProductId);
    }
  };

  const handleAttachToCrop = () => {
    if (result.plotId === 'plot-a') {
      updateCropHealth('crop-chili', 'attention', result.confidence, result.diseaseName);
    } else if (result.plotId === 'plot-b') {
      updateCropHealth('crop-paddy', 'attention', result.confidence, result.diseaseName);
    }
    setAttachedToCrop(true);
  };

  const handleAddTreatmentReminder = () => {
    addReminder({
      title: `Apply spray treatment for ${result.diseaseName.split('(')[0]}`,
      cropId: result.plotId === 'plot-a' ? 'crop-chili' : 'crop-paddy',
      cropName: result.cropName.split('(')[0].trim(),
      plotName: result.plotId === 'plot-a' ? 'Plot A' : 'Plot B',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '05:30 PM',
      type: 'spraying',
      smartWeatherNote: 'Spray in late afternoon to avoid leaf scorch and ensure drying before nightfall.',
      priority: 'high',
    });
    setReminderAdded(true);
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Top Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Scan</span>
        </button>
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
          Preliminary Assessment
        </span>
      </div>

      {/* Result Hero Header */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="relative h-40 bg-stone-900">
          <img
            src={result.image}
            alt={result.cropName}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Confidence Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 ${
                isHighConf
                  ? 'bg-emerald-600 text-white'
                  : isMedConf
                  ? 'bg-amber-600 text-white'
                  : 'bg-rose-600 text-white animate-pulse'
              }`}
            >
              {isHighConf && <CheckCircle2 className="w-3.5 h-3.5" />}
              {isMedConf && <AlertTriangle className="w-3.5 h-3.5" />}
              {isLowConf && <HelpCircle className="w-3.5 h-3.5" />}
              <span>{result.confidence}% Confidence</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-xs text-stone-300 font-medium">{result.cropName}</span>
            <h2 className="text-lg font-bold tracking-tight text-white leading-tight mt-0.5">
              {result.diseaseName}
            </h2>
          </div>
        </div>

        {/* Confidence Tier Description */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          {isHighConf && (
            <div className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>High AI Confidence:</strong> Distinct agronomic pathology patterns were detected in the blade image. Review the verified agricultural protocol below.
              </span>
            </div>
          )}

          {isMedConf && (
            <div className="flex items-start gap-2 text-xs text-amber-950 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Medium Confidence:</strong> Symptoms align with {result.diseaseName.split('(')[0]}, but additional lighting or angles are recommended for certainty.
              </span>
            </div>
          )}

          {isLowConf && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Confidence Too Low For Safe Diagnosis</span>
              </div>
              <p className="text-[11px] text-rose-900/90 leading-relaxed">
                AgriLink does not provide automated recommendations when confidence is below 50%. Escalate this photo to a verified extension mentor for human agronomic review.
              </p>
              <button
                onClick={handleAskMentor}
                className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask Dr. Aisha Rahman (Verified Agronomist)</span>
              </button>
            </div>
          )}
        </div>

        {/* Pathology Findings */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
              What We Found
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              {result.summary}
            </p>
            <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
              {result.pathologyDetails}
            </p>
          </div>

          {/* Recommended Steps */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
              Recommended Next Steps
            </h3>
            <div className="space-y-1.5">
              {result.recommendedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Agricultural Knowledge Guide Links (Section 22) */}
          <div className="bg-emerald-50/80 border-2 border-emerald-200/90 rounded-2xl p-3.5 space-y-2.5 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Agricultural Knowledge Field Guide</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                Offline Available
              </span>
            </div>
            <p className="text-[11px] text-emerald-900/90 leading-snug">
              Access the verified offline crop guide for detailed symptom progression, IPM prevention protocols, and crop care procedures.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                onClick={() => openStudyForPlant(matchedPlantId, matchedDiseaseId)}
                className="py-2 px-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 active:scale-95 text-emerald-950 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">Learn About {result.diseaseName.split('(')[0].trim()}</span>
              </button>
              <button
                onClick={() => openStudyForPlant(matchedPlantId)}
                className="py-2 px-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
              >
                <Sprout className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">View {result.cropName.split('(')[0].trim()} Guide</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Record Crop Location Section */}
      <div className="bg-white border-2 border-emerald-600/30 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              📍
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-900">Record Crop & Field Location</h3>
              <p className="text-[11px] text-stone-500">
                Save where this {result.cropName.split('(')[0].trim()} was scanned to map plot health
              </p>
            </div>
          </div>
        </div>

        {locationSavedPlot ? (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  Location Saved to {locationSavedPlot.name}
                </span>
                <span className="text-[10px] text-emerald-700">
                  Foliage scan & treatment actions recorded to plot history
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsFarmMapOpen(true);
                setSelectedPlotDrawerId(locationSavedPlot.id);
              }}
              className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[10px] font-bold shadow-xs"
            >
              View on Map
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Option 1: Existing Plot Button & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExistingPlots(!showExistingPlots)}
                className="w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>📌</span>
                  <span>Already Have Existing Plot</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg">
                  Choose Plot ({plots.length}) ▼
                </span>
              </button>

              {showExistingPlots && (
                <div className="mt-1.5 bg-white border border-stone-200 rounded-2xl shadow-xl p-2 space-y-1 z-20">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2 py-1">
                    Select Target Plot:
                  </div>
                  {plots.map((plot) => (
                    <button
                      key={plot.id}
                      onClick={() => handleSelectExistingPlot(plot.id)}
                      className="w-full p-2 hover:bg-emerald-50 rounded-xl flex items-center justify-between text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={plot.image}
                          alt={plot.name}
                          className="w-8 h-8 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-900">
                            {plot.name}
                          </div>
                          <div className="text-[10px] text-stone-500">
                            {plot.cropName} · {plot.areaAcres} Acres
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                        Link Here →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Option 2: Designate New Plot on Map */}
            <button
              onClick={handleDesignNewPlot}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-xs transition-all"
            >
              <span className="flex items-center gap-2">
                <span>🌱</span>
                <span>Designate New Plot on Map</span>
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-lg">
                Pin Near Me ⌖
              </span>
            </button>
          </div>
        )}
      </div>

      {/* The Connected Agricultural Ecosystem Buttons */}
      <div className="space-y-2 pt-1 pb-3">
        {/* Marketplace recommendation connection */}
        {result.suggestedProductCategory && (
          <button
            onClick={handleFindSupplies}
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-2xl text-xs font-bold flex items-center justify-between shadow-md transition-all"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Find Relevant Supplies ({result.suggestedProductCategory})</span>
            </div>
            <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded font-semibold">
              Nearby Stores →
            </span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          {/* Ask a mentor button */}
          <button
            onClick={handleAskMentor}
            className="py-2.5 px-3 bg-white border border-stone-300 hover:border-emerald-600 active:scale-95 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Consult Mentor</span>
          </button>

          {/* Add reminder button */}
          <button
            onClick={handleAddTreatmentReminder}
            disabled={reminderAdded}
            className={`py-2.5 px-3 border rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
              reminderAdded
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-stone-300 hover:border-emerald-600 text-stone-800 active:scale-95'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>{reminderAdded ? 'Task Scheduled ✓' : 'Add Treatment Task'}</span>
          </button>
        </div>

        {/* Attach to plot records */}
        <button
          onClick={handleAttachToCrop}
          disabled={attachedToCrop}
          className={`w-full py-2 border rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            attachedToCrop
              ? 'bg-stone-100 border-stone-200 text-stone-500'
              : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{attachedToCrop ? 'Attached to Plot Records ✓' : 'Attach Finding to Plot Records'}</span>
        </button>
      </div>
    </div>
  );
};
