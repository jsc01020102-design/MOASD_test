import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  CheckCircle, 
  Cpu, 
  ShieldCheck, 
  Grid, 
  Layers, 
  Activity, 
  FlameKindling,
  Sun,
  Wind,
  Home,
  Car,
  Database
} from 'lucide-react';

interface EssAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const EssAdvancedShowcase: React.FC<EssAdvancedShowcaseProps> = ({ language, isEn }) => {
  return (
    <div className="w-full space-y-8 select-text pt-4" id="ess-advanced-showcase">
      {/* Upper Title Section */}
      <div className="text-left space-y-2 border-b border-white/5 pb-4">
        <span className="text-[10px] text-cyan-450 font-bold block uppercase tracking-widest leading-none">
          {isEn ? "NEXT-GENERATION HIGH-CAPACITY PORTABLE POWER BANK" : "차세대 고성능 모바일 파워뱅크 장치"}
        </span>
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
          {isEn ? "High-Capacity Power Bank" : "고성능 대용량 파워뱅크"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Descriptive Content (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-slate-900/20 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6">
            {/* 1. Core Definition Block */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-400/20 px-2.5 py-1 rounded">
                {isEn ? "CORE CONCEPT" : "핵심 개념 정의"}
              </span>
              <p className="text-sm md:text-base text-cyan-400 font-semibold leading-relaxed bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-xl shadow-lg">
                {isEn 
                  ? "The High-Capacity Power Bank is a next-generation portable energy storage device that combines the high energy density of advanced lithium-ion cells with modern high-speed charging protocols and intelligent multi-layer safety controllers."
                  : "고성능 파워뱅크는 최신 고에너지밀도 충전 셀 기술과 최첨단 고속 전력 분배 IC, 지능형 다중 보호 안전 컨트롤러를 결합하여 언제 어디서나 신뢰할 수 있는 모바일 전원 공급 장치입니다."}
              </p>
            </div>

            {/* 2. Detailed Attributes organizd into highly readable lists */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-1">
                {isEn ? "HIGH-PERFORMANCE POWER BANK FEATURES" : "고성능 파워뱅크 핵심 기술 규격"}
              </span>
              
              <div className="space-y-3.5">
                {/* Point 1: Lossless Efficiency */}
                <div className="flex gap-3 items-start bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 p-4 rounded-xl transition-all">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-450 flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isEn ? "Lossless Energy Conversion Efficiency >95%" : "95% 초과 고효율 전력 변환율"}
                    </h4>
                    <p className="text-[12px] text-slate-300 leading-relaxed">
                      {isEn
                        ? "Because its energy conversion efficiency exceeds 95% thanks to premium internal ICs, virtually no energy is lost as heat during operation."
                        : "프리미엄 지능형 전력 관리 회로 덕분에 변환 효율이 95%를 상회하여, 고부하 전력 사용 시에도 불필요한 누설이나 열 소실이 전혀 발생하지 않습니다."}
                    </p>
                  </div>
                </div>

                {/* Point 2: PD & Multiport */}
                <div className="flex gap-3 items-start bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 p-4 rounded-xl transition-all">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-450 flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isEn ? "Bespoke Multi-port Output & USB-PD Support" : "다포트 양방향 초고속 충전 기술"}
                    </h4>
                    <p className="text-[12px] text-slate-300 leading-relaxed">
                      {isEn
                        ? "Supports high-voltage USB Power Delivery (PD) and multi-port simultaneous outputs, delivering perfect power matching for laptops, outdoor gears, and backup systems."
                        : "최신 고기압 PD 3.0 및 다양한 직간접 출력을 완벽 지원하여 노트북, 캠핑 장비, 대용량 비상 전원 공급 기기까지 지연 없는 균일 전압을 출하합니다."}
                    </p>
                  </div>
                </div>

                {/* Point 3: BMS Thermal Safety */}
                <div className="flex gap-3 items-start bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 p-4 rounded-xl transition-all">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-450 flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isEn ? "Advanced Intelligent BMS Thermal Management" : "지능형 BMS 통합 안전 장치"}
                    </h4>
                    <p className="text-[12px] text-slate-300 leading-relaxed">
                      {isEn
                        ? "Monitors internal cell temperature, voltage balance, and current limits in real time. Actively protects against short-circuits and thermal runaways without any complex cooling fans."
                        : "내부 셀의 실시간 전압 균등성, 충전 한계 전류 및 온도 프로필을 상시 추적합니다. 별도의 시끄러운 냉각팬 없이도 발열을 자동 억제하여 폭발을 원천 봉쇄합니다."}
                    </p>
                  </div>
                </div>

                {/* Point 4: Semi-permanent Cycles */}
                <div className="flex gap-3 items-start bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 p-4 rounded-xl transition-all">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-450 flex-shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isEn ? "Extended Lifespan & Semi-Permanent Battery Cycles" : "반영구적 배터리 충방전 수명 수렴"}
                    </h4>
                    <p className="text-[12px] text-slate-300 leading-relaxed">
                      {isEn
                        ? "Uses robust active-layer chemistry and SAM formulation to guarantee over 5,000 deep discharge cycles, maintaining over 85% of original capacity for years."
                        : "화학적 조성을 극대화하고 특수 SAM 신물질 피막을 도포하여, 5,000회 이상의 완전 충방전 후에도 초기 용량의 85% 이상을 철저 유지하는 영속 수명을 갖춥니다."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Panel Diagram Representing the Attached Image Exactly (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            
            {/* Panel 1 (Top Left): Pouch Layered Cell Structure */}
            <div className="bg-slate-900/40 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-1.5 right-1.5 text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                PANEL_01
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-500 block font-bold">POUCH_STRUCTURE</span>
                <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                  {isEn ? "Pouch Layered Cell Structure" : "파우치형 적층 셀 구조"}
                </h4>
              </div>
              
              {/* SVG representing the layered / pouch capacitor cell */}
              <div className="my-3 flex items-center justify-center">
                <svg viewBox="0 0 160 120" className="w-full h-24 drop-shadow-[0_0_8px_rgba(34,211,238,0.12)]">
                  {/* Left Layered cell (unfolded representation) */}
                  <g transform="translate(10, 10)">
                    {/* Anode Tab */}
                    <rect x="15" y="0" width="8" height="15" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                    <text x="17.5" y="8" fontSize="6" fontWeight="extrabold" fill="#475569" fontFamily="monospace">+</text>
                    
                    {/* Active Layers stacked */}
                    <rect x="5" y="15" width="28" height="40" rx="1.5" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                    <rect x="9" y="15" width="20" height="40" fill="#0284c7" fillOpacity="0.8" />
                    <rect x="13" y="15" width="12" height="40" fill="#0c4a6e" />
                    
                    {/* Pointers 1, 2, 3 */}
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

                  {/* Right Layered pack inside cutaway container */}
                  <g transform="translate(75, 10)">
                    {/* Cathode Tab */}
                    <path d="M 30 0 L 40 5 L 45 15 L 35 15 Z" fill="#94a3b8" />
                    <text x="37" y="12" fontSize="6" fontWeight="extrabold" fill="#0f172a" fontFamily="monospace">-</text>

                    {/* Outer cutaway blue casing */}
                    <path d="M 15 15 L 60 15 L 60 55 A 5 5 0 0 1 55 60 L 10 60 L 10 20 Z" fill="#1d4ed8" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
                    {/* Inner layers visible */}
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

              <span className="text-[8.5px] text-slate-500 leading-normal text-left">
                {isEn ? "Stacked flat cells maximize physical ion double-layer adsorption." : "적층 및 고온 압밀 밀봉 구조로 내부 이온 접촉 공간을 획기적으로 연장함."}
              </span>
            </div>

            {/* Panel 2 (Top Right): Smart Grid Connection Map */}
            <div className="bg-slate-900/40 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-1.5 right-1.5 text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                PANEL_02
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-500 block font-bold">SMART_GRID_SYSTEM</span>
                <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                  {isEn ? "Smart Grid Integration Map" : "스마트 그리드 연동 시스템"}
                </h4>
              </div>

              {/* Animated Network SVG */}
              <div className="my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 120" className="w-full h-24">
                  {/* Central HSC Node */}
                  <g transform="translate(80, 60)">
                    <rect x="-12" y="-12" width="24" height="24" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" className="animate-[pulse_2s_infinite]" />
                    <rect x="-8" y="-8" width="16" height="16" rx="1.5" fill="#0c4a6e" />
                    <Zap className="w-3 h-3 text-cyan-400 absolute" style={{ transform: 'translate(-6px, -6px)' }} />
                    <text x="-9" y="19" fontSize="5.5" fontWeight="bold" fill="#22d3ee" fontFamily="sans-serif">BMS</text>
                  </g>

                  {/* External Network Nodes */}
                  {/* 1. Solar energy (Top-Left) */}
                  <g transform="translate(25, 25)">
                    <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <Sun className="w-3 h-3 text-amber-500 absolute" style={{ transform: 'translate(-6px, -6px)' }} />
                  </g>
                  {/* 2. Server database storage (Top-Center) */}
                  <g transform="translate(80, 20)">
                    <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <Database className="w-3 h-3 text-purple-400 absolute" style={{ transform: 'translate(-6px, -6px)' }} />
                  </g>
                  {/* 3. Wind turbine (Top-Right) */}
                  <g transform="translate(135, 25)">
                    <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <Wind className="w-3 h-3 text-sky-400 absolute" style={{ transform: 'translate(-6px, -6px)' }} />
                  </g>
                  {/* 4. Home storage (Bottom-Left) */}
                  <g transform="translate(30, 95)">
                    <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <Home className="w-3 h-3 text-indigo-400 absolute" style={{ transform: 'translate(-6px, -6px)' }} />
                  </g>
                  {/* 5. EV electric car (Bottom-Right) */}
                  <g transform="translate(130, 95)">
                    <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <Car className="w-3 h-3 text-emerald-400 absolute" style={{ transform: 'translate(-6px, -6px)' }} />
                  </g>

                  {/* Connecting lines with dots */}
                  <path d="M 25 25 L 68 48" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <path d="M 80 20 L 80 48" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <path d="M 135 25 L 92 48" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <path d="M 30 95 L 68 72" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <path d="M 130 95 L 92 72" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  
                  {/* Pulse particles flowing along lines */}
                  <circle cx="46.5" cy="36.5" r="1" fill="#22d3ee" className="animate-[ping_1.5s_infinite]" />
                  <circle cx="113.5" cy="36.5" r="1" fill="#22d3ee" className="animate-[ping_1.8s_infinite]" />
                  <circle cx="111" cy="83.5" r="1" fill="#22d3ee" className="animate-[ping_2s_infinite]" />
                </svg>
              </div>

              <span className="text-[8.5px] text-slate-500 leading-normal text-left">
                {isEn ? "Interlinks solar, wind generators, EV cars, and domestic loads securely." : "신재생 태양광·풍력, 전기동력 스마트 모빌리티 및 주택 그리드에 평형 충방전 결합."}
              </span>
            </div>

            {/* Panel 3 (Bottom Left): Cylindrical Cell Structure */}
            <div className="bg-slate-900/40 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-1.5 right-1.5 text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                PANEL_03
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-500 block font-bold">CYLINDER_ANATOMY</span>
                <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                  {isEn ? "Cylindrical Cell Structure" : "실린더형 셀 구조"}
                </h4>
              </div>

              {/* Cylindrical cell with technical pointers */}
              <div className="my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 125" className="w-full h-26">
                  {/* Winding / Jelly-roll Cylinder representation */}
                  <g transform="translate(38, 25)">
                    {/* Metal outer wall cutaway */}
                    <path d="M 10 20 L 10 70 A 15 5 0 0 0 40 70 L 40 20 Z" fill="url(#metal-wall)" stroke="#475569" strokeWidth="0.5" />
                    {/* Top terminal */}
                    <path d="M 15 15 L 35 15 L 35 20 L 15 20 Z" fill="#64748b" />
                    <rect x="22" y="7" width="6" height="8" rx="1" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
                    <ellipse cx="25" cy="7" rx="3" ry="1.5" fill="#e2e8f0" />

                    {/* Inner spiral roll layers (Winding core) */}
                    <path d="M 13 25 L 13 65 A 12 4 0 0 0 37 65 L 37 25 Z" fill="url(#wound-core)" />
                    {/* Separator / layer lines */}
                    <line x1="16" y1="28" x2="16" y2="65" stroke="#000000" strokeWidth="0.75" />
                    <line x1="20" y1="28" x2="20" y2="65" stroke="#22d3ee" strokeWidth="0.75" />
                    <line x1="24" y1="28" x2="24" y2="65" stroke="#f8fafc" strokeWidth="0.75" />
                    <line x1="28" y1="28" x2="28" y2="65" stroke="#0284c7" strokeWidth="0.75" />
                    <line x1="32" y1="28" x2="32" y2="65" stroke="#000000" strokeWidth="0.75" />
                  </g>

                  {/* Technical pointers & labels */}
                  <g fontSize="5.5" fontFamily="monospace" fontWeight="bold" fill="#22d3ee">
                    {/* Terminal */}
                    <line x1="63" y1="32" x2="88" y2="32" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                    <text x="91" y="34">Terminal</text>

                    {/* Aluminum can */}
                    <line x1="75" y1="75" x2="88" y2="75" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="75" cy="75" r="0.75" fill="#22d3ee" />
                    <text x="91" y="77">Aluminum can</text>

                    {/* Positive electrode */}
                    <line x1="56" y1="50" x2="88" y2="50" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="56" cy="50" r="0.75" fill="#22d3ee" />
                    <text x="91" y="49" fill="#22d3ee" fontSize="5" fontWeight="black">Positive electrode</text>
                    <text x="91" y="54" fill="#cbd5e1" fontSize="4.5">- Carbon material</text>
                    <text x="91" y="58" fill="#cbd5e1" fontSize="4.5">- Aluminum collector</text>

                    {/* Negative electrode */}
                    <line x1="51" y1="92" x2="88" y2="92" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="51" cy="92" r="0.75" fill="#22d3ee" />
                    <text x="91" y="91" fill="#22d3ee" fontSize="5" fontWeight="black">Negative electrode</text>
                    <text x="91" y="96" fill="#cbd5e1" fontSize="4.5">- Carbon material</text>
                    <text x="91" y="100" fill="#cbd5e1" fontSize="4.5">- Aluminum collector</text>

                    {/* Separator */}
                    <line x1="62" y1="112" x2="88" y2="112" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="62" cy="112" r="0.75" fill="#22d3ee" />
                    <text x="91" y="114">Separator</text>
                  </g>

                  <defs>
                    <linearGradient id="metal-wall" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="30%" stopColor="#475569" />
                      <stop offset="70%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="wound-core" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="50%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <span className="text-[8.5px] text-slate-500 leading-normal text-left">
                {isEn ? "Internal roll anatomy of positive/negative terminals & separator." : "단자, 알루미늄 외장 캔, 집전체 양음극 극판, 분리막의 내부 조성."}
              </span>
            </div>

            {/* Panel 4 (Bottom Right): Advanced SAM Binder & Active Materials */}
            <div className="bg-slate-900/40 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-1.5 right-1.5 text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-cyan-400 font-bold">
                PANEL_04
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-500 block font-bold">ACTIVE_SAM_BINDER</span>
                <h4 className="text-[10px] md:text-xs font-extrabold text-white leading-tight">
                  {isEn ? "Advanced SAM Binder & Active Materials" : "SAM 복합 소재 및 활성 전극 물질"}
                </h4>
              </div>

              {/* Dynamic stylized Carbon black nano-material powder pile */}
              <div className="my-2 flex items-center justify-center relative h-24">
                <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none" />
                
                {/* 3D gradient vector mound for powder heap */}
                <div className="relative w-32 h-20 flex items-end justify-center">
                  {/* Shadows */}
                  <div className="absolute bottom-0 w-28 h-3.5 bg-black/50 blur-md rounded-full" />
                  
                  {/* Main heap SVG/CSS */}
                  <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    {/* Dark gradient polygon shape representing the heap */}
                    <path d="M 5 55 Q 35 45 50 10 Q 65 45 95 55 Z" fill="url(#powder-gradient)" />
                    {/* Micro grains highlights */}
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
                    {/* Sparkling carbon particles */}
                    <circle cx="50" cy="15" r="1.2" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="38" cy="33" r="1" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '4.5s' }} />
                    <circle cx="62" cy="41" r="1" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '2.5s' }} />

                    <defs>
                      <linearGradient id="powder-gradient" x1="0" y1="1" x2="0" y2="0">
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

              <span className="text-[8.5px] text-slate-500 leading-normal text-left">
                {isEn ? "Ultra-pure SAM layer optimized for rapid charging and chemical bonding." : "정밀 분자 수준에서 조제되어 충전 입자의 밀도를 극대화하고 결합력을 유지하는 SAM 코팅 공법."}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
