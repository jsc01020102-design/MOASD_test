import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Play, Pause, ArrowLeft, ArrowRight, Cpu, Award, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import original high-resolution local image files
import supercapacitorFactory from '../assets/images/supercapacitor_factory_1781621879548.jpg';
import evAssemblyLine from '../assets/images/ev_assembly_line_1781621897327.jpg';
import generatorAssemblyLine from '../assets/images/generator_assembly_line_1781624380514.jpg';
import samMaterialLab from '../assets/images/sam_material_lab_1781624876856.jpg';


interface SlideItem {
  id: number;
  badge: string;
  badgeIcon: React.ReactNode;
  titleTop: string;
  titleBottom: string;
  description: string;
  accentColor: string;
  bgUrl: string;
  ctaTextFirst: string;
  ctaLinkFirst: string;
  ctaTextSecond: string;
  ctaLinkSecond: string;
  isPanning: boolean; // True to pan past the line in sync with slider progress, false for static image
}

const SLIDE_DURATION = 6000; // 6 seconds per spot

export const MainHeroSlider: React.FC = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const isEn = language === 'en';

  const slides: SlideItem[] = [
    {
      id: 0,
      badge: "RENEWABLE ENERGY & HYBRID SUPERCAPACITOR",
      badgeIcon: <Cpu className="w-3.5 h-3.5 text-cyan-400" />,
      titleTop: isEn ? "Renewable High-Power Revolution" : "신재생에너지 고출력 혁명",
      titleBottom: isEn ? "Hybrid Supercapacitor Cells" : "하이브리드 슈퍼커패시터",
      description: isEn 
        ? "Next-gen grid-tied charging and semi-permanent storage."
        : "태양광·풍력 연계 고속 충전 및 반영구 축전 셀 솔루션",
      accentColor: "cyan-400",
      bgUrl: supercapacitorFactory,
      ctaTextFirst: isEn ? "Solution Specs" : "솔루션 세부스펙",
      ctaLinkFirst: "#services-section",
      ctaTextSecond: isEn ? "Simulate Grid Match" : "모의 에너지 진단",
      ctaLinkSecond: "#simulator-section",
      isPanning: true
    },
    {
      id: 1,
      badge: "ECO SMART EV ASSEMBLY LINE",
      badgeIcon: <Cpu className="w-3.5 h-3.5 text-purple-400" />,
      titleTop: isEn ? "Next-Gen Eco Micro EV" : "친환경 차세대 마이크로 EV",
      titleBottom: isEn ? "E-Mobility Assembly Line" : "전기 모빌리티 조립라인",
      description: isEn 
        ? "Eco-mobility integrated with ultra-density power cells."
        : "고용량 셀 유닛 탑재로 효율을 극대화한 친환경 모빌리티",
      accentColor: "purple-500",
      bgUrl: evAssemblyLine,
      ctaTextFirst: isEn ? "Live Factory Line" : "공장 생산라인 현황",
      ctaLinkFirst: "#simulator-section",
      ctaTextSecond: isEn ? "Partner References" : "협력기업 정보",
      ctaLinkSecond: "#cases-section",
      isPanning: true
    },
    {
      id: 2,
      badge: "HGE3D00 MOBILE HYBRID GENERATOR ASSEMBLY LINE",
      badgeIcon: <Award className="w-3.5 h-3.5 text-amber-500" />,
      titleTop: isEn ? "Anti-Explosion Hybrid Power Unit" : "최신 무폭발 스마트 발전 결합 라인",
      titleBottom: isEn ? "HGE3D00 Generator & ESS" : "HGE3D00 하이브리드 발전기",
      description: isEn 
        ? "Automated production for flagship hybrid generators system."
        : "두현인프라텍의 핵심 기술을 집약한 친환경 발전 양산설비",
      accentColor: "amber-500",
      bgUrl: generatorAssemblyLine,
      ctaTextFirst: isEn ? "View HGE3D00 Specs" : "HGE3D00 사양 보기",
      ctaLinkFirst: "#services-section",
      ctaTextSecond: isEn ? "Simulate Power Output" : "실시간 발전량 시뮬레이션",
      ctaLinkSecond: "#simulator-section",
      isPanning: true
    },
    {
      id: 3,
      badge: "US CAS REGISTERED PATENTED MATERIAL",
      badgeIcon: <Award className="w-3.5 h-3.5 text-emerald-400" />,
      titleTop: isEn ? "Patented Electrode Material" : "독점 분집전 원천 특허 소재",
      titleBottom: isEn ? "Conductive SAM Material" : "고전도성 특허 소재 SAM",
      description: isEn 
        ? "US CAS registered material for maximum conductivity panels."
        : "미국 CAS 공식 등재, 전도 극대화 배터리 원천 소재",
      accentColor: "emerald-400",
      bgUrl: samMaterialLab,
      ctaTextFirst: isEn ? "Submit Proposal" : "기술 정보 제안",
      ctaLinkFirst: "#proposal-section",
      ctaTextSecond: isEn ? "Key Solutions" : "에너지 솔루션",
      ctaLinkSecond: "#services-section",
      isPanning: false
    }
  ];

  const total = slides.length;

  const nextSlide = () => {
    setProgress(0);
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleDotClick = (index: number) => {
    if (index === current) return;
    setProgress(0);
    setCurrent(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 1. Separate highly-stable progress interval
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalTime = 50; // update scale 20 times per second - fluid but overhead safe
    const stepPercent = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + stepPercent;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, current]);

  // 2. Safe Slide Transition Watcher (completely decoupled from state-setter scope)
  useEffect(() => {
    if (progress >= 100) {
      const waitTimer = setTimeout(() => {
        setProgress(0);
        setCurrent((prev) => (prev + 1) % total);
      }, 50);
      return () => clearTimeout(waitTimer);
    }
  }, [progress, total]);

  // Determine current active slide properties
  const activeSlide = slides[current];

  return (
    <section 
      id="hero-section" 
      className="relative w-full h-[82vh] min-h-[640px] md:h-[88vh] md:min-h-[760px] bg-slate-950 overflow-hidden flex items-center select-none"
    >
      {/* Background Image Container with Crossfade & Slide-Specific Panning Alignment */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Background image layer */}
            {activeSlide.isPanning ? (
              // Continuous linear panning from left to right in absolute sync with current progress (from -6% to 6%)
              <div
                className="absolute inset-0 w-[112%] h-full bg-cover bg-center bg-no-repeat transition-transform ease-linear duration-100"
                style={{ 
                  backgroundImage: `url(${activeSlide.bgUrl})`,
                  transform: `translateX(${-6 + (progress * 0.12)}%) scale(1.10)`,
                  left: "-6%",
                  imageRendering: '-webkit-optimize-contrast',
                  filter: 'contrast(1.08) brightness(1.06) saturate(1.03)',
                  referrerPolicy: "no-referrer"
                }}
              />
            ) : (
              // Perfectly fixed/static background without any panning motion as requested for Sector 4
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${activeSlide.bgUrl})`,
                  imageRendering: '-webkit-optimize-contrast',
                  filter: 'contrast(1.08) brightness(1.06) saturate(1.03)',
                  referrerPolicy: "no-referrer"
                }}
              />
            )}

            {/* Industrial Laser Marker grid scan - subtle cyan accent lines on active panning slides */}
            {activeSlide.isPanning && (
              <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-10 flex flex-col justify-between">
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-[1.5px] bg-cyan-500/10 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                />
              </div>
            )}

            {/* Premium Dark Gradients overlay for pristine contrast and high readability with high transparency */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 via-45% to-slate-950/20 z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Static premium geometry mesh background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" />

      {/* Floating interactive visual frames (Classic simple bounds instead of drone telemetry HUD) */}
      <div className="absolute inset-0 z-20 pointer-events-none select-none border border-white/5 m-5 md:m-8 rounded-lg overflow-hidden">
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
      </div>

      {/* Content Panel bounds containing Korean copy strings and actions */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-20 h-full flex flex-col justify-center">
        <div className="max-w-2xl md:max-w-[48%] space-y-4 md:space-y-5 text-left">
          
          {/* Active Sector badge indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/95 border border-white/10 text-[10px] font-mono font-bold tracking-widest text-white shadow-lg"
            >
              {activeSlide.badgeIcon}
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{activeSlide.badge}</span>
            </motion.div>
          </AnimatePresence>

          {/* Slogans and display titles */}
          <div className="space-y-1.5 md:space-y-2">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-2xl sm:text-3xl md:text-[28px] font-black tracking-tight text-white leading-[1.2]"
              >
                <span className="text-slate-300 block text-lg sm:text-xl md:text-[21px] leading-tight mb-1 font-bold">
                  {activeSlide.titleTop}
                </span>
                <span className="block filter drop-shadow-md">
                  <span className={`bg-gradient-to-r ${
                    current === 0 
                      ? 'from-cyan-300 via-cyan-100 to-white' 
                      : current === 1 
                        ? 'from-purple-300 via-pink-200 to-cyan-100' 
                        : current === 2
                          ? 'from-amber-400 via-orange-300 to-white'
                          : 'from-emerald-300 via-cyan-100 to-indigo-100'
                  } bg-clip-text text-transparent font-extrabold block md:inline-block`}>
                    {activeSlide.titleBottom}
                  </span>
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Description Block with clean, borderless typography */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-[13px] text-slate-200 font-medium leading-relaxed max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)] pl-1 pb-1"
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>



        </div>
      </div>

      {/* Bottom Progress Controls Panel bar */}
      <div className="absolute bottom-10 left-0 w-full z-30 px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Active indicators */}
          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="text-cyan-400 font-black text-lg">0{current + 1}</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">0{total}</span>
            <span className="text-slate-400 uppercase tracking-widest pl-4 hidden sm:inline-block border-l border-white/10 font-sans flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>{isEn ? "MOASD Co., Ltd. INTELLIGENT FACTORY SWEEP" : "(주)MOASD INTELLIGENT FACTORY SWEEP"}</span>
            </span>
          </div>

          {/* Consolidated navigation timeline indicators */}
          <div className="flex-1 max-w-md mx-6 hidden md:flex items-center gap-3">
            {slides.map((slide, idx) => (
              <div 
                key={slide.id} 
                onClick={() => handleDotClick(idx)}
                className="flex-1 py-4 cursor-pointer group"
              >
                <div className="flex justify-between items-center text-[10px] pb-1.5 transition-colors font-semibold">
                  <span className={idx === current ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}>
                    SECTOR 0{idx + 1}
                  </span>
                </div>
                <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden transition-all">
                  <div 
                    className={`h-full ${idx === current ? 'bg-cyan-400' : 'bg-transparent'}`}
                    style={{ 
                      width: idx === current ? `${progress}%` : idx < current ? '100%' : '0%',
                      transition: idx === current ? 'none' : 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action trigger controls */}
          <div className="flex items-center gap-3">
            {/* Slider back button */}
            <button
              id="slider-btn-prev"
              onClick={prevSlide}
              className="p-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label={isEn ? "Previous Slide" : "이전 세션"}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Play/Pause toggle */}
            <button
              id="slider-btn-play-pause"
              onClick={togglePlay}
              className="p-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-slate-900 transition-colors flex items-center justify-center cursor-pointer"
              aria-label={isPlaying ? (isEn ? "Pause" : "일시정지") : (isEn ? "Play" : "시작")}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Slider forward button */}
            <button
              id="slider-btn-next"
              onClick={nextSlide}
              className="p-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label={isEn ? "Next Slide" : "다음 세션"}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
