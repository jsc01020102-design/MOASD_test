import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, ShieldCheck, CheckCircle, Flame, Thermometer, Gauge, Compass } from 'lucide-react';

interface PolarisAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const PolarisAdvancedShowcase: React.FC<PolarisAdvancedShowcaseProps> = ({ language, isEn }) => {
  const [thermalPower, setThermalPower] = useState(50); // Thermal output power range from 10% to 100%

  // Formulas for the interactive Infrared Thermal Pad Simulator on Page 05:
  const targetTemp = Math.round(30 + (thermalPower / 100) * 55); // 30C to 85C
  const farInfraredRate = (88 + (thermalPower / 100) * 11).toFixed(1); // 88% to 99% emission rate
  const anionConcentration = Math.round(800 + (thermalPower / 100) * 1200); // 800 to 2000 anions/cc

  const slides = [
    {
      id: 1,
      tag: isEn ? "SINTERED INTERFACIAL BONDING" : "폴라리스 융착 기술의 개념",
      title: isEn ? "01. Polaris Sintered SAM Coating Agent" : "01. 폴라리스 코팅 (특수 무기질 금속·구조물 융착)",
      desc: isEn
        ? "Unlike traditional Teflon coatings which require heavy organic binder layers prone to peeling, Polaris utilizes ion/covalent bonding directly with structural substrate atoms to formulate a permanent, seamless glass-ceramic layer."
        : "접착 유기제(Binder)를 강제 중간 대포시키는 불소수지(Teflon) 방식의 고질적인 표면 들뜸 한계를 정면 격파하고, 금속이나 특수 모재 표면의 원자들과 직접 공유·이온 결합을 형성함으로써 이질 가교 경계면 박리가 원천 차단되는 차세대 1회 고온 가열 융착 무기 세라믹 극박막 기술입니다.",
      stats: [
        { label: isEn ? "Bonding Layer" : "기재 접착 강인력", value: "최상위 5B" },
        { label: isEn ? "Operating Temp" : "안정 가동 한계온도", value: "450℃+" },
        { label: isEn ? "Adhesive Binder" : "중간 고분자 바인더", value: "배제 (0%)" }
      ]
    },
    {
      id: 2,
      tag: isEn ? "SEM MICROSCOPE & IMPACT REPORT" : "전자현미경 및 혹독한 환경 검증",
      title: isEn ? "02. SEM Microscopic Integrity & Cathodic Disbondment" : "02. SEM 전자현미경 단면 분석 및 혹독한 물성 검증",
      desc: isEn
        ? "Scanning Electron Microscope (SEM) analysis verifies zero pinholes or cracks within the Polaris interface. Rigorous cathodic disbondment and impact test results confirm zero flaking under physical stress."
        : "초고정밀 주사 전자현미경(SEM) 분석을 통해 내부에 단 하나의 미세 기공(Pinhole)이나 마이크로 크랙조차 허용치 않는 고밀도 구획 배열 상태를 확인하였습니다. 물리적인 타격 충격 및 전자기 음극 박리 테스트에서도 가혹한 충격 응력을 완벽 완충 분산합니다.",
      stats: [
        { label: isEn ? "Interfacial Voids" : "마이크로 기공 밀도", value: "0.0%" },
        { label: isEn ? "Cathodic Disbond" : "음극 박리 저항 성능", value: "Perfect" },
        { label: isEn ? "Impact Resilience" : "물리적 인장 타격력", value: "No Crack" }
      ]
    },
    {
      id: 3,
      tag: isEn ? "ANTIBACTERIAL & 9H CERTIFICATIONS" : "항균성 및 9H 연필경도 인증",
      title: isEn ? "03. Antibacterial Certifications & KCL 9H Hardness" : "03. 공식 항균·항곰팡이 검증 및 9H 표면 내마모 경도",
      desc: isEn
        ? "Certified by official KCL test suites to deliver a 99.9% antibacterial rate against E. coli and yellow staph, coupled with an elite 9H pencil hardness layer that shields against direct key scratches."
        : "공식 시험연구원(KCL) 정밀 검사 결과, 대장균, 황색포도상구균 및 푸른곰팡이 번식률을 99.9% 완벽 살멸 차단하는 극도의 생체 청정 위생막을 선사합니다. 동시에 9H 연필경도 기준을 충족하여 날카로운 긁힘이나 마찰 마모에 대한 완벽 방어막을 구축합니다.",
      stats: [
        { label: isEn ? "Antibacterial Rate" : "유해균 번식 소멸력", value: "99.9%" },
        { label: isEn ? "Pencil Hardness" : "KCL 마모 경도 규격", value: "9H+" },
        { label: isEn ? "Deodorization" : "암모니아 가스 탈취율", value: "92%" }
      ]
    },
    {
      id: 4,
      tag: isEn ? "MARINE ANTI-FOULING PLATFORM" : "해양 바이오 오염 억제",
      title: isEn ? "04. Marine Anti-Fouling (Barnacle Protection)" : "04. 해양 따개비 부착 방지 및 제타 전위 제어",
      desc: isEn
        ? "Polaris regulates Zeta surface potential to repel aquatic bio-fouling agents such as barnacles and mosses without resorting to toxic chemicals, keeping oceanic infrastructures clean and eco-safe."
        : "유독성 화학 성분의 살포 없이, 오직 세라믹 표면의 Zeta 음(-)전하 전기 배열 배열 통제 기술만으로 바다속 따개비, 해조류 등 해양 기생 바이오 군락의 부착 흡착 메커니즘을 마이크로 단에서 거부 억제하여, 해상 교각 및 선박 바닥의 수명을 연장하는 독보적 방오 공법입니다.",
      stats: [
        { label: isEn ? "Zeta Potential" : "표면 전위 통제 대역", value: "Negative" },
        { label: isEn ? "Barnacle Adhesion" : "바이오 따개비 흡착율", value: "< 1.5%" },
        { label: isEn ? "Eco Friendly" : "친환경 해조류 안전성", value: "Certified" }
      ]
    },
    {
      id: 5,
      tag: isEn ? "THERMAL PAD DEVICE DEPLOYMENT" : "온열 치료 및 산업 기기 연계",
      title: isEn ? "05. MOASD SAM Far-Infrared Thermal Pad System" : "05. 폴라리스 온열 찜질 기기 및 원적외선 방사체",
      desc: isEn
        ? "Integrating Polaris coatings directly onto carbon-nanotube heaters triggers high-density resonance, emitting 91% far-infrared waves that boost cellular recovery and blood flow with clinical efficacy."
        : "폴라리스 세라믹 입자를 특수 카본 발열 소체에 내장 가교하여 고전도 전력을 주사하면, 인체 세포와 완벽 공명 작용을 일으키는 원적외선(양자 에너지)이 91% 이상 밀도 높게 방출됩니다. 인체 피부 심부까지 온열을 고르게 침투시켜 신진대사 및 혈액순환을 정량 촉진합니다.",
      stats: [
        { label: isEn ? "Far-Infrared Rate" : "원적외선 주사율", value: "91%+" },
        { label: isEn ? "Deep Heat Depth" : "피부 심부 전열 도달", value: "40mm+" },
        { label: isEn ? "Anion Emission" : "공명 분자 음이온수", value: "1200+ cc" }
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
              POLARIS COATING SCROLL MODE
            </span>
            <span className="text-xs text-cyan-400 font-extrabold">
              {isEn ? "Continuous Scroll Mode Enabled (Scroll Down to View All Pages)" : "연속 스크롤 연동 활성화 (밑으로 스크롤하여 모든 페이지를 차례로 확인하세요)"}
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase font-mono font-black text-slate-400 border border-white/10 px-3 py-1 rounded bg-slate-950/40">
          {isEn ? "5 Technical Pages" : "총 5개의 기술 세부 페이지 스택"}
        </div>
      </div>

      {/* 🔮 PAGE 01: Concept */}
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
                ? "✓ Complete molecular fusion completely eliminates traditional interface peeling."
                : "✓ 고열 가압 융착 시 모재 고유의 열팽창을 완벽 감싸 쥐는 세라믹 공융 배합구조로, 차량 고속 회전 및 혹독한 대형 지게차 압력 하중에도 통째로 뜯겨 나가는 페인팅 결함이 전무합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                SINTERED MOLECULAR LAYERING
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Polaris Sintered vs. Teflon Binder Layers" : "폴라리스 융착막과 불소수지 도장 하방 계면 대비 구조"}
              </h5>
              
              {/* Complex chemical comparison SVG from old Slide 2 */}
              <div className="h-44 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-3 relative overflow-hidden">
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 180 90">
                  {/* Steel Matrix */}
                  <rect x="5" y="65" width="170" height="20" fill="#334155" />
                  <text x="90" y="77" fill="#94a3b8" fontSize="6.5" fontWeight="bold" textAnchor="middle">STEEL / CONCRETE BASE MATRIX</text>
                  
                  {/* Polaris Cohesion - Direct Sharing Atoms */}
                  <path d="M 5 65 Q 45 62 90 65 T 175 65" stroke="#22d3ee" strokeWidth="1.5" />
                  <rect x="5" y="48" width="170" height="15" fill="url(#polarisGlow)" opacity="0.9" />
                  <text x="90" y="57" fill="#2dd4bf" fontSize="6.5" fontWeight="black" textAnchor="middle">POLARIS ION FUSED GLASS-CERAMIC</text>
                  
                  {/* Teflon Binder comparison offset details */}
                  <line x1="5" y1="44" x2="175" y2="44" stroke="#475569" strokeWidth="0.5" strokeDasharray="3 3" />
                  <g fill="#0ea5e9" fontSize="6" fontWeight="bold">
                    <text x="15" y="42">Direct Sharing Bonds (No Adhesive Binder = Zero Delamination)</text>
                  </g>
                  
                  <defs>
                    <linearGradient id="polarisGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
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

      {/* 🔮 PAGE 02: SEM Microscope */}
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
                ? "✓ Disbondment testing validates zero under-film creep under galvanic currents."
                : "✓ 도막 하부 전기적 이온 이동 저하성 테스트를 통해 타일 교면 및 구조물 기저 철판에서 전기화학적 산화 가교가 소멸하는 방어 한계를 입증하였습니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                 주사 전자현미경(SEM) 단면 50000x 실사 묘사
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Pinhole-Free Sintered Surface Micrograph" : "극미세 기공 완전 봉밀화 결정 단면 구조"}
              </h5>
              
              {/* Microscope/SEM Cross section representation */}
              <div className="h-44 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                <svg className="w-full h-full text-teal-400" viewBox="0 0 160 80">
                  <rect width="160" height="80" fill="#1e293b" />
                  <circle cx="80" cy="40" r="35" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Microscopic Crystalline pattern within target circle */}
                  <path d="M 60 25 L 75 35 L 90 20 L 105 38 L 80 55 L 60 25 Z" fill="#047857" opacity="0.4" />
                  <path d="M 75 35 L 80 55 M 90 20 L 105 38" stroke="#10b981" strokeWidth="0.75" />
                  
                  <g fill="#38bdf8" fontSize="4.5" fontWeight="bold">
                    <text x="80" y="70" textAnchor="middle">POLARIS SILICA CRYSTALS (50,000x)</text>
                    <text x="80" y="76" textAnchor="middle" fill="#94a3b8">NO PINHOLES / ZERO VACANCY</text>
                  </g>
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

      {/* 🔮 PAGE 03: Certifications */}
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
                ? "✓ Verified by official certification to retain long-term structural power under abrasive stress."
                : "✓ 대형 시설 상가 바닥, 지하 화물 운송 터미널 통행 구획에 안성맞춤으로 시공되어 극미세 먼지 차폐 및 스크래치 완전 거부를 시계열 실증 완료하였습니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                OFFICIAL REPORT SPECIFICATION METRICS
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Official KCL Laboratory Authentications" : "KCL 화학시험연구원 공식 성적 규격"}
              </h5>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: isEn ? "E. Coli Antibacterial" : "대장균 항균력", desc: "99.9% Perfect Seal (KCL)", color: "text-teal-400" },
                  { title: isEn ? "Antifungal Class 1" : "항곰팡이 번식 억제력", desc: "0등급 번식 전무 인증", color: "text-emerald-400" },
                  { title: isEn ? "Pencil Scratch Test" : "표면 경도 내스크래치", desc: "9H 마찰 긁힘 전무", color: "text-amber-400" },
                  { title: isEn ? "Deodorization Rate" : "암모니아 가스 탈취율", desc: "92.0% (KCL 120min)", color: "text-cyan-400" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-slate-200 block">{item.title}</span>
                    <span className={`text-[10px] ${item.color} font-mono font-black block leading-normal`}>{item.desc}</span>
                  </div>
                ))}
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

      {/* 🔮 PAGE 04: Marine anti-fouling */}
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

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Zeta potential repels ocean bio-fouling without copper/toxic biocides."
                : "✓ 해양 구조물 부착 따개비 및 해조류 결착을 원천 억제함으로써, 고가의 친환경 도막 유지력을 해양 오염 없이 극대화하는 독보적 전기배열 배료 기작입니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                ZETA POTENTIAL BIO-REPULSION
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Zeta-Potential Anti-Fouling Mechanics" : "음(-) 전하 제타 전위에 의한 따개비 부착 회피 기작"}
              </h5>
              
              {/* Barnacle bio-repulsion graphic */}
              <div className="h-44 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 160 80">
                  <rect width="160" height="80" fill="#0c4a6e" />
                  
                  {/* Negative potential surface */}
                  <rect y="60" width="160" height="20" fill="#0284c7" />
                  <g fill="#fff" fontSize="5" fontWeight="bold">
                    <text x="5" y="72">POLARIS NEGATIVE ELECTRODE COAT</text>
                  </g>
                  {/* Minus signs representing negative charge */}
                  <g fill="#38bdf8" fontSize="8" fontWeight="black">
                    <text x="15" y="58">-</text><text x="35" y="58">-</text>
                    <text x="55" y="58">-</text><text x="75" y="58">-</text>
                    <text x="95" y="58">-</text><text x="115" y="58">-</text>
                    <text x="135" y="58">-</text><text x="155" y="58">-</text>
                  </g>
                  
                  {/* Drifting bio particles being deflected */}
                  <circle cx="40" cy="20" r="3" fill="#bef264" />
                  <path d="M 40 20 Q 50 30 45 42 Q 35 48 20 48" stroke="#bef264" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                  <text x="45" y="16" fill="#bef264" fontSize="4.5">Barnacle Larva (따개비 유충)</text>
                  <text x="25" y="44" fill="#f43f5e" fontSize="5" fontWeight="black">DEFLECTED! (흡착 불가 거부)</text>
                </svg>
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

      {/* 🔮 PAGE 05: Thermal Pad Device */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 05
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {slides[4].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[4].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[4].desc}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ 91% far-infrared emissions verified, yielding outstanding clinical deep tissue heating."
                : "✓ 찜질방, 한의원, 병원 물리치료실의 양자 원적외선 찜질 매트 시스템에 특화 융착 적용되어, 일반 니크롬 탄소 매트와 비교 불가능한 심부 체온 수송 성과를 완벽 증명하고 있습니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                INFRARED THERMAL REGULATION SIMULATOR
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Carbon Nanotube Far-Infrared Resonator" : "카본 세라믹 원적외선 공명 에너지 제어기"}
              </h5>
              
              {/* Thermal Pad Interactive Widget */}
              <div className="p-5 bg-slate-900/50 border border-cyan-500/20 rounded-xl space-y-4 shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>{isEn ? "Far-Infrared Power Output" : "원적외선 조사 세기 제어 (%)"}</span>
                  <span className="text-amber-400 font-black text-sm">{thermalPower} %</span>
                </div>
                
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={thermalPower} 
                  onChange={(e) => setThermalPower(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-slate-400 block">{isEn ? "Far-IR Emission" : "원적외선 방사율"}</span>
                    <span className="text-sm font-black text-amber-400 font-mono block mt-0.5">{farInfraredRate} %</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-slate-400 block">{isEn ? "Target Tissue Heat" : "찜질부 심부 승온"}</span>
                    <span className="text-sm font-black text-rose-400 font-mono block mt-0.5">{targetTemp} ℃</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-slate-400 block">{isEn ? "Anion Concentration" : "방출 음이온수"}</span>
                    <span className="text-sm font-black text-emerald-400 font-mono block mt-0.5">{anionConcentration} cc</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides[4].stats.map((st, i) => (
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
