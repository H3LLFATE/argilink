import { IMAGE_PATHS } from '../config/imageMasterConfig';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TabType,
  ConnectivityStatus,
  Crop,
  FarmPlot,
  Mentor,
  MentorConversation,
  CommunityPost,
  Product,
  SecondhandEquipment,
  Reminder,
  AppNotification,
  OutboxItem,
  AiScanPreset,
  HealthStatus,
  GeoScanRecord,
  PlotActivity,
  UserProfile,
  UserCredentials,
  MentorProfile,
  MentorStatus,
} from '../types';
import {
  DEMO_FARM_USER,
  INITIAL_CROPS,
  INITIAL_PLOTS,
  INITIAL_MENTORS,
  INITIAL_CONVERSATIONS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_PRODUCTS,
  INITIAL_SECONDHAND,
  INITIAL_REMINDERS,
  INITIAL_NOTIFICATIONS,
  AI_SCAN_PRESETS,
  INITIAL_GEO_SCANS,
  SAMPLE_DEMO_CROPS,
  SAMPLE_DEMO_PLOTS,
  SAMPLE_DEMO_GEO_SCANS,
  SAMPLE_DEMO_CONVERSATIONS
} from '../data/mockData';

interface CartItem {
  product: Product;
  quantity: number;
}

interface EquipmentMessage {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
}

interface AppContextType {
  // Connectivity
  connectivity: ConnectivityStatus;
  toggleConnectivity: () => void;
  setConnectivity: (status: ConnectivityStatus) => void;
  outbox: OutboxItem[];
  isSyncing: boolean;
  syncOutbox: () => void;
  lastSyncTime: string;

  // Navigation & Tabs
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Modals & Active Views
  selectedCropId: string | null;
  setSelectedCropId: (id: string | null) => void;
  isAddCropOpen: boolean;
  setIsAddCropOpen: (open: boolean) => void;
  selectedMentorId: string | null;
  setSelectedMentorId: (id: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedEquipmentId: string | null;
  setSelectedEquipmentId: (id: string | null) => void;
  isEquipmentChatOpen: boolean;
  setIsEquipmentChatOpen: (open: boolean) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isRemindersModalOpen: boolean;
  setIsRemindersModalOpen: (open: boolean) => void;
  isNotificationsModalOpen: boolean;
  setIsNotificationsModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isFarmMapOpen: boolean;
  setIsFarmMapOpen: (open: boolean) => void;
  isOutboxModalOpen: boolean;
  setIsOutboxModalOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;

  // Study / Plant Knowledge Library
  downloadedPlantIds: string[];
  downloadPlant: (plantId: string) => void;
  removeDownloadedPlant: (plantId: string) => void;
  downloadMyCrops: () => void;
  selectedStudyPlantId: string | null;
  setSelectedStudyPlantId: (id: string | null) => void;
  selectedStudyDiseaseId: string | null;
  setSelectedStudyDiseaseId: (id: string | null) => void;
  openStudyForPlant: (plantId: string, diseaseId?: string) => void;

  // Active Scan State
  activeScanPreset: AiScanPreset | null;
  setActiveScanPreset: (preset: AiScanPreset | null) => void;
  isAnalyzing: boolean;
  runAnalysis: (preset: AiScanPreset) => void;
  scanResult: AiScanPreset | null;
  setScanResult: (result: AiScanPreset | null) => void;

  // Domain Data & Handlers
  user: UserProfile;
  updateUserCredentials: (creds: Partial<UserCredentials>) => void;
  applyBecomeMentor: (track: 'certificate' | 'trainee', details?: { certName?: string; issuer?: string }) => void;
  crops: Crop[];
  plots: FarmPlot[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCropHealth: (cropId: string, status: HealthStatus, score: number, issue?: string) => void;

  // Geotagged Scans on Map & Plot Management
  farmerLocation: [number, number];
  geoScans: GeoScanRecord[];
  addGeoScan: (scan: Omit<GeoScanRecord, 'id'>) => void;
  selectedGeoScanId: string | null;
  setSelectedGeoScanId: (id: string | null) => void;
  selectedPlotDrawerId: string | null;
  setSelectedPlotDrawerId: (id: string | null) => void;

  isDesigningNewPlot: boolean;
  setIsDesigningNewPlot: (val: boolean) => void;
  draftPlotInfo: {
    name: string;
    cropName: string;
    areaAcres: number;
    center: [number, number];
    scanResult?: AiScanPreset;
  } | null;
  setDraftPlotInfo: React.Dispatch<React.SetStateAction<{
    name: string;
    cropName: string;
    areaAcres: number;
    center: [number, number];
    scanResult?: AiScanPreset;
  } | null>>;

  startNewPlotDesign: (scanResult?: AiScanPreset) => void;
  createPlotAndAssignScan: (
    plotData: {
      name: string;
      cropName: string;
      areaAcres: number;
      center: [number, number];
      soilType?: string;
      irrigation?: string;
    },
    scanResult?: AiScanPreset
  ) => FarmPlot;
  assignScanToExistingPlot: (plotId: string, scanResult: AiScanPreset) => void;
  
  reminders: Reminder[];
  toggleReminder: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id' | 'isCompleted'>) => void;

  communityPosts: CommunityPost[];
  toggleUpvote: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  addCommunityPost: (post: { title: string; content: string; crop: string; category: CommunityPost['category']; image?: string }) => void;

  products: Product[];
  equipment: SecondhandEquipment[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleSaveEquipment: (id: string) => void;

  mentors: Mentor[];
  conversations: MentorConversation[];
  activeConversation: MentorConversation | null;
  sendMentorMessage: (mentorId: string, text: string, imageUrl?: string) => void;
  startMentorInquiry: (mentorId: string, cropName: string, issueTitle: string, initialQuestion: string, imageUrl?: string) => void;

  equipmentChats: Record<string, EquipmentMessage[]>;
  sendEquipmentMessage: (equipmentId: string, text: string) => void;

  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Demo step runner
  triggerDemoStep: (stepNumber: number) => void;
  demoToast: string | null;
  clearDemoToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Connectivity & Outbox
  const [connectivity, setConnectivity] = useState<ConnectivityStatus>('online');
  const [outbox, setOutbox] = useState<OutboxItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Modals & Panels
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
  const [isAddCropOpen, setIsAddCropOpen] = useState<boolean>(false);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [isEquipmentChatOpen, setIsEquipmentChatOpen] = useState<boolean>(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isFarmMapOpen, setIsFarmMapOpen] = useState<boolean>(false);
  const [isOutboxModalOpen, setIsOutboxModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Study / Plant Knowledge Library State
  const [downloadedPlantIds, setDownloadedPlantIds] = useState<string[]>(['chili', 'rice', 'tomato', 'durian']);
  const [selectedStudyPlantId, setSelectedStudyPlantId] = useState<string | null>(null);
  const [selectedStudyDiseaseId, setSelectedStudyDiseaseId] = useState<string | null>(null);

  // AI Scan
  const [activeScanPreset, setActiveScanPreset] = useState<AiScanPreset | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<AiScanPreset | null>(null);

  // Data Collections
  const farmerLocation: [number, number] = [6.0563, 100.4788];
  const [user, setUser] = useState<UserProfile>(DEMO_FARM_USER);
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [plots, setPlots] = useState<FarmPlot[]>(INITIAL_PLOTS);
  const [geoScans, setGeoScans] = useState<GeoScanRecord[]>(INITIAL_GEO_SCANS);
  const [selectedGeoScanId, setSelectedGeoScanId] = useState<string | null>(null);
  const [selectedPlotDrawerId, setSelectedPlotDrawerId] = useState<string | null>(null);
  const [isDesigningNewPlot, setIsDesigningNewPlot] = useState<boolean>(false);
  const [draftPlotInfo, setDraftPlotInfo] = useState<{
    name: string;
    cropName: string;
    areaAcres: number;
    center: [number, number];
    scanResult?: AiScanPreset;
  } | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [equipment, setEquipment] = useState<SecondhandEquipment[]>(INITIAL_SECONDHAND);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [conversations, setConversations] = useState<MentorConversation[]>(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Equipment chats state (fresh new account: no chats yet)
  const [equipmentChats, setEquipmentChats] = useState<Record<string, EquipmentMessage[]>>({});

  const [demoToast, setDemoToast] = useState<string | null>(null);

  const updateUserCredentials = (creds: Partial<UserCredentials>) => {
    setUser((prev) => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        ...creds,
      },
    }));
    showToast('Farmer credentials updated successfully.');
  };

  const applyBecomeMentor = (track: 'certificate' | 'trainee', details?: { certName?: string; issuer?: string }) => {
    if (track === 'certificate') {
      setUser((prev) => ({
        ...prev,
        mentorProfile: {
          status: 'beginner',
          joinedAt: 'Today',
          certificateName: details?.certName || 'DOA Malaysian Good Agricultural Practice (myGAP)',
          certificateIssuer: details?.issuer || 'Jabatan Pertanian Malaysia (DOA)',
          verifiedAt: 'Verified Today',
          consultationsCount: 0,
          rating: 5.0,
          reviewsCount: 0,
          probationSummary: 'Accredited Beginner Mentor — Credential certificate verified with DOA Malaysia.',
        },
      }));
      showToast('🎉 Certificate verified! You are now upgraded to Beginner Mentor.');
    } else {
      setUser((prev) => ({
        ...prev,
        mentorProfile: {
          status: 'trainee',
          joinedAt: 'Today',
          probationDaysRemaining: 30,
          consultationsCount: 0,
          rating: 5.0,
          reviewsCount: 0,
          probationSummary: 'Trainee Mentor (30-day trial period) — Consultation performance will be compiled after 1 month to determine qualification.',
        },
      }));
      showToast('🌱 Enrolled as Trainee Mentor! 1-month trial period activated.');
    }
  };

  const showToast = (message: string) => {
    setDemoToast(message);
    setTimeout(() => {
      setDemoToast((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const clearDemoToast = () => setDemoToast(null);

  // Study / Plant Knowledge Library handlers
  const downloadPlant = (plantId: string) => {
    if (!downloadedPlantIds.includes(plantId)) {
      setDownloadedPlantIds((prev) => [...prev, plantId]);
      showToast('Knowledge package downloaded for offline use.');
    }
  };

  const removeDownloadedPlant = (plantId: string) => {
    setDownloadedPlantIds((prev) => prev.filter((id) => id !== plantId));
    showToast('Plant package removed from offline storage.');
  };

  const downloadMyCrops = () => {
    const matchingIds: string[] = [];
    crops.forEach((c) => {
      const lower = c.name.toLowerCase();
      if (lower.includes('chili') && !matchingIds.includes('chili')) matchingIds.push('chili');
      if ((lower.includes('paddy') || lower.includes('rice')) && !matchingIds.includes('rice')) matchingIds.push('rice');
      if (lower.includes('durian') && !matchingIds.includes('durian')) matchingIds.push('durian');
      if (lower.includes('tomato') && !matchingIds.includes('tomato')) matchingIds.push('tomato');
      if (lower.includes('corn') && !matchingIds.includes('corn')) matchingIds.push('corn');
      if (lower.includes('potato') && !matchingIds.includes('potato')) matchingIds.push('potato');
      if (lower.includes('apple') && !matchingIds.includes('apple')) matchingIds.push('apple');
    });

    if (matchingIds.length === 0) {
      matchingIds.push('chili', 'rice', 'durian');
    }

    setDownloadedPlantIds((prev) => Array.from(new Set([...prev, ...matchingIds])));
    showToast(`Downloaded ${matchingIds.length} plant guides for your registered crops.`);
  };

  const openStudyForPlant = (plantId: string, diseaseId?: string) => {
    setSelectedStudyPlantId(plantId);
    setSelectedStudyDiseaseId(diseaseId || null);
    setActiveTab('study');
  };

  // Toggle Connectivity with simulated sync when returning online
  const toggleConnectivity = () => {
    if (connectivity === 'online') {
      setConnectivity('offline');
      showToast('Switched to Offline Mode. Changes will queue in Outbox.');
    } else {
      setConnectivity('online');
      syncOutbox();
    }
  };

  const syncOutbox = () => {
    if (outbox.length === 0) {
      showToast('Online. All farm records are up to date.');
      return;
    }
    setIsSyncing(true);
    showToast(`Syncing ${outbox.length} pending offline actions...`);
    setTimeout(() => {
      setIsSyncing(false);
      setOutbox([]);
      setLastSyncTime('Just now');
      showToast('All offline changes synced with AgriLink cloud!');
    }, 1800);
  };

  // Run AI Scan Simulation
  const runAnalysis = (preset: AiScanPreset) => {
    setActiveScanPreset(preset);
    setIsAnalyzing(true);
    setScanResult(null);

    // Simulate on-device or edge model processing
    const delay = connectivity === 'offline' ? 1400 : 1800;
    setTimeout(() => {
      setIsAnalyzing(false);
      setScanResult(preset);
      showToast(`Assessment complete: ${preset.confidence}% confidence`);

      // Automatically geotag and save location to map!
      const targetPlot = plots.find((p) => p.id === preset.plotId) || plots[0];
      const offsetLat = (Math.random() - 0.5) * 0.0008;
      const offsetLng = (Math.random() - 0.5) * 0.0008;
      const newGeoScan: GeoScanRecord = {
        id: `scan-geo-${Date.now()}`,
        title: `${preset.cropName} Field Scan`,
        cropName: preset.cropName.split('(')[0].trim(),
        plotName: targetPlot.name,
        plotId: targetPlot.id,
        diseaseName: preset.diseaseName,
        confidence: preset.confidence,
        confidenceTier: preset.confidenceTier,
        image: preset.image,
        lat: targetPlot.center[0] + offsetLat,
        lng: targetPlot.center[1] + offsetLng,
        timestamp: 'Today, Just now',
        summary: preset.summary,
        status: preset.confidenceTier === 'high' && !preset.diseaseName.includes('Anthracnose') && !preset.diseaseName.includes('Blast')
          ? 'healthy'
          : 'active_issue',
      };
      setGeoScans((prev) => [newGeoScan, ...prev]);
    }, delay);
  };

  const addGeoScan = (scanData: Omit<GeoScanRecord, 'id'>) => {
    const newScan: GeoScanRecord = {
      ...scanData,
      id: `scan-geo-${Date.now()}`,
    };
    setGeoScans((prev) => [newScan, ...prev]);
    showToast(`Location tagged: ${newScan.diseaseName.split('(')[0]}`);
  };

  const startNewPlotDesign = (scanPreset?: AiScanPreset) => {
    setSelectedPlotDrawerId(null);
    setSelectedGeoScanId(null);
    setIsDesigningNewPlot(true);
    setDraftPlotInfo({
      name: `Plot ${String.fromCharCode(65 + plots.length)} — ${scanPreset?.cropName.split('(')[0].trim() || 'New Crop'}`,
      cropName: scanPreset?.cropName.split('(')[0].trim() || 'Chili Vegetable',
      areaAcres: 1.0,
      center: [farmerLocation[0] + 0.0003, farmerLocation[1] + 0.0003],
      scanResult: scanPreset,
    });
    setIsFarmMapOpen(true);
    showToast('Designate new plot boundary around your location');
  };

  const createPlotAndAssignScan = (
    plotData: {
      name: string;
      cropName: string;
      areaAcres: number;
      center: [number, number];
      soilType?: string;
      irrigation?: string;
    },
    scanPreset?: AiScanPreset
  ) => {
    const newPlotId = `plot-${Date.now()}`;
    const newCropId = `crop-${Date.now()}`;
    const deltaLat = 0.0007 * Math.sqrt(plotData.areaAcres);
    const deltaLng = 0.0009 * Math.sqrt(plotData.areaAcres);

    const boundary: [number, number][] = [
      [plotData.center[0] + deltaLat, plotData.center[1] - deltaLng],
      [plotData.center[0] + deltaLat, plotData.center[1] + deltaLng],
      [plotData.center[0] - deltaLat, plotData.center[1] + deltaLng],
      [plotData.center[0] - deltaLat, plotData.center[1] - deltaLng],
    ];

    const plotImage = scanPreset?.image || IMAGE_PATHS.farmOverview;

    const newPlot: FarmPlot = {
      id: newPlotId,
      name: plotData.name,
      cropName: plotData.cropName,
      cropId: newCropId,
      areaAcres: plotData.areaAcres,
      healthStatus: scanPreset
        ? scanPreset.confidenceTier === 'high' && !scanPreset.diseaseName.includes('Anthracnose')
          ? 'healthy'
          : 'attention'
        : 'healthy',
      coordinates: { x: 50, y: 50, width: 40, height: 40 },
      boundaryLatLangs: boundary,
      center: plotData.center,
      soilType: plotData.soilType || 'Alluvial loam (pH 6.2)',
      irrigation: plotData.irrigation || 'Drip fertigation lines',
      image: plotImage,
      lastUpdated: 'Today, Just now',
      lastScanned: scanPreset
        ? {
            date: 'Today, Just now',
            diseaseName: scanPreset.diseaseName,
            confidence: scanPreset.confidence,
            image: scanPreset.image,
            summary: scanPreset.summary,
          }
        : undefined,
      lastInstruction: scanPreset
        ? {
            action: scanPreset.suggestedProductCategory
              ? `Apply ${scanPreset.suggestedProductCategory} treatment`
              : 'Monitor leaves and prune damaged runners',
            prescribedDate: 'Today, Just now',
            dosage: '20g per 10L water, fine mist sprayer, target underside of leaves',
            details: scanPreset.recommendedSteps?.[0] || scanPreset.summary,
            status: 'pending',
          }
        : undefined,
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'scan',
          title: `Plot Created & Geotagged at GPS Location`,
          date: 'Today, Just now',
          details: `Registered ${plotData.areaAcres} Acres at ${plotData.center[0].toFixed(4)}° N, ${plotData.center[1].toFixed(4)}° E.`,
          badge: 'New Parcel',
        },
        ...(scanPreset
          ? [
              {
                id: `act-${Date.now() + 1}`,
                type: 'scan' as const,
                title: `AI Foliage Pathology: ${scanPreset.diseaseName.split('(')[0].trim()}`,
                date: 'Today, Just now',
                details: scanPreset.summary,
                badge: `${scanPreset.confidence}% Confidence`,
              },
            ]
          : []),
      ],
    };

    // Add matching Crop
    const newCrop: Crop = {
      id: newCropId,
      name: plotData.cropName,
      variety: 'Local Cultivar',
      plotId: newPlotId,
      plotName: plotData.name,
      areaAcres: plotData.areaAcres,
      plantedDate: new Date().toISOString().split('T')[0],
      expectedHarvestDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      healthStatus: newPlot.healthStatus,
      healthScore: scanPreset ? (scanPreset.confidenceTier === 'high' && !scanPreset.diseaseName.includes('Anthracnose') ? 95 : 70) : 92,
      lastChecked: 'Today, Just now',
      image: plotImage,
      stage: 'Vegetative growth',
      notes: `Registered via map boundary marker at ${plotData.center[0].toFixed(4)}° N, ${plotData.center[1].toFixed(4)}° E.`,
    };

    setPlots((prev) => [...prev, newPlot]);
    setCrops((prev) => [...prev, newCrop]);

    if (scanPreset) {
      const geoScan: GeoScanRecord = {
        id: `scan-geo-${Date.now()}`,
        title: `${plotData.name} — Initial Scan`,
        cropName: plotData.cropName,
        plotName: plotData.name,
        plotId: newPlotId,
        diseaseName: scanPreset.diseaseName,
        confidence: scanPreset.confidence,
        confidenceTier: scanPreset.confidenceTier,
        image: scanPreset.image,
        lat: plotData.center[0],
        lng: plotData.center[1],
        timestamp: 'Today, Just now',
        summary: scanPreset.summary,
        status: newPlot.healthStatus === 'healthy' ? 'healthy' : 'active_issue',
      };
      setGeoScans((prev) => [geoScan, ...prev]);
    }

    setIsDesigningNewPlot(false);
    setDraftPlotInfo(null);
    setSelectedPlotDrawerId(newPlotId);
    showToast(`Plot "${plotData.name}" created and pinned to map!`);
    return newPlot;
  };

  const assignScanToExistingPlot = (plotId: string, scanPreset: AiScanPreset) => {
    const targetPlot = plots.find((p) => p.id === plotId);
    if (!targetPlot) return;

    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === plotId) {
          const newActivity: PlotActivity = {
            id: `act-${Date.now()}`,
            type: 'scan',
            title: `AI Foliage Scan: ${scanPreset.diseaseName.split('(')[0].trim()} (${scanPreset.confidence}%)`,
            date: 'Today, Just now',
            details: scanPreset.summary,
            badge: scanPreset.confidence >= 75 ? 'Diagnosed' : 'Under Review',
          };

          return {
            ...p,
            lastUpdated: 'Today, Just now',
            image: scanPreset.image || p.image,
            healthStatus:
              scanPreset.confidenceTier === 'high' &&
              !scanPreset.diseaseName.includes('Anthracnose') &&
              !scanPreset.diseaseName.includes('Blast')
                ? 'healthy'
                : 'attention',
            lastScanned: {
              date: 'Today, Just now',
              diseaseName: scanPreset.diseaseName,
              confidence: scanPreset.confidence,
              image: scanPreset.image,
              summary: scanPreset.summary,
            },
            lastInstruction: {
              action: scanPreset.suggestedProductCategory
                ? `Apply ${scanPreset.suggestedProductCategory} treatment`
                : 'Monitor foliage and prune symptomatic runners',
              prescribedDate: 'Today, Just now',
              dosage: '20g per 10L water, fine mist sprayer',
              details: scanPreset.recommendedSteps?.[0] || scanPreset.summary,
              status: 'pending',
            },
            activities: [newActivity, ...(p.activities || [])],
          };
        }
        return p;
      })
    );

    // Drop geoScan
    const offsetLat = (Math.random() - 0.5) * 0.0004;
    const offsetLng = (Math.random() - 0.5) * 0.0004;
    const geoScan: GeoScanRecord = {
      id: `scan-geo-${Date.now()}`,
      title: `${targetPlot.name} Field Scan`,
      cropName: targetPlot.cropName,
      plotName: targetPlot.name,
      plotId: targetPlot.id,
      diseaseName: scanPreset.diseaseName,
      confidence: scanPreset.confidence,
      confidenceTier: scanPreset.confidenceTier,
      image: scanPreset.image,
      lat: targetPlot.center[0] + offsetLat,
      lng: targetPlot.center[1] + offsetLng,
      timestamp: 'Today, Just now',
      summary: scanPreset.summary,
      status:
        scanPreset.confidenceTier === 'high' &&
        !scanPreset.diseaseName.includes('Anthracnose') &&
        !scanPreset.diseaseName.includes('Blast')
          ? 'healthy'
          : 'active_issue',
    };
    setGeoScans((prev) => [geoScan, ...prev]);

    setIsFarmMapOpen(true);
    setSelectedPlotDrawerId(plotId);
    showToast(`Recorded scan to ${targetPlot.name}`);
  };

  // Add Crop
  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`,
    };
    setCrops((prev) => [newCrop, ...prev]);

    if (connectivity === 'offline') {
      setOutbox((prev) => [
        ...prev,
        {
          id: `outbox-${Date.now()}`,
          type: 'crop_update',
          description: `Add new crop: ${newCrop.name} (${newCrop.variety})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: newCrop,
        },
      ]);
      showToast('Crop saved locally in Offline Mode.');
    } else {
      showToast(`Crop "${newCrop.name}" added to farm records.`);
    }
  };

  const updateCropHealth = (cropId: string, status: HealthStatus, score: number, issue?: string) => {
    setCrops((prev) =>
      prev.map((c) => {
        if (c.id === cropId) {
          const updatedIssues = issue && !c.recentIssues?.includes(issue)
            ? [issue, ...(c.recentIssues || [])]
            : c.recentIssues;
          return {
            ...c,
            healthStatus: status,
            healthScore: score,
            lastChecked: 'Today, Just now',
            recentIssues: updatedIssues,
          };
        }
        return c;
      })
    );
  };

  // Reminders
  const toggleReminder = (id: string) => {
    let updatedReminder: Reminder | undefined;
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          updatedReminder = { ...r, isCompleted: !r.isCompleted };
          return updatedReminder;
        }
        return r;
      })
    );

    if (updatedReminder) {
      if (connectivity === 'offline') {
        setOutbox((prev) => [
          ...prev,
          {
            id: `outbox-${Date.now()}`,
            type: 'reminder_add',
            description: `Updated task: ${updatedReminder?.title}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            payload: updatedReminder,
          },
        ]);
        showToast(updatedReminder.isCompleted ? 'Task marked complete (queued offline)' : 'Task marked active (offline)');
      } else {
        showToast(updatedReminder.isCompleted ? 'Task completed!' : 'Task set to active');
      }
    }
  };

  const addReminder = (data: Omit<Reminder, 'id' | 'isCompleted'>) => {
    const newReminder: Reminder = {
      ...data,
      id: `rem-${Date.now()}`,
      isCompleted: false,
    };
    setReminders((prev) => [newReminder, ...prev]);

    if (connectivity === 'offline') {
      setOutbox((prev) => [
        ...prev,
        {
          id: `outbox-${Date.now()}`,
          type: 'reminder_add',
          description: `New reminder: ${newReminder.title}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: newReminder,
        },
      ]);
      showToast('Reminder added (queued offline).');
    } else {
      showToast(`Reminder created for ${newReminder.cropName}.`);
    }
  };

  // Community
  const toggleUpvote = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const upvoted = !p.userUpvoted;
          return {
            ...p,
            userUpvoted: upvoted,
            upvotes: upvoted ? p.upvotes + 1 : p.upvotes - 1,
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: DEMO_FARM_USER.name,
      avatar: DEMO_FARM_USER.avatarUrl,
      content,
      timestamp: 'Just now',
      upvotes: 0,
    };
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );
    showToast('Comment published.');
  };

  const addCommunityPost = (post: { title: string; content: string; crop: string; category: CommunityPost['category']; image?: string }) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: DEMO_FARM_USER.name,
      authorLocation: 'Pendang, Kedah',
      avatar: DEMO_FARM_USER.avatarUrl,
      title: post.title,
      content: post.content,
      crop: post.crop,
      category: post.category,
      image: post.image,
      timestamp: 'Just now',
      upvotes: 0,
      userUpvoted: false,
      comments: [],
    };
    setCommunityPosts((prev) => [newPost, ...prev]);

    if (connectivity === 'offline') {
      setOutbox((prev) => [
        ...prev,
        {
          id: `outbox-${Date.now()}`,
          type: 'community_post',
          description: `Community question: "${newPost.title.slice(0, 30)}..."`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: newPost,
        },
      ]);
      showToast('Post created (will sync when online).');
    } else {
      showToast('Post shared with AgriLink farmer community.');
    }
  };

  // Marketplace & Cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleSaveEquipment = (id: string) => {
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isSaved = !item.isSaved;
          showToast(isSaved ? 'Listing saved to favorites' : 'Removed from saved listings');
          return { ...item, isSaved };
        }
        return item;
      })
    );
  };

  // Mentors & Chat
  const activeConversation = conversations.find(
    (c) => c.mentorId === selectedMentorId
  ) || null;

  const startMentorInquiry = (
    mentorId: string,
    cropName: string,
    issueTitle: string,
    initialQuestion: string,
    imageUrl?: string
  ) => {
    const existing = conversations.find((c) => c.mentorId === mentorId);
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: initialQuestion,
      timestamp: 'Just now',
      imageUrl,
      status: connectivity === 'offline' ? ('queued_offline' as const) : ('delivered' as const),
    };

    if (existing) {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === existing.id) {
            return {
              ...c,
              cropName,
              issueTitle,
              lastMessage: initialQuestion,
              lastUpdated: 'Just now',
              messages: [...c.messages, newMessage],
            };
          }
          return c;
        })
      );
    } else {
      const newConv: MentorConversation = {
        id: `conv-${Date.now()}`,
        mentorId,
        cropName,
        issueTitle,
        lastMessage: initialQuestion,
        lastUpdated: 'Just now',
        unreadCount: 0,
        status: 'active',
        messages: [newMessage],
      };
      setConversations((prev) => [newConv, ...prev]);
    }

    if (connectivity === 'offline') {
      setOutbox((prev) => [
        ...prev,
        {
          id: `outbox-${Date.now()}`,
          type: 'mentor_request',
          description: `Mentor inquiry to ${mentors.find((m) => m.id === mentorId)?.name || 'Agronomist'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: { mentorId, initialQuestion, imageUrl },
        },
      ]);
      showToast('Inquiry queued in offline outbox. Will send when online.');
    } else {
      showToast('Inquiry sent to verified mentor.');
      // Simulate mentor reply after 3.5s
      setTimeout(() => {
        const replyText =
          mentorId === 'm1'
            ? "I received your sample. The concentric margins and discoloration indicate fungal pressure. Let's start with pruning out the lowest leaves and avoiding evening overhead spray."
            : "Thanks for sharing the photo Arjun. I am reviewing the agronomic markers. In the meantime, keep soil moisture steady.";
        
        setConversations((prev) =>
          prev.map((c) => {
            if (c.mentorId === mentorId) {
              return {
                ...c,
                lastMessage: replyText,
                lastUpdated: 'Just now',
                messages: [
                  ...c.messages,
                  {
                    id: `msg-rep-${Date.now()}`,
                    sender: 'mentor',
                    text: replyText,
                    timestamp: 'Just now',
                    status: 'delivered',
                  },
                ],
              };
            }
            return c;
          })
        );
      }, 3500);
    }
  };

  const sendMentorMessage = (mentorId: string, text: string, imageUrl?: string) => {
    if (!text.trim() && !imageUrl) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: 'Just now',
      imageUrl,
      status: connectivity === 'offline' ? ('queued_offline' as const) : ('delivered' as const),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.mentorId === mentorId) {
          return {
            ...c,
            lastMessage: text || 'Sent a photo',
            lastUpdated: 'Just now',
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      })
    );

    if (connectivity === 'offline') {
      setOutbox((prev) => [
        ...prev,
        {
          id: `outbox-${Date.now()}`,
          type: 'mentor_request',
          description: `Message to mentor: "${text.slice(0, 25)}..."`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: { mentorId, text },
        },
      ]);
      showToast('Message saved in offline outbox.');
    } else {
      // Simulate mentor reply
      setTimeout(() => {
        const mentor = mentors.find((m) => m.id === mentorId);
        const reply = `Noted on that, Arjun. I've logged this to your ${mentor?.title.includes('Rice') ? 'paddy' : 'chili'} record. Keep checking the undersides of new leaves daily.`;
        setConversations((prev) =>
          prev.map((c) => {
            if (c.mentorId === mentorId) {
              return {
                ...c,
                lastMessage: reply,
                lastUpdated: 'Just now',
                messages: [
                  ...c.messages,
                  {
                    id: `msg-reply-${Date.now()}`,
                    sender: 'mentor',
                    text: reply,
                    timestamp: 'Just now',
                    status: 'delivered',
                  },
                ],
              };
            }
            return c;
          })
        );
      }, 2500);
    }
  };

  // Equipment Chat
  const sendEquipmentMessage = (equipmentId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: EquipmentMessage = {
      id: `ec-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setEquipmentChats((prev) => ({
      ...prev,
      [equipmentId]: [...(prev[equipmentId] || []), newMsg],
    }));

    // Simulate seller reply
    setTimeout(() => {
      const sellerReply: EquipmentMessage = {
        id: `ec-seller-${Date.now()}`,
        sender: 'seller',
        text: 'Boleh, we are located near Jalan Pendang-Alor Setar. If you want to come by this Saturday afternoon, I will start up the engine for you to inspect.',
        timestamp: 'Just now',
      };
      setEquipmentChats((prev) => ({
        ...prev,
        [equipmentId]: [...(prev[equipmentId] || []), sellerReply],
      }));
    }, 2000);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.');
  };

    // DEMO STEP RUNNER (Connects the 11-step hackathon judge storyline)
  const triggerDemoStep = (stepNumber: number) => {
    // Reset secondary modals first
    setIsCartOpen(false);
    setIsAddCropOpen(false);
    setIsFarmMapOpen(false);
    setIsCreatePostOpen(false);
    setIsEquipmentChatOpen(false);

    // Helper: auto-populate demo crops/plots if jumping directly to steps 2-11
    const ensureDemoDataLoaded = () => {
      if (crops.length === 0) {
        setCrops(SAMPLE_DEMO_CROPS);
        setPlots(SAMPLE_DEMO_PLOTS);
        setGeoScans(SAMPLE_DEMO_GEO_SCANS);
        setConversations(SAMPLE_DEMO_CONVERSATIONS);
      }
    };

    switch (stepNumber) {
      case 1: // Log In & eKYC (Reset to new account & launch onboarding sequence)
        setCrops([]);
        setPlots([]);
        setGeoScans([]);
        setConversations([]);
        setSelectedCropId(null);
        setSelectedMentorId(null);
        setSelectedProductId(null);
        setSelectedEquipmentId(null);
        setActiveTab('home');
        setIsOnboardingOpen(true);
        showToast('Demo Step 1: Log In & eKYC (Reset to new account & launch onboarding sequence)');
        break;

      case 2: // Dashboard (Active crops, farm health & tasks)
        setIsOnboardingOpen(false);
        ensureDemoDataLoaded();
        setActiveTab('home');
        setSelectedCropId(null);
        setSelectedMentorId(null);
        setSelectedProductId(null);
        setSelectedEquipmentId(null);
        showToast('Demo Step 2: Farmer Dashboard (Crops, Health, Tasks, Alerts)');
        break;

      case 3: // AI Scan (Chili Anthracnose 88% confidence)
        setIsOnboardingOpen(false);
        ensureDemoDataLoaded();
        setActiveTab('scan');
        setSelectedCropId(null);
        runAnalysis(AI_SCAN_PRESETS[0]); // Chili Anthracnose preset
        showToast('Demo Step 3: AI Health Analysis (Scanning Chili Leaf)');
        break;

      case 4: // Crop Details (Plot A history & connected issues)
        setIsOnboardingOpen(false);
        ensureDemoDataLoaded();
        setActiveTab('crops');
        setSelectedCropId('crop-chili');
        showToast('Demo Step 4: Crop Details (Plot A Chili & Health Records)');
        break;

      case 5: // Ask Mentor (Low confidence scan → Dr. Aisha)
        setIsOnboardingOpen(false);
        ensureDemoDataLoaded();
        setActiveTab('scan');
        setSelectedCropId(null);
        runAnalysis(AI_SCAN_PRESETS[2]); // Low confidence sample
        showToast('Demo Step 5: Low AI Confidence → Ask a Verified Mentor');
        break;

      case 6: // Marketplace (Bio-copper fungicide recommendation)
        setIsOnboardingOpen(false);
        setActiveTab('market');
        setSelectedProductId('prod-copper-fungicide');
        showToast('Demo Step 6: Agricultural Marketplace (Bio-Copper Fungicide)');
        break;

      case 7: // Used Equipment (Honda water pump & message seller)
        setIsOnboardingOpen(false);
        setActiveTab('market');
        setSelectedProductId(null);
        setSelectedEquipmentId('eq-water-pump');
        showToast('Demo Step 7: Secondhand Equipment (Honda Water Pump)');
        break;

      case 8: // Community (Verified agronomist answers & Leaderboard)
        setIsOnboardingOpen(false);
        setActiveTab('community');
        setSelectedCropId(null);
        setSelectedMentorId(null);
        showToast('Demo Step 8: Farmer Knowledge Community & Nationwide Leaderboard');
        break;

      case 9: // Farm Map (Kedah plot boundaries & suppliers)
        setIsOnboardingOpen(false);
        ensureDemoDataLoaded();
        setActiveTab('crops');
        setSelectedCropId(null);
        setIsFarmMapOpen(true);
        showToast('Demo Step 9: Smart Crop Location & Farm Map (Kedah Plots)');
        break;

      case 10: // Smart Tasks (Weather-aware spraying reminders)
        setIsOnboardingOpen(false);
        setActiveTab('home');
        setIsRemindersModalOpen(true);
        showToast('Demo Step 10: Connected Crop Reminders & Weather Tips');
        break;

      case 11: // Offline Sync (Offline scan + Outbox queue)
        setIsOnboardingOpen(false);
        setActiveTab('home');
        setConnectivity('offline');
        // Add mock actions to outbox
        setOutbox([
          {
            id: 'outbox-demo-1',
            type: 'mentor_request',
            description: 'Mentor inquiry: Chili foliage curling photo',
            timestamp: '09:20 AM',
            payload: {},
          },
          {
            id: 'outbox-demo-2',
            type: 'reminder_add',
            description: 'Task completed: Morning irrigation check',
            timestamp: '09:22 AM',
            payload: {},
          },
        ]);
        setIsOutboxModalOpen(true);
        showToast('Demo Step 11: Offline-First Mode & Pending Outbox Sync');
        break;

      default:
        setActiveTab('home');
    }
  };

  return (
    <AppContext.Provider
      value={{
        connectivity,
        toggleConnectivity,
        setConnectivity,
        outbox,
        isSyncing,
        syncOutbox,
        lastSyncTime,

        activeTab,
        setActiveTab,

        selectedCropId,
        setSelectedCropId,
        isAddCropOpen,
        setIsAddCropOpen,
        selectedMentorId,
        setSelectedMentorId,
        selectedProductId,
        setSelectedProductId,
        selectedEquipmentId,
        setSelectedEquipmentId,
        isEquipmentChatOpen,
        setIsEquipmentChatOpen,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isRemindersModalOpen,
        setIsRemindersModalOpen,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isFarmMapOpen,
        setIsFarmMapOpen,
        isOutboxModalOpen,
        setIsOutboxModalOpen,
        isCartOpen,
        setIsCartOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,

        // Study / Plant Knowledge Library
        downloadedPlantIds,
        downloadPlant,
        removeDownloadedPlant,
        downloadMyCrops,
        selectedStudyPlantId,
        setSelectedStudyPlantId,
        selectedStudyDiseaseId,
        setSelectedStudyDiseaseId,
        openStudyForPlant,

        activeScanPreset,
        setActiveScanPreset,
        isAnalyzing,
        runAnalysis,
        scanResult,
        setScanResult,

        user,
        updateUserCredentials,
        applyBecomeMentor,
        crops,
        plots,
        addCrop,
        updateCropHealth,

        farmerLocation,
        geoScans,
        addGeoScan,
        selectedGeoScanId,
        setSelectedGeoScanId,
        selectedPlotDrawerId,
        setSelectedPlotDrawerId,

        isDesigningNewPlot,
        setIsDesigningNewPlot,
        draftPlotInfo,
        setDraftPlotInfo,
        startNewPlotDesign,
        createPlotAndAssignScan,
        assignScanToExistingPlot,

        reminders,
        toggleReminder,
        addReminder,

        communityPosts,
        toggleUpvote,
        addComment,
        addCommunityPost,

        products,
        equipment,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        toggleSaveEquipment,

        mentors,
        conversations,
        activeConversation,
        sendMentorMessage,
        startMentorInquiry,

        equipmentChats,
        sendEquipmentMessage,

        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,

        triggerDemoStep,
        demoToast,
        clearDemoToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
