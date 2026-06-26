import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Layers, 
  Anchor, 
  Sun, 
  Droplet, 
  Cpu, 
  Orbit, 
  ShieldCheck, 
  Leaf, 
  Hammer, 
  Activity, 
  Sparkle, 
  ArrowUpRight, 
  Thermometer, 
  HeartPulse, 
  Container,
  Compass,
  ArrowRight,
  ShieldAlert,
  Flame,
  Zap,
  Sliders,
  Trash2,
  Upload,
  Image as ImageIcon,
  Edit
} from 'lucide-react';

// Import high-fidelity local images
import bgEvMoto from '../assets/images/ev_moto_assembly_1781624859000.jpg';
import bgSamLab from '../assets/images/sam_material_lab_1781624876856.jpg';
import bgSupercapacitor from '../assets/images/supercapacitor_factory_1781621879548.jpg';
import bgSkyscraper from '../assets/images/moasd_skyscraper_hq_bg_1781618333946.jpg';

// Get fallback images mapping
const getDefaultImage = (itemId: string): string => {
  switch (itemId) {
    case 'b-01': // 따개비 특화 방오 신소재 / Marine Bio-SAM
      return bgSamLab;
    case 'b-02': // 친환경 해양 산업 / Marine & Shipbuilding
      return 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80';
    case 'b-03': // 신재생 에너지 / Renewable Energy
      return 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80';
    case 'b-04': // 고효율 수소발생장치 / Hydrogen Systems
      return 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80';
    case 'b-05': // 미래 이동수단 / Future Mobility
      return bgEvMoto;
    case 'b-06': // 우주항공 SAM 코팅 / Aerospace Tech
      return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80';
    case 'b-07': // 첨단 군수 장비 / Defense Industry
      return 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80';
    case 'b-08': // 반도체 및 차세대 디스플레이 / Semiconductor & Display
      return bgSupercapacitor;
    case 'b-09': // 탄소배출 제로 / Net-Zero Carbon
      return 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80';
    case 'b-10': // 스마트 건설 / Smart Construction
      return bgSkyscraper;
    case 'b-11': // 정밀 의료 장비 / Medical Devices
      return 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';
    case 'b-12': // 친환경 코스메틱 / Eco-Cosmetics
      return 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80';
    default:
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
  }
};

interface BusinessItem {
  id: string;
  num: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  keywords: string[];
  icon: React.ElementType;
  color: string; // e.g., 'cyan', 'purple', 'emerald', 'amber'
}

interface Track {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ElementType;
  colorClass: string;
  items: BusinessItem[];
}

interface BusinessDomainProps {
  isMainScreen?: boolean;
}

export const BusinessDomain: React.FC<BusinessDomainProps> = ({ isMainScreen = false }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const tracks: Track[] = [
    {
      id: 'track-1',
      title: 'TRACK 01. 해양 및 지속 가능 에너지',
      titleEn: 'TRACK 01. Marine & Green Energy',
      description: '해양 생태계 보호와 인류의 친환경 에너지 전환을 위한 독보적인 원천 기술을 제공합니다.',
      descriptionEn: 'Providing peerless original technologies for marine ecosystem protection and green energy transition.',
      icon: Anchor,
      colorClass: 'text-cyan-400 border-cyan-400/20 bg-cyan-950/20',
      items: [
        {
          id: 'b-01',
          num: '01',
          title: '따개비 특화 방오 신소재',
          titleEn: 'Marine Bio-SAM',
          description: '해양 생물의 흡착을 근본적으로 제어하는 CAS 등록 친환경 SAM 신물질 원천 기술 사업입니다.',
          descriptionEn: 'CAS-registered eco-friendly SAM raw material technology business that fundamentally controls marine bio-attachment.',
          keywords: ['원천기술', '친환경방오', 'CAS등록신물질'],
          icon: Anchor,
          color: 'cyan'
        },
        {
          id: 'b-02',
          num: '02',
          title: '친환경 해양 산업',
          titleEn: 'Marine & Shipbuilding',
          description: '조선 선박 하부 및 방파제 등에 SAM 방오 코팅을 적용하여 마찰 저항 감소를 통한 연료 절감 및 탄소 배출 감축에 기여합니다.',
          descriptionEn: 'Applies SAM anti-fouling coatings to ship hulls and breakwaters to reduce friction drag, saving fuel and cutting carbon emissions.',
          keywords: ['조선산업', '방파제코팅', '연료효율극대화'],
          icon: Compass,
          color: 'cyan'
        },
        {
          id: 'b-03',
          num: '03',
          title: '신재생 에너지',
          titleEn: 'Renewable Energy',
          description: '태양광 패널 유해물질 부착 방지 및 풍력 발전기 결빙 방지(Anti-icing) 기술로 발전 효율을 상시 극대화합니다.',
          descriptionEn: 'Protects solar panels from grime accumulation and prevents ice build-up (Anti-icing) on wind turbines to maximize uptime energy yield.',
          keywords: ['태양광패널', '풍력발전', '발전효율보호'],
          icon: Sun,
          color: 'cyan'
        },
        {
          id: 'b-04',
          num: '04',
          title: '고효율 수소발생장치',
          titleEn: 'Hydrogen Systems',
          description: '수전해 장치 전극 표면 처리를 통해 가스 탈포(기포 분리)를 촉진하여 차세대 청정 수소 생산 효율을 혁신합니다.',
          descriptionEn: 'Innovates next-gen clean hydrogen efficiency by promoting bubble detachment on water electrolysis electrode surfaces.',
          keywords: ['수전해전극', '수소에너지', '생산성향상'],
          icon: Droplet,
          color: 'cyan'
        }
      ]
    },
    {
      id: 'track-2',
      title: 'TRACK 02. 미래 모빌리티 및 첨단 산업',
      titleEn: 'TRACK 02. Mobility & High-Tech',
      description: '가혹한 환경을 극복하고 효율성을 극대화하는 극한 기술의 기준을 제시합니다.',
      descriptionEn: 'Setting the standard for extreme-condition engineering that conquers harsh environments and boosts efficiency.',
      icon: Cpu,
      colorClass: 'text-purple-400 border-purple-400/20 bg-purple-950/20',
      items: [
        {
          id: 'b-05',
          num: '05',
          title: '미래 이동수단',
          titleEn: 'Future Mobility',
          description: '자동차, 전기 오토바이, 전기 자전거의 외장 방오 코팅 및 배터리 효율 향상을 위한 나노 절연·방열 박막 기술을 공급합니다.',
          descriptionEn: 'Supplies exterior anti-fouling coatings and nano-thin thermal insulation/dissipation films for EV batteries, electric motorbikes, and e-bicycles.',
          keywords: ['전기차', 'e모빌리티', '나노방열막'],
          icon: Zap,
          color: 'purple'
        },
        {
          id: 'b-06',
          num: '06',
          title: '우주항공 SAM 코팅',
          titleEn: 'Aerospace Tech',
          description: '인공위성 및 항공기 동체의 마찰열 감소, 대기권 비행 시 극저온 결빙 차단으로 극한 우주 환경에서의 내구성을 확보합니다.',
          descriptionEn: 'Mitigates friction heat on satellite and aircraft hulls, and blocks cryogenic icing during high-altitude atmospheric flights.',
          keywords: ['인공위성', '항공기날개', '극한환경내구성'],
          icon: Orbit,
          color: 'purple'
        },
        {
          id: 'b-07',
          num: '07',
          title: '첨단 군수 장비',
          titleEn: 'Defense Industry',
          description: '잠수함, 전투기 등 군용 장비의 해수 부식(Anti-corrosion) 방지 및 특수 기능성 코팅으로 가혹한 전장 환경 속 생존성을 높입니다.',
          descriptionEn: 'Provides anti-corrosion marine shielding and specialized functional coatings to enhance survival vectors for submarines and fighter jets.',
          keywords: ['방위산업', '해수부식방지', '장비내구도증가'],
          icon: ShieldCheck,
          color: 'purple'
        },
        {
          id: 'b-08',
          num: '08',
          title: '반도체 및 차세대 디스플레이',
          titleEn: 'Semiconductor & Display',
          description: '미세 공정 내 선택적 지역 증착(AS-ALD)의 핵심 분자막 형성 및 디스플레이 표면 지문 방지(AF) 마감을 구현합니다.',
          descriptionEn: 'Enables critical selective molecular layer formatting for Area-Selective ALD (AS-ALD) and Anti-Fingerprint (AF) finishes.',
          keywords: ['반도체공정', '디스플레이', '지문방지AF'],
          icon: Cpu,
          color: 'purple'
        }
      ]
    },
    {
      id: 'track-3',
      title: 'TRACK 03. 친환경 인프라 및 환경 경영',
      titleEn: 'TRACK 03. Infra & Net-Zero',
      description: '지구 환경과의 상생을 위해 오염을 방지하고 탄소 배출을 획기적으로 줄입니다.',
      descriptionEn: 'Preventing environmental pollution and radically slashing carbon footprints to co-exist with Mother Earth.',
      icon: Leaf,
      colorClass: 'text-emerald-400 border-emerald-400/20 bg-emerald-950/20',
      items: [
        {
          id: 'b-09',
          num: '09',
          title: '탄소배출 제로',
          titleEn: 'Net-Zero Carbon',
          description: '탄소 포집(CCUS) 장치 내부 유량 마찰 최소화 등 친환경 공정 솔루션을 통해 글로벌 탄소중립 실현에 앞장섭니다.',
          descriptionEn: 'Leads global carbon neutrality via eco-friendly processing solutions, including friction reduction inside carbon capture (CCUS) devices.',
          keywords: ['탄소중립', 'CCUS공정', 'ESG경영'],
          icon: Leaf,
          color: 'emerald'
        },
        {
          id: 'b-10',
          num: '10',
          title: '스마트 건설',
          titleEn: 'Smart Construction',
          description: '건축물 외벽 glass 및 콘크리트 표면 오염 방지(Self-cleaning)와 초장수명 방수 기술로 도시 인프라 유지보수 비용을 혁신합니다.',
          descriptionEn: 'Minimizes municipal maintenance costs using ultra-durable waterproofing and self-cleaning exterior glass and concrete surface coatings.',
          keywords: ['건축외장재', '자가세정', '초장수명방수'],
          icon: Hammer,
          color: 'emerald'
        }
      ]
    },
    {
      id: 'track-4',
      title: 'TRACK 04. 바이오 헬스케어 및 라이프',
      titleEn: 'TRACK 04. Bio & Life Science',
      description: '인체 안전성을 검증받은 미세 제어 기술로 일상의 품격을 높입니다.',
      descriptionEn: 'Elevating raw quality of life through bio-validated precision molecular control technologies.',
      icon: Activity,
      colorClass: 'text-amber-400 border-amber-400/20 bg-amber-950/20',
      items: [
        {
          id: 'b-11',
          num: '11',
          title: '정밀 의료 장비',
          titleEn: 'Medical Devices',
          description: '카테터, 주사 바늘 등 의료기기 표면 코팅을 통해 혈전 형성을 막고 박테리아 증식을 억제하여 우수한 생체 적합성을 구현합니다.',
          descriptionEn: 'Coats catheter and syringe needle surfaces to prevent thrombosis and suppress bacterial growth, ensuring high biocompatibility.',
          keywords: ['의료기기', '생체적합성', '감염방지'],
          icon: HeartPulse,
          color: 'amber'
        },
        {
          id: 'b-12',
          num: '12',
          title: '친환경 코스메틱',
          titleEn: 'Eco-Cosmetics',
          description: 'SAM 신물질의 무독성 특성을 바탕으로 친환경 화장품 산업의 새로운 패러다임에 앞장서며, 잔여물 없이 끝까지 사용하는 화장품 용기 코팅 및 뷰티 패치 신소재를 연구/개발합니다.',
          descriptionEn: 'Pioneers green beauty via non-toxic SAM materials, developing residue-free container slip liners and advanced dermal patch technologies.',
          keywords: ['친환경용기', '제로웨이스트', '인체무독성'],
          icon: Sparkles,
          color: 'amber'
        }
      ]
    }
  ];

  // State for active track filter
  const [activeTrackId, setActiveTrackId] = useState<string>('all');
  
  // State for active Far-infrared application
  const [activeFirApp, setActiveFirApp] = useState<number>(0);

  // Sync admin mode and storage modifications
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const hasAdminSession = sessionStorage.getItem('moasd_admin_session') !== null;
    const manualToggle = localStorage.getItem('moasd_admin_manual_toggle') === 'true';
    return hasAdminSession || manualToggle;
  });

  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('moasd_custom_business_images');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const syncState = () => {
      const hasAdminSession = sessionStorage.getItem('moasd_admin_session') !== null;
      const manualToggle = localStorage.getItem('moasd_admin_manual_toggle') === 'true';
      setIsAdminMode(hasAdminSession || manualToggle);

      const saved = localStorage.getItem('moasd_custom_business_images');
      if (saved) {
        try {
          setCustomImages(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        setCustomImages({});
      }
    };
    window.addEventListener('storage', syncState);
    const interval = setInterval(syncState, 1500);
    return () => {
      window.removeEventListener('storage', syncState);
      clearInterval(interval);
    };
  }, []);

  const handleImageUpload = (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert(isEn 
        ? "Invalid file format. Please upload JPG, PNG, WEBP, or GIF." 
        : "올바르지 않은 파일 형식입니다. JPG, PNG, WEBP, GIF 파일을 업로드해주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High-quality canvas compression & auto-downscaling to guarantee performance & bypass localStorage quota limitations
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 750;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to lightweight high-quality JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
          
          try {
            const updated = {
              ...customImages,
              [itemId]: compressedBase64
            };
            setCustomImages(updated);
            localStorage.setItem('moasd_custom_business_images', JSON.stringify(updated));
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
            alert(isEn
              ? "Storage space full. Please restore default photos on other domains first."
              : "저장 공간 용량이 부족합니다. 다른 영역의 사진을 '원본 복원'한 후 다시 시도해주세요.");
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = (itemId: string) => {
    const updated = { ...customImages };
    delete updated[itemId];
    setCustomImages(updated);
    localStorage.setItem('moasd_custom_business_images', JSON.stringify(updated));
  };

  const filteredTracks = isMainScreen || activeTrackId === 'all' 
    ? tracks 
    : tracks.filter(t => t.id === activeTrackId);

  const firApplications = [
    {
      id: 'fir-01',
      title: '고효율 나노 방열 솔루션',
      titleEn: 'Advanced Thermal Dissipation',
      desc: '전통적인 열전도 방식의 한계를 넘어, 장비 표면에 SAM 처리를 함으로써 내부 열을 원적외선 파장 형태로 대기 중에 직접 ‘복사 방사’하는 초박막 방열 코팅 기술입니다. 기기의 부피를 늘리지 않고도 열을 획기적으로 낮춥니다. 반도체, LED, 모빌리티 배터리 등 고집적 전자기기의 고질적인 발열 문제를 완벽히 해결합니다.',
      descEn: 'Transcending classical heat conduction limits, this ultra-thin coating allows devices to directly radiate thermal energy into the atmosphere as far-infrared wavelengths. Cools equipment drastically without physical bulk. Solves heat bottlenecks in high-density chips, LEDs, and EV battery assemblies.',
      keywords: ['원적외선방열', '초박막코팅', '전자기기발열제어'],
      imageConcept: 'thermal',
      glowColor: 'from-orange-500/20 to-red-500/10 border-orange-500/30'
    },
    {
      id: 'fir-02',
      title: '헬스케어 및 메디컬 케어',
      titleEn: 'Far-Infrared Bio-Healthcare',
      desc: 'SAM 물질의 인체 무독성·생체 적합성을 기반으로, 피부에 닿는 의료용 밴드, 패치 및 치료 보조기기 표면에 전격 적용합니다. 상온에서 방사되는 풍부한 원적외선이 피하 조직 깊숙이 침투하여 혈액 순환을 정밀 촉진하고 통증 완화, 유익한 공명 자극, 세포 자생 재생을 유도합니다.',
      descEn: 'Applied directly to medical bandages, pain patches, and orthopedic devices based on the verified safety and biocompatibility of SAM. Naturally emitted far-infrared at room temperature penetrates deep into subcutaneous tissues, encouraging micro-circulation, pain relief, and metabolic repair.',
      keywords: ['세포공명진동', '통증완화패치', '생체활성메디컬'],
      imageConcept: 'bio',
      glowColor: 'from-cyan-500/20 to-emerald-500/10 border-cyan-500/30'
    },
    {
      id: 'fir-03',
      title: '스마트 섬유 및 웨어러블 테크',
      titleEn: 'Smart Textiles & Wearable Tech',
      desc: '기능성 스포츠웨어, 특수 방한 군복, 아웃도어 의류 섬유 가닥 표면의 나노 분자 정밀 제어를 통해 SAM 신물질을 결합합니다. 인체에서 방사되는 복사열을 흡수하여 다시 고효율 원적외선으로 피드백 투사하는(Bio-radiation) 최첨단 체온 유지 및 피로 회복용 스마트 웨어러블 섬유 기술입니다.',
      descEn: 'Directly bonding SAM molecules to fibers in sportswear, thermal military fatigues, and extreme outdoor apparel. Absorbs body heat and converts it into bio-resonant far-infrared feedback, stabilizing body temperatures and speeding up muscle fatigue recovery.',
      keywords: ['웨어러블텍스타일', '체온유지섬유', '피로회복의류'],
      imageConcept: 'textile',
      glowColor: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30'
    }
  ];

  return (
    <div id="business-domain-section" className="text-slate-300 font-sans">
      
      {/* SECTION 1: Intro Hero Banner */}
      {!isMainScreen && (
        <section className="relative overflow-hidden py-24 border-b border-white/5 bg-slate-950">
          {/* Abstract futuristic grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          
          {/* Decorative background glows */}
          <div className="absolute -top-40 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs text-cyan-400 font-mono tracking-widest uppercase"
            >
              <Sparkle className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
              {isEn ? 'CORE VISION & BUSINESS DOMAIN' : '주식회사 모아에스디 핵심 사업 영역'}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto font-sans"
            >
              {isEn 
                ? '"Designing a Sustainable Future for Humanity through Hyper-Active Advanced Material Technology."'
                : '"초활성 신소재 기술로 인류의 지속 가능한 미래를 디자인합니다."'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed pt-2"
            >
              {isEn
                ? 'MOASD Co., Ltd. is an innovative leader across global marine, green energy, advanced defense, and general lifestyle sectors, driven by our proprietary CAS-registered self-assembled monolayer (SAM) molecules and carbon-neutral green original technologies.'
                : '주식회사 모아에스디는 CAS에 등재된 독자적인 신물질 소재(SAM) 및 친환경 원천 기술을 바탕으로 글로벌 해양, 에너지, 첨단 방산 및 라이프스타일 전반을 선도하는 혁신 기업입니다.'}
            </motion.p>
          </div>
        </section>
      )}

      {/* SECTION 2: 4 Core Business Tracks (Grid / Filter Tabs) */}
      <section className={`${isMainScreen ? 'py-4 w-full' : 'py-24 max-w-7xl mx-auto px-6'} relative`}>
        {!isMainScreen && (
          <>
            <div className="text-center mb-16 space-y-3">
              <div className="inline-flex items-center gap-1 text-[11px] text-purple-400 font-mono font-bold tracking-widest uppercase bg-purple-950/40 border border-purple-400/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> 
                {isEn ? '12 CORE SECTORS IN 4 MAIN TRACKS' : '4대 비전 트랙 & 12대 주력 사업 영역'}
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {isEn ? 'Strategic Vision Tracks' : '4대 핵심 사업 영역'}
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                {isEn 
                  ? 'We group our 12 specialized domains into 4 synergistic tracks for seamless corporate legibility and structured technological application.'
                  : '방문자분들의 명확한 직관성과 정보 전달을 위해, 주식회사 모아에스디의 12대 핵심 영역을 체계적인 4대 지향 비전 트랙으로 구조화하였습니다.'}
              </p>
            </div>

            {/* Filter Navigation Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-16 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveTrackId('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTrackId === 'all'
                    ? 'bg-white text-slate-950 font-extrabold shadow-lg shadow-white/5'
                    : 'bg-slate-900/40 text-slate-400 border border-white/5 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                {isEn ? 'All Tracks' : '전체 보기'}
              </button>
              {tracks.map((t) => {
                const IconComponent = t.icon;
                const isActive = activeTrackId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTrackId(t.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950 font-extrabold shadow-lg shadow-cyan-400/10'
                        : 'bg-slate-900/40 text-slate-400 border border-white/5 hover:text-white hover:bg-slate-900/80'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{isEn ? t.titleEn.split('. ')[1] : t.title.split('. ')[1]}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Tracks rendering */}
        <div className="space-y-16">
          {filteredTracks.map((track) => {
            const TrackIcon = track.icon;
            return (
              <motion.div
                key={track.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-left"
              >
                {/* Track Title banner */}
                <div className="p-4 rounded-2xl bg-slate-900/30 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${track.colorClass}`}>
                      <TrackIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-tight">
                        {isEn ? track.titleEn : track.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isEn ? track.descriptionEn : track.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 font-extrabold tracking-widest uppercase bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5 self-start md:self-auto">
                    {track.items.length} {isEn ? 'Domains Active' : '개의 사업영역 활성'}
                  </div>
                </div>

                {/* Full-width alternating items listing (좌우 전체 면적을 사용하여 교차 정렬) */}
                <div className="space-y-12 mt-8">
                  {track.items.map((item, itemIdx) => {
                    const ItemIcon = item.icon;
                    const imageUrl = customImages[item.id] || getDefaultImage(item.id);
                    const isEven = itemIdx % 2 === 0;

                    // Accent styling
                    const colorClasses: Record<string, { border: string, text: string, bg: string, glow: string }> = {
                      cyan: {
                        border: 'border-cyan-500/20',
                        text: 'text-cyan-400',
                        bg: 'bg-cyan-500/10',
                        glow: 'shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                      },
                      purple: {
                        border: 'border-purple-500/20',
                        text: 'text-purple-400',
                        bg: 'bg-purple-500/10',
                        glow: 'shadow-[0_0_20px_rgba(192,132,252,0.1)]'
                      },
                      emerald: {
                        border: 'border-emerald-500/20',
                        text: 'text-emerald-400',
                        bg: 'bg-emerald-500/10',
                        glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]'
                      },
                      amber: {
                        border: 'border-amber-500/20',
                        text: 'text-amber-400',
                        bg: 'bg-amber-500/10',
                        glow: 'shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                      }
                    };

                    const activeStyle = colorClasses[item.color] || colorClasses.cyan;

                    return (
                      <div
                        key={item.id}
                        className="w-full bg-slate-900/40 border border-white/5 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-white/10 relative overflow-hidden group"
                      >
                        {/* Subtle grid background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                          {/* Text Section */}
                          <div className={`space-y-6 text-left ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                            <div className="flex items-center gap-3">
                              <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg border ${activeStyle.border} ${activeStyle.text} ${activeStyle.bg}`}>
                                NO. {item.num}
                              </span>
                              <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5 text-slate-400">
                                <ItemIcon className="w-4 h-4" />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                                {isEn ? item.titleEn : item.title}
                              </h4>
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {isEn ? item.descriptionEn : item.description}
                              </p>
                            </div>

                            {/* Keywords list */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {item.keywords.map((kw, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[10px] font-mono font-bold px-3 py-1 rounded-md border ${activeStyle.border} ${activeStyle.bg} ${activeStyle.text}`}
                                >
                                  #{kw}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Image Section with Admin capability */}
                          <div className={`order-2 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                            <div className={`relative h-[240px] sm:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center ${activeStyle.glow}`}>
                              <img
                                src={imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />

                              {/* Admin overlay control bar */}
                              {isAdminMode && (
                                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <Sliders className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
                                  <span className="text-xs font-black text-white uppercase tracking-widest block mb-1">
                                    {isEn ? "Master/Admin Image Console" : "마스터/관리자 실물사진 제어부"}
                                  </span>
                                  <p className="text-[10px] text-slate-400 mb-4 max-w-xs leading-normal">
                                    {isEn 
                                      ? "Upload a high-fidelity front photo for this business domain." 
                                      : "본 사업영역의 고품격 실물 전면 사진을 등록하거나 원본 복원할 수 있습니다."}
                                  </p>

                                  {/* Guidelines Section */}
                                  <div className="w-full max-w-xs bg-slate-900/60 border border-white/5 rounded-xl p-3 mb-4 space-y-1.5 text-left text-[10px] text-slate-300">
                                    <div className="font-bold text-cyan-400 border-b border-white/5 pb-1">
                                      {isEn ? "Image Upload Specifications" : "이미지 업로드 가이드라인"}
                                    </div>
                                    <div>
                                      <span className="text-slate-500 font-bold mr-1">• {isEn ? "Formats:" : "지원 포맷:"}</span>
                                      <span className="font-mono text-white">JPG, PNG, WEBP, GIF</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500 font-bold mr-1">• {isEn ? "Resolution:" : "권장 사이즈:"}</span>
                                      <span className="font-mono text-white">{isEn ? "800x600 px or higher (4:3 / 16:9)" : "800x600 px 이상 (4:3 또는 16:9 비율)"}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500 font-bold mr-1">• {isEn ? "File Size:" : "파일 크기:"}</span>
                                      <span className="text-emerald-400 font-medium">{isEn ? "Up to 10MB (Auto compressed on upload)" : "최대 10MB (업로드 시 자동 압축 및 초고속 최적화)"}</span>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap items-center justify-center gap-2">
                                    <label className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-[11px] font-black cursor-pointer flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20">
                                      <Upload className="w-3.5 h-3.5" />
                                      {isEn ? "Upload Photo" : "사진 등록/수정"}
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(item.id, e)}
                                      />
                                    </label>

                                    {customImages[item.id] && (
                                      <button
                                        onClick={() => handleImageDelete(item.id)}
                                        className="px-3.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-[11px] font-black flex items-center gap-1.5 transition-all"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        {isEn ? "Restore Default" : "원본 복원"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Advanced Far-Infrared technology and applications */}
      <section className="py-24 border-t border-white/5 bg-slate-900/20 relative overflow-hidden">
        {/* Dynamic technology grids in background */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Technology Intro */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs text-cyan-400 font-mono tracking-wider">
                <Sparkle className="w-3.5 h-3.5 text-cyan-400" /> SAM MOLECULAR PHYSICS
              </div>
              
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                {isEn 
                  ? 'SAM Far-Infrared Radiation & Next-Gen Core Applications' 
                  : 'SAM 신소재의 원적외선 방사 기술 및 응용 산업'}
              </h2>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 space-y-4">
                <h4 className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  {isEn ? 'Molecular Resonance Technology' : 'SAM 분자 진동을 통한 고효율 원적외선 방사'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isEn
                    ? 'Our proprietary CAS-registered SAM new material generates highly concentrated, efficient far-infrared energy even at room temperature. This is driven by spontaneous self-arrangement and thermal molecular excitation within an ultra-thin nanometer structure. It induces bio-resonant water molecular vibration to expand blood micro-vessels and assists cell activation. In devices, it serves as a core smart material by transforming heat into far-infrared wavelengths for accelerated heat radiation.'
                    : '당사의 CAS 등록 SAM 신물질은 나노미터(nm) 단위의 초박막 구조 내에서 분자 간의 자발적 배열과 열운동을 통해 상온에서도 극대화된 원적외선 에너지를 방사합니다. 세포 내 수분 분자를 공명 진동시켜 미세혈관 확장 및 세포 활성화를 돕고, 전자·기기 장치에서는 열에너지를 원적외선 형태의 전자파로 바꾸어 외부로 빠르게 방출하는 "차세대 방열/바이오 기능성 소재"입니다.'}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] text-slate-500 font-mono italic">
                    * {isEn ? 'Registered under authorized CAS chemistry database.' : '본 기술은 정식 인가된 미국 CAS 화학 등록 데이터베이스에 기초합니다.'}
                  </span>
                </div>
              </div>

              {/* Animated Infrared Wave Simulator (Visual decoration) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/20 to-orange-950/15 border border-red-500/20 relative overflow-hidden">
                <div className="absolute right-3 top-3 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 font-mono text-[9px] text-red-400 font-bold tracking-wider uppercase animate-pulse">
                  {isEn ? 'LIVE SPECTRUM' : '실시간 분자 스펙트럼'}
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-red-400">EMISSIVITY SIMULATION (방사율 92.4% 상온 검증)</span>
                  <div className="flex items-end gap-1.5 h-10 pt-2">
                    {[35, 60, 45, 80, 50, 95, 75, 40, 65, 90, 55, 30, 70, 85, 40].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-red-600 via-orange-500 to-amber-400 rounded-sm"
                        animate={{ height: [`${h - 20}%`, `${h}%`, `${h - 20}%`] }}
                        transition={{
                          duration: 1.2 + i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: 3 Interactive Applications list */}
            <div className="lg:col-span-7 text-left space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {isEn ? 'CORE FOCUS INDUSTRIES (3 APPLICATIONS)' : '3대 고부가가치 응용 산업'}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {isEn ? 'Click each to expand' : '각 영역을 클릭하여 세부 기술 파악'}
                </span>
              </div>

              <div className="space-y-4">
                {firApplications.map((app, idx) => {
                  const isActive = activeFirApp === idx;
                  return (
                    <div
                      key={app.id}
                      onClick={() => setActiveFirApp(idx)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group ${
                        isActive 
                          ? `bg-slate-900/60 border-white/10 shadow-xl shadow-slate-950/50` 
                          : 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/20'
                      }`}
                    >
                      {/* Active indicator bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                        isActive 
                          ? idx === 0 ? 'bg-orange-500' : idx === 1 ? 'bg-cyan-400' : 'bg-indigo-500' 
                          : 'bg-transparent'
                      }`} />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-mono font-bold ${
                              isActive
                                ? idx === 0 ? 'text-orange-400' : idx === 1 ? 'text-cyan-300' : 'text-indigo-400'
                                : 'text-slate-500'
                            }`}>
                              APPLICATION 0{idx + 1}
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 text-slate-600 transition-transform ${isActive ? 'rotate-90 text-cyan-400' : 'group-hover:translate-x-0.5'}`} />
                          </div>
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {isEn ? app.titleEn : app.title}
                          </h3>
                        </div>

                        {/* Concept visual tags */}
                        <div className="flex gap-1">
                          {app.keywords.slice(0, 1).map((kw, i) => (
                            <span 
                              key={i}
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-white/10 ${
                                isActive ? 'text-white border-white/20' : 'text-slate-500'
                              }`}
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expandable Content Container */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-4 pt-4 border-t border-white/5"
                          >
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {isEn ? app.descEn : app.desc}
                            </p>

                            {/* Keywords badging */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {app.keywords.map((kw, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-400/20 px-2.5 py-1 rounded-md"
                                >
                                  #{kw}
                                </span>
                              ))}
                            </div>

                            {/* Dynamic simulated graphic depending on the selected concept */}
                            {app.imageConcept === 'thermal' && (
                              <div className="h-28 rounded-xl bg-gradient-to-r from-red-950/40 via-orange-950/30 to-slate-950 border border-orange-500/10 flex items-center justify-between p-4 relative overflow-hidden">
                                <div className="space-y-1 z-10">
                                  <span className="text-[10px] font-mono text-orange-400 font-bold block">HEAT GRADIENT DE-CONGESTION</span>
                                  <p className="text-[9px] text-slate-400 max-w-xs">{isEn ? 'Heat waves transformed into infrared electromagnetic spectrum' : '배터리 팩 표면 열량이 무부피 상태에서 원적외선 전자파로 자발 복사 방출'}</p>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-500/10 to-transparent flex items-center justify-end pr-4">
                                  <Thermometer className="w-8 h-8 text-orange-500 animate-pulse" />
                                </div>
                              </div>
                            )}

                            {app.imageConcept === 'bio' && (
                              <div className="h-28 rounded-xl bg-gradient-to-r from-cyan-950/40 via-emerald-950/30 to-slate-950 border border-cyan-500/10 flex items-center justify-between p-4 relative overflow-hidden">
                                <div className="space-y-1 z-10">
                                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">BIO-RESONANT CIRCULATION WAVES</span>
                                  <p className="text-[9px] text-slate-400 max-w-xs">{isEn ? 'Frequencies trigger safe subcutaneous resonant microcirculation' : '세포 생체 적합 물질이 공명 마이크로 혈류 증진 유도'}</p>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent flex items-center justify-end pr-4">
                                  <HeartPulse className="w-8 h-8 text-cyan-400 animate-pulse" />
                                </div>
                              </div>
                            )}

                            {app.imageConcept === 'textile' && (
                              <div className="h-28 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950 border border-indigo-500/10 flex items-center justify-between p-4 relative overflow-hidden">
                                <div className="space-y-1 z-10">
                                  <span className="text-[10px] font-mono text-indigo-400 font-bold block">THERMAL CAPTURE & RETURN MESH</span>
                                  <p className="text-[9px] text-slate-400 max-w-xs">{isEn ? 'Functional yarn reflecting natural radiated energy back securely' : '입고 자는 것만으로 미세혈관 자극 및 피로 회복 유도'}</p>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent flex items-center justify-end pr-4">
                                  <Layers className="w-8 h-8 text-indigo-400 animate-pulse" />
                                </div>
                              </div>
                            )}

                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
