import { Service, Strength, CaseStudy } from './types';
import supercapacitorFactory from './assets/images/supercapacitor_factory_1781621879548.jpg';
import kepcoHqMainHeroBg from './assets/images/kepco_hq_main_hero_bg_1781618101543.jpg';
import evAssemblyLine from './assets/images/ev_assembly_line_1781621897327.jpg';
import evMotoAssembly from './assets/images/ev_moto_assembly_1781624859000.jpg';
import samMaterialLab from './assets/images/sam_material_lab_1781624876856.jpg';
import hge3d00Generator from './assets/images/hge3d00_generator_1781622900745.jpg';


export const MOASD_SERVICES: Service[] = [
  {
    id: 'hybrid-supercapacitor',
    title: '고성능 파워뱅크',
    titleEn: 'High-Performance Power Bank',
    subtitle: '고속 충전 및 고밀도 정밀 전원 모듈 설계',
    subtitleEn: 'High-Speed Charging & High-Density Power Module Design',
    description: '일반 리튬 이차 전지 대비 우수한 고속 출력 성능과 독보적으로 긴 충방전 수명을 보증하는 독자적 구조의 고품질 파워뱅크 전원 장치를 제조합니다.',
    descriptionEn: 'We manufacture proprietary power bank energy modules achieving faster power response and longer certified charge/discharge lifespans compared to traditional lithium-ion batteries.',
    benefits: [
      'Power Capacitor의 강력한 파워 구현 및 방전 종지까지 균일한 전압 유지',
      '10년 이상의 장수명(기대수명 20년)으로 지구 환경 보호에 공헌',
      '10kg 경량 무게와 컴팩트한 디자인 설계로 휴대 및 이동 편의성 극대화',
      '20,000회 이상 혁신적인 충방전 리사이클 수명 보장'
    ],
    benefitsEn: [
      'Delivers powerful performance via Power Capacitor, sustaining stable voltage until end-of-discharge',
      'Contributes to eco-preservation with over 10+ years of long service life (20-year expected lifespan)',
      'Maximizes mobility and portability with a lightweight 10kg compact chassis design',
      'Guarantees revolutionary cycle durability of over 20,000+ charge/discharge cycles'
    ],
    features: [
      '초고속 충전: 약 1시간 이내 완충 지원 (별도 충전기 및 태양광 패널 연동 시)',
      '출력 사양: 220V 1kW 정격 출력 및 USB A-C 타입 최대 100W 초고속 포트 탑재',
      '안심 컬러 라인업: 블루, 레드, 파스텔그린, 파스텔블루 등 감각적 컬러 셀렉션'
    ],
    featuresEn: [
      'Ultra-Fast Charging: Fully charged within approx. 1 hour (via external charger or solar panel integration)',
      'Output Specs: 220V 1kW rated output & USB Type-A/C ports with maximum 100W output support',
      'Aesthetic Color Lineup: Sensational options including Blue, Red, Pastel Green, and Pastel Blue'
    ],
    iconName: 'Cpu',
    impactScore: 98,
    imageUrl: supercapacitorFactory
  },
  {
    id: 'electric-bicycle',
    title: '자가충전 전기자전거',
    titleEn: 'Self-Charging E-Bicycle',
    subtitle: '자가발전 시스템 탑재 친환경 스마트 모빌리티',
    subtitleEn: 'Eco-Friendly Smart Mobility with Self-Power Generation System',
    description: '슈퍼커패시터 배터리, 500W 전기모터, 시마노 7단 기어 및 디지털 디스플레이어를 결합하여 혁신적인 무충전/자가발전 주행 환경을 실현하는 최적의 스마트 모빌리티 솔루션입니다.',
    descriptionEn: 'An optimal smart mobility solution realizing an innovative self-charging riding environment by combining a supercapacitor battery, a 500W electric motor, Shimano 7-speed gear, and a digital displayer.',
    benefits: [
      '슈퍼커패시터 배터리: 고밀도 급속 충방전 및 독보적인 반영구 수명 보장',
      '500W 전기모터: 강력하고 효율적인 동력 보조로 정밀 제어 주행 실현',
      '시마노 7단 기어: 주행 노면 상태와 고저차에 최적화된 기어 변속 시스템',
      '디지털 디스플레이어: 실시간 속도, 배터리 잔량 및 자가발전 상태 직관적 표시'
    ],
    benefitsEn: [
      'Supercapacitor Battery: High-density ultra-fast charge/discharge and semi-permanent lifespan',
      '500W Electric Motor: High-efficiency electric motor providing robust and stable power assist',
      'Shimano 7-Speed Gear: Precision gear system optimized for diverse terrains and smooth riding',
      'Digital Displayer: Smart dashboard displaying real-time velocity, charge, and self-generation metrics'
    ],
    features: [
      '자가발전 시스템을 통한 주행 중 실시간 동력 순환 회수',
      '초경량 디자인 설계로 조종 피로도 및 기체 하중 획기적 경감',
      '친환경 무충전 메커니즘으로 이산화탄소 배출 제로 실현'
    ],
    featuresEn: [
      'Active energy recapture and power circulation during operation via Self-Power Generation System',
      'Ultralight structural layout reducing vehicle loads and driver fatigue',
      'Zero-emission eco-friendly mechanism requiring no grid power plug-ins'
    ],
    iconName: 'Milestone',
    impactScore: 90,
    imageUrl: evAssemblyLine
  },
  {
    id: 'electric-motorcycle',
    title: '하이브리드 이륜차 구동 기어',
    titleEn: 'Hybrid Motorcycle Powertrains',
    subtitle: '고정밀 고출력 고장력 에너지 변환 팩 설계',
    subtitleEn: 'Heavy-Duty Electrical Transmission Design',
    description: '고부하 장거리 도로 이송 오퍼레이션을 수행하는 헤비급 모빌리티를 위한 고성능 축전-변환 어셈블리를 독가적으로 구축하여 정속 고가속 균형을 완벽히 매칭합니다.',
    descriptionEn: 'Formulates robust energy storage-to-drive assemblies for heavy electric motorcycles, aligning continuous load output and peak starting torque.',
    benefits: [
      '순간 고가속 고하중 가속 시에도 일체의 기전 출력 끊김 무결',
      '에너지 재생 제동(Regenerative Braking) 회전 회수율 극대화',
      '일반 이륜차 평균 대비 지속 가속 기전력을 35% 전격 상향'
    ],
    benefitsEn: [
      'Flawless continuous electric delivery even during peak payloads',
      'Highly optimized regenerative braking energy capture rates',
      'Elevates sustained cruising torque by 35% over industry average'
    ],
    features: [
      '고전압(72V 이상) 안정화 분배 회로 설계 및 수랭·공랭 하이브리드 싱크',
      '모터 하중 지수에 지능형 펄스를 고속 브로드캐스팅하는 드라이브 인버터',
      '충격 방진 설계 기준치 군용 하드웨어 규격 완벽 통과 보디'
    ],
    featuresEn: [
      'High-voltage (72V+) circuit handling with thermal heatsinks',
      'Drive inverter broadcasting high-frequency pulses based on load',
      'Chassis passes rigorous military-grade vibration resistance tests'
    ],
    iconName: 'Truck',
    impactScore: 92,
    imageUrl: evMotoAssembly
  },
  {
    id: 'sam-new-material',
    title: '미국 CAS 등재 SAM 신물질',
    titleEn: 'CAS-Registered SAM Material',
    subtitle: '나노 분집전 기반 원천 특허 전극 신소재 라이브러리',
    subtitleEn: 'Nano-Collective Base Novel Material Library',
    description: '글로벌 최고 수준 권위의 미국 화학회 화학 초록 서비스(CAS, Chemical Abstracts Service)에 신소재 일련번호로 공식 독점 등재 완료된 나노 집전 전도 바인더 신소재입니다.',
    descriptionEn: 'Exclusive organic-inorganic nano-binding agent officially registered in the CAS registry under the American Chemical Society, facilitating superior electron transport.',
    benefits: [
      '기존 무기 카본 바인더 배합 대비 활물질 표면 고착 결합력 4.5배 추진',
      '장기 가속 극판 상의 분자 박리 미끄럼 현상을 제로 기어에 수렴',
      '전자 이동 속도의 비약적 상승으로 이차 전지 에너지 실질 밀도 45% 확보'
    ],
    benefitsEn: [
      'Promotes active particle surface cohesion by 4.5x over standard binders',
      'Zero molecular peeling or sliding under intensive cycle testing',
      '45% higher practical pack energy density via fast electron conduction'
    ],
    features: [
      '독창적 분자 사슬 결합형 유·무기 나노 복합 구조 디자인 특허',
      '수계 바인더 친환경 수용매 분산성 배합 설계',
      '전극 프레스로 인가 시 미세 기공을 지향 분포 유도하는 물리 화학성 메커니즘'
    ],
    featuresEn: [
      'Original molecular chain multi-bonding organic-inorganic composite design',
      'Eco-friendly water-soluble solvent dispersibility architecture',
      'Compression-activated microscopic pore guidance mechanism'
    ],
    iconName: 'Sparkles',
    impactScore: 99,
    imageUrl: samMaterialLab
  },
  {
    id: 'hybrid-generator',
    title: 'HGE3D00 하이브리드 발전기 / ESS (무충전 자가발전기)',
    titleEn: 'HGE3D00 Hybrid Generator / ESS (Chargeless Self-Generator)',
    subtitle: '무충전 자가발전기 ESS장치 순환시스템 및 원천 발전 모듈',
    subtitleEn: 'Chargeless Self-Generator ESS Device Closed-Loop Circulation System',
    description: '(주)두현인프라텍의 자존심 HGE3D00은 배터리 생산 시 최초 적치된 전력량을 기반으로 20,000회 이상 무방전 충·방전 리사이클 원리를 적용 가동합니다. 별도의 수전 충전 없이 최장 10년 이상 전기를 자가 재생하는 혁신적인 환류 루프(1kW ESS → 3배 증폭 3kW → 부하 2kW 소비 & 리커버리 1kW 복구 환류)를 유지합니다.',
    descriptionEn: 'Integrating Doohyun Infratech\'s signature HGE3D00 with an innovative closed-loop recycling principle, achieving over 20,000 charge-discharge cycles. Generates premium electricity for over 10+ years without any external charge feeds using a precision loop (1kW ESS Storage → 3x Amplifier 3kW → 2kW load consumption & 1kW recovery return).',
    benefits: [
      '무방전 자가 피드백: 10년 이상 별도 충전이 불필요한 궁극의 자원에너지 순환율',
      'X3배 출력 증폭: ESS 1kW 소스를 3배 압축 유전 유도하여 최종 3kW 정격 전송 확보',
      '전력 분할 기작: 사용 2kW(EV 전기차 충전 및 빌딩 인출) + 회수 1kW의 완벽 분할 환류'
    ],
    benefitsEn: [
      'Discharge-Free Self-Feedback: Ultra-long 10+ year lifespan requiring zero external grid recharges',
      '3x Power Amplification: Converts a stable 1kW source to 3kW load capacities via series resonant circuits',
      'Intelligent Flow Splitting: Safely delivers 2kW to local consumers while reclaiming 1kW for generator support'
    ],
    features: [
      '20,000회 이상 충·방전 리사이클 가동을 원천 보장하는 순환 오퍼레이팅 기획',
      '물리적 충격이나 관통 전위 급락 시에도 불꽃 발화나 열폭주가 전혀 없는 안전성',
      '영하 30도 혹한기 및 영상 60도 극한 고온 가동에서도 100% 자가발전 루프 유지'
    ],
    featuresEn: [
      'Engineered cycle profile supporting 20,000+ seamless recycling runs without degradation',
      'Absolute physical stability with zero potential spark emissions or battery thermal runways',
      'Operates seamlessly with steady output rates in environments from -30°C to +60°C'
    ],
    iconName: 'BatteryCharging',
    impactScore: 97,
    imageUrl: hge3d00Generator
  }
];

export const MOASD_STRENGTHS: Strength[] = [
  {
    id: 'cas-auth',
    title: '미국 CAS 공식 등재 신물질 원천 소유',
    titleEn: 'Original CAS-Registered SAM Materials',
    badge: 'CAS REGISTERED MATERIAL',
    description: '세계 화학 연합회(CAS)에 독창적 전도 극물질로서 신비의 코드 번호 지적 재산권을 완벽히 인위 보유중인 친환경 나노 전극 소재 SAM을 통해 타사의 추종을 불허하는 에너지 장착 능률을 구현합니다.',
    descriptionEn: 'Leveraging exclusive patent rights on original SAM organic molecular coatings registered under the American Chemical Society, we deliver high-efficiency charging capabilities that are unmatched.',
    accent: 'emerald'
  },
  {
    id: 'supercapacitor-tech',
    title: '파워뱅크 독점 양산 팹 라인 정밀 배치',
    titleEn: 'Exclusive Precision Power Bank Fab',
    badge: 'POWER BANK FAB',
    description: '수용성 집전 원천 레이아웃과 수계 파워뱅크 가공 시스템을 완비하고 전용 팹 공장 현장에서 실증 3D 자동화 테스트를 정밀 수행하여, 제품의 품질 무결성을 일관합니다.',
    descriptionEn: 'Equipped with bespoke water-soluble base grids and aquatic power bank manufacturing systems, we perform 3D automated simulation runs within our fab to guarantee solid product integrity.',
    accent: 'cyan'
  },
  {
    id: 'eco-ev-mass',
    title: '자가충전 전기자전거·하이브리드 이륜차 원스톱 스마트 조립라인',
    titleEn: 'One-stop Smart Mobility Line',
    badge: 'MICRO MOBILITY FULL ASSEMBLY',
    description: '단순히 배터리 셀 팩 납품에 한계를 두지 않고, 친환경 스마트 모빌리티(자가충전 전기자전거, 하이브리드 이륜차) 차체 전용 하우징 설계, 전기 모터 장치, 브레이킹 동력 복구 기어까지 원스톱 풀세트로 조립 생산합니다.',
    descriptionEn: 'Moving beyond simple cell packs, we design and mass-assemble heavy structural e-bike frames, custom motors, and active energy regenerative gears in our smart facility.',
    accent: 'purple'
  },
  {
    id: 'renewable-grid',
    title: 'HGE3D00 스마트 발전 하이브리드 결합체',
    titleEn: 'Signature HGE3D00 Generator Unit',
    badge: 'ESS HYBRID GENERATOR HGE3D00',
    description: '두현인프라텍의 자존심 HGE3D00 고밀도 이동형 하이브리드 발전 기어와 모듈을 양산 및 통합 관리하여, 유휴 전력이 발생할 때마다 초단위로 초고속 축전하고 동력을 계통에 분배 공급합니다.',
    descriptionEn: 'Co-producing and managing Doohyun Infratech\'s signature HGE3D00 generator and compact ESS, enabling ultra-fast charging and frequency management for regional lines.',
    accent: 'amber'
  }
];

export const MOASD_CASES: CaseStudy[] = [
  {
    id: 'case-1',
    client: '(주)두현인프라텍',
    clientEn: 'Doohyun Infratech Co., Ltd.',
    industry: '하이브리드 발전기 & ESS 연구 제조',
    industryEn: 'Hybrid Gen & ESS Manufacturing',
    challenge: '이동식 대용량 발전기 가동 시 발생하는 기계적 서지 및 실시간 전력 주파수 요동 제한 장벽 극복 필요.',
    challengeEn: 'Overcoming raw line frequency spikes and mechanical power surges when starting custom heavy duty generators.',
    solution: 'HGE3D00 스마트 하이브리드 발전 기어 및 MOASD의 고압 동기화 BMS 보호 엔지니어링 기술을 결합하여 실시간 서지 흡수 및 안전 계통 연계망 수립.',
    solutionEn: 'Implemented custom multi-stage BMS protection boards and active surge clamping grids on HGE3D00 units.',
    result: '과부하로 인한 불시 정지 지표 98% 격감 및 혹한기 영하 고산지 기온에서도 급랭 방지 100% 가동 신뢰성 입증.',
    resultEn: 'Reduced unexpected power trips by 98% and maintained 100% cold-weather uptime in alpine environments.',
    metrics: [
      { label: '전력 안정도 지표', labelEn: 'Power Stability Index', value: '99.8%', trend: 'up' },
      { label: '서지 감쇄 속도', labelEn: 'Surge Suppression Delay', value: '0.02초', trend: 'down' },
      { label: '시스템 수명 주기', labelEn: 'System Lifespan', value: '150% 연장', trend: 'up' }
    ]
  },
  {
    id: 'case-2',
    client: '(주)신화에너지솔루션',
    clientEn: 'Shinhwa Energy Solution Co., Ltd.',
    industry: '신재생에너지 스마트 전력 그리드',
    industryEn: 'Renewable Smart Grids',
    challenge: '태양광 및 풍력 등 신재생 부하의 급격한 변동으로 인한 연계 송배전 전력 품질 저하 및 부하 선로 오작동 현상.',
    challengeEn: 'Power grid degradation and micro-grid instability due to extreme solar/wind farm output volatility.',
    solution: '고출력 파워뱅크(Power Bank) 기반 동기화 전원 모듈 및 순간 보조 인가 댐퍼 시스템 구축 전개.',
    solutionEn: 'Deployed high-voltage synchronized power bank banking systems and active smoothing stabilizing dampers.',
    result: '선로 주파수 맥동 및 전력 흔들림 감지율 94.2% 완벽 제거 및 정하 전력 공급 정합 효율 99.9% 도달.',
    resultEn: 'Eliminated 94.2% of solar/wind output noise, securing a 99.9% grid-matched power feed consistency.',
    metrics: [
      { label: '계통 정합 완숙도', labelEn: 'Grid Consistency', value: '99.9%', trend: 'up' },
      { label: '주파수 요동 억제율', labelEn: 'Frequency Noise Control', value: '94.2%', trend: 'up' },
      { label: '인프라 운용 절감율', labelEn: 'OpEx Reductions', value: '35% 절감', trend: 'down' }
    ]
  },
  {
    id: 'case-3',
    client: 'SAM신소재R&D',
    clientEn: 'SAM Materials R&D',
    industry: '이차전지 극판 및 신물질 배합',
    industryEn: 'Advanced Electrode Materials',
    challenge: '이차전지 고전류 밀도 충방전 장기 반복 구동 시 극판 활물질박리 및 극판 표면 조기 열화 전개 결함.',
    challengeEn: 'Detachment of active materials from sub-electrode grids during repetitive rapid charge/discharge cycles.',
    solution: '미국 화학회 CAS 공식 고유 등록된 SAM(Self-Assembled Monolayer) 분집전 나노 극판 기술과 바이폴라 수계 특수 폴리머 처방 연계 실현.',
    solutionEn: 'Adopted self-assembled monolayer (SAM) binder collector layers and bipolar water-soluble polymers.',
    result: '전하이동 채널 가용 비강도 극대화, 전지 내부 표면 저항 89% 감쇄 및 반영구에 근접한 수명 유지 기여.',
    resultEn: 'Maximized ionic flow channels, cut internal resistance by 89%, and delivered semi-permanent cell lifespans.',
    metrics: [
      { label: '이온 전도율 상승', labelEn: 'Ionic Conductivity Boost', value: '45.8%', trend: 'up' },
      { label: '셀 내부 유효 저항', labelEn: 'Internal Cell Resistance', value: '89% 격감', trend: 'down' },
      { label: '활물질 밀착 유지력', labelEn: 'Binder Cohesion Factor', value: '99.92%', trend: 'up' }
    ]
  }
];

// Interactive Green Energy Simulator Specifications (Renewable energy & materials match)
export interface SimulationState {
  reportVolume: number;     // Now maps to target Capacity Scale (MW, scale 1-10)
  pipelineChains: number;   // Now maps to Power Bank Module scale (units, 2-8)
  automationLevel: number;  // Now maps to SAM New Material Blend Density (%, 0-100)
  hasDisorganizedSales: boolean; // Now maps to 'Greed Grid Sync active' status
  hasSiloBarrier: boolean;       // Now maps to 'BMS Thermal stabilizer' status
  hasManualExcelMess: boolean;   // Now maps to 'Micro mobility regenerative brake module' status
  hasHgeGeneratorOnly: boolean;  // Added: "HGE3D00 Hybrid mobile generator unit grid matching"
}

export const runSimulation = (state: SimulationState) => {
  // Quantitative physical/electrical modeling of green energy storage and EV capability optimization
  const initialBaseDischargeCapacity = (state.reportVolume * 15) + (state.pipelineChains * 10);
  
  // High-performance adjustments based on our advanced materials and capacitors
  const samMaterialFactor = (state.automationLevel / 100) * 0.45;
  const gridSyncFactor = state.hasDisorganizedSales ? 0.20 : 0.02;
  const regenerativeBrakeFactor = state.hasManualExcelMess ? 0.35 : 0.05;
  const generatorFactor = state.hasHgeGeneratorOnly ? 0.50 : 0.00;
  
  const finalEnergyEfficacyMultiplier = Math.min(0.98, samMaterialFactor + gridSyncFactor + regenerativeBrakeFactor + generatorFactor);
  const optimizedDischargeLoss = Math.max(2, Math.round(18 * (1 - finalEnergyEfficacyMultiplier)));
  
  // Calculations
  const outputCapacityGained = Math.round(initialBaseDischargeCapacity * (1 + finalEnergyEfficacyMultiplier) * (state.hasHgeGeneratorOnly ? 1.4 : 1.0));
  const efficiencyGain = Math.round(finalEnergyEfficacyMultiplier * 100);
  const peakTemperatureRating = Math.max(20, Math.round(75 - (state.hasSiloBarrier ? 35 : 5) - (state.automationLevel / 5) - (state.hasHgeGeneratorOnly ? 15 : 0)));
  const cellCycleLifeExtension = Math.round((state.pipelineChains * 12500) * (1 + samMaterialFactor) * (state.hasHgeGeneratorOnly ? 1.6 : 1.0));

  return {
    initialTimeSpent: initialBaseDischargeCapacity,
    optimizedTimeSpent: optimizedDischargeLoss,
    weeklyHoursSaved: outputCapacityGained,
    efficiencyGain: efficiencyGain,
    bottleneckIndex: peakTemperatureRating,
    improvedAccuracy: cellCycleLifeExtension,
    consultingRecommendation: getConsultingRecipe(state)
  };
};

function getConsultingRecipe(state: SimulationState): {
  coreIssue: string;
  coreIssueEn: string;
  focusTitle: string;
  focusTitleEn: string;
  recommendedService: string;
  recommendedServiceEn: string;
  roadmap: string[];
  roadmapEn: string[];
} {
  if (state.hasHgeGeneratorOnly) {
    return {
      coreIssue: '이동식 고전압 전력 인출 및 혹한/혹서기 배터리 열밀도 한밀 탈화 방폭 제어',
      coreIssueEn: 'Portable heavy-duty electrical drawing and temperature-resilient battery thermal explosion prevention',
      focusTitle: 'HGE3D00 이동형 하이브리드 발전 장치 & 대용량 안전 ESS 어셈블리 구축',
      focusTitleEn: 'HGE3D00 Portable Hybrid Power System & Large-Scale ESS Construction',
      recommendedService: 'HGE3D00 하이브리드 발전기 / ESS',
      recommendedServiceEn: 'HGE3D00 Hybrid Generator / ESS',
      roadmap: [
        'HGE3D00 탑 캐링 핸들 인터페이스 및 저성능 서지 제동 안전화 보드 적용',
        '미국 CAS 공식 등재 SAM 복합 바인더를 활용한 분자 들뜸 방지 극판 장착',
        '필드 고압 아웃렛 단자 실장 실정 전력 출력 모니터 가동'
      ],
      roadmapEn: [
        'Apply HGE3D00 carrying structures and active surge decoupling safety boards',
        'Load US CAS-registered SAM hybrid binders to completely avert active material peeling',
        'Deploy smart telemetry on active high-voltage fields and electric load ports'
      ]
    };
  }

  if (state.automationLevel >= 55) {
    return {
      coreIssue: '미국 CAS 등재 SAM 신물질의 극판 안착 및 에너지 고속 수평 충전 효율 강화',
      coreIssueEn: 'Assuring CAS-registered SAM original material adhesion on electrode plates and boosting high-speed charge rate',
      focusTitle: 'SAM 신소재 전도 가이던스 & 이차전지 극판 적용 설계',
      focusTitleEn: 'SAM Core Material Guidance & Next-Gen Electrode Formulation',
      recommendedService: '미국 CAS 등재 SAM 신소재',
      recommendedServiceEn: 'American CAS-Registered SAM Material',
      roadmap: [
        '전용 수계 수매 배합 혼합 프로세스 전개',
        '활물질 표면 정정 코팅을 통한 전지 내부 정사 마그네틱 인가',
        '소재 가용성 및 에너지 밀도 45% 향상 정량 측정'
      ],
      roadmapEn: [
        'Initiate specialized water-soluble solvent dispersion blending controls',
        'Establish pristine active agent coatings on sheets to slash internal cell resistance',
        'Execute quantitative metrics confirming 45% increases in energy density'
      ]
    };
  }
  
  if (state.hasManualExcelMess) {
    return {
      coreIssue: '마이크로 EV 기전 회전력 탈출 및 가속 시 순간 전압 급락(Voltage sag) 극복',
      coreIssueEn: 'Sustaining high starting torque and eliminating voltage sags during fast vehicle acceleration',
      focusTitle: '자가충전 전기자전거 & 하이브리드 이륜차 통합용 하이브리드 파워 유닛 장착',
      focusTitleEn: 'Hybrid Power Unit & Assembly Integration for Electric Micro-EVs',
      recommendedService: '자가충전 전기자전거용 축전 팩 & 하이브리드 이륜차 구동 기어',
      recommendedServiceEn: 'E-Bicycle Battery Packs & E-Motorcycle Powertrains',
      roadmap: [
        '안전 방폭 BMS 하우징 레이아웃 이식',
        '부드러운 전도 전하 교정을 위한 급속 주파수 평탄 인버터 탑재',
        '회생 제동 어셈블리 정압 연동 완료'
      ],
      roadmapEn: [
        'Assemble safety explosion-proof BMS enclosure coverings',
        'Integrate smart drive-pulsing inverters for fluid battery current correction',
        'Calibrate and align kinetic energy capture with regenerative brake modules'
      ]
    };
  }
  
  return {
    coreIssue: '신재생 발전 주파수 요동 및 기후 돌발 부하로 인한 송배전 탈락 위험 예방',
    coreIssueEn: 'Severe grid frequency fluctuations and line overhead protection against volatile weather loads',
    focusTitle: '신재생에너지 스마트 전력 그리드 & 계통 자동 동기 제어',
    focusTitleEn: 'Smart Green Grid Integration & Synchronous Frequency Autopilot Regulation',
    recommendedService: '신재생에너지 전력 제어',
    recommendedServiceEn: 'Renewable Power Integration',
    roadmap: [
      '초고주파 순간 반응형 뱅크 랙 마운팅 수립',
      '위성 기상 연동 돌출 예측 인공지능 수렴',
      '선로 과부하 서지 흡수 보호용 파워뱅크 제어 기동'
    ],
    roadmapEn: [
      'Construct high-frequency immediate-response power bank arrays',
      'Adopt weather satellite telemetry configurations for solar/wind forecasting',
      'Activate protective surge-absorbing gateway power systems on critical lines'
    ]
  };
}
