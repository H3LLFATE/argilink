export type TabType = 'home' | 'crops' | 'scan' | 'study' | 'community' | 'market';

export type ConnectivityStatus = 'online' | 'offline';

export type HealthStatus = 'healthy' | 'attention' | 'critical';

export type MentorStatus = 'none' | 'trainee' | 'beginner' | 'certified' | 'veteran';

export type PlantCategory = 'vegetables' | 'fruits' | 'grains' | 'tubers' | 'legumes' | 'herbs' | 'cash_crops';

export interface GrowingStep {
  stepNumber: number;
  title: string;
  summary: string;
  instructions: string[];
  tips?: string;
}

export interface PlantDiseaseItem {
  id: string;
  name: string;
  scientificPathogen?: string;
  whatItIs: string;
  symptoms: string[];
  whatFarmerMayNotice: string;
  possibleCauses: string[];
  prevention: string[];
  management: string[];
  whenToSeekMentor: string;
  image?: string;
}

export interface PlantPestItem {
  id: string;
  name: string;
  scientificName?: string;
  symptoms: string[];
  damageSigns: string;
  prevention: string[];
  management: string[];
  whenToSeekMentor: string;
  image?: string;
}

export interface PlantNutrientDeficiency {
  nutrient: string;
  symptoms: string;
  treatment: string;
}

export interface PlantKnowledge {
  id: string;
  name: string;
  commonLocalName?: string;
  scientificName: string;
  category: PlantCategory;
  categoryLabel: string;
  image: string;
  typicalGrowingPeriod: string;
  packageSize: string;
  packageSizeBytes: number;
  description: string;
  growingConditions: {
    sunlight: string;
    temperature: string;
    waterDemand: string;
    spacing: string;
  };
  growingGuide: GrowingStep[];
  watering: {
    requirements: string;
    recommendedFrequency: string;
    signsOfUnderWatering: string[];
    signsOfOverWatering: string[];
    practicalTips: string;
  };
  soil: {
    suitableSoilConditions: string;
    drainageRequirements: string;
    phRange: string;
    soilPreparation: string[];
    basicSoilManagement: string[];
  };
  nutrition: {
    generalRequirements: string;
    timingGuidance: string[];
    deficiencies: PlantNutrientDeficiency[];
  };
  diseases: PlantDiseaseItem[];
  pests: PlantPestItem[];
}

export interface UserCredentials {
  nationalFarmerId?: string;
  farmRegistrationNumber?: string;
  specialization?: string;
  experienceYears?: number;
  certifications?: {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    verified: boolean;
  }[];
}

export interface MentorProfile {
  status: MentorStatus;
  joinedAt?: string;
  probationDaysRemaining?: number; // 30 days for trainee
  certificateName?: string;
  certificateIssuer?: string;
  verifiedAt?: string;
  consultationsCount: number;
  rating: number;
  reviewsCount: number;
  probationSummary?: string;
}

export type FarmingPurpose = 'job' | 'fun' | 'student';

export interface UserProfile {
  name: string;
  email: string;
  farmName: string;
  location: string;
  coordinates: string;
  totalAcres: number;
  activePlotsCount: number;
  avatarUrl: string;
  joinedYear: number;
  reputationPoints: number;
  purpose?: FarmingPurpose;
  studentDetails?: {
    institution: string;
    studentId: string;
    course: string;
  };
  kycVerification?: {
    isVerified: boolean;
    idType: 'mykad' | 'passport';
    icNumberMasked: string;
    verifiedAt: string;
    facialMatchScore: number;
    idPhotoUrl: string;
  };
  credentials: UserCredentials;
  mentorProfile: MentorProfile;
}

export interface NationwideTopMentor {
  rank: number;
  name: string;
  title: string;
  organization: string;
  state: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  resolutionRate: number; // e.g. 99%
  specialties: string[];
  badge: string;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plotId: string;
  plotName: string;
  areaAcres: number;
  plantedDate: string;
  expectedHarvestDate: string;
  healthStatus: HealthStatus;
  healthScore: number; // 0-100
  lastChecked: string;
  image: string;
  stage: string;
  notes: string;
  recentIssues?: string[];
}

export interface PlotActivity {
  id: string;
  type: 'scan' | 'spray' | 'fertilizer' | 'irrigation' | 'soil_check' | 'harvest';
  title: string;
  date: string;
  details: string;
  badge?: string;
  icon?: string;
}

export interface FarmPlot {
  id: string;
  name: string;
  cropName: string;
  cropId: string;
  areaAcres: number;
  healthStatus: HealthStatus;
  coordinates: { x: number; y: number; width: number; height: number };
  boundaryLatLangs?: [number, number][];
  center: [number, number];
  soilType: string;
  irrigation: string;
  image: string;
  lastUpdated: string;
  lastScanned?: {
    date: string;
    diseaseName: string;
    confidence: number;
    image: string;
    summary: string;
  };
  lastInstruction?: {
    action: string;
    prescribedDate: string;
    details: string;
    dosage?: string;
    status: 'pending' | 'completed';
  };
  activities?: PlotActivity[];
}

export interface GeoScanRecord {
  id: string;
  title: string;
  cropName: string;
  plotName: string;
  plotId: string;
  diseaseName: string;
  confidence: number;
  confidenceTier: 'high' | 'medium' | 'low';
  image: string;
  lat: number;
  lng: number;
  timestamp: string;
  summary: string;
  status: 'active_issue' | 'monitoring' | 'healthy' | 'resolved';
}

export interface AiScanPreset {
  id: string;
  title: string;
  cropName: string;
  image: string;
  diseaseName: string;
  confidence: number; // percentage
  confidenceTier: 'high' | 'medium' | 'low';
  summary: string;
  pathologyDetails: string;
  recommendedSteps: string[];
  suggestedProductCategory: string;
  suggestedProductId?: string;
  plotId?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatar: string;
  specialization: string[];
  rating: number;
  answersCount: number;
  responseTime: string;
  isAvailable: boolean;
  verifiedBadge: string;
  location: string;
}

export interface MentorMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  imageUrl?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'queued_offline';
}

export interface MentorConversation {
  id: string;
  mentorId: string;
  cropName: string;
  cropId?: string;
  issueTitle: string;
  lastMessage: string;
  lastUpdated: string;
  unreadCount: number;
  messages: MentorMessage[];
  status: 'active' | 'resolved';
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar: string;
  isMentor?: boolean;
  mentorTitle?: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorLocation: string;
  avatar: string;
  title: string;
  content: string;
  crop: string;
  category: 'Crop Health' | 'Pest & Disease' | 'Farming Tips' | 'Equipment' | 'Marketplace' | 'General';
  image?: string;
  timestamp: string;
  upvotes: number;
  userUpvoted?: boolean;
  comments: CommunityComment[];
  hasVerifiedSolution?: boolean;
  verifiedSolutionText?: string;
  verifiedMentorName?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Crop Protection' | 'Fertilizer' | 'Seeds' | 'Irrigation' | 'Tools';
  brand: string;
  priceRM: number;
  unit: string;
  image: string;
  supplier: string;
  isVerifiedSupplier: boolean;
  distanceKm: number;
  location: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  description: string;
  applicationRate?: string;
  safetyInterval?: string;
}

export interface SecondhandEquipment {
  id: string;
  title: string;
  priceRM: number;
  condition: 'Like New' | 'Good Condition' | 'Fair Condition';
  location: string;
  distanceKm: number;
  seller: string;
  isVerifiedSeller: boolean;
  rating: number;
  image: string;
  postedDate: string;
  description: string;
  specs: Record<string, string>;
  isSaved?: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  cropId: string;
  cropName: string;
  plotName: string;
  dueDate: string;
  dueTime: string;
  type: 'watering' | 'fertilizing' | 'pest_check' | 'disease_check' | 'spraying' | 'harvest' | 'equipment';
  isCompleted: boolean;
  smartWeatherNote?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'mentor' | 'pest_alert' | 'weather' | 'reminder' | 'market' | 'community';
  timestamp: string;
  isRead: boolean;
  linkAction?: {
    tab: TabType;
    modal?: string;
    targetId?: string;
  };
}

export interface OutboxItem {
  id: string;
  type: 'mentor_request' | 'crop_update' | 'community_post' | 'reminder_add' | 'cart_order';
  description: string;
  timestamp: string;
  payload: any;
}
