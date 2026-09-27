import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Layers,
  Map,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Crop, HealthStatus } from '../../types';

export const CropsView: React.FC = () => {
  const {
    crops,
    plots,
    setSelectedCropId,
    setIsAddCropOpen,
    setIsFarmMapOpen,
    setActiveTab,
    runAnalysis,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlotFilter, setSelectedPlotFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter crops
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.plotName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlot = selectedPlotFilter === 'all' || crop.plotId === selectedPlotFilter;
    const matchesStatus = statusFilter === 'all' || crop.healthStatus === statusFilter;

    return matchesSearch && matchesPlot && matchesStatus;
  });

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Top Header & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Crop Management</h2>
          <p className="text-xs text-stone-500 font-medium">
            {crops.length} monitored crops across {plots.length} farm plots
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsFarmMapOpen(true)}
            className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
            title="Open Interactive Farm Map"
          >
            <Map className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAddCropOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Crop</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search crop, variety, or plot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => {
              setSelectedPlotFilter('all');
              setStatusFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
              selectedPlotFilter === 'all' && statusFilter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            All Crops ({crops.length})
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'attention' ? 'all' : 'attention')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
              statusFilter === 'attention'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            Needs Attention ({crops.filter((c) => c.healthStatus === 'attention').length})
          </button>

          {plots.map((plot) => (
            <button
              key={plot.id}
              onClick={() => setSelectedPlotFilter(selectedPlotFilter === plot.id ? 'all' : plot.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
                selectedPlotFilter === plot.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {plot.name.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Crops List */}
      <div className="space-y-3">
        {crops.length === 0 ? (
          <div className="bg-white border border-dashed border-stone-300 p-8 rounded-2xl text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">No Crops Registered Yet</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Your farm account is brand new. Register your crops to track planting dates, monitor disease alerts, and calculate expected yields.
              </p>
            </div>
            <button
              onClick={() => setIsAddCropOpen(true)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Crop</span>
            </button>
          </div>
        ) : filteredCrops.length === 0 ? (
          <div className="bg-white border border-dashed border-stone-300 p-8 rounded-2xl text-center">
            <Sprout className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-stone-600">No crops matched your filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPlotFilter('all');
                setStatusFilter('all');
              }}
              className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setSelectedCropId(crop.id)}
              className="bg-white border border-stone-200 hover:border-emerald-600/50 rounded-2xl p-3 shadow-xs cursor-pointer transition-all hover:shadow-md group flex gap-3"
            >
              {/* Image Preview */}
              <div className="w-24 h-24 rounded-xl bg-stone-100 overflow-hidden relative shrink-0">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                    crop.healthStatus === 'healthy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {crop.healthStatus === 'healthy' ? 'Healthy' : 'Check Issue'}
                </span>
              </div>

              {/* Crop Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 truncate">{crop.name}</h3>
                      <p className="text-xs text-stone-500 truncate">{crop.variety}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold tabular-nums text-stone-900">
                        {crop.healthScore}%
                      </div>
                      <div className="text-[10px] text-stone-500">Health</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-stone-600 mt-1">
                    <span className="flex items-center gap-1 font-medium text-emerald-800">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      <span>{crop.plotName}</span>
                    </span>
                    <span>·</span>
                    <span>{crop.areaAcres} acres</span>
                    <span>·</span>
                    <span className="truncate">{crop.stage}</span>
                  </div>
                </div>

                {crop.recentIssues && crop.recentIssues.length > 0 && (
                  <div className="mt-1.5">
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded truncate inline-block max-w-full">
                      ⚠️ {crop.recentIssues[0]}
                    </span>
                  </div>
                )}

                <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                  <span>Planted: {crop.plantedDate}</span>
                  <span>Checked: {crop.lastChecked.split(',')[0]}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Map Entry Callout */}
      <div
        onClick={() => setIsFarmMapOpen(true)}
        className="bg-emerald-900 text-white p-3.5 rounded-2xl cursor-pointer hover:bg-emerald-950 transition-colors flex items-center justify-between shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Interactive Farm Plot Boundaries</h4>
            <p className="text-[11px] text-emerald-200/90 mt-0.5">
              View GPS coordinates, soil pH, irrigation lines & nearby suppliers.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-1 bg-emerald-800 rounded-lg whitespace-nowrap">
          Open Map
        </span>
      </div>
    </div>
  );
};
