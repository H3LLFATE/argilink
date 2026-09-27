import React, { useState } from 'react';
import {
  X,
  User,
  Shield,
  Download,
  Trash2,
  Globe,
  Database,
  MapPin,
  Check,
  AlertTriangle,
  Award,
  Sparkles,
  FileCheck,
  Clock,
  Star,
  ChevronRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileModal: React.FC = () => {
  const {
    user,
    crops,
    plots,
    reminders,
    isProfileModalOpen,
    setIsProfileModalOpen,
    connectivity,
    updateUserCredentials,
    applyBecomeMentor,
  } = useApp();

  const [language, setLanguage] = useState<'EN' | 'BM'>('EN');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Credentials editing state
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [farmerIdInput, setFarmerIdInput] = useState(user.credentials?.nationalFarmerId || 'MY-KEDAH-AGRI-84920');
  const [specializationInput, setSpecializationInput] = useState(user.credentials?.specialization || 'Vegetables & Solanaceous Crops');
  const [expYearsInput, setExpYearsInput] = useState(user.credentials?.experienceYears?.toString() || '4');

  // Mentor Application Modal State (2 options)
  const [showMentorOnboarding, setShowMentorOnboarding] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'certificate' | 'trainee'>('certificate');
  const [certificateNameInput, setCertificateNameInput] = useState('DOA Sijil Amalan Pertanian Baik (myGAP)');
  const [issuerInput, setIssuerInput] = useState('Jabatan Pertanian Malaysia (DOA)');

  if (!isProfileModalOpen) return null;

  const handleExportData = () => {
    setExportComplete(true);
    setTimeout(() => {
      setExportComplete(false);
      setShowExportModal(false);
    }, 2000);
  };

  const handleSaveCredentials = () => {
    updateUserCredentials({
      nationalFarmerId: farmerIdInput,
      specialization: specializationInput,
      experienceYears: parseInt(expYearsInput, 10) || 0,
    });
    setIsEditingCredentials(false);
  };

  const handleConfirmMentorApplication = () => {
    applyBecomeMentor(selectedTrack, {
      certName: certificateNameInput,
      issuer: issuerInput,
    });
    setShowMentorOnboarding(false);
  };

  const mentorProfile = user.mentorProfile || { status: 'none', consultationsCount: 0, rating: 5.0, reviewsCount: 0 };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-stone-900">Farmer Profile & Credentials</h2>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-stone-900 flex-1">
          {/* 1. Profile Card */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-center gap-3.5">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-sm shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-stone-900 truncate">{user.name}</h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Verified Farmer
                </span>
                {(mentorProfile.status === 'certified' || mentorProfile.status === 'beginner') && (
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Certified Mentor</span>
                  </span>
                )}
                {mentorProfile.status === 'trainee' && (
                  <span className="text-[10px] font-bold text-sky-900 bg-sky-100 border border-sky-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-sky-700" />
                    <span>Trainee Mentor</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 font-medium mt-0.5">{user.farmName}</p>
              <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>

          {/* 2. Farm Statistics */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-sm font-bold text-stone-900 tabular-nums">{user.totalAcres}</span>
              <span className="text-[10px] text-stone-500 block">Total Acres</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-sm font-bold text-stone-900 tabular-nums">{crops.length}</span>
              <span className="text-[10px] text-stone-500 block">Crops Monitored</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-sm font-bold text-emerald-700 tabular-nums">{user.reputationPoints}</span>
              <span className="text-[10px] text-stone-500 block">Reputation Pts</span>
            </div>
          </div>

          {/* 3. Mentorship Completion Progress Bar Section */}
          <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-4 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Mentorship Completion Progress</h4>
                  <p className="text-[11px] text-stone-500">Path to Accredited Agronomic Mentor Status</p>
                </div>
              </div>
              {mentorProfile.status === 'certified' || mentorProfile.status === 'beginner' ? (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>100% Certified</span>
                </span>
              ) : mentorProfile.status === 'trainee' ? (
                <span className="text-[10px] font-bold text-sky-800 bg-sky-100 border border-sky-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sky-600" />
                  <span>70% Progress</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                  Not Enrolled
                </span>
              )}
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-700">
                  {mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                    ? 'Full Certification Achieved'
                    : mentorProfile.status === 'trainee'
                    ? 'Trainee Probation Progress'
                    : 'Prerequisite Requirements'}
                </span>
                <span className="text-emerald-700 font-bold tabular-nums">
                  {mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                    ? '100%'
                    : mentorProfile.status === 'trainee'
                    ? '70%'
                    : '0%'}
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      : mentorProfile.status === 'trainee'
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500'
                      : 'bg-stone-300'
                  }`}
                  style={{
                    width:
                      mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                        ? '100%'
                        : mentorProfile.status === 'trainee'
                        ? '70%'
                        : '5%',
                  }}
                />
              </div>
              <p className="text-[10px] text-stone-500">
                {mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                  ? 'All verification criteria met. Qualified to offer consultations and issue spray prescriptions.'
                  : mentorProfile.status === 'trainee'
                  ? '21 of 30 probation days elapsed. 8 of 10 required consultations completed with 4.9★ rating.'
                  : 'Enroll with an existing certificate or begin a 30-day evaluation period as a Trainee Mentor.'}
              </p>
            </div>

            {/* Milestones Checklist */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                mentorProfile.status !== 'none'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}>
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  mentorProfile.status !== 'none' ? 'text-emerald-600' : 'text-stone-400'
                }`} />
                <div>
                  <div className="font-bold">Identity & National Farm ID</div>
                  <div className="text-[10px] text-stone-500">eKYC & Farm Reg verified</div>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                mentorProfile.status !== 'none'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}>
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  mentorProfile.status !== 'none' ? 'text-emerald-600' : 'text-stone-400'
                }`} />
                <div>
                  <div className="font-bold">4+ Yrs Experience</div>
                  <div className="text-[10px] text-stone-500">Field practice documented</div>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : mentorProfile.status === 'trainee'
                  ? 'bg-sky-50/70 border-sky-200 text-sky-950'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}>
                <Clock className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                    ? 'text-emerald-600'
                    : mentorProfile.status === 'trainee'
                    ? 'text-sky-600'
                    : 'text-stone-400'
                }`} />
                <div>
                  <div className="font-bold">30-Day Evaluation</div>
                  <div className="text-[10px] text-stone-500">
                    {mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                      ? 'Completed (30/30)'
                      : mentorProfile.status === 'trainee'
                      ? 'Day 21 of 30 (9 days left)'
                      : 'Pending enrollment'}
                  </div>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : mentorProfile.status === 'trainee'
                  ? 'bg-sky-50/70 border-sky-200 text-sky-950'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}>
                <Star className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  mentorProfile.status !== 'none' ? 'text-amber-500' : 'text-stone-400'
                }`} />
                <div>
                  <div className="font-bold">Satisfaction ≥ 4.5★</div>
                  <div className="text-[10px] text-stone-500">Current score: 4.9★ (8 reviews)</div>
                </div>
              </div>
            </div>

            {/* Interactive Demo Toggles for Judges */}
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
              <span className="text-[10px] text-stone-500 font-medium">Test Status:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => applyBecomeMentor('trainee')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    mentorProfile.status === 'trainee'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
                  }`}
                >
                  Trainee Mentor (70%)
                </button>
                <button
                  onClick={() => applyBecomeMentor('certificate', {
                    certName: 'DOA Malaysian Good Agricultural Practice (myGAP)',
                    issuer: 'Jabatan Pertanian Malaysia',
                  })}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    mentorProfile.status === 'certified' || mentorProfile.status === 'beginner'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
                  }`}
                >
                  Certified Mentor (100%)
                </button>
              </div>
            </div>
          </div>

          {/* 4. Farmer Credentials & Registration Section */}
          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Agricultural Credentials
                </h4>
              </div>
              <button
                onClick={() => setIsEditingCredentials(!isEditingCredentials)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                {isEditingCredentials ? 'Cancel' : 'Edit Credentials'}
              </button>
            </div>

            {isEditingCredentials ? (
              <div className="space-y-2.5 pt-1 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    National Farmer ID / MyGAP Reg No.
                  </label>
                  <input
                    type="text"
                    value={farmerIdInput}
                    onChange={(e) => setFarmerIdInput(e.target.value)}
                    placeholder="e.g. MY-KEDAH-AGRI-84920"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Primary Crop Specialization
                  </label>
                  <input
                    type="text"
                    value={specializationInput}
                    onChange={(e) => setSpecializationInput(e.target.value)}
                    placeholder="e.g. Chili & Solanaceous Vegetables"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Years of Practical Farming Experience
                  </label>
                  <input
                    type="number"
                    value={expYearsInput}
                    onChange={(e) => setExpYearsInput(e.target.value)}
                    min="0"
                    max="60"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs text-stone-900"
                  />
                </div>

                <button
                  onClick={handleSaveCredentials}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                >
                  Save Credentials
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-stone-500 text-[11px]">National Farmer ID</span>
                  <span className="font-mono font-bold text-stone-800">
                    {user.credentials?.nationalFarmerId || 'MY-KEDAH-AGRI-84920'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-stone-500 text-[11px]">Specialization</span>
                  <span className="font-semibold text-stone-800">
                    {user.credentials?.specialization || 'Vegetables & Solanaceous Crops'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-stone-500 text-[11px]">Field Experience</span>
                  <span className="font-semibold text-stone-800">
                    {user.credentials?.experienceYears || 4} Years
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 5. BECOME A MENTOR PROGRAM STATUS & ENROLLMENT */}
          <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white p-4 rounded-2xl shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-700/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">AgriLink Mentor Program</h4>
                  <p className="text-[10px] text-emerald-200/80">Advise farmers & share field solutions</p>
                </div>
              </div>

              {mentorProfile.status !== 'none' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Active Enrolled
                </span>
              )}
            </div>

            {mentorProfile.status === 'none' ? (
              <div className="space-y-2.5">
                <p className="text-xs text-stone-300 leading-relaxed">
                  Join our nationwide agronomy advisory network. Choose to verify an existing accreditation certificate or begin a 1-month evaluation as a Trainee Mentor.
                </p>

                <button
                  onClick={() => setShowMentorOnboarding(true)}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Become a Mentor (Choose Path)</span>
                </button>
              </div>
            ) : mentorProfile.status === 'certified' || mentorProfile.status === 'beginner' ? (
              <div className="space-y-2 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Certified Mentor (Accredited)
                  </span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Status: Verified
                  </span>
                </div>
                <p className="text-[11px] text-stone-200">
                  <strong>Certificate:</strong> {mentorProfile.certificateName || 'DOA Malaysian Good Agricultural Practice (myGAP)'}
                </p>
                <p className="text-[10px] text-stone-300">
                  Verified by {mentorProfile.certificateIssuer || 'Jabatan Pertanian Malaysia'}. Eligible to provide direct consultation and receive consultation honorariums.
                </p>
                <button
                  onClick={() => setShowMentorOnboarding(true)}
                  className="mt-1 text-[11px] text-emerald-300 hover:underline font-semibold block"
                >
                  Switch or test alternative mentor track
                </button>
              </div>
            ) : (
              <div className="space-y-2 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    Trainee Mentor (Probationary)
                  </span>
                  <span className="text-[10px] bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded-full border border-sky-500/30">
                    {mentorProfile.probationDaysRemaining || 30} Days Left
                  </span>
                </div>
                <div className="w-full bg-stone-700/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full" style={{ width: '70%' }} />
                </div>
                <p className="text-[11px] text-stone-200 leading-relaxed">
                  <strong>1-Month Evaluation Period:</strong> Your answers and consultations will be compiled after 1 month. If client satisfaction remains high (≥ 4.5★), you will automatically graduate to Certified Mentor.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedTrack('certificate');
                      setShowMentorOnboarding(true);
                    }}
                    className="text-[11px] text-amber-300 hover:underline font-semibold"
                  >
                    Have a certificate? Verify now to upgrade to Certified Mentor
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Settings Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Application Settings
            </h4>

            {/* Language Selection */}
            <div className="p-3 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-stone-500" />
                <span>Interface Language</span>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg">
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    language === 'EN' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('BM')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    language === 'BM' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                  }`}
                >
                  Bahasa Melayu
                </button>
              </div>
            </div>

            {/* Offline Cache Status */}
            <div className="p-3 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-stone-500" />
                <div>
                  <div className="font-semibold text-stone-900">Local Data Storage</div>
                  <div className="text-[10px] text-stone-500">12 MB cached for offline use</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>

          {/* 6. Privacy & Farm Data Ownership */}
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold text-stone-900">Farm Data Ownership & Privacy</h4>
            </div>

            <p className="text-[11px] text-stone-600 leading-relaxed">
              Your farm coordinates, plot boundaries, yield data, and crop photos remain your private intellectual property. AgriLink does not sell farmer data to third parties.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowExportModal(true)}
                className="py-2 px-2.5 bg-white border border-stone-300 hover:bg-stone-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-stone-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Farm Data</span>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="py-2 px-2.5 bg-white border border-rose-200 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-rose-700"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Records</span>
              </button>
            </div>
          </div>
        </div>

        {/* 7. Become a Mentor Modal Dialog (2 Tracks) */}
        {showMentorOnboarding && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-sm font-bold text-stone-900">Become an AgriLink Mentor</h3>
                </div>
                <button
                  onClick={() => setShowMentorOnboarding(false)}
                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-stone-600">
                Select your onboarding pathway based on your credentials:
              </p>

              {/* Option 1: Certificate Track */}
              <div
                onClick={() => setSelectedTrack('certificate')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTrack === 'certificate'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-700" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Option 1: With Certificate</h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Instant Upgrade to Beginner Mentor
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="mentorTrack"
                    checked={selectedTrack === 'certificate'}
                    onChange={() => setSelectedTrack('certificate')}
                    className="accent-emerald-700"
                  />
                </div>

                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Verify an official agronomic or government extension credential (e.g. DOA Sijil myGAP, MARDI Plant Pathology, or University Agriculture Degree). You immediately start as an active <strong>Beginner Mentor</strong>.
                </p>

                {selectedTrack === 'certificate' && (
                  <div className="mt-3 pt-2.5 border-t border-emerald-200 space-y-2">
                    <div>
                      <label className="text-[10px] font-bold text-stone-700 block mb-0.5">
                        Certificate Name:
                      </label>
                      <input
                        type="text"
                        value={certificateNameInput}
                        onChange={(e) => setCertificateNameInput(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-stone-700 block mb-0.5">
                        Issuing Authority:
                      </label>
                      <input
                        type="text"
                        value={issuerInput}
                        onChange={(e) => setIssuerInput(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: No Certificate Track (Trainee Mentor) */}
              <div
                onClick={() => setSelectedTrack('trainee')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTrack === 'trainee'
                    ? 'border-sky-600 bg-sky-50/70 shadow-xs ring-1 ring-sky-600'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky-700" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Option 2: Without Certificate</h4>
                      <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded">
                        1-Month Trainee Probation
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="mentorTrack"
                    checked={selectedTrack === 'trainee'}
                    onChange={() => setSelectedTrack('trainee')}
                    className="accent-sky-700"
                  />
                </div>

                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  For experienced farmers with valuable practical field knowledge who do not hold formal paper certifications.
                </p>

                <div className="mt-2 p-2.5 bg-sky-100/60 rounded-xl text-[10px] text-sky-900 leading-relaxed space-y-1">
                  <p>
                    <strong>Evaluation Process:</strong> You will start as a <strong>Trainee Mentor</strong> for a 1-month probationary trial period.
                  </p>
                  <p>
                    During this month, your consultations and client reviews from farmers who hire or consult you will be compiled. After 1 month, data is analyzed to determine your qualification as a Certified Mentor.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowMentorOnboarding(false)}
                  className="flex-1 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmMentorApplication}
                  className={`flex-1 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-colors ${
                    selectedTrack === 'certificate'
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-sky-700 hover:bg-sky-800'
                  }`}
                >
                  {selectedTrack === 'certificate' ? 'Verify & Upgrade' : 'Start 1-Month Trial'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal Confirmation Dialog */}
        {showExportModal && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-2xl space-y-3 text-center">
              <Download className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-stone-900">Export AgriLink Farm Archive</h3>
              <p className="text-xs text-stone-600">
                Downloads complete JSON package containing crop logs, soil pH records, plot maps, and mentor transcripts.
              </p>
              {exportComplete ? (
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>agrilink_farm_export.json ready!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExportData}
                    className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-2xl space-y-3 text-center">
              <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
              <h3 className="text-sm font-bold text-stone-900">Delete Demo Farm Records?</h3>
              <p className="text-xs text-stone-600">
                This action is simulated for the hackathon prototype. Farm data remains intact for ongoing demonstrations.
              </p>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-2 rounded-xl bg-stone-900 text-white text-xs font-bold"
              >
                Close Dialog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
