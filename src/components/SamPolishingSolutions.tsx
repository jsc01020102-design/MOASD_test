import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
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
  ArrowUpRight
} from 'lucide-react';

export type SolutionTab = 'sam-p' | 'ecotube' | 'terramuvics' | 'heat-coating';

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
  const activeTab: SolutionTab = (currentTabRaw === 'sam-p' || currentTabRaw === 'ecotube' || currentTabRaw === 'terramuvics' || currentTabRaw === 'heat-coating')
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
      const customEvent = e as CustomEvent<{ tab: SolutionTab }>;
      if (customEvent.detail && customEvent.detail.tab) {
        setActiveTab(customEvent.detail.tab);
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

          {/* Tab Switcher buttons - Flowing nicely below description */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-950/80 border border-white/10 rounded-xl xl:max-w-max">
            <button
              onClick={() => setActiveTab('sam-p')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'sam-p'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gem className="w-3.5 h-3.5" />
              {t('sam.nav.p', 'SAM Metal & Concrete Polishing', 'SAM 메탈 및 콘크리트 폴리싱')}
            </button>
            <button
              onClick={() => setActiveTab('ecotube')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'ecotube'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              {t('sam.nav.e', 'ECOTUBE (에코튜브)', 'ECOTUBE (에코튜브)')}
            </button>
            <button
              onClick={() => setActiveTab('terramuvics')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'terramuvics'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {t('sam.nav.t', 'Terramuvics (테라뮤빅스)', 'Terramuvics (테라뮤빅스)')}
            </button>
            <button
              onClick={() => setActiveTab('heat-coating')}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'heat-coating'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {t('sam.nav.h', 'Conductive Heating Coating', '발열 코팅')}
            </button>
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
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
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
    </div>
  );
};
