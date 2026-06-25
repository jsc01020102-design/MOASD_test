import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOASD_SERVICES } from '../data';
import { 
  Cpu, 
  Zap, 
  Milestone, 
  Truck, 
  Sparkles, 
  BatteryCharging, 
  Check, 
  ArrowRight, 
  Sparkle, 
  Award,
  Activity,
  ArrowUpRight,
  RefreshCw,
  Play,
  Pause,
  Home,
  Trees,
  Sliders,
  Upload,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HybridMotorcycleAdvancedShowcase } from './HybridMotorcycleAdvancedShowcase';
import { EssAdvancedShowcase } from './EssAdvancedShowcase';

// Import image assets for path resolution in build bundles
import adamhanCabinHouse from '../assets/images/adamhan_cabin_house_1781935827590.jpg';
import marineFloatingResort from '../assets/images/marine_floating_resort_1781936311828.jpg';
import floatingGlassCabin from '../assets/images/floating_glass_cabin_1781936324938.jpg';
import floatingVillasRow from '../assets/images/floating_villas_row_1781937076057.jpg';
import farmCabinInterior from '../assets/images/farm_cabin_interior_1781936557154.jpg';
import luxuryCaravanCamper from '../assets/images/luxury_caravan_camper_1781936581515.jpg';
import biocharSystemLine from '../assets/images/biochar_system_line.svg';

const renderServiceIcon = (name: string, className: string) => {
  switch (name) {
    case 'Cpu': return <Cpu className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Milestone': return <Milestone className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'BatteryCharging': return <BatteryCharging className={className} />;
    default: return <Cpu className={className} />;
  }
};

export interface ThreeDCarouselProps {
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
}

export const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  activeIndex: controlledActiveIndex,
  setActiveIndex: setControlledActiveIndex
}) => {
  const { language, t } = useLanguage();
  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(5); // Start on HGE3D00 by default

  const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;
  const setActiveIndex = (index: number) => {
    if (setControlledActiveIndex) {
      setControlledActiveIndex(index);
    } else {
      setInternalActiveIndex(index);
    }
  };

  const isEn = language === 'en';

  // Load custom services with imageUrl from localStorage if available
  const [services, setServices] = useState<any[]>(() => {
    const saved = localStorage.getItem('moasd_custom_services');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return MOASD_SERVICES;
  });

  // Admin Edit Mode states - check if admin logged in OR toggle override
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const hasAdminSession = sessionStorage.getItem('moasd_admin_session') !== null;
    const manualToggle = localStorage.getItem('moasd_admin_manual_toggle') === 'true';
    return hasAdminSession || manualToggle;
  });

  const [viewMode, setViewMode] = useState<'image' | 'diagram'>('image');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<'cambodia' | 'thailand' | 'vietnam'>('cambodia');
  const [biocharStep, setBiocharStep] = useState<number>(0);
  const [hoveredEquip, setHoveredEquip] = useState<string | null>('trailer');

  // Sync admin mode and storage modifications
  useEffect(() => {
    const syncState = () => {
      const hasAdminSession = sessionStorage.getItem('moasd_admin_session') !== null;
      const manualToggle = localStorage.getItem('moasd_admin_manual_toggle') === 'true';
      setIsAdminMode(hasAdminSession || manualToggle);

      const saved = localStorage.getItem('moasd_custom_services');
      if (saved) {
        try {
          setServices(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    };
    window.addEventListener('storage', syncState);
    const interval = setInterval(syncState, 1500);
    return () => {
      window.removeEventListener('storage', syncState);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const currentService = services[activeIndex];
    if (activeIndex === 5) {
      setViewMode('diagram');
    } else if (currentService && currentService.imageUrl) {
      setViewMode('image');
    } else {
      setViewMode('diagram');
    }
    setActiveStep(0);
  }, [activeIndex, services]);

  useEffect(() => {
    if (activeIndex !== 5 || viewMode !== 'diagram' || !isAutoplay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIndex, viewMode, isAutoplay]);

  useEffect(() => {
    const handleCarouselChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      if (customEvent.detail && typeof customEvent.detail.index === 'number') {
        const targetIdx = customEvent.detail.index;
        if (targetIdx >= 0 && targetIdx < services.length) {
          setActiveIndex(targetIdx);
          const bgSection = document.getElementById('services-section');
          if (bgSection) {
            bgSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    window.addEventListener('moasd-change-carousel-idx', handleCarouselChange);
    return () => {
      window.removeEventListener('moasd-change-carousel-idx', handleCarouselChange);
    };
  }, [setControlledActiveIndex, services.length]);

  const handleImageUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const updated = [...services];
      updated[idx] = {
        ...updated[idx],
        imageUrl: base64Data
      };
      setServices(updated);
      localStorage.setItem('moasd_custom_services', JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = (idx: number) => {
    if (confirm(isEn ? "Are you sure you want to delete this image?" : "이 이미지를 정말로 삭제하시겠습니까?")) {
      const updated = [...services];
      const newService = { ...updated[idx] };
      delete newService.imageUrl;
      updated[idx] = newService;
      setServices(updated);
      localStorage.setItem('moasd_custom_services', JSON.stringify(updated));
    }
  };

  const service = services[activeIndex];
  const serviceTitle = isEn && service.titleEn ? service.titleEn : service.title;
  const serviceSubtitle = isEn && service.subtitleEn ? service.subtitleEn : service.subtitle;
  const serviceDesc = isEn && service.descriptionEn ? service.descriptionEn : service.description;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 select-none flex flex-col items-center">
      
      {/* Chapter Segmented Navigation Pill List for Easy Chapter Navigation */}
      <div className="w-full flex justify-center mb-10 flex-wrap gap-2.5">
        {services.map((serv, idx) => {
          const isActive = idx === activeIndex;
          let label = isEn ? serv.titleEn : serv.title;
          // Shorten labels on buttons
          if (idx === 0) label = isEn ? 'Hybrid Supercapacitor' : '하이브리드 슈퍼 커패시터';
          else if (idx === 1) label = isEn ? 'Solar Energy' : '태양열';
          else if (idx === 2) label = isEn ? 'E-Bicycle' : '자전거';
          else if (idx === 3) label = isEn ? 'Motorcycle' : '오토바이';
          else if (idx === 4) label = isEn ? 'SAM Materials' : 'SAM 신소재';
          else if (idx === 5) label = isEn ? 'HGE3D00 Gen' : 'HGE3D00 발전기';
          else if (idx === 6) label = isEn ? 'Biochar Agri' : '바이오차 비료';

          return (
            <button
              key={serv.id}
              onClick={() => {
                setActiveIndex(idx);
                const bgSection = document.getElementById('services-section');
                if (bgSection) {
                  bgSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border-cyan-400/80 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)] scale-[1.02]'
                  : 'bg-slate-950/50 border-white/5 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <span className={`font-mono text-[8.5px] px-1.5 py-0.5 rounded ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-500'}`}>0{idx + 1}</span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Master/Admin Control Panel Bar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/40 border border-white/5 rounded-2xl p-4 sm:p-5 mb-8 gap-4 select-text">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sliders className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              {isEn ? "Master & Admin Interactive Console" : "마스터 및 관리자 미디어 통제 구도"}
              {isAdminMode ? (
                <span className="text-[9.5px] bg-red-500/20 border border-red-500/30 text-red-400 font-mono px-2 py-0.5 rounded font-black flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  MASTER CONTROL SYSTEM ON
                </span>
              ) : (
                <span className="text-[9.5px] bg-slate-950 border border-white/5 text-slate-500 font-mono px-2 py-0.5 rounded font-black">
                  STANDBY
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
              {isEn 
                ? "Manage images and photos for all key parts on this website (Excluding Generator)." 
                : "HGE3D00 발전기를 제외한 모든 파트별 솔루션의 고품격 실물 전면 사진을 등록, 수정 및 삭제할 수 있습니다."}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const nextMode = !isAdminMode;
            setIsAdminMode(nextMode);
            localStorage.setItem('moasd_admin_manual_toggle', nextMode ? 'true' : 'false');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all border flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center ${
            isAdminMode
              ? 'bg-red-500/15 border-red-500/50 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:bg-red-500/25'
              : 'bg-slate-950/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-900/80'
          }`}
        >
          <Sliders className="w-4 h-4" />
          {isEn ? "Toggle Admin Mode" : "관리자 모드 전환"} ({isAdminMode ? "ON" : "OFF"})
        </button>
      </div>

      {/* Main High-Fidelity Combined Details Plate (Single Screen, Fully Responsive) */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {activeIndex === 0 ? (
              // Custom side-by-side layout for Hybrid Supercapacitor as requested by the user
              <div className="col-span-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
                {/* LEFT COLUMN (lg:col-span-7): Custom styled description card */}
                <div className="lg:col-span-7 flex flex-col justify-between border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl space-y-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-400 font-mono">
                      <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-3 py-1.5 rounded-md">
                        01 / {isEn ? 'CORE PORTFOLIO' : '핵심 포트폴리오'}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 font-bold">
                        <Sparkle className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                        IMPACT 98%
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight">
                      {isEn ? "Hybrid Supercapacitor" : "하이브리드 슈퍼커패시터"}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-[15px] font-bold text-cyan-400 leading-relaxed max-w-2xl border-b border-white/5 pb-4">
                      {isEn ? "Ultra-Fast Cycle & High-Density Cell Design" : "초고속 충반전 및 고밀도 정밀 축전 셀 설계"}
                    </p>

                    <div className="space-y-5 pt-2 select-text">
                      <p className="text-sm md:text-[15px] text-slate-200 font-semibold leading-relaxed font-sans border-l-2 border-cyan-500/40 pl-4 py-0.5">
                        {isEn 
                          ? "An ultra-capacitor is a high-efficiency power device." 
                          : "울트라 커패시터는 고효율 디바이스이다."}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {isEn 
                          ? "Because its Coulombic Efficiency (the ratio of discharged charge to the total charge added to replenish the discharge) exceeds 99% even under high currents, virtually no charge is lost during charge/discharge."
                          : "쿨롱 효율(방전된 충전량을 채우기 위해 추가된 총 충전량으로 방전된 총 충전량을 나눈 값)이 고전류에서도 99%를 초과하기 때문에 울트라커패시터를 충·방전할 때 소실되는 충전량이 거의 없다."}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {isEn
                          ? "Thanks to its extremely low Equivalent Series Resistance (ESR), its Round-Trip Efficiency (RTE) is exceptionally high: exceeding 70% within 5 seconds and 80% within 10 seconds."
                          : "또한 낮은 ESR(Equivalent Series Resistance) 덕분에 RTE(Round-Trip Efficiency)도 매우 높다. 5초 내에 RTE 가 70%를 넘는다. 10초 내에 RTE가 80%를 넘는다."}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {isEn
                          ? "This not only enables more efficient energy utilization but also prevents overheating. Consequently, the cooling overhead required to actively cool the energy storage device is significantly reduced."
                          : "이는 에너지를 더욱 효율적으로 사용할 수 있을 뿐만 아니라 과열을 방지한다. 따라서 에너지 저장 디바이스를 냉각해야 하는 오버헤드가 줄어들 가능성이 높다."}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {isEn
                          ? "Discharges to 1/2 voltage within 5 seconds and charges concurrently at the exact same high rate until the ultra-capacitor is fully charged."
                          : "5초 내에 1/2 전압으로 방전하고 울트라커패시터가 완전히 충전될 때까지 같은 속도로 충전."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (lg:col-span-5): Beautiful 4-panel vector diagrams or custom uploaded photo */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  {/* View Mode Toggle for Supercapacitor */}
                  <div className="flex items-center justify-between p-1 bg-slate-950/80 border border-white/5 rounded-xl w-full">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewMode('diagram')}
                        className={`px-3 py-1.5 text-[10.5px] font-mono font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                          viewMode === 'diagram'
                            ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        ⚡ {isEn ? 'TECHNICAL DIAGRAM' : '기술 도해 / 설계도'}
                      </button>
                      <button
                        onClick={() => setViewMode('image')}
                        className={`px-3 py-1.5 text-[10.5px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                          viewMode === 'image'
                            ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        🖼️ {isEn ? 'REAL-LIFE PHOTO' : '실물 전면 사진'}
                      </button>
                    </div>

                    {isAdminMode && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/40 border border-red-500/20 text-[9px] font-mono font-bold text-red-400">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                        ADMIN EDITING
                      </div>
                    )}
                  </div>

                  {viewMode === 'image' ? (
                    service.imageUrl ? (
                      <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-slate-950/80 to-slate-900 flex items-center justify-center p-4">
                          <div className="absolute inset-0 bg-radial-at-c from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
                          <img 
                            src={service.imageUrl} 
                            alt={serviceTitle}
                            className="w-full h-full object-contain filter brightness-105 contrast-105 hover:scale-[1.03] transition-transform duration-750"
                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-slate-950/90 border border-cyan-500/30 text-[9px] font-mono font-bold text-cyan-400 tracking-wider">
                            HYBRID SUPERCAPACITOR PHOTO ACTIVE
                          </div>
                        </div>

                        {isAdminMode && (
                          <div className="flex items-center justify-end gap-2 p-2 rounded-xl bg-slate-950/50 border border-white/5">
                            <span className="text-[10px] font-mono text-slate-400 mr-auto pl-2 font-bold uppercase">
                              {isEn ? "Admin Actions:" : "관리자 기능:"}
                            </span>
                            <label className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-white/10 transition-colors">
                              <Upload className="w-3.5 h-3.5 text-cyan-400" />
                              {isEn ? "Change Photo" : "사진 변경 및 수정"}
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(0, e)} 
                              />
                            </label>
                            <button
                              onClick={() => handleImageDelete(0)}
                              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-red-500/25 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              {isEn ? "Delete Photo" : "사진 삭제"}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative w-full h-[380px] rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 bg-slate-950/40 flex flex-col items-center justify-center p-6 text-center transition-all flex-1">
                        <div className="p-3 rounded-full bg-slate-900 border border-white/5 text-slate-400 mb-3.5">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-white mb-1">
                          {isEn ? "No Image Uploaded" : "업로드된 실물 사진이 없습니다"}
                        </p>
                        <p className="text-[10.5px] text-slate-500 leading-normal max-w-xs mb-4">
                          {isEn 
                            ? "As a Master/Admin, you can upload, replace or delete high-resolution product photos." 
                            : "최고 관리자 및 마스터 직권으로 본 제품군의 실물 전면 사진을 등록할 수 있습니다."}
                        </p>
                        <label className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-350 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md shadow-cyan-400/15 active:scale-95">
                          {isEn ? "Select Photo" : "사진 선택 및 업로드"}
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(0, e)} 
                          />
                        </label>
                      </div>
                    )
                  ) : (
                    /* Elegant 4-Panel vector diagrams */
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {/* Panel 1 (Top Left): Pouch Layered Cell Structure */}
                      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1.5 right-1.5 text-[7px] font-mono px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                          PANEL_01
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 block font-bold">POUCH_STRUCTURE</span>
                          <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                            {isEn ? "Pouch Layered Cell Structure" : "파우치형 적층 셀 구조"}
                          </h4>
                        </div>
                        
                        <div className="my-2 flex items-center justify-center">
                          <svg viewBox="0 0 160 120" className="w-full h-24 drop-shadow-[0_0_8px_rgba(34,211,238,0.12)]">
                            <g transform="translate(10, 10)">
                              <rect x="15" y="0" width="8" height="15" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                              <text x="17.5" y="8" fontSize="6" fontWeight="extrabold" fill="#475569" fontFamily="monospace">+</text>
                              
                              <rect x="5" y="15" width="28" height="40" rx="1.5" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                              <rect x="9" y="15" width="20" height="40" fill="#0284c7" fillOpacity="0.8" />
                              <rect x="13" y="15" width="12" height="40" fill="#0c4a6e" />
                              
                              <line x1="3" y1="35" x2="9" y2="35" stroke="#22d3ee" strokeWidth="0.5" />
                              <circle cx="9" cy="35" r="1" fill="#22d3ee" />
                              <text x="0" y="37" fontSize="5" fill="#22d3ee" fontFamily="monospace" fontWeight="bold">1</text>

                              <line x1="14" y1="45" x2="14" y2="60" stroke="#22d3ee" strokeWidth="0.5" />
                              <circle cx="14" cy="45" r="1" fill="#22d3ee" />
                              <text x="12" y="66" fontSize="5" fill="#22d3ee" fontFamily="monospace" fontWeight="bold">2</text>

                              <line x1="25" y1="38" x2="31" y2="38" stroke="#22d3ee" strokeWidth="0.5" />
                              <circle cx="25" cy="38" r="1" fill="#22d3ee" />
                              <text x="33" y="40" fontSize="5" fill="#22d3ee" fontFamily="monospace" fontWeight="bold">3</text>
                            </g>

                            <g transform="translate(75, 10)">
                              <path d="M 30 0 L 40 5 L 45 15 L 35 15 Z" fill="#94a3b8" />
                              <text x="37" y="12" fontSize="6" fontWeight="extrabold" fill="#0f172a" fontFamily="monospace">-</text>

                              <path d="M 15 15 L 60 15 L 60 55 A 5 5 0 0 1 55 60 L 10 60 L 10 20 Z" fill="#1d4ed8" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
                              <g opacity="0.9">
                                <line x1="20" y1="20" x2="20" y2="55" stroke="#e2e8f0" strokeWidth="1" />
                                <line x1="24" y1="20" x2="24" y2="55" stroke="#0284c7" strokeWidth="1.5" />
                                <line x1="28" y1="20" x2="28" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="32" y1="20" x2="32" y2="55" stroke="#0c4a6e" strokeWidth="1.5" />
                                <line x1="36" y1="20" x2="36" y2="55" stroke="#e2e8f0" strokeWidth="1" />
                                <line x1="40" y1="20" x2="40" y2="55" stroke="#0284c7" strokeWidth="1.5" />
                                <line x1="44" y1="20" x2="44" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                              </g>
                            </g>
                          </svg>
                        </div>

                        <span className="text-[8.5px] text-slate-500 leading-relaxed text-left block">
                          {isEn ? "Stacked flat cells maximize physical ion double-layer adsorption." : "적층 및 고온 압밀 밀봉 구조로 내부 이온 접촉 공간을 획기적으로 연장함."}
                        </span>
                      </div>

                      {/* Panel 2 (Top Right): Smart Grid Connection Map */}
                      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1.5 right-1.5 text-[7px] font-mono px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                          PANEL_02
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 block font-bold">SMART_GRID_SYSTEM</span>
                          <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                            {isEn ? "Smart Grid Integration Map" : "스마트 그리드 연동 시스템"}
                          </h4>
                        </div>

                        <div className="my-2 flex items-center justify-center">
                          <svg viewBox="0 0 160 120" className="w-full h-24">
                            <g transform="translate(80, 60)">
                              <rect x="-12" y="-12" width="24" height="24" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
                              <rect x="-8" y="-8" width="16" height="16" rx="1.5" fill="#0c4a6e" />
                              <path d="M-3 -4 L3 -4 L0 -1 L3 -1 L-3 4 L-1 1 L-3 1 Z" fill="#22d3ee" className="animate-pulse" />
                              <text x="-9" y="19" fontSize="5.5" fontWeight="bold" fill="#22d3ee" fontFamily="sans-serif">HSC</text>
                            </g>

                            <g transform="translate(25, 25)">
                              <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                              <path d="M-4 0 A4 4 0 1 1 4 0 A4 4 0 1 1 -4 0 M0 -5 L0 5 M-5 0 L5 0" stroke="#f59e0b" strokeWidth="0.75" />
                            </g>
                            <g transform="translate(80, 20)">
                              <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                              <rect x="-4" y="-5" width="8" height="10" rx="1" fill="#a855f7" />
                            </g>
                            <g transform="translate(135, 25)">
                              <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                              <path d="M0 -5 L0 5 M-4 -2 L4 2" stroke="#38bdf8" strokeWidth="0.75" />
                            </g>
                            <g transform="translate(30, 95)">
                              <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                              <polygon points="0,-4 5,1 -5,1" fill="#818cf8" />
                            </g>
                            <g transform="translate(130, 95)">
                              <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                              <rect x="-5" y="-3" width="10" height="6" rx="1" fill="#10b981" />
                            </g>

                            <path d="M 25 25 L 68 48" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                            <path d="M 80 20 L 80 48" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                            <path d="M 135 25 L 92 48" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                            <path d="M 30 95 L 68 72" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                            <path d="M 130 95 L 92 72" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                          </svg>
                        </div>

                        <span className="text-[8.5px] text-slate-500 leading-relaxed text-left block">
                          {isEn ? "Interlinks solar, wind generators, EV cars, and domestic loads securely." : "신재생 태양광·풍력, 전기동력 스마트 모빌리티 및 주택 그리드에 평형 충방전 결합."}
                        </span>
                      </div>

                      {/* Panel 3 (Bottom Left): Cylindrical Cell Structure */}
                      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1.5 right-1.5 text-[7px] font-mono px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                          PANEL_03
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 block font-bold">CYLINDER_ANATOMY</span>
                          <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                            {isEn ? "Cylindrical Cell Structure" : "실린더형 셀 구조"}
                          </h4>
                        </div>

                        <div className="my-2 flex items-center justify-center">
                          <svg viewBox="0 0 160 125" className="w-full h-26">
                            <g transform="translate(38, 25)">
                              <path d="M 10 20 L 10 70 A 15 5 0 0 0 40 70 L 40 20 Z" fill="url(#metal-wall-carousel)" stroke="#475569" strokeWidth="0.5" />
                              <path d="M 15 15 L 35 15 L 35 20 L 15 20 Z" fill="#64748b" />
                              <rect x="22" y="7" width="6" height="8" rx="1" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
                              <ellipse cx="25" cy="7" rx="3" ry="1.5" fill="#e2e8f0" />

                              <path d="M 13 25 L 13 65 A 12 4 0 0 0 37 65 L 37 25 Z" fill="url(#wound-core-carousel)" />
                              <line x1="16" y1="28" x2="16" y2="65" stroke="#000000" strokeWidth="0.75" />
                              <line x1="20" y1="28" x2="20" y2="65" stroke="#22d3ee" strokeWidth="0.75" />
                              <line x1="24" y1="28" x2="24" y2="65" stroke="#f8fafc" strokeWidth="0.75" />
                              <line x1="28" y1="28" x2="28" y2="65" stroke="#0284c7" strokeWidth="0.75" />
                              <line x1="32" y1="28" x2="32" y2="65" stroke="#000000" strokeWidth="0.75" />
                            </g>

                            <g fontSize="5.5" fontFamily="monospace" fontWeight="bold" fill="#22d3ee">
                              <line x1="63" y1="32" x2="88" y2="32" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                              <text x="91" y="34">Terminal</text>

                              <line x1="75" y1="75" x2="88" y2="75" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                              <circle cx="75" cy="75" r="0.75" fill="#22d3ee" />
                              <text x="91" y="77">Aluminum can</text>

                              <line x1="56" y1="50" x2="88" y2="50" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                              <circle cx="56" cy="50" r="0.75" fill="#22d3ee" />
                              <text x="91" y="49" fill="#22d3ee" fontSize="5" fontWeight="black">Positive electrode</text>
                              <text x="91" y="54" fill="#cbd5e1" fontSize="4.5">- Carbon material</text>
                              <text x="91" y="58" fill="#cbd5e1" fontSize="4.5">- Aluminum collector</text>

                              <line x1="51" y1="92" x2="88" y2="92" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                              <circle cx="51" cy="92" r="0.75" fill="#22d3ee" />
                              <text x="91" y="91" fill="#22d3ee" fontSize="5" fontWeight="black">Negative electrode</text>
                              <text x="91" y="96" fill="#cbd5e1" fontSize="4.5">- Carbon material</text>
                              <text x="91" y="100" fill="#cbd5e1" fontSize="4.5">- Aluminum collector</text>

                              <line x1="62" y1="112" x2="88" y2="112" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                              <circle cx="62" cy="112" r="0.75" fill="#22d3ee" />
                              <text x="91" y="114">Separator</text>
                            </g>

                            <defs>
                              <linearGradient id="metal-wall-carousel" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#1e293b" />
                                <stop offset="30%" stopColor="#475569" />
                                <stop offset="70%" stopColor="#334155" />
                                <stop offset="100%" stopColor="#0f172a" />
                              </linearGradient>
                              <linearGradient id="wound-core-carousel" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0f172a" />
                                <stop offset="50%" stopColor="#1e293b" />
                                <stop offset="100%" stopColor="#0f172a" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>

                        <span className="text-[8.5px] text-slate-500 leading-relaxed text-left block">
                          {isEn ? "Internal roll anatomy of positive/negative carbon terminals & separator." : "단자, 알루미늄 외장 캔, 카본 활성물질 및 집전체 양음극 극판, 분리막의 내부 조권."}
                        </span>
                      </div>

                      {/* Panel 4 (Bottom Right): Advanced Carbon/Graphene Material */}
                      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1.5 right-1.5 text-[7px] font-mono px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                          PANEL_04
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 block font-bold">ACTIVE_CARBON_MATERIAL</span>
                          <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                            {isEn ? "Advanced Carbon Powder" : "탄소 신소재 활성 물질 분말"}
                          </h4>
                        </div>

                        <div className="my-2 flex items-center justify-center relative h-24">
                          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none" />
                          <div className="relative w-32 h-20 flex items-end justify-center">
                            <div className="absolute bottom-0 w-28 h-3.5 bg-black/50 blur-md rounded-full" />
                            <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                              <path d="M 5 55 Q 35 45 50 10 Q 65 45 95 55 Z" fill="url(#powder-gradient-carousel)" />
                              <g fill="#475569" opacity="0.45">
                                <circle cx="50" cy="12" r="0.6" />
                                <circle cx="45" cy="22" r="0.7" />
                                <circle cx="55" cy="28" r="0.5" />
                                <circle cx="35" cy="38" r="0.8" />
                                <circle cx="65" cy="35" r="0.6" />
                                <circle cx="28" cy="45" r="0.7" />
                                <circle cx="72" cy="48" r="0.5" />
                                <circle cx="50" cy="35" r="0.7" fill="#94a3b8" />
                                <circle cx="48" cy="48" r="0.8" fill="#cbd5e1" />
                              </g>
                              <circle cx="50" cy="15" r="1.2" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '3s' }} />
                              <circle cx="38" cy="33" r="1" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '4.5s' }} />
                              <circle cx="62" cy="41" r="1" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '2.5s' }} />

                              <defs>
                                <linearGradient id="powder-gradient-carousel" x1="0" y1="1" x2="0" y2="0">
                                  <stop offset="0%" stopColor="#020617" />
                                  <stop offset="35%" stopColor="#0f172a" />
                                  <stop offset="70%" stopColor="#1e293b" />
                                  <stop offset="90%" stopColor="#334155" />
                                  <stop offset="100%" stopColor="#1e293b" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>

                        <span className="text-[8.5px] text-slate-500 leading-relaxed text-left block">
                          {isEn ? "Ultra-pure graphite/graphene base particles optimized for electrostatic adsorption." : "정밀 분자 크기로 조제되어 물리적 전하 이온을 극대 흡착하는 고유성 그래핀 탄소 분말."}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Standard layout for other active indexes
              <>
                {/* LEFT AREA: Spotlight specifications and product visualization */}
                <div className="lg:col-span-7 flex flex-col justify-between border border-white/5 bg-slate-900/15 backdrop-blur-xl p-4 sm:p-6 md:p-10 rounded-3xl space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-400 font-mono">
                      <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-3 py-1.5 rounded-md">
                        0{activeIndex + 1} / {isEn ? 'CORE PORTFOLIO' : '핵심 포트폴리오'}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 font-bold">
                        <Sparkle className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                        IMPACT {service.impactScore}%
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight">
                      {serviceTitle}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-[15px] font-bold text-cyan-400 leading-relaxed max-w-2xl">
                      {serviceSubtitle}
                    </p>

                    <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl pt-1">
                      {serviceDesc}
                    </p>
                  </div>

                  {/* High-Fidelity Image Container / Interactive System Diagram (for HGE3D00 Generator or other beautiful technology assets) */}
                  <div className="pt-4 flex flex-col">
                    {activeIndex === 5 && (
                      <div className="flex items-center justify-between p-1 bg-slate-950/80 border border-white/5 rounded-xl mb-3.5 w-full">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setViewMode('diagram')}
                            className={`px-3 py-1.5 text-[10.5px] font-mono font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                              viewMode === 'diagram'
                                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            ⚡ {isEn ? 'CLOSED-LOOP RECYCLE SYSTEM' : '자가발전 무충전 순환계통'}
                          </button>
                          <button
                            onClick={() => setViewMode('image')}
                            className={`px-3 py-1.5 text-[10.5px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                              viewMode === 'image'
                                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            ⚙️ {isEn ? 'DURABLE DEVICE DESIGN' : '실물 전면 외형'}
                          </button>
                        </div>

                        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-[9px] font-mono font-bold text-cyan-400">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                          SIM_MODE: ACTIVE
                        </div>
                      </div>
                    )}

                    {service.imageUrl && (viewMode === 'image' || activeIndex !== 5) ? (
                      <div className="space-y-4">
                        <h5 className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-500" />
                          {t('carousel.productView', 'PRODUCTION HIGH-FIDELITY VIEW', '실물 고정밀 모델 렌더링')}
                        </h5>
                        <div className="relative w-full h-[220px] md:h-[290px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-slate-950/80 to-slate-900 flex items-center justify-center p-4">
                          {/* Sub-atmospheric subtle glow */}
                          <div className="absolute inset-0 bg-radial-at-c from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
                          
                          <img 
                            src={service.imageUrl} 
                            alt={serviceTitle}
                            className="w-full h-full object-contain filter brightness-105 contrast-105 hover:scale-[1.03] transition-transform duration-750"
                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Specs Badge */}
                          <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-slate-950/90 border border-cyan-500/30 text-[9px] font-mono font-bold text-cyan-400 tracking-wider">
                            DOOHYUN HGE3D00 ESS/GEN ACTIVE
                          </div>
                        </div>
                      </div>
                    ) : activeIndex === 5 && viewMode === 'diagram' ? (
                      /* 🌟 CYBERPUNK DYNAMIC CLOSED LOOP CIRCULATION SYSTEM DIAGRAM */
                      <div className="relative w-full rounded-2xl border border-cyan-500/35 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-900/40 p-4 shadow-2xl shadow-cyan-950/40 space-y-4">
                        {/* Header Box inside diagram */}
                        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-950/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded">
                                ESS CIRCULATION SYSTEM
                              </span>
                              <span className="text-[9px] font-mono font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-400/40 px-2 py-0.5 rounded">
                                20,000+ CYCLES
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-amber-200 tracking-tight">
                              {isEn ? "Chargeless Self-Generator ESS Device Loop" : "무충전 자가발전기 ESS장치 순환시스템"}
                            </h4>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-normal max-w-sm md:text-right font-medium">
                            {isEn 
                              ? "Fires up charge-discharge cycles over 20,000 times based on initial energy. Produces stable electricity for over 10+ years without any external charge feeds."
                              : "배터리 생산 시 최초 충전된 전기 용량만을 바탕으로 20,000회 이상 무방전 충·방전 리사이클 원리 가동. 10년 이상 충전 없이 전기를 지속 환류 생산합니다."
                            }
                          </p>
                        </div>

                        {/* Central Schematic Flow Map */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-stretch relative">
                          
                          {/* Vertical line indicator left (represents Chargerates in image) */}
                          <div className="col-span-full md:col-span-3 flex flex-row md:flex-col items-center justify-between p-3 md:p-2 rounded-xl bg-slate-950/60 border border-white/5 gap-3 md:space-y-2">
                            <span className="text-[8px] font-mono font-bold text-slate-500 block leading-none">Chargerate</span>
                            
                            <div className="flex flex-row md:flex-col gap-1 w-full md:w-auto items-center justify-center flex-wrap">
                              {[100, 80, 60, 40, 20].map((rate) => {
                                const isCurrentRate = (rate === 100 && activeStep === 0) || 
                                                     (rate === 80 && activeStep === 3) ||
                                                     (rate === 60 && activeStep === 1) ||
                                                     (rate === 40 && activeStep === 2) ||
                                                     (rate === 20);
                                
                                const col = rate === 100 ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30 font-black' : 
                                            rate === 80 ? 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' : 
                                            rate === 60 ? 'text-amber-400 bg-amber-950/40 border-amber-500/30' : 
                                            rate === 40 ? 'text-orange-400 bg-orange-950/40 border-orange-500/30' : 
                                            'text-red-400 bg-red-950/40 border-red-500/30';
                                return (
                                  <div 
                                    key={rate} 
                                    className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border transition-all duration-300 flex items-center gap-1 w-auto md:w-full justify-center ${
                                      isCurrentRate ? `${col} scale-105 shadow-md` : 'text-slate-600 bg-transparent border-transparent'
                                    }`}
                                  >
                                    {isCurrentRate && <span className="w-1 h-1 rounded-full bg-current animate-pulse flex-shrink-0" />}
                                    {rate}%
                                  </div>
                                );
                              })}
                            </div>
                            
                            <span className="text-[8px] font-mono text-cyan-400 font-extrabold uppercase leading-none block">RECYCLE</span>
                          </div>

                          {/* Main Node Diagram Block */}
                          <div className="col-span-full md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                            {/* Live active flowchart connections SVGs underlaid */}
                            <div className="absolute inset-0 pointer-events-none z-0">
                              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Loop clockwise paths */}
                                <path d="M 25,25 L 75,25 L 75,75 L 25,75 Z" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.5" />
                                {/* Moving active electrons depending on active step */}
                                <circle cx={activeStep === 0 ? 25 : activeStep === 1 ? 75 : activeStep === 2 ? 75 : 25} 
                                        cy={activeStep === 0 ? 25 : activeStep === 1 ? 25 : activeStep === 2 ? 75 : 75} 
                                        r="3" fill="#22d3ee" className="animate-pulse shadow-md shadow-cyan-400" />
                              </svg>
                            </div>

                            {/* Node 1: Top-Left - ESS Storage Device */}
                            <button 
                              onClick={() => { setActiveStep(0); setIsAutoplay(false); }}
                              className={`p-2 rounded-xl border transition-all text-left z-10 relative cursor-pointer ${
                                activeStep === 0 
                                  ? 'bg-cyan-950/30 border-cyan-400 shadow-lg shadow-cyan-400/15' 
                                  : 'bg-slate-950/70 border-white/5 hover:border-white/15'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[8px] font-mono font-bold text-cyan-300">STEP 01</span>
                                <span className="text-[7px] uppercase font-mono px-1 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/20 text-cyan-400 font-bold">ESS STORAGE</span>
                              </div>
                              <h5 className="text-[10px] font-black text-white leading-tight">ESS Storage Device</h5>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-base font-extrabold text-cyan-400 font-mono tracking-tight">1 kW</span>
                                <span className="text-[8px] font-mono text-slate-500">INIT</span>
                              </div>
                            </button>

                            {/* Node 2: Top-Right - X3 Amplification */}
                            <button 
                              onClick={() => { setActiveStep(1); setIsAutoplay(false); }}
                              className={`p-2 rounded-xl border transition-all text-left z-10 relative cursor-pointer ${
                                activeStep === 1 
                                  ? 'bg-blue-950/30 border-blue-400 shadow-lg shadow-blue-400/15' 
                                  : 'bg-slate-950/70 border-white/5 hover:border-white/15'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[8px] font-mono font-bold text-blue-300">STEP 02</span>
                                <span className="text-[7px] uppercase font-mono px-1 py-0.5 rounded bg-blue-950/80 border border-blue-400/20 text-blue-400 font-bold">X3 AMP</span>
                              </div>
                              <h5 className="text-[10px] font-black text-white leading-tight">{isEn ? "3x Power Amplifier" : "X3배 증폭기"}</h5>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-base font-extrabold text-blue-400 font-mono tracking-tight">3 kW</span>
                                <span className="text-[8px] font-mono text-amber-400 font-bold">300% Boost!</span>
                              </div>
                            </button>

                            {/* Node 3: Bottom-Right - Splitted Output Load */}
                            <button 
                              onClick={() => { setActiveStep(2); setIsAutoplay(false); }}
                              className={`p-2 rounded-xl border transition-all text-left z-10 relative cursor-pointer ${
                                activeStep === 2 
                                  ? 'bg-emerald-950/30 border-emerald-400 shadow-lg shadow-emerald-400/15' 
                                  : 'bg-slate-950/70 border-white/5 hover:border-white/15'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[8px] font-mono font-bold text-emerald-300">STEP 03</span>
                                <span className="text-[7px] uppercase font-mono px-1 py-0.5 rounded bg-emerald-950/80 border border-emerald-400/20 text-emerald-400 font-bold">OUTPUT SPLIT</span>
                              </div>
                              <h5 className="text-[10px] font-black text-white leading-tight">{isEn ? "Output Load & Rec." : "출력 분산 (사용/충전)"}</h5>
                              <div className="flex flex-col mt-0.5 space-y-0.5 text-[8px] sm:text-[9px]">
                                <div className="flex justify-between text-slate-200">
                                  <span>{isEn ? "Load (Use):" : "사용:"}</span>
                                  <span className="font-bold text-white font-mono">2 kW</span>
                                </div>
                                <div className="flex justify-between text-cyan-400 font-medium">
                                  <span>{isEn ? "Recovery (Charge):" : "충전:"}</span>
                                  <span className="font-bold font-mono text-cyan-300">1 kW</span>
                                </div>
                              </div>
                            </button>

                            {/* Node 4: Bottom-Left - Self-Generating Return Loop */}
                            <button 
                              onClick={() => { setActiveStep(3); setIsAutoplay(false); }}
                              className={`p-2 rounded-xl border transition-all text-left z-10 relative cursor-pointer ${
                                activeStep === 3 
                                  ? 'bg-amber-950/30 border-amber-400 shadow-lg shadow-amber-400/15' 
                                  : 'bg-slate-950/70 border-white/5 hover:border-white/15'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[8px] font-mono font-bold text-amber-300">STEP 04</span>
                                <span className="text-[7px] uppercase font-mono px-1 py-0.5 rounded bg-amber-950/80 border border-amber-400/20 text-amber-400 font-bold">FEEDBACK</span>
                              </div>
                              <h5 className="text-[10px] font-black text-white leading-tight">{isEn ? "Self-Generating Device" : "자가발전 환류 원용"}</h5>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-base font-extrabold text-amber-400 font-mono tracking-tight">1 kW</span>
                                <span className="text-[8px] font-mono text-emerald-400 font-bold">+80% Return!</span>
                              </div>
                            </button>
                          </div>

                        </div>

                        {/* Step Specific Explanation Box */}
                        <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/90 text-left relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />
                          
                          <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
                            <div className="flex items-center gap-1.5">
                              <div className="p-1 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                                <Activity className="w-3 h-3" />
                              </div>
                              <span className="text-[9px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">
                                {activeStep === 0 ? "01 / BASE ENERGY ACCUMULATION" : 
                                 activeStep === 1 ? "02 / FLUID VOLTAGE AMPLICATION" :
                                 activeStep === 2 ? "03 / LOAD SPLIT & VOLTAIC DEMARCATION" :
                                 "04 / SELF-GENERATION CYCLE RETURNING"}
                              </span>
                            </div>

                            {/* Autoplay toggler button */}
                            <button 
                              onClick={() => setIsAutoplay(!isAutoplay)}
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[8px] font-mono font-bold text-slate-400 hover:text-white cursor-pointer transition-colors border-0"
                            >
                              {isAutoplay ? <Pause className="w-2 h-2 text-cyan-400 animate-pulse" /> : <Play className="w-2 h-2 text-slate-500" />}
                              {isAutoplay ? 'AUTO' : 'MANUAL'}
                            </button>
                          </div>

                          <div className="space-y-1">
                            <h5 className="text-[10px] font-extrabold text-white text-left">
                              {activeStep === 0 ? (isEn ? "ESS STORAGE RESOURCE (1kW)" : "기초 ESS 전력 적치 계보 (1kW)") :
                               activeStep === 1 ? (isEn ? "3X MAGNETO-AMP SYSTEM (3kW Boost)" : "3배 전자기식 증폭 가속 모듈 (3kW 증폭)") :
                               activeStep === 2 ? (isEn ? "INTELLIGENT SPLIT & LOGISTICS (2kW / 1kW)" : "실용 전력 분배 및 회수 기작 (사용 2kW / 충전 1kW)") :
                               (isEn ? "SELF-GENERATION STABILITY CORE (+80% Return)" : "자가 발전 기어 및 ESS 환원 피드백 (+80% 충전)")}
                            </h5>
                            <p className="text-[10px] text-slate-300 leading-relaxed text-left font-normal">
                              {activeStep === 0 ? (
                                isEn ? "Stores initial 1kW default pre-loaded energy from battery manufacture. Receives circular feedback charges in a closed-loop system to run over 20,000 times." :
                                "배터리 생산 시 최초 충전된 1kW 전하량만을 가지고 기동의 방아쇠를 당깁니다. 하선 순환계통에서 피드백 리턴되는 1kW 전해질 전하를 계속 수용하여 20,000회 오퍼레이션 충방전을 일관 수렴합니다."
                              ) : activeStep === 1 ? (
                                isEn ? "Amplifies the 1kW source input from ESS Storage by 300% via structural series windings, elevating load power output to a steady 3kW." :
                                "ESS 저장 장치에서 도출된 1kW 입력전력을 X3배 전압 기어 증폭 구조를 통과시켜 동기 300%인 3kW 부하 전력량을 영속적으로 형성 및 출력해 냅니다."
                              ) : activeStep === 2 ? (
                                isEn ? "Safely routes 2kW to 상용 loads (e.g. electric vehicles, building grids) while diverting remaining 1kW cleanly to the Recovery Storage node." :
                                "가동된 3kW 중 실제 2kW의 전력량은 스마트 빌딩이나 전기차 급속 인프라 사용 부하로 완전 전송 소비하며, 잔류 1kW는 회수 저장 장치(Recovery Device) 환류로 정렬 제어해 공급합니다."
                              ) : (
                                isEn ? "Utilizes 1kW recovery feed to trigger the closed self-generating device, pushing +80% state of charge back to the top ESS Storage node to sustain the cycle." :
                                "회수된 1kW 복구 소스를 자가발전 장치(Self-generating device) 기작에 투입, +80% 효율 상승 충전 피드백을 발생시켜 상부 ESS 저장 장치를 실시간 연속 충전 복원함으로 영구 순환합니다."
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : activeIndex === 6 ? (
                      /* Gorgeous mini eco blueprint specifically for Biochar System */
                      <div className="relative w-full p-4 sm:p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/25 to-slate-950/60 overflow-hidden flex flex-col justify-center min-h-[170px] shadow-lg shadow-amber-950/30">
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                        <div className="flex items-center gap-3.5 mb-2.5">
                          <div className="p-2.5 rounded-xl bg-amber-500/25 border border-amber-400/30 text-amber-300">
                            <Trees className="w-5 h-5 text-amber-400 animate-pulse" />
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-widest block">DECENTRALIZED ECO GREEN LOOP</span>
                            <span className="text-xs font-bold text-slate-200">{isEn ? 'Off-Grid Zero-Emissions Bio-Reactor' : '친환경 100% 무배출 온전한 자율 계통'}</span>
                          </div>
                        </div>
                        <p className="text-[11.5px] text-slate-300 font-sans leading-relaxed text-left font-normal border-l-2 border-amber-400/50 pl-3.5 my-2.5 bg-slate-950/40 p-2.5 rounded-r">
                          {isEn 
                            ? '※ Fully compatible with HGE3D00 2kW auxiliary power loops. Combines sub-atmospheric steam boilers and dual spherical reactor tanks to neutralize pathogens under 210°C hydrolytic heat.' 
                            : '※ 본 농공 상생 시스템은 HGE3D00의 2kW 정격 기어 모듈을 부착하여 210°C 가압 가수분해공정 및 자동 드라이어를 오프그리드로 작동, 멸균 바이오차 포대를 당일 양산 포장 배송합니다.'
                          }
                        </p>
                        <div className="mt-2 text-[9px] font-mono text-amber-400 font-bold flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                           {isEn ? "SCROLL DOWN FOR INTERACTIVE 8-STAGE WORKFLOW" : "아래로 스크롤하여 8단계 상호작용 흐름도를 체험하세요"}
                        </div>
                      </div>
                    ) : activeIndex === 2 ? (
                      /* Custom blueprint with scroll hint for E-Bicycle (Supercapacitor & Self-Charging) */
                      <div className="relative w-full p-4 sm:p-6 rounded-2xl border border-purple-500/35 bg-gradient-to-r from-purple-950/25 to-slate-950/60 overflow-hidden flex flex-col justify-center min-h-[140px] shadow-lg shadow-purple-950/30">
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                        <div className="flex items-center gap-3.5 mb-2.5">
                          <div className="p-2.5 rounded-xl bg-purple-500/25 border border-purple-400/30 text-purple-300">
                            <Activity className="w-5 h-5 animate-pulse" />
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-widest block">E-BICYCLE SUPER_CAPACITOR BRIEFING</span>
                            <span className="text-xs font-bold text-slate-200">{isEn ? 'Supercapacitor & Self-Charging E-Bike Showcase Ready' : '자체충전 전기자전거 및 슈퍼커패시터 분석자료 탑재'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-purple-200/90 font-sans leading-relaxed text-left font-medium mb-3">
                          {isEn 
                            ? '※ Includes Graphene physical core mechanism, 5 key performance comparisons, and the live 1:1 self-charging e-bike loop simulator.' 
                            : '※ 그래핀 기반 극전하 물리 흡착 원리, 리튬 대비 5대 비교 지표, 실시간 1:1 자체충전 전기자전거 시뮬레이터와 모듈 스펙이 제공됩니다.'
                          }
                        </p>
                        <div className="text-[9px] font-mono text-purple-400 font-bold flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                           {isEn ? "SCROLL DOWN TO VIEW THE DETAILED SCROLLABLE REPORT" : "아래로 스크롤하여 상세 스크롤 보고서 및 시뮬레이션을 확인하세요"}
                        </div>
                      </div>
                    ) : activeIndex === 3 ? (
                      /* Custom blueprint with scroll hint for E-Motorcycle */
                      <div className="relative w-full p-4 sm:p-6 rounded-2xl border border-cyan-500/35 bg-gradient-to-r from-cyan-950/25 to-slate-950/60 overflow-hidden flex flex-col justify-center min-h-[140px] shadow-lg shadow-cyan-950/30">
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                        <div className="flex items-center gap-3.5 mb-2.5">
                          <div className="p-2.5 rounded-xl bg-cyan-500/25 border border-cyan-400/30 text-cyan-300">
                            <Activity className="w-5 h-5 animate-pulse" />
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest block">HYBRID MOTO TECHNICAL BRIEFING</span>
                            <span className="text-xs font-bold text-slate-200">{isEn ? 'Hybrid Motorcycle Advanced Showcase Ready' : '하이브리드 오토바이 정밀 구동 분석자료 탑재'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-cyan-200/90 font-sans leading-relaxed text-left font-medium mb-3">
                          {isEn 
                            ? '※ Includes driving simulation, cost savings calculator, technical spec comparisons, and the development timeline.' 
                            : '※ 주행 연비 시뮬레이션, 유류비/전기요금 절감 계산기, 동급 가솔린/전기 대비 특성 비교표 및 연도별 개발 일정표가 완벽 구비되어 있습니다.'
                          }
                        </p>
                        <div className="text-[9px] font-mono text-cyan-400 font-bold flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                           {isEn ? "SCROLL DOWN TO VIEW THE DETAILED SCROLLABLE REPORT" : "아래로 스크롤하여 상세 스크롤 보고서 및 시뮬레이션을 확인하세요"}
                        </div>
                      </div>
                    ) : (
                      // Elegant scientific tech blueprint decoration for non-image services
                      <div className="relative w-full p-4 sm:p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/25 to-slate-950/60 overflow-hidden flex flex-col justify-center min-h-[140px] shadow-lg shadow-cyan-950/30">
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                        <div className="flex items-center gap-3.5 mb-2.5">
                          <div className="p-2.5 rounded-xl bg-cyan-500/25 border border-cyan-400/30 text-cyan-300">
                            <Activity className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest block">US CAS SAFETY COMPLIANCE</span>
                            <span className="text-xs font-bold text-slate-200">{isEn ? 'US CAS Certified Materials Integrated' : '미국 CAS 공인 규격 신소재 정밀 검증필'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-cyan-200/90 font-sans leading-relaxed text-left font-medium">
                          {isEn 
                            ? '※ Certified under standard US CAS chemical registry system protocols and authorized under corporate intelligence sharing covenants. Guarantees 100% spark-free and terminal thermal stability.' 
                            : '※ 본 솔루션은 최고 정합성의 미국 화학회 CAS 정식 등재 SAM 신소재를 수평 함침 탑재하여, 구동 중 물리 스파크 및 화재 기작 한계 도포 안전 등급을 완수 및 보증합니다.'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT AREA: Expanded business benefits and specific initiatory parameters */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  
                  {/* Expected benefits Box */}
                  <div className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-white/5 text-left space-y-4.5 flex-1 select-text">
                    <h4 className="text-xs md:text-sm font-semibold text-white tracking-widest uppercase flex items-center gap-2.5 font-mono">
                      <span className="w-1.5 h-3.5 bg-cyan-400 rounded-full" />
                      {t('carousel.benefits', 'EXPECTED BUSINESS BENEFITS', '예상 핵심 경영 실리')}
                    </h4>
                    
                    <ul className="space-y-3.5">
                      {service.benefits.map((benefit, bIdx) => {
                        const benefitText = isEn && service.benefitsEn ? service.benefitsEn[bIdx] : benefit;
                        return (
                          <li key={bIdx} className="flex items-start gap-3.5 text-xs md:text-[13px] leading-relaxed text-slate-300">
                            <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <span className="font-medium">{benefitText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Core Feature specifications Box */}
                  <div className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-white/5 text-left space-y-4.5 flex-1 select-text">
                    <h4 className="text-xs md:text-sm font-semibold text-white tracking-widest uppercase flex items-center gap-2.5 font-mono">
                      <span className="w-1.5 h-3.5 bg-purple-500 rounded-full" />
                      {isEn ? 'CORE SYSTEM INITIATIVES' : '원천 기술 기능 사양'}
                    </h4>
                    
                    <ul className="space-y-3.5">
                      {service.features.map((feature, fIdx) => {
                        const featureText = isEn && service.featuresEn ? service.featuresEn[fIdx] : feature;
                        return (
                          <li key={fIdx} className="flex items-start gap-3.5 text-xs md:text-[13px] leading-relaxed text-slate-300">
                            <div className="w-5.5 h-5.5 mt-0.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold text-cyan-400">
                              0{fIdx + 1}
                            </div>
                            <span className="font-medium">{featureText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Integrated Call to Action Simulation Block */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/20 to-slate-900 border border-cyan-500/15 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
                    <div className="space-y-1">
                      <p className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                        SYSTEM ESTIMATION SIMULATOR
                      </p>
                      <p className="text-xs text-slate-400 leading-snug">
                        {t(
                          'carousel.suggest',
                          'Run instant simulation matching and diagnosis.',
                          '맞춤형 시뮬레이터를 통해 예상 전력 수율을 즉시 확인하세요.'
                        )}
                      </p>
                    </div>
                    <a
                      href="#simulator-section"
                      onClick={(e) => {
                        e.preventDefault();
                        const section = document.getElementById('simulator-section');
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-4.5 py-2 text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors duration-250 rounded-lg shadow-md shadow-cyan-400/20 active:scale-95 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <span>{t('carousel.suggestBtn', 'Match by Simulator', '시뮬레이터로 매칭')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </>
            )}

            {/* 🌟 PREMIUM APPLICATION COVER POSTER SHOWCASE: "아담韓" ADAMHAN */}
            {activeIndex === 5 && (
              <div className="col-span-full mt-12 md:mt-18 pt-10 md:pt-16 border-t border-white/10 select-text">
                
                {/* Showcase Header */}
                <div className="text-left mb-8 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-400/20 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    <Home className="w-3.5 h-3.5" />
                    APPLIED SHOWCASE CASE STUDY
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    {isEn ? "HGE3D00 Generator Applied Cases: ADAMHAN" : "HGE3D00 무충전 자가발전기 적용 사례: 아담韓"}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-3xl">
                    {isEn 
                      ? "Discover how the chargeless self-generator operates as an off-grid green energy supplier within isolated modular houses."
                      : "송배전망 연계가 극히 제한되는 산골 속, 산림 휴양지에 완벽한 스마트 자립 에너지 주거 체인을 수립한 한국형 모듈형 프리하브 프로젝트의 수렴 기록입니다."
                    }
                  </p>
                </div>

                {/* Cover/Poster Layout Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-10 rounded-3xl border border-white/5 bg-slate-950 p-4 sm:p-6 md:p-12 relative overflow-hidden shadow-2xl">
                  {/* Glowing neon aura backgrounds */}
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute right-10 bottom-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* LEFT COLUMN: Premium Traditional-Feeling Typography & Editorial Content Section */}
                  <div className="xl:col-span-6 flex flex-col justify-between space-y-8 text-left border-r border-white/5 pr-0 xl:pr-10">
                    <div className="space-y-6">
                      
                      {/* Serif Brand Title Cover Plate & Yellow-Highlighted Generator */}
                      <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-5 border-b border-white/5 font-sans">
                        <div className="space-y-2 font-sans flex-1">
                          <span className="text-xs md:text-sm font-medium text-slate-400 tracking-wider block">
                            {isEn ? "Cozy & Elegant Korean Second House" : "고상하고 담백하며 아름다움을 담은 한국형 세컨드 하우스"}
                          </span>
                          
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif font-sans">
                              “아담韓”
                            </h2>
                            <span className="text-2xl md:text-3xl font-extrabold text-slate-500 tracking-wider font-mono uppercase">
                              ADAMHAN
                            </span>
                          </div>

                          {/* Three Pillars bullet points with custom-designed visual bullets as squares */}
                          <div className="mt-4 pl-3.5 border-l border-white/20 flex flex-col gap-1.5 text-xs md:text-[13px] text-slate-300 font-medium">
                            <p className="flex items-start gap-2 leading-snug">
                              <span className="w-1.5 h-1.5 bg-yellow-400 mt-1.5 flex-shrink-0" />
                              <span>고상하고 담백하다</span>
                            </p>
                            <p className="flex items-start gap-2 leading-snug">
                              <span className="w-1.5 h-1.5 bg-yellow-400 mt-1.5 flex-shrink-0" />
                              <span>적당히 조그마하다</span>
                            </p>
                            <p className="flex items-start gap-2 leading-snug">
                              <span className="w-1.5 h-1.5 bg-yellow-400 mt-1.5 flex-shrink-0" />
                              <span>아름다움을 담은 한국형 세컨드 하우스</span>
                            </p>
                          </div>
                        </div>

                        {/* Yellow-pulsing highlighted generator box, replicating the user reference! */}
                        <div className="flex-shrink-0 w-32 md:w-36 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-md relative group self-center md:self-start">
                          <div className="absolute -inset-0.5 rounded-xl bg-yellow-400 opacity-80 blur-[2px] pointer-events-none animate-pulse" />
                          <div className="absolute inset-0 bg-slate-950 rounded-xl z-0" />
                          
                          <div className="relative z-10 text-center space-y-1.5 w-full">
                            <div className="relative w-full h-24 bg-slate-900/60 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
                              <img 
                                src={service.imageUrl} 
                                alt="HGE3D00 Portable Unit"
                                className="w-full h-full object-contain filter brightness-110 contrast-110"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="text-[9px] font-mono font-black text-yellow-400 block tracking-tight">HGE3D00 GENERATOR</span>
                          </div>
                        </div>
                      </div>

                      {/* Main philosophy quote */}
                      <div className="p-3.5 rounded-xl border border-white/5 bg-slate-900/10 text-center">
                        <p className="text-sm md:text-base font-bold text-cyan-300 font-serif leading-relaxed">
                          "모듈형 하우스에 한국의 미를 담다"
                        </p>
                      </div>

                      {/* Core concepts breakdown list */}
                      <div className="space-y-4">
                        <div className="flex gap-3.5 items-start">
                          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-serif font-black">
                            A
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-[13px] font-black text-white">
                              {isEn ? "Structural Design Using Alphabet 'A'" : "알파벳 'A'를 활용한 입체적 가제보 하우스 디자인"}
                            </h5>
                            <p className="text-xs text-slate-400 leading-relaxed font-normal">
                              {isEn
                                ? "Employs an A-frame geometry that distributes external loads evenly, balancing visual lightness and superb stability in forests."
                                : "한눈에 시선을 사로잡는 모던한 삼각 A자형 공용 구조 설계를 통해, 폭설·강풍 등 혹독한 노지 환경에서도 물리적인 처짐 및 비틀림 저항을 비약적으로 끌어 올렸습니다."
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3.5 items-start">
                          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-serif font-black">
                            담
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-[13px] font-black text-white">
                              {isEn ? "Containing Diversity using the concept of 'Dam'" : "'담다'의 '담(Dam)'을 활용한 다채로운 콘텐츠 및 수납 정렬"}
                            </h5>
                            <p className="text-xs text-slate-400 leading-relaxed font-normal">
                              {isEn
                                ? "Creates smart space dividing to contain custom living elements, ensuring every corner functions with maximum space efficiency."
                                : "전통 담백함에서 발현된 한편의 여백처럼, 한정된 소형 모듈 속에 주방, 욕실, 다이닝 공간을 동선 끊김 없이 유기적으로 적재하여 미니멀 라이프의 평온함을 극대화했습니다."
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3.5 items-start">
                          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-serif font-black">
                            한
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-[13px] font-black text-white">
                              {isEn ? "Heritage of Korean Modular House ('Han')" : "한국형 하우스의 오리진과 현대 공정의 교차 '한(韓)'"}
                            </h5>
                            <p className="text-xs text-slate-400 leading-relaxed font-normal">
                              {isEn
                                ? "Blends open traditional architecture airflows with high-tech materials, creating a serene environment nestled in nature."
                                : "한옥 고유의 채광 지향적 개방감(대청마루의 연장감)과 초안전 SAM 복합재 가문 공법 등 현대 프리하브 조립 테크놀로지를 전면 융합하여 독보적인 고유 미를 안식합니다."
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Integrated HGE3D00 Charger-Free Generator Synergy Box */}
                    <div className="p-4.5 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 to-slate-900 space-y-2 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-cyan-500/10 border border-cyan-400/25 text-cyan-400">
                          <Zap className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="text-xs font-mono font-black text-cyan-400 tracking-wider">
                          {isEn ? "CLOSED LOOP SYSTEM SYNERGY" : "HGE3D00 무충전 발전기 동기화 혜택"}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed font-medium">
                        {isEn
                          ? "Eliminates standard grid wiring burdens and civil construction bills. Generates constant 2kW load requirements in nature settings, establishing full off-grid living."
                          : "송전선로 전주를 박고 케이블을 원거리 매립해 오는 토목 한전 공입 예산을 100% 절감합니다. HGE3D00의 반영구 무충전 자가 순환 발전시스템을 지지 체인으로 활용, 자연 중심 한두가운데서도 난방, 취사, 인텔리전트 전원을 차단 없는 극강 상태의 에너지 자립 주거(Off-Grid)로 완벽히 유지해 냅니다."
                        }
                      </p>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Full Premium Real-Life Image Rendering */}
                  <div className="xl:col-span-6 flex flex-col relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl h-[520px] xl:h-auto min-h-[460px]">
                    <img 
                      src={adamhanCabinHouse} 
                      alt="“아담韓” ADAMHAN Korean Second House" 
                      className="w-full h-full object-cover object-center filter brightness-105 contrast-105 hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow inside image overlay bottom for a beautiful gallery look */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 text-left flex flex-col justify-end bg-gradient-to-t">
                      <div className="flex justify-between items-end gap-4">
                        <div className="space-y-1 font-sans">
                          <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-400/30 px-2 py-0.5 rounded">
                            REAL-LIFE APPLIED MODEL
                          </span>
                          <h4 className="text-sm font-black text-white tracking-tight">
                            아담韓 숲속형 세컨드 하우스 적용 전경
                          </h4>
                          <p className="text-[10.5px] text-slate-300 font-sans">
                            {isEn ? "Real-life application visualization in dense pine forests" : "울창한 적송림 험지에 실장 구축된 한국형 스칸디 부티크 휴양처"}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-white/5 text-[9px] font-mono text-slate-400 whitespace-nowrap">
                          <Trees className="w-3.5 h-3.5 text-emerald-400" />
                          PINE FOREST ECO
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🌊 CONCEPT SHOWCASE: "오션형 모듈형 하우스" (Ocean-type / Floating Modular Houses) */}
                <div className="mt-16 md:mt-24 pt-12 md:pt-18 border-t border-white/10 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.5)] animate-pulse" />
                  
                  {/* Concept Title */}
                  <div className="text-left mb-10 space-y-2 select-text">
                    <span className="text-[11px] font-mono font-black text-cyan-400 tracking-[0.25em] block uppercase">
                      {isEn ? "MODULAR WATERFRONT PREFAB CONCEPTS" : "APPLICATION EXTENSION CONCEPT"}
                    </span>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight font-sans">
                        Concept: {isEn ? "Ocean-type Modular Floating House" : "오션형 모듈형 하우스"}
                      </h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono animate-pulse">
                        OFF-GRID WATER LOOP
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 max-w-4xl leading-relaxed">
                      {isEn 
                        ? "Expanding HGE3D00 self-generators to floating water resorts, securing continuous heating, cooling, and water filtration energies on sea and rivers without land cables."
                        : "HGE3D00의 독립 순환 발전력을 활용하여 해변, 호수, 강변 등 송수전선로 인입 및 대지 토목조성이 도저히 불가능한 수변 구역에 독보적인 프리미엄 자립 영토를 수립합니다."
                      }
                    </p>
                  </div>

                  {/* Grid Composition of the Concept Art */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch select-text">
                    
                    {/* TOP LEFT: Miniature Resort Layout Concept */}
                    <div className="lg:col-span-6 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden flex flex-col justify-between group h-[300px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "01 / LAGOON RESORT LAYOUT MODEL" : "01 / 오션풀 격자 단지 계획 모형"}
                      </div>
                      <img 
                        src={marineFloatingResort} 
                        alt="Resort Layout Plan" 
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 text-left bg-gradient-to-t">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Marine Luxury Lagoon Plan" : "인공 해수풀 연계 수변 힐링 체인 체계"}
                        </p>
                      </div>
                    </div>

                    {/* TOP RIGHT: Floating Cabin Waterfront Units */}
                    <div className="lg:col-span-6 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden flex flex-col justify-between group h-[300px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "02 / WATERFRONT HARBOR ALIGNMENT" : "02 / 플로팅 수상 가옥 벨트 라인업"}
                      </div>
                      <img 
                        src={floatingGlassCabin} 
                        alt="Waterfront alignment" 
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 text-left bg-gradient-to-t">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Modular Shoreline Integration Layout" : "연안 정렬 기반의 다채로운 수면 모듈 거치"}
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM LEFT: Majestic Floating Cabin on Water */}
                    <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden group min-h-[340px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "03 / PREMIUM FLOATING CABIN DETAIL" : "03 / 연안 정합식 고효율 수중 가옥 전경"}
                      </div>
                      <img 
                        src={floatingVillasRow} 
                        alt="Advanced Floating Cabin" 
                        className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-6 text-left bg-gradient-to-t">
                        <p className="text-sm md:text-base font-black text-white leading-tight">
                          {isEn ? "Hydro-Shield Glass Pavilion" : "수면 거동 실시간 수렴 및 플로팅 안전 하우징"}
                        </p>
                        <p className="text-[11px] md:text-xs text-slate-300 mt-1.5 max-w-2xl font-sans leading-relaxed">
                          {isEn 
                            ? "Self-buoyant structural design matching river tide variances, delivering a stable luxury room and infinite ecological integration." 
                            : "실시간 수위 왜곡 극복 정밀 지지 시스템을 결합하여 태풍과 수량 거동 속에서도 안전하고 흔들림 없는 안락 생활을 구현합니다."
                          }
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM RIGHT: High-Art Editorial Explanatory Block */}
                    <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950 flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
                      {/* elegant ocean decor glow blur */}
                      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10 w-full">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-950/60 border border-cyan-500/25 text-[10px] font-mono text-cyan-400 font-bold rounded">
                          INSTALLATION VERSATILITY
                        </div>
                        
                        <h4 className="text-lg md:text-xl font-black text-white leading-tight font-sans">
                          {isEn ? "Infinite Geographic Freedom of Premium Living" : "모듈형 하우스의 극적인 공간영토 확장"}
                        </h4>

                        {/* Direct blockquote matching reference text precisely as requested */}
                        <div className="border-l-3 border-yellow-400 pl-4 py-1.5 space-y-2.5 bg-slate-900/40 rounded-r-lg p-3">
                          <p className="text-[13.5px] font-extrabold text-yellow-300 leading-normal font-sans">
                            "모듈형 하우스는 설치장소에 따라 해변이나 강가에 플로팅 방식으로 설치 가능"
                          </p>
                          <p className="text-[11.5px] text-slate-300 italic font-medium leading-relaxed font-sans">
                            "Modular houses can be installed in a floating manner on beaches or rivers depending on the installation location."
                          </p>
                        </div>

                        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans pt-1">
                          {isEn
                            ? "Unlike standard cabins requiring deep shoreline ground piling and heavy civil cable installation approvals, floating modules prevent coastline degradation. Ideal for eco-resorts."
                            : "일반 세컨드 하우스 구축 시 요구되는 하천 점용 및 파일 기초 토목 시공 부담이 전혀 없습니다. 수질 환경 영향이 영에 가깝도록 하수 및 에너지 순환을 100% 완전 오프그리드로 폐루프 고정 시킬 수 있습니다."
                          }
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3.5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-400/20 flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                        </div>
                        <div className="font-sans">
                          <span className="text-[9px] font-mono text-slate-500 block tracking-wider uppercase">CLEAN WATER SYNERGY</span>
                          <span className="text-xs font-black text-white">{isEn ? "Self-Powered Clean Loop Active" : "무충전 자가 순환식 수상 라이프"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 🏡 CONCEPT SHOWCASE: "농막형 쉼터 / 캠핑카 / 카라반" (Farm Cabin / Camping Car / Caravan) */}
                <div className="mt-16 md:mt-24 pt-12 md:pt-18 border-t border-white/10 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_12px_rgba(250,204,21,0.5)] animate-pulse" />
                  
                  {/* Concept Title */}
                  <div className="text-left mb-10 space-y-2 select-text">
                    <span className="text-[11px] font-mono font-black text-yellow-400 tracking-[0.25em] block uppercase">
                      {isEn ? "VERSATILE OFF-GRID APPLICATIONS" : "APPLICATION EXTENSION CONCEPT"}
                    </span>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight font-sans">
                        Concept: {isEn ? "Farm Cabin / Camping Car / Caravan" : "농막형 쉼터 / 캠핑카 / 카라반"}
                      </h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-yellow-450/10 border border-yellow-450/20 text-yellow-400 font-mono animate-pulse">
                        UNIVERSAL SELF-POWER
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 max-w-4xl leading-relaxed">
                      {isEn 
                        ? "Integrating self-generators with eco-living mobile units, ensuring off-grid energy stability in sub-dwellings and premium recreational vehicles."
                        : "HGE3D00의 독립 순환 전력을 활용하여, 계통 전력이 닿지 않는 농막형 휴양 가제보와 한계 오지 캠프 라이프를 완벽하게 자립화합니다."
                      }
                    </p>
                  </div>

                  {/* Grid Layout matching Section 1 exactly */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch select-text">
                    
                    {/* TOP LEFT: Modern Farm Cabin Interior Photo */}
                    <div className="lg:col-span-6 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden flex flex-col justify-between group h-[300px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "01 / DUPLEX CABIN LOFT DETAIL" : "01 / 스마트 다락형 농막 내부 전경"}
                      </div>
                      <img 
                        src={farmCabinInterior} 
                        alt="Farm Cabin Interior Loft" 
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 text-left bg-gradient-to-t">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Warm Wood Prefab Architecture" : "친환경 원목 다락 침실 설계"}
                        </p>
                      </div>
                    </div>

                    {/* TOP RIGHT: Luxury Caravan Photo */}
                    <div className="lg:col-span-6 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden flex flex-col justify-between group h-[300px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "02 / OFF-GRID MOBILE INTEGRATION" : "02 / 충전 없는 프리미엄 카라반 모델"}
                      </div>
                      <img 
                        src={luxuryCaravanCamper} 
                        alt="Luxury Caravan Camper" 
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 text-left bg-gradient-to-t">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Mobile Grid & Travel Autonomy" : "자가발전기 스마트 캠핑 카라반 연동"}
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM LEFT: Large Featured Application Card */}
                    <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden group min-h-[340px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "03 / CORE RECREATIONAL INTEGRATION" : "03 / 농막쉼터·RV 수렴 핵심 성능"}
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1200" 
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200";
                        }}
                        alt="De Markies Expandable Caravan" 
                        className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-6 text-left bg-gradient-to-t">
                        <p className="text-sm md:text-base font-black text-white leading-tight">
                          {isEn ? "De Markies Accordion Folding Caravan" : "접이식 확장 아코디언 카라반"}
                        </p>
                        <p className="text-[11px] md:text-xs text-slate-300 mt-1.5 max-w-2xl font-sans leading-relaxed">
                          {isEn 
                            ? "Complete independence from grid cabling. Expands to include a pristine transparent glass ribbed awning and high-capacity luxury home appliances, with zero noise." 
                            : "아코디언식으로 확장되는 양측 접이 방습 캐노피 프레임을 적용해, 쾌적하고 조용한 수위 완충 공간과 아늑한 전기가 없는 야외 레저 영토를 전개합니다."
                          }
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM RIGHT: Explanatory Block inspired by "이전 concept:" design style */}
                    <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 rounded-3xl border border-yellow-500/20 bg-slate-950 flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
                      {/* elegant yellow glow blur */}
                      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10 w-full">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-yellow-950/60 border border-yellow-500/25 text-[10px] font-mono text-yellow-400 font-bold rounded">
                          VERSATILE LIVING
                        </div>
                        
                        <h4 className="text-lg md:text-xl font-black text-white leading-tight font-sans">
                          {isEn ? "Perfect Off-Grid Dwellings & Mobile Homes" : "소음 없는 청정 충전 루프 생태계"}
                        </h4>

                        {/* Direct blockquote with yellow border */}
                        <div className="border-l-3 border-yellow-400 pl-4 py-1.5 space-y-2.5 bg-slate-900/40 rounded-r-lg p-3">
                          <p className="text-[13px] sm:text-[13.5px] font-extrabold text-yellow-300 leading-normal font-sans">
                            {isEn ? "Self-Generating Power Unit suitable for remote cabins, campers, and high-end caravans." : "무충전 자가발전기 (농막형 쉼터 / 캠핑카 / 카라반)"}
                          </p>
                          <p className="text-[10px] sm:text-[11.5px] text-slate-300 italic font-medium leading-relaxed font-sans">
                            {isEn 
                              ? "Self-generating loop provides completely clean power to modular shelters and heavy leisure RV systems."
                              : "전기가 공급되지 않는 오지나 수변 농막, 상시적인 기동성이 요구되는 각종 레저 트레일러에 완전 무충전 지속 루프를 제공합니다."
                            }
                          </p>
                        </div>

                        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans pt-1">
                          {isEn
                            ? "Connecting HGE3D00 loops allows off-grid living with home-grade heat and power outputs, entirely self-sustained without outside dependency."
                            : "복잡한 인허가 및 기중 동력선 부재 한계를 지우고, HGE3D00의 최적화된 충·방전 밸런싱을 바탕으로 가전제품류와 공조설비를 모두 무소음 동시 충당해 냅니다."
                          }
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3.5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-yellow-950/30 border border-yellow-400/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                        </div>
                        <div className="font-sans">
                          <span className="text-[9px] font-mono text-slate-500 block tracking-wider uppercase">CLEAN MOBILE POWER</span>
                          <span className="text-xs font-black text-white">{isEn ? "Self-Sustaining Grid Active" : "무충전 자가 발전 스마트 루프"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🚜 CONCEPT SHOWCASE 2: "축분+과실박 바이오차 비료 자가발전" (Organic Waste-to-Biochar System) */}
                <div className="mt-16 md:mt-24 pt-12 md:pt-18 border-t border-white/10 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                  
                  {/* Concept Title */}
                  <div className="text-left mb-10 space-y-2 select-text">
                    <span className="text-[11px] font-mono font-black text-emerald-400 tracking-[0.25em] block uppercase">
                      {isEn ? "ORGANIC BIOMASS ECO-ENERGY LOOP" : "APPLICATION EXTENSION CONCEPT 02"}
                    </span>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight font-sans">
                        Concept: {isEn ? "Livestock Manure + Fruit Pomace Biochar Fertilizer Self-Generation" : "축분+과실박 바이오차 비료 자가발전"}
                      </h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 font-mono animate-pulse">
                        HGE3D00 CO-GENERATOR COUPLING
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 max-w-4xl leading-relaxed">
                      {isEn 
                        ? "Bypassing high-cost grid dependencies, we directly integrate local manure sludge and fruit farm residuals into a clean self-sustaining biochar cycle with just 2KW starter control power."
                        : "송전망이 없는 외산 농공 지역에서도 축산 유기 분뇨와 파과 찌꺼기를 HGE3D00 자가발전 및 온풍 건조 스텝으로 당일 전격 치환하는 완전 독립형 바이오매스 가동 혁신을 보장합니다."
                      }
                    </p>
                  </div>

                  {/* Grid Layout matching Section 1 exactly */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch select-text">
                    
                    {/* TOP LEFT: Pre-treatment conveyor & recycling factory scene */}
                    <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-slate-950 overflow-hidden flex flex-col justify-between group h-[300px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-emerald-400">
                        {isEn ? "01 / ACTUAL SHREDDER & CONVEYOR SYSTEM" : "01 / 실제 대형 파쇄 분쇄 및 이송 라인 전경"}
                      </div>
                      
                      {/* Interactive Clean Vector Representation of User's Left Side Photo (Shredder & Conveyor) */}
                      <div className="absolute inset-0 bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                        {/* Vaulted Vault Rafters background */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none">
                          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                            <line x1="0" y1="20" x2="200" y2="70" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="400" y1="20" x2="200" y2="70" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="200" y1="70" x2="200" y2="200" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="50" cy="30" r="3" fill="#ffffff" className="animate-pulse" />
                            <circle cx="150" cy="55" r="3" fill="#ffffff" className="animate-pulse" />
                            <circle cx="250" cy="55" r="3" fill="#ffffff" className="animate-pulse" />
                            <circle cx="350" cy="30" r="3" fill="#ffffff" className="animate-pulse" />
                          </svg>
                        </div>
                        {/* Glowing Spotlights from the roof */}
                        <div className="absolute top-0 left-12 w-28 h-48 bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-md transform -skew-x-12 pointer-events-none" />
                        <div className="absolute top-0 right-12 w-28 h-48 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-md transform skew-x-12 pointer-events-none" />

                        {/* Plant Floor and Heap */}
                        <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-900 border-t border-white/5" />
                        <div className="absolute bottom-8 left-4 w-28 h-12 bg-white/25 rounded-full blur-sm" />
                        <div className="absolute bottom-8 left-6 w-20 h-8 bg-slate-300/30 rounded-full border border-white/10 flex items-center justify-center text-[9px] text-slate-300 font-mono font-bold">
                          {isEn ? "RAW SHREDDED FEED" : "파쇄용 원료 더미"}
                        </div>

                        {/* Dual Slanted Conveyors & Shredder System */}
                        <div className="relative w-full h-[180px] mt-6 flex items-center justify-center">
                          {/* Conveyor 1 feed */}
                          <div className="absolute left-6 bottom-4 w-32 h-2.5 bg-slate-800 border border-emerald-500/30 rounded-full transform -rotate-15 overflow-hidden">
                            <div className="w-full h-full bg-repeating-linear-gradient opacity-80 animate-slide-left" style={{
                              backgroundImage: 'repeating-linear-gradient(90deg, #10b981 0px, #10b981 4px, transparent 4px, transparent 12px)'
                            }} />
                          </div>
                          <span className="absolute left-10 bottom-11 text-[9px] font-mono text-emerald-400 font-bold opacity-80">{isEn ? "FEED CONVEYOR" : "1차 이송 벨트"}</span>

                          {/* Conveyor 2 up to hopper */}
                          <div className="absolute right-12 bottom-6 w-36 h-3 bg-slate-800 border border-emerald-500/30 rounded-full transform rotate-20 overflow-hidden">
                            <div className="w-full h-full bg-repeating-linear-gradient opacity-90 animate-slide-right" style={{
                              backgroundImage: 'repeating-linear-gradient(-90deg, #10b981 0px, #10b981 4px, transparent 4px, transparent 12px)'
                            }} />
                          </div>
                          
                          {/* Motor Shredder Unit (Blue) */}
                          <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-28 h-24 bg-gradient-to-b from-cyan-905 to-cyan-950 border border-cyan-400/40 rounded-xl shadow-2xl flex flex-col justify-between p-2 z-10 group-hover:scale-102 transition-transform duration-300">
                            <div className="flex items-center justify-between border-b border-cyan-800/40 pb-1.5">
                              <span className="text-[8px] font-mono font-black text-cyan-300 uppercase select-none">{isEn ? "PRIMARY CRUSHER" : "고하중 파쇄기"}</span>
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            
                            {/* Rotating cutter indicators */}
                            <div className="flex justify-around items-center my-1.5">
                              <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                              <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                            </div>

                            <div className="flex items-center justify-between text-[7px] font-mono text-cyan-400 bg-slate-950/60 px-1 py-0.5 rounded">
                              <span className="animate-pulse">FLOW: ACTIVE</span>
                              <span>65Hz</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent p-5 text-left z-20">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Indoors Eco Shredding & Conveyor Feed" : "공장 내 자체 구동형 고부하 이송 유닛 (파쇄기 연동)"}
                        </p>
                      </div>
                    </div>

                    {/* TOP RIGHT: Industrial furnace/incinerator thermal plant */}
                    <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-slate-950 overflow-hidden flex flex-col justify-between group h-[300px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "02 / INDUSTRIAL THERMAL CHAMBER UNIT" : "02 / 오프그리드 무연 친환경 열처리 소각실"}
                      </div>

                      {/* Interactive Clean Vector Representation of User's Right Side Photo (Vertical Incinerator Cabinet) */}
                      <div className="absolute inset-0 bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                        {/* Corrugated panels wallpaper in the back */}
                        <div className="absolute inset-y-0 left-0 right-0 opacity-10 flex gap-2 pointer-events-none">
                          {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="h-full w-4 bg-slate-700/40 border-r border-slate-700/20" />
                          ))}
                        </div>

                        {/* Ceiling/Gable beams */}
                        <div className="absolute top-0 inset-x-0 h-6 bg-slate-900/60 border-b border-white/5 opacity-50" />

                        {/* High-Tech charcoal modular vertical incinerator cabinet (Matches Right Photo accurately!) */}
                        <div className="relative w-[300px] h-[200px] mt-6 flex items-center justify-between">
                          {/* Stairs and raised steel platform with safety guardrails */}
                          <div className="absolute left-2 bottom-2 w-28 h-24 flex flex-col justify-end z-10 select-none">
                            {/* Small step ladder lines */}
                            <div className="w-10 h-10 border-r-2 border-t-2 border-slate-400/50 relative ml-auto transform skew-y-12 mb-1">
                              <div className="absolute right-0 top-0 w-full h-0.5 bg-slate-500" />
                              <div className="absolute right-0 top-3 w-full h-0.5 bg-slate-500" />
                              <div className="absolute right-0 top-6 w-full h-0.5 bg-slate-500" />
                            </div>
                            {/* Metal floor plate */}
                            <div className="w-full h-1.5 bg-gradient-to-r from-slate-400 to-slate-500 border border-white/10 rounded-sm shadow" />
                            {/* Support pillars */}
                            <div className="flex justify-between px-2 h-8">
                              <div className="w-1 h-full bg-slate-600" />
                              <div className="w-1 h-full bg-slate-600" />
                              <div className="w-1 h-full bg-slate-600" />
                            </div>
                          </div>

                          {/* Incinerator main high-rise structure (Charcoal-black) */}
                          <div className="absolute left-[84px] bottom-1 w-32 h-[162px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700 rounded-lg shadow-2xl flex flex-col justify-between p-2.5 z-20">
                            {/* Top Exhaust Chimney Stack */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-800 border border-slate-750 rounded-t-md flex flex-col items-center justify-center">
                              <div className="w-1 h-2 bg-rose-500/30 blur-xs rounded-full animate-ping" />
                            </div>

                            {/* Upper air filtration grill structure */}
                            <div className="h-10 bg-slate-950/80 rounded border border-slate-800/40 flex flex-col gap-1 p-1">
                              <div className="flex gap-1 justify-around">
                                <div className="w-1 h-2 bg-slate-800 rounded-xs animate-pulse" />
                                <div className="w-1 h-2 bg-slate-800 rounded-xs animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <div className="w-1 h-2 bg-slate-800 rounded-xs animate-pulse" style={{ animationDelay: '0.4s' }} />
                                <div className="w-1 h-2 bg-slate-800 rounded-xs animate-pulse" style={{ animationDelay: '0.6s' }} />
                              </div>
                              <span className="text-[7px] font-mono text-slate-500 tracking-tighter uppercase select-none">{isEn ? "FILTRATION: OK" : "무연 흡착 가동"}</span>
                            </div>

                            {/* Central Combustion Hearth portal window with pulsing fire glow */}
                            <div className="w-full h-12 bg-slate-950 rounded-md border border-slate-800 flex items-center justify-center relative overflow-hidden my-1 shadow-inner animate-pulse">
                              <div className="absolute inset-1 rounded-sm bg-gradient-to-b from-orange-600 via-rose-600 to-amber-750 opacity-80 blur-xs" />
                              <div className="relative text-[7px] font-mono font-black text-yellow-300 drop-shadow-md z-10 flex flex-col items-center justify-center">
                                <span>1300℃</span>
                                <span className="text-[5px] text-white/80">THERMAL OK</span>
                              </div>
                            </div>

                            {/* Base entry door hatch */}
                            <div className="h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[7px] font-mono text-slate-400 select-none">
                              {isEn ? "MAINTENANCE LATCH" : "재 축출 트레이"}
                            </div>
                          </div>

                          {/* Console unit desk (Cream/yellow) on right platform side */}
                          <div className="absolute right-4 bottom-5 w-14 h-16 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-sm z-30 p-1 flex flex-col justify-between shadow-lg">
                            <span className="text-[6px] font-mono text-slate-400 select-none">{isEn ? "SYS_BOARD" : "제어반"}</span>
                            {/* Miniature Status lights (Yellow, Green, Red) */}
                            <div className="flex gap-1 items-center justify-center bg-yellow-400/10 border border-yellow-400/20 py-1 px-0.5 rounded-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            </div>
                            <div className="text-[5px] font-mono text-emerald-400 text-right">AUTO</div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent p-5 text-left z-20">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Sustainable Thermal Process Matrix" : "상시 정격 열풍 열안정 제어실 운영"}
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM LEFT: Large Featured Application Card with gorgeous biochar system line view */}
                    <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden group min-h-[340px] relative shadow-lg flex flex-col justify-between">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-amber-400">
                        {isEn ? "03 / HIGH-LOAD ECO INDUSTRIAL LINE" : "03 / 축분+과실박 바이오차 비료 자가발전 흐름"}
                      </div>
                      <div className="w-full h-48 bg-slate-950/80 mt-12 flex items-center justify-center p-2">
                        <img 
                          src={biocharSystemLine} 
                          alt="Self-Generating Biochar Fertilizer Process Line" 
                          className="max-w-full max-h-full object-contain filter brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6 text-left bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                        <p className="text-sm md:text-base font-black text-white leading-tight">
                          {isEn ? "Co-Power Synchronization solves major grid & organic waste roadblocks" : "축분 및 과실박 바이오차 비료 연동으로 송전 분산망 해결"}
                        </p>
                        <p className="text-[11px] md:text-xs text-slate-300 mt-1.5 max-w-2xl font-sans leading-relaxed font-normal">
                          {isEn 
                            ? "By directly coupling the HGE3D00 generator stack, we achieve over 98% thermal transfer efficiency. This supports off-grid, zero-emissions sterilizations, moisture extractions (to <10%), and automated bagging." 
                            : "하이브리드 HGE3D00 무충전 발전기를 축 분뇨 가수분해 및 온풍건조 라인에 밀접 동동 연계하여, 98% 이상의 독보적인 압도적 유체 열교환 분별 실증을 완료하고, 친환경 비료생산 자립 사이클을 정밀 구현해 냅니다."
                          }
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM RIGHT: Explanatory Block mimicking the exact requested yellow banner styling */}
                    <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 rounded-3xl border border-emerald-500/20 bg-slate-950 flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
                      {/* elegant emerald glow blur */}
                      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10 w-full">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-950/60 border border-emerald-500/25 text-[10px] font-mono text-emerald-400 font-bold rounded">
                          ECO-ENERGY SYSTEM
                        </div>
                        
                        <h4 className="text-lg md:text-xl font-black text-white leading-tight font-sans">
                          {isEn ? "Livestock Manure & Fruit Biochar Self-Sustained Loop" : "축분+과실박 바이오차 비료 자가발전"}
                        </h4>

                        {/* Direct blockquote with golden border replicating the exact requested user images text */}
                        <div className="border-l-3 border-yellow-400 pl-4 py-1.5 space-y-2.5 bg-slate-900/40 rounded-r-lg p-3">
                          <p className="text-[13px] sm:text-[13.5px] font-extrabold text-yellow-300 leading-normal font-sans">
                            {isEn ? "Self-Generating Biochar Fertilizer Unit [Manure / Fruit Waste Processing]" : "축분+과실박 바이오차 비료 자가발전"}
                          </p>
                          <p className="text-[11px] sm:text-[12px] text-slate-200 font-black leading-relaxed font-sans bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1.5 rounded-md">
                            {isEn 
                              ? "Attaching a hybrid generator to the 2KW biomass loop solves off-grid electricity bottleneck instantly."
                              : "소비전력 2KW로 하이브리드 발전기 부착시 전기문제 해결됨"
                            }
                          </p>
                        </div>

                        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans pt-1">
                          {isEn
                            ? "By directly coupling the HGE3D00 loop, regional farms bypass expensive power grid installations, realizing localized biochar carbon storage and premium fertilizer distribution."
                            : "외진 농공 및 임야 지역의 계통 선로 인입 비용을 완전히 무력화하며, 친환경 하이브리드 자가발전으로 온풍 건조, 급수 가수분해, 자동 로터 밀봉 등 전 공정 연속 자립 운전을 성취합니다."
                          }
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3.5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-emerald-950/30 border border-emerald-400/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </div>
                        <div className="font-sans">
                          <span className="text-[9px] font-mono text-slate-500 block tracking-wider uppercase">CLEAN WASTE POWER</span>
                          <span className="text-xs font-black text-white">{isEn ? "2KW Hybrid Grid Solved" : "2KW 하이브리드 전력 완전 자립화"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* 🚜 CONCEPT SHOWCASE 3: "축분+과실박 바이오차 비료 시스템" (Organic Waste-to-Biochar System) */}
            {false && (
              <div className="col-span-full mt-12 md:mt-18 pt-10 md:pt-16 border-t border-white/10 select-text">
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse" />
                  
                  {/* Concept Title & Header Yellow Banner modeled directly from User's uploaded image */}
                  <div className="text-left mb-8 space-y-4 select-text">
                    <span className="text-[11px] font-mono font-black text-amber-400 tracking-[0.25em] block uppercase">
                      {isEn ? "BIOMASS TO FERTILIZER LOOP" : "APPLICATION EXTENSION CONCEPT 03"}
                    </span>
                    
                    {/* Recreating the exact Yellow Banner from the user's prompt in high fidelity */}
                    <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-505 text-slate-950 p-4 md:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-yellow-300">
                      <div>
                        <div className="inline-block px-2.5 py-0.5 bg-slate-950 text-yellow-400 text-[10px] font-mono font-bold rounded mb-1.5 uppercase">
                          {isEn ? "CO-RECREATIONAL BIOMASS ECO-SYSTEM" : "바이오매스 농가 상생 시스템"}
                        </div>
                        <h4 className="text-xl md:text-2xl font-black tracking-tight leading-none text-slate-950">
                          {isEn ? "Livestock Manure + Fruit Pomace = Biochar Fertilizer System" : "축분 + 과실박 = 바이오차 비료 시스템"}
                        </h4>
                      </div>
                      <div className="bg-slate-950/20 px-4 py-2.5 rounded-xl border border-white/10 flex flex-col items-start md:items-end">
                        <span className="text-xs md:text-sm font-black text-slate-950">
                          {isEn ? "⚡ Using Self-Generating Power Loops animate-pulse" : "무충전 발전기 사용으로 즉각 작업가능"}
                        </span>
                        <span className="text-[10px] text-slate-900 font-bold mt-0.5">
                          {isEn ? ">>> Direct on-farm fully independent operations" : ">>> 농장 내 직접 단독 작업 전개 (계통인입 일체 불요)"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-slate-400 max-w-4xl leading-relaxed mt-2 animate-fade-in">
                      {isEn 
                        ? "Connecting 100% self-sustained heat/power loops eliminates expensive grid expansion. Converts organic sludge and local fruit farming waste directly into premium Biochar fertilizer at site."
                        : "캄보디아, 태국, 베트남 등 동남아 핵심 농업 벨트에서 송배전망 부재 한계를 지우고, 독자 자가발전으로 과실 부산물과 축산폐기물을 일체 오염 없이 부가가치가 매우 높은 청정 바이오차 농업 비료로 당일 치환합니다."
                      }
                    </p>
                  </div>

                  {/* Flag tabs Selector */}
                  <div className="flex flex-wrap items-center gap-3 mb-8 bg-slate-900/60 p-2.5 rounded-2xl border border-white/5 max-w-xl">
                    <span className="text-xs font-bold text-slate-400 font-sans px-2">
                      {isEn ? "Target Region:" : "대상 주 적용 국가:"}
                    </span>
                    
                    {/* Cambodia Tab */}
                    <button 
                      onClick={() => setSelectedCountry('cambodia')}
                      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedCountry === 'cambodia'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/5'
                          : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {/* Pure CSS Cambodia Flag */}
                      <span className="w-5 h-3 flex flex-col justify-between border border-white/10 relative overflow-hidden">
                        <div className="h-[25%] bg-blue-800" />
                        <div className="h-[50%] bg-red-650 flex items-center justify-center relative">
                          <div className="w-2 h-1 bg-white rounded-xs opacity-90" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                        </div>
                        <div className="h-[25%] bg-blue-800" />
                      </span>
                      <span>{isEn ? "Cambodia" : "캄보디아"}</span>
                    </button>

                    {/* Thailand Tab */}
                    <button 
                      onClick={() => setSelectedCountry('thailand')}
                      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedCountry === 'thailand'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/5'
                          : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {/* Pure CSS Thailand Flag */}
                      <span className="w-5 h-3 flex flex-col justify-between border border-white/10 relative overflow-hidden">
                        <div className="h-[16.6%] bg-red-650" />
                        <div className="h-[16.6%] bg-white" />
                        <div className="h-[33.3%] bg-blue-900" />
                        <div className="h-[16.6%] bg-white" />
                        <div className="h-[16.6%] bg-red-650" />
                      </span>
                      <span>{isEn ? "Thailand" : "태국"}</span>
                    </button>

                    {/* Vietnam Tab */}
                    <button 
                      onClick={() => setSelectedCountry('vietnam')}
                      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedCountry === 'vietnam'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/5'
                          : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {/* Pure CSS Vietnam Flag */}
                      <span className="w-5 h-3 bg-red-650 flex items-center justify-center border border-white/10 relative overflow-hidden">
                        <div className="w-1.5 h-1.5 bg-yellow-400 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
                      </span>
                      <span>{isEn ? "Vietnam" : "베트남"}</span>
                    </button>
                  </div>

                  {/* Main Grid Layout for Showcase 3 */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch select-text animate-fade-in text-slate-100">
                    
                    {/* LEFT GRAPHIC: High Fidelity Interactive Visualizer for Biochar Factory Hardware Line */}
                    <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-950 p-6 flex flex-col justify-between group h-[480px] relative overflow-hidden shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-amber-400">
                        {isEn ? "01 / CORE HARDWARE SCHEMATIC" : "01 / 핵심 가설 가압 열수 반응 시스템"}
                      </div>

                      {/* Hardware Vector Block - Modeled directly on User's Uploaded machine image */}
                      <div className="relative w-full h-[240px] mt-10 rounded-2xl border border-white/5 bg-slate-950/40 p-3 overflow-hidden flex flex-col justify-between">
                        
                        {/* Interactive Blueprint Canvas matching the horizontal machine line design */}
                        <div className="relative w-full h-[155px] flex items-center justify-center">
                          <svg className="w-full h-full select-none" viewBox="0 0 1200 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              {/* Background studio light gradient */}
                              <radialGradient id="studio-bg" cx="50%" cy="40%" r="60%" fx="50%" fy="30%">
                                <stop offset="0%" stopColor="#f8fafc" />
                                <stop offset="60%" stopColor="#f1f5f9" />
                                <stop offset="100%" stopColor="#cbd5e1" />
                              </radialGradient>
                              
                              {/* Sophisticated metallic steel gradients */}
                              <linearGradient id="polished-steel" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="15%" stopColor="#cbd5e1" />
                                <stop offset="45%" stopColor="#94a3b8" />
                                <stop offset="50%" stopColor="#64748b" />
                                <stop offset="55%" stopColor="#475569" />
                                <stop offset="85%" stopColor="#94a3b8" />
                                <stop offset="100%" stopColor="#cbd5e1" />
                              </linearGradient>

                              <linearGradient id="machinery-gray" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#94a3b8" />
                                <stop offset="50%" stopColor="#475569" />
                                <stop offset="100%" stopColor="#1e293b" />
                              </linearGradient>

                              <linearGradient id="panel-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#334155" />
                                <stop offset="50%" stopColor="#1e293b" />
                                <stop offset="100%" stopColor="#0f172a" />
                              </linearGradient>

                              <linearGradient id="horizontal-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#cbd5e1" />
                                <stop offset="25%" stopColor="#f8fafc" />
                                <stop offset="50%" stopColor="#cbd5e1" />
                                <stop offset="75%" stopColor="#64748b" />
                                <stop offset="100%" stopColor="#475569" />
                              </linearGradient>
                              
                              {/* Floor shadows */}
                              <radialGradient id="shadow-radial" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                              </radialGradient>
                            </defs>
                            
                            <rect width={1200} height={380} rx={16} fill="url(#studio-bg)" />
                            
                            <line x1="20" y1="305" x2="1180" y2="305" stroke="#94a3b8" strokeWidth={1.5} />
                            
                            <ellipse cx="140" cy="306" rx="120" ry="8" fill="url(#shadow-radial)" />
                            <ellipse cx="370" cy="306" rx="190" ry="10" fill="url(#shadow-radial)" />
                            <ellipse cx="610" cy="306" rx="80" ry="8" fill="url(#shadow-radial)" />
                            <ellipse cx="780" cy="306" rx="90" ry="8" fill="url(#shadow-radial)" />
                            <ellipse cx="945" cy="306" rx="70" ry="8" fill="url(#shadow-radial)" />
                            <ellipse cx="1090" cy="306" rx="60" ry="8" fill="url(#shadow-radial)" />

                            {/* Background Conduit Piping Network */}
                            <g id="plumbing-background" stroke="#64748b" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M 645 130 L 645 70 L 320 70 L 320 150" fill="none" />
                              <path d="M 520 150 L 520 100 L 730 100 L 730 150" fill="none" />
                              <path d="M 830 150 L 830 80 L 920 80 L 920 150" fill="none" />
                              <path d="M 570 120 L 570 50 L 870 50 L 870 150" fill="none" stroke="#475569" strokeWidth={5} />
                              <path d="M 1060 220 L 830 220" fill="none" stroke="#cbd5e1" strokeWidth={3} />
                            </g>

                            {/* Module 1: Trailer Truck & Cylinder Vessel (Trailer State) */}
                            <g 
                              className="cursor-pointer transition-all duration-200"
                              style={{
                                filter: hoveredEquip === 'trailer' ? 'drop-shadow(0px 0px 8px rgba(245,158,11,0.65))' : 'none',
                                opacity: hoveredEquip && hoveredEquip !== 'trailer' ? 0.65 : 1
                              }}
                              onClick={() => setHoveredEquip('trailer')}
                              onMouseEnter={() => setHoveredEquip('trailer')}
                            >
                              <path d="M 40 286 L 40 240 Q 40 215 65 210 L 95 210 Q 115 210 125 225 L 140 250 L 140 286 Z" fill="#334155" />
                              <path d="M 98 215 L 118 215 L 132 245 L 112 245 Z" fill="#94a3b8" opacity={0.8} />
                              <path d="M 65 215 L 94 215 L 94 245 L 60 245 Q 60 230 65 215 Z" fill="#1e293b" />
                              <rect x="30" y="275" width="22" height="11" rx="4" fill="#0f172a" />
                              <polygon points="35,260 45,260 42,268 35,268" fill="#fde047" />
                              <circle cx="70" cy="286" r="16" fill="#1e293b" stroke="#64748b" strokeWidth={3} />
                              <circle cx="70" cy="286" r="6" fill="#cbd5e1" />
                              <circle cx="120" cy="286" r="16" fill="#1e293b" stroke="#64748b" strokeWidth={3} />
                              <circle cx="120" cy="286" r="6" fill="#cbd5e1" />

                              <rect x="140" y="268" width="240" height="8" fill="#475569" />
                              <line x1="360" y1="276" x2="360" y2="295" stroke="#475569" strokeWidth={6} />
                              
                              <circle cx="310" cy="286" r="16" fill="#1e293b" stroke="#64748b" strokeWidth={3} />
                              <circle cx="310" cy="286" r="6" fill="#cbd5e1" />
                              <circle cx="342" cy="286" r="16" fill="#1e293b" stroke="#64748b" strokeWidth={3} />
                              <circle cx="342" cy="286" r="6" fill="#cbd5e1" />

                              <rect x="175" y="220" width="12" height="48" fill="url(#machinery-gray)" />
                              <rect x="250" y="220" width="12" height="48" fill="url(#machinery-gray)" />
                              <rect x="325" y="220" width="12" height="48" fill="url(#machinery-gray)" />

                              <rect x="150" y="130" width="225" height="100" rx="50" fill="url(#polished-steel)" stroke="#475569" strokeWidth={2} />
                              <rect x="230" y="165" width="45" height="15" fill="#f59e0b" rx="2" />
                              <rect x="234" y="171" width="37" height="3" fill="#1e293b" />
                              <rect x="195" y="128" width="6" height="104" fill="#475569" opacity={0.6} />
                              <rect x="290" y="128" width="6" height="104" fill="#475569" opacity={0.6} />
                              <path d="M 230 130 C 230 115, 260 115, 260 130 Z" fill="url(#polished-steel)" stroke="#475569" strokeWidth={1.5} />
                              <line x1="245" y1="115" x2="245" y2="100" stroke="#64748b" strokeWidth={3} />
                            </g>

                            {/* Module 2: High Conical Cyclone Separator (Cyclone 1) */}
                            <g 
                              className="cursor-pointer transition-all duration-200"
                              style={{
                                filter: hoveredEquip === 'cyclone1' ? 'drop-shadow(0px 0px 8px rgba(245,158,11,0.65))' : 'none',
                                opacity: hoveredEquip && hoveredEquip !== 'cyclone1' ? 0.65 : 1
                              }}
                              onClick={() => setHoveredEquip('cyclone1')}
                              onMouseEnter={() => setHoveredEquip('cyclone1')}
                            >
                              <line x1="420" y1="210" x2="420" y2="300" stroke="#334155" strokeWidth={3} />
                              <line x1="470" y1="210" x2="470" y2="300" stroke="#334155" strokeWidth={3} />
                              <line x1="445" y1="230" x2="445" y2="300" stroke="#475569" strokeWidth={2} />

                              <polygon points="410,190 480,190 445,248" fill="url(#polished-steel)" stroke="#475569" strokeWidth={1.5} />
                              <rect x="410" y="105" width="70" height="85" fill="url(#polished-steel)" stroke="#475569" strokeWidth={2} />
                              <polygon points="405,105 485,105 445,85" fill="url(#polished-steel)" stroke="#475569" strokeWidth={1.5} />
                              <rect x="435" y="72" width="20" height="13" rx="2" fill="url(#machinery-gray)" />

                              <circle cx="445" cy="140" r="14" fill="#1e40af" stroke="#ffffff" strokeWidth={1.5} />
                              <circle cx="445" cy="140" r="10" fill="none" stroke="#60a5fa" strokeWidth={1} strokeDasharray="2 1" />
                              <path d="M 440 140 L 450 140" stroke="#ffffff" strokeWidth={2} />
                              <path d="M 445 135 L 445 145" stroke="#ffffff" strokeWidth={2} />
                            </g>

                            {/* Module 3: Closed Heater Steam Boiler (Boiler) */}
                            <g 
                              className="cursor-pointer transition-all duration-200"
                              style={{
                                filter: hoveredEquip === 'boiler' ? 'drop-shadow(0px 0px 8px rgba(245,158,11,0.65))' : 'none',
                                opacity: hoveredEquip && hoveredEquip !== 'boiler' ? 0.65 : 1
                              }}
                              onClick={() => setHoveredEquip('boiler')}
                              onMouseEnter={() => setHoveredEquip('boiler')}
                            >
                              <rect x="520" y="270" width="105" height="34" fill="url(#panel-dark)" rx={3} />
                              <rect x="525" y="110" width="95" height="160" rx={6} fill="url(#panel-dark)" stroke="#475569" strokeWidth={2} />
                              
                              <rect x="540" y="130" width="65" height="40" rx={4} fill="#020617" stroke="#334155" strokeWidth={1.15} />
                              <circle cx="555" cy="150" r="8" fill="#1e293b" stroke="#f59e0b" strokeWidth={1.5} />
                              <line x1="555" y1="150" x2="560" y2="145" stroke="#f59e0b" strokeWidth={2} />
                              <rect x="575" y="140" width="20" height="8" fill="#22c55e" rx={1} />
                              <rect x="575" y="152" width="20" height="8" fill="#ef4444" rx={1} />

                              <rect x="540" y="190" width="30" height="55" rx={3} fill="#1e293b" stroke="#475569" />
                              <rect x="580" y="190" width="30" height="55" rx={3} fill="#1e293b" stroke="#475569" />
                              <circle cx="562" cy="218" r="2.5" fill="#94a3b8" />
                              <circle cx="588" cy="218" r="2.5" fill="#94a3b8" />

                              <rect x="555" y="40" width="16" height="70" fill="url(#machinery-gray)" />
                              <rect x="551" y="40" width="24" height="8" fill="#dc2626" />
                            </g>

                            {/* Module 4: Rotary Drum Drying Cylinder (Rotary Dryer) */}
                            <g 
                              className="cursor-pointer transition-all duration-200"
                              style={{
                                filter: hoveredEquip === 'rotary_dryer' ? 'drop-shadow(0px 0px 8px rgba(245,158,11,0.65))' : 'none',
                                opacity: hoveredEquip && hoveredEquip !== 'rotary_dryer' ? 0.65 : 1
                              }}
                              onClick={() => setHoveredEquip('rotary_dryer')}
                              onMouseEnter={() => setHoveredEquip('rotary_dryer')}
                            >
                              <rect x="675" y="230" width="16" height="70" fill="url(#machinery-gray)" rx={2} />
                              <rect x="795" y="230" width="16" height="70" fill="url(#machinery-gray)" rx={2} />
                              <circle cx="683" cy="230" r={6} fill="#1e293b" stroke="#cbd5e1" strokeWidth={1} />
                              <circle cx="803" cy="230" r={6} fill="#1e293b" stroke="#cbd5e1" strokeWidth={1} />
                              
                              <rect x="655" y="135" width="175" height="95" rx={12} fill="url(#polished-steel)" stroke="#475569" strokeWidth={2} />
                              
                              <rect x="690" y="131" width="12" height="103" rx={2} fill="url(#horizontal-metal)" stroke="#475569" strokeWidth={1} />
                              <rect x="782" y="131" width="12" height="103" rx={2} fill="url(#horizontal-metal)" stroke="#475569" strokeWidth={1} />

                              <circle cx="742" cy="182" r={10} fill="url(#machinery-gray)" stroke="#475569" />
                              <circle cx="742" cy="182" r={4} fill="#cbd5e1" />
                            </g>

                            {/* Module 5: Packaged Product Bin Silo Hopper (Cyclone 2) */}
                            <g 
                              className="cursor-pointer transition-all duration-200"
                              style={{
                                filter: hoveredEquip === 'cyclone2' ? 'drop-shadow(0px 0px 8px rgba(245,158,11,0.65))' : 'none',
                                opacity: hoveredEquip && hoveredEquip !== 'cyclone2' ? 0.65 : 1
                              }}
                              onClick={() => setHoveredEquip('cyclone2')}
                              onMouseEnter={() => setHoveredEquip('cyclone2')}
                            >
                              <line x1="885" y1="210" x2="885" y2="300" stroke="#334155" strokeWidth={3} />
                              <line x1="945" y1="210" x2="945" y2="300" stroke="#334155" strokeWidth={3} />
                              
                              <polygon points="873,195 957,195 915,255" fill="url(#polished-steel)" stroke="#475569" strokeWidth={1.5} />
                              <rect x="873" y="100" width="84" height="95" fill="url(#polished-steel)" stroke="#475569" strokeWidth={2} />
                              <path d="M 873 100 C 873 75, 957 75, 957 100 Z" fill="url(#polished-steel)" stroke="#475569" strokeWidth={1.5} />
                            </g>

                            {/* Module 6: Zero-Emission Generator Control Subsystem (Generator) */}
                            <g 
                              className="cursor-pointer transition-all duration-200"
                              style={{
                                filter: hoveredEquip === 'generator' ? 'drop-shadow(0px 0px 8px rgba(34,197,94,0.65))' : 'none',
                                opacity: hoveredEquip && hoveredEquip !== 'generator' ? 0.65 : 1
                              }}
                              onClick={() => setHoveredEquip('generator')}
                              onMouseEnter={() => setHoveredEquip('generator')}
                            >
                              <rect x="1010" y="155" width="140" height="142" rx={6} fill="url(#panel-dark)" stroke="#1e293b" strokeWidth={2.5} />
                              
                              <rect x="1025" y="175" width="55" height="10" rx={1} fill="#020617" />
                              <rect x="1025" y="193" width="55" height="10" rx={1} fill="#020617" />
                              <rect x="1025" y="211" width="55" height="10" rx={1} fill="#020617" />
                              <rect x="1025" y="229" width="55" height="10" rx={1} fill="#020617" />
                              <rect x="1025" y="247" width="55" height="10" rx={1} fill="#020617" />

                              <g opacity={0.95}>
                                <rect x="1095" y="175" width="40" height="42" fill="#1e293b" stroke="#334155" strokeWidth={1} />
                                <path d="M1095,185 L1105,175 M1095,195 L1115,175 M1095,205 L1125,175 M1095,215 L1135,175 M1105,215 L1135,185 M1115,215 L1135,195 M1125,215 L1135,205" stroke="#fbbf24" strokeWidth={3} />
                              </g>

                              <circle cx="1115" cy="245" r={5} fill="#22c55e" />
                              <circle cx="1115" cy="265" r={4} fill="#ef4444" stroke="#ffffff" strokeWidth={1} />
                              <rect x="1005" y="297" width="150" height="5" fill="#020617" />
                            </g>

                            {hoveredEquip && (
                              <text x="600" y="348" textAnchor="middle" fill="#475569" fontSize={13} fontWeight="bold" fontFamily="monospace" letterSpacing="0.05em">
                                {isEn ? "✦ CLICK SUB-COMPONENT TO LOAD DATASHEET SPECIFICATIONS ✦" : "✦ 각 설비 파트 클릭 시 고정밀 실시간 데이터시트 즉시 교차연동 ✦"}
                              </text>
                            )}
                          </svg>
                        </div>

                        {/* Real-Time Spec Readout from the Image components */}
                        <div className="bg-slate-905/90 border border-white/5 rounded-xl p-3 select-text min-h-[110px] flex flex-col justify-between text-left">
                          {hoveredEquip === 'trailer' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black font-sans text-yellow-405">
                                  {isEn ? "01 / Pressurized Transport Cylinder Tank" : "01 / 가압 이송 실린더 탱크"}
                                </span>
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-400">STATUS: INJECTING</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1.5">
                                {isEn 
                                  ? "Mobile raw feed collector with a twin-axle trailer bed and heavy sealed cylindrical body. Continuous low-loss biomass slurry injection." 
                                  : "대용량 과실박 및 축분을 투입부로 강제 기밀 수송하는 차세대 이동식 고장력 이송 실린더 탱크 트레일러 모듈입니다."
                                }
                              </p>
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-1 border-t border-white/5 mt-1">
                                <span>VOLUME: 18.5 m³</span>
                                <span>PUMP RATE: 120 L/min</span>
                              </div>
                            </>
                          )}

                          {hoveredEquip === 'cyclone1' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black font-sans text-yellow-405">
                                  {isEn ? "02 / Primary Centrifugal Cyclone Separator" : "02 / 제1 가온 싸이클론 분리기"}
                                </span>
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-emerald-400">STABILITY: 100%</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1.5">
                                {isEn 
                                  ? "High-centrifugal separator sorting damp exhaust and heavy carbon dust, bearing an official integrated blue seal ring stamp for certified eco safety." 
                                  : "원심 고속 와류력을 유도하여 슬러지 기질 내 수증기와 중탄소를 0.1초 만에 분별 세척해 내는 시그니처 엠블럼형 가속 분리기 호퍼입니다."
                                }
                              </p>
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-1 border-t border-white/5 mt-1">
                                <span>SEPARATION EFF: 99.4%</span>
                                <span>FLOW PRES: 2.2 bar</span>
                              </div>
                            </>
                          )}

                          {hoveredEquip === 'boiler' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black font-sans text-yellow-405">
                                  {isEn ? "03 / Hydrolysis Continuous Steam Boiler" : "03 / 가수분해 상시 스팀 보일러"}
                                </span>
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-amber-400">THERMAL: 185°C</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1.5">
                                {isEn 
                                  ? "Durable heavy blocky boiler generating continuous dry steam to support high-pressure thermal destruction loops." 
                                  : "밀폐 열수 순환 실린더 내부에 12.5bar 이상 초고압 스팀 열기를 쉴 새 없이 정속 전달하는 수랭 겸용 스팀 제어 탑재 보일러실입니다."
                                }
                              </p>
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-1 border-t border-white/5 mt-1">
                                <span>GENERATION: 450 kg/h</span>
                                <span>SAFETY VALVE: OK</span>
                              </div>
                            </>
                          )}

                          {hoveredEquip === 'rotary_dryer' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black font-sans text-yellow-405">
                                  {isEn ? "04 / Rotary Cylindrical Indirect Drying Kiln" : "04 / 회전 원통 연속식 간접 건조 가마"}
                                </span>
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-400">DRYING: MOISTURE &lt; 10%</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1.5">
                                {isEn 
                                  ? "Gently rotative kiln on supporting roller guide tracks. Reuses engine residual heat to dry biochar evenly before packing." 
                                  : "지지 롤러 기어 위에서 완속 회전하며 투입물이 탄화에 최적화되도록 수분을 정밀 10% 미만으로 증발시키는 연속형 원통 건조 가마 설비입니다."
                                }
                              </p>
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-1 border-t border-white/5 mt-1">
                                <span>ROTATION: 12 rpm</span>
                                <span>HEAT RECYCLE: 88%</span>
                              </div>
                            </>
                          )}

                          {hoveredEquip === 'cyclone2' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black font-sans text-yellow-405">
                                  {isEn ? "05 / Product Collection & Storage Silo Hopper" : "05 / 완제품 수집 저장 사일로 호퍼"}
                                </span>
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-400">CAPACITY: FULL-AUTOMATIC</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1.5">
                                {isEn 
                                  ? "Stout vertical delivery silo on high clearance structural columns. Direct line storage for immediate high-density bagging." 
                                  : "건조가 완결된 청정 고부가가치 바이오차 알갱이를 하부 포장 사일로 분사 백 유닛으로 다이렉트 이송하기 위해 완충 수립된 고용량 이송 벌크 호퍼입니다."
                                }
                              </p>
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-1 border-t border-white/5 mt-1">
                                <span>LIMIT SWITCH: SAFE</span>
                                <span>HOLDING: 1,500 kg</span>
                              </div>
                            </>
                          )}

                          {hoveredEquip === 'generator' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black font-sans text-emerald-400">
                                  {isEn ? "06 / HGE3D00 Off-Grid Self-Powered Generator" : "06 / HGE3D00 무충전 자가발전기"}
                                </span>
                                <span className="bg-emerald-950/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-emerald-300 border border-emerald-500/20 animate-pulse">SELF-POWERED</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-sans leading-relaxed mt-1.5">
                                {isEn 
                                  ? "Zero emission power/heat pack producing 100% independent electrical feeds. Avoids massive auxiliary line routing costs." 
                                  : "한전 고압 삼상전기 가설 계통인입 비용을 완전히 무마하고 단 2KW 자치 제어 동력으로 대형 건조 설비 전체를 상시 가동해 내는 초밀도 패키지 발전 장치입니다."
                                }
                              </p>
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-400 pt-1 border-t border-white/5 mt-1">
                                <span>SAVINGS MULTIPLIER: 40x</span>
                                <span>GENERATION CAP: 250 kW</span>
                              </div>
                            </>
                          )}
                        </div>

                      </div>

                      {/* Display Dynamic Context based on Selected Country */}
                      <div className="bg-slate-950/90 border border-white/10 rounded-2xl p-4 relative z-10 text-left">
                        {selectedCountry === 'cambodia' && (
                          <>
                            <h5 className="text-[11px] font-bold text-amber-300 font-sans">{isEn ? "CAMBODIA TARGET VALUE" : "캄보디아 보급 핵심"}</h5>
                            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                              {isEn 
                                ? "Abundant Mango waste and local poultry beddings are direct inputs. HGE3D00 loop secures zero-grid fertilizer plants outside Phnom Penh." 
                                : "프농펜 외곽 대규모 망고 집하 과실 부산물 및 현지 가축 분뇨 슬러지를 전용 공급원으로 원료 수집 및 계통 유입 전기 해소 실증."
                              }
                            </p>
                          </>
                        )}
                        {selectedCountry === 'thailand' && (
                          <>
                            <h5 className="text-[11px] font-bold text-emerald-305 font-sans">{isEn ? "THAILAND TARGET VALUE" : "태국 치앙마이 농공 실증"}</h5>
                            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                              {isEn 
                                ? "Converts sugarcane bagasse and high-phosphorus organic effluents out of food processing centers cleanly off-grid." 
                                : "치앙마이, 이산 전역의 대형 사탕수수 주산지 제당 부산물과 유기질 슬러지를 배출가스 및 인접 오염 없이 당일 펠렛화 수확 완료."
                              }
                            </p>
                          </>
                        )}
                        {selectedCountry === 'vietnam' && (
                          <>
                            <h5 className="text-[11px] font-bold text-cyan-300 font-sans">{isEn ? "VIETNAM TARGET VALUE" : "베트남 남부 고지대 커피 벨트"}</h5>
                            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                              {isEn 
                                ? "Decentralized coffee husks and agricultural waste converters. Absolute zero noise prevents urban encroachment complaints." 
                                : "람동성 고지대 대규모 커피 밀껍질, 피나무 및 과수 부산물을 탈수하여 무소음 연속 건조-포장까지 완전 독립 무장망 독립 구동 완료."
                              }
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* RIGHT PROCESS GRAPHIC: Detailed Clean Interactive Block Diagram showing the exact nodes from the user's diagram */}
                    <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-slate-950 p-6 md:p-8 flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
                      {/* elegant glow */}
                      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                      <div className="space-y-6 w-full">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                            <h4 className="text-base md:text-lg font-black text-white font-sans">
                              {isEn ? "Biochar Fertilizer Process Line" : "축분+과실박 바이오차 비료 시스템 흐름도"}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider select-none">
                            {isEn ? "8-Stage Decentralized Matrix" : "정리 가시화 흐름도 (8단계)"}
                          </span>
                        </div>

                        {/* Interactive flow diagram grid - 2 rows of 4 nodes matching the flow chart carefully! */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                          
                          {/* Flow Step 1 */}
                          <button 
                            onClick={() => setBiocharStep(0)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 0 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 01</span>
                            <span className="text-xs font-black block">{isEn ? "Manure Sludge" : "축분 슬러지"}</span>
                            <span className="text-[9px] text-slate-405 block mt-1 line-clamp-1">{isEn ? "Raw Feedstock Intake" : "유기 부산물 슬러지 진입"}</span>
                          </button>

                          {/* Flow Step 2 */}
                          <button 
                            onClick={() => setBiocharStep(1)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 1 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/5 ring-1 ring-cyan-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 02</span>
                            <span className="text-xs font-black block">{isEn ? "Steam Boiler" : "스팀 보일러"}</span>
                            <span className="text-[9px] text-slate-405 block mt-1 line-clamp-1">{isEn ? "High-pressure Steam" : "초정토 스팀 열원 생성"}</span>
                          </button>

                          {/* Flow Step 3 */}
                          <button 
                            onClick={() => setBiocharStep(2)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 2 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500 text-amber-300 shadow-md shadow-amber-500/5 ring-1 ring-amber-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 03</span>
                            <span className="text-xs font-black block">{isEn ? "Hydrolytic Reactor" : "가수분해열수탱크"}</span>
                            <span className="text-[9px] text-slate-405 block mt-1 line-clamp-1">{isEn ? "Thermal Hydrolysis" : "고압 열수 기질 멸균분해"}</span>
                          </button>

                          {/* Flow Step 4 */}
                          <button 
                            onClick={() => setBiocharStep(3)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 3 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-blue-500 text-blue-305 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 04</span>
                            <span className="text-xs font-black block">{isEn ? "Liquid Storage" : "액상저장탱크"}</span>
                            <span className="text-[9px] text-slate-405 block mt-1 line-clamp-1">{isEn ? "Liquid Fertilizer Tank" : "상동 액체 영양분 저장 수조"}</span>
                          </button>

                          {/* Flow Step 5 */}
                          <button 
                            onClick={() => setBiocharStep(4)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 4 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-orange-500 text-orange-300 shadow-md shadow-orange-500/5 ring-1 ring-orange-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 05</span>
                            <span className="text-xs font-black block">{isEn ? "Sludge Dewatering" : "분말슬러지 탈수탱크"}</span>
                            <span className="text-[9px] text-slate-400 block mt-1 line-clamp-1">{isEn ? "Solid cake separation" : "슬러지 수분 저감 및 압출"}</span>
                          </button>

                          {/* Flow Step 6 */}
                          <button 
                            onClick={() => setBiocharStep(5)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 5 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-yellow-500 text-yellow-300 shadow-md shadow-yellow-500/5 ring-1 ring-yellow-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 06</span>
                            <span className="text-xs font-black block">{isEn ? "Dryer" : "건조기"}</span>
                            <span className="text-[9px] text-slate-400 block mt-1 line-clamp-1">{isEn ? "Moisture Reduction" : "회전형 대풍량 오프건조"}</span>
                          </button>

                          {/* Flow Step 7 */}
                          <button 
                            onClick={() => setBiocharStep(6)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 6 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-violet-500 text-violet-300 shadow-md shadow-violet-500/5 ring-1 ring-violet-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 07</span>
                            <span className="text-xs font-black block">{isEn ? "Auto-Packager" : "자동포장기"}</span>
                            <span className="text-[9px] text-slate-400 block mt-1 line-clamp-1">{isEn ? "Measuring & Bagging" : "정밀 기계식 주머니 밀봉 포장"}</span>
                          </button>

                          {/* Flow Step 8 */}
                          <button 
                            onClick={() => setBiocharStep(7)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              biocharStep === 7 
                                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-lime-500 text-lime-300 shadow-md shadow-lime-500/5 ring-1 ring-lime-500/20' 
                                : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <span className="text-[8px] font-mono font-bold text-slate-500 block mb-1">STAGE 08</span>
                            <span className="text-xs font-black block">{isEn ? "Storage & Pick-Up" : "저장 및 배송"}</span>
                            <span className="text-[9px] text-slate-400 block mt-1 line-clamp-1">{isEn ? "Truck Outbound load" : "고영양 바이오차 비료 출하"}</span>
                          </button>

                        </div>

                        {/* Interactive flow line connection representation */}
                        <div className="h-2 bg-slate-900 border-t border-b border-white/5 relative rounded overflow-hidden select-none">
                          <div className="absolute top-0 bottom-0 left-0 bg-amber-500/40 rounded transition-all duration-500" style={{
                            width: `${(biocharStep + 1) * 12.5}%`
                          }} />
                          <div className="w-full h-full bg-repeating-linear-gradient animate-slide-right opacity-[0.15]" style={{
                            backgroundImage: 'repeating-linear-gradient(90deg, #f59e0b 0px, #f59e0b 6px, transparent 6px, transparent 15px)'
                          }} />
                        </div>

                        {/* Detail Explanatory Card for Selected Step */}
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 relative z-10 transition-all duration-300">
                          {/* Top Segment */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2.5 py-1 bg-amber-950 text-amber-400 text-[10px] font-mono font-bold rounded-lg border border-amber-500/20">
                                STAGE 0{biocharStep + 1}
                              </span>
                              <h5 className="text-sm font-black text-white font-sans">
                                {biocharStep === 0 && (isEn ? "Raw Feedstock / Manure Sludge Intake" : "축분 및 과실박 슬러지 정기 이송단계")}
                                {biocharStep === 1 && (isEn ? "Superheat Steam Boiler System" : "오프그리드 무연 스팀 발전 보일러")}
                                {biocharStep === 2 && (isEn ? "High-pressure Thermo-Chemical Hydrolysis" : "가수분해열수공법 (유기질 전단 멸균)")}
                                {biocharStep === 3 && (isEn ? "High-grade Liquid Fertilizer Storage" : "고순도 액상 비료 임시 저장 라인")}
                                {biocharStep === 4 && (isEn ? "Solid Powder Sludge Dewatering" : "잔존 분말 슬러지 수분 탈수 벨트")}
                                {biocharStep === 5 && (isEn ? "Heat Circulation Rotary Dryer" : "열에너지 순환 복합 건조 가마")}
                                {biocharStep === 6 && (isEn ? "Precision Auto Bag Filling Machine" : "무충전 자력 계량 자동 밀봉 포장")}
                                {biocharStep === 7 && (isEn ? "Eco-LOGIS Distribution & Outbound Transport" : "지속가능 하이브리드 수송 및 유통")}
                              </h5>
                            </div>

                            {/* Dynamically rendered Status */}
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/25 text-emerald-400 font-mono animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              OPERATIONAL
                            </span>
                          </div>

                          {/* Bottom Paragraph with Details */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 items-center animate-fade-in">
                            <div className="md:col-span-8 col-span-12">
                              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                {biocharStep === 0 && (
                                  isEn 
                                    ? "Collects agricultural manure sludge and discarded fruit wastes in local depots. The initial hopper homogenizes sludge sizes before routing."
                                    : "농작 및 축산 과정에서 버려지는 액상 분뇨와 파과, 껍질 찌꺼기 등을 폐쇄 메커니즘 호퍼로 투입하여 기계식 가로 이송장치로 안정 이송하는 환경의 제1 관문입니다."
                                )}
                                {biocharStep === 1 && (
                                  isEn 
                                    ? "Uses the self-generating generator loop to drive a steam boiler, elevating temperatures to feed massive thermal energy continuously."
                                    : "HGE3D00 자가발전 기반의 소비 에너지 극소화 보조 장치로 보일러를 지속 피딩하여 고압 스팀 가스를 현장에서 순수 독립 생산해 냅니다."
                                )}
                                {biocharStep === 2 && (
                                  isEn 
                                    ? "A pair of highly durable spherical reactors cooks the biomass at high pressure, breaking down cell linings instantly to guarantee pasteurization."
                                    : "진한 고온열수가 내부 압력을 타고 고분자를 완전 붕괴시키는 가수분해 구형 챔버로, 장내 유포 악취 미생물을 즉시 멸균 건전화하는 최상위 유닛에 속합니다."
                                )}
                                {biocharStep === 3 && (
                                  isEn 
                                    ? "Separates high-value liquid nutrients into specialized storage barrel systems, destined directly for liquid irrigation networks."
                                    : "가수분해 공정에서 분리된 유체 속 유익 산성 성분들과 미네랄을 다층 튜브에 담아 고품질 보급형 액상 비료 탱크(액비)로 분리 격상 보관합니다."
                                )}
                                {biocharStep === 4 && (
                                  isEn 
                                    ? "Extracts bulk liquid residues and consolidates dry solid cakes. Yields uniform sludge cake preparation before drying."
                                    : "단단히 분리된 분말 전단계 슬러지 고형분 케이크의 압력을 극단적으로 가하여 기계식 회전을 통해 수분 함량을 최적 수준인 40% 미만으로 탈수를 전개합니다."
                                )}
                                {biocharStep === 5 && (
                                  isEn 
                                    ? "Rotary drying chamber rapidly drives off residual humidity using waste heat recovery loops, preparing raw dry biochar powder efficiently."
                                    : "자가발전 열환원 전면 제어로 남은 가마 속 여열을 로터리 건조기로 역류 피딩하여 고효율 저비용 온풍 건조 가마 구동을 현실화합니다."
                                )}
                                {biocharStep === 6 && (
                                  isEn 
                                    ? "Auto weighing loader fills high-density bags securely, sealing organic biochar with zero dust escape into the atmosphere."
                                    : "가혹 먼지 분출을 근절하는 수직 낙하 오토 실링 타워 설비를 적용해, 무충전 제어 전력만으로도 고운 건조형 비료 포대 포장 작업을 균일 자동화해 냅니다."
                                )}
                                {biocharStep === 7 && (
                                  isEn 
                                    ? "Packaged bags are loaded onto transport trucks. Powered off-grid using modular chargers to supply eco-friendly local farms directly."
                                    : "완성된 친환경 프리미엄 바이오차 포대를 상차해 기동 수송차량을 통하여 삼각 농공 유통망(캄보디아, 태국, 베트남 등 글로벌 주산지)으로 당일 순수 가동 출하합니다."
                                )}
                              </p>
                            </div>

                            {/* Micro dashboard dials */}
                            <div className="md:col-span-4 col-span-12 bg-slate-950/50 p-3 rounded-xl border border-white/5 grid grid-cols-2 gap-2 text-center select-none font-mono">
                              <div>
                                <span className="text-[8px] text-slate-500 block">TEMP.</span>
                                <span className="text-[11px] font-bold text-amber-400 font-mono">
                                  {biocharStep === 2 ? "210 °C" : biocharStep === 1 ? "185 °C" : biocharStep === 5 ? "110 °C" : "32 °C"}
                                </span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-500 block">PRESSURE</span>
                                <span className="text-[11px] font-bold text-cyan-400 font-mono">
                                  {biocharStep === 2 ? "18.5 bar" : biocharStep === 1 ? "12.5 bar" : "1.0 bar"}
                                </span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-500 block">MOISTURE</span>
                                <span className="text-[11px] font-bold text-emerald-400 font-mono">
                                  {biocharStep === 0 ? "85 %" : biocharStep === 4 ? "42 %" : biocharStep === 5 ? "8 %" : "12 %"}
                                </span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-500 block">POWER PUMP</span>
                                <span className="text-[11px] font-bold text-rose-450 font-mono animate-pulse">
                                  {biocharStep === 1 ? "0.8 kW" : biocharStep === 2 ? "1.2 kW" : "0.4 kW"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Bottom Footer block representing off-grid independence */}
                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3.5 relative z-10 w-full">
                        <div className="w-10 h-10 rounded-full bg-amber-950/30 border border-amber-400/20 flex items-center justify-center">
                          <Trees className="w-4 h-4 text-amber-400 animate-pulse" />
                        </div>
                        <div className="font-sans font-medium">
                          <span className="text-[9px] font-mono text-slate-500 block tracking-wider uppercase font-bold">DECENTRALIZED AGRI INDEPENDENCE</span>
                          <span className="text-xs font-black text-white">
                            {isEn ? "100% Zero-Grid Biomass Fertilizer Circular Loop" : "무독성 청정 오프그리드 바이오차 비료 자립 생태계 구축"}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {activeIndex === 3 && (
              <div className="col-span-full mt-12 md:mt-18 pt-10 md:pt-16 border-t border-white/10 select-text w-full">
                <HybridMotorcycleAdvancedShowcase language={language} isEn={isEn} />
              </div>
            )}

            {activeIndex === 2 && (
              <div className="col-span-full mt-12 md:mt-18 pt-10 md:pt-16 border-t border-white/10 select-text w-full">
                <EssAdvancedShowcase language={language} isEn={isEn} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
};
