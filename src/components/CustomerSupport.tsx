import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, HelpCircle, Lock, Unlock, Plus, Trash2, Calendar, FileText, User, ChevronDown, ChevronUp, AlertCircle, Check, Send, Sparkles, Key, ShieldAlert
} from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  author: string;
  authorEn: string;
  date: string;
  isPinned: boolean;
}

interface Inquiry {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  date: string;
  isPrivate: boolean; // default true as mandated
  answers?: {
    author: string;
    content: string;
    date: string;
  }[];
}

const DEFAULT_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: '[(주)MOASD 공식] 고전압 하이브리드 배전 설비 HGE3D00 정식 취급 설명서 공람',
    titleEn: '[(주)MOASD Official] HGE3D00 Smart Power Distribution Manual Release',
    content: '당사에서 생산하는 초정밀 배전 모듈 HGE3D00 솔루션의 안전 가동 지침 및 로봇공학 그리드 정비 관련 2차 승인 기술 문서를 전력 배전 실사 부서 대상으로 정식 배포합니다. 자세한 사항은 스마트 팩토리 대시보드를 방문하여 주십시오.',
    contentEn: 'We officially deliver the safe operation guidelines and robotic grid maintenance specs of HGE3D00 modules. For detailed blueprints, please consult our smart factory control board.',
    author: '안전관제기술팀',
    authorEn: 'Safety Control Dept',
    date: '2026.06.20',
    isPinned: true
  },
  {
    id: 'notice-2',
    title: '[(주)MOASD 공지] 글로벌 R&D 환경 실사 전 연구원 보도보안 서약 실시의 건',
    titleEn: '[(주)MOASD Notice] Pre-Security Vow for Global SAM Laboratory Site Inspection',
    content: 'SAM 신소재 시뮬레이터 및 고전도 축전 구조물 융합 레이어를 보존하기 위하여, 본사 사옥 5층 실험실 출입 협력업체 정기 실사단 보안 패스 카드 발급용 사전 서약을 진행하여 주시기 바랍니다.',
    contentEn: 'To protect the SAM superconductive layers, we coordinate mandatory pre-clearance procedures for delegates visiting R&D clean rooms. Please verify registration details.',
    author: '최고경영자국 (S)',
    authorEn: 'Founder Office (S)',
    date: '2026.06.15',
    isPinned: true
  },
  {
    id: 'notice-3',
    title: '[안내] 메인 화면 대용량 기업 동영상 적용 지원 안내 (IndexedDB)',
    titleEn: '[Guide] Main Visual Cinematic MP4 Video Playback Support',
    content: '이제 웹사이트 메인 비주얼에 자체 촬영하신 동영상 파일을 드래그&드롭으로 간편하게 적용할 수 있습니다. 업로드된 동영상은 브라우저 보안 샌드박스 내부(IndexedDB)에 완벽 무손실 인코딩되어 새로고침 후에도 자동 재생됩니다.',
    contentEn: 'You can drag and drop your corporate video directly on the main visual background! The file is cached locally so it persists automatically.',
    author: '서비스운영팀',
    authorEn: 'Web Operations',
    date: '2026.06.22',
    isPinned: false
  }
];

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    authorName: '김우중 상무',
    authorEmail: 'kepco_planning_hq@kebco.co.kr',
    title: 'HGE3D00 배선 어셈블리 시스템 도면 수령 가능 여부 문의드립니다.',
    content: '안녕하세요, 한국전력공사 김우중 상무입니다. 당사 시범 전력관 제차 도입 전, HGE3D00 스마트 기압 공급 라인의 CAD 도면 및 섀시 모듈 구성 기계 설계 상세 사양에 대한 공식 지원을 요청하고자 합니다.',
    date: '2026.06.18',
    isPrivate: true,
    answers: [
      {
        author: '최고 마스터',
        content: '김우중 상무님 안녕하십니까, (주)MOASD 최고 마스터 장세창 파운더입니다. 요청해주신 HGE3D00 CAD 레이아웃 도면 등 최첨대 섀시 도면은 당사 기술 제휴 부서 대외협력 담당자를 통해 암호화 처리가 완료된 문서 형태로 귀사 메일로 정식 송부 구동해 드렸습니다. 추가 기술상 정합 요청이 필요할 시 즉각 010-2242-7801로 무선 소통 주십시오.',
        date: '2026.06.19'
      }
    ]
  },
  {
    id: 'inq-2',
    authorName: '이지한 선임',
    authorEmail: 'samyang_procure@syelectric.com',
    title: 'SAM 고온 초저항 다중 축전기 주문 견적서 확인 부탁입니다.',
    content: '삼양전기공업 구매팀 이지한 선임입니다. SAM 고도 신소재를 가용한 초강력 슈퍼커패시터 실사 사양에 관한 벌크 구매를 기획중인데, 대량 공급에 대한 단가율 및 예상 공장 출하 시기가 궁금하여 글 남깁니다.',
    date: '2026.06.21',
    isPrivate: true,
    answers: []
  }
];

interface CustomerSupportProps {
  language: 'ko' | 'en';
  isSignedUp: boolean;
  registeredUser: {
    email: string;
    name: string;
    company: string;
    phone: string;
    role: 'general' | 'partner';
  } | null;
  onOpenLoginModal: () => void;
}

export const CustomerSupport: React.FC<CustomerSupportProps> = ({
  language,
  isSignedUp,
  registeredUser,
  onOpenLoginModal
}) => {
  const [subTab, setSubTab] = useState<'notices' | 'inquiries'>('notices');
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('moasd_support_notices');
    const loaded: Notice[] = saved ? JSON.parse(saved) : DEFAULT_NOTICES;
    return loaded.map(n => {
      if (n.author === '최고경영자국 (장세창)') {
        return { ...n, author: '최고경영자국 (S)', authorEn: 'Founder Office (S)' };
      }
      return n;
    });
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('moasd_support_inquiries');
    return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
  });

  // State for UI toggles
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);

  // Form states for creating Notice (Master/Admin Only)
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeTitleEn, setNewNoticeTitleEn] = useState('');
  const [newNoticeContentEn, setNewNoticeContentEn] = useState('');
  const [newNoticeIsPinned, setNewNoticeIsPinned] = useState(false);

  // Form states for creating Inquiry (Registered User Only)
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [newInqTitle, setNewInqTitle] = useState('');
  const [newInqContent, setNewInqContent] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('moasd_support_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('moasd_support_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Check if visitor is Master ('S') or Sub-Admin ('1'-'5')
  const getAdminSession = () => {
    const adminSessionStr = sessionStorage.getItem('moasd_admin_session');
    if (adminSessionStr) {
      try {
        const parsed = JSON.parse(adminSessionStr);
        if (parsed.id === 'master-admin' || parsed.name?.includes('장세창')) {
          parsed.roleLabel = 'S';
        }
        return parsed;
      } catch (e) {}
    }
    return null;
  };

  const checkIsMaster = (): boolean => {
    const adminSession = getAdminSession();
    if (adminSession && adminSession.roleLabel === 'S') {
      return true;
    }
    if (registeredUser) {
      const email = registeredUser.email.toLowerCase();
      const name = registeredUser.name;
      if (email === 'sinhwaensol@gmail.com' || email === 'master' || name?.includes('장세창')) {
        return true;
      }
    }
    return false;
  };

  const checkIsSubAdmin = (): boolean => {
    const adminSession = getAdminSession();
    // Any admin role label that is not 'S' (like '1', '2', etc) is a sub-admin
    if (adminSession && adminSession.roleLabel && adminSession.roleLabel !== 'S') {
      return true;
    }
    return false;
  };

  const isMaster = checkIsMaster();
  const isSubAdmin = checkIsSubAdmin();
  const isMasterOrAdmin = isMaster || isSubAdmin; // Either Master or Sub-Admin can manage inquiries

  // Create Notice handler (Master S only)
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMaster) {
      triggerToast(language === 'en' ? '❌ Only the Master Admin can post notices.' : '❌ 최고 마스터 관리자(S)만 공지사항을 작성할 수 있습니다.');
      return;
    }
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) {
      triggerToast(language === 'en' ? '❌ Please fill out Korean elements.' : '❌ 국문 공지사항 제목 및 내용을 반드시 기재해 주십시오.');
      return;
    }

    const nextNotice: Notice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle.trim(),
      titleEn: newNoticeTitleEn.trim() || newNoticeTitle.trim(),
      content: newNoticeContent.trim(),
      contentEn: newNoticeContentEn.trim() || newNoticeContent.trim(),
      author: language === 'en' ? 'Administrator' : '최고 관리자 (S)',
      authorEn: 'Security Admin',
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1),
      isPinned: newNoticeIsPinned
    };

    setNotices(prev => [nextNotice, ...prev]);
    setShowNoticeForm(false);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticeTitleEn('');
    setNewNoticeContentEn('');
    setNewNoticeIsPinned(false);
    triggerToast(language === 'en' ? '🎉 Public notice announced successfully!' : '🎉 새로운 공지사항이 전사 실사망에 정식 배포되었습니다.');
  };

  // Delete Notice handler
  const handleDeleteNotice = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMaster) return;
    if (confirm(language === 'en' ? 'Delete this notice?' : '해당 공지글을 즉격 삭제하시겠습니까?')) {
      setNotices(prev => prev.filter(n => n.id !== id));
      triggerToast(language === 'en' ? 'Notice deleted.' : '선택하신 공지글이 안전하게 소거되었습니다.');
    }
  };

  // Create Inquiry handler
  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedUp || !registeredUser) {
      triggerToast(language === 'en' ? '❌ Please log in or sign up first!' : '❌ 문의하기는 회원가입한 회원 전용 서비스입니다.');
      return;
    }
    if (!newInqTitle.trim() || !newInqContent.trim()) {
      triggerToast(language === 'en' ? '❌ Please fill out Title and Details.' : '❌ 문의 제목과 설명 상세를 성실히 기입해 주십시오.');
      return;
    }

    const nextInq: Inquiry = {
      id: `inq-${Date.now()}`,
      title: newInqTitle.trim(),
      content: newInqContent.trim(),
      authorName: registeredUser.name,
      authorEmail: registeredUser.email.toLowerCase(),
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1),
      isPrivate: true, // Auto locked as user required
      answers: []
    };

    setInquiries(prev => [nextInq, ...prev]);
    setShowInquiryForm(false);
    setNewInqTitle('');
    setNewInqContent('');
    triggerToast(language === 'en' ? '🎉 Security Inquiry registered successfully!' : '🎉 비밀 보안 문의사항 접수가 성공적으로 안전 처리되었습니다.');
  };

  // Answer Inquiry (Master/Admin Only)
  const handleAnswerInquiry = (inqId: string, answerText: string) => {
    if (!isMasterOrAdmin) return;
    if (!answerText.trim()) return;

    const activeAdmin = getAdminSession();
    let authorDisplay = language === 'en' ? 'Master S' : '최고 마스터 S';
    if (activeAdmin) {
      if (activeAdmin.roleLabel !== 'S') {
        authorDisplay = activeAdmin.name + (language === 'en' ? ' (Admin)' : ' (등록 관리자)');
      }
    }

    setInquiries(prev => prev.map(inq => {
      if (inq.id === inqId) {
        return {
          ...inq,
          answers: [
            ...(inq.answers || []),
            {
              author: authorDisplay,
              content: answerText.trim(),
              date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1)
            }
          ]
        };
      }
      return inq;
    }));
    triggerToast(language === 'en' ? 'Comment filed.' : '공식 기술 정합 회신이 안전 기록되었습니다.');
  };

  // Delete Inquiry (Master/Admin or Author Only)
  const handleDeleteInquiry = (id: string, inqAuthorEmail: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const visitorEmail = registeredUser?.email.toLowerCase() || '';
    const isAuthor = visitorEmail && visitorEmail === inqAuthorEmail.toLowerCase();
    
    if (!isMasterOrAdmin && !isAuthor) return;

    if (confirm(language === 'en' ? 'Delete this inquiry?' : '이 문의 내역을 영구 소결 삭제하시겠습니까?')) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      triggerToast(language === 'en' ? 'Inquiry deleted.' : '보안 문의 사항이 성공적으로 소멸 처리되었습니다.');
    }
  };

  // Privacy lock verification for clicking inquiry details
  const handleInquiryAccordionToggle = (inq: Inquiry) => {
    const visitorEmail = registeredUser?.email.toLowerCase() || '';
    const isAuthor = visitorEmail && visitorEmail === inq.authorEmail.toLowerCase();

    // Check permissions
    if (!isMasterOrAdmin && !isAuthor) {
      alert(
        language === 'en' 
          ? '🔒 This is a locked private inquiry. Access is strictly limited to the author and the system Master / Administrators.'
          : '🔒 보안 자동 잠금 장치 작동 중!\n본 문의글은 회원의 개인 정보 및 전력 자재 사양 보호를 위하여 마스터(장세창), 최고 관리자, 그리고 해당 문의를 제출하신 작성자 본인 외에는 일체 열람 및 탐색할 수 없습니다.'
      );
      return;
    }

    // Toggle logic
    setExpandedInquiryId(prev => prev === inq.id ? null : inq.id);
  };

  return (
    <div id="customer-support-component" className="py-12 px-6 max-w-7xl mx-auto space-y-10 text-left select-text">
      
      {/* 1. Design Block Title */}
      <div className="border-b border-white/5 pb-8 space-y-3 relative">
        <div className="absolute top-0 right-0 opacity-10 blur-xl w-32 h-32 bg-cyan-400 rounded-full pointer-events-none" />
        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded bg-slate-900 border border-white/5 text-[11px] font-mono tracking-widest text-slate-400 font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          {language === 'en' ? 'MOASD ASSISTANCE HUB' : '통합 고객 소통 창구'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {language === 'en' ? 'Customer Support Panel' : '(주)MOASD 고객지원 센터'}
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
          {language === 'en' 
            ? 'View official notices directly from our board, or submit confidential technical and procurement inquiries. Fully secured under extreme privacy filters.' 
            : '(주)MOASD의 중요 기획 정보 공지 및 안전 자격 안내 정보를 검색하고, 장비 주문 및 제원 상세 도면 요청을 개별 보안 접수할 수 있는 통합 소통창구인 고객지원센터입니다.'}
        </p>
      </div>

      {/* 2. Top level selector sub-tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-2">
        <button
          onClick={() => {
            setSubTab('notices');
            setExpandedNoticeId(null);
            setExpandedInquiryId(null);
          }}
          className={`flex items-center gap-2 pb-3.5 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            subTab === 'notices' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>{language === 'en' ? 'Notice Board' : '공지사항'}</span>
          <span className="text-[10px] bg-slate-900 font-mono px-1.5 py-0.5 rounded text-slate-300">
            {notices.length}
          </span>
        </button>

        <button
          onClick={() => {
            setSubTab('inquiries');
            setExpandedNoticeId(null);
            setExpandedInquiryId(null);
          }}
          className={`flex items-center gap-2 pb-3.5 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            subTab === 'inquiries' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'en' ? 'Confidential Inquiries' : '문의하기'}</span>
          <span className="text-[10px] bg-slate-900 font-mono px-1.5 py-0.5 rounded text-slate-300 animate-pulse">
            🔒 {inquiries.length}
          </span>
        </button>
      </div>

      {/* 3. Panel Container */}
      <div className="space-y-6">
        
        {/* ==================================== NOTICE BOARD ==================================== */}
        {subTab === 'notices' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
                {language === 'en' ? 'Official Press & Guidelines' : '사옥 정식 공식 게재문 및 권장 서약 지침'}
              </span>

              {/* Master notice button */}
              {isMaster && (
                <button
                  onClick={() => setShowNoticeForm(!showNoticeForm)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold font-mono transition-transform active:scale-95 cursor-pointer shadow-md shadow-cyan-950/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Write Notice' : '공지 글쓰기'}
                </button>
              )}
            </div>

            {/* Notice creation Form for Master only */}
            {showNoticeForm && isMaster && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-4"
              >
                <h4 className="text-sm font-extrabold text-cyan-400 font-mono">
                  [SYSTEM SECURE] NEW PUBLIC NOTICE GENERATOR
                </h4>
                <form onSubmit={handleCreateNotice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">공지사항 국문 제목 (필수)</label>
                      <input
                        type="text"
                        value={newNoticeTitle}
                        onChange={e => setNewNoticeTitle(e.target.value)}
                        placeholder="예: [보안 공지] 사옥 외곽 드론 제어 가이드..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">공지사항 국문 본문 (필수)</label>
                      <textarea
                        value={newNoticeContent}
                        onChange={e => setNewNoticeContent(e.target.value)}
                        placeholder="전달하고자 하는 기술 수칙 혹은 보안 실정사항 세부 사항을 조항별로 안전하게 설명하십시오."
                        className="w-full h-32 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400 resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Notice English Title (Optional)</label>
                      <input
                        type="text"
                        value={newNoticeTitleEn}
                        onChange={e => setNewNoticeTitleEn(e.target.value)}
                        placeholder="English Title Accent..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-slate-300 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Notice English Content (Optional)</label>
                      <textarea
                        value={newNoticeContentEn}
                        onChange={e => setNewNoticeContentEn(e.target.value)}
                        placeholder="Translate details of safety regulation for global delegates..."
                        className="w-full h-32 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-slate-300 focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between pt-2 border-t border-white/5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={newNoticeIsPinned}
                        onChange={e => setNewNoticeIsPinned(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-slate-900"
                      />
                      <span>📌 최상단에 고정 표시 (Pin to dynamic top)</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowNoticeForm(false)}
                        className="px-4 py-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white text-xs font-bold"
                      >
                        {language === 'en' ? 'Cancel' : '작성취소'}
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300"
                      >
                        {language === 'en' ? 'Announce' : '정식 배포'}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* List of Notices */}
            <div className="space-y-3.5">
              {notices.map((n) => {
                const isExpanded = expandedNoticeId === n.id;
                return (
                  <div
                    key={n.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      n.isPinned 
                        ? 'bg-slate-900/60 border-cyan-500/10' 
                        : 'bg-slate-900/20 border-white/5'
                    }`}
                  >
                    {/* Header trigger line */}
                    <div
                      onClick={() => setExpandedNoticeId(isExpanded ? null : n.id)}
                      className="p-5 flex justify-between items-center cursor-pointer select-none hover:bg-slate-900/40 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 max-w-[85%]">
                        {n.isPinned ? (
                          <span className="flex-shrink-0 text-[10px] font-extrabold bg-cyan-400 text-slate-950 px-2 py-0.5 rounded font-mono uppercase">
                            PIN
                          </span>
                        ) : (
                          <span className="flex-shrink-0 text-[10px] font-bold bg-slate-950 border border-white/10 text-slate-400 px-2 py-0.5 rounded font-mono">
                            INFO
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-white tracking-tight leading-tight line-clamp-1">
                          {language === 'en' ? n.titleEn : n.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono flex-shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{language === 'en' ? n.authorEn : n.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{n.date}</span>
                        </div>
                        
                        {isMaster && (
                          <button
                            onClick={(e) => handleDeleteNotice(n.id, e)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors rounded hover:bg-red-950/20"
                            title="공지 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Expandable Content Area */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-white/5 bg-slate-950/40"
                        >
                          <div className="p-6 md:p-8 space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed max-w-4xl select-text">
                            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-2.5 py-1 rounded">
                              {language === 'en' ? 'Official Declaration content' : '정식 정부 및 관제 발표 조항'}
                            </span>
                            <div className="space-y-4 whitespace-pre-wrap">
                              {language === 'en' ? n.contentEn : n.content}
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-white/5 text-[11px] text-slate-500 font-mono">
                              <span>Published by MOASD Administrative Division</span>
                              <span>Authentic Document Checksum Approved</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================== CONFIDENTIAL INQUIRIES ==================================== */}
        {subTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Disclaimer box explaining automatic private lock protection */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/10 flex items-start gap-3 text-xs leading-relaxed max-w-3xl">
              <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="font-bold text-white">🔒 1급 전력 보안 자동 잠금 서비스 (Confidential Lock Mode)</h5>
                <p className="text-slate-400">
                  {language === 'en'
                    ? 'Every question posed by members is automatically secured under private locking. Only the registered author who posted it, the Master, and system Administrators can read or reply.'
                    : '회원님께서 질문하는 사양 및 도입 견적 내용은 개인 정보 유출 및 사내 기밀 방지를 위해 자동으로 국정 1급 비밀 보안 잠금장치가 적용됩니다. 작성한 본인, 최고 마스터(장세창 파운더), 최고 관리자 본인 외에는 열람 자체가 물리적 자동 거부됩니다.'
                  }
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
                {language === 'en' ? 'Encrypted Q&A Channels' : '암호 처리된 파트너 정밀 고객 문의 현황'}
              </span>

              {/* Inquiry Action Trigger */}
              <button
                onClick={() => {
                  if (!isSignedUp) {
                    alert(language === 'en' ? 'Please log in to pose inquiries.' : '문의사항을 작성하시려면 먼저 회원가입 혹은 계정 로그인을 마쳐 주십시오.');
                    onOpenLoginModal();
                    return;
                  }
                  setShowInquiryForm(!showInquiryForm);
                }}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono transition-transform active:scale-95 cursor-pointer shadow-md shadow-cyan-950/20"
              >
                <Plus className="w-3.5 h-3.5" />
                {language === 'en' ? 'Submit Inquiry' : '보안 문의 작성'}
              </button>
            </div>

            {/* Q&A Creation Form for Registered Members */}
            {showInquiryForm && isSignedUp && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-4 max-w-3xl"
              >
                <div className="flex items-center gap-2 text-cyan-400">
                  <Lock className="w-4 h-4 animate-pulse" />
                  <h4 className="text-sm font-extrabold font-mono">
                    [PRIVACY GUARD] WRITE AUTOMATICALLY SECURED INQUIRY
                  </h4>
                </div>

                <form onSubmit={handleCreateInquiry} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">문의 제목 (자동 극비 비공개 적용)</label>
                    <input
                      type="text"
                      value={newInqTitle}
                      onChange={e => setNewInqTitle(e.target.value)}
                      placeholder="예: 자율 스마트 이륜 모빌리티 섀시 대량 특수가격 견적요청"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 font-mono">
                      Inquiry Details / 문의 내용 (작성자와 관리자만 볼 수 있음)
                    </label>
                    <textarea
                      value={newInqContent}
                      onChange={e => setNewInqContent(e.target.value)}
                      placeholder="배전 설비 인수 계약, HGE3D00 장치 배합, 혹은 기술 협약 상세에 대해 마스터에게 전하는 보안 질문을 자유롭게 서술해 주십시오. 010-2242-7801 핫라인 연계 검토 대상입니다."
                      className="w-full h-36 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400 resize-none"
                      required
                    />
                  </div>

                  {/* Inform user about current account identity */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>작성 이메일: <b className="text-slate-300">{registeredUser?.email}</b></span>
                      <span>|</span>
                      <span>신청 바이어: <b className="text-slate-300">{registeredUser?.name} ({registeredUser?.company})</b></span>
                    </div>

                    <div className="flex gap-2 self-end">
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(false)}
                        className="px-4 py-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                      >
                        {language === 'en' ? 'Cancel' : '취소'}
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300 cursor-pointer"
                      >
                        {language === 'en' ? 'Secure Submit' : '접수 및 잠금 가동'}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* List of Inquiries with Privacy checks on click */}
            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-500 border border-dashed border-white/5 rounded-2xl bg-slate-900/10">
                  <Lock className="w-6 h-6 mx-auto mb-2 opacity-45 text-slate-400" />
                  <p className="text-xs">{language === 'en' ? 'No confidential inquiries on record.' : '현재 비공개 보안 접수된 문의 내역이 존재하지 않습니다.'}</p>
                </div>
              ) : (
                inquiries.map((inq) => {
                  const isExpanded = expandedInquiryId === inq.id;
                  const visitorEmail = registeredUser?.email.toLowerCase() || '';
                  const isAuthor = visitorEmail && visitorEmail === inq.authorEmail.toLowerCase();
                  const hasAccess = isMasterOrAdmin || isAuthor;

                  return (
                    <div
                      key={inq.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-slate-900/20 ${
                        isExpanded ? 'border-cyan-400/30 bg-slate-950/10' : 'border-white/5'
                      }`}
                    >
                      {/* Inquiry line click handler */}
                      <div
                        onClick={() => handleInquiryAccordionToggle(inq)}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-slate-900/40 transition-colors gap-3 select-none"
                      >
                        <div className="flex items-center gap-2.5 max-w-[80%]">
                          {/* Locked Status badge */}
                          <div className={`p-1.5 rounded-lg flex items-center justify-center ${hasAccess ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/20' : 'bg-red-950/20 text-red-400 border border-red-950/40'}`} title="보안 잠금 장치 작동">
                            <Lock className="w-3.5 h-3.5" />
                          </div>

                          <div className="space-y-1">
                            <h4 className={`text-xs font-bold tracking-tight leading-tight line-clamp-1 ${hasAccess ? 'text-white' : 'text-slate-500 line-through'}`}>
                              {hasAccess 
                                ? inq.title 
                                : (language === 'en' ? '🔒 Locked Private Security Inquiry Content Restrained' : '🔒 [비공개 자재 문의] 작성자 및 시스템 마스터 외 일체 열람 거부')}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                              <span>발신 바이어: {inq.authorName.slice(0, 1) + '●' + inq.authorName.slice(2)} ({inq.authorEmail.slice(0, 3) + '***@***'})</span>
                              <span>|</span>
                              <span className={`font-semibold ${inq.answers && inq.answers.length > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {inq.answers && inq.answers.length > 0 ? (language === 'en' ? '● Replied' : '● 답변 완료') : (language === 'en' ? '○ Open' : '○ 답변 대기')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-mono text-slate-500 flex-shrink-0">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {inq.date}
                          </span>

                          {/* Delete capability if they are authorized */}
                          {(isMasterOrAdmin || isAuthor) && (
                            <button
                              onClick={(e) => handleDeleteInquiry(inq.id, inq.authorEmail, e)}
                              className="p-1 text-slate-500 hover:text-red-400 transition-colors rounded hover:bg-red-950/20"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      {/* Expandable Detail Content for allowed visitors */}
                      <AnimatePresence>
                        {isExpanded && hasAccess && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-white/5 bg-slate-950/60"
                          >
                            <div className="p-6 space-y-6 max-w-4xl select-text">
                              
                              {/* 1. Original Question Details */}
                              <div className="space-y-3 bg-slate-900/30 p-5 rounded-2xl border border-white/5">
                                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/5 pb-2">
                                  <span className="font-bold text-cyan-400 font-mono">Q. BAAL CUSTOMER REQUIREMENT RECORD</span>
                                  <span>{inq.date}</span>
                                </div>
                                <h5 className="font-bold text-white text-sm text-cyan-400/90">{inq.title}</h5>
                                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{inq.content}</p>
                              </div>

                              {/* 2. Official Answers section */}
                              <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold border-b border-white/5 pb-2 font-mono">
                                  <span>Official Responses</span>
                                  <span>({inq.answers?.length || 0})</span>
                                </div>

                                {inq.answers && inq.answers.map((ans, aIdx) => (
                                  <div key={aIdx} className="bg-cyan-950/15 p-5 rounded-2xl border border-cyan-800/10 pl-6 relative">
                                    {/* High tech green left margin edge */}
                                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-emerald-400/60 rounded" />
                                    
                                    <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-white/5 pb-2">
                                      <span className="font-extrabold text-emerald-400 font-mono flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                        {ans.author}
                                      </span>
                                      <span>{ans.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed pt-2.5 whitespace-pre-wrap">{ans.content}</p>
                                  </div>
                                ))}

                                {/* Answer Input Form (Shown strictly to and only to Master or System Administrator) */}
                                {isMasterOrAdmin && (
                                  <InquiryAnswerForm 
                                    onPostAnswer={(content) => handleAnswerInquiry(inq.id, content)} 
                                    language={language}
                                  />
                                )}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>

      {/* Toast Overlay for Dynamic feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[120] px-5 py-3.5 rounded-2xl bg-slate-900 border border-cyan-400/30 backdrop-blur-xl shadow-2xl text-xs text-white flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400 animate-pulse">
              <Check className="w-3 h-3" />
            </div>
            <span className="font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

/* Mini Helper Component for Posting Answers strictly inside Master view */
interface InquiryAnswerFormProps {
  onPostAnswer: (text: string) => void;
  language: 'ko' | 'en';
}

const InquiryAnswerForm: React.FC<InquiryAnswerFormProps> = ({ onPostAnswer, language }) => {
  const [answerDraft, setAnswerDraft] = useState('');

  const sendAnswer = () => {
    if (!answerDraft.trim()) return;
    onPostAnswer(answerDraft);
    setAnswerDraft('');
  };

  return (
    <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 font-mono">
        <Key className="w-3.5 h-3.5" />
        <span>마스터/최고 관리자 전산회신 처리처 (DIRECT MASTER ACTION CHANNEL)</span>
      </div>
      <textarea
        value={answerDraft}
        onChange={e => setAnswerDraft(e.target.value)}
        placeholder="상무님/선임님께 전송할 배합 장비 배관 치수 수령 경로, 견적 대가 회신, 혹은 비밀 번호 안내 가이드 설명을 공들여 작성하십시오."
        className="w-full h-24 p-3 text-xs bg-slate-900 border border-white/5 text-slate-200 rounded-lg focus:outline-none focus:border-cyan-400 resize-none placeholder-slate-500"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={sendAnswer}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs cursor-pointer active:scale-95 transition-transform"
        >
          <Send className="w-3 h-3" />
          <span>{language === 'en' ? 'Transmit Response' : '기술 회신 전송'}</span>
        </button>
      </div>
    </div>
  );
};
