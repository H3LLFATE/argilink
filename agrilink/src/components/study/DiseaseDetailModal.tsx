import React from 'react';
import {
  X,
  AlertTriangle,
  ShieldCheck,
  Bug,
  Activity,
  MessageSquare,
  ShoppingBag,
  Info,
  CheckCircle2,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlantDiseaseItem, PlantPestItem } from '../../types';

interface DiseaseDetailModalProps {
  item: PlantDiseaseItem | PlantPestItem | null;
  cropName: string;
  onClose: () => void;
}

export const DiseaseDetailModal: React.FC<DiseaseDetailModalProps> = ({
  item,
  cropName,
  onClose,
}) => {
  const { setActiveTab, setSelectedMentorId, startMentorInquiry, setSelectedProductId } = useApp();

  if (!item) return null;

  const isDisease = 'whatItIs' in item;
  const isPest = 'damageSigns' in item;

  const handleAskMentor = () => {
    startMentorInquiry(
      'm1',
      cropName,
      `Guide Inquiry: ${item.name}`,
      `Hi Dr. Aisha, I am reviewing the crop guide for ${cropName} regarding ${item.name}. Could you advise on practical field preventative protocols under Malaysian weather conditions?`,
      item.image
    );
    setSelectedMentorId('m1');
    setActiveTab('community');
    onClose();
  };

  const handleFindSupplies = () => {
    setActiveTab('market');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isPest ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {isPest ? <Bug className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  {cropName} · {isPest ? 'Pest Guide' : 'Disease Guide'}
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">{item.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-stone-900 flex-1 text-xs">
          {/* Scientific pathogen */}
          {('scientificPathogen' in item && item.scientificPathogen) ? (
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <span className="text-stone-500 font-medium">Pathogen:</span>
              <span className="font-serif italic font-semibold text-stone-800">
                {item.scientificPathogen}
              </span>
            </div>
          ) : ('scientificName' in item && item.scientificName) ? (
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <span className="text-stone-500 font-medium">Scientific Name:</span>
              <span className="font-serif italic font-semibold text-stone-800">
                {item.scientificName}
              </span>
            </div>
          ) : null}

          {/* What it is */}
          {isDisease && 'whatItIs' in item && (
            <div>
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                What It Is
              </h4>
              <p className="text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-2xl border border-stone-100">
                {item.whatItIs}
              </p>
            </div>
          )}

          {/* What the farmer may notice / Damage signs */}
          {('whatFarmerMayNotice' in item && item.whatFarmerMayNotice) && (
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>What The Farmer May Notice In Field</span>
              </div>
              <p className="text-amber-900/90 leading-relaxed text-[11px]">
                {item.whatFarmerMayNotice}
              </p>
            </div>
          )}

          {('damageSigns' in item && item.damageSigns) && (
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                <Bug className="w-3.5 h-3.5 text-amber-600" />
                <span>Damage Signs on Foliage & Fruit</span>
              </div>
              <p className="text-amber-900/90 leading-relaxed text-[11px]">
                {item.damageSigns}
              </p>
            </div>
          )}

          {/* Symptoms List */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1.5">
              Key Diagnostic Symptoms
            </h4>
            <div className="space-y-1.5">
              {item.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-stone-800"
                >
                  <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    •
                  </span>
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Possible Causes */}
          {'possibleCauses' in item && item.possibleCauses && item.possibleCauses.length > 0 && (
            <div>
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1.5">
                Possible Environmental & Agronomic Causes
              </h4>
              <div className="space-y-1">
                {item.possibleCauses.map((cause, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-stone-50 border border-stone-100 text-stone-700"
                  >
                    {cause}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prevention */}
          <div>
            <h4 className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prevention & Cultural Practices</span>
            </h4>
            <div className="space-y-1.5">
              {item.prevention.map((prev, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-950"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{prev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* General Management */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1.5">
              General Management & Treatment Guidelines
            </h4>
            <div className="space-y-1.5">
              {item.management.map((mgmt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-800"
                >
                  <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{mgmt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* When to seek mentor help */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sky-900 text-xs">
              <Clock className="w-3.5 h-3.5 text-sky-700" />
              <span>When To Seek Expert / Extension Help</span>
            </div>
            <p className="text-sky-900/90 leading-relaxed text-[11px]">
              {item.whenToSeekMentor}
            </p>
          </div>

          {/* Responsible Notice */}
          <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-[10px] text-stone-500 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <span>
              <strong>Agronomic Guidance Notice:</strong> This guidance is for reference and field decision-support. It does not constitute a guaranteed chemical prescription. Consult extension officers or certified agronomists before large-scale pesticide applications.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 border-t border-stone-200 bg-stone-50 flex items-center gap-2 shrink-0">
          <button
            onClick={handleAskMentor}
            className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Agronomist Mentor</span>
          </button>
          <button
            onClick={handleFindSupplies}
            className="py-2.5 px-3 bg-white border border-stone-300 hover:border-emerald-600 active:scale-95 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
            <span>Find Supplies</span>
          </button>
        </div>
      </div>
    </div>
  );
};
