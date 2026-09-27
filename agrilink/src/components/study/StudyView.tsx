import React, { useState, useMemo } from 'react';
import {
  Search,
  Compass,
  Download,
  CheckCircle2,
  Trash2,
  WifiOff,
  Sparkles,
  ChevronRight,
  Filter,
  ArrowRight,
  Layers,
  Sprout,
  Activity,
  Bug,
  Droplet,
  Sun,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PLANT_KNOWLEDGE_LIBRARY } from '../../data/plantKnowledgeData';
import { PlantKnowledge, PlantCategory } from '../../types';
import { PlantKnowledgePage } from './PlantKnowledgePage';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const StudyView: React.FC = () => {
  const {
    connectivity,
    downloadedPlantIds,
    downloadPlant,
    removeDownloadedPlant,
    downloadMyCrops,
    selectedStudyPlantId,
    setSelectedStudyPlantId,
    crops,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'all'>('all');
  const [activeTabSubView, setActiveTabSubView] = useState<'all' | 'offline'>('all');

  const isOffline = connectivity === 'offline';

  // Calculate total offline storage size in MB
  const totalOfflineSizeBytes = useMemo(() => {
    return PLANT_KNOWLEDGE_LIBRARY
      .filter((p) => downloadedPlantIds.includes(p.id))
      .reduce((sum, p) => sum + (p.packageSizeBytes || 2500000), 0);
  }, [downloadedPlantIds]);

  const totalOfflineMB = (totalOfflineSizeBytes / (1024 * 1024)).toFixed(1);

  // If a specific plant is selected, render the dedicated PlantKnowledgePage
  if (selectedStudyPlantId) {
    const activePlant = PLANT_KNOWLEDGE_LIBRARY.find((p) => p.id === selectedStudyPlantId) || PLANT_KNOWLEDGE_LIBRARY[0];
    return (
      <ErrorBoundary
        fallbackTitle="Crop Guide Display Notice"
        onReset={() => setSelectedStudyPlantId(null)}
      >
        <PlantKnowledgePage
          plant={activePlant}
          initialSection="guide"
          onBack={() => setSelectedStudyPlantId(null)}
        />
      </ErrorBoundary>
    );
  }

  // Filtered plants by category, search query, or offline tab
  const filteredPlants = useMemo(() => {
    return PLANT_KNOWLEDGE_LIBRARY.filter((plant) => {
      // Offline filter tab
      if (activeTabSubView === 'offline' && !downloadedPlantIds.includes(plant.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && plant.category !== selectedCategory) {
        return false;
      }

      // Search Query across plant name, scientific, category, diseases, pests, soil, watering
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = plant.name.toLowerCase().includes(q);
        const matchScientific = plant.scientificName.toLowerCase().includes(q);
        const matchLocal = (plant.commonLocalName || '').toLowerCase().includes(q);
        const matchCategory = plant.categoryLabel.toLowerCase().includes(q);
        const matchDesc = plant.description.toLowerCase().includes(q);
        const matchDisease = plant.diseases.some(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.symptoms.some((s) => s.toLowerCase().includes(q)) ||
            (d.whatFarmerMayNotice && d.whatFarmerMayNotice.toLowerCase().includes(q))
        );
        const matchPest = plant.pests.some(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.damageSigns.toLowerCase().includes(q) ||
            p.symptoms.some((s) => s.toLowerCase().includes(q))
        );
        const matchSoil =
          plant.soil.suitableSoilConditions.toLowerCase().includes(q) ||
          plant.soil.phRange.toLowerCase().includes(q);
        const matchWater =
          plant.watering.requirements.toLowerCase().includes(q) ||
          plant.watering.recommendedFrequency.toLowerCase().includes(q);
        const matchFertilizer =
          plant.nutrition.generalRequirements.toLowerCase().includes(q) ||
          plant.nutrition.deficiencies.some((d) => d.nutrient.toLowerCase().includes(q));

        return (
          matchName ||
          matchScientific ||
          matchLocal ||
          matchCategory ||
          matchDesc ||
          matchDisease ||
          matchPest ||
          matchSoil ||
          matchWater ||
          matchFertilizer
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, activeTabSubView, downloadedPlantIds]);

  // Categories list
  const categories: { id: PlantCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Plants', icon: '🌱' },
    { id: 'vegetables', label: 'Vegetables', icon: '🌶️' },
    { id: 'grains', label: 'Grains & Paddy', icon: '🌾' },
    { id: 'fruits', label: 'Fruits & Orchards', icon: '🌳' },
    { id: 'tubers', label: 'Tubers & Roots', icon: '🥔' },
    { id: 'cash_crops', label: 'Cash Crops', icon: '🌽' },
  ];

  // Registered crops count from user's farm
  const registeredCropNames = crops.map((c) => c.name);

  return (
    <div className="px-4 py-4 space-y-4 pb-20">
      {/* 1. Header & Title */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight leading-tight">
                Crop Guides & Knowledge Library
              </h2>
              <p className="text-[11px] text-stone-500">Offline-first agricultural field guides</p>
            </div>
          </div>

          {/* Offline Availability Indicator (Section 19) */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Available Offline: {downloadedPlantIds.length} plants</span>
            </span>
            <span className="text-[9px] text-stone-400 mt-0.5 font-medium">
              {totalOfflineMB} MB cached locally
            </span>
          </div>
        </div>
      </div>

      {/* 2. OFFLINE MODE BANNER (Section 26) */}
      {isOffline && (
        <div className="p-3.5 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="uppercase tracking-wider text-[11px]">OFFLINE MODE ACTIVE</span>
          </div>
          <p className="text-[11px] text-stone-700 leading-relaxed">
            You are operating disconnected. You can still access:
          </p>
          <div className="grid grid-cols-2 gap-1 text-[10px] text-stone-800 font-medium">
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> Downloaded plant guides
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> Disease & pest pathology
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> Step-by-step procedures
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> Previous AI assessments
            </span>
          </div>
          <p className="text-[10px] text-stone-500 italic">
            Non-downloaded plants require an internet connection to sync.
          </p>
        </div>
      )}

      {/* 3. Global Search Bar (Section 28) */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plants, diseases, pests or farming topics..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-2xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 text-[10px]">
          <span className="text-stone-400 shrink-0">Popular:</span>
          {['Chili', 'Paddy Rice', 'Tomato', 'Anthracnose', 'Yellow leaves', 'Watering', 'Fertilizer'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`px-2 py-0.5 rounded-lg border whitespace-nowrap transition-colors ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 4. SMART DOWNLOADS: Download My Crops (Section 27) */}
      {crops.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-950 to-stone-900 text-white p-3.5 rounded-2xl shadow-sm space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Smart Offline Sync: Download My Crops</h4>
                <p className="text-[10px] text-emerald-300/80">
                  Registered plots: {registeredCropNames.join(', ') || 'Chili, Rice'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <p className="text-[11px] text-stone-300 leading-snug">
              Store complete guides, spraying schedules & disease libraries for all your registered crops.
            </p>
            <button
              onClick={downloadMyCrops}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Library Sub-Tabs: All Plants vs My Offline Plants (Section 24) */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTabSubView('all')}
            className={`text-xs font-bold pb-2 relative transition-colors ${
              activeTabSubView === 'all'
                ? 'text-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            All Crops ({PLANT_KNOWLEDGE_LIBRARY.length})
            {activeTabSubView === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTabSubView('offline')}
            className={`text-xs font-bold pb-2 relative transition-colors flex items-center gap-1.5 ${
              activeTabSubView === 'offline'
                ? 'text-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Offline Plants ({downloadedPlantIds.length})</span>
            {activeTabSubView === 'offline' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
            )}
          </button>
        </div>

        <span className="text-[10px] text-stone-400 font-medium">
          {filteredPlants.length} displayed
        </span>
      </div>

      {/* 6. Categories Horizontal Filter (Section 19) */}
      {activeTabSubView === 'all' && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* 7. Dedicated "My Offline Plants" Quick Strip (When on 'all' tab and no search active) */}
      {!searchQuery && activeTabSubView === 'all' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>My Plants (Offline Ready)</span>
            </h3>
            <span className="text-[10px] text-emerald-700 font-semibold">
              ✓ Ready for Field Use
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PLANT_KNOWLEDGE_LIBRARY.filter((p) => downloadedPlantIds.includes(p.id))
              .slice(0, 4)
              .map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => setSelectedStudyPlantId(plant.id)}
                  className="bg-white border border-stone-200 hover:border-emerald-500 rounded-2xl p-2.5 shadow-2xs cursor-pointer transition-all flex items-center gap-2 group"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-stone-100"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-700 truncate leading-tight">
                      {plant.name}
                    </h4>
                    <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{plant.packageSize}</span>
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-600 shrink-0" />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 8. Plant Knowledge Cards Grid (Section 20, 23, 25, 26) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            {activeTabSubView === 'offline' ? 'Offline Knowledge Packages' : 'Plant Knowledge Library'}
          </h3>
          <span className="text-[10px] text-stone-400">
            {filteredPlants.length} {filteredPlants.length === 1 ? 'Crop' : 'Crops'}
          </span>
        </div>

        {filteredPlants.length === 0 ? (
          <div className="bg-stone-50 border border-dashed border-stone-300 rounded-3xl p-8 text-center space-y-2">
            <Sprout className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-xs font-bold text-stone-800">No plant guides matched your query</p>
            <p className="text-[11px] text-stone-500">
              Try searching with another keyword like "Chili", "Rice", "Tomato", or "Early Blight".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveTabSubView('all');
              }}
              className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPlants.map((plant) => {
              const isDownloaded = downloadedPlantIds.includes(plant.id);
              const isAvailable = !isOffline || isDownloaded;

              return (
                <div
                  key={plant.id}
                  className={`bg-white border rounded-3xl overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between ${
                    isDownloaded
                      ? 'border-emerald-200'
                      : isOffline
                      ? 'border-stone-200 opacity-75'
                      : 'border-stone-200'
                  }`}
                >
                  {/* Card Click opens plant knowledge */}
                  <div
                    onClick={() => setSelectedStudyPlantId(plant.id)}
                    className="cursor-pointer group flex-1"
                  >
                    <div className="relative h-32 bg-stone-900">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      {/* Category Badge & Offline Status */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold bg-white/90 backdrop-blur-xs text-stone-900 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                          {plant.categoryLabel}
                        </span>

                        {isDownloaded ? (
                          <span className="text-[10px] font-bold bg-emerald-600/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs backdrop-blur-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Available Offline</span>
                          </span>
                        ) : isOffline ? (
                          <span className="text-[10px] font-bold bg-amber-600/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs backdrop-blur-xs">
                            <WifiOff className="w-3 h-3" />
                            <span>Not Offline</span>
                          </span>
                        ) : null}
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] font-serif italic text-emerald-300 block truncate">
                          {plant.scientificName} {plant.commonLocalName ? `· ${plant.commonLocalName}` : ''}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-tight truncate mt-0.5">
                          {plant.name}
                        </h4>
                      </div>
                    </div>

                    {/* Plant Specs Snippet */}
                    <div className="p-3 space-y-2">
                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                        {plant.description}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                        <span className="font-medium">Period: {plant.typicalGrowingPeriod}</span>
                        <span>{plant.diseases.length} Diseases · {plant.pests.length} Pests</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer: Download for offline button */}
                  <div className="p-3 pt-0 flex items-center justify-between gap-2 border-t border-stone-100 bg-stone-50/50">
                    <span className="text-[10px] text-stone-500 font-medium">
                      Package: {plant.packageSize}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isDownloaded ? (
                        <>
                          <button
                            onClick={() => setSelectedStudyPlantId(plant.id)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold transition-colors"
                          >
                            Open Guide →
                          </button>
                          <button
                            onClick={() => removeDownloadedPlant(plant.id)}
                            title="Remove Download"
                            className="w-7 h-7 rounded-xl bg-stone-200/80 hover:bg-rose-100 hover:text-rose-700 text-stone-600 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => downloadPlant(plant.id)}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all shadow-2xs"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 9. Educational Callout Notice */}
      <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 text-stone-600 text-xs flex items-start gap-2.5 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900 block">Agronomic Standards Verified</span>
          Plant guides and IPM recommendations align with Good Agricultural Practices (MyGAP) and tropical soil standards from extension agencies.
        </div>
      </div>
    </div>
  );
};
