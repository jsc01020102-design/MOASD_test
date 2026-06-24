import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Flame, RefreshCw, CheckCircle, Shield, Layers, Thermometer, Gauge } from 'lucide-react';

interface HeatCoatingAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const HeatCoatingAdvancedShowcase: React.FC<HeatCoatingAdvancedShowcaseProps> = ({ language, isEn }) => {
  const [voltage, setVoltage] = useState(24); // Low voltage range from 12V to 36V

  // Interactive formula:
  const surfaceTemp = Math.round(20 + voltage * 1.6); // 20C base + rise
  const heatingSpeed = (12 - voltage * 0.2).toFixed(1);
  const powerSaved = Math.round(45 + (voltage / 36) * 20); // 45% to 65% energy savings

  const slides = [
    {
      id: 1,
      tag: isEn ? "LOW VOLTAGE THERMAL REGULATION" : "발열 코팅 기작 및 원천 이론",
      title: isEn ? "01. Conductive Monolayer Heating Concept" : "01. SAM 배합 면상 발열 코팅 시스템 개요",
      desc: isEn 
        ? "Leveraging CAS-registered SAM molecular structures, this advanced coating formula allows direct surface heat dissipation under safe low voltages (12V-36V) without risk of hotspots or shorts."
        : "글로벌 공인 미국 CAS 에 등재된 SAM 전열 전도 캐리어 공법을 고분자 액상 코팅제에 결합하여, 뒤틀림이 있거나 굴곡진 표면에도 정격 12V-36V 초저전압 인가 시 어떠한 마이크로 쇼트나 국소 균열 현상 없이 100% 균일하고 즉각적인 면상 방열 열회로를 형성하는 원천 솔루션입니다.",
      stats: [
        { label: isEn ? "Operating Voltage" : "필요 인가 전압", value: "12V - 36V" },
        { label: isEn ? "Surface Heat Rate" : "발열 열원 정합도", value: "99.2%" },
        { label: isEn ? "Power Savings" : "기존 대비 절전율", value: "최대 65%" }
      ]
    },
    {
      id: 2,
      tag: isEn ? "FLEXIBLE SPRAY INTERFACE" : "무제한 프리폼 도막 전사",
      title: isEn ? "02. Universal Substrate Flex Coating" : "02. 기재 제한을 타파한 전천후 스프레이 공정",
      desc: isEn
        ? "Unlike traditional heating pipes, this liquid formula can be sprayed on any material—glass, aluminum, steel, polymers, or complex concrete structures—retaining superior adhesion and temperature stability."
        : "동파 방지용 무거운 열선 파이프나 이질적인 필름 가열체와 달리, 당사의 액상 발열 세라믹 포뮬러는 금속, 인조 유리, 복합 탄소 섬유 수지는 물론 구조 시멘트 벽면 등 피도면의 형태적 왜곡에 구애받지 않고 페인트 스프레이 분사 도포하는 것만으로 그 즉시 완벽한 영구 고밀도 열교환기로 승밀 변성됩니다.",
      stats: [
        { label: isEn ? "Substrate Limit" : "기재 형태 가공성", value: "무제한" },
        { label: isEn ? "Bonding Adhesion" : "표면 부착 인장력", value: "5B 최고등급" },
        { label: isEn ? "Thickness Layer" : "초박막 코팅 규격", value: "25 - 40 ㎛" }
      ]
    },
    {
      id: 3,
      tag: isEn ? "PERFORMANCE COMPARISON GRAPH" : "기존 히터 대비 정량 가치 평가",
      title: isEn ? "03. Thermal Conversion Efficiency vs. Legacy Pipes" : "03. 기존 니크롬 열선 히터 대비 정밀 대조 지표",
      desc: isEn
        ? "Standard resistive heatpipes exhibit severe thermal lag and waste substantial power. Our conductive coating targets exact surface layers directly, accelerating startup speed by over 5.3 times."
        : "금속 도관 내부에서 간접 가열을 거치는 구형 히트 파이프 방식은 열전달 지연(Thermal Lag)이 극심하여 엄청난 에너지를 낭비합니다. MOASD 세라믹 코팅은 외곽 표면에 발열 활성체를 직접 배치하여, 열에너지 열전도 손실율을 1% 미만으로 극한 통제합니다.",
      stats: [
        { label: isEn ? "Heat Rate Boost" : "최고 온도 도달 속도", value: "5.3배 속행" },
        { label: isEn ? "Thermal Uniformity" : "면상 발열 온도 균일도", value: "98% 정밀" },
        { label: isEn ? "Maintenance Cost" : "반복 유지보수 비용", value: "-90% 격감" }
      ]
    },
    {
      id: 4,
      tag: isEn ? "INDUSTRIAL COLD-WEATHER USE CASES" : "산업 생태계 적용 분야",
      title: isEn ? "04. Dynamic Field Applications & Solutions" : "04. 혹한기 대비 선진 산업 주요 적용 실증",
      desc: isEn
        ? "Optimized for military Arctic cold tents, high-capacity electric vehicle battery thermal shields, solar panel surface defrosting, and chemical piping anti-freeze wraps."
        : "추운 북극지방 군용 야전 텐트 난방, 전기 자동차 배터리 팩 저온 보온 하우징, 눈사태 결빙을 원천 차단해야 하는 대형 태양광 솔라 셀 패널 제빙 장치, 화학 공장 화학물질 이송 배관 동파 방지 피복에 장착되어 전천후 극도의 친환경 성과를 달성하고 있습니다.",
      stats: [
        { label: isEn ? "Anti-Frost Protection" : "결빙 제설 승온 성능", value: "Perfect" },
        { label: isEn ? "Chemical Resistance" : "기어 염수 저항력", value: "고내식성" },
        { label: isEn ? "Curing Temp" : "상온 신속 경화 속도", value: "24Hr 이내" }
      ]
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
              CONDUCTIVE HEAT COATING SCROLL MODE
            </span>
            <span className="text-xs text-cyan-400 font-extrabold">
              {isEn ? "Continuous Scroll Mode Enabled (Scroll Down to View All Pages)" : "연속 스크롤 연동 활성화 (밑으로 스크롤하여 모든 페이지를 차례로 확인하세요)"}
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase font-mono font-black text-slate-400 border border-white/10 px-3 py-1 rounded bg-slate-950/40">
          {isEn ? "4 Technical Pages" : "총 4개의 기술 세부 페이지 스택"}
        </div>
      </div>

      {/* 🔮 PAGE 01: Core Theory */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 01
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {slides[0].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[0].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[0].desc}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Ultra-safe operation on 12V-36V, preventing shock or spark hazards."
                : "✓ 정격 극소 저전압(12V~36V) 구동으로 시공 기재 표면에 고전압 교류 누출 위험이나 스파크 화재 위험을 완벽 차단하여, 가혹한 다습 야외 설치 환경에서도 100% 안전성을 시현합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                INTERACTIVE VOLTAGE SIMULATOR
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Dynamic Voltage-to-Heat Simulator" : "정격 저전압 조절에 따른 실시간 면상 승온 시뮬레이션"}
              </h5>
              
              {/* Dynamic Simulator Widget */}
              <div className="p-5 bg-slate-900/50 border border-cyan-500/20 rounded-xl space-y-4 shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>{isEn ? "Input Voltage" : "제어 입력 전압 (V)"}</span>
                  <span className="text-cyan-400 font-black text-sm">{voltage} V</span>
                </div>
                
                {/* Custom Input Range Slider */}
                <input 
                  type="range" 
                  min="12" 
                  max="36" 
                  value={voltage} 
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-slate-400 block">{isEn ? "Surface Temp" : "바닥/도막 온도"}</span>
                    <span className="text-sm font-black text-rose-400 font-mono block mt-0.5">{surfaceTemp} ℃</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-slate-400 block">{isEn ? "Heating Speed" : "발열 도달속도"}</span>
                    <span className="text-sm font-black text-cyan-400 font-mono block mt-0.5">{heatingSpeed} 초</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-slate-400 block">{isEn ? "Power Saving" : "가중 에너지절감"}</span>
                    <span className="text-sm font-black text-emerald-400 font-mono block mt-0.5">{powerSaved} %</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides[0].stats.map((st, i) => (
                <div key={i} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block">{st.label}</span>
                  <span className="text-sm font-black text-white font-mono block mt-0.5">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 02: Spray Interface */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 02
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {slides[1].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[1].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[1].desc}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Complete integration into the substrate eliminates mechanical peel."
                : "✓ 기존 도막 발열 기술과 달리 열에너지가 발생하면 구조적 인장 팽창 계수가 시멘트, 금속 모재와 거의 1:1로 일치하여 승온 수축 시 균열 크랙 전사가 전무합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                SUBSTRATE SPRAY ANIMATION
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Liquid Formulation Cross-Link Mechanism" : "발열 액상 포뮬러 스프레이 다중 기재 밀착 기술"}
              </h5>
              
              {/* Beautiful Vector Drawing representing Spray Coating */}
              <div className="h-44 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 200 100" fill="none">
                  {/* Substrate Base (Metal/Glass) */}
                  <rect x="10" y="70" width="180" height="20" rx="3" fill="#334155" />
                  <text x="100" y="82" fill="#94a3b8" fontSize="6.5" fontWeight="bold" textAnchor="middle">METAL / GLASS / CONCRETE SUBSTRATE</text>
                  
                  {/* Spray Gun Nozzle Icon */}
                  <path d="M 100 10 L 92 10 L 92 18 L 100 24 L 108 18 L 108 10 Z" fill="#64748b" />
                  <path d="M 97 24 L 97 32 L 103 32 L 103 24 Z" fill="#475569" />
                  
                  {/* Spray particles */}
                  <g fill="#22d3ee" opacity="0.8">
                    <circle cx="100" cy="40" r="1.5" />
                    <circle cx="95" cy="45" r="1" />
                    <circle cx="105" cy="45" r="1.2" />
                    <circle cx="90" cy="52" r="1" />
                    <circle cx="100" cy="52" r="1.8" />
                    <circle cx="110" cy="52" r="1" />
                    <circle cx="85" cy="60" r="0.8" />
                    <circle cx="100" cy="60" r="1.5" />
                    <circle cx="115" cy="60" r="0.8" />
                  </g>
                  
                  {/* Highly bonded Thin film representation */}
                  <rect x="10" y="65" width="180" height="5" fill="#06b6d4" opacity="0.8" />
                  <text x="100" y="62" fill="#22d3ee" fontSize="5.5" fontWeight="black" textAnchor="middle">SAM CONDUCTIVE NANO COAT (25㎛)</text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides[1].stats.map((st, i) => (
                <div key={i} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block">{st.label}</span>
                  <span className="text-sm font-black text-white font-mono block mt-0.5">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 03: Performance Graph */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 03
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {slides[2].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[2].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[2].desc}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ 5.3x faster heating compared to traditional fluid-filled heating pipe assemblies."
                : "✓ 내부 가열 매체를 밀어 올려 방열 대기 시간이 20분 이상 소요되는 고전 방열 배관 방식 대비, 단 5초도 안되어 정상 타겟 승온 범위에 안착하여 시간적, 경제적 손실을 획기적으로 차감합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                COMPARATIVE THERMAL PERFORMANCE
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Time-to-Temperature Elevation Matrix" : "전원 인가 시간별 발열 승온 속도 대조 매트릭스"}
              </h5>
              
              {/* Comparative Stat bars */}
              <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl space-y-3 font-sans">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-cyan-400 font-bold">MOASD SAM Conductive Liquid Coating (발열코팅)</span>
                    <span className="text-cyan-400 font-black font-mono">5.0s (75℃)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Traditional Sheath Pipe Heater (구형 도관 전열선)</span>
                    <span className="text-slate-400 font-black font-mono">180s (45℃)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-slate-600 rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Standard Nichrome Wire Pad (전기 장판)</span>
                    <span className="text-slate-400 font-black font-mono">300s+ (38℃)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-slate-800 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides[2].stats.map((st, i) => (
                <div key={i} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block">{st.label}</span>
                  <span className="text-sm font-black text-white font-mono block mt-0.5">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 04: Industrial Case Studies */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 04
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {slides[3].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[3].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[3].desc}
              </p>
            </div>

            <div className="p-4 bg-cyan-950/15 border border-cyan-500/20 rounded-xl text-[10.5px] text-cyan-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Elite multi-functional certification ensuring robust chemical proofing and weather resistance."
                : "✓ 결빙 및 성에 방지는 영하 40도 극한 혹한기 구동 환경에서 정상 활성 검증을 완료하였으며, 전천후 산업 현장에서 완벽하게 내마모성과 내구성능이 유지됩니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                CORE APPLICATIONS & VALUE PROPOSITION
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Strategic Applied Environments" : "핵심 적용 대상 산업분야 및 최적 인프라 시너지"}
              </h5>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: isEn ? "Electric Vehicles" : "전기 주행 자동차", desc: isEn ? "Battery thermal blankets." : "배터리 팩 동결 예방 가열층" },
                  { title: isEn ? "Marine Defrosting" : "조선·해양 인프라", desc: isEn ? "Ice protection on ship hulls." : "선박 윈드실드 표면 제빙 차선" },
                  { title: isEn ? "Greenhouse Heating" : "시설 원예 공조 난방", desc: isEn ? "High efficiency greenhouse piping." : "공장형 대형 돔 농장 가습 가관" },
                  { title: isEn ? "Industrial Tanks" : "화학 정화 탱크 배관", desc: isEn ? "Anti-freeze insulation wrap." : "화학용액 이송 튜브 동파 방지" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-cyan-400 block">{item.title}</span>
                    <span className="text-[10px] text-slate-400 block leading-normal">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides[3].stats.map((st, i) => (
                <div key={i} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block">{st.label}</span>
                  <span className="text-sm font-black text-white font-mono block mt-0.5">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
