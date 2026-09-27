import { IMAGE_PATHS } from '../../config/imageMasterConfig';
import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Thermometer,
  Droplet,
  Layers,
  Sprout,
  ShieldCheck,
  Bug,
  Activity,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Info,
  Clock,
  ExternalLink,
  ChevronRight,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlantKnowledge, PlantDiseaseItem, PlantPestItem } from '../../types';
import { DiseaseDetailModal } from './DiseaseDetailModal';

interface PlantKnowledgePageProps {
  plant: PlantKnowledge;
  initialSection?: 'overview' | 'guide' | 'health' | 'watering' | 'soil' | 'nutrition';
  onBack: () => void;
}

export const PlantKnowledgePage: React.FC<PlantKnowledgePageProps> = ({
  plant,
  initialSection = 'guide',
  onBack,
}) => {
  const {
    connectivity,
    downloadedPlantIds,
    downloadPlant,
    removeDownloadedPlant,
    setActiveTab,
    startMentorInquiry,
    setSelectedMentorId,
    selectedStudyDiseaseId,
    setSelectedStudyDiseaseId,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'overview' | 'guide' | 'health' | 'watering' | 'soil' | 'nutrition'>(initialSection);
  const [selectedHealthItem, setSelectedHealthItem] = useState<PlantDiseaseItem | PlantPestItem | null>(null);

  // Always reset scroll to top on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const isDownloaded = downloadedPlantIds.includes(plant.id);
  const isOffline = connectivity === 'offline';
  const isAvailableOffline = isDownloaded;

  // Auto-open disease if requested via AI Scan integration or deep link
  React.useEffect(() => {
    if (selectedStudyDiseaseId) {
      const matchDisease = plant.diseases.find((d) => d.id === selectedStudyDiseaseId);
      const matchPest = plant.pests.find((p) => p.id === selectedStudyDiseaseId);
      if (matchDisease) {
        setSelectedHealthItem(matchDisease);
        setActiveSection('health');
      } else if (matchPest) {
        setSelectedHealthItem(matchPest);
        setActiveSection('health');
      }
    }
  }, [selectedStudyDiseaseId, plant]);

  // If offline and NOT downloaded, show genuine offline warning screen (Section 26 requirement)
  if (isOffline && !isAvailableOffline) {
    return (
      <div className="px-4 py-6 space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Knowledge Library</span>
        </button>

        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
            <WifiOff className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-200/80 px-2 py-0.5 rounded-full">
              Offline Mode
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-2">
              {plant.name} Not Available Offline
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto leading-relaxed">
              This plant guide ({plant.packageSize}) has not been downloaded to your device storage. To access this crop guide in the field without signal, connect to the internet first.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onBack}
              className="px-4 py-2.5 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800 transition-colors"
            >
              Browse Downloaded Plants ({downloadedPlantIds.length} Available)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAskMentor = () => {
    startMentorInquiry(
      'm1',
      plant.name,
      `Field Guide Question: ${plant.name}`,
      `Hi Dr. Aisha, I am consulting the AgriLink knowledge library for ${plant.name}. Could you share specific local extension insights for Kedah soils?`
    );
    setSelectedMentorId('m1');
    setActiveTab('community');
  };

  const sections: { id: 'overview' | 'guide' | 'health' | 'watering' | 'soil' | 'nutrition'; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'guide', label: 'Growing Guide' },
    { id: 'health', label: 'Plant Health & Pests' },
    { id: 'watering', label: 'Watering' },
    { id: 'soil', label: 'Soil Prep' },
    { id: 'nutrition', label: 'Fertilizer' },
  ];

  return (
    <div className="pb-20 space-y-4 bg-stone-50 min-h-full">
      {/* Top Bar */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        {/* Offline Download Action */}
        <div>
          {isDownloaded ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Downloaded ({plant.packageSize})</span>
              </span>
              <button
                onClick={() => removeDownloadedPlant(plant.id)}
                title="Remove from offline cache"
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-rose-100 text-stone-500 hover:text-rose-700 flex items-center justify-center transition-colors border border-stone-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => downloadPlant(plant.id)}
              className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download for Offline ({plant.packageSize})</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div className="px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 border border-emerald-800/40 shadow-md min-h-[180px]">
          <img
            src={plant.image}
            alt={plant.name}
            onError={(e) => {
              e.currentTarget.src = IMAGE_PATHS.plantTomato;
            }}
            className="w-full h-48 object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-black/35 to-transparent" />

          {/* Plant Category & Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="text-[10px] font-bold bg-white/90 backdrop-blur-xs text-stone-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {plant.categoryLabel}
            </span>
            {isDownloaded && (
              <span className="text-[10px] font-bold bg-emerald-600/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>Offline Ready</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-[11px] font-serif italic text-emerald-300">
              {plant.scientificName} {plant.commonLocalName ? `· ${plant.commonLocalName}` : ''}
            </p>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
              {plant.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{plant.typicalGrowingPeriod}</span>
              </span>
              <span>·</span>
              <span>Offline Package: {plant.packageSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Section Navigation */}
      <div className="px-4 sticky top-14 z-20 bg-stone-50/95 backdrop-blur-xs py-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeSection === sec.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 space-y-4">
        {/* 1. OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Description */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Crop Overview & Characteristics
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                {plant.description}
              </p>
            </div>

            {/* Growing Conditions Grid */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Optimal Growing Conditions
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Sunlight</span>
                  </div>
                  <p className="text-[11px] text-amber-950/80 leading-snug">
                    {plant.growingConditions.sunlight}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900">
                    <Thermometer className="w-4 h-4 text-rose-600" />
                    <span>Temperature</span>
                  </div>
                  <p className="text-[11px] text-rose-950/80 leading-snug">
                    {plant.growingConditions.temperature}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-sky-900">
                    <Droplet className="w-4 h-4 text-sky-600" />
                    <span>Water Demand</span>
                  </div>
                  <p className="text-[11px] text-sky-950/80 leading-snug">
                    {plant.growingConditions.waterDemand}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Plot Spacing</span>
                  </div>
                  <p className="text-[11px] text-emerald-950/80 leading-snug">
                    {plant.growingConditions.spacing}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links to Next Sections */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveSection('guide')}
                className="p-3 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Step-By-Step</span>
                  <span className="text-xs font-bold text-stone-900">Growing Guide →</span>
                </div>
                <Sprout className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => setActiveSection('health')}
                className="p-3 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">{plant.diseases.length} Identified</span>
                  <span className="text-xs font-bold text-stone-900">Pests & Diseases →</span>
                </div>
                <Activity className="w-4 h-4 text-rose-600" />
              </button>
            </div>
          </div>
        )}

        {/* 2. GROWING GUIDE */}
        {activeSection === 'guide' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs text-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold">Practical Field Instructions</span>
                <p className="text-[11px] text-emerald-900/80">9 progressive stages from bed preparation to harvest</p>
              </div>
              <span className="text-xs font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-lg">
                {plant.growingGuide.length} Steps
              </span>
            </div>

            <div className="space-y-3">
              {plant.growingGuide.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 leading-tight">
                      {step.title}
                    </h4>
                  </div>

                  <p className="text-xs text-stone-600 font-medium">
                    {step.summary}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {step.instructions.map((inst, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{inst}</span>
                      </div>
                    ))}
                  </div>

                  {step.tips && (
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
                      <span className="font-bold shrink-0">💡 Agronomist Tip:</span>
                      <span className="leading-snug">{step.tips}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PLANT HEALTH & PESTS */}
        {activeSection === 'health' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Diseases Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-600" />
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Common Diseases ({plant.diseases.length})
                  </h3>
                </div>
                <span className="text-[10px] text-stone-400">Tap for pathology guide</span>
              </div>

              <div className="space-y-2">
                {plant.diseases.map((disease) => (
                  <button
                    key={disease.id}
                    onClick={() => setSelectedHealthItem(disease)}
                    className="w-full bg-white p-3.5 rounded-2xl border border-stone-200 hover:border-rose-400 text-left transition-all shadow-2xs group flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                          {disease.name}
                        </span>
                      </div>
                      {disease.scientificPathogen && (
                        <p className="text-[10px] font-serif italic text-stone-400 mt-0.5 truncate">
                          {disease.scientificPathogen}
                        </p>
                      )}
                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">
                        {disease.whatFarmerMayNotice || disease.whatItIs}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Pests Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Common Pests ({plant.pests.length})
                  </h3>
                </div>
                <span className="text-[10px] text-stone-400">Tap for damage & IPM steps</span>
              </div>

              <div className="space-y-2">
                {plant.pests.map((pest) => (
                  <button
                    key={pest.id}
                    onClick={() => setSelectedHealthItem(pest)}
                    className="w-full bg-white p-3.5 rounded-2xl border border-stone-200 hover:border-amber-400 text-left transition-all shadow-2xs group flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {pest.name}
                      </span>
                      {pest.scientificName && (
                        <p className="text-[10px] font-serif italic text-stone-400 mt-0.5 truncate">
                          {pest.scientificName}
                        </p>
                      )}
                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">
                        {pest.damageSigns}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* When to contact mentor banner */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-950 to-stone-900 text-white rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold">Uncertain on Field Pathology?</h4>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Connect with verified agronomy extension officers for field-level diagnosis or run an AI Leaf Scan for instant confidence scoring.
              </p>
              <button
                onClick={handleAskMentor}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold transition-colors"
              >
                Consult Dr. Aisha Rahman (Solanaceae Specialist)
              </button>
            </div>
          </div>
        )}

        {/* 4. WATERING */}
        {activeSection === 'watering' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Water Demand Overview */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Irrigation Requirements & Regimes
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-sky-950 space-y-1">
                <span className="font-bold">Requirements:</span>
                <p className="text-[11px] text-sky-900 leading-relaxed">
                  {plant.watering.requirements}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-800 space-y-1">
                <span className="font-bold">Recommended Frequency:</span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {plant.watering.recommendedFrequency}
                </p>
              </div>
            </div>

            {/* Under vs Over-watering Signs */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Signs of Under-Watering</span>
                </div>
                <div className="space-y-1">
                  {plant.watering.signsOfUnderWatering.map((sign, idx) => (
                    <div key={idx} className="text-[11px] text-amber-950/80 flex items-start gap-1.5">
                      <span className="text-amber-600">•</span>
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-sky-900 text-xs">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  <span>Signs of Over-Watering</span>
                </div>
                <div className="space-y-1">
                  {plant.watering.signsOfOverWatering.map((sign, idx) => (
                    <div key={idx} className="text-[11px] text-sky-950/80 flex items-start gap-1.5">
                      <span className="text-sky-600">•</span>
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Tips */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold">Practical Field Water Tip:</span>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                {plant.watering.practicalTips}
              </p>
            </div>
          </div>
        )}

        {/* 5. SOIL PREPARATION */}
        {activeSection === 'soil' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Soil Conditions & Physical Properties
                </h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {plant.soil.suitableSoilConditions}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-stone-500 text-[10px] block">Ideal pH Range</span>
                  <span className="font-bold text-stone-900 text-xs">{plant.soil.phRange}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-stone-500 text-[10px] block">Drainage Standard</span>
                  <span className="font-bold text-stone-900 text-xs truncate">{plant.soil.drainageRequirements}</span>
                </div>
              </div>
            </div>

            {/* Preparation steps */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Soil Preparation Instructions
              </h4>
              <div className="space-y-1.5">
                {plant.soil.soilPreparation.map((prep, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-800">
                    <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{prep}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Soil Management */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Ongoing Soil Management
              </h4>
              <div className="space-y-1.5">
                {plant.soil.basicSoilManagement.map((mgmt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{mgmt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. NUTRITION & FERTILIZER */}
        {activeSection === 'nutrition' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Requirements */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2.5">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                General Nutrient Requirements
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                {plant.nutrition.generalRequirements}
              </p>
            </div>

            {/* Timing Guidance */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Recommended Application Timing
              </h4>
              <div className="space-y-1.5">
                {plant.nutrition.timingGuidance.map((time, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800">
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Deficiencies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Common Nutrient Deficiencies
              </h4>
              <div className="space-y-2.5">
                {plant.nutrition.deficiencies.map((def, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{def.nutrient} Deficiency</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Visual Symptom
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      <strong>Symptoms:</strong> {def.symptoms}
                    </p>
                    <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-950">
                      <strong>Recommended Correction:</strong> {def.treatment}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsible Agronomy Disclaimer */}
            <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-[11px] text-stone-500 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <strong>Fertilizer Disclaimer:</strong> Exact chemical kilogram dosages should be calculated based on local soil lab analysis. AgriLink does not publish generic chemical formulas that risk soil salinity or nitrate leaching.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disease Detail Modal */}
      {selectedHealthItem && (
        <DiseaseDetailModal
          item={selectedHealthItem}
          cropName={plant.name}
          onClose={() => {
            setSelectedHealthItem(null);
            setSelectedStudyDiseaseId(null);
          }}
        />
      )}
    </div>
  );
};
