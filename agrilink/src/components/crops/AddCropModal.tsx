import { IMAGE_PATHS } from '../../config/imageMasterConfig';
import React, { useState } from 'react';
import { X, Sprout, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddCropModal: React.FC = () => {
  const { isAddCropOpen, setIsAddCropOpen, addCrop, plots, startNewPlotDesign } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form fields
  const [cropName, setCropName] = useState('Chili');
  const [variety, setVariety] = useState('Kulai F1 Hybrid');
  const [plotId, setPlotId] = useState(plots[0]?.id || 'plot-a');
  const [plotName, setPlotName] = useState(plots[0]?.name.split('—')[0].trim() || 'Plot A');
  const [areaAcres, setAreaAcres] = useState('1.0');
  const [plantedDate, setPlantedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2026-11-30');
  const [stage, setStage] = useState('Seedling stage');
  const [notes, setNotes] = useState('');

  if (!isAddCropOpen) return null;

  const cropPresets = [
    { name: 'Chili', variety: 'Kulai F1 Hybrid', image: IMAGE_PATHS.chiliLeaf },
    { name: 'Paddy Rice', variety: 'MR297 Fragrant', image: IMAGE_PATHS.riceBlast },
    { name: 'Durian', variety: 'Musang King (D197)', image: IMAGE_PATHS.farmOverview },
    { name: 'Tomato', variety: 'Red Ruby Beefsteak', image: IMAGE_PATHS.plantTomato },
    { name: 'Sweet Corn', variety: 'Honey Jean Hybrid', image: IMAGE_PATHS.plantCorn },
    { name: 'Soybean', variety: 'Anjasmoro Golden', image: IMAGE_PATHS.soybean },
  ];

  const handleSelectPreset = (preset: typeof cropPresets[0]) => {
    setCropName(preset.name);
    setVariety(preset.variety);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedPreset = cropPresets.find((p) => p.name === cropName);
    const selectedPlot = plots.find((p) => p.id === plotId);

    addCrop({
      name: cropName,
      variety,
      plotId,
      plotName: selectedPlot?.name || plotName,
      areaAcres: parseFloat(areaAcres) || 1.0,
      plantedDate,
      expectedHarvestDate,
      healthStatus: 'healthy',
      healthScore: 98,
      lastChecked: 'Today, Just now',
      stage,
      image: matchedPreset?.image || cropPresets[0].image,
      notes: notes || 'Planted using certified hybrid seeds and basal compost.',
      recentIssues: [],
    });

    setIsAddCropOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Add New Crop Record</h2>
            <p className="text-[11px] text-stone-500">Step {step} of 3</p>
          </div>
          <button
            onClick={() => setIsAddCropOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 gap-1 px-4 pt-2 shrink-0">
          <div className={`h-1 rounded-full ${step >= 1 ? 'bg-emerald-600' : 'bg-stone-200'}`} />
          <div className={`h-1 rounded-full ${step >= 2 ? 'bg-emerald-600' : 'bg-stone-200'}`} />
          <div className={`h-1 rounded-full ${step >= 3 ? 'bg-emerald-600' : 'bg-stone-200'}`} />
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* STEP 1: Crop & Variety */}
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Select Crop Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {cropPresets.map((p) => {
                    const isSelected = cropName === p.name;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => handleSelectPreset(p)}
                        className={`p-2.5 rounded-xl border text-center transition-all text-xs flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <Sprout className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Crop Variety / Cultivar
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. Kulai F1 Hybrid"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Current Growth Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                >
                  <option>Seedling stage</option>
                  <option>Vegetative growth</option>
                  <option>Tillering / Branching</option>
                  <option>Flowering & Budding</option>
                  <option>Fruiting & Grain filling</option>
                  <option>Maturity / Pre-harvest</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Plot Assignment & Acreage */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Assign to Farm Plot
                </label>
                <div className="space-y-2">
                  {plots.map((p) => {
                    const isSelected = plotId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setPlotId(p.id);
                          setPlotName(p.name);
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600'
                            : 'bg-white border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-stone-900">{p.name}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {p.areaAcres} Acres · {p.soilType}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddCropOpen(false);
                      startNewPlotDesign();
                    }}
                    className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>🌱 Designate New Plot Boundary on Map</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Cultivated Area (Acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 3: Dates & Notes */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Planting Date
                  </label>
                  <input
                    type="date"
                    value={plantedDate}
                    onChange={(e) => setPlantedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Target Harvest
                  </label>
                  <input
                    type="date"
                    value={expectedHarvestDate}
                    onChange={(e) => setExpectedHarvestDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Agronomic Notes & Field Condition
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Raised beds with silver-black plastic mulch. Drip irrigation tested."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-[11px] text-emerald-800 leading-relaxed">
                ✓ AgriLink will automatically generate smart monitoring tasks and pest warnings based on this crop type.
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-stone-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Save & Monitor</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
