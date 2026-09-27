import React, { useState } from 'react';
import {
  Trophy,
  Star,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  MessageSquare,
  Award,
  Crown,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';
import { NATIONWIDE_TOP_MENTORS } from '../../data/mentorLeaderboard';
import { useApp } from '../../context/AppContext';

export const MentorLeaderboardSection: React.FC = () => {
  const { setSelectedMentorId } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showCriteriaModal, setShowCriteriaModal] = useState<boolean>(false);

  const top3 = NATIONWIDE_TOP_MENTORS.slice(0, 3);
  const rank4to10 = NATIONWIDE_TOP_MENTORS.slice(3, 10);

  const rank1 = top3[0];
  const rank2 = top3[1];
  const rank3 = top3[2];

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-stone-50 border border-amber-200/80 rounded-3xl p-4 shadow-sm space-y-4 overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Trophy className="w-5 h-5 text-amber-100 fill-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
                <span>Nationwide Top Mentors</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300/60">
                  Malaysia Top 10
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Ranked by verified farmer satisfaction reviews & case resolution scores
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowCriteriaModal(true)}
            className="p-1.5 text-stone-400 hover:text-stone-600 transition-colors"
            title="Ranking Criteria"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 bg-white border border-stone-200 hover:bg-stone-100 rounded-xl text-stone-600 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 relative z-10 animate-in fade-in duration-200">
          {/* Top 3 Podium (Podium display: 2nd, 1st, 3rd) */}
          <div className="grid grid-cols-3 gap-2 items-end pt-2">
            {/* 2nd Place (Silver) */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-2.5 text-center flex flex-col items-center justify-between shadow-xs relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-200 text-stone-700 text-[10px] font-bold px-2 py-0.2 rounded-full border border-stone-300 shadow-2xs">
                🥈 2nd
              </div>
              <div className="mt-1 relative">
                <img
                  src={rank2.avatar}
                  alt={rank2.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-stone-300"
                />
              </div>
              <div className="mt-1.5 w-full">
                <h4 className="text-[11px] font-bold text-stone-900 truncate leading-tight">
                  {rank2.name}
                </h4>
                <p className="text-[9px] text-stone-500 truncate">{rank2.state}</p>
                <div className="flex items-center justify-center gap-0.5 text-[10px] font-bold text-amber-600 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{rank2.rating}</span>
                </div>
                <span className="text-[9px] text-stone-400 block">({rank2.reviewsCount} reviews)</span>
              </div>
              <button
                onClick={() => setSelectedMentorId('m2')}
                className="mt-2 w-full py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[10px] font-bold transition-colors"
              >
                Consult
              </button>
            </div>

            {/* 1st Place (Gold - Taller & Prominent) */}
            <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-400 rounded-2xl p-3 text-center flex flex-col items-center justify-between shadow-md relative scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs flex items-center gap-0.5">
                <Crown className="w-3 h-3 text-amber-200 fill-amber-200" />
                <span>🥇 1st National</span>
              </div>
              <div className="mt-1.5 relative">
                <img
                  src={rank1.avatar}
                  alt={rank1.name}
                  className="w-13 h-13 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                />
              </div>
              <div className="mt-1.5 w-full">
                <h4 className="text-xs font-extrabold text-stone-900 truncate leading-tight">
                  {rank1.name}
                </h4>
                <p className="text-[10px] font-semibold text-emerald-700 truncate">{rank1.organization.split('/')[0]}</p>
                <div className="flex items-center justify-center gap-0.5 text-xs font-bold text-amber-600 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rank1.rating}</span>
                  <span className="text-[10px] text-stone-400 font-normal">({rank1.reviewsCount})</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-md inline-block mt-0.5">
                  {rank1.resolutionRate}% Solved
                </span>
              </div>
              <button
                onClick={() => setSelectedMentorId('m1')}
                className="mt-2 w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[10px] font-bold shadow-xs transition-colors"
              >
                Consult Top
              </button>
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-2.5 text-center flex flex-col items-center justify-between shadow-xs relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-700/80 text-white text-[10px] font-bold px-2 py-0.2 rounded-full border border-amber-600 shadow-2xs">
                🥉 3rd
              </div>
              <div className="mt-1 relative">
                <img
                  src={rank3.avatar}
                  alt={rank3.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-700/50"
                />
              </div>
              <div className="mt-1.5 w-full">
                <h4 className="text-[11px] font-bold text-stone-900 truncate leading-tight">
                  {rank3.name}
                </h4>
                <p className="text-[9px] text-stone-500 truncate">{rank3.state}</p>
                <div className="flex items-center justify-center gap-0.5 text-[10px] font-bold text-amber-600 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{rank3.rating}</span>
                </div>
                <span className="text-[9px] text-stone-400 block">({rank3.reviewsCount} reviews)</span>
              </div>
              <button
                onClick={() => setSelectedMentorId('m3')}
                className="mt-2 w-full py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[10px] font-bold transition-colors"
              >
                Consult
              </button>
            </div>
          </div>

          {/* Ranks 4 to 10 List View */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-2.5 shadow-xs space-y-1.5">
            <div className="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between border-b border-stone-100 pb-1.5">
              <span>Ranks 4 to 10 (Nationwide Mentors)</span>
              <span>Farmer Rating & Reviews</span>
            </div>

            {rank4to10.map((mentor) => (
              <div
                key={mentor.rank}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 text-center text-xs font-bold text-stone-500">
                    #{mentor.rank}
                  </span>
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-900 truncate">
                        {mentor.name}
                      </span>
                      <span className="text-[9px] text-stone-500 bg-stone-100 px-1.5 py-0.2 rounded">
                        {mentor.state}
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {mentor.title}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <div className="flex items-center justify-end gap-1 text-xs font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{mentor.rating}</span>
                  </div>
                  <div className="text-[9px] text-stone-400">
                    {mentor.reviewsCount} reviews · {mentor.resolutionRate}% solved
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Criteria Info Modal */}
      {showCriteriaModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-stone-900">How Rankings Are Determined</h4>
              </div>
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Nationwide mentor placements are updated weekly using verified farm consultation records:
            </p>

            <div className="space-y-2 text-[11px] text-stone-700">
              <div className="p-2 bg-stone-50 rounded-xl flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Client Farmer Ratings (50%):</strong> Star reviews provided by farmers after consultation resolution.
                </span>
              </div>
              <div className="p-2 bg-stone-50 rounded-xl flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Diagnostic Resolution Rate (30%):</strong> Percentage of fungal, pest, or nutrition cases verified as corrected in plot logs.
                </span>
              </div>
              <div className="p-2 bg-stone-50 rounded-xl flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Extension Service Volume (20%):</strong> Verified consultations delivered across Malaysian districts.
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowCriteriaModal(false)}
              className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
