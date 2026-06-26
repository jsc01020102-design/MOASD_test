import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { runSimulation, SimulationState } from '../data';
import { 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  TrendingUp,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ConsultingSimulator: React.FC = () => {
  const { language, t } = useLanguage();
  const [state, setState] = useState<SimulationState>({
    reportVolume: 6,
    pipelineChains: 4,
    automationLevel: 65,
    hasDisorganizedSales: true,
    hasSiloBarrier: true,
    hasManualExcelMess: true,
    hasHgeGeneratorOnly: true,
  });

  const [results, setResults] = useState(runSimulation(state));

  const isEn = language === 'en';

  useEffect(() => {
    setResults(runSimulation(state));
  }, [state]);

  const handleChange = (key: keyof SimulationState, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const rec = results.consultingRecommendation;

  return (
    <div id="simulator-section" className="w-full rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-2xl p-6 md:p-10 shadow-2xl relative select-none overflow-hidden">
      {/* Dynamic Background Noise Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs text-cyan-400 font-mono tracking-wider mb-3">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> ENERGY STORAGE SYSTEM (ESS) INTEGRATION SIMULATOR
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          {t('simulator.title', 'Business Area & Specifications Simulator', '사업영역 & 사양 시뮬레이터')}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          {t(
            'simulator.desc',
            'Please specify your target renewable grid capacity scale and power bank configurations. Real-time active power flow recovery, extended operational life, and peak cell thermal control metrics are simulated live.',
            '지향하시는 신재생에너지 그리드 스케일과 고성능 파워뱅크 구성 유닛 수, 독자 특허인 SAM 신물질의 전도성 함침 밀도를 선택해 주십시오. 실시간 전력 흐름 회복도 및 연장 수명, 피크 발열 제어 온도가 물리 정량 방정식에 맞춰 정합 시뮬레이션됩니다.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters Slider Control panel (5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-6">
            <h4 className="text-xs md:text-sm font-bold tracking-widest text-slate-300 font-mono flex items-center gap-2 pb-3 border-b border-white/5 uppercase">
              <Sliders className="w-4 h-4 text-cyan-400" /> {t('simulator.parameters', 'CORE POWER INTERFACE PARAMETERS', '핵심 동력 연동 파라미터')}
            </h4>

            {/* Parameter 1: Target Capacity Scale */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">{t('simulator.param1', 'Target Energy Capacity Scale', '지향 전력 설비 규모 (Target Capacity)')}</span>
                <span className="text-cyan-400 font-mono font-bold">{state.reportVolume} MW <span className="text-slate-500">(1-10)</span></span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={state.reportVolume}
                onChange={(e) => handleChange('reportVolume', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none opacity-85 hover:opacity-100"
              />
              <span className="text-[10px] text-slate-500 block">{t('simulator.param1.desc', 'Configures base load characteristics for power grid integration.', '계통 송배전에 걸리는 기본 부하 충돌 수준을 설정합니다.')}</span>
            </div>

            {/* Parameter 2: Power Bank Modules */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">{t('simulator.param2', 'Power Bank Module Count', '고성능 파워뱅크 모듈 구성')}</span>
                <span className="text-cyan-400 font-mono font-bold">{state.pipelineChains} Rack Cell <span className="text-slate-500">(2-8)</span></span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={state.pipelineChains}
                onChange={(e) => handleChange('pipelineChains', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none opacity-85 hover:opacity-100"
              />
              <span className="text-[10px] text-slate-500 block">{t('simulator.param2.desc', 'Specifies nested battery cell layers deployed against thermal stress.', '충방전 과열 반응을 능동 억제할 적층 파워뱅크 셀 구성 수입니다.')}</span>
            </div>

            {/* Parameter 3: SAM compound blend percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">{t('simulator.param3', 'Patented Conduction SAM Blending Density', '미국 CAS 등재 SAM 신물질 함침 밀도')}</span>
                <span className="text-cyan-400 font-mono font-bold">{state.automationLevel}% Density <span className="text-slate-500">(0-100)</span></span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.automationLevel}
                onChange={(e) => handleChange('automationLevel', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none opacity-85 hover:opacity-100"
              />
              <span className="text-[10px] text-slate-500 block">{t('simulator.param3.desc', 'Determines CAS-registered conductive SAM material density on elements.', '전도 나노 전극 소재 SAM 가스 극판 함침 밀도를 제정합니다.')}</span>
            </div>
          </div>

          {/* Core Hardware Switch Toggles */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-5">
            <h4 className="text-xs md:text-sm font-bold tracking-widest text-slate-300 font-mono flex items-center gap-2 pb-3 border-b border-white/5 uppercase">
              <Award className="w-4 h-4 text-purple-400" /> {t('simulator.hardware', 'HARDWARE CONTROL UTILITIES', '하드웨어 제어 옵션 탑재')}
            </h4>

            {/* Toggle 1 */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-xs font-semibold text-slate-300">{t('simulator.toggle1', 'Smart Green Grid Integration Sync', '스마트 그린 그리드 완벽 동기화')}</span>
                <span className="text-[10px] text-slate-500 leading-relaxed">{t('simulator.toggle1.desc', 'Protects transmission circuits against micro-surge pulses during solar/wind spikes.', '풍력·태양광 발전 시 지상 맥동 서지의 전 송배전 선로 이격 차단 기능')}</span>
              </div>
              <button
                id="toggle-disorganized-sales"
                onClick={() => handleChange('hasDisorganizedSales', !state.hasDisorganizedSales)}
                className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
              >
                {state.hasDisorganizedSales ? (
                  <ToggleRight className="w-9 h-9 text-cyan-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-xs font-semibold text-slate-300">{t('simulator.toggle2', 'BMS Multi-Point Thermal Stabilization', 'BMS 다점 열 안정 센서 퓨즈')}</span>
                <span className="text-[10px] text-slate-500 leading-relaxed">{t('simulator.toggle2.desc', 'Instantly isolates active heating paths when cell temperatures exceed safe tolerances.', '셀 내부 과열 감지 시 가열 경로를 전량 절개하고 이탈 예방 전개 시스템')}</span>
              </div>
              <button
                id="toggle-silo-barrier"
                onClick={() => handleChange('hasSiloBarrier', !state.hasSiloBarrier)}
                className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
              >
                {state.hasSiloBarrier ? (
                  <ToggleRight className="w-9 h-9 text-cyan-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-xs font-semibold text-slate-300">{t('simulator.toggle3', 'Regenerative Braking Kinetic Energy Recovery', '친환경 회생 제동 운동 에너지 회수')}</span>
                <span className="text-[10px] text-slate-500 leading-relaxed">{t('simulator.toggle3.desc', 'Recovers kinetic friction as rechargeable electrical load on e-mobility options.', '자전거/오토바이 가속 제동 시 마찰열을 기전으로 완전 변환 복구')}</span>
              </div>
              <button
                id="toggle-excel-mess"
                onClick={() => handleChange('hasManualExcelMess', !state.hasManualExcelMess)}
                className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
              >
                {state.hasManualExcelMess ? (
                  <ToggleRight className="w-9 h-9 text-cyan-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>

            {/* Toggle 4 - HGE3D00 Generator */}
            <div className="flex justify-between items-center pt-3 border-t border-white/5 bg-amber-950/10 p-2.5 rounded-xl border border-amber-400/10">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {t('simulator.toggle4', 'HGE3D00 Hybrid Power Unit Grid-Link', 'HGE3D00 하이브리드 발전 장치 연동')}
                </span>
                <span className="text-[10px] text-slate-400 leading-relaxed">{t('simulator.toggle4.desc', 'DOOHYUN INFRATECH patented high-voltage power output and ESS linking optimization.', '두현인프라텍 특허 고전압 캐링 동력 아웃렛 및 ESS 그리드 결합 최적화')}</span>
              </div>
              <button
                id="toggle-hge-generator"
                onClick={() => handleChange('hasHgeGeneratorOnly', !state.hasHgeGeneratorOnly)}
                className="text-slate-400 hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
              >
                {state.hasHgeGeneratorOnly ? (
                  <ToggleRight className="w-9 h-9 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Virtualized Energy Network + Simulated Results (7 cols) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          {/* Top of Right: Pipeline Physics Network Animation Container */}
          <div className="p-4 rounded-2xl bg-slate-900/30 border border-white/5 relative h-48 flex items-center justify-center overflow-hidden">
            {/* Visualizing connecting networks on backdrop */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Lines representing pipelines */}
              <line 
                x1="12%" y1="50%" x2="35%" y2="50%" 
                stroke={!state.hasDisorganizedSales ? '#ef4444' : '#06b6d4'} 
                strokeWidth={!state.hasDisorganizedSales ? '1.5' : '2.5'}
                strokeDasharray={!state.hasDisorganizedSales ? '4' : '0'}
                className={!state.hasDisorganizedSales ? '' : 'animate-pulse'}
              />
              <line 
                x1="35%" y1="50%" x2="65%" y2="50%" 
                stroke={!state.hasSiloBarrier ? '#ef4444' : '#06b6d4'} 
                strokeWidth={!state.hasSiloBarrier ? '1.5' : '2.5'}
                strokeDasharray={!state.hasSiloBarrier ? '4' : '0'}
              />
              <line 
                x1="65%" y1="50%" x2="88%" y2="50%" 
                stroke={!state.hasManualExcelMess ? '#f59e0b' : '#10b981'} 
                strokeWidth={!state.hasManualExcelMess ? '1.5' : '3'}
                strokeDasharray={!state.hasManualExcelMess ? '4' : '0'}
              />

              {/* Electron flow nodes animation representing SAM compound conduction */}
              <circle r="5" fill="#22d3ee" className="filter drop-shadow-[0_0_8px_#22d3ee]">
                <animateMotion 
                  path="M 50,96 L 390,96" 
                  dur={`${Math.max(0.6, 12 - (state.automationLevel / 7.5))}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
              {state.automationLevel > 45 && (
                <circle r="4.5" fill="#a855f7" className="filter drop-shadow-[0_0_8px_#a855f7]">
                  <animateMotion 
                    path="M 50,96 L 390,96" 
                    begin="0.4s"
                    dur={`${Math.max(0.6, 12 - (state.automationLevel / 7.5))}s`} 
                    repeatCount="indefinite" 
                  />
                </circle>
              )}
            </svg>

            {/* Interactive Nodes overlaid */}
            <div className="absolute left-[8%] flex flex-col items-center">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border text-[10px] font-mono font-bold transition-all duration-300 ${
                !state.hasDisorganizedSales ? 'bg-red-950/50 border-red-500/50 text-red-400 shadow-lg shadow-red-500/5' : 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/5'
              }`}>
                {isEn ? 'GRID' : '그리드'}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 font-mono">GRID SYNC</span>
            </div>

            <div className="absolute left-[35%] flex flex-col items-center">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border text-[10px] font-mono font-bold transition-all duration-300 ${
                !state.hasSiloBarrier ? 'bg-red-950/50 border-red-500/50 text-red-400' : 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
              }`}>
                {isEn ? 'PB' : '파워뱅크'}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 font-mono">PB CELL</span>
            </div>

            <div className="absolute left-[65%] flex flex-col items-center">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border text-[10px] font-mono font-bold transition-all duration-300 ${
                !state.hasManualExcelMess ? 'bg-amber-950/50 border-amber-500/50 text-amber-400' : 'bg-emerald-950/60 border-emerald-400 text-emerald-300'
              }`}>
                {isEn ? 'EV' : '모빌리티'}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 font-mono">REGEN EV</span>
            </div>

            <div className="absolute right-[8%] flex flex-col items-center animate-pulse">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-900 via-emerald-950 to-purple-900 border border-cyan-400/80 text-[10px] font-bold text-white shadow-xl shadow-cyan-500/10">
                {isEn ? 'SAM' : 'SAM융합'}
              </div>
              <span className="text-[9px] text-cyan-400 font-semibold mt-1 font-mono">INTEGRATE</span>
            </div>

            {/* Pipeline status overlay */}
            <div className="absolute top-2 left-4 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                (!state.hasDisorganizedSales || !state.hasSiloBarrier) ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 animate-ping'
              }`} />
              {t('simulator.status', 'Live Grid Coupling Status', '실시간 전류 도판 연계 상태')}
            </div>
            
            <div className="absolute top-2 right-4 text-[10px] font-mono text-cyan-400 font-semibold uppercase">
              {isEn ? 'SAM Density: ' : 'SAM 함침률: '}{state.automationLevel}%
            </div>

            {/* HGE3D00 Active badge overlay styled exquisitely */}
            {state.hasHgeGeneratorOnly && (
              <div className="absolute bottom-2 right-4 flex items-center gap-1.5 bg-amber-950/45 border border-amber-500/30 px-2 py-0.5 rounded text-[9px] text-amber-400 font-bold font-mono animate-pulse">
                <span>HGE3D00 GENERATOR ONLINE</span>
              </div>
            )}
          </div>

          {/* Core Optimization Metrics Boxes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Box 1: Efficiency Gain */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">{t('simulator.metric1', 'Charge Yield Gain', '전하 수율 상승도')}</span>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-cyan-400 font-mono tracking-tight">
                  +{results.efficiencyGain}%
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{t('simulator.metric1.desc', 'Electrode drift reduction', '극판 기전력 이탈 감쇄율')}</p>
              </div>
            </div>

            {/* Box 2: Dynamic Capacity Range */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">{t('simulator.metric2', 'Energy High-Output Bank', '에너지 고출력 한계치')}</span>
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-purple-400 font-mono tracking-tight">
                  {results.weeklyHoursSaved} kW
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{t('simulator.metric2.desc', 'Safe peak acceleration load', '동적 피크 가속 안전 수용량')}</p>
              </div>
            </div>

            {/* Box 3: Peak cell temperature */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">{t('simulator.metric3', 'Peak Heat Estimate', '셀 예측 최고 발열')}</span>
                <TrendingUp className={`w-4 h-4 ${results.bottleneckIndex > 52 ? 'text-red-400' : 'text-emerald-400'}`} />
              </div>
              <div className="mt-3">
                <span className={`text-2xl font-extrabold font-mono tracking-tight ${
                  results.bottleneckIndex > 52 ? 'text-red-400 animate-pulse' : 'text-emerald-400'
                }`}>
                  {results.bottleneckIndex}°C
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{t('simulator.metric3.desc', 'Continuous critical temp', '방전 연속 임계 발열 상태 값')}</p>
              </div>
            </div>

            {/* Box 4: Cell cycle durability life */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">{t('simulator.metric4', 'Guaranteed Cycle Life', '보증 충방전 내구 수명')}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  {results.improvedAccuracy.toLocaleString()}{isEn ? ' cycles' : '회'}
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{t('simulator.metric4.desc', 'SAM electrode continuous cycles', 'SAM 극판 손실 제로 연속 사이클')}</p>
              </div>
            </div>
          </div>

          {/* Consulting Diagnosis Recipe */}
          <div className="p-6 rounded-2xl border border-cyan-400/20 bg-slate-950/80 relative">
            <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              MOASD SYSTEM DESIGN SPECIFICATION DIAGNOSIS
            </h4>

            <div className="space-y-4">
              {/* Identified Problem */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">IDENTIFIED SYSTEM CHALLENGE</span>
                <span className="text-sm font-bold text-red-400 mt-1 block">
                  {isEn ? rec.coreIssueEn : rec.coreIssue}
                </span>
              </div>

              {/* Focus Solution Title */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">KEY PRESCRIPTION CORE</span>
                <span className="text-base font-extrabold text-white mt-0.5 block">
                  {isEn ? rec.focusTitleEn : rec.focusTitle}
                </span>
              </div>

              {/* Recommended Service Section */}
              <div className="py-2.5 px-3.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-slate-400 font-semibold tracking-wider">RECOMMENDED ENTERPRISE PLATFORM</span>
                  <span className="text-xs font-bold text-cyan-400">{isEn ? rec.recommendedServiceEn : rec.recommendedService}</span>
                </div>
                <HeartHandshake className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Strategic 3-Stage Roadmap */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block mb-2">3-STAGE PRACTICAL ROADMAP</span>
                <div className="space-y-2">
                  {(isEn ? rec.roadmapEn : rec.roadmap).map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs text-slate-300">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-[10px] text-cyan-400">
                        {idx + 1}
                      </div>
                      <span className="leading-normal">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated CTA Prompt */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-[10px] text-slate-500">
                {t(
                  'simulator.mathDisclaimer',
                  'Simulated using standard organic-inorganic electrochemistry model references (MOASD Electro v3.1).',
                  '수식은 신재생 복합 화학 전지 거동 이론과 실장 연구 데이터(MOASD Electro v3.1)에 근거합니다.'
                )}
              </div>
              <a
                href="#proposal-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('simulator.submitCta', 'Submit Inquiry & Get Custom Proposal', '상세 매칭 기획 및 견적 의뢰하기')} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
