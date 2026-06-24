import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { TerramuvicsAdvancedShowcase } from './TerramuvicsAdvancedShowcase';
import { SamPolishingAdvancedShowcase } from './SamPolishingAdvancedShowcase';
import { HeatCoatingAdvancedShowcase } from './HeatCoatingAdvancedShowcase';
import { PolarisAdvancedShowcase } from './PolarisAdvancedShowcase';
import { 
  Sparkles, 
  Layers, 
  Construction, 
  Zap, 
  ShieldCheck, 
  Maximize2, 
  CheckCircle,
  Gem,
  RefreshCw,
  Droplet,
  Flame,
  Wrench,
  Boxes,
  Compass,
  ArrowUpRight,
  TrendingUp,
  Gauge,
  Thermometer,
  Leaf,
  Coins,
  BarChart2,
  Settings,
  Activity,
  Info
} from 'lucide-react';

export type SolutionTab = 'sam-p' | 'ecotube' | 'terramuvics' | 'heat-coating' | 'polaris';

export interface SamPolishingSolutionsProps {
  activeTab?: string | null;
  setActiveTab?: (tab: SolutionTab) => void;
}

export const SamPolishingSolutions: React.FC<SamPolishingSolutionsProps> = ({
  activeTab: controlledActiveTab,
  setActiveTab: setControlledActiveTab
}) => {
  const { language, t } = useLanguage();
  const [internalActiveTab, setInternalActiveTab] = useState<SolutionTab>('sam-p');
  
  const currentTabRaw = controlledActiveTab || internalActiveTab;
  const activeTab: SolutionTab = (currentTabRaw === 'sam-p' || currentTabRaw === 'ecotube' || currentTabRaw === 'terramuvics' || currentTabRaw === 'heat-coating' || currentTabRaw === 'polaris')
    ? (currentTabRaw as SolutionTab)
    : 'sam-p';

  const setActiveTab = (tab: SolutionTab) => {
    if (setControlledActiveTab) {
      setControlledActiveTab(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };
  
  const isEn = language === 'en';

  // Listen to outer menu navigation selection changes
  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: string }>;
      if (customEvent.detail && customEvent.detail.tab) {
        const targetTab = customEvent.detail.tab;
        if (targetTab === 'sam-p' || targetTab === 'ecotube' || targetTab === 'terramuvics' || targetTab === 'heat-coating' || targetTab === 'polaris') {
          setActiveTab(targetTab as SolutionTab);
        }
        const section = document.getElementById('sam-solutions-showcase');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('moasd-change-sol-tab', handleTabChange);
    return () => {
      window.removeEventListener('moasd-change-sol-tab', handleTabChange);
    };
  }, [setControlledActiveTab]);

  // Compute stats and content based on dynamic tab selection
  const getSolutionData = (tab: SolutionTab) => {
    switch (tab) {
      case 'sam-p':
        return {
          title: t('sam.sol.p.title', 'SAM Metal & Concrete Polishing', 'SAM 메탈 및 콘크리트 폴리싱'),
          subtitle: t(
            'sam.sol.p.sub',
            'Applying original US CAS-registered SAM new materials in ultra-precision metal segment bonds & dust-free floor polishing.',
            '미국 CAS 정식 등재된 SAM 원천 신소재를 고경도 금속 세그먼트 바인더 및 친환경 무분진 콘크리트 표면 폴리싱에 전격 융합한 핵심 특화 솔루션'
          ),
          tagline: 'METALLIC SEGMENT ABRASIVE ENGINEERING',
          description: t(
            'sam.sol.p.desc',
            'Traditional grinding pads face issues with premature diamond grit loss and overheat cracking. By applying a molecular-thin SAM coating to the interface, copper-cobalt powder and micro diamonds achieve a 4.5x tighter bond matrix. This dramatically extends abrasive tool Lifespan, while our eco-friendly water-soluble hardener seals concrete pores permanently for a sleek, glass-like reflection.',
            '일반 연삭용 패드는 과도한 마찰 고열에 의한 다이아몬드 팁 조기 탈락과 열화 균열 문제에 직면해 왔습니다. MOASD는 구리·코발트 합금 분말과 다이아몬드 미립 가공 시 SAM 나노 결착층을 이식해 마모 결착력을 획기적으로 상승시켰으며, 전용 콘크리트 침투 실러와 반응해 미세 기공을 채우고 반사적인 미러 마감을 영구 수렴시킵니다.'
          ),
          stats: [
            { label: isEn ? 'Diamond Bonding Cohesion' : '다이아몬드 결착 강도', value: '450%', icon: Gem, color: 'text-cyan-400' },
            { label: isEn ? 'Frictional Heat Shield' : '한계 마찰 방열', value: '180%', icon: Zap, color: 'text-amber-400' },
            { label: isEn ? 'Grit Lifespan Extension' : '툴 마모 수명 연장', value: '3.2배', icon: RefreshCw, color: 'text-emerald-400' },
          ],
          points: [
            {
              title: t('sam.sol.p.pt1', 'Molecular Anti-Peeling', '활물질 나노 탈착 방지'),
              desc: t('sam.sol.p.pt1d', 'Ensures diamond particles remain anchored even under intensive 1000+ RPM conditions.', '1,000 RPM 이상의 광속 마찰 구동에서도 입자가 견고하게 안치되어 초저마모를 달성합니다.')
            },
            {
              title: t('sam.sol.p.pt2', 'Dense Monolithic Glass Finish', '고밀도 영구 기공 밀폐'),
              desc: t('sam.sol.p.pt2d', 'Formulates dynamic chemical bounds inside concrete pore matrix for dustlessness.', '콘크리트 심부 유리 라이먼과 결정화 결합을 일으켜 가혹한 통행 하방 압력에도 연사 분진을 제거합니다.')
            }
          ],
          cmp: {
            title: t('sam.sol.p.c1', 'Abrasive Layer Peeling Strength', '격밀 전극 및 입자 접합 압밀 지수'),
            p1: { label: t('sam.sol.p.v1', 'Diamond Anchoring Load', '다이아몬드 지포트 결속 압'), value: '98% vs 45%' },
            p2: { label: t('sam.sol.p.v2', 'Max Safe Heat Endurance', '임계 고온 구동 가능 한계'), value: '92% vs 32%' },
            p3: { label: t('sam.sol.p.v3', 'Dust-Free Repression Factor', '표면 비산 분진 정합 감쇄'), value: '95% vs 40%' },
            bar1: { val1: '98%', val2: '45%', color: 'bg-cyan-400' },
            bar2: { val1: '92%', val2: '32%', color: 'bg-emerald-400' },
            bar3: { val1: '95%', val2: '40%', color: 'bg-purple-400' },
            note: t('sam.sol.p.no', 'Highly versatile for massive logistics bays, highway grinding, ship deck coatings, and precision cleanrooms.', '먼지 비산이 불허되는 첨단 공용 스마트 클린룸, 조선 사포 및 대규모 종합 물류 물동 센터에 우수 활용.')
          }
        };

      case 'ecotube':
        return {
          title: t('sam.sol.e.title', 'ECOTUBE (에코튜브)', 'ECOTUBE (에코튜브)'),
          subtitle: t(
            'sam.sol.e.sub',
            'Revolutionary high-efficiency fluid heat exchanger delivering over 98% thermal transfer efficiency designed for clean energy savings.',
            '기존 발열체(시즈히터, 니크롬선 등)의 물리적 한계를 세계 최초 극복하여 98% 이상의 독보적인 유체 열교환 효율을 달성한 고변환 발열 도관 솔루션'
          ),
          tagline: 'WORLD-FIRST 98%+ HIGH EFFICIENCY HEAT EXCHANGE TECHNOLOGY',
          description: t(
            'sam.sol.e.desc',
            'Surpassing traditional heating mechanisms such as nichrome wire, sheath heaters, and halogen heaters, ECOTUBE achieves a fluid heat exchange efficiency of over 98% for the first time in the world. When integrated into instant electric water heaters, space fan heaters, or high-performance boilers, it ensures perfectly uniform heat delivery with zero temperature fluctuation across inlet flow, outlet flow, and set delta T conditions.',
            '에코튜브 솔루션은 기존 발열 장치인 니크롬선, 시즈히터, 할로겐 히터 등으로는 결코 성취할 수 없었던 98% 이상의 압도적인 유체 열 교환 효율을 세계 최초 기술로 달성하였습니다. 전기 순간 온수기, 고출력 온풍기, 신개발 보일러 시스템 등에 적용 시 입수 온도 및 유량 등 임계 외력 변동에도 하방 편차 없는 스마트 항온 열방사를 완수하는 초에너지 절감형 원천 특허 규격입니다.'
          ),
          stats: [
            { label: isEn ? 'Heat Exchange Efficiency' : '유체 열교환 효율', value: '98%+', icon: Flame, color: 'text-cyan-400' },
            { label: isEn ? 'Temperature Precision' : '입출수 ΔT 편차', value: '0.0℃', icon: Compass, color: 'text-purple-400' },
            { label: isEn ? 'Energy Conserve Rate' : '고효율 에너지 절감', value: '45%+', icon: ShieldCheck, color: 'text-emerald-400' },
          ],
          points: [
            {
              title: t('sam.sol.e.pt1', 'Over 98% Fluid Conversion', '98% 초월 유체 열 변환 효율'),
              desc: t('sam.sol.e.pt1d', 'Maximizes direct fluid thermal coupling, minimizing redundant radiation or structural losses to less than 2%.', '직접 직접 반응형 전열 연동 스마트 순환로를 구축해 에너지 손실률을 2% 미만으로 물리 억제하고 세계 최초 98% 열효율을 시현합니다.')
            },
            {
              title: t('sam.sol.e.pt2', 'Zero Spot Fluctuation Control', '목표 가열 ΔT 온도 변동 배제'),
              desc: t('sam.sol.e.pt2d', 'Secures exact temperature output with continuous, unfluctuating constancy regardless of rapid input water changes.', '순간온수 장치 구동 시 수량 혹은 유속의 급작스러운 교란에도 유입 및 토출구 설정 온도를 한결같은 수치로 보전합니다.')
            }
          ],
          cmp: {
            title: t('sam.sol.e.c1', 'ECOTUBE vs Legacy Heaters (Nichrome / Sheath)', '에코튜브 기존 발열체(니크롬선 / 시즈히터) 대비 정량 지표 비교'),
            p1: { label: t('sam.sol.e.v1', 'Fluid Heat Exchanger Efficiency', '유체 직접 접촉 열교환 효율'), value: '98% vs 65%' },
            p2: { label: t('sam.sol.e.v2', 'Temperature Constancy Precision', '입출수 온도 교환 항상성 유지도'), value: '100% vs 40%' },
            p3: { label: t('sam.sol.e.v3', 'Energy Consumption Savings Ratio', '고효율 원천 에너지 전력 절감률'), value: '95% vs 50%' },
            bar1: { val1: '98%', val2: '65%', color: 'bg-cyan-400' },
            bar2: { val1: '100%', val2: '40%', color: 'bg-emerald-400' },
            bar3: { val1: '95%', val2: '50%', color: 'bg-purple-400' },
            note: t('sam.sol.e.no', 'Widely applicable to high-volume commercial instantaneous water heaters, room fan heaters, high-efficiency boiler arrays, and general industrial thermal systems.', '순간온수기, 가정/사무용 온풍기, 대용량 온수 가열기 및 친환경 복합 스마트 보일러 등 고효율 고전열이 요구되는 고부가가치 가전에 무결점 적용.')
          }
        };

      case 'terramuvics':
        return {
          title: t('sam.sol.t.title', 'Terramuvics (테라뮤빅스)', 'Terramuvics (테라뮤빅스)'),
          subtitle: t(
            'sam.sol.t.sub',
            'Revolutionary active energy new material permanently retaining high physiological and structural properties even when combined.',
            '타 물질과 융합 및 결합되어도 TMV 고유의 전천후 고기능성(높은 내열성, 내약품성, 항균·탈취 및 원적외선 방사 등)이 지속 유지되는 탁월한 초활성에너지 신소재'
          ),
          tagline: 'WORLD-CLASS SUPER ACTIVE ENERGY HYBRID MATERIAL',
          description: t(
            'sam.sol.t.desc',
            'TerraMuVics (TMV) is an extraordinary discovery in material chemistry, providing super-activation energy that endures cross-material bonding. It yields reliable thermal defense, chemical inertia, bacterial resistance, deodorization, and far-infrared radiation backed by alpha-energy self-purification. Crucially, when applied to water processing, TMV wave-modulated water creates highly interactive alkaline clusters. This water optimizes metabolism, boots red cell oxygen absorption, and facilitates instant cellular waste flushing within human fluids and lymph pathways.',
            'TerraMuVics(테라뮤빅스)는 타 가공 소재와 화학적으로 결합되어도 본래의 고기능성(높은 내열성, 내약품성, 항균, 탈취, 원적외선 방사, α에너지에 의한 자정능력 등)을 그대로 반영구 보존하는 극상의 활성에너지를 갖는 신형 특허 물질입니다. 특히 혈류 및 체액의 70%가 수분인 인체 건강을 타깃하여 개발된 TMV 물 파동수는 음용 즉시 오각 미세 미네랄 알칼리수로 쪼개져 영양소 흡수를 급속 가속화하는 한편, 체액·림프액 내 침체된 노폐물 독소를 전격 탈출 및 배출 유인하여 면역 대사 순환 세포 활성화를 이룹니다.'
          ),
          stats: [
            { label: isEn ? 'Heat & Chemical Proof' : '내열·내약품 보존력', value: '99.9%', icon: Flame, color: 'text-amber-400' },
            { label: isEn ? 'Water Wave Clustering' : '수분 파동 알칼리수화', value: '120Hz', icon: Droplet, color: 'text-cyan-400' },
            { label: isEn ? 'Toxin Discharge Rate' : '체내 독소 노폐물 배출력', value: '94%', icon: Sparkles, color: 'text-emerald-400' },
          ],
          points: [
            {
              title: t('sam.sol.t.pt1', 'Super-Activation Energy & Self-Purity', '초활성에너지 및 α-자정 효능'),
              desc: t('sam.sol.t.pt1d', 'Provides anti-bacterial defense, intense chemical resilience, and far-infrared radiation that persists in hybrid materials.', '타 소재와 합성 가공되어도 TMV 고유의 난연 내열성, 항균 보습률, 원적외선 방출 및 α에너지 자정 수명을 완벽히 시현합니다.')
            },
            {
              title: t('sam.sol.t.pt2', 'Fast Micro-Cluster Humidification', '미세 림프 수자원 노폐물 융해 배출'),
              desc: t('sam.sol.t.pt2d', 'Breaks down active water into fine metabolic alkaline particles, optimizing nutrient absorption and cellular detoxification.', '파동수가 생체 막 관통을 가속하기에 적합한 초미세 클러스터 상태로 세분화되어, 림프관 및 잔여 혈전 독소 배출을 정량 활성화합니다.')
            }
          ],
          cmp: {
            title: t('sam.sol.t.c1', 'TerraMuVics Structure & Biochemical Activations', '테라뮤빅스 고기능 유지 및 생체 순환 성능 대조'),
            p1: { label: t('sam.sol.t.v1', 'Cellular Mineral Absorption Rate', '세포 미네랄 및 영양 수송율'), value: '97% vs 45%' },
            p2: { label: t('sam.sol.t.v2', 'Circulatory Toxin Flush Speed', '체액·혈액·림프 독소 탈출 배출력'), value: '98% vs 35%' },
            p3: { label: t('sam.sol.t.v3', 'Function Retention When Combined', '융합 가공 시 고성능 지속력'), value: '100% vs 15%' },
            bar1: { val1: '97%', val2: '45%', color: 'bg-emerald-400' },
            bar2: { val1: '98%', val2: '35%', color: 'bg-cyan-400' },
            bar3: { val1: '100%', val2: '15%', color: 'bg-amber-400' },
            note: t('sam.sol.t.no', 'Proven to optimize full body cells, immune levels, and metabolism while retaining long-life industrial strength under thermal stress.', '원자 단위 활성에너지를 방사하여 세포 장벽 극복력을 높임으로써 신진대사 및 혈액순환의 상시 부스팅을 달성하는 원천 기술 소재.')
          }
        };

      case 'heat-coating':
        return {
          title: t('sam.sol.h.title', 'Conductive Heating Coating (발열 코팅)', '발열 코팅 (Conductive Thermal Coating)'),
          subtitle: t(
            'sam.sol.h.sub',
            'Innovative ultra-low-voltage conductive paint coating leveraging SAM mechanisms for dynamic thermal regulation.',
            '미국 CAS 등재 SAM 전열 전도 입자 기작을 액상 코팅재로 응용해, 균일한 면상 에너지 열방사를 극소 전력으로 이룩한 특허 도포 솔루션'
          ),
          tagline: 'ULTRA-LOW VOLTAGE SURFACE THERMAL COATING',
          description: t(
            'sam.sol.h.desc',
            'Defrosting and warm heating on structural hulls, industrial tanks, and vehicle cabins are normally energy-inefficient. Our Conductive Heating Coating applies SAM molecular conductive carriers directly to liquid paints. Powering it with low 12V-36V voltage creates instant, completely uniform heat dissipation across any curved component surface without hotspots, keeping operations energy-safe.',
            '선박 선체 윈드실드, 화학 탱크 동결 방지 장치, 혹한기 특수 장비 탑승 칸의 성에 단열 난방은 엄청난 전력을 소비합니다. MOASD 발열 코팅은 가벼운 도료 제재 내부에 전열 전도 캐리어 SAM을 분산 기포 성형해 부착함으로써, 뒤틀림이 심한 굴곡 면에도 국소 쇼트가 전혀 없는 100% 매끄러운 단열 면상 열방사 회로를 실현합니다.',
          ),
          stats: [
            { label: isEn ? 'Required Voltage' : '필요 운용 전압', value: '12V-36V', icon: Zap, color: 'text-amber-400' },
            { label: isEn ? 'Dynamic Heating Speed' : '목표 온도 부스팅', value: '4.8초', icon: Flame, color: 'text-red-400' },
            { label: isEn ? 'Energy Efficiency Gain' : '전력 소모량 격감', value: '-65%', icon: RefreshCw, color: 'text-emerald-400' },
          ],
          points: [
            {
              title: t('sam.sol.h.pt1', 'Ultra-Safe Low Voltage Dynamic Heat', '초단시간 정격 급속 난방'),
              desc: t('sam.sol.h.pt1d', 'Reaches 75°C average surface thermal dissipation within 5 seconds with standard standard vehicle power.', '차량 충전기나 스마트 단자로 인출되는 12V 혹은 24V 범용 저전압으로도 스파크 없이 급속 전열 동작을 완수합니다.')
            },
            {
              title: t('sam.sol.h.pt2', 'Flexible Seamless Spray Interface', '무제한 프리폼 도막 전사'),
              desc: t('sam.sol.h.pt2d', 'Can be sprayed onto glass, carbon-fiber panels, polymers, and complex concrete structures.', '철판, 탄소 섬유 수지, 유리 및 마감재 종류에 상관없이 페인트 방식으로 얇게 발라내면 즉각 발열체로 기능합니다.')
            }
          ],
          cmp: {
            title: t('sam.sol.h.c1', 'Conductive Liquid Coating Thermal Conversion Efficiency', '발열 전위 코팅 열전도 변환 성능 평가'),
            p1: { label: t('sam.sol.h.v1', 'Low Voltage Launch Efficiency', '안전 저전압 가열 대역 달성도'), value: '98% vs 30%' },
            p2: { label: t('sam.sol.h.v2', 'Surface Temperature Uniformity', '방열 전위 전 구간 주사 정합도'), value: '95% vs 46%' },
            p3: { label: t('sam.sol.h.v3', 'Energy Consumption Ratio Saving', '유니크 열교환 축전 절전율'), value: '93% vs 32%' },
            bar1: { val1: '98%', val2: '30%', color: 'bg-cyan-400' },
            bar2: { val1: '95%', val2: '46%', color: 'bg-emerald-400' },
            bar3: { val1: '93%', val2: '32%', color: 'bg-purple-400' },
            note: t('sam.sol.h.no', 'Optimal coating solution for electric vehicles, solar power panel defrosting, military cold-weather tents, and specialized HVAC installations.', '풍력 회전 날개 표면 제빙 결빙 방지, 대형 전기 주행차 배터리 패드 보온층 및 배관 동파 가열에 강력 장착.')
          }
        };

      case 'polaris':
        return {
          title: '',
          subtitle: '',
          tagline: '',
          description: '',
          stats: [],
          points: [],
          cmp: {
            title: '',
            p1: { label: '', value: '' },
            p2: { label: '', value: '' },
            p3: { label: '', value: '' },
            bar1: { val1: '0%', val2: '0%', color: '' },
            bar2: { val1: '0%', val2: '0%', color: '' },
            bar3: { val1: '0%', val2: '0%', color: '' },
            note: ''
          }
        };
    }
  };

  const data = getSolutionData(activeTab);

  return (
    <div id="sam-solutions-showcase" className="w-full max-w-7xl mx-auto px-6 mt-12 space-y-8 scroll-mt-24">
      {/* 🌟 Unified Sub-section Header & CAS Certification Matric Card (Single Page Perfect Align) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pb-6 border-b border-white/10">
        
        {/* Left Side: Title, Subtitle & Fast Tab Switcher (Span 8) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-mono font-bold tracking-wider uppercase bg-cyan-950/45 border border-cyan-400/25 px-3 py-1 rounded-full">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
              </span>
              USA CAS PATENT REGISTERED IP
            </div>
            
            <h3 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              {t(
                'sam.polishing.title',
                'US CAS-Registered SAM Material & Engineered Solutions',
                '미국 CAS 공식 등재 SAM 신물질 및 핵심 특화 솔루션'
              )}
            </h3>
            
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed font-normal">
              {t(
                'sam.polishing.subtitle',
                'Explore our 4 key applied technology portfolios leveraging exclusive US CAS-registered SAM materials and advanced engineering constructs.',
                '미국 화학회 CAS 에 독점 공인 등재된 SAM 원천 신소재 결사 공법과 차세대 고분자 기질 및 배료 설계를 이식한 MOASD의 4대 핵심 특화 포트폴리오를 점검하십시오.'
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Sleek High-End American CAS Authentication Stamp Card (Span 4) */}
        <div className="lg:col-span-4 flex items-stretch">
          <div className="w-full relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-900/95 p-5 shadow-xl shadow-cyan-400/5 flex flex-col justify-between">
            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-widest text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                  US PATENTED
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-400/30 px-2.5 py-0.5 rounded">
                  CAS REGISTERED
                </span>
              </div>
              
              <h4 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                {isEn ? "US CAS Original Certification" : "미국 화학회 CAS 정식 등재 검증"}
              </h4>
              
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {isEn
                  ? "Self-Assembled Monolayer (SAM) is officially logged in the CAS registry database, under the American Chemical Society, ensuring peerless interfacial electron transport & micro-stabilization."
                  : "글로벌 권위 최고인 미국 화학회 고유 데이터베이스(CAS)에 정식 등재된 SAM 원천 전집전 배합 기술입니다. 다이아몬드 지포트 마모 및 극판 탈락을 분자 단에서 안전 제어합니다."
                }
              </p>
            </div>
            
            <div className="h-[1px] w-full bg-white/5 my-2.5" />
            
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="font-extrabold text-cyan-400">AMER. CHEM. SOC.</span>
              <span className="text-slate-400 font-bold">CLASS-A UNIQUE IP</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Interactive Showcase Grid */}
      {activeTab === 'ecotube' ? (
        <EcotubeAdvancedShowcase language={language} isEn={isEn} />
      ) : activeTab === 'terramuvics' ? (
        <TerramuvicsAdvancedShowcase language={language} isEn={isEn} />
      ) : activeTab === 'sam-p' ? (
        <SamPolishingAdvancedShowcase language={language} isEn={isEn} />
      ) : activeTab === 'heat-coating' ? (
        <HeatCoatingAdvancedShowcase language={language} isEn={isEn} />
      ) : activeTab === 'polaris' ? (
        <PolarisAdvancedShowcase language={language} isEn={isEn} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left Side: Interactive Explanation & Features (Cols 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                    {data.tagline}
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    {data.title}
                  </h4>
                  <p className="text-sm md:text-md text-cyan-300/90 font-medium leading-relaxed bg-slate-950/25 p-3 rounded-lg border border-white/5">
                    {data.subtitle}
                  </p>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans pt-1">
                    {data.description}
                  </p>
                </div>

                {/* Advanced Technology Points cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {data.points.map((pt, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-2 relative group/item hover:border-cyan-400/20 transition-all duration-300 shadow-lg">
                      <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-700 group-hover/item:text-cyan-400/40 font-bold transition-colors">
                        0{pIdx + 1}
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-bold text-slate-200 tracking-tight">
                          {pt.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Metrics Cards - Large numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
              {data.stats.map((stat, sIdx) => {
                const IconComp = stat.icon;
                return (
                  <div key={sIdx} className="space-y-1 p-2 bg-slate-950/20 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <IconComp className={`w-3.5 h-3.5 ${stat.color} flex-shrink-0`} />
                      <span className="truncate text-[10px] sm:text-[11px] uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <div className="text-lg md:text-2xl font-black text-white font-mono tracking-tight self-start pt-0.5">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Interactive High-Fidelity Comparison Box (Cols 5) */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-2xl">
              {/* Visual background wireframe accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header Title */}
              <div className="space-y-1 relative z-10">
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block font-bold">
                  QUANTITATIVE PERFORMANCE METRIC LABS
                </span>
                <h5 className="text-xs md:text-sm font-bold text-white tracking-tight">
                  {data.cmp.title}
                </h5>
              </div>

              {/* Simulated Visual comparison items list */}
              <div className="space-y-5 my-6 relative z-10 flex-1 flex flex-col justify-center">
                {/* Parameter 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">
                      {data.cmp.p1.label}
                    </span>
                    <span className="text-cyan-400 font-mono font-extrabold text-[11px]">{data.cmp.p1.value}</span>
                  </div>
                  {/* Visual bar graph stack */}
                  <div className="space-y-1">
                    {/* SAM Bar */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                      <motion.div 
                        key={`${activeTab}-bar1`}
                        initial={{ width: 0 }}
                        animate={{ width: data.cmp.bar1.val1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`${data.cmp.bar1.color} h-full rounded-full`} 
                      />
                    </div>
                    {/* Traditional Bar */}
                    <div className="h-1 bg-slate-900/60 rounded-full overflow-hidden flex">
                      <motion.div 
                        key={`${activeTab}-bar1-old`}
                        initial={{ width: 0 }}
                        animate={{ width: data.cmp.bar1.val2 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="bg-slate-700 h-full rounded-full" 
                      />
                    </div>
                  </div>
                </div>

                {/* Parameter 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">
                      {data.cmp.p2.label}
                    </span>
                    <span className="text-emerald-400 font-mono font-extrabold text-[11px]">{data.cmp.p2.value}</span>
                  </div>
                  {/* Visual bar graph stack */}
                  <div className="space-y-1">
                    {/* SAM Bar */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                      <motion.div 
                        key={`${activeTab}-bar2`}
                        initial={{ width: 0 }}
                        animate={{ width: data.cmp.bar2.val1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                        className={`${data.cmp.bar2.color} h-full rounded-full`} 
                      />
                    </div>
                    {/* Traditional Bar */}
                    <div className="h-1 bg-slate-900/60 rounded-full overflow-hidden flex">
                      <motion.div 
                        key={`${activeTab}-bar2-old`}
                        initial={{ width: 0 }}
                        animate={{ width: data.cmp.bar2.val2 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
                        className="bg-slate-700 h-full rounded-full" 
                      />
                    </div>
                  </div>
                </div>

                {/* Parameter 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">
                      {data.cmp.p3.label}
                    </span>
                    <span className="text-purple-400 font-mono font-extrabold text-[11px]">{data.cmp.p3.value}</span>
                  </div>
                  {/* Visual bar graph stack */}
                  <div className="space-y-1">
                    {/* SAM Bar */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                      <motion.div 
                        key={`${activeTab}-bar3`}
                        initial={{ width: 0 }}
                        animate={{ width: data.cmp.bar3.val1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        className={`${data.cmp.bar3.color} h-full rounded-full`} 
                      />
                    </div>
                    {/* Traditional Bar */}
                    <div className="h-1 bg-slate-900/60 rounded-full overflow-hidden flex">
                      <motion.div 
                        key={`${activeTab}-bar3-old`}
                        initial={{ width: 0 }}
                        animate={{ width: data.cmp.bar3.val2 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        className="bg-slate-700 h-full rounded-full" 
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Tech Specs Summary info block */}
              <div className="p-3.5 bg-slate-900/80 border border-white/5 rounded-xl flex items-start gap-2.5 relative z-10 text-[11px] leading-relaxed text-slate-400">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>
                  {data.cmp.note}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   🔥 HIGH-FIDELITY SCROLL-BASED ECOTUBE ADVANCED SHOWCASE
   ========================================================================== */
interface EcotubeAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

const EcotubeAdvancedShowcase: React.FC<EcotubeAdvancedShowcaseProps> = ({ language, isEn }) => {
  const [inletTemp, setInletTemp] = useState(15);
  const deltaT = 25; // Instant temperature delta guaranteed by Ecotube heating module
  const outletTemp = inletTemp + deltaT;

  // State handles for newly introduced interactive sections:
  const [selectedChartTime, setSelectedChartTime] = useState<number>(180);
  const [activeBlowerPart, setActiveBlowerPart] = useState<'exhaust' | 'generator' | 'fan' | 'panel'>('generator');
  const [dailyRunHours, setDailyRunHours] = useState<number>(10);
  const [annualHeatingDays, setAnnualHeatingDays] = useState<number>(90);

  const slides = [
    {
      id: 1,
      tag: isEn ? "MOLECULAR THERMAL EXCHANGER" : "원천 기술 개요 및 기작",
      title: isEn ? "01. ECOTUBE Core Nanofilm Technology" : "01. 에코튜브 핵심 나노발열도관 기술",
      desc: isEn 
        ? "Exceeding physical limits of legacy nichrome wires, ECOTUBE implements molecular-thin nanometallic coatings directly onto the fluid-facing surface to form a high-conduction loop, achieving world-record efficiencies."
        : "기존의 물리적 전도 한계를 지녔던 니크롬선 혹은 시즈히터 구조를 완전히 뒤엎고, 유체가 접촉하여 통과하는 도관 내외벽에 분자 단위의 고전도 세라믹 나노막 솔루션을 특수 증착/코팅하여 열전도 공극 손실을 완벽히 소멸시킨 원천 특허 규격입니다.",
      stats: [
        { label: isEn ? "Thermal Transfer" : "전열 유효 전사력", value: "98.8%" },
        { label: isEn ? "Reaction Time" : "최전선 발열 도달 속도", value: "< 2.8s" },
        { label: isEn ? "Coating Lifespan" : "나노 내마모 수명", value: "반영구" }
      ]
    },
    {
      id: 2,
      tag: isEn ? "TUBE-SHAPED INSTANT HEATING MODULE" : "Heating Module Solution 에코튜브 기술 적용",
      title: isEn ? "02. (관) 형태의 유체 순간 가열기 부품" : "02. (관) 형태의 유체 순간 가열기 부품",
      desc: isEn
        ? "A high-performance pipeline heating component featuring molecular solutions coating. Designed to instantly heat passing fluids, achieving an inlet-to-outlet delta temperature (Δt) of 25°C or higher under continuous flow."
        : "순간 유체가열 방식으로 도관을 직접 통과하는 난방수 및 액체의 입수온도 대비 Δt 25℃ 이상의 발열 퍼포먼스를 즉각 시현하는 고성능 Heating Module 부품 솔루션입니다. (※Δt 25℃란 유입수가 순간 가열로 가열수 온도가 25℃ 높게 분출됨을 의미합니다.)",
      stats: [
        { label: isEn ? "Surface Heat Max" : "최대 한계 표면 온도", value: "500℃+" },
        { label: isEn ? "Thermal Efficiency" : "유체 가열 전력 효율", value: "98%+" },
        { label: isEn ? "Fitting Profile" : "구조적 슬림 설계", value: "Slim Tube" }
      ]
    },
    {
      id: 3,
      tag: isEn ? "FAN HEATER PERFORMANCE EXPERIMENT" : "에코튜브 자체 성능 실증",
      title: isEn ? "03. Ecotube Fan Heater Performance Test" : "03. 팬기 성능실험 (당사 자체 실험)",
      desc: isEn
        ? "A meticulous, real-world measurement tracking the heat propagation curves of Ecotube blowers beside traditional heatpipe heating systems. Validates instant peak temperatures, hitting 96°C at high speeds."
        : "기존의 물리적 전열 지연 현상이 뚜렷했던 구형 히트파이프 온풍기 방식과 에코튜브 나노도관 온풍 가열기 간의 승온 속도와 최고 온도 임계를 직접 실계측 대비한 자체 성능 실험 보고 자료입니다.",
      stats: [
        { label: isEn ? "Max Temperature" : "자체 측정 최고 온도", value: "96.0℃" },
        { label: isEn ? "Startup Speed" : "발열 도달 시간속도", value: "5.3x Fast" },
        { label: isEn ? "Constant Efficiency" : "연속 전사 안정도", value: "98.8%" }
      ]
    },
    {
      id: 4,
      tag: isEn ? "AGRICULTURAL APPLICATIONS SYSTEM" : "기술의 제품 적용 개발 사례",
      title: isEn ? "04. Energy-Saving Agricultural Blower Unit" : "04. 농업용 온풍기 제품 개발 및 보급",
      desc: isEn
        ? "Translating Ecotube nanocoatings into highly optimized greenhouse environment air control. Features carbon-free continuous heating, far-infrared growth stimulation, and substantial fuel overhead reductions."
        : "원천 나노 기술을 대규모 시설 원예 공조계통에 실증한 것으로, 연소 화석연료 연기 및 탄소가 전무한 청정 열순환과 작물 생육 속도를 향상하는 원적외선 방사를 결합한 친환경 최루 기어입니다.",
      stats: [
        { label: isEn ? "Active Saving" : "기존 대비 전력절감", value: "10% ~ 50%" },
        { label: isEn ? "Fuel Saving Rate" : "유류 난방비 절감안", value: "50%+" },
        { label: isEn ? "Certification" : "형식인증 및 일본수출", value: "Compliant" }
      ]
    },
    {
      id: 5,
      tag: isEn ? "RIGOROUS COMPARISON SPEC SHEET" : "농가 온풍기 성능 정량비교 보고서",
      title: isEn ? "05. Agricultural Fan Heater Rigorous Specifications" : "05. 농업용 팬히터 성능 비교 분석 리포트",
      desc: isEn
        ? "Granular technical contrast between traditional blowers and Ecotube warmers calculated against a standard 1,000-1,650 m² agricultural greenhouse. Confirms a highly reduced composite electrical active draw."
        : "표준 비닐하우스 약 300평~500평 운영을 완벽 연계한 공조 하중 계산 모델입니다. 모터와 가열 부하를 통합한 시간당 총소비전력 차와 98%의 최전선 열교환 효율을 정량 증명하는 등급 시트입니다.",
      stats: [
        { label: isEn ? "Composite Efficiency" : "종합 열량 전사효율", value: "98.0%" },
        { label: isEn ? "Total Draw Drop" : "총소비전력 절감율", value: "18.4%" },
        { label: isEn ? "Airflow Speed" : "분당 대용량 송풍량", value: "6,900 m³/h" }
      ]
    }
  ];

  // Page 03 Curve data
  const timeSteps = [20, 40, 60, 80, 100, 120, 140, 160, 180];
  const ecoCurve: Record<number, number> = { 20: 45, 40: 60, 60: 74, 80: 83, 100: 91, 120: 94, 140: 95, 160: 96, 180: 96 };
  const tradCurve: Record<number, number> = { 20: 0, 40: 0, 60: 0, 80: 0, 100: 32, 120: 43, 140: 52, 160: 70, 180: 78 };

  // Helper coordinate calculators for Interactive SVG Graph
  const getCoords = (time: number, temp: number) => {
    const x = 50 + ((time - 20) / 160) * 440;
    const y = 190 - (temp / 100) * 150;
    return { x, y };
  };

  const getEcoPointsStr = () => {
    return timeSteps.map(t => {
      const { x, y } = getCoords(t, ecoCurve[t]);
      return `${x},${y}`;
    }).join(' ');
  };

  const getTradPointsStr = () => {
    return timeSteps.map(t => {
      const { x, y } = getCoords(t, tradCurve[t]);
      return `${x},${y}`;
    }).join(' ');
  };

  // ROI Calculator variables
  const traditionalHourlyUsage = 72.1; // kW/h
  const ecotubeHourlyUsage = 58.8; // kW/h
  const powerDiff = traditionalHourlyUsage - ecotubeHourlyUsage; // 13.3 kW/h
  const totalHours = dailyRunHours * annualHeatingDays;
  const traditionalTotalPower = Math.floor(traditionalHourlyUsage * totalHours);
  const ecotubeTotalPower = Math.floor(ecotubeHourlyUsage * totalHours);
  const savedPower = Math.floor(powerDiff * totalHours);
  const moneySavedKRW = Math.floor(savedPower * 125); // ~125 KRW per kWh industrial tier
  const moneySavedUSD = Math.floor(savedPower * 0.095); // ~0.095 USD per kWh

  return (
    <div className="w-full space-y-16 select-text pt-4">
      
      {/* Scrollable Flow Header Guide */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="text-left font-sans">
            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest leading-none">
              ECOTUBE SCROLL INJECTOR
            </span>
            <span className="text-xs text-cyan-400 font-extrabold">
              {isEn ? "Continuous Scroll Mode Enabled (Scroll Down to View All Pages)" : "연속 스크롤 연동 활성화 (밑으로 스크롤하여 모든 페이지를 차례로 확인하세요)"}
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase font-mono font-black text-slate-400 border border-white/10 px-3 py-1 rounded bg-slate-950/40">
          {isEn ? "5 Full Technical Pages" : "총 5개의 기술 세부 페이지 스택"}
        </div>
      </div>

      {/* 🔮 PAGE 01: Core Technology & Mechanics */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Tag Page Indicator */}
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 01
          </div>

          {/* Left Column (Span 6): Explanation */}
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
                ? "✓ Overcomes heavy metal contamination and thermal expansion rupture in industrial boiling components."
                : "✓ 기존 히터와 달리, 전기가 통하지 않는 특수 절점 유기 표면에 순수 발열층만 증착하여 가혹한 고온 고압 유류수 계통 내에서도 균열이나 파괴 없이 반영구 가동됩니다."
              }
            </div>
          </div>

          {/* Right Column (Span 6): Visual & Stats */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-emerald-400 font-black bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                SAM NANOFILM INTERFACIAL DEPTH
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Why ECOTUBE Achieves over 98% Efficiency?" : "에코튜브가 98% 초고효율을 달성하는 과학적 원리"}
              </h5>
              
              {/* Core interactive molecular representation */}
              <div className="h-44 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-rose-950/20 pointer-events-none" />
                <div className="flex items-center gap-1.5 sm:gap-4 relative z-10 w-full justify-center max-w-full">
                  <div className="text-center space-y-1 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-cyan-400 bg-cyan-950/80 flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-black text-cyan-400 animate-pulse">
                      H2O
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold block whitespace-nowrap">{isEn ? "Fluid Flow" : "유체 흐름"}</span>
                  </div>

                  <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-cyan-400 to-emerald-400 relative flex-shrink-0">
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <div className="text-center space-y-1 flex-shrink-0">
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border border-emerald-400 bg-emerald-950/80 flex flex-col items-center justify-center font-mono leading-none">
                      <span className="text-[8px] sm:text-[9px] text-emerald-400 font-black">ECO</span>
                      <span className="text-[10px] sm:text-[11px] text-white font-black">98.8%</span>
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold block whitespace-nowrap">{isEn ? "Direct Contact" : "직접 접사"}</span>
                  </div>

                  <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-emerald-400 to-rose-400 relative flex-shrink-0" />

                  <div className="text-center space-y-1 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-rose-400 bg-rose-950/80 flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-black text-rose-400">
                      500℃
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold block whitespace-nowrap">{isEn ? "Heat Peak" : "초고온 방열"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5">
              {slides[0].stats.map((stat, stIdx) => (
                <div key={stIdx} className="p-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-center font-sans">
                  <span className="text-[10px] text-slate-500 block font-bold truncate uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-cyan-400 block pt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 🚜 PAGE 02: Heating Module Solution & Applications */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Tag Page Indicator */}
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 02
          </div>

          {/* Left Column (Span 6): Real-time Simulation & Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="w-full bg-slate-950/60 rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 font-extrabold bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded">
                  SYS-MODEL: ECO-TUBE-25X
                </span>
                <span className="text-[10px] font-mono text-emerald-400 animate-pulse font-extrabold flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  SIMULATION ON
                </span>
              </div>

              {/* SVG Tube Drawing */}
              <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 relative">
                <div className="absolute top-2 left-6 text-[9px] font-mono text-slate-500 font-black">
                  INLET (입수 측)
                </div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-rose-500 font-black text-right">
                  OUTLET (토출 측)
                </div>
                
                <svg viewBox="0 0 420 160" className="w-full h-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <defs>
                    <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.7" />
                      <stop offset="65%" stopColor="#f59e0b" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* Cold Fluid Input Indicator Text */}
                  <text x="35" y="45" fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {inletTemp}°C
                  </text>
                  {/* Hot Fluid Output Indicator Text */}
                  <text x="330" y="45" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {outletTemp}°C (Δt +{deltaT}°C)
                  </text>

                  {/* Fluid Stream flowing inside (glowing) */}
                  <rect x="50" y="60" width="320" height="28" rx="4" fill="url(#fluidGrad)" />
                  
                  {/* Dynamic arrows indicating heat exchange flow */}
                  <path d="M 80,74 L 110,74 M 170,74 L 200,74 M 260,74 L 290,74" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3,3" className="animate-pulse" />

                  {/* Ecotube Solution Coating Overlay Box (Boundary Layer) */}
                  <rect x="100" y="55" width="220" height="38" rx="6" fill="transparent" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6,4" className="animate-pulse" />
                  
                  {/* Electrode Collars */}
                  <rect x="90" y="51" width="10" height="46" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="95" y1="51" x2="95" y2="25" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="95" cy="25" r="4" fill="#ef4444" />
                  <text x="75" y="16" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" fontWeight="bold">전극 (Electrode +)</text>

                  <rect x="320" y="51" width="10" height="46" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="325" y1="51" x2="325" y2="25" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="325" cy="25" r="4" fill="#3b82f6" />
                  <text x="310" y="16" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" fontWeight="bold">전극 (Electrode -)</text>

                  <path d="M 210,55 L 210,120" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
                  <circle cx="210" cy="120" r="3" fill="#10b981" />
                  
                  <text x="140" y="135" fill="#34d399" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                    에코튜브 솔루션 코팅 (유체 가열막)
                  </text>
                  <text x="135" y="148" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
                     [ Ecotube Molecular Coating Layer ]
                  </text>
                </svg>
              </div>

              {/* User Interactive Slider Controls */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-sans font-bold">
                    <span className="text-slate-300">{isEn ? "Inlet Water Temp (입수 온도)" : "실제 유입 온도 (입수 수온)"}</span>
                    <span className="text-cyan-400 font-mono font-black">{inletTemp} ℃</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="35" 
                    value={inletTemp} 
                    onChange={(e) => setInletTemp(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity" 
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>5℃ (혹한기)</span>
                    <span>20℃ (상온)</span>
                    <span>35℃ (온수지 공급)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-white/5 font-sans">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                      {isEn ? "INSTANT DELTA-T" : "순간 가열 온도 편차"}
                    </span>
                    <span className="text-md sm:text-lg font-mono font-black text-emerald-400 block pt-0.5">
                      Δt +{deltaT} ℃
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                      {isEn ? "OUTLET DISCHARGE" : "도출 온수 토출 수온"}
                    </span>
                    <span className="text-md sm:text-lg font-mono font-black text-rose-400 block pt-0.5">
                      {outletTemp} ℃
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 6): Description & Application Fields */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-emerald-400 uppercase bg-emerald-950/30 px-2.5 py-1 rounded border border-emerald-400/10 inline-block">
                {slides[1].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[1].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[1].desc}
              </p>
            </div>

            {/* Application fields */}
            <div className="space-y-3 pt-1">
              <h5 className="text-xs font-mono font-black text-emerald-400 tracking-widest block uppercase">
                APPLICATION FIELDS (주요 제품 적용 분야)
              </h5>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Application Item 1 */}
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-cyan-400/20 transition-all duration-300 flex items-start gap-3">
                  <div className="p-2 bg-cyan-950/80 border border-cyan-500/20 rounded-lg text-cyan-400 flex-shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white tracking-tight">
                      {isEn ? "Industrial Boilers & Instant Water Heaters" : "각종 보일러 순간 온수기"}
                    </h6>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">
                      {isEn 
                        ? "High-volume instant hot water systems for industrial bakeries, confectionery lines, and sterile food processing factories."
                        : "제과회사 및 대형 식품 산업 현장에서 항정밀 항온 온수를 에너지 비산 손실 없이 대량 순환 공급하는 고속 스팀식 순간 보일러에 특화 적용."
                      }
                    </p>
                  </div>
                </div>

                {/* Application Item 2 */}
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-emerald-400/20 transition-all duration-300 flex items-start gap-3">
                  <div className="p-2 bg-emerald-950/80 border border-emerald-500/20 rounded-lg text-emerald-400 flex-shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white tracking-tight">
                      {isEn ? "Pool Water Heating Modules" : "수영장 급탕기 각종 Heating Module"}
                    </h6>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">
                      {isEn
                        ? "Optimal heating modules for swimming pools and thermal health water reserves, preventing calcification."
                        : "대용량 유수가 상시 통과하는 다중 수영 시설, 휴양 단지의 사계절 난방 온수 급탕 순환 계통에 스케일 염려 없이 정숙 구동."
                      }
                    </p>
                  </div>
                </div>

                {/* Application Item 3 */}
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-purple-400/20 transition-all duration-300 flex items-start gap-3">
                  <div className="p-2 bg-purple-950/80 border border-purple-500/20 rounded-lg text-purple-400 flex-shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white tracking-tight">
                      {isEn ? "Industrial & Agricultural Dryers & Hot Blowers" : "각종 전기 온풍기 및 전기 건조기 (산업용/농업용)"}
                    </h6>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">
                      {isEn
                        ? "Energy-efficient space heaters and crop drying tunnels, utilizing scalable hair-dryer style air temperature heating."
                        : "대형 농가 건조실의 급속 곡물 열풍 성형, 제조 부품 세정 후 초스피드 고압 풍건 난방용 드라이어 장치(일반 컨슈머 가전 포함)에 만능 안치."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5 font-sans">
              {slides[1].stats.map((stat, stIdx) => (
                <div key={stIdx} className="p-2 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 block font-bold truncate uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-xs font-mono font-black text-cyan-400 block pt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 🔮 PAGE 03: Ecotube Fan Heater Performance Test (First Image Applied Here!) */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-purple-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Tag Page Indicator */}
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 03
          </div>

          {/* Left Column (Span 6): Interactive SVG Line Graph & Control Grid */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="w-full bg-slate-950/60 rounded-2xl border border-white/10 p-5 space-y-4 relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-rose-400 font-extrabold block">
                    {isEn ? "TEST TEMPERATURE CLIMB (℃)" : "시간별 작동 온도 비교 곡선 (℃)"}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase">
                  {isEn ? "Click time nodes to inspect" : "시간 노드를 누르면 계측값 확인"}
                </span>
              </div>

              {/* Dynamic Coordinate Drawing */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/5 relative">
                
                {/* SVG Graph container */}
                <svg viewBox="0 0 540 230" className="w-full h-auto text-slate-400 font-mono text-[9px]">
                  
                  {/* Grid Lines */}
                  <line x1="50" y1="40" x2="500" y2="40" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="50" y1="90" x2="500" y2="90" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="50" y1="140" x2="500" y2="140" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="50" y1="190" x2="500" y2="190" stroke="#334155" strokeWidth="1.5" />
                  <line x1="50" y1="40" x2="50" y2="190" stroke="#334155" strokeWidth="1.5" />

                  {/* Y Axis labels */}
                  <text x="15" y="44" fill="#64748b" fontWeight="bold">100℃</text>
                  <text x="20" y="94" fill="#64748b" fontWeight="bold">60℃</text>
                  <text x="20" y="144" fill="#64748b" fontWeight="bold">30℃</text>
                  <text x="25" y="194" fill="#64748b" fontWeight="bold">0℃</text>

                  {/* Time indicator line */}
                  {selectedChartTime && (
                    <line 
                      x1={getCoords(selectedChartTime, 0).x} 
                      y1="40" 
                      x2={getCoords(selectedChartTime, 0).x} 
                      y2="190" 
                      stroke="#475569" 
                      strokeWidth="1" 
                      strokeDasharray="4,4" 
                    />
                  )}

                  {/* Curve 1: Conventional Heatpipe (Blue/Slate) Polyline with coordinates */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getTradPointsStr()}
                    className="opacity-70 transition-all duration-300"
                    dropShadow="0px 2px 10px rgba(59,130,246,0.3)"
                  />

                  {/* Curve 2: Ecotube Heater (Solid Red) Polyline */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getEcoPointsStr()}
                    dropShadow="0px 4px 12px rgba(239,68,68,0.5)"
                  />

                  {/* Nodes & Interactive Circles */}
                  {timeSteps.map((timeStep) => {
                    const ecoVal = ecoCurve[timeStep];
                    const tradVal = tradCurve[timeStep];
                    const ptEco = getCoords(timeStep, ecoVal);
                    const ptTrad = getCoords(timeStep, tradVal);
                    const isSelected = selectedChartTime === timeStep;

                    return (
                      <g key={timeStep} className="cursor-pointer">
                        {/* Interactive invisible cover bar */}
                        <rect 
                          x={ptEco.x - 15} 
                          y="15" 
                          width="30" 
                          height="185" 
                          fill="transparent" 
                          onClick={() => setSelectedChartTime(timeStep)} 
                        />

                        {/* Conventional point circle */}
                        <circle 
                          cx={ptTrad.x} 
                          cy={ptTrad.y} 
                          r={isSelected ? 6 : 4} 
                          fill={isSelected ? "#3b82f6" : "#1e40af"} 
                          stroke="#020617" 
                          strokeWidth="1.5" 
                          onClick={() => setSelectedChartTime(timeStep)}
                        />

                        {/* Ecotube point circle */}
                        <circle 
                          cx={ptEco.x} 
                          cy={ptEco.y} 
                          r={isSelected ? 7 : 4.5} 
                          fill={isSelected ? "#ff3b3b" : "#b91c1c"} 
                          stroke="#ffffff" 
                          strokeWidth="1.5"
                          onClick={() => setSelectedChartTime(timeStep)}
                        />

                        {/* Hover/Select values on chart */}
                        {isSelected && (
                          <g>
                            <rect x={ptEco.x - 30} y={ptEco.y - 25} width="60" height="18" rx="4" fill="#ef4444" />
                            <text x={ptEco.x} y={ptEco.y - 13} fill="#ffffff" fontWeight="black" textAnchor="middle" fontSize="10">{ecoVal}℃</text>
                            
                            {tradVal > 0 && (
                              <>
                                <rect x={ptTrad.x - 30} y={ptTrad.y + 10} width="60" height="18" rx="4" fill="#3b82f6" />
                                <text x={ptTrad.x} y={ptTrad.y + 22} fill="#ffffff" fontWeight="black" textAnchor="middle" fontSize="10">{tradVal}℃</text>
                              </>
                            )}
                          </g>
                        )}

                        {/* X Axis Time Labels */}
                        <text x={ptEco.x} y="210" fill={isSelected ? "#22d3ee" : "#475569"} fontWeight={isSelected ? "black" : "medium"} textAnchor="middle">
                          {timeStep}초
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend indicator bar */}
                <div className="flex items-center justify-center gap-6 pt-3 text-[10.5px] font-sans border-t border-white/5 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-1.5 rounded bg-rose-500 inline-block" />
                    <span className="text-white font-extrabold">{isEn ? "Ecotube Heater" : "에코튜브 히터"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-1.5 rounded bg-blue-500 inline-block" />
                    <span className="text-slate-400 font-medium">{isEn ? "Heatpipe Air Blower" : "히트파이프 온풍기"}</span>
                  </div>
                </div>
              </div>

              {/* Data Node Inspector */}
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-white/5 space-y-2.5 font-sans">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{isEn ? "Selected Interval" : "선택된 가동 단계 시간"}</span>
                  <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-mono font-black">{selectedChartTime}초 (Seconds)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-slate-950/40 rounded-lg border border-red-500/10">
                    <span className="text-[10px] text-red-400 block font-bold tracking-widest">{isEn ? "ECOTUBE VALUE" : "에코튜브 온도"}</span>
                    <span className="text-lg font-mono font-black text-rose-500 block pt-0.5">{ecoCurve[selectedChartTime]} ℃</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 rounded-lg border border-blue-500/10">
                    <span className="text-[10px] text-blue-400 block font-bold tracking-widest">{isEn ? "HEATPIPE VALUE" : "히트파이프 온도"}</span>
                    <span className="text-lg font-mono font-black text-blue-400 block pt-0.5">
                      {tradCurve[selectedChartTime] === 0 ? (isEn ? "No Warmth" : "가동없음") : `${tradCurve[selectedChartTime]} ℃`}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-400 font-sans leading-relaxed text-center bg-emerald-950/20 py-1.5 border border-emerald-500/10 rounded">
                  {selectedChartTime <= 80 
                    ? `* ${isEn ? "Ecotube is already heating at high levels while conventional heater has 0 output!" : `가동 초기 ${selectedChartTime}초 구간: 기존 온풍기가 작동조차 안될 때 에코튜브는 벌써 ${ecoCurve[selectedChartTime]}℃ 고온 분출!`}`
                    : `* ${isEn ? `Temperature Gap is +${ecoCurve[selectedChartTime] - tradCurve[selectedChartTime]}℃ closer to crop comfort!` : `가동 후반 온풍 도량 격차: 에코튜브가 기존 대비 무려 +${ecoCurve[selectedChartTime] - tradCurve[selectedChartTime]}℃ 고열을 연속 사출!`}`
                  }
                </p>
              </div>

            </div>
          </div>

          {/* Right Column (Span 6): Explanation and Comprehensive Comparative Table */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-purple-400 uppercase bg-purple-950/30 px-2.5 py-1 rounded border border-purple-400/10 inline-block">
                {slides[2].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {slides[2].title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[2].desc}
              </p>
            </div>

            {/* Structured Table matching first image */}
            <div className="bg-slate-900/60 rounded-xl overflow-hidden border border-white/5 font-sans text-xs w-full overflow-x-auto select-text">
              <div className="min-w-[500px] md:min-w-0">
                <div className="grid grid-cols-10 bg-slate-950/80 p-2.5 font-bold text-slate-300 border-b border-white/5 text-center">
                  <div className="col-span-2 text-left">{isEn ? "Heater Type" : "가동시간"}</div>
                  {timeSteps.map(t => (
                    <div key={t} className="col-span-1 font-mono text-[10px] text-cyan-400">{t}초</div>
                  ))}
                </div>

                {/* Eco Row */}
                <div className="grid grid-cols-10 p-2.5 bg-slate-900/40 border-b border-white/5 text-center items-center">
                  <div className="col-span-2 text-left font-black text-rose-400 text-[11px] truncate">에코튜브 히터</div>
                  {timeSteps.map(t => (
                    <div key={t} className={`col-span-1 font-mono text-[11px] ${selectedChartTime === t ? "text-rose-400 font-extrabold text-xs" : "text-slate-300"}`}>
                      {ecoCurve[t]}℃
                    </div>
                  ))}
                </div>

                {/* Traditional Row */}
                <div className="grid grid-cols-10 p-2.5 bg-slate-950/10 text-center items-center text-slate-400">
                  <div className="col-span-2 text-left text-blue-400 font-black text-[11px] truncate">히트파이프 온풍</div>
                  {timeSteps.map(t => (
                    <div key={t} className={`col-span-1 font-mono text-[11px] ${selectedChartTime === t ? "text-blue-400 font-extrabold text-xs" : "text-slate-400"}`}>
                      {tradCurve[t] === 0 ? "—" : `${tradCurve[t]}℃`}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950/30 text-[10.5px] text-slate-500 leading-relaxed leading-sans border-t border-white/5">
                {isEn 
                  ? "※ Test Summary: Ecotube displays instant thermal excitation compared to physical heat-pipe delay. It provides safe high-mass air warming from the first seconds." 
                  : "※ 당사 자체 정밀 실험 결과: 히트파이프형 온풍기는 내부 전도 한계로 초반 80초간 무발온으로 비산 에너지를 낭비하는 반면, 에코튜브 히터는 가동 즉시 45도 온풍을 방사하여 낭비 전력을 원천 제어합니다."
                }
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5 font-sans">
              {slides[2].stats.map((stat, stIdx) => (
                <div key={stIdx} className="p-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 block font-bold truncate uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-rose-400 block pt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 🔮 PAGE 04: Agricultural Warm Air Blower Product (Second Image Applied Here!) */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-teal-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Tag Page Indicator */}
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 04
          </div>

          {/* Left Column (Span 6): Interactive Product Schematic Blower & Parts */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="w-full bg-slate-950/60 rounded-2xl border border-white/10 p-5 space-y-5 relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-emerald-400 font-extrabold bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded">
                  MODEL: ECO-AGRI-BLOWER
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase">
                  {isEn ? "Interactive Blueprint View" : "설계 도면 조감도"}
                </span>
              </div>

              {/* 3D-styled cabinet block schema with parts selectors */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 relative flex flex-col items-center justify-center">
                
                {/* SVG drawing of the 농업용 온풍기 cabinet chassis */}
                <svg viewBox="0 0 460 210" className="w-full h-auto">
                  <defs>
                    <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#15803d" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#14532d" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="ventGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                  </defs>

                  {/* Ground grid background line shadow */}
                  <line x1="20" y1="180" x2="440" y2="180" stroke="#334155" strokeWidth="2.5" />
                  <line x1="40" y1="180" x2="20" y2="200" stroke="#1e293b" />
                  <line x1="420" y1="180" x2="440" y2="200" stroke="#1e293b" />

                  {/* Main Green Cabinet Body */}
                  <rect 
                    x="100" 
                    y="40" 
                    width="260" 
                    height="130" 
                    rx="12" 
                    fill="url(#chassisGrad)" 
                    stroke="#4ade80" 
                    strokeWidth="2.5" 
                    className="transition-all duration-300"
                  />

                  {/* Wheels */}
                  <rect x="130" y="170" width="24" height="12" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                  <rect x="306" y="170" width="24" height="12" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />

                  {/* Component 1: 운전조작반 (Control Panel Section) */}
                  <g 
                    className="cursor-pointer" 
                    onClick={() => setActiveBlowerPart('panel')}
                  >
                    <rect 
                      x="115" 
                      y="55" 
                      width="60" 
                      height="75" 
                      rx="6" 
                      fill="url(#ventGrad)" 
                      stroke={activeBlowerPart === 'panel' ? "#22d3ee" : "#334155"} 
                      strokeWidth={activeBlowerPart === 'panel' ? 2 : 1.5} 
                    />
                    {/* Small button circles */}
                    <circle cx="130" cy="70" r="3" fill="#ef4444" />
                    <circle cx="145" cy="70" r="3" fill="#22c55e" />
                    <circle cx="160" cy="70" r="3" fill="#eab308" />
                    <rect x="125" y="85" width="40" height="28" rx="2" fill="#020617" stroke="#1e293b" strokeWidth="1" />
                    <text x="145" y="103" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">63℃</text>
                    
                    {/* Pointer / Line */}
                    <circle cx="145" cy="118" r="4.5" fill="#22d3ee" className="animate-ping" />
                    <circle cx="145" cy="118" r="3" fill="#0284c7" />
                  </g>

                  {/* Component 2: 열원발생기 (Ecotube Heating Block Section) - Inside body */}
                  <g 
                    className="cursor-pointer" 
                    onClick={() => setActiveBlowerPart('generator')}
                  >
                    {/* Interior Tube coil shape */}
                    <rect 
                      x="195" 
                      y="55" 
                      width="70" 
                      height="100" 
                      rx="6" 
                      fill="#020617" 
                      fillOpacity="0.4"
                      stroke={activeBlowerPart === 'generator' ? "#10b981" : "#1b4d3e"} 
                      strokeWidth={activeBlowerPart === 'generator' ? 2.5 : 1}
                    />
                    <path d="M 210,75 L 250,75 M 210,95 L 250,95 M 210,115 L 250,115 M 210,135 L 250,135" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
                    
                    <circle cx="230" cy="105" r="5" fill="#10b981" className="animate-ping" />
                    <circle cx="230" cy="105" r="3.5" fill="#047857" />
                  </g>

                  {/* Component 3: 송풍기 (Blower fan impeller inside) */}
                  <g 
                    className="cursor-pointer" 
                    onClick={() => setActiveBlowerPart('fan')}
                  >
                    <rect 
                      x="280" 
                      y="55" 
                      width="65" 
                      height="100" 
                      rx="6" 
                      fill="#020617" 
                      fillOpacity="0.4"
                      stroke={activeBlowerPart === 'fan' ? "#d946ef" : "#14532d"} 
                      strokeWidth={activeBlowerPart === 'fan' ? 2.5 : 1} 
                    />
                    {/* Fan blades representation */}
                    <circle cx="312" cy="105" r="22" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,3" className="animate-spin-slow" />
                    <circle cx="312" cy="105" r="6" fill="#475569" />
                    <line x1="312" y1="83" x2="312" y2="127" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="290" y1="105" x2="334" y2="105" stroke="#94a3b8" strokeWidth="2" />

                    <circle cx="312" cy="105" r="5" fill="#d946ef" className="animate-ping" />
                    <circle cx="312" cy="105" r="3.5" fill="#a21caf" />
                  </g>

                  {/* Component 4: 공기배출기 (Air Exhaust System) */}
                  <g 
                    className="cursor-pointer" 
                    onClick={() => setActiveBlowerPart('exhaust')}
                  >
                    <rect 
                      x="360" 
                      y="75" 
                      width="35" 
                      height="60" 
                      rx="4" 
                      fill="#334155" 
                      stroke={activeBlowerPart === 'exhaust' ? "#f59e0b" : "#475569"} 
                      strokeWidth={activeBlowerPart === 'exhaust' ? 2 : 1} 
                    />
                    {/* Airflow arrows escaping cabinet */}
                    <path d="M 370,95 L 395,95 M 370,115 L 395,115" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                    <path d="M 390,90 L 398,95 L 390,100 M 390,110 L 398,115 L 390,120" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                    
                    <circle cx="377" cy="105" r="5" fill="#f59e0b" className="animate-ping" />
                    <circle cx="377" cy="105" r="3.5" fill="#b45309" />
                  </g>

                  {/* Connecting Label Texts in Korean/English */}
                  <text x="145" y="153" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">
                    {isEn ? "Control Panel" : "운전조작반"}
                  </text>
                  <text x="230" y="170" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">
                    {isEn ? "Heat Gen [Built-in]" : "열원발생기 [내장]"}
                  </text>
                  <text x="312" y="170" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">
                    {isEn ? "Blower [Built-in]" : "송풍기 [내장]"}
                  </text>
                  <text x="395" y="65" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">
                    {isEn ? "Air Exhaust" : "공기배출기"}
                  </text>
                </svg>

                {/* Hotspot details panel */}
                <div className="w-full bg-slate-950/80 p-3 rounded-lg border border-white/10 mt-3 text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">
                      {activeBlowerPart === 'exhaust' && (isEn ? "Air Exhaust System" : "공기배출기 [ Air Exhaust System ]")}
                      {activeBlowerPart === 'generator' && (isEn ? "Ecotube Heat Module Core" : "열원발생기 [ Ecotube Heat Module Core ]")}
                      {activeBlowerPart === 'fan' && (isEn ? "High-Flow Impeller Blower" : "송풍기 [ High-Flow Impeller Blower ]")}
                      {activeBlowerPart === 'panel' && (isEn ? "Surge-Safe Control Terminal" : "운전조작반 [ Surge-Safe Control Terminal ]")}
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px]">ACTIVE COMPONENT</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px] pt-1">
                    {activeBlowerPart === 'exhaust' && (isEn 
                      ? "Low-resistance airtight isolation damper blocks backward pressure and thermal escape, concentrating raw heat." 
                      : "기밀 처리가 완벽한 역풍방지 시스템과 수밀 조절 댐퍼가 장착되어 있어, 운전 정지 또는 대기 시 소중한 내부 열량의 누출을 물리 밀봉 구조차단합니다.")}
                    {activeBlowerPart === 'generator' && (isEn 
                      ? "Houses the flagship 57kW ultra-efficiency Ecotube nanocoatings that heat passing air currents directly." 
                      : "두현인프라텍 특허 나노 메탈릭 필름 코팅이 안치된 가열 챔버 내부에서 공기 흐름을 극소 저항으로 전량 유체 가열하여 98% 이상의 대량 열량으로 즉각 변환 공급합니다.")}
                    {activeBlowerPart === 'fan' && (isEn 
                      ? "Highly efficient 1.8kW motor shifting a massive 6,900 m3/h of clean heated air dynamically." 
                      : "에너지를 많이 먹는 구형 고마력 모터를 완전 교체한 저전력 고풍량 1.8kW 임펠러를 안치하여, 시간당 무려 6,900m³에 이르는 대풍량을 무진동 무소음 고속 대류 압송 순환시킵니다.")}
                    {activeBlowerPart === 'panel' && (isEn 
                      ? "Surge-protected smart controller calibrated strictly to safeguard agricultural terminals from moisture." 
                      : "농가의 습하고 가혹하며 전압 서지가 잦은 인입 계통을 완벽히 흡수 제어하는 BMS 전용 지능형 고강도 컨트롤 보드입니다. 안전 차단 루프가 상시 백그라운드 구동합니다.")}
                  </p>
                </div>
              </div>

              {/* Install Field Case Preview (matching greenhouse installation note in second image) */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-emerald-500/10 flex items-center gap-3">
                <div className="text-xl">🚜</div>
                <div>
                  <h6 className="text-[11.5px] font-black text-emerald-400">성남 농림 현장 영농 실증 완료 설치 모델</h6>
                  <p className="text-[10.5px] text-slate-400 font-sans leading-relaxed pt-0.5">
                    현재 실제 성남시 곡물 대단위 비닐하우스 원예지 내부에서 덕트 호스 및 송출 순환 계통에 연결 공급 장치로 무고장 상시 가동 정밀 실적 중입니다.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Span 6): Explanation and Main Image Bullet Features */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-[#0ea5e9] uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                {slides[3].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "Ecotube Applied Development for Agriculture" : "에코튜브 기반 농업용 온풍기 핵심 강점"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {slides[3].desc}
              </p>
            </div>

            {/* Visual bullet cards matching the list in the second image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              
              {/* Feature 1 */}
              <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-emerald-400/20 transition-all duration-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Zap className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-black text-white">에너지 절감 극대화</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">
                  기존의 물리 저항성 단순 니크롬 방식의 전기 기기들 대비 평균 약 **10%~50%**의 극적인 소비 전력 절감 효율이 가능합니다.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-cyan-400/20 transition-all duration-300">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Leaf className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-black text-white">친환경 무탄소 청정 청정열</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">
                  에코튜브 특수한 나노 메탈 세라믹 코팅 도막을 사용해 연소 매연이 일절 없고 일산화탄소 비발생의 초청정 무탄소 난방을 시현합니다.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-purple-400/20 transition-all duration-300">
                <div className="flex items-center gap-2 text-purple-400">
                  <Maximize2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-black text-white">초소형화 경량 이송 설계</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">
                  용량 대비 크기가 대단히 콤팩트하고 경적으로 외장이 빌드되어, 좁은 비닐하우스 통로 및 천장 서스펜디드 고정이 아주 원활합니다.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-rose-400/20 transition-all duration-300">
                <div className="flex items-center gap-2 text-rose-400">
                  <Activity className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-black text-white">생물 생육 속도 촉진</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5">
                  세라믹 나노 코팅부에서 분출되는 열풍에 다량 함유된 특정 광학 원적외선 방사 영향으로 작물 재배 시 조기 출하 및 증산에 매우 효과적입니다.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl hover:border-yellow-400/10 md:col-span-2 transition-all duration-300 flex items-start gap-3">
                <div className="p-2.5 bg-yellow-950/40 border border-yellow-500/20 rounded-lg text-yellow-400 flex-shrink-0">
                  <Coins className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h6 className="text-xs font-black text-slate-200">기존 유류 경유 급탕 대비 50% 이상의 극적인 연료 비용 절감 효과</h6>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">
                    화석연료 비용 인상 부담감으로부터 완벽히 탈피하여 전기 난방 변동 단가 및 고효율 계통 변환을 통해 대규모 열 보존 연 유지비를 획기적으로 낮춥니다.
                  </p>
                </div>
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5 font-sans">
              {slides[3].stats.map((stat, stIdx) => (
                <div key={stIdx} className="p-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 block font-bold truncate uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-emerald-400 block pt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 🔮 PAGE 05: Agricultural Fan Heater Performance Test Specifications Comparison (Third Image Applied Here!) */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-rose-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-400/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Tag Page Indicator */}
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 05
          </div>

          {/* Left Column (Span 6): Side-by-side Comparative Board Spec Matrix */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="w-full bg-slate-950/60 rounded-2xl border border-white/10 p-5 space-y-4 relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-cyan-400 font-extrabold bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded">
                  SPEC_DECISION: INDUSTRIAL FIELD_LEVEL
                </span>
                <span className="text-[9px] font-mono text-emerald-400 font-black">STANDARD 300~500 PYEONG BASIS</span>
              </div>

              {/* Main Specification comparison board */}
              <div className="w-full overflow-x-auto select-text pb-2">
                <div className="space-y-3 font-sans text-xs min-w-[500px] md:min-w-0">
                
                {/* Spec Heading */}
                <div className="grid grid-cols-12 gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-white/5 font-black text-[11px] text-center">
                  <div className="col-span-4 text-left text-slate-400">구분 (Specification)</div>
                  <div className="col-span-4 text-slate-500">기존 온풍기 제품</div>
                  <div className="col-span-4 text-emerald-400">에코튜브 히터</div>
                </div>

                {/* row 1: MOTOR */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">전력량 - MOTOR</div>
                  <div className="col-span-4 text-slate-400 font-mono">5.5 kW/h</div>
                  <div className="col-span-4 text-emerald-400 font-mono font-black">1.8 kW/h</div>
                </div>

                {/* row 2: HEATER */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">전력량 - HEATER</div>
                  <div className="col-span-4 text-slate-400 font-mono">66.0 kW/h</div>
                  <div className="col-span-4 text-emerald-400 font-mono font-black">57.0 kW/h</div>
                </div>

                {/* row 3: AIRFLOW VOLUME */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">대풍량 (Air Volume)</div>
                  <div className="col-span-4 text-slate-400 font-mono">6,436 m³/h</div>
                  <div className="col-span-4 text-cyan-400 font-mono font-black">6,900 m³/h</div>
                </div>

                {/* row 4: INTAKE TEMP */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">흡입 평균 온도</div>
                  <div className="col-span-4 text-slate-400 font-mono">9.0 ℃</div>
                  <div className="col-span-4 text-slate-300 font-mono">9.0 ℃</div>
                </div>

                {/* row 5: MAX DISCHARGE */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">토출 최고 온도</div>
                  <div className="col-span-4 text-slate-400 font-mono">56.0 ℃</div>
                  <div className="col-span-4 text-rose-400 font-mono font-black">63.0 ℃</div>
                </div>

                {/* row 6: DELTA TEMP */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">Δt 온도 비약차</div>
                  <div className="col-span-4 text-slate-400 font-mono">35.5 ℃</div>
                  <div className="col-span-4 text-rose-500 font-mono font-black">42.0 ℃</div>
                </div>

                {/* row 7: CALORIES PRODUCTION */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-900/40 rounded-lg items-center text-center">
                  <div className="col-span-4 text-left text-slate-400 font-bold text-[11px]">생산 유효 열량</div>
                  <div className="col-span-4 text-slate-400 font-mono text-[10px]">48,246 kcal/h</div>
                  <div className="col-span-4 text-emerald-400 font-mono text-[10px] font-black">48,112 kcal/h</div>
                </div>

                {/* row 8: COMPOSITE EFFICIENCY */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-emerald-950/20 rounded-lg items-center text-center border border-emerald-500/10">
                  <div className="col-span-4 text-left text-emerald-400 font-black text-[11px]">전열 변환 효율 (COP)</div>
                  <div className="col-span-4 text-slate-400 font-mono">85.0%</div>
                  <div className="col-span-4 text-emerald-300 font-mono font-black text-xs">98.0% [최상치]</div>
                </div>

                {/* row 9: TOTAL DOCK POWER */}
                <div className="grid grid-cols-12 gap-2 p-2 bg-slate-950/60 rounded-lg items-center text-center border border-white/5">
                  <div className="col-span-4 text-left text-slate-300 font-black text-[11px]">시간당 총소비전력</div>
                  <div className="col-span-4 text-slate-400 font-mono font-black">72.1 kW/h</div>
                  <div className="col-span-4 text-rose-400 font-mono font-black text-xs">58.8 kW/h [절감]</div>
                </div>
                </div>

              </div>

              {/* Note on typical 300-500 pyeong farm */}
              <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 text-[10.5px] leading-relaxed text-slate-400">
                <span className="text-cyan-400 font-bold">※ 농가 실계측 요약:</span> 모터 마력 조정을 통해 불필요 공전율을 낮추고 나노막 기화 전열 효율을 98%로 극한 구동하여, 총 소비전력을 매 시간당 **72.1kW**에서 **58.8kW**로 대폭 삭감하였습니다.
              </div>

            </div>
          </div>

          {/* Right Column (Span 6): ROI Simulator & Explanation */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-[#ef4444] uppercase bg-rose-950/30 px-2.5 py-1 rounded border border-rose-400/10 inline-block">
                {slides[4].tag}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "Agricultural Environment Energy ROI Simulator" : "영농 비용 절감 & 탄소배출 ROI 시뮬레이터"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                비닐하우스 등 실제 온실 공조 현장의 일일 가동 시간과 겨울철 연간 가동일수를 지정하면, 에코튜브 장치 도입 시 절감되는 정량 전력 및 전력비용(산업용 을종 요금 평준치 적용)을 실시간 추산합니다.
              </p>
            </div>

            {/* Interactive ROI Sandbox */}
            <div className="bg-slate-900/60 p-5 rounded-xl border border-white/10 space-y-5 font-sans relative overflow-hidden">
              <div className="absolute inset-0 bg-[#80808005] bg-[size:10px_10px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                
                {/* slider 1: Hours */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">일일 평균 온풍 가열 시간</span>
                    <span className="text-cyan-400 font-mono font-black">{dailyRunHours} Hours / Day</span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="24" 
                    value={dailyRunHours} 
                    onChange={(e) => setDailyRunHours(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity" 
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>4시간 (보조가열)</span>
                    <span>12시간 (야간난방)</span>
                    <span>24시간 (극동기 연속)</span>
                  </div>
                </div>

                {/* slider 2: Days */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">연간 겨울철 가동일수</span>
                    <span className="text-cyan-400 font-mono font-black">{annualHeatingDays} Days / Year</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="180" 
                    value={annualHeatingDays} 
                    onChange={(e) => setAnnualHeatingDays(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity" 
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>30일 (초봄/늦가을)</span>
                    <span>90일 (평균 삼동)</span>
                    <span>180일 (최장 한대권)</span>
                  </div>
                </div>

                {/* Output counter grid */}
                <div className="p-4 bg-slate-950/80 rounded-xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">총 운영 전력량 대조</span>
                    <span className="text-[10px] font-mono text-purple-400 font-black">Accumulated Duration: {totalHours}h</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase tracking-wider">기존 온풍기 소비량</span>
                      <span className="text-sm font-mono font-bold text-slate-300 block">{traditionalTotalPower.toLocaleString()} kWh</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-400 block uppercase tracking-wider">에코튜브 소비량</span>
                      <span className="text-sm font-mono font-bold text-emerald-400 block">{ecotubeTotalPower.toLocaleString()} kWh</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-emerald-300 font-bold">에너지 순유공 전사량 절감</span>
                    <span className="text-md font-mono font-black text-emerald-400">-{savedPower.toLocaleString()} kWh (18.4% 절약)</span>
                  </div>

                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg text-center relative overflow-hidden">
                    <span className="text-[10px] text-emerald-400 font-mono font-black block tracking-widest uppercase">PROJECTED COMBINED CASH SAVED</span>
                    <span className="text-2xl font-mono font-extrabold text-white block pt-1">
                      ₩ {moneySavedKRW.toLocaleString()} KRW
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono block pt-0.5">
                      (약 $ {moneySavedUSD.toLocaleString()} USD 상당 / 도입 즉시 감가회수 발생)
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5 font-sans">
              {slides[4].stats.map((stat, stIdx) => (
                <div key={stIdx} className="p-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 block font-bold truncate uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-rose-400 block pt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};


