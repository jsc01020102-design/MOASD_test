import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  CheckCircle, 
  Flame, 
  Gauge, 
  TrendingDown, 
  DollarSign, 
  Milestone, 
  ArrowRight, 
  Clock, 
  Settings, 
  Zap, 
  TrendingUp, 
  MapPin, 
  Users, 
  Award, 
  Activity, 
  FileText, 
  ChevronRight 
} from 'lucide-react';

interface HybridMotorcycleAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const HybridMotorcycleAdvancedShowcase: React.FC<HybridMotorcycleAdvancedShowcaseProps> = ({ language, isEn }) => {
  // Page 2: State for interactive driving mode
  const [activeDriveMode, setActiveDriveMode] = useState<'start' | 'climb' | 'cruise' | 'decelerate' | 'stop'>('cruise');

  // Page 4: State for interactive fuel & cost savings calculator
  const [dailyDistance, setDailyDistance] = useState<number>(70); // Default 70km (Rider/Post Office standard)
  const [fuelPrice, setFuelPrice] = useState<number>(1500); // 1,500 KRW/L default

  // Calculate savings dynamically based on input:
  // Traditional Engine: 30 km / Liter
  // Hybrid: 0.27L / 70km => approx 259 km / Liter (90% fuel reduction!)
  // Let's use the precise math from the slides:
  // Slide 4:
  // For 70km/day: Engine uses 3.0L (4,500 KRW), Hybrid uses 0.27L (405 KRW) => 91% fuel savings.
  // We can write a continuous scale:
  const engineDailyFuelLiters = dailyDistance / 23.3; // Approx 23.3 km/L for legacy engines under actual delivery conditions
  const hybridDailyFuelLiters = dailyDistance / 259.2; // 0.27L for 70km => 259.2 km/L under hybrid reuse

  const engineDailyCost = engineDailyFuelLiters * fuelPrice;
  const hybridDailyCost = hybridDailyFuelLiters * fuelPrice;

  const engineAnnualFuelCost = engineDailyCost * 264; // 264 days/year
  const hybridAnnualFuelCost = hybridDailyCost * 264;

  const engineAnnualMaint = 500000; // 500,000 KRW
  const hybridAnnualMaint = 100000; // 100,000 KRW

  const engineTotalAnnualCost = engineAnnualFuelCost + engineAnnualMaint;
  const hybridTotalAnnualCost = hybridAnnualFuelCost + hybridAnnualMaint;
  const annualSavings = engineTotalAnnualCost - hybridTotalAnnualCost;
  const savingsPercent = ((engineTotalAnnualCost - hybridTotalAnnualCost) / engineTotalAnnualCost) * 100;

  const drivingModes = [
    {
      id: 'start',
      label: isEn ? 'Start' : '출발',
      fuel: isEn ? 'Gasoline or Motor' : '가솔린 or 모터 교차',
      energy: isEn ? 'High' : '높음 (High)',
      desc: isEn 
        ? 'Utilizes electrical motor power initially to minimize tailpipe emissions. Swaps to engine power if instant high torque is demanded.' 
        : '출발 시 초기 마찰 저항을 극복하기 위해 전기에너지를 우선적으로 사용하거나 부하에 따라 가솔린 엔진을 연동함으로써 배출가스를 근본적으로 배제합니다.',
      color: 'from-cyan-500 to-teal-400',
      textColor: 'text-cyan-400'
    },
    {
      id: 'climb',
      label: isEn ? 'Climb / Acceleration' : '가속 / 오르막길',
      fuel: isEn ? 'Gasoline Engine Only' : '가솔린 엔진 전용',
      energy: isEn ? 'Very High' : '매우 높음 (Very High)',
      desc: isEn 
        ? 'Launches the gasoline engine to deploy massive mechanical torque, preventing heavy battery drain and securing smooth hill-climbing without slope limits.' 
        : '전기 모터 소모가 가장 가파른 오르막길이나 급가속 상황 시, 휘발유 엔진이 전격 가동되어 배터리 방전을 막고 등판각 한계가 없는 파워풀한 출력을 확보합니다.',
      color: 'from-amber-500 to-rose-500',
      textColor: 'text-rose-400'
    },
    {
      id: 'cruise',
      label: isEn ? 'Constant Cruising' : '정속 주행',
      fuel: isEn ? 'Electric Motor Only' : '전기 모터 단독',
      energy: isEn ? 'Normal' : '보통 (Normal)',
      desc: isEn 
        ? 'Shifts completely to the silent, carbon-free in-wheel electric motor. Delivers zero-emission urban cruising, ideal for standard delivery routes.' 
        : '속도가 안정된 정속 크루징 시에는 엔진을 정지하고 조용하고 무매연인 인휠(In-Wheel) 전기모터만으로 기동하여 연료 소모를 완벽히 억제합니다.',
      color: 'from-emerald-500 to-cyan-500',
      textColor: 'text-emerald-400'
    },
    {
      id: 'decelerate',
      label: isEn ? 'Deceleration / Slope Down' : '감속 / 내리막길',
      fuel: isEn ? 'Regenerative Recovery' : '배터리 자가 충전 (회생제동)',
      energy: isEn ? 'Low' : '낮음 (Low)',
      desc: isEn 
        ? 'Converts kinetic stopping friction into electricity, active recharging the onboard Li-ion battery dynamically without requiring grid plugin.' 
        : '가속 차단이나 내리막 주행 시 발생하는 관성 제동 마찰력을 발전 전류로 정밀 회환하여 운행 중 배터리를 상시 자동 회생 충전합니다.',
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-400'
    },
    {
      id: 'stop',
      label: isEn ? 'Stationary Stop' : '일시 정지',
      fuel: isEn ? 'Electric Motor (Standby)' : '모터 대기 (엔진 아이들링 오프)',
      energy: isEn ? 'Very Low' : '매우 낮음 (Very Low)',
      desc: isEn 
        ? 'Completely shuts down the combustion engine. Keeps control systems active on standby via the battery, entirely eliminating wasteful idling emissions.' 
        : '정차 상태에서는 가솔린 엔진이 즉각 셧다운되는 아이들링 스톱 상태를 유지합니다. 공회전 매연과 연료 낭비를 원천적으로 차단합니다.',
      color: 'from-slate-500 to-slate-700',
      textColor: 'text-slate-400'
    }
  ];

  return (
    <div className="w-full space-y-16 select-text pt-4">
      
      {/* Scrollable Flow Header Guide */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="text-left font-sans">
            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest leading-none">
              HYBRID MOBILITY SCROLL MODE
            </span>
            <span className="text-xs text-cyan-400 font-extrabold">
              {isEn ? "Continuous Scroll Mode Enabled (Explore Full 9-Slide Synthesis Below)" : "연속 스크롤 분석 리포트 활성화 (9개 슬라이드의 핵심 기술·경제성 보고서를 아래로 스크롤하여 확인하세요)"}
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase font-mono font-black text-slate-400 border border-white/10 px-3 py-1 rounded bg-slate-950/40">
          {isEn ? "5 Strategic Focus Pages" : "총 5개의 기술·경영 전략 세션"}
        </div>
      </div>

      {/* 🏍️ PAGE 01: Concept & Patent Overview */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            SESSION // 01
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {isEn ? "DOOHYUN INFRATECH CORE PATENT" : "당사 고유 특허 하이브리드 파워트레인"}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "01. Dual-Drive Hybrid Motorcycle Solution" : "01. 가솔린 엔진과 전기 모터의 지능형 교차 구동 하이브리드 이륜차"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Unlike conventional commercial e-scooters that suffer from rapid battery depletion on steep hills, Doohyun Infratech's patented Hybrid powertrain system seamlessly combines a fuel-efficient gasoline engine and a high-performance In-Wheel electric motor. Drivers can switch between energy modes automatically or manually based on payload, environment, and battery state, maximizing commercial durability."
                  : "기존 가솔린 이륜차의 극심한 대기오염 물질·소음 유발 한계와, 순수 전기 이륜차의 짧은 주행거리 및 배터리 방전 문제를 완벽히 동시 극복했습니다. 당사가 원천 특허를 보유한 통합 제어(Controller & Power conv, ACD, Battery) 기술을 탑재하여 평시에는 저소음·무매연 전기모터로 정숙 기동하고, 고출력 경사로 및 방전 위기 시 휘발유 엔진으로 신속 변환함으로써 최상의 물류 이송 안정성을 보증합니다."
                }
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl space-y-2 text-[11.5px] text-slate-300 leading-relaxed font-sans">
              <div className="font-extrabold text-cyan-400 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                {isEn ? "Proprietary Integration Framework" : "당사 독점 하이브리드 가교 기술"}
              </div>
              <div>
                {isEn
                  ? "✓ Complete integration of Controller, Power Converter, Lithium Battery, Automatic Conversion Device (ACD), and Brushless In-Wheel Hub Motor."
                  : "✓ 가솔린 엔진의 동력 전달 라인과 후륜 인휠 모터(In-Wheel Motor), 고정밀 전력 컨버터 및 자동 동력 분할 장치(ACD)가 유기적으로 통제되는 일원화 통합 구조를 완성했습니다."
                }
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                DUAL-DRIVE POWERTRAIN ARCHITECTURE
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Patented Power Routing & Control Flow" : "특허 하이브리드 자동 동력 분배 설계 구조"}
              </h5>
              
              {/* Complex chemical comparison SVG from old Slide 2 */}
              <div className="h-56 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-3 relative overflow-hidden">
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 200 110">
                  {/* Motorcycle Silhouette vector hint */}
                  <path d="M 30 75 Q 50 25 100 40 T 170 65 Q 185 70 170 75" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Battery Unit */}
                  <rect x="90" y="15" width="45" height="20" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                  <text x="112" y="27" fill="#10b981" fontSize="6" fontWeight="black" textAnchor="middle">Battery (배터리)</text>
                  <rect x="135" y="21" width="3" height="8" rx="1" fill="#10b981" />

                  {/* Controller & Power conv */}
                  <rect x="25" y="15" width="50" height="20" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
                  <text x="50" y="24" fill="#22d3ee" fontSize="5" fontWeight="bold" textAnchor="middle">Controller &</text>
                  <text x="50" y="31" fill="#22d3ee" fontSize="5" fontWeight="bold" textAnchor="middle">Power Conv.</text>

                  {/* Gasoline Engine */}
                  <rect x="50" y="55" width="45" height="20" rx="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="1" />
                  <text x="72.5" y="67" fill="#f43f5e" fontSize="6.5" fontWeight="black" textAnchor="middle">Gasoline Engine</text>

                  {/* Gear Box & Trans */}
                  <rect x="105" y="55" width="35" height="20" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
                  <text x="122.5" y="64" fill="#94a3b8" fontSize="5" fontWeight="bold" textAnchor="middle">Gear Box &</text>
                  <text x="122.5" y="71" fill="#94a3b8" fontSize="5" fontWeight="bold" textAnchor="middle">Trans System</text>

                  {/* In-Wheel Motor Wheel */}
                  <circle cx="165" cy="75" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="165" cy="75" r="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="165" y="73" fill="#38bdf8" fontSize="4.5" fontWeight="bold" textAnchor="middle">Wheel</text>
                  <text x="165" y="79" fill="#f59e0b" fontSize="4.5" fontWeight="black" textAnchor="middle">In-Wheel</text>

                  {/* Connecting Power Lines */}
                  {/* Battery to Controller */}
                  <path d="M 90 25 L 75 25" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Controller to ACD */}
                  <path d="M 50 35 L 50 48 M 50 48 L 105 48" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="80" y="44" width="16" height="8" rx="2" fill="#0284c7" />
                  <text x="88" y="50" fill="#fff" fontSize="4.5" fontWeight="bold" textAnchor="middle">ACD</text>

                  {/* Engine to Gear box */}
                  <path d="M 95 65 L 105 65" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Gearbox to Wheel */}
                  <path d="M 140 65 L 155 65" stroke="#64748b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: isEn ? "Power System" : "전동 모터 방식", value: "In-Wheel BLDC" },
                { label: isEn ? "Engine Backup" : "엔진 자동 연동", value: "ACD Clutch" },
                { label: isEn ? "Global Patent" : "핵심 원천 기술", value: "특허 보유" }
              ].map((st, i) => (
                <div key={i} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block">{st.label}</span>
                  <span className="text-sm font-black text-white font-mono block mt-0.5">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🏍️ PAGE 02: Intelligent Driving Mode Simulator */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            SESSION // 02
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {isEn ? "ENERGY CONTROL MECHANICS" : "주행 상황별 최적의 에너지 오케스트레이션"}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "02. Intelligent Real-Time Fuel Switching" : "02. 전 세계 유일의 가솔린-전기 교차 주행 시나리오"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Electric motors inherently consume the most energy during starting and climbing. By intelligently firing the combustion engine exclusively during high-load intervals, the hybrid motorcycle preserves battery cell health and guarantees sustained operation without the need for bloated, expensive batteries."
                  : "전기 이륜차의 가장 고질적인 전력 급감 원인은 출발 가속 시와 급오르막 기동 시 발생합니다. 당사의 하이브리드 제어기는 부하 하중을 기가헤르츠 단위로 실시간 감지하여, 에너지 소모가 폭증하는 고부하 영역에서는 휘발유 엔진을 구동하고, 배터리 소모가 안정화된 크루징 시에는 전기 모터로 자율 선회하는 완벽한 연비 분배 오퍼레이션을 수행합니다."
                }
              </p>
            </div>

            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-4">
              <h5 className="text-xs font-black text-white uppercase tracking-wider">
                {isEn ? "Select Driving Scenario to Simulate Live Power Flow:" : "주행 상황을 선택하여 실시간 동력 흐름을 체험해 보세요:"}
              </h5>
              <div className="grid grid-cols-5 gap-1.5">
                {drivingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveDriveMode(mode.id as any)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      activeDriveMode === mode.id
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-400/5'
                        : 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/50'
                    }`}
                  >
                    <span className={`text-[11px] font-bold block ${activeDriveMode === mode.id ? 'text-cyan-300 font-extrabold' : 'text-slate-400'}`}>
                      {mode.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              {drivingModes.map((mode) => {
                if (mode.id !== activeDriveMode) return null;
                return (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                        Active Scenario: {mode.label}
                      </span>
                      <h5 className="text-md font-extrabold text-white">
                        {isEn ? "Energy Flow Dynamics & Consumption" : "에너지 변환 효율 및 주행 기작 실사 데이터"}
                      </h5>
                      
                      {/* Interactive Visual Gauge Display */}
                      <div className="p-5 bg-slate-900/40 border border-white/10 rounded-2xl space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                            <span className="text-[10px] text-slate-400 block">{isEn ? "Active Fuel Source" : "실시간 작동 연료"}</span>
                            <span className="text-xs font-black text-cyan-300 font-mono block uppercase">{mode.fuel}</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                            <span className="text-[10px] text-slate-400 block">{isEn ? "Energy Load Level" : "에너지 소모 강도"}</span>
                            <span className={`text-xs font-black font-mono block uppercase ${mode.textColor}`}>{mode.energy}</span>
                          </div>
                        </div>

                        <div className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-950/30 p-3 rounded-xl border border-white/5">
                          {mode.desc}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                        <span className="text-[9px] text-slate-400 block">{isEn ? "Starting Output" : "초기 기동 토크"}</span>
                        <span className="text-xs font-black text-white font-mono block mt-0.5">
                          {mode.id === 'start' || mode.id === 'climb' ? 'Max (최대 보강)' : 'Normal (보통)'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                        <span className="text-[9px] text-slate-400 block">{isEn ? "Carbon Emission" : "배출가스 농도"}</span>
                        <span className="text-xs font-black text-white font-mono block mt-0.5">
                          {mode.id === 'climb' ? '0.04% (최소화)' : '0.00% (완전차단)'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                        <span className="text-[9px] text-slate-400 block">{isEn ? "Regen Charge" : "자가 회생 발전"}</span>
                        <span className="text-xs font-black text-white font-mono block mt-0.5">
                          {mode.id === 'decelerate' ? 'Active (+1.2kW)' : 'Standby (0.0kW)'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 🏍️ PAGE 03: Granular Technical & Price Contrast Table */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            SESSION // 03
          </div>

          <div className="lg:col-span-12 flex flex-col space-y-6">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {isEn ? "QUANTITATIVE RIGOROUS CONTRAST" : "3대 핵심 이륜차 구동 공법 정량 대조"}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "03. Hybrid vs. Pure Electric vs. Gasoline Motorcycle" : "03. 친환경과 효율의 극한 조율: 하이브리드 vs 전기 vs 가솔린"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                {isEn
                  ? "Standard pure electric motorcycles fail under heavy logistics workloads due to rigid charging times and short range, requiring expensive batteries that inflate purchase prices. The hybrid solution bypasses this bottleneck entirely, delivering infinite range and zero climbing constraints at a price matching electric scooters."
                  : "현재 출시된 순수 전기이륜차는 배달용 플랫폼 노동 시장의 하루 평균 주행거리(70km 이상)와 가파른 경사로 부하를 소화하기 위해 고가의 Li-ion 배터리가 강제되어 가격 상승과 보급 지연을 겪고 있습니다. 당사 하이브리드는 배터리 소모가 폭증하는 등판 구간을 가솔린 엔진으로 우회 보완함으로써 저렴한 배터리로도 완벽한 기동을 지원, 압도적 가격 경쟁력을 시현합니다."
                }
              </p>
            </div>

            {/* High-Fidelity Responsive Table */}
            <div className="overflow-x-auto border border-white/5 rounded-2xl bg-slate-950/45 shadow-inner">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/50">
                    <th className="p-4 font-black text-slate-300 uppercase tracking-wider w-1/5">{isEn ? "Specification" : "구분"}</th>
                    <th className="p-4 font-black text-cyan-400 uppercase tracking-wider w-1/4">{isEn ? "Hybrid (Our Tech)" : "하이브리드 이륜차 (당사)"}</th>
                    <th className="p-4 font-black text-emerald-400 uppercase tracking-wider w-1/4">{isEn ? "Pure Electric (EN-1S)" : "순수 전기이륜차 (EN-1S 대조)"}</th>
                    <th className="p-4 font-black text-rose-400 uppercase tracking-wider w-1/4">{isEn ? "Legacy Gasoline (M-Boy)" : "기존 가솔린이륜차 (대조)"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-slate-200">{isEn ? "Product Price" : "제품 소비자 가격"}</td>
                    <td className="p-4">
                      <span className="font-mono font-black text-cyan-300 text-sm">₩4,850,000</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{isEn ? "Mfg. Cost: Max ₩3.5M" : "(※ 제조 원가 : Max 350만원)"}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400">₩4,330,000</span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">{isEn ? "+₩520k premium difference" : "(하이브리드와 ₩520,000 차이)"}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400">₩2,870,000</span>
                      <span className="text-[10px] text-rose-400 block mt-0.5">{isEn ? "+₩1,980k premium difference" : "(하이브리드와 ₩1,980,000 차이)"}</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-slate-200">{isEn ? "Annual Fuel Cost" : "연간 유류/연료비"}</td>
                    <td className="p-4">
                      <span className="font-mono font-black text-cyan-300">₩45,800 + α</span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">{isEn ? "Saves ₩1.04M/yr vs Legacy" : "연간 ₩1,048,200 상당 절약"}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400">₩45,800</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{isEn ? "Grid electrical feeds cost" : "순수 충전 충당 전력비"}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400">₩1,095,000</span>
                      <span className="text-[10px] text-rose-400 block mt-0.5">{isEn ? "Extremely heavy gas overhead" : "가솔린 극심 연소 유지비"}</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-slate-200">{isEn ? "Daily Driving Range" : "일 운행거리 한계"}</td>
                    <td className="p-4">
                      <span className="font-mono font-black text-cyan-300">70km + α</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">{isEn ? "Infinite range via gas fuel-up" : "가솔린 즉각 주유로 제한 없음"}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400">70km Limit</span>
                      <span className="text-[10px] text-rose-400 block mt-0.5 font-bold">{isEn ? "Requires towing or waiting" : "방전 시 주행 불능 상태 직면"}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400">30km/Liter</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{isEn ? "Sufficient but highly pollutive" : "주유소 즉시 충당 가능"}</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-slate-200">{isEn ? "Charging / Fuel Time" : "방전 시 충전 대기 시간"}</td>
                    <td className="p-4 font-black text-cyan-300">
                      {isEn ? "No Wait (Instant Gas Switch)" : "충전 시간 필요 없음 (엔진 전환)"}
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-normal">{isEn ? "Uses backup gasoline flow" : "배터리 방전 시 즉시 휘발유 운행"}</span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {isEn ? "3 Hours Wait Time" : "3시간 소요 (고속 기준)"}
                      <span className="text-[10px] text-rose-400 block mt-0.5 font-bold">{isEn ? "Critical bottleneck for delivery" : "배달 라이더 업무 치명적 정지"}</span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {isEn ? "Instant Fuel-Up" : "즉시 주유 (1분 이내)"}
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-slate-200">{isEn ? "Slope Climbing Grade" : "오르막길 등판각 한계"}</td>
                    <td className="p-4 font-black text-cyan-300">
                      {isEn ? "No Slope Limits" : "경사로 제한 없음 (강인)"}
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-normal">{isEn ? "Fires gasoline combustion" : "오르막 구간 휘발유 엔진 파워 가동"}</span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {isEn ? "Max 30% Hill Limits" : "최대 등판각 30% 내외"}
                      <span className="text-[10px] text-rose-400 block mt-0.5 font-bold">{isEn ? "Stalls on heavy urban slopes" : "고부하 경사로 주행 차폐 및 정지 위험"}</span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {isEn ? "No Slope Limits" : "경사로 제한 없음"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note block */}
            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-center text-xs text-slate-400">
              {isEn 
                ? "※ Combined analysis based on Daelim EN-1S, Taro Korea T-10, and Daelim M-Boy operational data. Cost savings verified by national ministry datasets."
                : "※ 대림 EN-1S, 타로 코리아 T-10, 대림 M-Boy 실기종 상세 데이터를 대조 산정함. 2년 이상 전격 운행 시 차량 추가 구입비 차액을 가뿐히 초과 회환하여 자산화합니다."
              }
            </div>
          </div>
        </div>
      </div>

      {/* 🏍️ PAGE 04: Interactive Fuel & Cost Savings Calculator */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            SESSION // 04
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {isEn ? "RECURRING SAVINGS SIMULATOR" : "년간 유지비 누수율 제로 시뮬레이터"}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "04. Fuel & Maintenance Cost Savings Live Calculator" : "04. 우체국·출퇴근 맞춤형 연간 유지비 절감 시뮬레이션"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "A standard logistics rider or postal carrier driving 70km daily faces heavy fuel bills and frequent oil/filter maintenance. Calculate your real-time recurring cost reduction with the slider below. Our Hybrid system drops fuel consumption to just 0.27 Liters per 70km, achieving a staggering 91% drop in total annual vehicle overhead."
                  : "우체국 및 전문 배달 플랫폼 노동자의 실제 주 5일 운행(연 264일) 조건 하중 데이터입니다. 매주 소모되는 가솔린 엔진오일 교환 주기와 극심한 유류 소모액을 하이브리드 자동 동력 회환 기법으로 완벽 정벌하여, 연간 최대 91% 가량의 유지 관리비를 순수 세이빙하고 차량 자산 가치를 극대화합니다. 일 주행거리를 조절하여 가혹 테스트 결과를 실시간 산출하세요."
                }
              </p>
            </div>

            {/* Interactive Sliders */}
            <div className="p-5 bg-slate-900/50 border border-cyan-500/20 rounded-2xl space-y-6 shadow-inner">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <Milestone className="w-3.5 h-3.5 text-cyan-400" />
                    {isEn ? "Daily Driving Distance" : "일일 목표 운행거리 (km)"}
                  </span>
                  <span className="text-cyan-400 font-black text-sm">{dailyDistance} km</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  value={dailyDistance} 
                  onChange={(e) => setDailyDistance(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>20km (단거리 출퇴근)</span>
                  <span>70km (우체국/배달 표준)</span>
                  <span>150km (하드 택배 이송)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    {isEn ? "Gasoline Market Price (KRW / Liter)" : "현재 시장 휘발유 가격 (원 / L)"}
                  </span>
                  <span className="text-amber-400 font-black text-sm">₩ {fuelPrice.toLocaleString()} / L</span>
                </div>
                <input 
                  type="range" 
                  min="1300" 
                  max="2000" 
                  step="50"
                  value={fuelPrice} 
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₩1,300</span>
                  <span>₩1,650</span>
                  <span>₩2,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="p-5 bg-slate-900/40 border border-white/10 rounded-2xl space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                ANNUAL COST BREAKDOWN & SAVINGS
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Calculated Annual Operational Overhead (264 Days/Yr)" : "연간 264일 정격 가동 시 유지비 비교 리포트"}
              </h5>

              <div className="space-y-4 pt-2">
                {/* Legacy Engine Row */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>{isEn ? "Legacy Gasoline Motorcycle Overhead" : "기존 가솔린 이륜차 총액"}</span>
                    <span className="font-mono text-rose-400 font-extrabold">₩ {Math.round(engineTotalAnnualCost).toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full w-full" />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>{isEn ? `Fuel: ₩${Math.round(engineAnnualFuelCost).toLocaleString()}` : `유류비: ₩${Math.round(engineAnnualFuelCost).toLocaleString()}`}</span>
                    <span>{isEn ? `Oil/Maint: ₩500k` : `엔진오일/유지보수: ₩500,000`}</span>
                  </div>
                </div>

                {/* Hybrid Row */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span className="text-cyan-400 font-bold">{isEn ? "Doohyun Hybrid Motorcycle Overhead" : "당사 하이브리드 이륜차 총액"}</span>
                    <span className="font-mono text-cyan-300 font-extrabold">₩ {Math.round(hybridTotalAnnualCost).toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <motion.div 
                      key={`hybrid-calc-bar-${dailyDistance}-${fuelPrice}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(hybridTotalAnnualCost / engineTotalAnnualCost) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-cyan-400 h-full rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>{isEn ? `Fuel: ₩${Math.round(hybridAnnualFuelCost).toLocaleString()}` : `유류비: ₩${Math.round(hybridAnnualFuelCost).toLocaleString()}`}</span>
                    <span>{isEn ? `Maint: ₩100k` : `유지비: ₩100,000`}</span>
                  </div>
                </div>

                {/* Highlight Big Box */}
                <div className="p-4 rounded-xl bg-cyan-950/45 border border-cyan-400/30 text-center space-y-1">
                  <span className="text-[11px] font-black text-cyan-400 uppercase tracking-widest block">
                    {isEn ? "Total Annual Capital Savings" : "연간 절약되는 순수 현금 가치"}
                  </span>
                  <div className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight">
                    ₩ {Math.round(annualSavings).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    {isEn 
                      ? `★ Recovers ${Math.round(savingsPercent)}% of operational fuel overhead each year!` 
                      : `★ 엔진이륜차 대비 연간 총 유지비의 약 ${Math.round(savingsPercent)}%를 영구 세이빙!`
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900/40 border border-white/5 rounded-xl">
                <span className="text-[9px] text-slate-400 block">{isEn ? "Rider Daily Commute" : "배달 플랫폼 노동자 일일 가속"}</span>
                <span className="text-xs font-black text-white block mt-0.5">{isEn ? "71km Average Route" : "최소 일 71km 가혹 질주"}</span>
              </div>
              <div className="p-3 bg-slate-900/40 border border-white/5 rounded-xl">
                <span className="text-[9px] text-slate-400 block">{isEn ? "Capital Break-even Duration" : "차량 추가 비용 회수 기간"}</span>
                <span className="text-xs font-black text-emerald-400 block mt-0.5">{isEn ? "Under 2 Years Perfect Payback" : "2년 이내 전액 차량비 회환"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🏍️ PAGE 05: Technical Timeline & Global Business Blueprint */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            SESSION // 05
          </div>

          {/* Left Column: Vertical Timeline of Key Milestones */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {isEn ? "CHRONOLOGICAL PROGRESS ROADMAP" : "하이브리드 이륜차 특허 원천 개발 역사"}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                {isEn ? "05. Technological Milestones & Certifications" : "05. 한중 국가과제 성공 완료 및 하이브리드 연혁"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {isEn
                  ? "We have continuously advanced our core dual-drive patents through rigorous Korean-Chinese joint international high-tech development projects, leading to solid EURO5 compliance certifications."
                  : "당사의 하이브리드 이륜차 기술은 단순 시제품 연구에 그치지 않고, 한중 양국 정부 산하의 정식 국제 공동 기술 개발 과제로 채택되어 성공적으로 수명 및 환경 배출 테스트를 통과한 독보적 안심 패키지입니다."
                }
              </p>
            </div>

            {/* Vertical Timeline Vector Structure */}
            <div className="relative pl-6 border-l border-white/10 space-y-5 my-4">
              {[
                { 
                  year: "2019. 이전", 
                  title: isEn ? "Original Hybrid Patents Registered" : "하이브리드 이륜차 핵심 특허 등록 완료",
                  desc: isEn ? "Secured foundational dual-power switching architecture patents." : "가솔린-전기 자동 동력 전달 및 ACD 결합 특허 등록 및 원천 개발 완료."
                },
                { 
                  year: "2020.02", 
                  title: isEn ? "T11 Commercial Sales Launch" : "T11 (Explorer, 276cc) 공식 출시 및 판매",
                  desc: isEn ? "Completed rigorous emissions/noise approvals for direct sales." : "환경부 공식 소음 및 대기 배출가스 인증 승인을 통과하여 상용 판매 실시."
                },
                { 
                  year: "2020.09", 
                  title: isEn ? "National Joint R&D Project Selection" : "한중 국제 공동 기술개발 국가 과제 선정",
                  desc: isEn ? "Awarded ₩400 million in government funding to scale production." : "양국 과학 기술 지원 사업으로 2년간 4억원의 국가 예산 조달 및 실증."
                },
                { 
                  year: "2021.10", 
                  title: isEn ? "Reverse-Charging Rear Powertrain Patent" : "전류발전 후륜구동 하이브리드 특허 출원",
                  desc: isEn ? "Registered advanced self-charging kinetic energy harvesting system." : "주행 제동 관성 마찰을 전동 발전하는 후륜 전류발전 특허 전격 등록 완료."
                },
                { 
                  year: "2022.08", 
                  title: isEn ? "National Task Success & EURO5 Certification" : "국가 기술개발 과제 성공 완료 및 EURO5 인증",
                  desc: isEn ? "Passed strict EURO5 environmental standards with flying colors." : "배출가스/소음 차폐 가교 장치가 유럽 연합 EURO5 환경 인증 기준을 완벽 관통."
                }
              ].map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Outer circle dot */}
                  <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <div className="text-[10px] font-mono font-black text-cyan-400 leading-none">{m.year}</div>
                  <h6 className="text-[11.5px] font-extrabold text-slate-200 mt-1 leading-tight">{m.title}</h6>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Global Business & Partner Network */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                GLOBAL INDUSTRIAL COOPERATION & BUSINESS藍圖
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Domestic Logistics replacement & Southeast Asian Expansion" : "국내 대형 시장 대체 및 글로벌 개조 패키지 사업화"}
              </h5>
              
              <div className="space-y-3.5">
                {/* Domestic Strategy */}
                <div className="p-3.5 bg-slate-900/50 border border-white/5 rounded-xl space-y-1.5">
                  <div className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {isEn ? "1. Domestic Market Penetration" : "1. 국내 시장: 물류 노동권 및 공공기관 교체 전개"}
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 font-sans leading-normal list-none pl-0">
                    <li>• <span className="font-bold text-slate-200">{isEn ? "Postal Fleet" : "우체국 이송차"}</span>: {isEn ? "Bypassing pure EV climbing limits on steep delivery lanes." : "경사로가 잦고 하중이 가혹해 순수 전기차가 불가능한 우편 전용 차량 교체 검토."}</li>
                    <li>• <span className="font-bold text-slate-200">{isEn ? "Logistics Fleets" : "배달 플랫폼 (배민/S1 등)"}</span>: {isEn ? "Providing un-interrupted logistics uptime for long-shift riders." : "하루 10시간, 일 71km를 상시 돌파하는 배달 노동자 및 긴급 경비망 출동차 사전 연계."}</li>
                    <li>• <span className="font-bold text-slate-200">{isEn ? "Maintenance Chains" : "전국 정비협회 거점"}</span>: {isEn ? "Utilizing 3,000 national shops to deploy repair & retrofits." : "전국 3,000여 곳의 연합 거점을 이용한 완결적 하이브리드 케어 인프라 공급."}</li>
                  </ul>
                </div>

                {/* International Strategy */}
                <div className="p-3.5 bg-slate-900/50 border border-white/5 rounded-xl space-y-1.5">
                  <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    {isEn ? "2. Global Market Retrofit Blueprint" : "2. 글로벌 영토 확장: 휘발유 이륜차 업그레이드 개조 패키지"}
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 font-sans leading-normal list-none pl-0">
                    <li>• <span className="font-bold text-slate-200">{isEn ? "China Base (Zhejiang Chuantai)" : "중국 거점 (절강천태)"}</span>: {isEn ? "Utilizing vast production lines to deploy assembly plants." : "시제품 생산 설비 무상 제공 및 타로 모터스(TARO) 현지 제조 인프라 연동."}</li>
                    <li>• <span className="font-bold text-slate-200">{isEn ? "Vietnam Retrofit" : "베트남 개조 패키지"}</span>: {isEn ? "Supplying automatic conversion units for legacy motorcycles." : "기존 90% 이상 유통 중인 구형 휘발유 바이크를 하이브리드로 변환하는 패키지 유통."}</li>
                    <li>• <span className="font-bold text-slate-200">{isEn ? "Southeast Asia完제품" : "필리핀/인도네시아 완제품"}</span>: {isEn ? "Partnering with major local dealers for direct e-mobility distribution." : "후륜구동 전류발전 기전이 융합된 완제품 하이브리드 메이저 현지 공급망 체결."}</li>
                  </ul>
                </div>

                {/* Global Partners */}
                <div className="p-3.5 bg-slate-900/80 border border-cyan-500/20 rounded-xl space-y-1">
                  <div className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block">
                    {isEn ? "Consortium Partners" : "컨소시엄 참여 협력회사 구성"}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono font-bold">
                    <span className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded text-cyan-300">㈜펄서에너지 (제조)</span>
                    <span className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded text-emerald-300">ZHEJIANG CHUANTAI (부품 생산)</span>
                    <span className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded text-amber-300">TARO MOTORS (China)</span>
                    <span className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded text-indigo-300">해외판매㈜ (해외 법인)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cyan-950/40 border border-cyan-500/20 rounded-xl text-[10.5px] text-cyan-300 leading-relaxed font-sans text-center">
              {isEn
                ? "★ Bridging the legacy combustion era and the fully electric tomorrow with high-yield, non-disruptive practical hybrid tech."
                : "★ 단순한 배출가스 억제를 뛰어넘어, 물류 이동권의 연속 주행 보장과 영구 연비 회환을 실증해 나가는 차세대 모빌리티의 미래를 개척합니다."
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
