/**
 * Image Master Config File
 * Centralized registry for all image assets across the AgriLink platform.
 * Ensures consistent asset referencing, eliminates brittle hardcoded URLs,
 * and guarantees authentic agricultural imagery (no medical pills or placeholder stock).
 */

export interface AppImageItem {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: 'crop' | 'pathology_scan' | 'farm_plot' | 'equipment' | 'avatar' | 'product' | 'ui';
  aspectRatio?: string;
  isVerifiedAgriAsset: boolean;
  notes?: string;
}

/**
 * Edit these paths to replace an image everywhere it is used in the app.
 * Local files should live in public/assets/images and use /assets/images/<file>.
 * Remote images can use their full https URL.
 */
export const IMAGE_PATHS = {
  chiliLeaf: '/assets/images/chili_anthracnose_leaf_1790266562913.jpg',
  chiliAnthracnose: '/assets/images/chili_anthracnose_leaf_1790269211400.jpg',
  chiliCurled: '/assets/images/chili_leaf_curled_1790269222540.jpg',
  chiliHealthy: '/assets/images/chili_plant_healthy_1790269233639.jpg',
  riceBlast: '/assets/images/rice_paddy_blast_leaf_1790266574580.jpg',
  farmOverview: '/assets/images/malaysia_demo_farm_1790266584652.jpg',
  waterPump: '/assets/images/water_pump_equipment_1790266595503.jpg',
  tomato: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
  tomatoProduct: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&auto=format&fit=crop&q=80',
  corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
  soybean: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80',
  farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  farmerAvatarLarge: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  aishaAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  uncleTanAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  sarahAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  kamaruddinAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  zaitonAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  davidAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  sivanesanAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  fatimahAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
  copperProduct: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80',
  bioFungicideProduct: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
  bioFungicideProductLarge: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
  compostProduct: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80',
  compostProductLarge: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
  stickyTrapsProduct: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=80',
  dripTapeProduct: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=400&auto=format&fit=crop&q=80',
  fertilizerProduct: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&auto=format&fit=crop&q=80',
  soilProduct: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&auto=format&fit=crop&q=80',
  soilEquipment: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=80',
  seedProduct: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&auto=format&fit=crop&q=80',
  sprayProduct: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
  riceProduct: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
  tractorEquipment: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
  equipmentField: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600&auto=format&fit=crop&q=80',
  equipmentTool: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
  equipmentWorker: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
  paddyHealthy: 'https://images.unsplash.com/photo-1536054992520-22c60c8b25cb?w=600&auto=format&fit=crop&q=80',
  tomatoHealthy: 'https://images.unsplash.com/photo-1546470427-227c7369a9b2?w=600&auto=format&fit=crop&q=80',
  potatoCrop: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
  appleCrop: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
  riceHealthySample: 'https://images.unsplash.com/photo-1536054992520-22c60c8b25cb?w=600&auto=format&fit=crop&q=80',
  tomatoHealthySample: 'https://images.unsplash.com/photo-1546470427-227c7369a9b2?w=600&auto=format&fit=crop&q=80',
  ricePlantImage: 'https://images.unsplash.com/photo-1536054992520-22c60c8b25cb?w=600&auto=format&fit=crop&q=80',
  potatoImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
  plantTomato: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
  plantCorn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
  tomatoSampleHealthy: 'https://images.unsplash.com/photo-1546470427-227c7369a9b2?w=600&auto=format&fit=crop&q=80',
  tomatoEarlyBlight: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
  riceBlastSample: '/assets/images/rice_paddy_blast_leaf_1790266574580.jpg',
  chiliLeafLegacy: '/assets/images/chili_anthracnose_leaf_1790266562913.jpg',
  alternateFarmerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  alternateMentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  communityAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  avatarCommunityOther: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  avatarOther: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
  productImageA: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
  productImageB: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
  productImageC: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&auto=format&fit=crop&q=80',
  productImageD: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&auto=format&fit=crop&q=80',
  productImageE: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&auto=format&fit=crop&q=80',
  productImageF: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
  productImageG: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
  tractorImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
  farmMachineryImage: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600&auto=format&fit=crop&q=80',
  toolImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
  fieldWorkerImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
  potatoProduct: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
} as const;

export const IMAGE_MASTER_CONFIG = {
  // 1. AI Scan Pathology Samples (Leaf Diagnostics)
  aiScans: {
    // Verified Anthracnose on Chili Foliage (Plot A)
    chiliAnthracnose: {
      id: 'img-scan-chili-anthracnose',
      url: IMAGE_PATHS.chiliAnthracnose,
      alt: 'Close-up of chili pepper leaf with circular necrotic anthracnose fungal lesions',
      title: 'Anthracnose (Colletotrichum spp.) on Chili Foliage',
      category: 'pathology_scan' as const,
      aspectRatio: '4:3',
      isVerifiedAgriAsset: true,
      notes: 'High confidence diagnosis sample showing concentric rings and necrotic spots.',
    },
    // Verified Rice Blast on Paddy Leaf (Plot B)
    riceBlast: {
      id: 'img-scan-rice-blast',
      url: IMAGE_PATHS.riceBlast,
      alt: 'Spindle-shaped blast lesion on fragrant paddy rice leaf blade',
      title: 'Suspected Rice Blast (Magnaporthe oryzae)',
      category: 'pathology_scan' as const,
      aspectRatio: '4:3',
      isVerifiedAgriAsset: true,
      notes: 'Medium confidence sample with diamond-shaped fungal lesions.',
    },
    // Fixed: Curled and Shadowed Chili Leaf (Low Confidence, Replaces old pill photo)
    chiliCurledLowConfidence: {
      id: 'img-scan-chili-curled-low-conf',
      url: IMAGE_PATHS.chiliCurled,
      alt: 'Macro photograph of curled chili leaf under shadowed lighting for low confidence testing',
      title: 'Curled & Distorted Chili Leaf (Low Confidence Sample)',
      category: 'pathology_scan' as const,
      aspectRatio: '4:3',
      isVerifiedAgriAsset: true,
      notes: 'Authentic chili foliar curl caused by mites; replaces erroneous medical pill photo.',
    },
    // Healthy Durian Canopy Foliage (Plot C)
    durianHealthy: {
      id: 'img-scan-durian-healthy',
      url: IMAGE_PATHS.farmOverview,
      alt: 'Vigorous dark green canopy of Musang King durian tree',
      title: 'Healthy Durian Canopy (Zero Pathogens)',
      category: 'pathology_scan' as const,
      aspectRatio: '4:3',
      isVerifiedAgriAsset: true,
      notes: 'High confidence healthy baseline with optimal chlorophyll turgor.',
    },
  },

  // 2. Crop Varieties & Harvests
  crops: {
    chili: {
      id: 'img-crop-chili-healthy',
      url: IMAGE_PATHS.chiliHealthy,
      alt: 'Healthy chili pepper plant with glossy red fruit and lush green foliage',
      title: 'Chili Kulai F1 Hybrid Plant',
      category: 'crop' as const,
      isVerifiedAgriAsset: true,
    },
    chiliDiseasedPlot: {
      id: 'img-crop-chili-plot-a',
      url: IMAGE_PATHS.chiliAnthracnose,
      alt: 'Chili crop leaf under monitoring for anthracnose',
      title: 'Plot A Chili Crop Under Treatment',
      category: 'crop' as const,
      isVerifiedAgriAsset: true,
    },
    paddy: {
      id: 'img-crop-paddy',
      url: IMAGE_PATHS.riceBlast,
      alt: 'MR297 Fragrant Rice Paddy in tillering stage',
      title: 'Fragrant Rice Paddy (MR297)',
      category: 'crop' as const,
      isVerifiedAgriAsset: true,
    },
    durian: {
      id: 'img-crop-durian',
      url: IMAGE_PATHS.farmOverview,
      alt: 'Musang King Durian Orchard canopy in Kedah',
      title: 'Musang King (D197) Durian Orchard',
      category: 'crop' as const,
      isVerifiedAgriAsset: true,
    },
    tomato: {
      id: 'img-crop-tomato',
      url: IMAGE_PATHS.tomato,
      alt: 'Red Ruby Beefsteak Tomato cluster in greenhouse tunnel',
      title: 'Beefsteak Tomato',
      category: 'crop' as const,
      isVerifiedAgriAsset: true,
    },
    corn: {
      id: 'img-crop-corn',
      url: IMAGE_PATHS.corn,
      alt: 'Sweet Corn Honey Jean stalks in vegetative stage',
      title: 'Sweet Corn (Honey Jean)',
      category: 'crop' as const,
      isVerifiedAgriAsset: true,
    },
  },

  // 3. Farm Plots & Boundaries (Circular Image Badges on Map)
  plots: {
    plotA: {
      id: 'img-plot-a',
      url: IMAGE_PATHS.chiliAnthracnose,
      alt: 'Plot A Chili Farm Parcel Marker',
      title: 'Plot A — Chili (1.2 Acres)',
      category: 'farm_plot' as const,
      isVerifiedAgriAsset: true,
    },
    plotB: {
      id: 'img-plot-b',
      url: IMAGE_PATHS.riceBlast,
      alt: 'Plot B Paddy Rice Parcel Marker',
      title: 'Plot B — Paddy (3.5 Acres)',
      category: 'farm_plot' as const,
      isVerifiedAgriAsset: true,
    },
    plotC: {
      id: 'img-plot-c',
      url: IMAGE_PATHS.farmOverview,
      alt: 'Plot C Durian Orchard Parcel Marker',
      title: 'Plot C — Durian (2.0 Acres)',
      category: 'farm_plot' as const,
      isVerifiedAgriAsset: true,
    },
    overviewFarm: {
      id: 'img-plot-farm-overview',
      url: IMAGE_PATHS.farmOverview,
      alt: 'AgriLink Demo Farm Aerial Overview in Pendang, Kedah',
      title: 'Pendang Integrated Demonstration Farm',
      category: 'farm_plot' as const,
      isVerifiedAgriAsset: true,
    },
  },

  // 4. Machinery & Equipment
  equipment: {
    waterPump: {
      id: 'img-equip-water-pump',
      url: IMAGE_PATHS.waterPump,
      alt: 'High-pressure diesel agricultural irrigation pump for paddy canal sluice intake',
      title: 'Yamaha 3-Inch High Flow Water Pump',
      category: 'equipment' as const,
      isVerifiedAgriAsset: true,
    },
  },

  // 5. Farmers & Mentors Avatars
  avatars: {
    farmer: {
      id: 'img-avatar-farmer',
      url: IMAGE_PATHS.farmerAvatar,
      alt: 'Pakcik Ismail (Kedah Farmer)',
      title: 'Pakcik Ismail (Pendang Farmer)',
      category: 'avatar' as const,
      isVerifiedAgriAsset: true,
    },
    drAisha: {
      id: 'img-avatar-dr-aisha',
      url: IMAGE_PATHS.aishaAvatar,
      alt: 'Dr. Aisha Rahman (Plant Pathologist)',
      title: 'Dr. Aisha Rahman (MARDI Agronomist)',
      category: 'avatar' as const,
      isVerifiedAgriAsset: true,
    },
    uncleTan: {
      id: 'img-avatar-uncle-tan',
      url: IMAGE_PATHS.uncleTanAvatar,
      alt: 'Uncle Tan (MADA Paddy Veteran)',
      title: 'Uncle Tan (MADA Water Authority Veteran)',
      category: 'avatar' as const,
      isVerifiedAgriAsset: true,
    },
    sarahLee: {
      id: 'img-avatar-sarah-lee',
      url: IMAGE_PATHS.sarahAvatar,
      alt: 'Sarah Lee (Organic Soil Specialist)',
      title: 'Sarah Lee (Soil Microbiologist)',
      category: 'avatar' as const,
      isVerifiedAgriAsset: true,
    },
  },

  // 6. Agro Inputs & Products
  products: {
    copperHydroxide: {
      id: 'img-prod-copper',
      url: IMAGE_PATHS.copperProduct,
      alt: 'Nordox 75 WG Bio-Copper Fungicide',
      title: 'Nordox 75 WG Bio-Copper Hydroxide Fungicide',
      category: 'product' as const,
      isVerifiedAgriAsset: true,
    },
    bioFungicide: {
      id: 'img-prod-bio-fungicide',
      url: IMAGE_PATHS.bioFungicideProduct,
      alt: 'Bacillus subtilis bio-fungicide formulation for rice blast',
      title: 'Serenade Bio-Fungicide (Bacillus subtilis)',
      category: 'product' as const,
      isVerifiedAgriAsset: true,
    },
    organicCompost: {
      id: 'img-prod-compost',
      url: IMAGE_PATHS.compostProduct,
      alt: 'AEC Fermented Organic Palm & Poultry Compost (25kg)',
      title: 'AEC Fermented Organic Compost (25kg)',
      category: 'product' as const,
      isVerifiedAgriAsset: true,
    },
    yellowStickyTraps: {
      id: 'img-prod-traps',
      url: IMAGE_PATHS.stickyTrapsProduct,
      alt: 'Agricultural UV-resistant yellow sticky insect monitoring traps',
      title: 'Dual-Sided Yellow Sticky Traps (Pack of 20)',
      category: 'product' as const,
      isVerifiedAgriAsset: true,
    },
    dripTape: {
      id: 'img-prod-drip',
      url: IMAGE_PATHS.dripTapeProduct,
      alt: 'Rivulis T-Tape 16mm Drip Irrigation Fertigation Line',
      title: 'Rivulis T-Tape 16mm Drip Tape (1000m)',
      category: 'product' as const,
      isVerifiedAgriAsset: true,
    },
  },
} as const;

/**
 * Helper function to retrieve a verified crop image with safe fallback
 */
export function getCropImage(cropKeyOrName: string): string {
  const normalized = cropKeyOrName.toLowerCase();
  if (normalized.includes('chili') || normalized.includes('cili')) {
    return IMAGE_MASTER_CONFIG.crops.chili.url;
  }
  if (normalized.includes('paddy') || normalized.includes('rice') || normalized.includes('padi')) {
    return IMAGE_MASTER_CONFIG.crops.paddy.url;
  }
  if (normalized.includes('durian')) {
    return IMAGE_MASTER_CONFIG.crops.durian.url;
  }
  if (normalized.includes('tomato')) {
    return IMAGE_MASTER_CONFIG.crops.tomato.url;
  }
  if (normalized.includes('corn') || normalized.includes('jagung')) {
    return IMAGE_MASTER_CONFIG.crops.corn.url;
  }
  return IMAGE_MASTER_CONFIG.plots.overviewFarm.url;
}

/**
 * Helper function to retrieve a verified AI Scan preset image
 */
export function getScanPresetImage(presetId: string): string {
  switch (presetId) {
    case 'preset-chili-anthracnose':
      return IMAGE_MASTER_CONFIG.aiScans.chiliAnthracnose.url;
    case 'preset-rice-blast':
      return IMAGE_MASTER_CONFIG.aiScans.riceBlast.url;
    case 'preset-low-confidence':
      return IMAGE_MASTER_CONFIG.aiScans.chiliCurledLowConfidence.url;
    case 'preset-healthy-leaf':
      return IMAGE_MASTER_CONFIG.aiScans.durianHealthy.url;
    default:
      return IMAGE_MASTER_CONFIG.aiScans.chiliAnthracnose.url;
  }
}
