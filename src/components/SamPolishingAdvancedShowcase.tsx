import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  CheckCircle, 
  Flame, 
  Droplet, 
  Wrench, 
  AlertTriangle,
  Activity,
  TrendingUp,
  Shield,
  Clock,
  Trash2
} from 'lucide-react';

interface SamPolishingAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const SamPolishingAdvancedShowcase: React.FC<SamPolishingAdvancedShowcaseProps> = ({ 
  language, 
  isEn
}) => {

  // --- Comparison Matrix Data ---
  const comparisonData = [
    {
      criterion: '통기성 (Breathability)',
      sam: '양호 (Good)',
      epoxy: '불량 (Poor)',
      samHighlight: true,
      desc: isEn ? 'SAM is breathable, letting moisture escape without blistering.' : '콘크리트 내부 습기 배출이 원활하여 들뜸 현상을 차단합니다.'
    },
    {
      criterion: '콘크리트 강도 (Strength)',
      sam: '표면강도 증가 (Increased)',
      epoxy: '표면강도 약화 (Weakened)',
      samHighlight: true,
      desc: isEn ? 'Chemically fuses to concrete, boosting structural load capacity.' : '표면층과의 이질감 및 노화로 인해 강도가 점진적 저하됩니다.'
    },
    {
      criterion: '콘크리트 수명 (Lifespan)',
      sam: '증가 (Extended)',
      epoxy: '단축 (Shortened)',
      samHighlight: true,
      desc: isEn ? 'Shields concrete from external elements, prolonging life.' : '수지 피막 수명 한계 도달 시 콘크리트 열화가 빠르게 유발됩니다.'
    },
    {
      criterion: '부식·손상예방 (Corrosion Prevention)',
      sam: '손상 예방 (Prevented)',
      epoxy: '손상 초래 (Caused)',
      samHighlight: true,
      desc: isEn ? 'Prevents surface dusting, peeling, and dynamic spalling.' : '내부 수분 침투 및 산성화 반응으로 모체 부식 파임을 유도합니다.'
    },
    {
      criterion: '크렉 & 들뜸 현상 (Cracking/Peeling)',
      sam: '없음 (None)',
      epoxy: '발생 (Occurs)',
      samHighlight: true,
      desc: isEn ? 'Zero peeling as the layer chemically bonds with the matrix.' : '온습도 편차에 의한 열팽창 불일치로 들뜸과 크랙이 생깁니다.'
    },
    {
      criterion: '미끄러짐 현상 (Slippage)',
      sam: '없음 [논슬립] (Non-Slip)',
      epoxy: '발생 [슬립] (Slippery)',
      samHighlight: true,
      desc: isEn ? 'Natural micro-friction profile prevents vehicle/pedestrian slips.' : '물기 노출 시 마찰계수가 급감하여 차량 바퀴 미끄럼 소음이 발생합니다.'
    },
    {
      criterion: '화재 (Fire Safety)',
      sam: '불연 (Non-Flammable)',
      epoxy: '난연 (Flame-Retardant)',
      samHighlight: true,
      desc: isEn ? 'Inorganic ceramic material that does not ignite or release toxic gas.' : '화재 발생 시 고농도 유독가스를 발생시키며 기폭제 역할을 합니다.'
    },
    {
      criterion: '유지·보수비용 (Maintenance Cost)',
      sam: '반영구적 (Semi-Permanent)',
      epoxy: '주기적 비용발생 (Recurring)',
      samHighlight: true,
      desc: isEn ? 'Extremely long lifecycle yields minimal maintenance costs.' : '3~5년 주기별 전면 제거 및 재도장 비용이 과다 소요됩니다.'
    },
    {
      criterion: '환경성 (Eco-Friendliness)',
      sam: '환경친화적 (Eco-Friendly)',
      epoxy: '환경파괴적 (Eco-Harmful)',
      samHighlight: true,
      desc: isEn ? 'Water/alcohol solvents used. Zero hazardous emissions.' : '유기 합성수지 가교 결합물로서 폐기 시 환경을 오염시킵니다.'
    },
    {
      criterion: '중성화 & 염화 (Carbonation/Chlorination)',
      sam: '방지 (Prevented)',
      epoxy: '가속화 (Accelerated)',
      samHighlight: true,
      desc: isEn ? 'Blocks carbon dioxide penetration, keeping the concrete alkaline.' : '산성 에폭시 수지 반응으로 인해 중성화 부식이 촉진됩니다.'
    },
    {
      criterion: '10대 오염물질 (10 Key Pollutants)',
      sam: '해당 무 (None)',
      epoxy: '해당 (Applicable)',
      samHighlight: true,
      desc: isEn ? 'Completely free from regulatory hazardous air pollutants.' : '휘발성 유기화합물(VOCs) 방출로 실내 공기질 기준을 초과합니다.'
    }
  ];

  // --- SAM Hardener Benefits ---
  const hardenerBenefits = [
    {
      title: isEn ? 'Surface Strength Hardening' : '표면 강도 강화',
      tag: 'STRENGTH BOOSTER',
      color: 'from-cyan-500 to-teal-500',
      desc: isEn 
        ? 'Protects floors in parking lots and logistics warehouses from tire tracks and forklift damage. ECT + Calcium Hydroxide reacts to formulate ultra-hard Calcium Silicate Hydrate, boosting surface strength by 150~200%.'
        : '주차장, 물류창고 등 차량(지게차) 타이어 자국으로부터 표면을 완벽히 보호합니다. ECT + 수산화칼슘 반응을 유도하여 초경질 규산칼슘 결정을 형성함으로써 표면 강도를 150~200% 정량 증진합니다.',
    },
    {
      title: isEn ? 'Early Curing Effect' : '조기 양생 효과',
      tag: 'FAST CURING',
      color: 'from-blue-500 to-cyan-500',
      desc: isEn
        ? 'Combines with Calcium (Ca) and Potassium (K) to accelerate concrete curing time. Highly efficient moisture retention delivers uniform curing and prevents concrete cracks.'
        : '칼슘, 칼륨과 직접 결합하여 콘크리트 양생 시간을 대폭 단축시킵니다. 수밀성 보습 효과를 제공하여 얼룩 없는 균일한 양생을 보장하며, 콘크리트 크랙 발생을 능동 차단합니다.',
    },
    {
      title: isEn ? 'Contaminant Penetration Prevention' : '오염물 침투방지',
      tag: 'PORE SEALING',
      color: 'from-purple-500 to-indigo-500',
      desc: isEn
        ? 'Fills microscopic voids inside concrete to seal pores against contaminants and impurities. Converts weak Calcium Hydroxide into robust Calcium Silicate/Carbonate, preventing dusting.'
        : '콘크리트 내부의 미세공극을 조밀하게 채워 오염물 및 불순물의 기공 침투를 차단합니다. 취약한 수산화칼슘 결정을 결합력이 단단한 규산칼슘/탄산칼슘 구조로 치환하여 미세 먼지 발생을 차단합니다.',
    },
    {
      title: isEn ? 'Water Repellency & Waterproofing' : '발수·방수 효과',
      tag: 'HYDROPHOBIC LAYER',
      color: 'from-emerald-500 to-teal-500',
      desc: isEn
        ? 'Provides dense surface waterproofing and oil repellency via microscopic capillary filling. Acts as a protective barrier shielding the concrete from chemical spills and staining agents.'
        : '기공 채움과 표면 평면 작용을 극대화하여 콘크리트 상단부에 조밀한 발수·방오 기능을 선사합니다. 부식성 화학 성분과 유색 오염물질로부터 콘크리트 모재를 안전하게 격리 보호합니다.',
    },
    {
      title: isEn ? 'Floor Lifespan Extension' : '바닥 수명연장',
      tag: 'PERMANENT GLOSS',
      color: 'from-amber-500 to-orange-500',
      desc: isEn
        ? 'Blocks acidic carbon dioxide ingress, preventing concrete carbonation while keeping it alkaline and retaining its gloss. Greatly extends repair cycles and minimizes recurring maintenance costs.'
        : '공기 중 탄산가스 침투에 의한 중성화를 완벽히 막아내어 콘크리트 수명을 반영구 연장하고 본연의 은은한 광택을 보존합니다. 유지보수 주기가 획기적으로 연장되어 관리 비용을 최소화합니다.',
    }
  ];

  // --- Step-by-Step Polishing Process Sequence ---
  const processSteps = [
    {
      step: 1,
      title: isEn ? 'Concrete Surface Grinding (1st)' : '콘크리트 면처리 (1회)',
      subtitle: isEn ? 'Metal Grinding: Metal #30' : '메탈(연삭) : 메탈 #30',
      desc: isEn
        ? 'Perform initial rough grinding using a metal diamond #30 pad to level the concrete surface and open the surface pores.'
        : '메탈 다이아몬드 #30 패드로 콘크리트 표면의 불순물 및 레이턴스를 깎아내고 모재 기공을 확실히 열어줍니다.',
      badge: 'Metal #30'
    },
    {
      step: 2,
      title: isEn ? 'Concrete Floor Repair' : '콘크리트 바닥 보수 (크랙·파임)',
      subtitle: isEn ? 'Ceramic Binder / Silicate Mortar' : '세라믹 바인더 / 규산질계 몰탈',
      desc: isEn
        ? 'Repair cracks, micro-fissures, and pothole depressions using a high-durability ceramic binder or silicate mortar to level the floor.'
        : '바닥의 크랙 및 파손되어 움푹 파인 부위를 세라믹 바인더나 규산질계 몰탈을 혼합 적용하여 메꿈 처리하고 면을 고르게 정돈합니다.',
      badge: 'Repair & Patch'
    },
    {
      step: 3,
      title: isEn ? 'Ceramic Hardener Application (2 Coats)' : '세라믹 침투강화제 도포 (2회)',
      subtitle: isEn ? 'Deep Penetration & Crystallization' : '충분히 침투시켜 콘크리트와 일체화',
      desc: isEn
        ? 'Liberally apply the ceramic penetrating hardener, allowing it to penetrate deep inside the pores to chemically fuse with the concrete.'
        : '무기계 액상 세라믹 침투강화제를 2회에 걸쳐 고르게 분사·도포하여 내부 깊숙이 충분히 침투시키고 콘크리트와 화학적으로 일체화합니다.',
      badge: '2-Coat Hardener'
    },
    {
      step: 4,
      title: isEn ? 'Metal Grinding Refinement' : '메탈(연삭) : 바닥 정리',
      subtitle: isEn ? 'Metal Grinding: Metal #100' : '메탈 #100으로 바닥 정리',
      desc: isEn
        ? 'Perform fine grinding with a metal #100 pad. Carry out additional grinds depending on concrete conditions (at least twice).'
        : '메탈 다이아몬드 #100 패드를 장착하여 바닥면을 평탄하고 깨끗하게 재연삭 정리합니다. 현장 조건에 따라 2회 이상 실시합니다.',
      badge: 'Metal #100'
    },
    {
      step: 5,
      title: isEn ? 'Resin Pad Honing & Polishing' : '레진패드(연마) 공정',
      subtitle: isEn ? 'Sequential Grits: #200, #400, #800' : '#200, #400, #800 순차 연마',
      desc: isEn
        ? 'Transition to resin pads. Hone sequentially from #200, to #400, and finally #800 to bring up a uniform, smooth polish.'
        : '연마용 레진 패드 #200을 시작으로 #400, #800 순으로 부드럽게 고속 주행하여 바닥면의 고밀도 정밀 광택 연마를 순차 진행합니다.',
      badge: 'Honing #200-800'
    },
    {
      step: 6,
      title: isEn ? 'Ceramic Protective Coating (2 Coats)' : '세라믹 코팅제(마감제) 2회 도포',
      subtitle: isEn ? 'Inorganic Ceramic Sealer' : '무기물 세라믹 보호제',
      desc: isEn
        ? 'Apply the inorganic ceramic coating sealer twice. It cross-links with the hardener layer to protect the surface, prevent water ingress, and block dirt.'
        : '고내구성 무기질 세라믹 마감 코팅제를 2회 도포합니다. 이미 침투된 강화층과 강력 화학 결합하여 먼지 방출을 차단하고 반영구 내후성을 선사합니다.',
      badge: '2-Coat Finish'
    },
    {
      step: 7,
      title: isEn ? 'Line Marking & Final Seal Coat' : '주차선 도색 및 최종 추가 세라믹 코팅',
      subtitle: isEn ? 'Parking Lines & Overall Protective Seal' : '주차선 도색 후 세라믹 추가 1회 도포',
      desc: isEn
        ? 'Paint parking lines if applicable. Apply one final coat of ceramic sealer across the entire floor, including the markings, to seal and protect them.'
        : '주차장 부지일 경우 규격 주차선을 도색한 후, 해당 도색 도포면을 포함한 바닥 전체에 최종 세라믹 마감재를 1회 추가 도포하여 보호막을 완성합니다.',
      badge: 'Final Seal Guard'
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
              SAM POLISHING SCROLL INJECTOR
            </span>
            <span className="text-xs text-cyan-400 font-extrabold">
              {isEn ? "Continuous Scroll Mode Enabled (Scroll Down to View All Pages)" : "연속 스크롤 연동 활성화 (밑으로 스크롤하여 모든 페이지를 차례로 확인하세요)"}
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase font-mono font-black text-slate-400 border border-white/10 px-3 py-1 rounded bg-slate-950/40">
          {isEn ? "9 Full Technical Pages" : "총 9개의 기술 세부 페이지 스택"}
        </div>
      </div>

      {/* 🔮 PAGE 01: Core Technology Overview */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 01
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                SAM ABRASIVE GRIT ANCHORING
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                01. SAM 세라믹 다이아몬드 세그먼트 메커니즘
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Standard grinding pads lose diamond grit rapidly under thermal stress. Our molecular SAM coating bonds copper-cobalt powder and diamonds 4.5x tighter, resolving early abrasive failure."
                  : "일반 연삭 패드는 바닥 평탄 연삭 시 발생하는 400°C 이상의 가혹한 마찰 열량으로 인해 고가의 미세 다이아몬드 입자가 조기 탈락되는 한계가 있습니다. MOASD는 합금 분말과 다이아몬드 계면에 분자 단위 SAM 박막을 이식해 마찰 탈착 결착율을 4.5배 극대화하여 공구 수명을 획기적으로 향상시켰습니다."
                }
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Keeps diamond particles anchored even under aggressive 1000+ RPM grinds."
                : "✓ 1,200 RPM 이상의 가혹한 고속 회전 연삭 압력 하중 하에서도 다이아몬드 칩이 흔들림 없이 고정 안치되어 자재 낭비와 시간 손실을 차단합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center h-44 relative overflow-hidden">
              <svg className="w-full h-full text-cyan-400" viewBox="0 0 160 80">
                <rect x="5" y="55" width="150" height="20" rx="3" fill="#334155" />
                <text x="80" y="67" fill="#94a3b8" fontSize="7" fontWeight="bold" textAnchor="middle">METAL ALLOY BOUNDING BASE</text>
                
                {/* Diamond particle bound by SAM layer */}
                <polygon points="80,15 95,35 80,55 65,35" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" />
                <text x="80" y="38" fill="#0f172a" fontSize="7" fontWeight="black" textAnchor="middle">DIAMOND</text>
                
                {/* SAM Interfacial Coating representation */}
                <path d="M 65 35 Q 80 50 95 35" stroke="#10b981" strokeWidth="3" fill="none" opacity="0.85" />
                <text x="80" y="50" fill="#10b981" fontSize="6.5" fontWeight="bold" textAnchor="middle">SAM COATING LAYER (분자 결착막)</text>
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Grit Anchoring Rate', labelKr: '입자 결착 강도', value: '450%' },
                { label: 'Thermal Endurance', labelKr: '한계 안전 임계열', value: '480℃+' },
                { label: 'Tool Lifespan Gain', labelKr: '툴 마모 수명배율', value: '3.2배' }
              ].map((st, i) => (
                <div key={i} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 block">{isEn ? st.label : st.labelKr}</span>
                  <span className="text-sm font-black text-white font-mono block mt-0.5">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 02: Epoxy & Urethane Problems */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 02
          </div>

          <div className="lg:col-span-12 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-red-400 uppercase bg-red-950/30 px-2.5 py-1 rounded border border-red-400/10 inline-block">
                EPOXY / URETHANE DEFECTS
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                02. 기존 유기 유독 도막(에폭시/우레탄)의 치명적인 시공 결함
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  title: '1. 아스팔트 주입로 크랙 전사',
                  desc: '표면 하방 수분 배출 불가로 인해 압력이 차올라 도막 표면이 점차 부풀어 오르고 바닥 지탱력이 상실되는 균열 상태.',
                  color: 'border-red-500/20',
                  renderSvg: () => (
                    <svg className="w-full h-24 rounded-lg bg-slate-900 border border-white/5 my-2" viewBox="0 0 120 70">
                      <rect width="120" height="70" fill="#2d3748" />
                      <path d="M 10 5 Q 30 15 50 10 T 110 5" stroke="#1a202c" strokeWidth="0.5" fill="none" opacity="0.4" />
                      <path d="M 5 60 Q 40 50 80 65 T 115 55" stroke="#1a202c" strokeWidth="0.5" fill="none" opacity="0.4" />
                      <circle cx="60" cy="35" r="20" fill="#f87171" opacity="0.15" filter="blur(5px)" />
                      <path d="M 0 35 L 20 32 L 35 45 L 50 30 L 75 42 L 95 28 L 110 38 L 120 35" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 15 32 L 22 20" stroke="#f87171" strokeWidth="0.75" fill="none" />
                      <path d="M 75 42 L 80 55" stroke="#f87171" strokeWidth="0.75" fill="none" />
                      <rect x="5" y="5" width="45" height="10" rx="2" fill="#1e293b" opacity="0.8" />
                      <text x="27.5" y="12" fill="#ef4444" fontSize="5" fontWeight="bold" textAnchor="middle">CRACK TRANSITION</text>
                    </svg>
                  )
                },
                {
                  title: '2. 콘크리트 박리 및 분진 비산',
                  desc: '에폭시 바닥 도막이 고중량 차량 압력에 의해 완전히 깨지며, 틈새 사이로 시멘트 미세 가루가 심각하게 뿜어 나오는 모습.',
                  color: 'border-red-500/20',
                  renderSvg: () => (
                    <svg className="w-full h-24 rounded-lg bg-slate-900 border border-white/5 my-2" viewBox="0 0 120 70">
                      <rect width="120" height="70" fill="#475569" />
                      <path d="M 30 20 L 90 50 L 100 20 Z" fill="#334155" opacity="0.6" />
                      <path d="M 0 0 L 120 0 L 120 40 L 90 25 L 75 48 L 50 35 L 25 55 L 0 30 Z" fill="#15803d" opacity="0.75" />
                      <path d="M 90 25 L 95 32 L 75 48 L 70 42" fill="#166534" stroke="#86efac" strokeWidth="0.5" />
                      <path d="M 50 35 L 53 42 L 25 55 L 22 48" fill="#166534" stroke="#86efac" strokeWidth="0.5" />
                      <circle cx="45" cy="50" r="4" fill="#cbd5e1" opacity="0.6" filter="blur(1px)" />
                      <circle cx="55" cy="55" r="5" fill="#e2e8f0" opacity="0.5" filter="blur(1.5px)" />
                      <circle cx="85" cy="45" r="3" fill="#cbd5e1" opacity="0.6" />
                      <circle cx="95" cy="52" r="4.5" fill="#94a3b8" opacity="0.4" />
                      <rect x="5" y="5" width="40" height="10" rx="2" fill="#1e293b" opacity="0.8" />
                      <text x="25" y="12" fill="#4ade80" fontSize="5" fontWeight="bold" textAnchor="middle">PEELING & DUST</text>
                    </svg>
                  )
                },
                {
                  title: '3. 산화 부식 및 표면 풍화',
                  desc: '알칼리 콘크리트가 산성 도료와 반응하여 중성화된 후 표면이 서서히 모래 알갱이처럼 바스러지는 심각한 열화 단계.',
                  color: 'border-red-500/20',
                  renderSvg: () => (
                    <svg className="w-full h-24 rounded-lg bg-slate-900 border border-white/5 my-2" viewBox="0 0 120 70">
                      <rect width="120" height="70" fill="#3f3f46" />
                      <circle cx="20" cy="30" r="1" fill="#71717a" />
                      <circle cx="40" cy="50" r="1.5" fill="#52525b" />
                      <circle cx="70" cy="20" r="1.2" fill="#a1a1aa" />
                      <circle cx="90" cy="45" r="0.8" fill="#27272a" />
                      <path d="M 10 10 Q 40 30 70 15 T 110 40" stroke="#fecdd3" strokeWidth="4" fill="none" opacity="0.15" />
                      <path d="M 5 50 Q 50 35 95 60" stroke="#ea580c" strokeWidth="2" fill="none" opacity="0.2" />
                      <path d="M 10 15 L 25 20 L 22 35 L 40 30 L 45 15 M 25 20 L 30 10 M 22 35 L 15 45 M 40 30 L 55 40 M 45 15 L 60 10" stroke="#18181b" strokeWidth="0.75" opacity="0.8" />
                      <path d="M 80 40 L 95 38 L 105 50 M 95 38 L 90 25 M 105 50 L 115 45" stroke="#18181b" strokeWidth="0.75" opacity="0.8" />
                      <rect x="5" y="5" width="40" height="10" rx="2" fill="#1e293b" opacity="0.8" />
                      <text x="25" y="12" fill="#f97316" fontSize="5" fontWeight="bold" textAnchor="middle">OXIDIZED DECAY</text>
                    </svg>
                  )
                },
                {
                  title: '4. 포트홀 파임 현상 가속화',
                  desc: '표면 지지 강도가 약화되어 타이어 충격 시 바닥 시멘트 모체가 한꺼번에 함몰되어 나가는 구조적 움푹 파임 구멍(파임 현상).',
                  color: 'border-red-500/20',
                  renderSvg: () => (
                    <svg className="w-full h-24 rounded-lg bg-slate-900 border border-white/5 my-2" viewBox="0 0 120 70">
                      <rect width="120" height="70" fill="#57534e" />
                      <path d="M 10 60 C 40 50 80 50 110 60" stroke="#1c1917" strokeWidth="8" fill="none" opacity="0.5" />
                      <path d="M 10 50 C 40 40 80 40 110 50" stroke="#1c1917" strokeWidth="2" fill="none" strokeDasharray="3,3" opacity="0.4" />
                      <path d="M 50 35 C 50 25 75 25 80 35 C 85 45 65 50 50 35 Z" fill="#292524" stroke="#78716c" strokeWidth="1" />
                      <path d="M 52 33 L 45 28 M 75 30 L 85 24 M 78 38 L 88 45 L 95 40 M 55 45 L 48 52" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="58" cy="32" r="2.5" fill="#a8a29e" />
                      <circle cx="68" cy="38" r="3.5" fill="#78716c" />
                      <circle cx="74" cy="34" r="2" fill="#44403c" />
                      <rect x="5" y="5" width="45" height="10" rx="2" fill="#1e293b" opacity="0.8" />
                      <text x="27.5" y="12" fill="#ef4444" fontSize="5" fontWeight="bold" textAnchor="middle">POT-HOLE IMPACT</text>
                    </svg>
                  )
                }
              ].map((caseItem, idx) => (
                <div key={idx} className={`bg-slate-950 p-4 rounded-xl border ${caseItem.color} flex flex-col justify-between space-y-2`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-red-400 font-mono block">DEFECT CASE #0{idx+1}</span>
                    <span className="text-xs text-slate-200 font-bold block">{caseItem.title}</span>
                    {caseItem.renderSvg()}
                    <p className="text-[10px] text-slate-400 leading-normal">{caseItem.desc}</p>
                  </div>
                  <div className="text-[9px] text-slate-500 italic pt-2 border-t border-white/5 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span>중성화된 콘크리트 표면 노후</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-red-950/10 border border-red-500/25 rounded-2xl flex items-start gap-3">
              <Trash2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-200 block">수명 한계에 따른 막대한 반복 보수 비용 과다 지출</span>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                  우레탄·에폭시 도막은 콘크리트 열화 및 중성화를 막지 못하며, 습기 상승 시 이음매 기포로 터지는 한계가 있어 평균 2~3년 단위의 전면적인 바닥 철거 재보수가 요구됩니다. 폐기물 배출량과 잦은 도막 작업으로 소요되는 공기 누적으로 유지 관리비 손해가 막대합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 03: Concrete Carbonation */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 03
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                CONCRETE CARBONATION METRICS
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                03. 콘크리트 중(산)성화에 의한 화학적 침식
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Acidic carbon dioxide reacts with Calcium Hydroxide inside concrete to form Calcium Carbonate, leading to concrete decay. SAM seals pores to maintain ideal alkaline pH."
                  : "수산화칼슘 성분을 띄는 알칼리성 콘크리트 기질이 대기 중 산성 탄산가스(CO2)와 접촉 반응하면 탄산칼슘 결정으로 바스라지며 철근 부식을 일으키고 강도가 무너집니다. MOASD SAM 솔루션은 액상 칼슘 실리카 반응을 강제 완결해 최상의 pH 알칼리 성벽을 영구 차폐 보존합니다."}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Blocks carbon dioxide infiltration, locking in structural stability."
                : "✓ 침투식 나노막이 수밀 모체 세공을 완벽 봉인하여 중성화 반응 진행율을 0.0% 극한 수준으로 동결 차단합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                CHEMICAL REACTION MATRIX
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Concrete Acidification Mechanism" : "화학적 침투 중성화 전개 속도 지표"}
              </h5>
              
              <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl space-y-3 font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-cyan-400 font-bold">MOASD SAM Penetration Shielding (SAM 침투 보존)</span>
                    <span className="text-cyan-400 font-black">pH 11.5~12.5 (안전)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-red-400">Traditional Epoxy Coated Concrete (에폭시 중성화 부식)</span>
                    <span className="text-red-400 font-black">pH 8.0~9.0 (침식 한계치 돌파)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 04: SAM vs Epoxy Comparison Matrix */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 04
          </div>

          <div className="lg:col-span-12 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                QUANTITATIVE COMPARISON MATRIX
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                04. SAM 친환경 공법과 기존 에폭시 도장 성능 대조 성적표
              </h4>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/15 bg-slate-900/60 font-mono text-[10px] text-slate-400">
                    <th className="p-4">대비 핵심 항목 (Criterion)</th>
                    <th className="p-4 text-cyan-400 font-extrabold">MOASD SAM 하이브리드 공법</th>
                    <th className="p-4 text-red-400">일반 유기 에폭시 / 우레탄 도막</th>
                    <th className="p-4">세부 설명 (Description)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white">{row.criterion}</td>
                      <td className="p-4 font-black text-teal-400 bg-cyan-950/15">{row.sam}</td>
                      <td className="p-4 text-red-400">{row.epoxy}</td>
                      <td className="p-4 text-slate-400 leading-normal text-[11px]">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 05: SAM Penetrating Hardener ECT */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 05
          </div>

          <div className="lg:col-span-12 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                SAM PENETRATING HARDENER [ECT]
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                05. 무기질계 액상 세라믹 침투제 (ECT 침투강화제) 핵심 편익
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {hardenerBenefits.map((b, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-cyan-400 font-extrabold tracking-widest block">{b.tag}</span>
                    <h5 className="text-sm font-black text-white leading-tight">{b.title}</h5>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed leading-normal">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 06: SAM Inorganic Ceramic Coating Finish */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 06
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                SAM HIGH-GLOSS CERAMIC COATING
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                06. 고경도 무기 세라믹 투명 코팅 마감제
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "A glass-like inorganic ceramic finish that chemically bonds with the concrete. Achieves exceptional gloss retention and absolute zero dust emission."
                  : "연마가 종료된 매끄러운 세라믹 바닥층 표면에 무기 결합성 유리질 코팅 마감제 포뮬러를 주입합니다. 침투 강화층과 이질감 없이 단결정 화학 결합을 형성하여, 반영구적인 영구 미러 광택 보존과 비산 분진 0.0% 완전 차폐를 완수합니다."}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Scratch proofing layer protects floors from heavy transport traffic."
                : "✓ 미끄럼 저항계수(논슬립)가 탁월하게 안정 세팅되어 물기 노출 시에도 미끄럼 소음이나 스파크 사고를 완벽 예방합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                MICROSCOPIC CROSS-SECTION ANALYSIS
              </span>
              <h5 className="text-sm font-extrabold text-white">
                SEM 주사 전자현미경 x39,000 단면 관찰
              </h5>
              
              <div className="h-44 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 160 80">
                  <rect width="160" height="80" fill="#1e293b" />
                  <path d="M 10 20 Q 80 50 150 20" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 10 20 L 150 20 L 150 70 L 10 70 Z" fill="#047857" opacity="0.4" />
                  <text x="80" y="45" fill="#38bdf8" fontSize="7" fontWeight="black" textAnchor="middle">HIGH DENSITY CONCRETE GLASS LAYER</text>
                  <text x="80" y="55" fill="#94a3b8" fontSize="6.5" textAnchor="middle">NO VOIDS / PERFECTLY LIQUID-SEALED</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 07: SAM Capillary Waterproof Layer */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 07
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                CAPILLARY WATERPROOF TECHNOLOGY
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                07. 고성능 삼투압형 무기질 침투 방수제
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Traditional waterproof membranes peel off due to subterranean vapor pressure. SAM is breathable yet impervious to liquids, securing capillary waterproofing."
                  : "기존의 시트 방수 및 에폭시 방막은 하부 지반에서 치솟는 무거운 지하 결로 습압을 감당하지 못하고 맥없이 부풀어 뜯겨 나갑니다. SAM 침투 무기 방수는 가스를 숨 쉬듯 배출하면서 유해 오염 액체 및 염수의 침투를 거부하는 모세관 결정 삼투 원리를 채택해 영구적 보존성을 확보합니다."}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Allows internal vapor to escape, completely eliminating flaking and peeling."
                : "✓ 시멘트와 화학성분이 동일한 무기 규산염 제재로써 부착 인장력이 변치 않는 100% 한몸 일체형 방수가 실현됩니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center h-44 relative overflow-hidden">
              <svg className="w-full h-full text-teal-400" viewBox="0 0 160 80">
                <rect x="5" y="55" width="150" height="20" fill="#334155" />
                
                {/* Micro capillary tubes blocking water but letting vapor pass */}
                <path d="M 30,55 L 30,20" stroke="#22d3ee" strokeWidth="1.5" />
                <path d="M 80,55 L 80,20" stroke="#22d3ee" strokeWidth="1.5" />
                <path d="M 130,55 L 130,20" stroke="#22d3ee" strokeWidth="1.5" />
                
                {/* Liquid droplets blocked at top */}
                <circle cx="30" cy="18" r="4" fill="#0ea5e9" />
                <circle cx="80" cy="18" r="4" fill="#0ea5e9" />
                <circle cx="130" cy="18" r="4" fill="#0ea5e9" />
                <text x="80" y="10" fill="#0ea5e9" fontSize="6.5" fontWeight="bold" textAnchor="middle">LIQUID WATER BLOCKED! (수분 차단)</text>
                
                {/* Vapor molecules passing through */}
                <circle cx="30" cy="40" r="1" fill="#cbd5e1" />
                <circle cx="80" cy="45" r="1.2" fill="#cbd5e1" />
                <circle cx="130" cy="38" r="0.8" fill="#cbd5e1" />
                <text x="80" y="70" fill="#a1a1aa" fontSize="6.5" textAnchor="middle">CONCRETE PORE STRUCTURE (모세관 통기성 보존)</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 08: Step-by-Step Process Timeline */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 08
          </div>

          <div className="lg:col-span-12 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                7-STEP SEQUENTIAL GRINDING PROCESS
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                08. SAM 친환경 하이브리드 콘크리트 폴리싱 표준 시공 공정
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {processSteps.map((s) => (
                <div key={s.step} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-extrabold text-cyan-400 block">STEP 0{s.step}</span>
                    <span className="text-[11px] font-bold text-white block leading-tight">{s.title}</span>
                    <span className="text-[9px] text-slate-500 block leading-tight">{s.subtitle}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 09: Longevity & Summary */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 09
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                ECONOMIC LONGEVITY SUMMARY
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                09. 종합 기대 가치 및 독보적 결론
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Applying MOASD's US CAS-registered SAM solutions completely resolves toxic flaking, peeling, and recurrent floor repair costs, delivering outstanding semi-permanent longevity and a dust-free glass-like monolithic aesthetic."
                  : "미국 화학회 CAS 에 독점 공인 등재된 SAM 원천 포뮬러가 이식된 MOASD 메탈 폴리싱과 무기계 표면 처리 공법은 해로운 휘발성 화학 물질 방출이나 잦은 철거 재도막 유지보수 악순환을 소멸시키고, 반영구적으로 빛나는 고품격 밀러 대리석 유리 질감의 친환경 명품 바닥을 선사합니다."}
              </p>
            </div>

            <div className="p-4 bg-cyan-950/15 border border-cyan-500/20 rounded-xl text-[10.5px] text-cyan-300 leading-relaxed font-sans">
              ✓ 10대 환경 규제 오염 물질 전무, 최고 안전 불연 등급, 스마트 클린룸 등 첨단 물류 하이테크 최적 표준.
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: '반영구적 수명 보장', desc: '들뜸 부식 박리 크랙 0% 완전 통제.' },
                { title: '총유지비용 -90% 격감', desc: '주기적 에폭시 철거 도색 교체비 소멸.' },
                { title: '최고안전 불연 세라믹', desc: '화재 시 일절 유독 가스 비발생 인증.' },
                { title: '먼지 0.0% 완전 분진방지', desc: '미공극 밀폐로 분진 발생 요인 원천 봉밀.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                  <span className="text-xs text-white font-extrabold block mb-1">{item.title}</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
