/**
 * Link Master Config File
 * Centralized registry for all external agricultural authorities, research portals,
 * WhatsApp escalation hotlines, supplier links, and internal application navigation.
 */

export interface MasterLinkItem {
  id: string;
  name: string;
  url: string;
  category: 'government_agency' | 'agronomy_database' | 'emergency_hotline' | 'cooperative' | 'navigation';
  description: string;
  contactNumber?: string;
  state?: string;
}

export const LINK_MASTER_CONFIG = {
  // 1. Government Agriculture Departments & Research Institutes (Malaysia)
  agencies: {
    doa: {
      id: 'link-doa-malaysia',
      name: 'Jabatan Pertanian Malaysia (DOA)',
      url: 'https://www.doa.gov.my',
      category: 'government_agency' as const,
      description: 'Department of Agriculture Malaysia — Official biosecurity regulations, pesticide schedules, and extension services.',
      contactNumber: '+60 3-8870 3000',
    },
    mardi: {
      id: 'link-mardi',
      name: 'MARDI (Institut Penyelidikan & Kemajuan Pertanian)',
      url: 'https://www.mardi.gov.my',
      category: 'government_agency' as const,
      description: 'Malaysian Agricultural Research and Development Institute — Diagnostic laboratories & seed certification.',
      contactNumber: '+60 4-772 8910',
    },
    mada: {
      id: 'link-mada-kedah',
      name: 'Lembaga Kemajuan Pertanian Muda (MADA)',
      url: 'https://www.mada.gov.my',
      category: 'government_agency' as const,
      description: 'Muda Agricultural Development Authority — Northern Kedah canal water flow schedule & rice crop zoning.',
      contactNumber: '+60 4-772 1000',
      state: 'Kedah',
    },
    fama: {
      id: 'link-fama',
      name: 'Lembaga Pemasaran Pertanian Persekutuan (FAMA)',
      url: 'https://www.fama.gov.my',
      category: 'government_agency' as const,
      description: 'Federal Agricultural Marketing Authority — Wholesale farmgate vegetable pricing & Pasar Tani logistics.',
      contactNumber: '+60 3-6126 2020',
    },
    agrobank: {
      id: 'link-agrobank',
      name: 'Agrobank Malaysia',
      url: 'https://www.agrobank.com.my',
      category: 'government_agency' as const,
      description: 'Agricultural micro-finance, tractor mechanization loans, and crop weather loss insurance.',
      contactNumber: '1300-88-2476',
    },
  },

  // 2. Crop Pathology Scientific Databases & Diagnostic References
  pathologyDatabases: {
    cabiAnthracnose: {
      id: 'link-cabi-anthracnose',
      name: 'CABI Plantwise Compendium — Chili Anthracnose',
      url: 'https://www.cabi.org/isc/datasheet/14988',
      category: 'agronomy_database' as const,
      description: 'Global diagnosis key for Colletotrichum capsici and Colletotrichum acutatum in Solanaceae.',
    },
    irriRiceBlast: {
      id: 'link-irri-blast',
      name: 'IRRI Rice Knowledge Bank — Rice Blast Disease',
      url: 'http://www.knowledgebank.irri.org/step-by-step-production/growth/pests-and-diseases/diseases/rice-blast',
      category: 'agronomy_database' as const,
      description: 'Magnaporthe oryzae identification protocol, tillering vulnerability, and water table management.',
    },
    worldVegChiliIpm: {
      id: 'link-worldveg-ipm',
      name: 'World Vegetable Center — Tropical Pepper IPM',
      url: 'https://avrdc.org',
      category: 'agronomy_database' as const,
      description: 'Integrated Pest Management guidelines for chili mites, thrips, and foliar fungal blights.',
    },
  },

  // 3. Farmer Cooperatives & Input Suppliers in Kedah
  suppliers: {
    kedahAgroSupplies: {
      id: 'link-sup-kedah-agro',
      name: 'Kedah Agro Supplies Sdn Bhd',
      url: 'https://agrilink.local/suppliers/kedah-agro',
      category: 'cooperative' as const,
      description: 'Certified copper hydroxide fungicides, knapsack sprayers, and F1 hybrid vegetable seeds.',
      contactNumber: '+60 4-772 8910',
      state: 'Pendang, Kedah',
    },
    ppkPendang: {
      id: 'link-sup-ppk-pendang',
      name: 'Pertubuhan Peladang Kawasan (PPK) Pendang',
      url: 'https://agrilink.local/cooperatives/ppk-pendang',
      category: 'cooperative' as const,
      description: 'Farmers Area Association — Bulk organic fertilizer, canal gate notices, and member spray equipment.',
      contactNumber: '+60 4-759 6223',
      state: 'Kedah',
    },
  },

  // 4. Emergency Agronomist WhatsApp Escalation Channels
  helplines: {
    agronomistAisha: {
      id: 'link-wa-dr-aisha',
      name: 'Dr. Aisha Rahman (Direct WhatsApp)',
      url: 'https://wa.me/60124458921?text=Salam%20Dr%20Aisha,%20saya%20petani%20AgriLink%20perlukan%20semakan%20daun%20tanaman.',
      category: 'emergency_hotline' as const,
      description: 'Direct escalation line for unconfirmed low-confidence leaf pathology scans.',
      contactNumber: '+60 12-445 8921',
    },
    pejabatPertanianPendang: {
      id: 'link-tel-doa-pendang',
      name: 'Pejabat Pertanian Daerah Pendang',
      url: 'tel:+6047596200',
      category: 'emergency_hotline' as const,
      description: 'District agriculture office for disease outbreak quarantine reports.',
      contactNumber: '+60 4-759 6200',
    },
  },

  // 5. Internal App Navigation Routes
  routes: {
    dashboard: '/dashboard',
    crops: '/crops',
    farmMap: '/map',
    aiScan: '/scan',
    marketplace: '/market',
    community: '/community',
    reminders: '/reminders',
  },

  // 6. Farm map tile providers
  mapTiles: {
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    street: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  },
} as const;

/**
 * Builds a pre-filled WhatsApp consultation message for a specific leaf scan or plot issue
 */
export function buildWhatsAppConsultationUrl(options: {
  phone?: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  plotName?: string;
}): string {
  const defaultPhone = LINK_MASTER_CONFIG.helplines.agronomistAisha.contactNumber;
  const phoneNumber = (options.phone || defaultPhone).replace(/[^0-9]/g, '');
  const text = `Salam Dr. Aisha / Agronomis AgriLink,
Saya perlukan nasihat pakar untuk sampel tanaman:
- Tanaman: ${options.cropName}
- Plot: ${options.plotName || 'Plot Lapangan'}
- Pengesanan AI: ${options.diseaseName} (${options.confidence}% Keyakinan)
Boleh bantu sahkan rawatan terbaik sebelum semburan racun kulat? Terima kasih.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}
