import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, FileText, Newspaper, Calendar, ArrowRight, Play, ExternalLink, Award, Search, Sparkles, Image as ImageIcon,
  Plus, Edit2, Trash2, Lock, ShieldCheck, Check, X, AlertCircle, ShieldAlert
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

export interface VideoItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  videoUrl: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'vid-default-1',
    title: '(주)MOASD 친환경 스마트 마이크로 그리드 종합 홍보',
    titleEn: 'Sustainable Hybrid Smart Micro-Grid Assembly',
    description: '대표적인 스마트 파워 제너레이터 HGE3D00의 자동화 공정, 친환경 모빌리티 섀시 매팅 기술, 고탄도 분자 소재(SAM)를 주축으로 한 차세대 에너지 그리드 허브의 핵심 성과를 집대성한 공식 미디어입니다.',
    descriptionEn: 'This presentation traces the integration path of (주)MOASD high-tech assembly lines including smart generators HGE3D00, carbon-free mobility chassis systems, SAM nano materials and our green tower headquarters.',
    videoUrl: 'https://youtu.be/yqgMhS6hdcE'
  },
  {
    id: 'vid-default-2',
    title: '(주)MOASD 차세대 친환경 소형 그리드 하이브리드 배전 설비 가동 개시',
    titleEn: 'MOASD Next-Gen Eco Hybrid Small-Scale Grid Systems',
    description: '안산 글로벌 메인 스마트 팩토리에서 자율 스마트 시티 전력 수요를 한 치의 오차 없이 충족하는 스마트 파워 제넥스 시스템 가동 동영상입니다.',
    descriptionEn: 'A detailed vision showcasing the deployment of our eco-friendly small-scale energy grids designed for smart municipal demands.',
    videoUrl: 'https://www.youtube.com/watch?v=UC8dv8s2z7A'
  }
];

export const MediaCenter: React.FC<{ language: 'ko' | 'en' }> = ({ language }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Master mode states
  const [isMaster, setIsMaster] = useState<boolean>(false);
  const [masterPasswordInput, setMasterPasswordInput] = useState<string>('');
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Video creation/editing modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  // Form values
  const [formTitle, setFormTitle] = useState<string>('');
  const [formTitleEn, setFormTitleEn] = useState<string>('');
  const [formDesc, setFormDesc] = useState<string>('');
  const [formDescEn, setFormDescEn] = useState<string>('');
  const [formUrl, setFormUrl] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const getYoutubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getThumbnailUrl = (url: string): string => {
    const yId = getYoutubeId(url);
    if (yId) {
      return `https://img.youtube.com/vi/${yId}/hqdefault.jpg`;
    }
    return bgGenerator;
  };

  const checkIsMaster = (): boolean => {
    // 1. Check moasd_partner_user
    const partnerUserStr = localStorage.getItem('moasd_partner_user');
    if (partnerUserStr) {
      try {
        const u = JSON.parse(partnerUserStr);
        if (u.email === 'sinhwaensol@gmail.com' || u.name?.includes('장세창') || u.email === 'master') {
          return true;
        }
      } catch (e) {}
    }
    
    // 2. Check moasd_admin_session
    const adminSessionStr = sessionStorage.getItem('moasd_admin_session');
    if (adminSessionStr) {
      try {
        const a = JSON.parse(adminSessionStr);
        if (a.roleLabel === 'S' || a.id === 'master-admin' || a.name?.includes('장세창')) {
          return true;
        }
      } catch (e) {}
    }
    
    return false;
  };

  useEffect(() => {
    // Sync master role
    setIsMaster(checkIsMaster());

    const syncVideos = () => {
      const stored = localStorage.getItem('moasd_media_center_videos');
      let loaded: VideoItem[] = [];
      if (stored) {
        try {
          loaded = JSON.parse(stored);
          setVideos(loaded);
        } catch (e) {
          console.error(e);
        }
      } else {
        loaded = DEFAULT_VIDEOS;
        setVideos(DEFAULT_VIDEOS);
        localStorage.setItem('moasd_media_center_videos', JSON.stringify(DEFAULT_VIDEOS));
      }
    };

    syncVideos();

    window.addEventListener('storage', syncVideos);
    const interval = setInterval(syncVideos, 1500);
    return () => {
      window.removeEventListener('storage', syncVideos);
      clearInterval(interval);
    };
  }, []);

  const handleMasterAuth = (password: string) => {
    const MASTER_ADMIN_PASS = '0815)*!%';
    if (password === MASTER_ADMIN_PASS) {
      setIsMaster(true);
      setAuthError(null);
      setShowPasswordDialog(false);
      
      const adminSession = {
        id: 'master-admin',
        name: '장세창 최고관리자',
        phone: '010-2242-7801',
        roleLabel: 'S'
      };
      sessionStorage.setItem('moasd_admin_session', JSON.stringify(adminSession));
      
      const masterUser = {
        email: 'sinhwaensol@gmail.com',
        name: '장세창 최고관리자',
        company: '(주)MOASD',
        phone: '010-2242-7801',
        regDate: new Date().toLocaleDateString(),
        role: 'partner',
        partnerCode: 'MOASD_PARTNER'
      };
      localStorage.setItem('moasd_partner_user', JSON.stringify(masterUser));
      
      alert(language === 'en' ? 'Master Admin Mode authorized successfully!' : '최고 마스터 관리자 권한이 성공적으로 해제되었습니다!');
    } else {
      setAuthError(language === 'en' ? 'Incorrect master password code.' : '마스터 전용 비밀번호가 불일치합니다.');
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMaster) {
      alert(language === 'en' ? 'Only authorized Masters can upload videos.' : '마스터 권한 외에는 영상 업로드가 불가합니다.');
      return;
    }

    if (!formTitle.trim() || !formUrl.trim()) {
      setFormError(language === 'en' ? 'Please fill in required fields.' : '영상 제목 및 비디오 주소는 필수입니다.');
      return;
    }

    if (!confirm(language === 'en' ? 'Are you sure you want to add this new video resource?' : '이 새로운 영상을 정말로 등록하시겠습니까?')) {
      return;
    }

    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title: formTitle,
      titleEn: formTitleEn || formTitle,
      description: formDesc,
      descriptionEn: formDescEn || formDesc,
      videoUrl: formUrl.trim()
    };

    const updated = [...videos, newVideo];
    setVideos(updated);
    localStorage.setItem('moasd_media_center_videos', JSON.stringify(updated));
    setSelectedVideo(newVideo);

    resetForm();
    setShowAddModal(false);
    alert(language === 'en' ? '🎉 New video added successfully!' : '🎉 새로운 영상자료가 신규 등록 완료되었습니다.');
  };

  const openEditModal = (vid: VideoItem) => {
    setEditingVideo(vid);
    setFormTitle(vid.title);
    setFormTitleEn(vid.titleEn);
    setFormDesc(vid.description);
    setFormDescEn(vid.descriptionEn);
    setFormUrl(vid.videoUrl);
    setShowEditModal(true);
  };

  const handleEditVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMaster || !editingVideo) {
      alert(language === 'en' ? 'Only authorized Masters can edit videos.' : '마스터 권한 외에는 영상 수정이 불가합니다.');
      return;
    }

    if (!formTitle.trim() || !formUrl.trim()) {
      setFormError(language === 'en' ? 'Please fill in required fields.' : '영상 제목 및 비디오 주소는 필수입니다.');
      return;
    }

    if (!confirm(language === 'en' ? 'Are you sure you want to update this video metadata?' : '이 영상 정보를 실제로 수정하시겠습니까?')) {
      return;
    }

    const updated = videos.map(vid => {
      if (vid.id === editingVideo.id) {
        return {
          ...vid,
          title: formTitle,
          titleEn: formTitleEn || formTitle,
          description: formDesc,
          descriptionEn: formDescEn || formDesc,
          videoUrl: formUrl.trim()
        };
      }
      return vid;
    });

    setVideos(updated);
    localStorage.setItem('moasd_media_center_videos', JSON.stringify(updated));

    if (selectedVideo?.id === editingVideo.id) {
      setSelectedVideo({
        id: editingVideo.id,
        title: formTitle,
        titleEn: formTitleEn || formTitle,
        description: formDesc,
        descriptionEn: formDescEn || formDesc,
        videoUrl: formUrl.trim()
      });
    }

    resetForm();
    setShowEditModal(false);
    alert(language === 'en' ? '🎉 Video updated successfully!' : '🎉 영상자료가 성공적으로 수정 완료되었습니다.');
  };

  const handleDeleteVideo = (id: string) => {
    if (!isMaster) {
      alert(language === 'en' ? 'Only authorized Masters can delete videos.' : '마스터 권한 외에는 영상 삭제가 불가합니다.');
      return;
    }

    const targetVid = videos.find(v => v.id === id);
    const titleDisp = targetVid ? (language === 'en' ? targetVid.titleEn : targetVid.title) : '';
    
    if (window.confirm(language === 'en' ? `Are you sure you want to delete "${titleDisp}"?` : `"${titleDisp}" 영상을 정말로 삭제하시겠습니까?`)) {
      const updated = videos.filter(vid => vid.id !== id);
      setVideos(updated);
      localStorage.setItem('moasd_media_center_videos', JSON.stringify(updated));

      if (selectedVideo?.id === id) {
        setSelectedVideo(updated.length > 0 ? updated[0] : null);
      }
      alert(language === 'en' ? '🎉 Video deleted successfully!' : '🎉 영상자료가 성공적으로 삭제되었습니다.');
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormTitleEn('');
    setFormDesc('');
    setFormDescEn('');
    setFormUrl('');
    setEditingVideo(null);
    setFormError(null);
  };

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-200">
              {language === 'en' ? 'Corporate Promotion Video (PR)' : '(주)MOASD 공식 홍보 영상'}
            </h3>
          </div>

          {/* Master Mode Toggle Lock */}
          <div>
            {isMaster ? (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'en' ? 'Master Mode' : '최고 관리자(마스터) 승인됨'}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMasterPasswordInput('');
                  setAuthError(null);
                  setShowPasswordDialog(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-850 border border-white/10 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer border-0"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Master Auth' : '최고 관리자 인증'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 shadow-xl relative aspect-video">
            {selectedVideo ? (
              getYoutubeId(selectedVideo.videoUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.videoUrl)}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )
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
                    {language === 'en' ? 'NO SELECTION' : '영상 자료가 없습니다'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    {language === 'en' 
                      ? 'Add a corporate video in the section below using a URL link or file source.' 
                      : '아래 영상 추가 기능을 이용하여 유튜브 링크 등을 통해 새로운 미디어를 등록해주세요.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] bg-slate-900 border border-white/5 text-cyan-400 font-bold px-2 py-0.5 rounded font-mono uppercase">
                {language === 'en' ? 'SELECTED FOOTAGE' : '엄블럭 핵심 다큐먼트'}
              </span>
              <h4 className="text-lg font-bold text-white leading-snug">
                {selectedVideo ? (language === 'en' ? selectedVideo.titleEn : selectedVideo.title) : '—'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed max-h-40 overflow-y-auto">
                {selectedVideo ? (language === 'en' ? selectedVideo.descriptionEn : selectedVideo.description) : '—'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-slate-400 font-mono">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Resolution' : '인식 등급'}</span>
                <span className="text-slate-200">Auto Ultra HD (HDR)</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Format' : '연동 규격'}</span>
                <span className="text-slate-200">
                  {selectedVideo && getYoutubeId(selectedVideo.videoUrl) ? 'YouTube Stream' : 'Direct MP4 File'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Distributor' : '소속 관할'}</span>
                <span className="text-slate-300">MOASD PR Promotion Dept</span>
              </div>
              {selectedVideo && (
                <a 
                  href={selectedVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full mt-2 py-2 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/20 rounded-lg text-[11px] font-bold text-cyan-400 transition-colors uppercase cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Open YouTube Link' : '원본 유튜브 링크로 시청'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 Video List Archive Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-200">
              {language === 'en' ? 'MOASD Media Library' : '미디어센터 동영상 리스트'}
            </h3>
          </div>

          {/* Master add video button */}
          {isMaster && (
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-400/15 active:scale-95 border-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>{language === 'en' ? 'Add Video' : '영상추가'}</span>
            </button>
          )}
        </div>

        {/* Video Archive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const isActive = selectedVideo?.id === vid.id;
            return (
              <div 
                key={vid.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between bg-slate-900/20 hover:bg-slate-900/40 hover:shadow-lg ${
                  isActive 
                    ? 'border-cyan-400 ring-1 ring-cyan-400/20 shadow-cyan-950/20' 
                    : 'border-white/5 hover:border-cyan-500/20'
                }`}
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => setSelectedVideo(vid)}
                  className="aspect-video overflow-hidden relative cursor-pointer"
                >
                  <img 
                    src={getThumbnailUrl(vid.videoUrl)} 
                    alt={vid.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                  
                  {/* Play circle overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-xl ${
                      isActive 
                        ? 'bg-cyan-400 text-slate-950 border-cyan-400 scale-105' 
                        : 'bg-slate-950/70 text-white border-white/20 group-hover:border-cyan-400 group-hover:text-cyan-400'
                    }`}>
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    {getYoutubeId(vid.videoUrl) ? (
                      <span className="text-[9px] tracking-wider font-mono font-bold bg-red-600/90 text-white px-2 py-0.5 rounded shadow-sm">
                        YOUTUBE
                      </span>
                    ) : (
                      <span className="text-[9px] tracking-wider font-mono font-bold bg-cyan-600/90 text-white px-2 py-0.5 rounded shadow-sm">
                        DIRECT
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h4 
                      onClick={() => setSelectedVideo(vid)}
                      className={`text-sm font-bold tracking-tight cursor-pointer line-clamp-1 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                      }`}
                    >
                      {language === 'en' ? vid.titleEn : vid.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal line-clamp-2 h-8">
                      {language === 'en' ? vid.descriptionEn : vid.description}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <a 
                      href={vid.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-cyan-400 rounded-md text-[10px] font-mono transition-colors border-0 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{language === 'en' ? 'YOUTUBE' : '유튜브 시청'}</span>
                    </a>

                    {/* Master Operations */}
                    {isMaster && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(vid)}
                          className="p-1 px-2 rounded hover:bg-white/5 text-slate-400 hover:text-cyan-400 transition-colors text-[11px] font-bold flex items-center gap-1 cursor-pointer border-0"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>{language === 'en' ? 'Edit' : '수정'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="p-1 px-2 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors text-[11px] font-bold flex items-center gap-1 cursor-pointer border-0"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{language === 'en' ? 'Delete' : '삭제'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Master Password Verification Dialog */}
      <AnimatePresence>
        {showPasswordDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Lock className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">
                    {language === 'en' ? 'Master Admin Verification' : '최고 관리자 마스터 권한 인증'}
                  </h4>
                </div>
                <button 
                  onClick={() => setShowPasswordDialog(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'en' 
                  ? 'Please enter the master administrator password to unlock upload, edit, and deletion privileges.' 
                  : '미디어센터 영상 업로드 및 수정/삭제 권한을 활성화하기 위해 최고 관리자 비밀번호를 입력해주십시오.'}
              </p>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleMasterAuth(masterPasswordInput);
              }} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    {language === 'en' ? 'Master Passcode' : '최고 관리자 암호'}
                  </label>
                  <input
                    type="password"
                    value={masterPasswordInput}
                    onChange={(e) => setMasterPasswordInput(e.target.value)}
                    placeholder={language === 'en' ? 'Enter master code' : '비밀번호를 입력하세요 (0815)*!% )'}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors text-xs font-mono"
                    autoFocus
                  />
                </div>

                {authError && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordDialog(false)}
                    className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer border-0"
                  >
                    {language === 'en' ? 'Cancel' : '취소'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-400/10 cursor-pointer border-0"
                  >
                    {language === 'en' ? 'Authorize' : '인증하기'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Video Form Modals */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Video className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">
                    {showAddModal 
                      ? (language === 'en' ? 'Add Video Link' : '새로운 미디어 영상 추가') 
                      : (language === 'en' ? 'Edit Video Details' : '미디어 영상 정보 수정')
                    }
                  </h4>
                </div>
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={showAddModal ? handleAddVideo : handleEditVideo} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title KO */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300">
                      {language === 'en' ? 'Video Title (KO) *' : '영상 제목 (한국어) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="예: (주)MOASD 홍보 영상"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors text-xs"
                    />
                  </div>

                  {/* Title EN */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300">
                      {language === 'en' ? 'Video Title (EN)' : '영상 제목 (영어)'}
                    </label>
                    <input
                      type="text"
                      value={formTitleEn}
                      onChange={(e) => setFormTitleEn(e.target.value)}
                      placeholder="e.g. MOASD Promo Video"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors text-xs"
                    />
                  </div>
                </div>

                {/* Video URL */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {language === 'en' ? 'Video URL / YouTube Link *' : '비디오 링크 / 유튜브 URL *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://youtu.be/yqgMhS6hdcE"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-400">
                    {language === 'en' 
                      ? 'Input YouTube URLs (e.g. https://youtu.be/...) or direct streaming .mp4 links.' 
                      : '유튜브 링크(예: https://youtu.be/...) 또는 직접 재생 가능한 .mp4 미디어 주소'}
                  </p>
                </div>

                {/* Description KO */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {language === 'en' ? 'Description (KO)' : '영상 설명 (한국어)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="한국어 설명 문구를 적어주세요."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors text-xs resize-none"
                  />
                </div>

                {/* Description EN */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {language === 'en' ? 'Description (EN)' : '영상 설명 (영어)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formDescEn}
                    onChange={(e) => setFormDescEn(e.target.value)}
                    placeholder="English description sentence."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors text-xs resize-none"
                  />
                </div>

                {formError && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer border-0"
                  >
                    {language === 'en' ? 'Cancel' : '취소'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-400/10 cursor-pointer border-0"
                  >
                    {language === 'en' ? 'Save Video' : '저장하기'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


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
