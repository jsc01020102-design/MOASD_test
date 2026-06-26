import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOASD_SERVICES } from '../data';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  Sliders, 
  Sparkle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ThreeDCarouselProps {
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
}

export const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  activeIndex: controlledActiveIndex,
  setActiveIndex: setControlledActiveIndex
}) => {
  const { language, t } = useLanguage();
  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(0);

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

  // Admin Mode states
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const hasAdminSession = sessionStorage.getItem('moasd_admin_session') !== null;
    const manualToggle = localStorage.getItem('moasd_admin_manual_toggle') === 'true';
    return hasAdminSession || manualToggle;
  });

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

    if (!confirm(isEn ? `Are you sure you want to upload and apply this image (${file.name})?` : `이 이미지(${file.name})를 실제로 업로드하고 적용하시겠습니까?`)) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High-quality canvas compression & auto-downscaling to guarantee performance & bypass localStorage quota limitations
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          
          try {
            const updated = [...services];
            updated[idx] = {
              ...updated[idx],
              imageUrl: compressedBase64
            };
            setServices(updated);
            localStorage.setItem('moasd_custom_services', JSON.stringify(updated));
            alert(isEn 
              ? "🎉 Custom service image uploaded and updated successfully!" 
              : "🎉 맞춤 서비스 이미지가 성공적으로 업로드 및 적용되었습니다.");
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
            alert(isEn
              ? "Storage space full. Please restore default photos on other domains first."
              : "저장 공간 용량이 부족합니다. 다른 영역의 사진을 삭제하거나 초기화한 후 다시 시도해주세요.");
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = (idx: number) => {
    if (confirm(isEn ? "Are you sure you want to delete this image?" : "이 이미지를 정말로 삭제하시겠습니까?")) {
      try {
        const updated = [...services];
        const newService = { ...updated[idx] };
        delete newService.imageUrl;
        updated[idx] = newService;
        setServices(updated);
        localStorage.setItem('moasd_custom_services', JSON.stringify(updated));
        alert(isEn 
          ? "🎉 Image deleted successfully and reset to default." 
          : "🎉 이미지가 성공적으로 삭제되었으며 기본 이미지로 초기화되었습니다.");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const service = services[activeIndex];
  const serviceTitle = isEn && service.titleEn ? service.titleEn : service.title;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 select-none flex flex-col items-center">
      
      {/* Chapter Segmented Navigation Pill List for Easy Chapter Navigation */}
      <div className="w-full flex justify-center mb-10 flex-wrap gap-2.5">
        {services.map((serv, idx) => {
          const isActive = idx === activeIndex;
          let label = isEn ? serv.titleEn : serv.title;
          
          // Shorten labels on buttons for visual polish
          if (serv.id === 'hybrid-supercapacitor') label = isEn ? 'Power Bank' : '파워뱅크';
          else if (serv.id === 'electric-bicycle') label = isEn ? 'E-Bicycle' : '자가충전 전기자전거';
          else if (serv.id === 'electric-motorcycle') label = isEn ? 'Hybrid Motorcycle' : '하이브리드 이륜차';
          else if (serv.id === 'sam-new-material') label = isEn ? 'SAM Materials' : 'SAM 신소재';
          else if (serv.id === 'hybrid-generator') label = isEn ? 'HGE3D00 Gen' : 'HGE3D00 발전기';

          return (
            <button
              key={serv.id}
              id={`solution-nav-btn-${idx}`}
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
            <Sparkle className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              {isEn ? "Interactive Solution Image Console" : "대화형 솔루션 이미지 전용 뷰어"}
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
                ? "Manage high-fidelity solution images. Supports real-time Upload, Modification, and Deletion." 
                : "모든 솔루션 항목의 실물 전면 고품질 이미지만 노출되며, 이미지 업로드, 수정 및 삭제 기능을 실시간 지원합니다."}
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

      {/* Main High-Fidelity 2-Column Showcase Layout */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* LEFT COLUMN: Specifications & Product Description (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col space-y-6 text-left bg-slate-900/10 border border-white/5 rounded-3xl p-6 sm:p-8 select-text">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md">
                  0{activeIndex + 1} / {isEn ? 'CORE PORTFOLIO' : '핵심 포트폴리오'}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-cyan-500/10 bg-cyan-950/20 text-[10px] font-bold text-cyan-400">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  IMPACT {service.impactScore}%
                </div>
              </div>

              {/* Main Titles */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                  {serviceTitle}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-sans">
                  {isEn ? service.subtitleEn : service.subtitle}
                </p>
              </div>

              {/* Description block */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-l-2 border-cyan-500/30 pl-4 py-0.5">
                {isEn ? service.descriptionEn : service.description}
              </p>

              {/* Conditional Content Layout specifically optimized for Power Bank (index 0) */}
              {activeIndex === 0 ? (
                <>
                  {/* 1. 제품 특징 (Product Features) */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      {isEn ? "Product Features" : "제품 특징"}
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex gap-3 items-start">
                        <span className="text-cyan-400 text-xs mt-0.5">⚡</span>
                        <p className="text-xs font-semibold text-slate-200 leading-normal">
                          {isEn ? "Powerful output performance of Power Capacitor" : "Power Capacitor의 강력한 파워 구현"}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex gap-3 items-start">
                        <span className="text-cyan-400 text-xs mt-0.5">📉</span>
                        <p className="text-xs font-semibold text-slate-200 leading-normal">
                          {isEn ? "Sustained high power without voltage drops until end-of-discharge" : "방전 종지시까지 전압 저하 없이 살아있는 파워"}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex gap-3 items-start">
                        <span className="text-cyan-400 text-xs mt-0.5">🌱</span>
                        <p className="text-xs font-semibold text-slate-200 leading-normal">
                          {isEn ? "Contributes to earth preservation with over 10+ years of long lifespan" : "10년 이상의 장수명으로 지구 환경 보호에 기여"}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex gap-3 items-start">
                        <span className="text-cyan-400 text-xs mt-0.5">⚖️</span>
                        <p className="text-xs font-semibold text-slate-200 leading-normal">
                          {isEn ? "Maximized mobility convenience via lightweight & compact design" : "경량 무게 및 콤팩트한 디자인으로 이동 편의성 극대화"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주요 스펙 (Key Specifications) */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      {isEn ? "Technical Specifications" : "주요 스펙"}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                      <div className="space-y-0.5 border-r border-b border-white/5 pb-2 pr-2">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Fast Charge" : "초고속 충전"}
                        </p>
                        <p className="text-xs font-bold text-white leading-tight">
                          {isEn ? "Within ~1 hr (Solar/Charger)" : "약 1시간 이내 (충전기/태양광)"}
                        </p>
                      </div>
                      <div className="space-y-0.5 border-b border-white/5 pb-2 pl-2">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Capacity" : "용량"}
                        </p>
                        <p className="text-xs font-bold text-cyan-400 leading-tight">1,000W</p>
                      </div>
                      <div className="space-y-0.5 border-r border-b border-white/5 py-2 pr-2">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Charging Input" : "충전 사양"}
                        </p>
                        <p className="text-xs font-bold text-white leading-tight">25.2V 40A</p>
                      </div>
                      <div className="space-y-0.5 border-b border-white/5 py-2 pl-2">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Discharge Output" : "방전 사양"}
                        </p>
                        <p className="text-xs font-bold text-white leading-tight">
                          220V 1kW / USB A-C Max 100W
                        </p>
                      </div>
                      <div className="space-y-0.5 border-r border-white/5 pt-2 pr-2">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Cycle Life" : "충방전 횟수"}
                        </p>
                        <p className="text-xs font-bold text-cyan-400 leading-tight">20,000{isEn ? " Cycles" : "회"}</p>
                      </div>
                      <div className="space-y-0.5 pt-2 pl-2">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Weight" : "무게"}
                        </p>
                        <p className="text-xs font-bold text-white leading-tight">10kg</p>
                      </div>
                      <div className="space-y-0.5 border-r border-t border-white/5 pt-2 pr-2 mt-2 col-span-1">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Warranty & Life" : "A/S 및 수명"}
                        </p>
                        <p className="text-xs font-bold text-white leading-tight">
                          {isEn ? "6M Free / 20Y Life" : "6개월 무상 / 기대수명 20년"}
                        </p>
                      </div>
                      <div className="space-y-0.5 border-t border-white/5 pt-2 pl-2 mt-2 col-span-1">
                        <p className="text-[10px] text-slate-500 font-bold font-sans uppercase">
                          {isEn ? "Color Lineup" : "컬러 라인업"}
                        </p>
                        <p className="text-[11px] font-bold text-slate-300 leading-tight">
                          {isEn ? "Blue, Red, Pastel Green/Blue" : "블루, 레드, 파스텔그린/블루 외"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Generic Dynamic Benefits / Features layout for other active indices */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      {isEn ? "Key Benefits" : "핵심 이점"}
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {(isEn ? service.benefitsEn : service.benefits)?.map((benefit: string, bIdx: number) => (
                        <div key={bIdx} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex gap-3 items-start">
                          <span className="text-cyan-400 text-xs mt-0.5">✔</span>
                          <p className="text-xs font-semibold text-slate-200 leading-normal">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      {isEn ? "Technical Features" : "주요 특징 및 규격"}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                      {(isEn ? service.featuresEn : service.features)?.map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="text-xs text-slate-300 flex items-start gap-2 py-1 border-b border-white/5 last:border-b-0">
                          <span className="text-cyan-400">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT COLUMN: Interactive High-Fidelity Image Plate (lg:col-span-7) */}
            <div className="lg:col-span-7 w-full border border-white/5 bg-slate-900/15 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col space-y-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header inside the image container */}
              <div className="flex items-center justify-between p-1.5 bg-slate-950/80 border border-white/5 rounded-xl w-full">
                <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-cyan-400">
                  📸 {isEn ? "Showcase Screen" : "실물 이미지 전시관"}
                </div>
                <div className="px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-[9px] font-mono font-bold text-cyan-400 tracking-wider">
                  {service.imageUrl === MOASD_SERVICES[activeIndex]?.imageUrl 
                    ? (isEn ? "DEFAULT" : "기본 원본") 
                    : (isEn ? "CUSTOM UPLOAD" : "사용자 업로드")}
                </div>
              </div>

              {/* Centered Image Card */}
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-slate-950/90 to-slate-900 flex items-center justify-center p-4">
                {/* Sub-atmospheric subtle glow */}
                <div className="absolute inset-0 bg-radial-at-c from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
                
                {service.imageUrl ? (
                  <img 
                    src={service.imageUrl} 
                    alt={serviceTitle}
                    className="w-full h-full object-contain filter brightness-105 contrast-105 hover:scale-[1.02] transition-transform duration-700 select-all"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <Upload className="w-12 h-12 text-slate-600 animate-pulse" />
                    <p className="text-sm font-bold text-slate-400">
                      {isEn ? "No Image Loaded" : "등록된 이미지가 없습니다. 아래에서 이미지를 업로드해 주세요."}
                    </p>
                  </div>
                )}
              </div>

              {/* Image control panel (Upload, Modify, Delete) */}
              <div className="flex flex-wrap items-center justify-end gap-3 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                <span className="text-xs font-mono text-slate-400 mr-auto pl-2 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                  {isEn ? "ACTIONS:" : "편집 기능:"}
                </span>
                
                {/* 1. Upload Button */}
                <label className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 hover:text-cyan-300 text-xs font-black flex items-center gap-2 cursor-pointer border border-cyan-500/30 transition-all active:scale-95">
                  <Upload className="w-4 h-4" />
                  {isEn ? "Upload" : "업로드"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(activeIndex, e)} 
                  />
                </label>

                {/* 2. Modify Button */}
                <label className="px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 hover:text-purple-300 text-xs font-black flex items-center gap-2 cursor-pointer border border-purple-500/30 transition-all active:scale-95">
                  <RefreshCw className="w-4 h-4" />
                  {isEn ? "Replace" : "수정"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(activeIndex, e)} 
                  />
                </label>

                {/* 3. Delete Button */}
                {service.imageUrl && (
                  <button
                    onClick={() => handleImageDelete(activeIndex)}
                    className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 hover:text-red-300 text-xs font-black flex items-center gap-2 cursor-pointer border border-red-500/30 transition-all active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    {isEn ? "Delete" : "삭제/원복"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
};
