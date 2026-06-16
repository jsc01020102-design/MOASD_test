import { Service, Strength, CaseStudy } from './types';
import hge3d00GeneratorImage from './assets/images/hge3d00_generator_1781622900745.jpg';

export const MOASD_SERVICES: Service[] = [
  {
    id: 'hybrid-supercapacitor',
    title: '하이브리드 슈퍼커패시터',
    titleEn: 'Hybrid Supercapacitor',
    subtitle: '초고속 충반전 및 고밀도 정밀 축전 셀 설계',
    subtitleEn: 'Ultra-Fast Cycle & High-Density Cell Design',
    description: '전기화학식 일반 리튬 이차 전지 대비 100배 이상의 고속 출력 성능과 10만 회 이상의 충방전 사이클을 보증하는 독자적 구조의 에너지 축전 코어를 제조합니다.',
    descriptionEn: 'We manufacture proprietary energy storage cores achieving 100x faster power response and 100,000+ certified charge/discharge cycles compared to traditional lithium-ion batteries.',
    benefits: [
      '일반 전력 셀 대비 약 40배 이상의 충방전 반응 계조 확보',
      '장기 동작 노후화(Degradation) 최저 수준으로 반영구적 수명 보장',
      '혹한(영하 30도) 및 고온 가동 조건에도 균일한 에너지 보유력 과시'
    ],
    benefitsEn: [
      'Over 40x higher rate capability compared to standard power cells',
      'Semi-permanent lifespan backed by minimal chemical degradation',
      'Impeccable energy retention under extreme subzero (-30°C) and hot environments'
    ],
    features: [
      '나노 레벨 전극 표면 분무 분산 도포 기법 적용',
      '전해액 기공도 최대화로 극판 이온 도달 거리를 극도로 압쇄',
      '유휴 송배전 부작용을 예방하는 지능형 서지(Surge) 세이빙 블록 마킹'
    ],
    featuresEn: [
      'Precision nano-level electrode surface spray dispersion coating',
      'Optimized electrolytic porosity minimizing ionic transport distance',
      'Intelligent grid-protecting surge saving block technology'
    ],
    iconName: 'Cpu',
    impactScore: 98
  },
  {
    id: 'renewable-energy',
    title: '신재생에너지 전력 제어',
    titleEn: 'Renewable Power Integration',
    subtitle: '스마트 그린 그리드 전력 관리 통합 기술',
    subtitleEn: 'Smart Green Grid Integrated Management',
    description: '태양광 및 풍력 발전처의 기후 위성 연동 예측 맥동 정리를 수행하며, 전력 불규칙 맥동 현상을 전격 완충하는 마스터 컨트롤 대시보드를 안치합니다.',
    descriptionEn: 'Defines weather satellite-linked predictive smoothing for solar and wind farms, routing volatile grid irregularities into central master telemetry dashboards.',
    benefits: [
      '풍력·태양광 발전처 전력 연동 안정지수 평균 2.5배 가속화',
      '무효 전력 수율을 최소로 타파하여 예산 누수율 극복',
      '국가 송배전 선로 결합에 어울리는 최적의 동기 주파수 제어'
    ],
    benefitsEn: [
      'Boosts wind & solar grid-coupling stability by 2.5x on average',
      'Cuts budget leaks and line loss by minimizing reactive power',
      'Establishes optimum synchronous frequency regulation for public lines'
    ],
    features: [
      '다지점 기상 센서 결합 실시간 출력 예측 시뮬레이션 알고리즘',
      '발전 돌발 주파수 서지에 0.01초 이하 반응하는 속응형 차단 인터페이스',
      '분산형 마이크로 그리드 에너지 게이트웨이 정밀 오케스트레이션'
    ],
    featuresEn: [
      'Multi-source sensor fusion and real-time output predictive algorithms',
      'Ultra-fast breaker interface reacting to surge sags in <0.01 seconds',
      'Decentralized micro-grid gateway orchestration and synchronization'
    ],
    iconName: 'Zap',
    impactScore: 94
  },
  {
    id: 'electric-bicycle',
    title: '전기자전거용 축전 팩',
    titleEn: 'E-Bicycle Battery Packs',
    subtitle: '마이크로 모빌리티 경량 고수명 배터리 양산',
    subtitleEn: 'Mass Production of High-Lifespan EV Cells',
    description: '도심지 배달 및 일상 출퇴근 기동에 완벽히 정합되는 마이크로 셀 패키징을 제공합니다. 고장력 서라운드 인클로저 케이싱 설계로 낙하 외부 충격 충돌에도 안전합니다.',
    descriptionEn: 'Provides lightweight micro-cell packaging optimized for logistics fleets and daily commutes. Reinforced surround enclosure protects against heavy drop impacts.',
    benefits: [
      '배달 라이더의 대기 시간을 극한으로 압쇄하는 10분 마하 충전',
      '초경량 셀 배치 구조 설계로 모빌리티 조종 피로도 경감',
      '자체 배터리 제어 보드(BMS) 인스톨을 통한 화재 예방'
    ],
    benefitsEn: [
      '10-minute Mach charging minimizing driver down-times',
      'Ultralight structural cell layouts lowering vehicle load fatigue',
      'Active fire protection via fully embedded proprietary BMS'
    ],
    features: [
      '셀 병렬 전압의 실시간 평탄도 모니터 전개',
      '과전류 자동 탈착용 기계식 스마트 퓨즈 릴레이 장착',
      '셀 내부 전동 부하를 분산 정돈하는 스마트 마이크로 칩 도입'
    ],
    featuresEn: [
      'Real-time cell voltage balance monitoring across arrays',
      'Mechanical smart fuse relays for automatic overcurrent decoupling',
      'Micro-gated smart controller chip managing electric motor loads'
    ],
    iconName: 'Milestone',
    impactScore: 90
  },
  {
    id: 'electric-motorcycle',
    title: '전기오토바이 구동 기어',
    titleEn: 'E-Motorcycle Powertrains',
    subtitle: '고정밀 고출력 고장력 에너지 변환 팩 설계',
    subtitleEn: 'Heavy-Duty Electrical Transmission Design',
    description: '고부하 장거리 도로 이송 오퍼레이션을 수행하는 헤비급 모빌리티를 위한 고성능 축전-변환 어셈블리를 독가적으로 구축하여 정속 고가속 균형을 완벽히 매칭합니다.',
    descriptionEn: 'Formulates robust energy storage-to-drive assemblies for heavy electric motorcycles, aligning continuous load output and peak starting torque.',
    benefits: [
      '순간 고가속 고하중 가속 시에도 일체의 기전 출력 끊김 무결',
      '에너지 재생 제동(Regenerative Braking) 회전 회수율 극대화',
      '일반 전기오토바이 평균 대비 지속 가속 기전력을 35% 전격 상향'
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
    impactScore: 92
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
    impactScore: 99
  },
  {
    id: 'hybrid-generator',
    title: 'HGE3D00 하이브리드 발전기 / ESS',
    titleEn: 'HGE3D00 Hybrid Generator / ESS',
    subtitle: '미국 CAS 등재 SAM 신소재 함침 무방전 하이브리드 소형 원천 발전 모듈',
    subtitleEn: 'Discharge-Free Tactical Portable Power Unit',
    description: '(주)두현인프라텍의 주력 상장 모델 HGE3D00은 하이브리드 커패시터 기술과 SAM 극판 흡착 공법이 집약된 차세대 모바일 하이브리드 발전·ESS 유닛입니다. 외부 가혹 기온 조건 및 전압 급락에도 안정적인 고전압 전력 인출 및 초고속 완전 충전을 보장합니다.',
    descriptionEn: 'Doohyun Infratech\'s signature HGE3D00 unit integrates hybrid supercapacitor cells and American CAS-registered SAM coating to guarantee immediate electrical outlet extraction and ultra-rapid full charging across any challenging climate.',
    benefits: [
      '일반 리튬 인산철 대용량 팩 대비 약 5배 이상의 고속 에너지 전하 충전 수용',
      '충돌 및 외부 관통 충격에도 기체 발화나 열폭주가 전혀 없는 궁극의 안전성',
      '원터치 캐링 탑 핸들 및 이동 바퀴 하우징 설계로 필드 기동 실용성 극대화'
    ],
    benefitsEn: [
      'Accepts safe current feeding up to 5x faster than typical LFP grid packs',
      'Absolute security with zero ignition, blast, or thermal runaway',
      'Telescopic carry handle and industrial wheeled case for swift deployment'
    ],
    features: [
      '두현인프라텍(DOOHYUN INFRA TECH) 전면 시그니처 엠블럼 레이저 가공 보디',
      '멀티 AC 단자 전력 소켓 및 다채널 지능형 컨트롤 인버터 탑재',
      '영하 30도 혹한기 및 영상 60도 고온 가동 조건에도 균일 효율 계조 수렴'
    ],
    featuresEn: [
      'Signature DOOHYUN INFRA TECH aluminum housing with laser-etched branding',
      'Multi-port dynamic AC outlets paired with integrated smart inverter',
      'Maintains consistent performance ratings between -30°C and +60°C'
    ],
    iconName: 'BatteryCharging',
    impactScore: 97,
    imageUrl: hge3d00GeneratorImage
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
    title: '커패시터 독점 양산 팹 라인 정밀 배치',
    titleEn: 'Exclusive Precision Supercapacitor Fab',
    badge: 'HYBRID CAPACITOR CELL FAB',
    description: '수용성 집전 원천 레이아웃과 수계 극판 가공 시스템을 완비하고 전용 팹 공장 현장에서 실증 3D 자동화 테스트를 정밀 수행하여, 마이크로 배터리로 탄생하는 제품의 무결성을 일관합니다.',
    descriptionEn: 'Equipped with bespoke water-soluble base grids and aquatic electrode processor systems, we perform 3D automated simulation runs within our fab to guarantee solid cell integrity.',
    accent: 'cyan'
  },
  {
    id: 'eco-ev-mass',
    title: '자전거·오토바이 원스톱 스마트 조립라인',
    titleEn: 'One-stop Smart Mobility Line',
    badge: 'MICRO MOBILITY FULL ASSEMBLY',
    description: '단순히 배터리 셀 팩 납품에 한계를 두지 않고, 친환경 스마트 모빌리티(전기자전거, 전기오토바이) 차체 전용 하우징 설계, 전기 모터 장치, 브레이킹 동력 복구 기어까지 원스톱 풀세트로 조립 생산합니다.',
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
    solution: '고출력 하이브리드 슈퍼커패시터(Supercapacitor) 기반 동기화 전하 모듈 및 순간 보조 인가 댐퍼 뱅크 구축 전개.',
    solutionEn: 'Deployed high-voltage synchronized supercapacitor banking systems and active smoothing stabilizing dampers.',
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
  pipelineChains: number;   // Now maps to Hybrid Supercapacitor Module scale (units, 2-8)
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
      focusTitle: '전기자전거 & 전기오토바이 통합용 하이브리드 파워 유닛 장착',
      focusTitleEn: 'Hybrid Power Unit & Assembly Integration for Electric Micro-EVs',
      recommendedService: '전기자전거용 축전 팩 & 전기오토바이 구동 기어',
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
      '선로 과부하 서지 흡수 보호용 커패시터 게이트 키핑 가동'
    ],
    roadmapEn: [
      'Construct high-frequency immediate-response supercapacitor banking arrays',
      'Adopt weather satellite telemetry configurations for solar/wind forecasting',
      'Activate protective surge-absorbing gateway capacitors on critical lines'
    ]
  };
}
