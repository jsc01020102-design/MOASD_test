import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Battery, 
  Cpu, 
  CheckCircle, 
  Layers, 
  Activity, 
  Gauge, 
  Bike, 
  Sparkles, 
  RefreshCw, 
  Shield, 
  TrendingUp, 
  ChevronRight, 
  Sliders,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface EssAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const EssAdvancedShowcase: React.FC<EssAdvancedShowcaseProps> = ({ language, isEn }) => {
  // Simulator state: Speed in km/h
  const [speed, setSpeed] = useState<number>(30);
  const [activeCellType, setActiveCellType] = useState<'cylinder' | 'pouch'>('cylinder');
  const [activeTab, setActiveTab] = useState<'intro' | 'features' | 'bike'>('intro');

  // Compute values based on e-bike simulation speed
  // At 30 km/h, generation is 1:1 with consumption (e.g., 500W consumption, 500W generation)
  const motorConsumption = Math.round(speed * 16.67); // linear consumption up to 750W
  // Front wheel generation is non-linear, peaking around 30 km/h and stabilizing
  const generatorProduction = speed === 0 ? 0 : Math.round(500 * Math.sin((speed / 30) * (Math.PI / 2)));
  const netDraw = motorConsumption - generatorProduction;
  const isEquilibrium = speed === 30;

  // Efficiency of power return
  const efficiency = motorConsumption === 0 ? 0 : Math.min(100, Math.round((generatorProduction / motorConsumption) * 100));

  return (
    <div className="w-full space-y-12 select-text pt-4" id="ess-advanced-showcase">
      {/* Scrollable Flow Header Guide */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900/60 border border-white/5 rounded-2xl p-4 md:p-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="text-left font-sans">
            <span className="text-[10px] text-cyan-450 font-bold block uppercase tracking-widest leading-none mb-1">
              SUPER_CAPACITOR ENERGY MODULE
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {isEn 
                ? "Scroll and interact to explore the revolutionary electrostatic physical energy storage system." 
                : "세포 수준의 물리 흡착식 하이브리드 슈퍼커패시터와 자체충전 자가발전 루프 기술을 직접 탐색해보세요."}
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {(['intro', 'features', 'bike'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                activeTab === tab 
                  ? 'bg-cyan-500/10 text-cyan-450 border-cyan-500/30 shadow-inner shadow-cyan-500/10' 
                  : 'bg-slate-950/40 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {tab === 'intro' ? (isEn ? 'Core Mechanism' : '원천기술 기작') :
               tab === 'features' ? (isEn ? '5 Key Merits' : '5대 핵심장점') :
               (isEn ? 'Self-Charging Bike' : '자체충전 전기자전거')}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Box: Text and Details (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-slate-900/30 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 animate-pulse" /> {isEn ? 'PHYSICAL ELECTROSTATIC BATTERY' : '화학전지가 아닌 혁신적 물리전지'}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {isEn ? 'Graphene Hybrid Supercapacitor' : '하이브리드 슈퍼커패시터?'}
                </h3>
                
                <p className="text-[13.5px] text-slate-300 font-medium leading-relaxed">
                  {isEn 
                    ? "A supercapacitor is an elite, high-efficiency power device engineered to instantly charge and discharge even microscopic current levels. Unlike legacy chemical batteries that trigger slow phase changes, it utilizes static double-layer physical ion transport and rapid surface electrochemical reactions directly at the boundary of specialized nano-graphene electrodes."
                    : "슈퍼커패시터는 미세전류까지 즉각적으로 급속 충전 및 급속 방전하는 최고 수준의 고효율 전력 디바이스입니다. 화학적 열화 변화를 수반하는 기존 배터리와 달리, 특수 가공된 나노 탄소 활성탄 전극과 전해질 경계층에서의 기하급수적이고 직접적인 물리적 이온 이동 메커니즘을 적극 활용합니다."}
                </p>

                <p className="text-[13px] text-slate-400 leading-relaxed">
                  {isEn
                    ? "By incorporating Graphene activated carbon as its primary substrate, this green physical storage system features a semi-permanent cycle life, withstanding tens to hundreds of thousands of cycles. When coupled with volatile renewable energy generators (solar, wind), it instantly absorbs or releases grid power gaps, guaranteeing unprecedented power quality."
                    : "원천 소재로 그래핀 탄소 활성탄을 전사 도포함으로써 친환경성을 보증하며, 수만에서 수십만 번에 걸친 무열화 충방전 수명을 유지합니다. 순간 맥동 파형이 잦은 태양광, 풍력 발전 시스템에 병렬 결합 시, 발전 전력과 부하 전력의 순간 교란 편차를 100% 흡수·방출해 계통 전력 품질 안정화에 절대적으로 기여합니다."}
                </p>
              </div>

              {/* Molecular Adsorption Layer details (In Korean Slide: "전자/이온 흡착율 개선") */}
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-5 space-y-3 shadow-xl">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> 
                  {isEn ? "Advanced Multi-Component Atomic Adsorption Layer" : "원자급 전자/이온 흡착율 대폭 개선 특허 공법"}
                </h4>
                <p className="text-[12px] text-slate-300 leading-relaxed">
                  {isEn
                    ? "Features a synergistic integration of 9 distinct element modifiers (Nickel, Manganese, Cobalt, Sulfur, Barium, etc.) stabilized alongside Malonic Acid, Graphite, and Graphene. Improves charge retention density by creating a pure physical-electrostatic double storage layer."
                    : "니켈, 망간, 코발트, 황, 바륨 등 총 9종의 복합 전이 금속 산화 활성 물질과 말론산 유도체, 흑연 그래핀의 다차원 입자 가교 결합을 성취했습니다. 단순 화학 전지의 한계를 극복한 나노 단위 물리적 전하 흡착 면적의 비약적 향상 특허 기술입니다."}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Nickel', 'Manganese', 'Cobalt', 'Sulfur', 'Barium', 'Malonic Acid', 'Graphite', 'Graphene'].map((material, idx) => (
                    <span key={idx} className="text-[9.5px] font-mono bg-slate-900 border border-white/5 text-slate-450 px-2 py-0.5 rounded-md">
                      {isEn ? material : (
                        material === 'Nickel' ? '니켈' :
                        material === 'Manganese' ? '망간' :
                        material === 'Cobalt' ? '코발트' :
                        material === 'Sulfur' ? '황' :
                        material === 'Barium' ? '바륨' :
                        material === 'Malonic Acid' ? '말론산' :
                        material === 'Graphite' ? '흑연' : '그래핀'
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Cylinder vs Pouch interactive cell visual (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/30 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {isEn ? 'Form Factors' : '제품 규격 형태 분류'}
                  </h4>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveCellType('cylinder')}
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded transition-all border cursor-pointer ${
                        activeCellType === 'cylinder'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/35'
                          : 'bg-transparent text-slate-550 border-transparent hover:text-slate-350'
                      }`}
                    >
                      {isEn ? 'Cylinder' : '실린더형'}
                    </button>
                    <button
                      onClick={() => setActiveCellType('pouch')}
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded transition-all border cursor-pointer ${
                        activeCellType === 'pouch'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-400/35'
                          : 'bg-transparent text-slate-550 border-transparent hover:text-slate-350'
                      }`}
                    >
                      {isEn ? 'Pouch' : '파우치형'}
                    </button>
                  </div>
                </div>

                <div className="h-64 flex items-center justify-center bg-slate-950/60 border border-white/5 rounded-xl p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none" />
                  
                  {activeCellType === 'cylinder' ? (
                    /* Interactive Cylinder SVG */
                    <motion.div
                      key="cylinder"
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center space-y-3"
                    >
                      <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                        {/* Outer cylinder casing */}
                        <path d="M 40 40 L 40 120 A 40 10 0 0 0 120 120 L 120 40 Z" fill="url(#cyl-body)" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.4" />
                        {/* Top cap */}
                        <ellipse cx="80" cy="40" rx="40" ry="10" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1.5" />
                        {/* Terminal pin */}
                        <ellipse cx="80" cy="35" rx="10" ry="3" fill="#22d3ee" />
                        <rect x="75" y="30" width="10" height="6" fill="#22d3ee" rx="1" />
                        
                        {/* Wound core interior showing layers */}
                        <path d="M 45 42 L 45 110 A 35 8 0 0 0 115 110 L 115 42 Z" fill="url(#cyl-core)" opacity="0.6" />
                        
                        {/* Electrostatic flow lines */}
                        <path d="M 40 60 A 40 10 0 0 0 120 60" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_8s_linear_infinite]" />
                        <path d="M 40 80 A 40 10 0 0 0 120 80" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_6s_linear_infinite]" />
                        <path d="M 40 100 A 40 10 0 0 0 120 100" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_4s_linear_infinite]" />

                        <defs>
                          <linearGradient id="cyl-body" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#082f49" />
                            <stop offset="30%" stopColor="#0c4a6e" />
                            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0369a1" />
                          </linearGradient>
                          <linearGradient id="cyl-core" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="50%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <div className="text-center font-sans space-y-0.5">
                        <span className="text-[11px] font-mono font-bold text-cyan-400 block uppercase tracking-wider">{isEn ? 'High-Power Cylinder' : '실린더형 슈퍼콘덴서'}</span>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          {isEn ? 'Max Frequency & Surge Absorption' : '대용량 보조발전·고출력 서지 분산형'}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Interactive Pouch SVG */
                    <motion.div
                      key="pouch"
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center space-y-3"
                    >
                      <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-[0_0_15px_rgba(192,132,252,0.15)]">
                        {/* Left terminal tab */}
                        <rect x="45" y="15" width="16" height="25" fill="#c084fc" stroke="#a855f7" strokeWidth="1" />
                        <line x1="53" y1="20" x2="53" y2="35" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
                        <text x="50" y="27" fontSize="5" fontFamily="monospace" fill="#000000" fontWeight="bold">+</text>
                        
                        {/* Right terminal tab */}
                        <rect x="99" y="15" width="16" height="25" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                        <line x1="107" y1="20" x2="107" y2="35" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
                        <text x="105" y="27" fontSize="5" fontFamily="monospace" fill="#000000" fontWeight="bold">-</text>

                        {/* Flat Pouch Casing */}
                        <rect x="35" y="35" width="90" height="95" rx="6" fill="url(#pouch-body)" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.4" />
                        {/* Inner pouch layering layout */}
                        <g opacity="0.8">
                          <rect x="42" y="45" width="76" height="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.5" />
                          <rect x="42" y="55" width="76" height="6" fill="#311042" stroke="#d8b4fe" strokeWidth="0.5" />
                          <rect x="42" y="65" width="76" height="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.5" />
                          <rect x="42" y="75" width="76" height="6" fill="#311042" stroke="#d8b4fe" strokeWidth="0.5" />
                          <rect x="42" y="85" width="76" height="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.5" />
                          <rect x="42" y="95" width="76" height="6" fill="#311042" stroke="#d8b4fe" strokeWidth="0.5" />
                        </g>

                        {/* Particle dots flowing to show physical adsorption */}
                        <circle cx="50" cy="48" r="1" fill="#c084fc" className="animate-ping" />
                        <circle cx="110" cy="58" r="1" fill="#818cf8" className="animate-ping" />
                        <circle cx="50" cy="78" r="1" fill="#c084fc" className="animate-ping" />
                        <circle cx="110" cy="88" r="1" fill="#818cf8" className="animate-ping" />

                        <defs>
                          <linearGradient id="pouch-body" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2e1065" />
                            <stop offset="50%" stopColor="#4c1d95" />
                            <stop offset="100%" stopColor="#1e1b4b" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <div className="text-center font-sans space-y-0.5">
                        <span className="text-[11px] font-mono font-bold text-purple-400 block uppercase tracking-wider">{isEn ? 'Ultra-Slim Flat Pouch' : '파우치형 슈퍼콘덴서'}</span>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          {isEn ? 'High Volumetric Density & Slim Fit' : '스마트 모빌리티·차체 전용 고효율 하우징'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Graphic Footnote (In Korean Slide: "전자/이온 이중층 물리반응 방식 설명") */}
              <div className="bg-slate-950/40 border border-white/5 rounded-xl p-4 mt-4 text-left">
                <span className="text-[9px] font-mono text-cyan-400 font-bold block uppercase tracking-widest mb-1">
                  {isEn ? 'THE NEW PARADIGM OVER legacy BATTERY' : '슈퍼콘덴서형 전력 순환 패러다임'}
                </span>
                <p className="text-[11px] text-slate-450 leading-relaxed font-medium">
                  {isEn
                    ? "Instead of forcing slow atomic chemical phase shifts, electrostatic charges dynamically activate and bind to both electrodes physically, realizing extremely rapid charge/discharge cycles."
                    : "일반 화학전지처럼 화합물 상변화 과정의 시간 지연 없이, 전원의 인가에 따라 (+)단과 (-)단 양측에 전하가 물리적 흡착 이중층을 신속 구성해 최속의 고전환 루프를 영속 유지합니다."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Slide 1: 5 Key Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'out',
                  title: isEn ? '01. Stable High Output' : '01. 안정적 출력 보장',
                  val: isEn ? 'Unfluctuating Cut-off' : '종지전압까지 정밀 유지',
                  desc: isEn 
                    ? 'Sustains a continuous, flat power curve all the way down to the final cut-off voltage without sagging.'
                    : '전력 에너지가 완전히 소모되는 종지전압 임계까지 도달시점 편차 없이 일정한 정량 전압·출력을 영구 제공합니다.',
                  icon: TrendingUp,
                  color: 'text-amber-400',
                  bg: 'border-amber-400/20 bg-amber-950/10'
                },
                {
                  id: 'charge',
                  title: isEn ? '02. Ultra-Fast Charge' : '02. 압도적 초급속 충전',
                  val: isEn ? '3x+ Faster Charging' : '충전속도 최소 3배 가속',
                  desc: isEn
                    ? 'Charges 300% faster than legacy electrochemical lithium cells, enabling swift turnarounds.'
                    : '물리적 전하 이중층 직접 흡착 기작을 가동하여 기존 고성능 리튬이온 배터리 대비 최소 3배 이상 단축 충전을 완수합니다.',
                  icon: Zap,
                  color: 'text-cyan-400',
                  bg: 'border-cyan-400/20 bg-cyan-950/10'
                },
                {
                  id: 'slim',
                  title: isEn ? '03. Scalable Form Factor' : '03. 제품의 극적 경량화',
                  val: isEn ? '1/3 Volume Reduced' : '리튬이온 대비 부피 1/3',
                  desc: isEn
                    ? 'Shaves 66% of physical volume compared to lithium batteries, making space for larger load integrations.'
                    : '에너지 밀도 대비 중적 공간 부피를 기존 리튬 계열 유기 배터리의 3분의 1 수준으로 다이어트해 컴팩트 하우징을 지원합니다.',
                  icon: Layers,
                  color: 'text-purple-400',
                  bg: 'border-purple-400/20 bg-purple-950/10'
                },
                {
                  id: 'safe',
                  title: isEn ? '04. Ultimate Safety' : '04. 가혹 환경 최고 안전성',
                  val: isEn ? 'Explosion-Proof Matrix' : '폭발 화재 위험 전면 제거',
                  desc: isEn
                    ? 'Solves chemical thermal runaway explosion risks of lithium-ion, and low-temperature charging errors of LFP.'
                    : '액체 가교 전해질 열폭주 폭발 위험이 없으며, 인산철 배터리의 극한 혹한 저온 영역 충전 불량 상태를 무결점 교정합니다.',
                  icon: Shield,
                  color: 'text-emerald-400',
                  bg: 'border-emerald-400/20 bg-emerald-950/10'
                },
                {
                  id: 'life',
                  title: isEn ? '05. Semi-Permanent Life' : '05. 반영구 수명 보장',
                  val: isEn ? '5x Cycles & 3x Lifetime' : '5배 충방전 & 3배 수명 보장',
                  desc: isEn
                    ? 'Guarantees over 5x standard charge/discharge cycles and 3x longer operational lifespan.'
                    : '전하의 단순 탈착 방식을 채용하여 배터리 수명 열화가 없으므로 5배 이상의 충방전 사이클과 3배 이상의 기기 가동 수명을 보증합니다.',
                  icon: RefreshCw,
                  color: 'text-blue-400',
                  bg: 'border-blue-400/20 bg-blue-950/10'
                }
              ].map((merit) => {
                const Icon = merit.icon;
                return (
                  <div key={merit.id} className={`flex flex-col justify-between border rounded-xl p-5 space-y-4 hover:bg-slate-900/40 transition-all ${merit.bg}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{merit.title}</span>
                        <Icon className={`w-4 h-4 ${merit.color}`} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-black text-white block tracking-tight leading-tight">{merit.val}</span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium text-left">{merit.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Metric Contrast Table (In Korean Slide: "리튬이온 vs 하이브리드 슈퍼커패시터 비교") */}
            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 text-left">
                <div className="w-1.5 h-3.5 bg-cyan-400 rounded-full" />
                <h4 className="text-sm font-bold text-white tracking-tight uppercase">
                  {isEn ? "Supercapacitor vs Legacy Lithium-Ion Contrast Metric" : "하이브리드 슈퍼커패시터 vs 기존 리튬이온 전지 정량 분석"}
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-450">
                      <th className="py-3 px-4 uppercase font-bold tracking-wider">{isEn ? 'Technical Metric' : '기술적 평가지표'}</th>
                      <th className="py-3 px-4 uppercase font-bold text-cyan-400 tracking-wider">{isEn ? 'Graphene Supercapacitor' : '하이브리드 슈퍼커패시터 (당사)'}</th>
                      <th className="py-3 px-4 uppercase font-bold text-slate-400 tracking-wider">{isEn ? 'Legacy Lithium-Ion (NMC)' : '기존 리튬이온 이차전지 (대조군)'}</th>
                      <th className="py-3 px-4 uppercase font-bold text-slate-500 tracking-wider">{isEn ? 'Traditional LFP' : '일반 리튬인산철 (대조군)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-bold">{isEn ? 'Charge Speed' : '충전 가속 속도'}</td>
                      <td className="py-3.5 px-4 font-black text-cyan-400">{isEn ? 'Under 10 Mins (3x+ Fast)' : '10분 이내 (3배 이상 초고속)'}</td>
                      <td className="py-3.5 px-4 text-slate-400">{isEn ? '30 ~ 60 Mins' : '30분 ~ 1시간'}</td>
                      <td className="py-3.5 px-4 text-slate-450">{isEn ? '40 ~ 90 Mins' : '40분 ~ 1.5시간'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-bold">{isEn ? 'Lifespan Cycles' : '보장 충방전 사이클 수명'}</td>
                      <td className="py-3.5 px-4 font-black text-cyan-400">{isEn ? '100,000+ Cycles (5x+)' : '100,000회+ 이상 (5배+)'}</td>
                      <td className="py-3.5 px-4 text-slate-400">{isEn ? '1,500 ~ 2,000 Cycles' : '1,500 ~ 2,000회'}</td>
                      <td className="py-3.5 px-4 text-slate-450">{isEn ? '3,000 ~ 4,500 Cycles' : '3,000 ~ 4,500회'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-bold">{isEn ? 'Volumetric Scale' : '동일 전하 축적 공간 부피'}</td>
                      <td className="py-3.5 px-4 font-black text-cyan-400">{isEn ? '1/3 Scale Shaved' : '부피 3분의 1 수준 감소'}</td>
                      <td className="py-3.5 px-4 text-slate-400">{isEn ? '1.0x Baseline' : '기준치 1.0배 (벌크)'}</td>
                      <td className="py-3.5 px-4 text-slate-450">{isEn ? '1.2x Bulkier' : '인산철 대비 1.2배 부피가 큼'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-bold">{isEn ? 'Low-Temp Performance' : '영하 20도 극한 환경 출력 수율'}</td>
                      <td className="py-3.5 px-4 font-black text-cyan-400">{isEn ? '95%+ Retained' : '95% 이상 안정 출력 보장'}</td>
                      <td className="py-3.5 px-4 text-slate-400">{isEn ? '65% ~ 70% Sag' : '65% ~ 70% 수준으로 출력 급강하'}</td>
                      <td className="py-3.5 px-4 text-slate-450">{isEn ? '50% ~ 60% Critical' : '50% 이하 충전불량 및 방전위험'}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-bold">{isEn ? 'Thermal Overrun Safety' : '셀 쇼트 시 물리 화학적 폭발'}</td>
                      <td className="py-3.5 px-4 font-black text-cyan-400">{isEn ? '0% Risk (No Explosion)' : '열폭주 현상 제로 (폭발 무결 차단)'}</td>
                      <td className="py-3.5 px-4 text-slate-400">{isEn ? 'High Runaway Risk' : '발열 쇼트 시 즉시 발화 폭발'}</td>
                      <td className="py-3.5 px-4 text-slate-450">{isEn ? 'Medium Fire Risk' : '중간 등급 가스 분출 및 미세기공 파손'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'bike' && (
          <motion.div
            key="bike"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Slide 2: E-Bike Core Introduction */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left E-Bike Description Cards (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/30 border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-widest bg-purple-950/40 border border-purple-400/20 px-3 py-1 rounded-full">
                    <Bike className="w-3.5 h-3.5" /> {isEn ? 'SELF-CHARGING E-MOBILITY' : '획기적인 자체충전 자가발전 공법'}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {isEn ? 'Self-Charging E-Bicycle' : '자체충전 전기자전거'}
                  </h3>

                  <div className="space-y-3 pt-2">
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        {isEn
                          ? "Traditional electric bicycles typically travel around 50km on a single full charge and must stop to plug in and manually recharge the battery."
                          : "기존의 일반 전기자전거는 1회 수전 충전으로 약 50km 내외를 주행하고 배터리가 소진되면 다시 고정식 전원을 찾아 플러그를 꽂아 충전해야만 합니다."}
                      </p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                        {isEn
                          ? "Our proprietary self-charging electric bicycle mounts motor/generators on its wheels, combining with a closed-loop generation system to achieve a revolutionary range of over 100km on a single charge."
                          : "반면 당사의 자체충전 전기자전거는 앞뒤 휠셋 전체에 브러시리스 모터 및 발전 인터페이스를 입체 포지셔닝하고, 자체발전시스템(2kW/h 규격 자체 소형화 탑재)을 연계하여 1회 수전 충전으로도 무려 100km 이상의 연속 주행을 달성하는 전례 없는 발명품입니다."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical highlight summary */}
                <div className="bg-slate-950/70 border border-purple-950/50 rounded-xl p-5 space-y-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                    <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider">{isEn ? 'Self-Generating Closed-Loop' : '자가발전 순환시스템 기작'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {isEn
                      ? "Energy stored in the supercapacitor battery drives the rear-wheel motor. Simultaneously, the rotation of the front wheel activates an integrated compact generator to manufacture fresh power, constantly feedback-charging the supercapacitor battery in a perfect closed loop."
                      : "배터리에 비축된 전기에너지로 뒷바퀴 모터를 구동하여 주행하는 동안, 앞바퀴가 물리적으로 자동 회전하면서 일체 결착된 초소형 자가 발전기 시스템을 연속 가동시킵니다. 회전 관성이 생산해 낸 풍부한 전기를 미세전류 충전 효율이 극대화된 슈퍼커패시터 배터리로 실시간 복구 환류해 순환 충전합니다."}
                  </p>
                </div>
              </div>

              {/* Right Interactive Simulator Box (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/30 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest block mb-0.5">E-MOBILITY LIVE FEEDBACK</span>
                      <h4 className="text-sm font-black text-white">{isEn ? 'Self-Charging Equilibrium Simulator' : '자가발전 및 충방전 실시간 순환 제어 시뮬레이터'}</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-white/10">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[11px] font-mono text-white font-bold">{speed} km/h</span>
                    </div>
                  </div>

                  {/* Simulator Controls & Metric Displays */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Left: Dynamic SVG diagram showing active feedback flow */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center bg-slate-950/80 border border-white/5 rounded-xl p-4 h-56 relative">
                      {/* Diagram representation of bicycle feedback */}
                      <svg viewBox="0 0 200 120" className="w-full h-full">
                        {/* Frame lines of bike */}
                        <path d="M 40 80 L 80 80 L 100 45 L 140 45 M 100 45 L 120 80 M 80 80 L 120 80 L 160 80" fill="none" stroke="#334155" strokeWidth="2.5" />
                        
                        {/* Handlebar */}
                        <path d="M 140 45 L 145 25 L 135 22" fill="none" stroke="#334155" strokeWidth="2" />
                        
                        {/* Back Wheel (Rear Motor Drive) */}
                        <circle cx="40" cy="80" r="22" fill="none" stroke="#334155" strokeWidth="2.5" />
                        <circle cx="40" cy="80" r="14" fill="#6b21a8" fillOpacity="0.1" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" className="animate-[spin_4s_linear_infinite]" />
                        <circle cx="40" cy="80" r="4" fill="#a855f7" />
                        
                        {/* Front Wheel (Generator) */}
                        <circle cx="160" cy="80" r="22" fill="none" stroke="#334155" strokeWidth="2.5" />
                        <circle cx="160" cy="80" r="14" fill="#0e7490" fillOpacity="0.1" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" className="animate-[spin_4s_linear_infinite]" />
                        <circle cx="160" cy="80" r="4" fill="#06b6d4" />

                        {/* Battery (Supercapacitor) in middle */}
                        <rect x="85" y="65" width="30" height="15" rx="2" fill="#0f172a" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
                        <rect x="87" y="67" width="22" height="11" fill="url(#bat-charge-level)" />
                        
                        {/* Positive flow arrow: Battery to Rear Wheel (Motor) */}
                        <path d="M 85 72 L 40 72" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite]" />
                        
                        {/* Generation feedback arrow: Front Wheel (Gen) to Battery */}
                        <path d="M 160 72 L 115 72" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite_reverse]" />

                        <defs>
                          <linearGradient id="bat-charge-level" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset={`${efficiency}%`} stopColor="#a855f7" />
                            <stop offset={`${efficiency}%`} stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-3 text-[9px] font-mono font-bold">
                        <span className="text-purple-400 uppercase tracking-wider">{isEn ? 'Rear Motor: 500W' : '뒷바퀴: 구동모터'}</span>
                        <span className="text-cyan-400 uppercase tracking-wider">{isEn ? 'Front Generator' : '앞바퀴: 자가발전기'}</span>
                      </div>

                      {/* Equilibrium glow badge */}
                      {isEquilibrium && (
                        <div className="absolute inset-0 bg-cyan-400/5 rounded-xl border border-cyan-450/40 flex items-center justify-center backdrop-blur-[1px]">
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="bg-slate-950/95 border border-cyan-400 px-3 py-2 rounded-xl text-center space-y-0.5 shadow-2xl"
                          >
                            <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest block leading-none">EQUILIBRIUM ACTIVE</span>
                            <span className="text-[11px] font-black text-white block">
                              {isEn ? '1:1 Net-Zero Balanced' : '발전량 : 소모량 = 1:1 환류 평형'}
                            </span>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Right: Controller Sliders and numeric data panels */}
                    <div className="md:col-span-6 space-y-4">
                      {/* Active gauge indicators */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-450 uppercase font-mono">{isEn ? 'Power Consumed' : '실시간 모터 소비량'}</span>
                          <span className="text-white font-mono">{motorConsumption} W</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-purple-500 h-full transition-all duration-150"
                            style={{ width: `${Math.min(100, (motorConsumption / 750) * 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-450 uppercase font-mono">{isEn ? 'Power Self-Generated' : '실시간 회전 발전량'}</span>
                          <span className="text-cyan-400 font-mono">+{generatorProduction} W</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-cyan-400 h-full transition-all duration-150"
                            style={{ width: `${Math.min(100, (generatorProduction / 500) * 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold border-t border-white/5 pt-2">
                          <span className="text-slate-450 uppercase font-mono">{isEn ? 'Net Draw / Recharge' : '실시간 순 배터리 증감'}</span>
                          <span className={`font-mono font-black ${netDraw <= 0 ? 'text-cyan-400' : 'text-purple-400'}`}>
                            {netDraw === 0 ? '0 W (Neutral)' : (netDraw > 0 ? `${netDraw} W Draw` : `${Math.abs(netDraw)} W Charging`)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-450 uppercase font-mono">{isEn ? 'Generation Recovery Rate' : '실시간 자가발전 복구율'}</span>
                          <span className="text-emerald-400 font-mono font-bold">{efficiency}%</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Manual Slider control block */}
                  <div className="bg-slate-950/80 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                        {isEn ? 'Drag to Adjust Speed (km/h)' : '슬라이더를 드래그해 속도를 조정하세요'}
                      </span>
                      <button 
                        onClick={() => setSpeed(30)}
                        className="text-[10px] font-mono text-cyan-400 hover:text-white bg-cyan-950/40 border border-cyan-400/20 px-2 py-0.5 rounded cursor-pointer"
                      >
                        {isEn ? 'Lock 30km/h (Equilibrium)' : '30km/h 고정 (1:1 환류평형)'}
                      </button>
                    </div>

                    <input 
                      type="range"
                      min="0"
                      max="45"
                      value={speed}
                      onChange={(e) => setSpeed(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-900 cursor-pointer rounded-lg h-2"
                    />

                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>0 km/h ({isEn ? 'Stationary' : '정지'})</span>
                      <span className={`font-bold ${isEquilibrium ? 'text-cyan-400' : ''}`}>30 km/h (Net-Zero Link)</span>
                      <span>45 km/h ({isEn ? 'Maximum speed' : '최대속력'})</span>
                    </div>
                  </div>
                </div>

                {/* Important highlight warning/guidelines (from the 3rd slide image) */}
                <div className="bg-slate-950/40 border border-white/5 rounded-xl p-4 mt-4 text-left">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white">
                    <Lightbulb className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? 'Cruising Performance at 30km/h' : '속도 30km/h 주행의 의미'}</span>
                  </div>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed font-medium">
                    {isEn
                      ? "When cruising at 30km/h, the power required to propel the bike matches the energy harvested by the front-wheel generator. This achieves a perfect 1:1 energy equilibrium, minimizing external charging needs to virtually zero during steady cruises."
                      : "자체충전 자전거가 속도 30km/h에 진입하면 자가 발전량과 소비 전력량이 1:1 완벽한 가교 동량을 형성합니다. 전기에너지가 소진되지 않고 지속해서 앞바퀴에서 배터리로 재환류 충전되므로, 평지 항속 시 충전 플러그 결속 빈도가 기하급수적으로 상쇄되어 압도적인 100km+ 오버 스펙을 안전하게 보증합니다."}
                  </p>
                </div>
              </div>
            </div>

            {/* E-Bike Detailed Layout Structure (From 3rd Slide Image - "자체충전 전기자전거 제품구성") */}
            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 text-left">
                <div className="w-1.5 h-3.5 bg-purple-400 rounded-full" />
                <h4 className="text-sm font-bold text-white tracking-tight uppercase">
                  {isEn ? "E-Bicycle Modular Configuration Specs" : "자체충전 전기자전거 5대 핵심 모듈 및 스펙 구성"}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  {
                    title: isEn ? '500W Electric Motor' : '500W 고정밀 전동모터',
                    desc: isEn ? 'High torque brushless motor for rear-wheel power drive.' : '후륜 기어 허브에 결착되어 배터리의 신속 압밀 전력소스로 정지상태 기동 시 강력 토크를 제공합니다.',
                    val: '500 W Peak'
                  },
                  {
                    title: isEn ? 'Shimano 21-7 Speed' : '시마노 21-7단 기어 기작',
                    desc: isEn ? 'Highly versatile transmission gear matrix for multi-terrain riding.' : '세계적 규격의 시마노 21-7단 변속 트랜스미션을 장착해 기복이 심한 언덕 경사지에서도 연비 분배를 우수 보완합니다.',
                    val: 'Shimano 7-Speed'
                  },
                  {
                    title: isEn ? 'Supercapacitor Battery' : '슈퍼커패시터 배터리',
                    desc: isEn ? 'Supports concurrent micro-current charging and discharging with zero thermal risk.' : '앞바퀴 발전기에서 유입되는 불규칙하고 미세한 전류까지 동시에 실시간 완벽 흡수해 자가 순환 충방전을 지휘하는 핵심 축전지입니다.',
                    val: 'Dual-Concurrent Active'
                  },
                  {
                    title: isEn ? 'Digital Smart Display' : '디지털 스마트 디스플레이',
                    desc: isEn ? 'Real-time cruise feedback tracking speed, PAS levels, and net energy balance.' : '주행속도, 구동 단수(PAS), 축적 에너지 배터리 잔량 및 실시간 자가발전/환류 피드백을 오차 없이 직관적으로 출력합니다.',
                    val: 'LCD Backlight UI'
                  },
                  {
                    title: isEn ? 'Self-Generation Unit (2kW/h)' : '자가발전 시스템 (2kw/h)',
                    desc: isEn ? 'Highly optimized generator downsized into an ultra-compact 500W hub footprint.' : '원천 기술인 2kW/h 대용량 자가발전 기작을 모빌리티용 500W 사이즈로 초경량 소형화한 독보적 특허 결착 모듈입니다.',
                    val: 'Downsized to 500W'
                  }
                ].map((spec, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-white/5 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-mono text-purple-400 font-extrabold uppercase block">{spec.val}</span>
                      <h5 className="text-xs font-black text-white">{spec.title}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium text-left">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
