import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, FileText, Newspaper, Calendar, ArrowRight, Play, ExternalLink, Award, Search, Sparkles, Image as ImageIcon
} from 'lucide-react';

import bgSkyscraper from '../assets/images/moasd_skyscraper_hq_bg_1781618333946.jpg';
import bgGenerator from '../assets/images/hge3d00_generator_1781622900745.jpg';
import bgEvMoto from '../assets/images/ev_moto_assembly_1781624859000.jpg';
import bgMaterialLab from '../assets/images/sam_material_lab_1781624876856.jpg';

interface PressRelease {
  id: string;
  tag: string;
  tagEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  date: string;
  readTime: string;
  category: 'Grid' | 'Material' | 'Global' | 'ESG';
}

const PRESS_RELEASES: PressRelease[] = [
  {
    id: 'pr-1',
    tag: '초고압 송전 시스템',
    tagEn: 'UHV Transmission',
    title: '(주)MOASD, 차세대 친환경 소형 그리드 하이브리드 배전 설비 가동 개시',
    titleEn: 'MOASD Officially Deploys Next-Gen Eco Hybrid Small-Scale Grid Systems',
    summary: '안산 글로벌 메인 스마트 팩토리에서 자율 스마트 시티 전력 수요를 한 치의 오차 없이 충족하는 스마트 파워 제넥스 시스템 및 HGE3D00 설비가 정식 가동에 돌입하며 아시아 전역 에너지 혁신을 선도합니다.',
    summaryEn: 'The intelligent power Genex system and HGE3D00 micro-grid production line at our main smart plant are fully operational, marking a watershed moment in green energy transmission across Asia.',
    date: '2026.06.18',
    readTime: '3 min read',
    category: 'Grid'
  },
  {
    id: 'pr-2',
    tag: '신소재 테크',
    tagEn: 'Advanced Materials',
    title: '신소재 연구원, 고탄력 극전도성 SAM(Super Activity Material) 분자 배열 완성',
    titleEn: 'R&D Lab Completes High-Performance Polymeric Alignment of SAM Technology',
    summary: '초전도 나노 레이어를 적층 결합하는 신기술 공정을 통해 대용량 수퍼커패시터 코전송 효율을 무려 45% 향상시키는 획기적인 고전도 신규 입자 배열을 시뮬레이션을 통해 확보했습니다.',
    summaryEn: 'By laminating superconductive nano-layers, our central molecular laboratory achieved an additional 45% savings in transmission dissipation, optimizing future multi-grid capacitors.',
    date: '2026.05.29',
    readTime: '5 min read',
    category: 'Material'
  },
  {
    id: 'pr-3',
    tag: '글로벌 제휴',
    tagEn: 'Global Alliances',
    title: '유럽 친환경 친환경 에너지 보증 이사회(EEAB) 특별 실사 위원단, (주)MOASD 본사 방문',
    titleEn: 'European Green Energy Board Delegations Complete Official Inspection at HQ',
    summary: '자율 스마트 주행 EV 지상 수송 섀시 공정 및 빌딩 인프레이션 마이크로 그리드 정밀 솔루션을 참관하며 서구권 공동 탄소중립 기준점 부합성 현장 정합 인증을 무결점으로 통과하였습니다.',
    summaryEn: 'European Union technical inspectors praised our zero-carbon scooter layout and digital twins system, completing compliance protocols for western export routes.',
    date: '2026.04.14',
    readTime: '4 min read',
    category: 'Global'
  },
  {
    id: 'pr-4',
    tag: 'ESG 지속 미래',
    tagEn: 'ESG Sustainability',
    title: '(주)MOASD 기술 본부, 2026 탄소 배출 저감 선도 최우수 기업 공헌 대상 수여',
    titleEn: 'MOASD Wins National Grand Prize for Zero-Emission Technology & ESG Leadership',
    summary: '스마트 빌딩 자가 열분배 통제 제어 융합 및 보조 하이브리드 발전을 연동하여 팩토리 가동으로 배출되는 열역학적 잉여 온실 가스를 완벽에 가깝게 냉각수 순환 전력으로 재변환한 공로를 인정받았습니다.',
    summaryEn: 'Our proprietary heat-recovery integration technology, converting factory waste thermal output into loop cooling energy, earned top ESG honors from national standard offices.',
    date: '2026.03.22',
    readTime: '4 min read',
    category: 'ESG'
  }
];

const GALLERY_IMAGES = [
  {
    src: bgSkyscraper,
    title: 'MOASD 친환경 스마트 타워 본사',
    titleEn: 'MOASD Headquarters Smart Tower',
    desc: '제로 시티 복합 그리드를 지휘하는 통합 정보 관제탑'
  },
  {
    src: bgGenerator,
    title: 'HGE3D00 스마트 동력 발전 자동 공정',
    titleEn: 'HGE3D00 Generator Robot Assembly Line',
    desc: '차세대 인공지능 로봇 암 초정밀 배선 처리 공정'
  },
  {
    src: bgEvMoto,
    title: '스마트 대용량 EV 모빌리티 제작실',
    titleEn: 'Zero-Carbon EV Assembly Workspace',
    desc: '이륜 구동 수송 장치 초소형 조립 및 모듈 통합 섀시 정합'
  },
  {
    src: bgMaterialLab,
    title: 'SAM 신소재 입자 결정 분석실',
    titleEn: 'SAM Laboratory (Super Activity Material)',
    desc: '분자 구조 레이아웃 시뮬레이션 및 초고성능 슈퍼커패시터 개발'
  }
];

const DB_NAME = 'moasd-hero-video-db';
const STORE_NAME = 'video-store';

export const MediaCenter: React.FC<{ language: 'ko' | 'en' }> = ({ language }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const checkServerVideo = () => {
      // Use the statically deployed video in the public folder as the primary video source
      setVideoUrl('/video.mp4');
    };

    // Attempt to load background video from indexedDB to allow viewing here too
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (db.objectStoreNames.contains(STORE_NAME)) {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const getReq = store.get('hero-video');
        getReq.onsuccess = () => {
          const file = getReq.result as File | undefined;
          if (file) {
            setVideoUrl(URL.createObjectURL(file));
          } else {
            checkServerVideo();
          }
        };
        getReq.onerror = () => {
          checkServerVideo();
        };
      } else {
        checkServerVideo();
      }
    };
    request.onerror = () => {
      checkServerVideo();
    };
  }, []);

  const filteredReleases = PRESS_RELEASES.filter(pr => {
    const matchesFilter = filter === 'All' || pr.category === filter;
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = (language === 'ko' ? pr.title : pr.titleEn).toLowerCase().includes(searchLower);
    const summaryMatch = (language === 'ko' ? pr.summary : pr.summaryEn).toLowerCase().includes(searchLower);
    const tagMatch = (language === 'ko' ? pr.tag : pr.tagEn).toLowerCase().includes(searchLower);
    return matchesFilter && (titleMatch || summaryMatch || tagMatch);
  });

  return (
    <div id="media-center-page" className="text-left py-12 px-6 max-w-7xl mx-auto space-y-16 select-text">
      {/* 1. Header Typography */}
      <div className="border-b border-white/5 pb-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          {language === 'en' ? 'MOASD PRESS & NEWS' : '미디어센터 소식망'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {language === 'en' ? 'MOASD Media Center' : '(주)MOASD 미디어센터'}
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          {language === 'en' 
            ? 'Access our latest technology disclosures, officially approved press publications, and virtual footage of our global sustainable power developments.' 
            : '(주)MOASD의 최첨대 전력 설계 단행, 신소재 분석, 공인 대외 언론 발표 정보 및 글로벌 미래 기후 기술 혁신 현장의 생생한 소식을 투명하게 공개합니다.'}
        </p>
      </div>

      {/* 2. Video Player Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-slate-200">
            {language === 'en' ? 'Corporate Promotion Video (PR)' : '(주)MOASD 공식 홍보 영상'}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 shadow-xl relative aspect-video">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                muted
                onError={() => {
                  console.warn("MediaCenter video load failed. Falling back to guide view.");
                  setVideoUrl(null);
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                  <img 
                    src={bgMaterialLab} 
                    className="w-full h-full object-cover filter blur-sm" 
                    alt="HQ Cover" 
                  />
                  <div className="absolute inset-0 bg-slate-950/70" />
                </div>
                <div className="relative z-10 space-y-4 max-w-md">
                  <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mx-auto">
                    <Video className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    {language === 'en' ? 'SATELLITE PR FOOTAGE ON STANDBY' : '대화창에 전달해주신 기업 비디오 연동 가능'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    {language === 'en' 
                      ? 'You can drag and drop your corporate video directly onto the main visual hero section above! Once registered, it plays here as your customized main loop.' 
                      : '메인 상하단 화면의 비디오 배경 제어 영역에 드래그하여 업로드하신 (주)MOASD 공식 영상을 이 미디어 플레이어에서도 실시간 연계하여 시청 및 제어할 수 있습니다.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] bg-slate-900 border border-white/5 text-cyan-400 font-bold px-2 py-0.5 rounded font-mono uppercase">
                {language === 'en' ? 'FEATURED FOOTAGE' : '엄블럭 핵심 다큐먼트'}
              </span>
              <h4 className="text-lg font-bold text-white leading-snug">
                {language === 'en' 
                  ? 'Sustainable Hybrid Smart Micro-Grid Assembly'
                  : '(주)MOASD 친환경 스마트 마이크로 그리드 종합 홍보'
                }
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'This presentation traces the integration path of (주)MOASD high-tech assembly lines including smart generators HGE3D00, carbon-free mobility chassis systems, SAM nano materials and our green tower headquarters.'
                  : '본 비디오자료는 (주)MOASD의 대표적인 스마트 파워 제너레이터 HGE3D00의 자동화 공정, 친환경 모빌리티 섀시 매팅 기술, 고탄도 분자 소재(SAM)를 주축으로 한 차세대 에너지 그리드 허브의 핵심 성과를 집대성한 공식 미디어입니다.'
                }
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-slate-400 font-mono">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Resolution' : '인식 등급'}</span>
                <span className="text-slate-200">Auto Ultra HD (HDR)</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Production Date' : '최종 납품일'}</span>
                <span className="text-slate-200">2026.06.22</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Distributor' : '소속 관할'}</span>
                <span className="text-slate-300">MOASD PR Promotion Dept</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Press Releases Section with Filter and Search */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-200">
              {language === 'en' ? 'Press Releases & Bulletins' : '언론 보도 및 학술 자료'}
            </h3>
          </div>

          {/* Search Bar and Category Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search releases...' : '보도자료 검색...'}
                className="w-full sm:w-60 px-3 pl-8 py-1.5 text-xs rounded-lg bg-slate-900 border border-white/5 text-slate-200 focus:outline-none focus:border-cyan-400 transition-all font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            <div className="flex gap-1.5 bg-slate-900/60 p-1 border border-white/5 rounded-lg text-[10px] font-bold font-mono">
              {['All', 'Grid', 'Material', 'Global', 'ESG'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2.5 py-1 rounded cursor-pointer transition-all ${
                    filter === cat 
                      ? 'bg-cyan-400 text-slate-950 font-extrabold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Press Releases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReleases.map((pr) => (
              <motion.article
                key={pr.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-lg group shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/30">
                      {language === 'en' ? pr.tagEn : pr.tag}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {pr.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors leading-snug">
                    {language === 'en' ? pr.titleEn : pr.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {language === 'en' ? pr.summaryEn : pr.summary}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-white/5 text-[11px] font-mono text-slate-500">
                  <span>{pr.readTime}</span>
                  <div className="flex items-center text-cyan-400 font-bold hover:underline cursor-pointer gap-1">
                    <span>{language === 'en' ? 'Read Document' : '전체 텍스트 보기'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Laboratory Gallery Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-slate-200">
            {language === 'en' ? 'Factory & Laboratory Photo Archival' : '(주)MOASD 공식 실사 화보 및 연구원 갤러리'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden border border-white/5 bg-slate-900/30 hover:border-cyan-500/20 transition-all duration-300 flex flex-col group hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-white tracking-tight">
                  {language === 'en' ? img.titleEn : img.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
