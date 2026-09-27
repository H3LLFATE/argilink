import React, { useState } from 'react';
import {
  X,
  Search,
  HardDrive,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ScanLine,
  Image as ImageIcon,
  Clock,
  Sparkles,
  Sprout,
} from 'lucide-react';
import { READY_MADE_CROP_SAMPLES, ReadyMadeCropSample } from '../../data/readyMadeSamples';
import { AiScanPreset } from '../../types';

interface SampleLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: AiScanPreset, autoScan?: boolean) => void;
  activePresetId?: string;
}

export const SampleLibraryModal: React.FC<SampleLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
  activePresetId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Photos (9)', icon: '📷' },
    { id: 'chili', label: 'Chili Parcel', icon: '🌶️' },
    { id: 'rice', label: 'Paddy Rice', icon: '🌾' },
    { id: 'tomato', label: 'Tomato Nursery', icon: '🍅' },
    { id: 'corn', label: 'Sweet Corn', icon: '🌽' },
    { id: 'durian', label: 'Durian Orchard', icon: '🌳' },
  ];

  const filteredSamples = READY_MADE_CROP_SAMPLES.filter((sample) => {
    const matchesCategory = selectedCategory === 'all' || sample.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      sample.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.cropVariety.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePick = (sample: ReadyMadeCropSample, autoScan: boolean) => {
    onSelectSample(sample, autoScan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Device File Picker Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-emerald-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">
                  Choose Photo from Device
                </h2>
                <span className="text-[10px] bg-stone-800 text-stone-300 font-mono px-2 py-0.5 rounded border border-stone-700">
                  /storage/DCIM/Field_Captures
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Select a high-resolution leaf or plant capture from your album
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Album Filter */}
        <div className="p-3 border-b border-stone-200 space-y-2 bg-stone-50/80 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by photo filename or crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            />
          </div>

          {/* Album Folder Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Device Photo Gallery Grid */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-stone-100/50">
          {filteredSamples.length === 0 ? (
            <div className="p-8 text-center text-stone-500 bg-white rounded-2xl border border-dashed border-stone-200">
              <Camera className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              <p className="text-xs font-semibold">No photos found matching your query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
              >
                View all photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSamples.map((sample) => {
                const isSelected = activePresetId === sample.id;
                return (
                  <div
                    key={sample.id}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'border-stone-200 hover:border-emerald-500/50'
                    }`}
                  >
                    {/* Photo Viewfinder */}
                    <div className="relative h-36 bg-stone-950 overflow-hidden group">
                      <img
                        src={sample.image}
                        alt={sample.fileName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Top Metadata Badges */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-white">
                          {sample.resolution}
                        </span>

                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-stone-200">
                          {sample.fileSize}
                        </span>
                      </div>

                      {/* Bottom Filename Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                        <div className="text-xs font-mono font-bold truncate flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{sample.fileName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Details */}
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-stone-900 truncate">
                            {sample.cropName}
                          </span>
                          <span className="text-[10px] text-stone-500 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{sample.capturedDate}</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                          {sample.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handlePick(sample, false)}
                          className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-[11px] font-semibold transition-colors"
                        >
                          Select Photo
                        </button>

                        <button
                          onClick={() => handlePick(sample, true)}
                          className="flex-1 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                        >
                          <ScanLine className="w-3.5 h-3.5" />
                          <span>Analyze Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>{filteredSamples.length} photos in camera directory</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl font-semibold text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
