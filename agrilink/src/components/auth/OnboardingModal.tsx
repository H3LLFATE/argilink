import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  ShieldCheck,
  CheckCircle2,
  Scan,
  Camera,
  GraduationCap,
  Briefcase,
  Heart,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  CreditCard,
  Eye,
  Check,
  Building,
  Hash,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmingPurpose } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onCompleted,
}) => {
  const { user, updateUserCredentials } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [name, setName] = useState(user.name || 'Arjun Kumar');
  const [email, setEmail] = useState(user.email || 'arjun.kedah@agrilink.my');
  const [location, setLocation] = useState('Pendang, Kedah, Malaysia');
  const [purpose, setPurpose] = useState<FarmingPurpose>('job');

  // Student specific fields
  const [institution, setInstitution] = useState('Universiti Putra Malaysia (UPM)');
  const [studentId, setStudentId] = useState('TP068492');
  const [course, setCourse] = useState('BSc. (Hons) Agricultural Science & Agronomy');

  // Commercial / Hobby certificate fields
  const [certificateName, setCertificateName] = useState('Sijil Amalan Pertanian Baik (myGAP)');

  // eKYC simulation state
  const [kycOption, setKycOption] = useState<'verify' | 'skip'>('verify');
  const [kycSubStep, setKycSubStep] = useState<'id_scan' | 'face_scan' | 'verified'>('id_scan');
  const [isScanningId, setIsScanningId] = useState(false);
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setKycSubStep('id_scan');
      setScanProgress(0);
      setIsScanningId(false);
      setIsScanningFace(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle MyKad Scan Simulation
  const handleStartIdScan = () => {
    setIsScanningId(true);
    setScanProgress(20);
    setTimeout(() => setScanProgress(60), 700);
    setTimeout(() => {
      setScanProgress(100);
      setIsScanningId(false);
      setKycSubStep('face_scan');
    }, 1600);
  };

  // Handle Facial Biometric Liveness Simulation
  const handleStartFaceScan = () => {
    setIsScanningFace(true);
    setScanProgress(15);
    setTimeout(() => setScanProgress(55), 800);
    setTimeout(() => {
      setScanProgress(100);
      setIsScanningFace(false);
      setKycSubStep('verified');
      setTimeout(() => {
        setCurrentStep(4);
      }, 1200);
    }, 1800);
  };

  const handleFinishOnboarding = () => {
    updateUserCredentials({
      nationalFarmerId: kycOption === 'verify' ? 'MY-KEDAH-AGRI-84920' : '',
      specialization: purpose === 'student' ? 'Agronomy Studies & Plant Pathology' : 'Vegetables & Solanaceous Crops',
      experienceYears: purpose === 'student' ? 1 : 4,
    });
    if (onCompleted) onCompleted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                AgriLink Farmer Onboarding
              </h2>
              <p className="text-[10px] text-emerald-200">
                Step {currentStep} of 4 · {currentStep === 1 ? 'Profile & Purpose' : currentStep === 2 ? 'Verification Method' : currentStep === 3 ? 'Digital eKYC' : 'Account Ready'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-emerald-800 hover:bg-emerald-700 text-emerald-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Steps Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-stone-900 flex-1 bg-stone-50/50">
          {/* ================= STEP 1: Details & Purpose ================= */}
          {currentStep === 1 && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Welcome! Set Up Your Profile</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Enter your details to configure your agricultural workspace
                </p>
              </div>

              {/* Name & Email */}
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Full Name (As per IC / Passport)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arjun@agrilink.my"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Farm Location / State
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Pendang, Kedah"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    />
                  </div>
                </div>
              </div>

              {/* Farming Purpose Selection */}
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block">
                  What is your primary farming engagement?
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPurpose('job')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                      purpose === 'job'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <Briefcase className="w-5 h-5 text-emerald-700 mb-1" />
                    <span className="text-[11px] font-bold leading-tight">Commercial Farmer</span>
                    <span className="text-[9px] text-stone-500 mt-0.5">Job / Livelihood</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurpose('fun')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                      purpose === 'fun'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <Heart className="w-5 h-5 text-rose-600 mb-1" />
                    <span className="text-[11px] font-bold leading-tight">Hobby / Fun</span>
                    <span className="text-[9px] text-stone-500 mt-0.5">Part-time Gardening</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurpose('student')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                      purpose === 'student'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold leading-tight">Agri Student</span>
                    <span className="text-[9px] text-stone-500 mt-0.5">College / Course</span>
                  </button>
                </div>
              </div>

              {/* Conditional Purpose Details */}
              {purpose === 'student' ? (
                <div className="bg-indigo-50/70 border border-indigo-200 p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>Student Agronomy Enrollment</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-stone-600 block mb-0.5">
                      University / Agriculture Institute
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Universiti Putra Malaysia (UPM)"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-stone-600 block mb-0.5">
                        Student ID / TP Number
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. TP068492"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-stone-600 block mb-0.5">
                        Course / Major
                      </label>
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="e.g. Crop Science"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-stone-100/70 border border-stone-200 p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">
                      Farming Accreditation or Certification (Optional)
                    </span>
                    <span className="text-[10px] text-stone-400">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    placeholder="e.g. Sijil Amalan Pertanian Baik (myGAP) / None"
                    className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <span>Continue to Verification</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= STEP 2: Choose Verification Level ================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Choose Verification Status</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Verify your identity to unlock verified farmer certification and mentor features
                </p>
              </div>

              {/* Option 1: eKYC Verification */}
              <div
                onClick={() => setKycOption('verify')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  kycOption === 'verify'
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">
                        Digital Identity eKYC (Recommended)
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                        MyKad / Passport + Facial Biometric Scan
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="kyc"
                    checked={kycOption === 'verify'}
                    onChange={() => setKycOption('verify')}
                    className="accent-emerald-700"
                  />
                </div>

                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Fast government eKYC verification similar to banking & Touch 'n Go. Uses camera for optical ID reading and facial biometric matching. Your profile photo is automatically synchronized from your official identity photo!
                </p>
              </div>

              {/* Option 2: Unverified Farmer */}
              <div
                onClick={() => setKycOption('skip')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  kycOption === 'skip'
                    ? 'border-stone-600 bg-stone-100/80 shadow-xs ring-1 ring-stone-600'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-stone-500" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">
                        Enter as Unverified Farmer
                      </h4>
                      <span className="text-[10px] font-medium text-stone-500 bg-stone-200 px-1.5 py-0.2 rounded">
                        Basic Explorer Mode
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="kyc"
                    checked={kycOption === 'skip'}
                    onChange={() => setKycOption('skip')}
                    className="accent-stone-700"
                  />
                </div>

                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Explore farm tools and public community without identity verification. You can complete verification anytime later in your Profile settings.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-2.5 px-3 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (kycOption === 'verify') {
                      setCurrentStep(3);
                    } else {
                      setCurrentStep(4);
                    }
                  }}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  {kycOption === 'verify' ? 'Proceed to Biometric eKYC' : 'Skip & Finish Setup'}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Biometric eKYC (MyKad + Face Scan) ================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {kycSubStep === 'id_scan'
                    ? 'Scan National Identity Card (MyKad)'
                    : kycSubStep === 'face_scan'
                    ? 'Live Facial Biometric Verification'
                    : 'Biometric Match Complete!'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {kycSubStep === 'id_scan'
                    ? 'Hold your MyKad flat in good lighting to scan identity details'
                    : kycSubStep === 'face_scan'
                    ? 'Center your face in the oval reticle for liveness verification'
                    : 'Identity credentials verified with national database'}
                </p>
              </div>

              {/* Sub-step A: MyKad Scan Viewfinder */}
              {kycSubStep === 'id_scan' && (
                <div className="space-y-3">
                  <div className="relative bg-gradient-to-br from-stone-900 to-emerald-950 rounded-2xl overflow-hidden p-4 border border-stone-700 aspect-16/10 flex flex-col justify-between shadow-inner">
                    {/* Simulated MyKad Card Design */}
                    <div className="relative z-10 flex items-start justify-between text-white">
                      <div>
                        <span className="text-[9px] tracking-widest text-emerald-400 font-bold block">MALAYSIA</span>
                        <span className="text-xs font-bold font-mono tracking-wider">KAD PENGENALAN</span>
                      </div>
                      <div className="w-7 h-5 rounded bg-amber-400/80 border border-amber-300 flex items-center justify-center text-[8px] font-bold text-stone-900">
                        CHIP
                      </div>
                    </div>

                    {/* Card Holder & Photo */}
                    <div className="relative z-10 flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                        alt="MyKad Portrait"
                        className="w-12 h-14 object-cover rounded-lg border-2 border-white/60 shadow-md"
                      />
                      <div className="text-white">
                        <div className="text-xs font-mono font-bold tracking-tight">ARJUN KUMAR</div>
                        <div className="text-[10px] font-mono text-emerald-300">920415-02-5455</div>
                        <div className="text-[9px] text-stone-400 mt-0.5">WARGANEGARA MALAYSIA</div>
                      </div>
                    </div>

                    {/* Laser OCR Scanning Line Animation */}
                    {isScanningId && (
                      <div
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500 shadow-[0_0_12px_#10b981] transition-all duration-300"
                        style={{ top: `${scanProgress}%` }}
                      />
                    )}

                    {/* Viewfinder corners */}
                    <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none" />
                  </div>

                  <button
                    type="button"
                    onClick={handleStartIdScan}
                    disabled={isScanningId}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Scan className="w-4 h-4" />
                    <span>{isScanningId ? `Scanning MyKad Chip & OCR (${scanProgress}%)...` : 'Scan MyKad Now'}</span>
                  </button>
                </div>
              )}

              {/* Sub-step B: Facial Biometric Liveness Scan */}
              {kycSubStep === 'face_scan' && (
                <div className="space-y-3">
                  <div className="relative bg-stone-950 rounded-2xl overflow-hidden aspect-4/3 flex flex-col items-center justify-center p-4 border border-stone-800">
                    {/* Live Oval Face Guide */}
                    <div
                      className={`w-32 h-44 rounded-[50%] border-2 flex items-center justify-center transition-all ${
                        isScanningFace
                          ? 'border-emerald-400 shadow-[0_0_20px_#10b981]'
                          : 'border-white/40'
                      }`}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                        alt="Live Face Viewfinder"
                        className={`w-28 h-40 object-cover rounded-[50%] transition-opacity ${
                          isScanningFace ? 'opacity-85' : 'opacity-60'
                        }`}
                      />
                    </div>

                    {/* Scanning Status Text */}
                    <div className="absolute bottom-3 inset-x-4 text-center">
                      <span className="text-[11px] font-semibold text-emerald-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                        {isScanningFace ? `Biometric Mesh Analysis (${scanProgress}%)...` : 'Position face inside the oval'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartFaceScan}
                    disabled={isScanningFace}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{isScanningFace ? 'Scanning Facial Geometry...' : 'Start Face Biometric Match'}</span>
                  </button>
                </div>
              )}

              {/* Sub-step C: Verification Success */}
              {kycSubStep === 'verified' && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-950">Identity Verified Successfully!</h4>
                  <p className="text-xs text-emerald-800">
                    Biometric face match: <strong>99.8%</strong> match with MyKad chip portrait.
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Your official identity card photo has been set as your verified profile avatar.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 4: Account Ready ================= */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900">Your Farm Account is Ready!</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Welcome to the AgriLink Agricultural Operating System
                </p>
              </div>

              {/* Confirmed Profile Card */}
              <div className="bg-white border border-stone-200 p-4 rounded-2xl text-left flex items-center gap-3.5 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Verified Portrait"
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-sm shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-stone-900 truncate">{name}</span>
                    {kycOption === 'verify' ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>eKYC Verified</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                        Unverified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 truncate">{location}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    {purpose === 'student'
                      ? `Student: ${institution}`
                      : purpose === 'job'
                      ? 'Commercial Farmer'
                      : 'Hobby & Home Gardening'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Launch AgriLink Farm Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
