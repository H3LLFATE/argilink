import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Layers,
  MapPin,
  Navigation,
  Compass,
  Sprout,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  MessageSquare,
  ScanLine,
  Phone,
  Crosshair,
  Plus,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  Droplets,
  Check,
  ChevronDown,
  ChevronUp,
  Move,
  AlertCircle,
  ArrowLeft,
  Home,
} from 'lucide-react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { GeoScanRecord, FarmPlot, PlotActivity } from '../../types';
import { AI_SCAN_PRESETS } from '../../data/mockData';
import { LINK_MASTER_CONFIG } from '../../config/linkMasterConfig';

export const FarmMapView: React.FC = () => {
  const {
    isFarmMapOpen,
    setIsFarmMapOpen,
    user,
    plots,
    crops,
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
    createPlotAndAssignScan,
    reminders,
    toggleReminder,
    addReminder,
    setActiveTab,
    runAnalysis,
    setSelectedCropId,
    setSelectedMentorId,
    setSelectedProductId,
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapType, setMapType] = useState<'satellite' | 'street' | 'terrain'>('satellite');
  const [activeFilter, setActiveFilter] = useState<'all' | 'scans' | 'plots' | 'suppliers'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScan, setSelectedScan] = useState<GeoScanRecord | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);

  // New plot designer state
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotCrop, setNewPlotCrop] = useState('');
  const [newPlotAcres, setNewPlotAcres] = useState(1.0);
  const [newPlotCenter, setNewPlotCenter] = useState<[number, number]>(farmerLocation);
  const [isAdjustingLocation, setIsAdjustingLocation] = useState(false);

  // Active drawer tab
  const [drawerTab, setDrawerTab] = useState<'overview' | 'last_scan' | 'instructions' | 'calendar' | 'activities'>('overview');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  // Sync designer form with draftPlotInfo when opened
  useEffect(() => {
    if (draftPlotInfo) {
      setNewPlotName(draftPlotInfo.name);
      setNewPlotCrop(draftPlotInfo.cropName);
      setNewPlotAcres(draftPlotInfo.areaAcres);
      setNewPlotCenter(draftPlotInfo.center);
    }
  }, [draftPlotInfo]);

  // Demo suppliers in Kedah
  const suppliers = [
    {
      id: 'sup-1',
      name: 'Kedah Agro Supplies Sdn Bhd',
      type: 'Bio-Copper Fungicides & Certified Seeds',
      distance: '8.4 km away',
      address: 'Pendang Industrial Hub, Kedah',
      phone: '+60 4-772 8910',
      lat: 6.0648,
      lng: 100.4915,
      prodId: 'prod-copper-fungicide',
    },
    {
      id: 'sup-2',
      name: 'PPK Pendang Farmers Cooperative',
      type: 'Compost, Traps & Irrigation Parts',
      distance: '6.1 km away',
      address: 'Pekan Pendang, Kedah',
      phone: '+60 4-759 6223',
      lat: 6.0512,
      lng: 100.4685,
      prodId: 'prod-organic-fertilizer',
    },
    {
      id: 'sup-3',
      name: 'MADA Canal Gate 4 Regulator',
      type: 'Canal Irrigation Intake (MADA North)',
      distance: '0.4 km away',
      address: 'Tali Air MADA Pendang',
      phone: '+60 4-772 1000',
      lat: 6.0608,
      lng: 100.4818,
      prodId: null,
    },
  ];

  // Tile layer URLs
  const tileUrls = {
    satellite: LINK_MASTER_CONFIG.mapTiles.satellite,
    street: LINK_MASTER_CONFIG.mapTiles.street,
    terrain: LINK_MASTER_CONFIG.mapTiles.terrain,
  };

  // Initialize Map
  useEffect(() => {
    if (!isFarmMapOpen || !mapContainerRef.current) return;

    let timer: NodeJS.Timeout;
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [6.0565, 100.4795],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      // Base tile layer
      tileLayerRef.current = L.tileLayer(tileUrls[mapType], {
        maxZoom: 19,
      }).addTo(map);

      // Layer group for markers and overlays
      layerGroupRef.current = L.layerGroup().addTo(map);

      // Click on map to adjust new plot location when in adjust mode
      map.on('click', (e) => {
        if (isDesigningNewPlot) {
          setNewPlotCenter([e.latlng.lat, e.latlng.lng]);
        }
      });

      mapInstanceRef.current = map;

      // Invalidate size once DOM has laid out inside the phone container
      timer = setTimeout(() => {
        map.invalidateSize();
      }, 150);
    } else {
      timer = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 150);
    }

    const handleResize = () => {
      mapInstanceRef.current?.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isFarmMapOpen]);

  // Update Tile Layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(tileUrls[mapType]);
  }, [mapType]);

  // Render Overlays & Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // 1. Farmer Location Marker ("Me" icon)
    const farmerIcon = L.divIcon({
      className: 'custom-farmer-pin',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <div class="absolute -inset-2 bg-blue-500/30 rounded-full animate-ping"></div>
          <div class="absolute -inset-4 bg-blue-500/15 rounded-full"></div>
          <div class="relative w-10 h-10 rounded-full border-2 border-white bg-blue-600 shadow-xl overflow-hidden flex items-center justify-center">
            <img src="${user.avatarUrl}" alt="${user.name}" class="w-full h-full object-cover" />
          </div>
          <div class="absolute top-11 bg-stone-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md whitespace-nowrap border border-white/30">
            You Are Here
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    L.marker(farmerLocation, { icon: farmerIcon, zIndexOffset: 1000 }).addTo(layerGroup);

    // 2. Plot Polygons and Circular Image Badges
    if (activeFilter === 'all' || activeFilter === 'plots') {
      plots.forEach((plot) => {
        const isAttention = plot.healthStatus === 'attention';
        const color = isAttention ? '#f59e0b' : '#10b981';
        const fillColor = isAttention ? '#f59e0b' : '#10b981';

        // Polygon boundary
        if (plot.boundaryLatLangs) {
          const polygon = L.polygon(plot.boundaryLatLangs as any, {
            color,
            weight: 2.5,
            fillColor,
            fillOpacity: 0.22,
            dashArray: isAttention ? '4, 4' : undefined,
          }).addTo(layerGroup);

          polygon.on('click', () => {
            if (isDesigningNewPlot) return;
            setSelectedPlotDrawerId(plot.id);
            setSelectedScan(null);
            setSelectedSupplier(null);
            mapInstanceRef.current?.panTo(plot.center);
          });
        }

        // Circular Image Badge Marker at Plot Center
        const circularIcon = L.divIcon({
          className: 'custom-plot-circle-badge',
          html: `
            <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
              <div class="w-13 h-13 rounded-full border-3 ${
                isAttention ? 'border-amber-400 ring-4 ring-amber-400/30' : 'border-emerald-500 ring-4 ring-emerald-500/30'
              } bg-white shadow-2xl overflow-hidden transition-all transform group-hover:scale-115 flex items-center justify-center">
                <img src="${plot.image}" alt="${plot.name}" class="w-full h-full object-cover" />
                <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                  isAttention ? 'bg-amber-500' : 'bg-emerald-600'
                } text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-sm">
                  ${isAttention ? '!' : '✓'}
                </span>
              </div>
              <div class="mt-1 bg-white/95 backdrop-blur-xs text-stone-900 px-2 py-0.5 rounded-full shadow-md text-[10px] font-bold border border-stone-200 whitespace-nowrap group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                ${plot.name}
              </div>
            </div>
          `,
          iconSize: [56, 70],
          iconAnchor: [28, 35],
        });

        const plotMarker = L.marker(plot.center, { icon: circularIcon, zIndexOffset: 500 }).addTo(layerGroup);

        plotMarker.on('click', () => {
          if (isDesigningNewPlot) return;
          setSelectedPlotDrawerId(plot.id);
          setSelectedScan(null);
          setSelectedSupplier(null);
          mapInstanceRef.current?.panTo(plot.center);
        });
      });
    }

    // 3. Highlighted Draft Polygon when Designing New Plot
    if (isDesigningNewPlot) {
      const deltaLat = 0.0007 * Math.sqrt(newPlotAcres);
      const deltaLng = 0.0009 * Math.sqrt(newPlotAcres);
      const draftPolygon = [
        [newPlotCenter[0] + deltaLat, newPlotCenter[1] - deltaLng],
        [newPlotCenter[0] + deltaLat, newPlotCenter[1] + deltaLng],
        [newPlotCenter[0] - deltaLat, newPlotCenter[1] + deltaLng],
        [newPlotCenter[0] - deltaLat, newPlotCenter[1] - deltaLng],
      ];

      L.polygon(draftPolygon as any, {
        color: '#06b6d4',
        weight: 3,
        dashArray: '6, 6',
        fillColor: '#06b6d4',
        fillOpacity: 0.35,
      }).addTo(layerGroup);

      // Center Pin for New Plot
      const draftCenterIcon = L.divIcon({
        className: 'custom-draft-center',
        html: `
          <div class="w-10 h-10 rounded-full bg-cyan-600 text-white border-2 border-white shadow-2xl flex items-center justify-center font-bold text-sm animate-bounce -translate-x-1/2 -translate-y-1/2">
            🌱
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker(newPlotCenter, { icon: draftCenterIcon, zIndexOffset: 800 }).addTo(layerGroup);
    }

    // 4. Geo Scanned Locations (Saved Leaf Scans)
    if (activeFilter === 'all' || activeFilter === 'scans') {
      geoScans.forEach((scan) => {
        const isHealthy = scan.status === 'healthy';
        const borderColor = isHealthy ? '#10b981' : scan.confidenceTier === 'low' ? '#ec4899' : '#ef4444';
        const badgeColor = isHealthy ? 'bg-emerald-600' : 'bg-rose-600';

        const customIcon = L.divIcon({
          className: 'custom-geo-scan-pin',
          html: `
            <div class="relative group cursor-pointer -translate-x-1/2 -translate-y-full">
              <div class="w-9 h-9 rounded-full border-2 bg-white overflow-hidden shadow-lg transition-transform hover:scale-110 flex items-center justify-center" style="border-color: ${borderColor}">
                <img src="${scan.image}" alt="${scan.cropName}" class="w-full h-full object-cover" />
                <span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ${badgeColor} text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                  ${isHealthy ? '✓' : '!'}
                </span>
              </div>
              <div class="w-2 h-2 bg-stone-900 mx-auto rotate-45 -mt-1 shadow-sm"></div>
            </div>
          `,
          iconSize: [36, 40],
          iconAnchor: [18, 40],
        });

        const marker = L.marker([scan.lat, scan.lng], { icon: customIcon }).addTo(layerGroup);

        marker.on('click', () => {
          setSelectedScan(scan);
          setSelectedPlotDrawerId(null);
          setSelectedSupplier(null);
          mapInstanceRef.current?.panTo([scan.lat, scan.lng]);
        });
      });
    }

    // 5. Nearby Suppliers
    if (activeFilter === 'all' || activeFilter === 'suppliers') {
      suppliers.forEach((sup) => {
        const customIcon = L.divIcon({
          className: 'custom-supplier-pin',
          html: `
            <div class="relative cursor-pointer -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform">
              <div class="w-8 h-8 rounded-full bg-blue-600 text-white border-2 border-white shadow-md flex items-center justify-center font-bold text-xs">
                🏪
              </div>
              <div class="w-2 h-2 bg-blue-600 mx-auto rotate-45 -mt-1"></div>
            </div>
          `,
          iconSize: [32, 36],
          iconAnchor: [16, 36],
        });

        const marker = L.marker([sup.lat, sup.lng], { icon: customIcon }).addTo(layerGroup);

        marker.on('click', () => {
          setSelectedSupplier(sup);
          setSelectedScan(null);
          setSelectedPlotDrawerId(null);
          mapInstanceRef.current?.panTo([sup.lat, sup.lng]);
        });
      });
    }
  }, [plots, geoScans, activeFilter, isFarmMapOpen, isDesigningNewPlot, newPlotCenter, newPlotAcres, user]);

  // Center on Farmer Location ("Me")
  const handleRecenterMe = () => {
    mapInstanceRef.current?.flyTo(farmerLocation, 17, { duration: 0.8 });
  };

  // Zoom In / Out
  const handleZoom = (delta: number) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + delta);
  };

  // Nudge new plot position
  const handleNudgePlot = (dLat: number, dLng: number) => {
    setNewPlotCenter(([lat, lng]) => [lat + dLat, lng + dLng]);
  };

  // Save new plot
  const handleSaveNewPlot = () => {
    createPlotAndAssignScan(
      {
        name: newPlotName || `Plot ${String.fromCharCode(65 + plots.length)}`,
        cropName: newPlotCrop || 'Chili Vegetable',
        areaAcres: Number(newPlotAcres),
        center: newPlotCenter,
        soilType: 'Alluvial clay-loam (pH 6.2)',
        irrigation: 'Drip fertigation line',
      },
      draftPlotInfo?.scanResult
    );
  };

  // Active Selected Plot from Drawer
  const activePlot = plots.find((p) => p.id === selectedPlotDrawerId);
  const plotReminders = activePlot ? reminders.filter((r) => r.cropId === activePlot.cropId || r.plotName.includes(activePlot.name)) : [];

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !activePlot) return;
    addReminder({
      title: newTaskTitle.trim(),
      cropId: activePlot.cropId,
      cropName: activePlot.cropName,
      plotName: activePlot.name,
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '08:30 AM',
      type: 'spraying',
      smartWeatherNote: 'Optimal field application window.',
      priority: 'medium',
    });
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  if (!isFarmMapOpen) return null;

  const handleReturnHome = () => {
    setIsFarmMapOpen(false);
    setIsDesigningNewPlot(false);
    setSelectedPlotDrawerId(null);
    setSelectedScan(null);
    setSelectedSupplier(null);
    setActiveTab('home');
  };

  const handleCloseMap = () => {
    setIsFarmMapOpen(false);
    setIsDesigningNewPlot(false);
    setSelectedPlotDrawerId(null);
    setSelectedScan(null);
    setSelectedSupplier(null);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 sm:bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-0 sm:py-6 sm:px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleReturnHome();
        }
      }}
    >
      {/* Mobile-first phone container matching HomeDashboard dimensions on larger screens */}
      <div className="w-full max-w-md h-full sm:h-[844px] sm:max-h-[92vh] bg-stone-950 text-stone-900 flex flex-col sm:rounded-[36px] overflow-hidden shadow-2xl relative border sm:border-stone-700 sm:ring-8 sm:ring-stone-900/80">
        
        {/* Top App Header with persistent and clear Back to Home */}
        <header className="sticky top-0 z-[2000] bg-stone-900/98 backdrop-blur-md border-b border-stone-800 px-3.5 py-2.5 flex items-center justify-between shrink-0 shadow-lg pointer-events-auto">
          <button
            onClick={handleReturnHome}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white rounded-xl shadow font-bold text-xs flex items-center gap-1.5 transition-all group cursor-pointer"
            title="Exit map and return to Home dashboard"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-100">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Farm GPS Map</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </div>

          <button
            onClick={handleReturnHome}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Close map and return home"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Interactive Map Canvas Wrapper */}
        <div className="relative flex-1 w-full h-full overflow-hidden isolate z-0">
          {/* Main Leaflet Map Container */}
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

          {/* Floating Search Bar & Filter Pills (positioned right under top header) */}
          <div className="absolute top-2.5 left-2.5 right-2.5 z-[1200] flex flex-col gap-2 pointer-events-auto">
            {/* Search Bar Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-stone-200 p-2 flex items-center gap-2">
              <div className="p-1 text-stone-500">
                <Search className="w-4 h-4" />
              </div>

              <input
                type="text"
                placeholder="Search farm plots, scans, suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-xs text-stone-900 bg-transparent focus:outline-none placeholder-stone-400 font-medium"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Pills & Add Plot Trigger */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              {!isDesigningNewPlot && (
                <button
                  onClick={() => {
                    setSelectedPlotDrawerId(null);
                    setSelectedScan(null);
                    setSelectedSupplier(null);
                    setDraftPlotInfo({
                      name: `Plot ${String.fromCharCode(65 + plots.length)} — New Parcel`,
                      cropName: 'Vegetable Crop',
                      areaAcres: 1.2,
                      center: [farmerLocation[0] + 0.0003, farmerLocation[1] + 0.0003],
                    });
                    setIsDesigningNewPlot(true);
                  }}
                  className="px-3 py-1.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 ring-2 ring-emerald-500/40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Plot</span>
                </button>
              )}

              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white/90 text-stone-700 hover:bg-white'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setActiveFilter('plots')}
                className={`px-3 py-1.5 rounded-full font-bold shadow-sm transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeFilter === 'plots'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white/90 text-emerald-800 hover:bg-white'
                }`}
              >
                <span>🌾 Plots ({plots.length})</span>
              </button>

              <button
                onClick={() => setActiveFilter('scans')}
                className={`px-3 py-1.5 rounded-full font-bold shadow-sm transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeFilter === 'scans'
                    ? 'bg-rose-700 text-white'
                    : 'bg-white/90 text-rose-800 hover:bg-white'
                }`}
              >
                <span>🔬 Scans ({geoScans.length})</span>
              </button>

              <button
                onClick={() => setActiveFilter('suppliers')}
                className={`px-3 py-1.5 rounded-full font-bold shadow-sm transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeFilter === 'suppliers'
                    ? 'bg-blue-700 text-white'
                    : 'bg-white/90 text-blue-800 hover:bg-white'
                }`}
              >
                <span>🏪 Supplies ({suppliers.length})</span>
              </button>
            </div>
          </div>

          {/* Floating Map Style Switcher & Zoom Controls (Top Right) */}
          <div className="absolute top-24 right-2.5 z-[1200] flex flex-col gap-1.5 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-stone-200 p-1 flex flex-col gap-1">
              <button
                onClick={() => setMapType('satellite')}
                className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  mapType === 'satellite'
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>🛰️ Sat</span>
              </button>

              <button
                onClick={() => setMapType('street')}
                className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 ${
                  mapType === 'street'
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>🗺️ Map</span>
              </button>

              <button
                onClick={() => setMapType('terrain')}
                className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 ${
                  mapType === 'terrain'
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>⛰️ Ter</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-stone-200 p-1 flex flex-col items-center">
              <button
                onClick={() => handleZoom(1)}
                className="w-7 h-7 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold text-sm"
                title="Zoom in"
              >
                +
              </button>
              <div className="w-4 h-[1px] bg-stone-200 my-0.5" />
              <button
                onClick={() => handleZoom(-1)}
                className="w-7 h-7 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold text-sm"
                title="Zoom out"
              >
                -
              </button>
            </div>

            {/* Center on Me (Farmer Location) */}
            <button
              onClick={handleRecenterMe}
              className="w-9 h-9 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-stone-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95 transition-all relative"
              title="Center on My GPS Location"
            >
              <Navigation className="w-4 h-4 text-blue-600 fill-blue-600" />
            </button>

            {/* Design New Plot Button */}
            {!isDesigningNewPlot && (
              <button
                onClick={() => {
                  setDraftPlotInfo({
                    name: `Plot ${String.fromCharCode(65 + plots.length)} — New Parcel`,
                    cropName: 'Vegetable Crop',
                    areaAcres: 1.2,
                    center: [farmerLocation[0] + 0.0003, farmerLocation[1] + 0.0003],
                  });
                  setIsDesigningNewPlot(true);
                }}
                className="w-9 h-9 bg-emerald-700 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-emerald-800 active:scale-95 transition-all"
                title="Designate New Plot Boundary"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>

      {/* DESIGN NEW PLOT CONTROLLER (When designing/saving a new plot) */}
      {isDesigningNewPlot && (
        <div className="absolute bottom-3 left-3 right-3 max-w-md mx-auto z-[1500] animate-in slide-in-from-bottom duration-300 pointer-events-auto">
          <div className="bg-white/98 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-emerald-600 ring-4 ring-emerald-500/20 max-h-[80vh] flex flex-col space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shadow-xs">
                  🌱
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Designate New Plot Boundary</h3>
                  <p className="text-[11px] text-stone-500">
                    Highlighted around your location · Tap map to move
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDesigningNewPlot(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable form body */}
            <div className="overflow-y-auto space-y-3 pr-1 max-h-[48vh]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-stone-600 block uppercase tracking-wider mb-1">Plot Name</label>
                  <input
                    type="text"
                    value={newPlotName}
                    onChange={(e) => setNewPlotName(e.target.value)}
                    placeholder="e.g. Plot D — Chili"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-600 block uppercase tracking-wider mb-1">Crop Type</label>
                  <input
                    type="text"
                    value={newPlotCrop}
                    onChange={(e) => setNewPlotCrop(e.target.value)}
                    placeholder="e.g. Chili Kulai"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>
              </div>

              {/* Adjust Boundary Size & Nudge Coordinates */}
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">Parcel Size: {newPlotAcres.toFixed(1)} Acres</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-md">Auto-scaled boundary</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={newPlotAcres}
                  onChange={(e) => setNewPlotAcres(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />

                {/* Nudge buttons */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-600 font-semibold">Fine-tune Position:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleNudgePlot(0.0003, 0)}
                      className="px-2 py-1 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-[10px] shadow-2xs"
                      title="Nudge North"
                    >
                      ↑ N
                    </button>
                    <button
                      onClick={() => handleNudgePlot(-0.0003, 0)}
                      className="px-2 py-1 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-[10px] shadow-2xs"
                      title="Nudge South"
                    >
                      ↓ S
                    </button>
                    <button
                      onClick={() => handleNudgePlot(0, -0.0003)}
                      className="px-2 py-1 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-[10px] shadow-2xs"
                      title="Nudge West"
                    >
                      ← W
                    </button>
                    <button
                      onClick={() => handleNudgePlot(0, 0.0003)}
                      className="px-2 py-1 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-[10px] shadow-2xs"
                      title="Nudge East"
                    >
                      → E
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 font-mono text-center pt-0.5">
                  Center GPS: {newPlotCenter[0].toFixed(5)}° N, {newPlotCenter[1].toFixed(5)}° E
                </div>
              </div>
            </div>

            {/* STICKY ACTION BUTTONS: Big prominent Save button */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100 shrink-0">
              <button
                onClick={() => setIsDesigningNewPlot(false)}
                className="py-3 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors text-center"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveNewPlot}
                className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-lg transition-all text-center flex items-center justify-center gap-2 ring-2 ring-emerald-600/30"
              >
                <Check className="w-4 h-4" />
                <span>Save New Plot</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE PLOT INSPECTOR DROPDOWN / SHEET (Tapped on Circular Plot Image) */}
      {activePlot && !isDesigningNewPlot && (
        <div className="absolute bottom-0 left-0 right-0 max-w-md mx-auto z-[1500] animate-in slide-in-from-bottom duration-300 pointer-events-auto">
          <div className="bg-white rounded-t-3xl shadow-2xl border-t border-stone-200 max-h-[82vh] flex flex-col overflow-hidden">
            {/* Drawer Pull Handle & Header */}
            <div className="p-4 border-b border-stone-200 bg-stone-50 shrink-0">
              <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto mb-3" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Circular Image of Plot with Status Ring */}
                  <div className="relative">
                    <img
                      src={activePlot.image}
                      alt={activePlot.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-md ring-3 ring-emerald-500/20"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                        activePlot.healthStatus === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-stone-900">{activePlot.name}</h2>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          activePlot.healthStatus === 'healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {activePlot.healthStatus === 'healthy' ? 'Optimal' : 'Attention'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-0.5">
                      {activePlot.cropName} · {activePlot.areaAcres} Acres
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Last updated: {activePlot.lastUpdated}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleReturnHome}
                    className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1"
                    title="Exit map and return to homepage"
                  >
                    <Home className="w-3 h-3" />
                    <span>Home</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlotDrawerId(null)}
                    className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
                    title="Close plot drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-1 mt-3 overflow-x-auto no-scrollbar text-[11px] font-bold">
                <button
                  onClick={() => setDrawerTab('overview')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    drawerTab === 'overview'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Overview & Info
                </button>

                <button
                  onClick={() => setDrawerTab('last_scan')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 whitespace-nowrap ${
                    drawerTab === 'last_scan'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>🔬 Last Scanned</span>
                </button>

                <button
                  onClick={() => setDrawerTab('instructions')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 whitespace-nowrap ${
                    drawerTab === 'instructions'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>📋 Told to Do</span>
                </button>

                <button
                  onClick={() => setDrawerTab('calendar')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 whitespace-nowrap ${
                    drawerTab === 'calendar'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>📅 Calendar ({plotReminders.length})</span>
                </button>

                <button
                  onClick={() => setDrawerTab('activities')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 whitespace-nowrap ${
                    drawerTab === 'activities'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>📜 Activities ({activePlot.activities?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* TAB 1: OVERVIEW & INFO */}
              {drawerTab === 'overview' && (
                <div className="space-y-3">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                      <span className="text-[10px] font-semibold text-stone-400 block uppercase">Soil Type & pH</span>
                      <span className="text-xs font-bold text-stone-900 mt-0.5 block">{activePlot.soilType}</span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                      <span className="text-[10px] font-semibold text-stone-400 block uppercase">Irrigation System</span>
                      <span className="text-xs font-bold text-stone-900 mt-0.5 block">{activePlot.irrigation}</span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                      <span className="text-[10px] font-semibold text-stone-400 block uppercase">GPS Center</span>
                      <span className="text-xs font-bold text-stone-900 font-mono mt-0.5 block">
                        {activePlot.center[0].toFixed(4)}° N, {activePlot.center[1].toFixed(4)}° E
                      </span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                      <span className="text-[10px] font-semibold text-stone-400 block uppercase">Field Parcel Size</span>
                      <span className="text-xs font-bold text-stone-900 mt-0.5 block">{activePlot.areaAcres} Acres</span>
                    </div>
                  </div>

                  {/* Summary of Last Scan & Prescribed Action */}
                  {activePlot.lastScanned && (
                    <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-2xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          Latest Pathology Status
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          {activePlot.lastScanned.date}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-stone-900">
                        {activePlot.lastScanned.diseaseName}
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-2">
                        {activePlot.lastScanned.summary}
                      </p>
                    </div>
                  )}

                  {/* Action Shortcuts */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setIsFarmMapOpen(false);
                        setSelectedCropId(activePlot.cropId);
                      }}
                      className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Sprout className="w-3.5 h-3.5" />
                      <span>Crop Agronomy File</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsFarmMapOpen(false);
                        setActiveTab('scan');
                        runAnalysis(AI_SCAN_PRESETS[0]);
                      }}
                      className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ScanLine className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Scan New Leaf</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: LAST SCANNED */}
              {drawerTab === 'last_scan' && (
                <div className="space-y-3">
                  {activePlot.lastScanned ? (
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                          <img
                            src={activePlot.lastScanned.image}
                            alt="Last leaf scan"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md uppercase">
                              Pathology Record
                            </span>
                            <span className="text-[10px] text-stone-400">· {activePlot.lastScanned.date}</span>
                          </div>

                          <h4 className="text-xs font-bold text-stone-900 mt-1">
                            {activePlot.lastScanned.diseaseName}
                          </h4>

                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              {activePlot.lastScanned.confidence}% Confidence
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-stone-200">
                        <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">
                          Diagnostic Analysis:
                        </span>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {activePlot.lastScanned.summary}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsFarmMapOpen(false);
                          setActiveTab('community');
                          setSelectedMentorId('m1');
                        }}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send Leaf Scan to Agronomist (Dr. Aisha)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-stone-50 rounded-2xl border border-stone-200 p-4">
                      <p className="text-xs text-stone-500">No previous pathology scans logged for this parcel.</p>
                      <button
                        onClick={() => {
                          setIsFarmMapOpen(false);
                          setActiveTab('scan');
                        }}
                        className="mt-2 px-3 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-bold"
                      >
                        Take First Scan
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TOLD TO DO (PRESCRIBED INSTRUCTIONS) */}
              {drawerTab === 'instructions' && (
                <div className="space-y-3">
                  {activePlot.lastInstruction ? (
                    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-3.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-700" />
                          <span className="text-xs font-bold text-amber-950">Prescribed Agronomic Treatment</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {activePlot.lastInstruction.status === 'pending' ? 'Action Required' : 'Completed ✓'}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-amber-200/80 space-y-2">
                        <div className="text-xs font-bold text-stone-900">
                          {activePlot.lastInstruction.action}
                        </div>
                        {activePlot.lastInstruction.dosage && (
                          <div className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
                            <span className="font-bold">Dosage: </span>
                            {activePlot.lastInstruction.dosage}
                          </div>
                        )}
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {activePlot.lastInstruction.details}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-stone-500 px-1">
                        <span>Prescribed Date: {activePlot.lastInstruction.prescribedDate}</span>
                      </div>

                      {/* Bridge to Marketplace to buy prescribed input */}
                      <button
                        onClick={() => {
                          setIsFarmMapOpen(false);
                          setActiveTab('market');
                          setSelectedProductId('prod-copper-fungicide');
                        }}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Source Prescribed Input Nearby (RM38.00)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-stone-50 rounded-2xl border border-stone-200 p-4">
                      <p className="text-xs text-stone-500">No active treatment instructions for this parcel.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CALENDAR & REMINDERS */}
              {drawerTab === 'calendar' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      Scheduled Field Tasks ({plotReminders.length})
                    </span>
                    <button
                      onClick={() => setShowAddTask(!showAddTask)}
                      className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg hover:bg-emerald-100"
                    >
                      {showAddTask ? 'Close Form' : '+ Add Task'}
                    </button>
                  </div>

                  {showAddTask && (
                    <form onSubmit={handleAddNewTask} className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200 space-y-2">
                      <input
                        type="text"
                        placeholder="Task description (e.g. Copper Spraying Row 4)..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!newTaskTitle.trim()}
                        className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
                      >
                        Add to Plot Calendar
                      </button>
                    </form>
                  )}

                  {plotReminders.length > 0 ? (
                    <div className="space-y-2">
                      {plotReminders.map((r) => (
                        <div
                          key={r.id}
                          className={`p-3 rounded-2xl border text-xs flex items-start justify-between transition-colors ${
                            r.isCompleted
                              ? 'bg-stone-50 border-stone-200 opacity-60'
                              : 'bg-white border-stone-200 shadow-xs'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={() => toggleReminder(r.id)}
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors ${
                                r.isCompleted
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-stone-300 hover:border-emerald-600'
                              }`}
                            >
                              {r.isCompleted && <Check className="w-3.5 h-3.5" />}
                            </button>

                            <div>
                              <span
                                className={`font-semibold block ${
                                  r.isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                                }`}
                              >
                                {r.title}
                              </span>
                              <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{r.dueDate} · {r.dueTime}</span>
                              </div>
                              {r.smartWeatherNote && (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded block mt-1">
                                  ⛅ {r.smartWeatherNote}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-400 text-center py-4">No tasks scheduled for this plot.</p>
                  )}
                </div>
              )}

              {/* TAB 5: ALL PREVIOUS ACTIVITIES */}
              {drawerTab === 'activities' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-900 block">
                    Parcel Activity History Timeline
                  </span>

                  {activePlot.activities && activePlot.activities.length > 0 ? (
                    <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-200">
                      {activePlot.activities.map((act) => (
                        <div key={act.id} className="relative">
                          <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white" />
                          <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900">{act.title}</span>
                              {act.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                  {act.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400 block mt-0.5">{act.date}</span>
                            <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">{act.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-400 text-center py-4">No logged activity yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scanned Location Floating Card */}
      {selectedScan && !selectedPlotDrawerId && !isDesigningNewPlot && (
        <div className="absolute bottom-4 left-3 right-3 max-w-md mx-auto z-[1500] animate-in slide-in-from-bottom duration-200 pointer-events-auto">
          <div className="bg-white rounded-3xl p-3.5 shadow-2xl border border-stone-200 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200 relative">
                <img
                  src={selectedScan.image}
                  alt={selectedScan.cropName}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded ${
                    selectedScan.status === 'healthy' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  {selectedScan.confidence}%
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                    Field Scanned Location
                  </span>
                  <span className="text-[10px] text-stone-400">· {selectedScan.timestamp}</span>
                </div>

                <h3 className="text-xs font-bold text-stone-900 truncate mt-0.5">
                  {selectedScan.diseaseName}
                </h3>
                <p className="text-[11px] text-stone-600 truncate mt-0.5">
                  {selectedScan.plotName} · GPS: {selectedScan.lat.toFixed(4)}° N, {selectedScan.lng.toFixed(4)}° E
                </p>
              </div>

              <button
                onClick={() => setSelectedScan(null)}
                className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-xl border border-stone-100 leading-relaxed">
              {selectedScan.summary}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsFarmMapOpen(false);
                  setActiveTab('scan');
                  runAnalysis(AI_SCAN_PRESETS[0]);
                }}
                className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>View Full Scan</span>
              </button>

              <button
                onClick={() => {
                  setIsFarmMapOpen(false);
                  setActiveTab('community');
                  setSelectedMentorId('m1');
                }}
                className="py-2 px-3 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ask Mentor</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Card when a Supplier is selected */}
      {selectedSupplier && !selectedPlotDrawerId && !isDesigningNewPlot && !selectedScan && (
        <div className="absolute bottom-4 left-3 right-3 max-w-md mx-auto z-[1500] animate-in slide-in-from-bottom duration-200 pointer-events-auto">
          <div className="bg-white rounded-3xl p-3.5 shadow-2xl border border-stone-200 space-y-2.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                  Nearby Verified Supplier
                </span>
                <h3 className="text-xs font-bold text-stone-900 mt-1">{selectedSupplier.name}</h3>
                <p className="text-[11px] text-stone-500">{selectedSupplier.type} · {selectedSupplier.distance}</p>
              </div>

              <button
                onClick={() => setSelectedSupplier(null)}
                className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-600">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>{selectedSupplier.phone}</span>
              <span>·</span>
              <span>{selectedSupplier.address}</span>
            </div>

            {selectedSupplier.prodId && (
              <button
                onClick={() => {
                  setIsFarmMapOpen(false);
                  setActiveTab('market');
                  setSelectedProductId(selectedSupplier.prodId);
                }}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Browse Products From This Supplier</span>
              </button>
            )}
          </div>
        </div>
      )}

        </div>

        {/* Persistent Bottom Bar with Return to Home & Shortcuts */}
        <footer className="sticky bottom-0 z-[2000] bg-white/98 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-between gap-2 shrink-0 shadow-xl pointer-events-auto">
          <button
            onClick={handleReturnHome}
            className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            title="Exit map and return to Home dashboard"
          >
            <Home className="w-4 h-4" />
            <span>Exit Map & Return to Home</span>
          </button>

          <button
            onClick={() => {
              handleCloseMap();
              setActiveTab('crops');
            }}
            className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Go to Crops"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>Crops</span>
          </button>

          <button
            onClick={() => {
              handleCloseMap();
              setActiveTab('scan');
            }}
            className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Go to AI Scan"
          >
            <ScanLine className="w-3.5 h-3.5 text-emerald-700" />
            <span>Scan</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
