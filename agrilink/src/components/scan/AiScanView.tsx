import React, { useState } from 'react';
import {
  Camera,
  FolderOpen,
  ScanLine,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AI_SCAN_PRESETS } from '../../data/mockData';
import { READY_MADE_CROP_SAMPLES } from '../../data/readyMadeSamples';
import { AiScanPreset } from '../../types';
import { AiResultView } from './AiResultView';
import { SampleLibraryModal } from './SampleLibraryModal';

export const AiScanView: React.FC = () => {
  const {
    activeScanPreset,
    setActiveScanPreset,
    isAnalyzing,
    runAnalysis,
    scanResult,
    setScanResult,
    connectivity,
  } = useApp();

  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);
  const [selectedCustomSample, setSelectedCustomSample] = useState<AiScanPreset | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(AI_SCAN_PRESETS[0].id);

  // If result is already generated, render AiResultView
  if (scanResult && !isAnalyzing) {
    return <AiResultView result={scanResult} onReset={() => setScanResult(null)} />;
  }

  const handleSelectPreset = (preset: AiScanPreset) => {
    setSelectedCustomSample(null);
    setSelectedPresetId(preset.id);
    setActiveScanPreset(preset);
  };

  const handleSelectFromLibrary = (sample: AiScanPreset, autoScan: boolean = false) => {
    setSelectedCustomSample(sample);
    setSelectedPresetId(sample.id);
    setActiveScanPreset(sample);
    if (autoScan) {
      runAnalysis(sample);
    }
  };

  const handleStartScan = (preset?: AiScanPreset) => {
    const targetPreset =
      preset ||
      selectedCustomSample ||
      AI_SCAN_PRESETS.find((p) => p.id === selectedPresetId) ||
      AI_SCAN_PRESETS[0];
    runAnalysis(targetPreset);
  };

  const currentPreset =
    selectedCustomSample ||
    AI_SCAN_PRESETS.find((p) => p.id === selectedPresetId) ||
    AI_SCAN_PRESETS[0];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ScanLine className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-stone-900 tracking-tight">AI Crop Health Analysis</h2>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              connectivity === 'offline'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {connectivity === 'offline' ? 'On-Device Edge Model' : 'Cloud Neural Engine'}
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
          Capture or upload crop foliage to identify fungal, bacterial, or physiological issues with confidence scoring.
        </p>
      </div>

      {/* Main Viewfinder / Image Preview Box */}
      <div className="relative bg-stone-900 rounded-3xl overflow-hidden aspect-4/3 shadow-md border border-stone-800 flex items-center justify-center group">
        <img
          src={currentPreset.image}
          alt={currentPreset.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isAnalyzing ? 'opacity-40 filter blur-xs' : 'opacity-85'
          }`}
        />

        {/* Viewfinder Reticle Corners */}
        <div className="absolute inset-4 pointer-events-none border border-white/20 rounded-2xl flex flex-col justify-between p-2">
          <div className="flex justify-between">
            <span className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
            <span className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
          </div>
          <div className="flex justify-between">
            <span className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
            <span className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
          </div>
        </div>

        {/* Scanning Animation Radar */}
        {isAnalyzing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/60 backdrop-blur-xs text-white p-4">
            <div className="relative w-16 h-16 flex items-center justify-center mb-3">
              <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin" />
              <ScanLine className="w-6 h-6 text-white absolute" />
            </div>
            <p className="text-xs font-bold tracking-wide animate-pulse text-emerald-300">
              Analyzing Leaf Pathology...
            </p>
            <p className="text-[11px] text-stone-400 mt-1 text-center">
              Scanning chlorophyll distribution, necrotic lesions & margin chlorosis
            </p>
          </div>
        ) : (
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
              <span className="font-semibold text-emerald-300">{currentPreset.cropName}</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-stone-300 text-[11px]">
              Ready to analyze
            </div>
          </div>
        )}
      </div>

      {/* Primary Trigger Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => handleStartScan(currentPreset)}
          disabled={isAnalyzing}
          className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-95 disabled:opacity-50 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Camera className="w-4 h-4" />
          <span>Scan This Leaf</span>
        </button>

        <button
          onClick={() => setIsFolderOpen(true)}
          disabled={isAnalyzing}
          className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300 text-emerald-900 active:scale-95 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <FolderOpen className="w-4 h-4 text-emerald-700" />
          <span>Choose from Device</span>
        </button>
      </div>

      {/* Device Photo Gallery Modal */}
      <SampleLibraryModal
        isOpen={isFolderOpen}
        onClose={() => setIsFolderOpen(false)}
        onSelectSample={handleSelectFromLibrary}
        activePresetId={selectedCustomSample?.id || selectedPresetId}
      />

      {/* Recent Camera Roll Captures */}
      <div className="bg-white border border-stone-200 p-3.5 rounded-2xl space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-stone-900">Recent Camera Roll Captures</h3>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">/DCIM/Camera</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {AI_SCAN_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-2 rounded-xl border text-left transition-all flex items-start gap-2 ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600 text-emerald-950'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <img
                  src={preset.image}
                  alt={preset.title}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-300"
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    {preset.cropName.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-stone-500 truncate mt-0.5">
                    {preset.confidenceTier === 'high' ? '88% Conf.' : preset.confidenceTier === 'medium' ? '67% Conf.' : '32% Low Conf.'}
                  </div>
                  <span
                    className={`text-[9px] font-semibold block truncate mt-0.5 ${
                      preset.confidenceTier === 'high'
                        ? 'text-emerald-700'
                        : preset.confidenceTier === 'medium'
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {preset.confidenceTier === 'low' ? 'Trigger Mentor' : preset.diseaseName.split('(')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsible AI Notice */}
      <div className="bg-stone-100/70 border border-stone-200 p-3 rounded-xl text-[11px] text-stone-600 flex items-start gap-2 leading-relaxed">
        <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
        <span>
          <strong>Responsible AI Notice:</strong> AgriLink assessments are preliminary agronomic screening aids. When AI confidence is under 70%, the system prompts you to escalate to a verified agronomist.
        </span>
      </div>
    </div>
  );
};
