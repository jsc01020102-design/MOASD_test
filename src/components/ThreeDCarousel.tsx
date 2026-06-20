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
  Trees
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const [viewMode, setViewMode] = useState<'image' | 'diagram'>('image');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  useEffect(() => {
    if (activeIndex === 5) {
      setViewMode('diagram');
    } else {
      setViewMode('image');
    }
    setActiveStep(0);
  }, [activeIndex]);

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
        if (targetIdx >= 0 && targetIdx < MOASD_SERVICES.length) {
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
  }, [setControlledActiveIndex]);

  const service = MOASD_SERVICES[activeIndex];
  const serviceTitle = isEn && service.titleEn ? service.titleEn : service.title;
  const serviceSubtitle = isEn && service.subtitleEn ? service.subtitleEn : service.subtitle;
  const serviceDesc = isEn && service.descriptionEn ? service.descriptionEn : service.description;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 select-none flex flex-col items-center">
      
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
            {/* LEFT AREA: Spotlight specifications and product visualization */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 md:p-10 rounded-3xl space-y-6 text-left">
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

                <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight">
                  {serviceTitle}
                </h3>

                <p className="text-sm md:text-[15px] font-bold text-cyan-400 leading-relaxed max-w-2xl">
                  {serviceSubtitle}
                </p>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl pt-1">
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
                    <div className="grid grid-cols-12 gap-3 md:gap-4 items-stretch relative">
                      
                      {/* Vertical line indicator left (represents Chargerates in image) */}
                      <div className="col-span-3 flex flex-col items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                        <span className="text-[8px] font-mono font-bold text-slate-500 block leading-none">Chargerate</span>
                        
                        <div className="flex flex-col gap-1 w-full items-center justify-center">
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
                                className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border transition-all duration-300 flex items-center gap-1 w-full justify-center ${
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
                      <div className="col-span-9 grid grid-cols-2 gap-3 relative">
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
                ) : (
                  // Elegant scientific tech blueprint decoration for non-image services
                  <div className="relative w-full p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/25 to-slate-950/60 overflow-hidden flex flex-col justify-center min-h-[140px] shadow-lg shadow-cyan-950/30">
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

            {/* 🌟 PREMIUM APPLICATION COVER POSTER SHOWCASE: "아담韓" ADAMHAN */}
            {activeIndex === 5 && (
              <div className="col-span-12 mt-12 md:mt-18 pt-10 md:pt-16 border-t border-white/10 select-text">
                
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
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 rounded-3xl border border-white/5 bg-slate-950 p-6 md:p-12 relative overflow-hidden shadow-2xl">
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
                      src="/src/assets/images/adamhan_cabin_house_1781935827590.jpg" 
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
                        src="/src/assets/images/marine_floating_resort_1781936311828.jpg" 
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
                        src="/src/assets/images/floating_glass_cabin_1781936324938.jpg" 
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
                        src="/src/assets/images/floating_villas_row_1781937076057.jpg" 
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
                    <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950 flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
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
                        src="/src/assets/images/farm_cabin_interior_1781936557154.jpg" 
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
                        src="/src/assets/images/luxury_caravan_camper_1781936581515.jpg" 
                        alt="Mobile Explorer Caravan" 
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 text-left bg-gradient-to-t">
                        <p className="text-xs md:text-sm font-black text-white">
                          {isEn ? "Eco Mobile Energy Synergy" : "모든 동력을 자체 자급하는 고부하 캠핑"}
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM LEFT: Large Featured Application Card */}
                    <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-slate-950 overflow-hidden group min-h-[340px] relative shadow-lg">
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-white/10 px-3 py-1 rounded text-[10px] font-mono font-bold text-slate-300">
                        {isEn ? "03 / CORE RECREATIONAL INTEGRATION" : "03 / 농막쉼터·RV 수렴 핵심 성능"}
                      </div>
                      <img 
                        src="/src/assets/images/luxury_caravan_camper_1781936581515.jpg" 
                        alt="High-End Camper RV" 
                        className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-6 text-left bg-gradient-to-t">
                        <p className="text-sm md:text-base font-black text-white leading-tight">
                          {isEn ? "Continuous 220V Out-Of-Grid Feeding" : "한전 선로 가설 없는 무제한 전력 보급 일체"}
                        </p>
                        <p className="text-[11px] md:text-xs text-slate-300 mt-1.5 max-w-2xl font-sans leading-relaxed">
                          {isEn 
                            ? "Complete independence from grid cabling. Powers induction cooktops, heavy air conditioners, hot-water flooring, and camper battery pools with zero refueling noises." 
                            : "시끄러운 야외 내연 발전기 소음과 배기가스 없이 고부하 온수 순환 침상 및 에어컨, 쿡탑 일체를 정숙하게 동시 구동합니다."
                          }
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM RIGHT: Explanatory Block inspired by "이전 concept:" design style */}
                    <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-yellow-500/20 bg-slate-950 flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
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
                              : "전기가 공급되지 않는 오지나 수변 농막, 상시적인 기동성이 요구되는 각종 레저 트레일러에 완전한 자치 에너지를 수여합니다."
                            }
                          </p>
                        </div>

                        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans pt-1">
                          {isEn
                            ? "By avoiding external generators, users enjoy perfect wilderness camp quietness while feeding high-power 220V electronics standard loads dynamically."
                            : "기존의 무겁고 악취나는 정원용 가솔린 발전기를 자가 활성 루프로 대체함으로써 완벽히 정숙한 레저와 위생 공간을 한 번에 성립시킵니다."
                          }
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3.5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-yellow-950/30 border border-yellow-400/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                        </div>
                        <div className="font-sans">
                          <span className="text-[9px] font-mono text-slate-500 block tracking-wider uppercase">CLEAN CAMP ENERGY</span>
                          <span className="text-xs font-black text-white">{isEn ? "Zero Fuel Mobile Life" : "무충전 자가 독립 오프그리드 라이프"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
};
