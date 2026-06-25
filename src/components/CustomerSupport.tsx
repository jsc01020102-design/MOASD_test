import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, HelpCircle, Lock, Unlock, Plus, Trash2, Calendar, FileText, User, ChevronDown, ChevronUp, AlertCircle, Check, Send, Sparkles, Key, ShieldAlert, Download, Edit, Upload
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

interface Material {
  id: string;
  title: string;
  titleEn: string;
  source: string;
  sourceEn: string;
  description: string;
  descriptionEn: string;
  fileSize: string;
  fileName: string;
  fileUrl: string;
  date: string;
  uploadedContent?: string;
}

const DEFAULT_MATERIALS: Material[] = [
  {
    id: 'mat-2',
    title: '그래핀 슈퍼커패시터(ESS) 극전하 물리 흡착 성능 비교 분석 보고서',
    titleEn: 'Graphene Supercapacitor (ESS) Polar Adsorption Performance Comparison Report',
    source: '(주)MOASD 신소재에너지융합연구소',
    sourceEn: '(주)MOASD Advanced Materials Research Lab',
    description: '리튬이온 배터리 대비 슈퍼커패시터의 수명, 충방전 속도, 기온 변화에 따른 보존율 비교 데이터 파일입니다.',
    descriptionEn: 'Comparative performance files covering cycle life, charge-discharge speed, and temperature efficiency of supercapacitors vs lithium batteries.',
    fileSize: '8.2 MB',
    fileName: 'MOASD_Graphene_Supercapacitor_Performance_Comparison.pdf',
    fileUrl: 'pdf_data_placeholder',
    date: '2026.06.24'
  },
  {
    id: 'mat-3',
    title: '전기자전거 및 오토바이 자체충전 자가동력 발전 1:1 시뮬레이터 구동 매뉴얼',
    titleEn: 'E-Bicycle & E-Motorcycle Self-Charging Powertrain 1:1 Simulator Guide',
    source: '(주)MOASD 모빌리티개발사업부',
    sourceEn: '(주)MOASD Mobility Engineering Division',
    description: '자체 동력 회생 제동 및 그래핀 버퍼 저장 루프 시스템의 조립 구조 및 시뮬레이터 제어 가이드 문서입니다.',
    descriptionEn: 'Assembly structure and simulation control guide document for self-charging regenerative powertrain loops and graphene storage.',
    fileSize: '5.1 MB',
    fileName: 'Self_Charging_Ebike_Simulator_User_Manual.pdf',
    fileUrl: 'pdf_data_placeholder',
    date: '2026.06.25'
  }
];

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
  const [subTab, setSubTab] = useState<'notices' | 'inquiries' | 'materials'>('notices');
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
  const [materials, setMaterials] = useState<Material[]>(() => {
    const saved = localStorage.getItem('moasd_support_materials');
    const list = saved ? JSON.parse(saved) : DEFAULT_MATERIALS;
    return list.filter((m: Material) => m.id !== 'mat-1');
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

  // Form states for creating/editing Material (Master/Admin Only)
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [matTitle, setMatTitle] = useState('');
  const [matTitleEn, setMatTitleEn] = useState('');
  const [matSource, setMatSource] = useState('');
  const [matSourceEn, setMatSourceEn] = useState('');
  const [matDescription, setMatDescription] = useState('');
  const [matDescriptionEn, setMatDescriptionEn] = useState('');
  const [matFileSize, setMatFileSize] = useState('');
  const [matFileName, setMatFileName] = useState('');
  const [uploadedFileBase64, setUploadedFileBase64] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Download window/modal states
  const [downloadingMaterial, setDownloadingMaterial] = useState<Material | null>(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('moasd_support_materials', JSON.stringify(materials));
  }, [materials]);

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

  // Save or edit material
  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMasterOrAdmin) {
      triggerToast(language === 'en' ? '❌ Only administrators can manage materials.' : '❌ 마스터 및 관리자만 자료를 등록/수정할 수 있습니다.');
      return;
    }
    if (!matTitle.trim() || !matSource.trim() || !matFileName.trim()) {
      triggerToast(language === 'en' ? '❌ Please fill out essential details (Title, Source, File Name).' : '❌ 필수 기재 사항(제목, 출처, 파일명)을 채워주십시오.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    if (editingMaterialId) {
      // Edit existing
      setMaterials(prev => prev.map(m => m.id === editingMaterialId ? {
        ...m,
        title: matTitle,
        titleEn: matTitleEn || matTitle,
        source: matSource,
        sourceEn: matSourceEn || matSource,
        description: matDescription,
        descriptionEn: matDescriptionEn || matDescription,
        fileName: matFileName,
        fileSize: matFileSize || '3.5 MB',
        date: formattedDate,
        uploadedContent: uploadedFileBase64 || m.uploadedContent
      } : m));
      triggerToast(language === 'en' ? '🎉 Material updated successfully!' : '🎉 기술 자료가 정상적으로 수정 반영되었습니다.');
    } else {
      // Create new
      const newMat: Material = {
        id: `mat-${Date.now()}`,
        title: matTitle,
        titleEn: matTitleEn || matTitle,
        source: matSource,
        sourceEn: matSourceEn || matSource,
        description: matDescription,
        descriptionEn: matDescriptionEn || matDescription,
        fileName: matFileName,
        fileSize: matFileSize || '3.5 MB',
        fileUrl: 'placeholder_url',
        date: formattedDate,
        uploadedContent: uploadedFileBase64 || undefined
      };
      setMaterials(prev => [newMat, ...prev]);
      triggerToast(language === 'en' ? '🎉 New material registered successfully!' : '🎉 새로운 공식 기술 문서가 신규 등록 완료되었습니다.');
    }

    handleResetMaterialForm();
  };

  const handleResetMaterialForm = () => {
    setEditingMaterialId(null);
    setShowMaterialForm(false);
    setMatTitle('');
    setMatTitleEn('');
    setMatSource('');
    setMatSourceEn('');
    setMatDescription('');
    setMatDescriptionEn('');
    setMatFileName('');
    setMatFileSize('');
    setUploadedFileBase64(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    setMatFileName(file.name);
    const sizeInMB = file.size / (1024 * 1024);
    const sizeStr = sizeInMB >= 0.1 
      ? `${sizeInMB.toFixed(1)} MB` 
      : `${(file.size / 1024).toFixed(1)} KB`;
    setMatFileSize(sizeStr);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedFileBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    triggerToast(language === 'en' ? `📂 File "${file.name}" loaded successfully!` : `📂 "${file.name}" 파일이 성공적으로 로드되었습니다.`);
  };

  const handleEditMaterialClick = (mat: Material) => {
    setEditingMaterialId(mat.id);
    setMatTitle(mat.title);
    setMatTitleEn(mat.titleEn);
    setMatSource(mat.source);
    setMatSourceEn(mat.sourceEn);
    setMatDescription(mat.description);
    setMatDescriptionEn(mat.descriptionEn);
    setMatFileName(mat.fileName);
    setMatFileSize(mat.fileSize);
    setUploadedFileBase64(mat.uploadedContent || null);
    setShowMaterialForm(true);
    
    // Smooth scroll to the form
    setTimeout(() => {
      document.getElementById('material-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDeleteMaterial = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMasterOrAdmin) return;
    if (confirm(language === 'en' ? 'Are you sure you want to delete this material?' : '이 다운로드 자료를 영구 보존 데이터베이스에서 삭제하시겠습니까?')) {
      setMaterials(prev => prev.filter(m => m.id !== id));
      triggerToast(language === 'en' ? 'Material deleted successfully.' : '해당 기술 도면 자료가 시스템에서 완전히 삭제되었습니다.');
    }
  };

  const handleExecuteDownload = () => {
    if (!downloadingMaterial) return;
    if (!registeredUser) {
      triggerToast(language === 'en' ? '❌ Guest users cannot download materials. Please log in first.' : '❌ 비회원은 기술 자료 다운로드가 불가능합니다. 회원가입 혹은 로그인을 먼저 진행해 주십시오.');
      setDownloadingMaterial(null);
      setHasAgreedToTerms(false);
      onOpenLoginModal();
      return;
    }
    if (!hasAgreedToTerms) {
      alert(language === 'en' ? 'Please agree to the terms to proceed.' : '본 자료의 취급 약관 및 서약에 동의해 주셔야 다운로드가 가능합니다.');
      return;
    }

    let blob: Blob;
    const fileName = downloadingMaterial.fileName;

    const copyrightHeader = `========================================================================
[ COPYRIGHT NOTICE / 저작권 고지 ]
Copyright © (주)모아에스디 (MOASD Co., Ltd.) All Rights Reserved.
본 자료의 모든 지식재산권은 (주)모아에스디에 귀속되어 있으며 대한민국 저작권법 
및 관련 국제 협약의 법적 보호를 받습니다. 무단 변형, 배포 및 상업적 사용은 
형사 처벌 및 손해 배상 청구의 대상이 됩니다.
========================================================================\n\n`;

    if (downloadingMaterial.uploadedContent) {
      // Prepend copyright header to the uploaded material content
      try {
        if (downloadingMaterial.uploadedContent.startsWith('data:text/') || downloadingMaterial.uploadedContent.startsWith('data:application/json')) {
          const base64Str = downloadingMaterial.uploadedContent.split(',')[1];
          const textContent = decodeURIComponent(escape(atob(base64Str)));
          const finalContent = copyrightHeader + textContent;
          blob = new Blob([finalContent], { type: 'text/plain;charset=utf-8;' });
        } else if (downloadingMaterial.uploadedContent.startsWith('data:')) {
          // Prepend copyright header to binary content safely
          const base64Str = downloadingMaterial.uploadedContent.split(',')[1];
          const bstr = atob(base64Str);
          const copyrightBytes = new TextEncoder().encode(copyrightHeader);
          const u8arr = new Uint8Array(copyrightBytes.length + bstr.length);
          copyrightBytes.forEach((byte, i) => { u8arr[i] = byte; });
          for (let i = 0; i < bstr.length; i++) {
            u8arr[copyrightBytes.length + i] = bstr.charCodeAt(i);
          }
          const mime = downloadingMaterial.uploadedContent.split(',')[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
          blob = new Blob([u8arr], { type: mime });
        } else {
          const finalContent = copyrightHeader + downloadingMaterial.uploadedContent;
          blob = new Blob([finalContent], { type: 'text/plain;charset=utf-8;' });
        }
      } catch (err) {
        blob = new Blob([copyrightHeader + downloadingMaterial.uploadedContent], { type: 'text/plain;charset=utf-8;' });
      }
    } else {
      // Generate beautiful formal document content
      const docContent = `========================================================================
[ (주)모아에스디 공식 보안 다운로드 센터 / OFFICIAL TECHNICAL RESOURCE ]
========================================================================

- 자료 일련번호 : ${downloadingMaterial.id}
- 공식 자료명   : ${downloadingMaterial.title}
- 공식 자료출처 : ${downloadingMaterial.source}
- 전사 등록일자 : ${downloadingMaterial.date}
- 파일 규격     : ${downloadingMaterial.fileName} (${downloadingMaterial.fileSize})

------------------------------------------------------------------------
[ 중요 보도보안 및 사용 권한 고지 서약 ]
------------------------------------------------------------------------
본 자료는 (주)모아에스디의 중요 기획 정보, 제원 상세 설계 도면 및 민감한 핵심 
기술 내용이 포함되어 있으므로, 관련 임직원 및 제휴사 전력 부서 외 임의의 
수정, 무단 배포, 복제 및 상업적 사용을 절대 엄금합니다.

귀하(사용 이메일: ${registeredUser.email})는 다운로드 전 
위 사항에 대해 서약하였으므로 이에 따른 민감 기술 유출 방지 서약을 성실히 
준수해야 할 의무가 있습니다.

------------------------------------------------------------------------
[ MOASD INTEGRATED TECHNOLOGY BLUEPRINT DATA ]
------------------------------------------------------------------------
* 본 파일은 정식 승인 문서의 인코딩 원형 증명 검사본입니다.
* 데이터 해시 대조를 통해 라이선스를 확인해 주십시오.

------------------------------------------------------------------------
[ COPYRIGHT NOTICE / 저작권 고지 ]
------------------------------------------------------------------------
Copyright © (주)모아에스디 (MOASD Co., Ltd.) All Rights Reserved.
본 자료의 모든 지식재산권은 (주)모아에스디에 귀속되어 있으며 대한민국 저작권법 
및 관련 국제 협약의 법적 보호를 받습니다. 무단 변형, 배포 및 상업적 사용은 
형사 처벌 및 손해 배상 청구의 대상이 됩니다.

(주)모아에스디 대표이사 및 안전관제기술단 드림.
========================================================================`;

      blob = new Blob([docContent], { type: 'text/plain;charset=utf-8;' });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast(language === 'en' ? `🎉 File ${fileName} downloaded successfully with copyright embedded.` : `🎉 ${fileName} 저작권 보호 파일이 성공적으로 다운로드되었습니다.`);
    
    // Close modal
    setDownloadingMaterial(null);
    setHasAgreedToTerms(false);
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

        <button
          onClick={() => {
            setSubTab('materials');
            setExpandedNoticeId(null);
            setExpandedInquiryId(null);
          }}
          className={`flex items-center gap-2 pb-3.5 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            subTab === 'materials' 
              ? 'border-cyan-400 text-cyan-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{language === 'en' ? 'Download Materials' : '자료 다운로드'}</span>
          <span className="text-[10px] bg-slate-900 font-mono px-1.5 py-0.5 rounded text-slate-300">
            {materials.length}
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

        {/* ==================================== DOWNLOAD MATERIALS ==================================== */}
        {subTab === 'materials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center" id="material-form-anchor">
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
                {language === 'en' ? 'Official Technical Blueprints & Analytics' : '공인 기술 도면 및 분석 데이터 보고서 다운로드'}
              </span>

              {/* Master/Admin material register button */}
              {isMasterOrAdmin && (
                <button
                  onClick={() => {
                    if (showMaterialForm) {
                      handleResetMaterialForm();
                    } else {
                      setShowMaterialForm(true);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold font-mono transition-transform active:scale-95 cursor-pointer shadow-md shadow-cyan-950/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Register Material' : '자료 등록'}</span>
                </button>
              )}
            </div>

            {/* Material creation/editing Form for Master/Admin */}
            {showMaterialForm && isMasterOrAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-cyan-400 font-mono uppercase">
                    [SYSTEM ADMIN] {editingMaterialId ? (language === 'en' ? 'Modify Secure Material' : '기술 자료 수정기') : (language === 'en' ? 'New Secure Material Register' : '기술 자료 신규 등록기')}
                  </h4>
                  <button 
                    onClick={handleResetMaterialForm}
                    className="text-[10px] font-bold text-slate-500 hover:text-white cursor-pointer"
                  >
                    {language === 'en' ? 'Cancel' : '취소'}
                  </button>
                </div>

                <form onSubmit={handleSaveMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">자료 제목 국문 (필수)</label>
                      <input
                        type="text"
                        value={matTitle}
                        onChange={e => setMatTitle(e.target.value)}
                        placeholder="예: (주)MOASD HGE3D00 전원 모듈 구조도"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Material Title English (Optional)</label>
                      <input
                        type="text"
                        value={matTitleEn}
                        onChange={e => setMatTitleEn(e.target.value)}
                        placeholder="English Title..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">자료 출처 국문 (필수)</label>
                      <input
                        type="text"
                        value={matSource}
                        onChange={e => setMatSource(e.target.value)}
                        placeholder="예: (주)MOASD 안전관제기술단"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Source English (Optional)</label>
                      <input
                        type="text"
                        value={matSourceEn}
                        onChange={e => setMatSourceEn(e.target.value)}
                        placeholder="Source Dept English..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">자료 상세 설명 국문</label>
                      <textarea
                        value={matDescription}
                        onChange={e => setMatDescription(e.target.value)}
                        placeholder="자료에 들어갈 간략한 목적이나 내용에 관한 요약을 기재하십시오."
                        className="w-full h-16 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Description English (Optional)</label>
                      <textarea
                        value={matDescriptionEn}
                        onChange={e => setMatDescriptionEn(e.target.value)}
                        placeholder="English description summary..."
                        className="w-full h-16 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>

                    {/* Drag and Drop File Zone */}
                    <div className="space-y-1 pb-1">
                      <label className="text-[11px] font-bold text-slate-300">
                        {language === 'en' ? 'Upload Actual File (Drag & Drop or Click)' : '자료 파일 업로드 (드래그 앤 드롭 또는 클릭)'}
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleFileDrop}
                        onClick={() => document.getElementById('material-file-input')?.click()}
                        className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 select-none flex flex-col items-center justify-center gap-1.5 ${
                          isDraggingFile
                            ? 'border-cyan-400 bg-cyan-950/20 text-cyan-300'
                            : uploadedFileBase64
                            ? 'border-emerald-500/40 bg-emerald-950/10 text-emerald-400 hover:border-emerald-500/60'
                            : 'border-white/10 bg-slate-950/50 hover:border-cyan-500/30 text-slate-400'
                        }`}
                      >
                        <input
                          id="material-file-input"
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        <Upload className={`w-6 h-6 ${isDraggingFile ? 'animate-bounce text-cyan-400' : uploadedFileBase64 ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <div className="text-[11px] font-sans font-medium">
                          {isDraggingFile ? (
                            <span className="font-bold text-cyan-300 animate-pulse">
                              {language === 'en' ? 'Drop file here...' : '여기에 파일을 놓으십시오...'}
                            </span>
                          ) : uploadedFileBase64 ? (
                            <span className="font-bold text-emerald-400 flex items-center gap-1">
                              ✓ {language === 'en' ? 'File loaded successfully!' : '파일이 등록되었습니다.'}
                            </span>
                          ) : (
                            <span>
                              {language === 'en' ? 'Drag file here or click to browse' : '마우스로 파일을 끌어다 놓거나 클릭하여 선택하십시오.'}
                            </span>
                          )}
                        </div>
                        {uploadedFileBase64 && (
                          <div className="text-[9px] font-mono text-slate-500">
                            {language === 'en' ? 'Actual file bytes will be embedded on download' : '다운로드 시 실제 원형 데이터 파일이 연결되어 전송됩니다.'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">파일명 (필수)</label>
                        <input
                          type="text"
                          value={matFileName}
                          onChange={e => setMatFileName(e.target.value)}
                          placeholder="HGE3D00_Layout.dwg"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">파일 크기 (예: 4.8 MB)</label>
                        <input
                          type="text"
                          value={matFileSize}
                          onChange={e => setMatFileSize(e.target.value)}
                          placeholder="4.8 MB"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-white/5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetMaterialForm}
                      className="px-4 py-2 rounded-xl bg-slate-950 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      {language === 'en' ? 'Cancel' : '취소'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      {editingMaterialId ? (language === 'en' ? 'Save Changes' : '수정 완료') : (language === 'en' ? 'Register' : '자료 등록 완료')}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* List of downloadable materials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-500 text-xs border border-dashed border-white/5 rounded-2xl bg-slate-900/10">
                  {language === 'en' ? 'No registered materials found.' : '등록된 공인 기술 도면 및 분석 데이터가 존재하지 않습니다.'}
                </div>
              ) : (
                materials.map((mat) => {
                  const displayTitle = language === 'en' ? mat.titleEn : mat.title;
                  const displaySource = language === 'en' ? mat.sourceEn : mat.source;
                  const displayDesc = language === 'en' ? mat.descriptionEn : mat.description;

                  const isHorizontal = mat.id === 'mat-2';

                  return (
                    <div 
                      key={mat.id}
                      className={`p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                        isHorizontal ? 'col-span-1 md:col-span-2 md:flex-row md:gap-6' : ''
                      }`}
                    >
                      {/* Subtle accent highlight on top */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/10 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {isHorizontal ? (
                        <>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="space-y-0.5 text-left min-w-0">
                                <h4 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors truncate">
                                  {displayTitle}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                                  <span className="font-semibold text-slate-300">Source:</span>
                                  <span className="truncate max-w-[300px]">{displaySource}</span>
                                </div>
                              </div>
                            </div>

                            {displayDesc && (
                              <p className="text-xs text-slate-400 leading-relaxed pt-1 text-left">
                                {displayDesc}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col justify-between gap-3 md:w-80 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-5 text-left">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-slate-500">{language === 'en' ? 'Size:' : '크기:'}</span>
                                <span className="text-emerald-400 font-extrabold">{mat.fileSize}</span>
                              </div>
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-slate-500">{language === 'en' ? 'Date:' : '날짜:'}</span>
                                <span className="text-slate-400">{mat.date}</span>
                              </div>
                              <div className="font-mono text-[10px] text-slate-500 bg-slate-950/50 p-2 rounded-lg border border-white/5 flex items-center gap-1.5">
                                <span className="text-cyan-400 font-semibold">FILE:</span>
                                <span className="truncate select-all max-w-[200px]">{mat.fileName}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-3">
                              <div className="flex gap-2">
                                {isMasterOrAdmin && (
                                  <>
                                    <button
                                      onClick={() => handleEditMaterialClick(mat)}
                                      className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/5 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      title={language === 'en' ? 'Edit' : '수정'}
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                      <span className="hidden sm:inline">{language === 'en' ? 'Edit' : '수정'}</span>
                                    </button>
                                    <button
                                      onClick={(e) => handleDeleteMaterial(mat.id, e)}
                                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/5 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      title={language === 'en' ? 'Delete' : '삭제'}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span className="hidden sm:inline">{language === 'en' ? 'Delete' : '삭제'}</span>
                                    </button>
                                  </>
                                )}
                              </div>

                              <button
                                onClick={() => {
                                  if (!registeredUser) {
                                    triggerToast(language === 'en' ? '❌ Guest users cannot download materials. Please register or log in first.' : '❌ 비회원은 기술 자료 다운로드가 불가능합니다. 회원가입 혹은 로그인을 먼저 진행해 주십시오.');
                                    setTimeout(() => {
                                      onOpenLoginModal();
                                    }, 1500);
                                    return;
                                  }
                                  setDownloadingMaterial(mat);
                                  setHasAgreedToTerms(false);
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400/10 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 font-extrabold text-xs tracking-wide transition-all active:scale-95 cursor-pointer border border-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-slate-950 font-mono"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>{language === 'en' ? 'DOWNLOAD' : '다운로드'}</span>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                <FileText className="w-5 h-5" />
                              </div>
                              
                              {/* File info badge */}
                              <div className="flex flex-col items-end text-right font-mono text-[10px]">
                                <span className="text-emerald-400 font-extrabold">{mat.fileSize}</span>
                                <span className="text-slate-500">{mat.date}</span>
                              </div>
                            </div>

                            <div className="space-y-1 text-left">
                              <h4 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                                {displayTitle}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                                <span className="font-semibold text-slate-300">Source:</span>
                                <span className="truncate max-w-[200px]">{displaySource}</span>
                              </div>
                            </div>

                            {displayDesc && (
                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 pt-1 text-left">
                                {displayDesc}
                              </p>
                            )}

                            <div className="font-mono text-[10px] text-slate-500 bg-slate-950/50 p-2 rounded-lg border border-white/5 flex items-center gap-1.5">
                              <span className="text-cyan-400 font-semibold">FILE:</span>
                              <span className="truncate select-all">{mat.fileName}</span>
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="flex items-center justify-between gap-3 pt-5 mt-4 border-t border-white/5">
                            <div className="flex gap-2">
                              {isMasterOrAdmin && (
                                <>
                                  <button
                                    onClick={() => handleEditMaterialClick(mat)}
                                    className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/5 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                                    title={language === 'en' ? 'Edit' : '수정'}
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">{language === 'en' ? 'Edit' : '수정'}</span>
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteMaterial(mat.id, e)}
                                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/5 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                                    title={language === 'en' ? 'Delete' : '삭제'}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">{language === 'en' ? 'Delete' : '삭제'}</span>
                                  </button>
                                </>
                              )}
                            </div>

                            <button
                              onClick={() => {
                                if (!registeredUser) {
                                  triggerToast(language === 'en' ? '❌ Guest users cannot download materials. Please register or log in first.' : '❌ 비회원은 기술 자료 다운로드가 불가능합니다. 회원가입 혹은 로그인을 먼저 진행해 주십시오.');
                                  setTimeout(() => {
                                    onOpenLoginModal();
                                  }, 1500);
                                  return;
                                  }
                                setDownloadingMaterial(mat);
                                setHasAgreedToTerms(false);
                              }}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400/10 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 font-extrabold text-xs tracking-wide transition-all active:scale-95 cursor-pointer border border-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-slate-950 font-mono"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{language === 'en' ? 'DOWNLOAD' : '다운로드'}</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>

      {/* ==================================== SECURE DOWNLOAD DIALOG / WINDOW (MODAL) ==================================== */}
      <AnimatePresence>
        {downloadingMaterial && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Dark blur overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setDownloadingMaterial(null);
                setHasAgreedToTerms(false);
              }}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Body Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl select-text text-left space-y-5 overflow-hidden z-[160]"
            >
              {/* Abstract subtle radar gradient glow */}
              <div className="absolute top-0 right-0 opacity-10 blur-2xl w-40 h-40 bg-purple-500 rounded-full pointer-events-none" />

              <div className="flex items-start gap-3.5 border-b border-white/5 pb-4">
                <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400 flex-shrink-0 animate-pulse">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-extrabold text-purple-400 uppercase tracking-widest block">
                    [SECURE DOWNLOAD CLEARANCE PANEL]
                  </span>
                  <h3 className="text-md font-bold text-white tracking-tight">
                    {language === 'en' ? 'Security Vow & Consent Form' : '보안 서약 지침 및 다운로드 승인'}
                  </h3>
                </div>
              </div>

              {/* Download Details Panel */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-2.5 text-xs">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 font-mono font-medium flex-shrink-0">{language === 'en' ? 'File Title:' : '자료 제목:'}</span>
                  <span className="text-slate-200 font-bold text-right truncate max-w-[280px]">{language === 'en' ? downloadingMaterial.titleEn : downloadingMaterial.title}</span>
                </div>
                
                {/* 1. 자료 출처 */}
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 font-mono font-medium flex-shrink-0">{language === 'en' ? 'Source Authority:' : '1. 자료 출처:'}</span>
                  <span className="text-cyan-400 font-bold text-right truncate max-w-[280px]">{language === 'en' ? downloadingMaterial.sourceEn : downloadingMaterial.source}</span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-mono font-medium flex-shrink-0">{language === 'en' ? 'File Name:' : '파일명 및 규격:'}</span>
                  <span className="text-slate-300 font-mono font-semibold truncate max-w-[250px]">{downloadingMaterial.fileName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-mono font-medium">{language === 'en' ? 'Size / Date:' : '파일 용량 / 일자:'}</span>
                  <span className="text-emerald-400 font-mono font-bold">{downloadingMaterial.fileSize} / {downloadingMaterial.date}</span>
                </div>
              </div>

              {/* 2. 본 자료는 민감한 내용이 포함 되어 있으므로 임의로 수정 배포 및 상업적으로 사용을 금지합니다. */}
              <div className="bg-amber-950/15 border border-amber-500/25 p-4 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  ⚠️ {language === 'en' ? '2. SECURITY BRIEFING WARNING NOTICE' : '2. 중요 보안 경고 및 권한 지침 고사'}
                </span>
                <p className="text-xs text-amber-200/95 leading-relaxed font-sans font-semibold">
                  {language === 'en' 
                    ? 'This material contains confidential blueprints and sensitive project data. Unauthorized modification, distribution, copy, or commercial exploitation is strictly prohibited.' 
                    : '본 자료는 민감한 내용이 포함 되어 있으므로 임의로 수정 배포 및 상업적으로 사용을 금지합니다.'
                  }
                </p>
              </div>

              {/* 3. 동의합니다. 체크여부 만들기 */}
              <label className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-xl border border-white/5 cursor-pointer hover:border-cyan-400/30 transition-all select-none">
                <input
                  type="checkbox"
                  checked={hasAgreedToTerms}
                  onChange={(e) => setHasAgreedToTerms(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-white/10 bg-slate-900 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">
                    {language === 'en' ? '3. I Agree.' : '3. 동의합니다.'}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {language === 'en' ? 'Declares compliance with strict data safety rules.' : '체크 시 정식 전사 기술 다운로드 버튼이 연동 활성화됩니다.'}
                  </span>
                </div>
              </label>

              {/* 4. 동의합니다 체크 후 다운로드할 수 있는 다운로드 클릭버튼 */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDownloadingMaterial(null);
                    setHasAgreedToTerms(false);
                  }}
                  className="flex-1 py-2.5 text-center rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white font-bold text-xs tracking-wider transition-transform active:scale-95 cursor-pointer"
                >
                  {language === 'en' ? 'CANCEL' : '취소'}
                </button>
                <button
                  type="button"
                  onClick={handleExecuteDownload}
                  disabled={!hasAgreedToTerms}
                  className={`flex-1 py-2.5 text-center rounded-xl font-bold text-xs tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    hasAgreedToTerms 
                      ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/20 cursor-pointer' 
                      : 'bg-slate-950 border border-white/5 text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'en' ? '4. DOWNLOAD' : '4. 다운로드'}</span>
                </button>
              </div>

              {/* Copyright Notice */}
              <div className="text-center pt-3 border-t border-white/5">
                <p className="text-[10px] font-mono text-slate-500 font-semibold tracking-wide">
                  Copyright © (주)모아에스디 (MOASD Co., Ltd.) All Rights Reserved.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
