import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './context/LanguageContext';
import { 
  MOASD_SERVICES, 
  MOASD_STRENGTHS, 
  MOASD_CASES 
} from './data';
import { ThreeDCard, DynamicIcon } from './components/ThreeDCard';
import { ThreeDCarousel } from './components/ThreeDCarousel';
import { SamPolishingSolutions } from './components/SamPolishingSolutions';
import { ConsultingSimulator } from './components/ConsultingSimulator';
import { MainHeroSlider } from './components/MainHeroSlider';
import { Factory3DWalkthrough } from './components/Factory3DWalkthrough';
// B2B Mall component and product models completely removed as requested
import { Admin } from './components/Admin';
import { MediaCenter } from './components/MediaCenter';
import { CustomerSupport } from './components/CustomerSupport';
import { BusinessDomain } from './components/BusinessDomain';
import { Products } from './components/Products';
import { 
  Building2, 
  Sparkles, 
  ArrowUpRight, 
  Compass, 
  Users, 
  TrendingUp, 
  Cpu, 
  BarChart, 
  Send, 
  CheckCircle2, 
  Layers, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  ThumbsUp, 
  Lock,
  FileCheck2,
  User,
  Mail,
  KeyRound,
  Smartphone,
  LogOut,
  Download,
  Play,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  FileText,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

export const CompanyLogoIcon = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} select-none flex-shrink-0`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Red solid circle background */}
    <circle cx="50" cy="50" r="46" fill="#ee1c25" />
    
    {/* White outer square outline */}
    <rect 
      x="19" 
      y="19" 
      width="62" 
      height="62" 
      fill="none" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinejoin="miter"
    />
    
    {/* White diagonal "X" cross inside the square */}
    <line 
      x1="19" 
      y1="19" 
      x2="81" 
      y2="81" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="square"
    />
    <line 
      x1="81" 
      y1="19" 
      x2="19" 
      y2="81" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="square"
    />
  </svg>
);

export default function App() {
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // moasddh.com 등으로 접속했을 때 또는 전체 적용을 위해 브라우저 탭 타이틀을 (주)모아에스디로 변경
    document.title = "(주)모아에스디";
  }, []);

  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'business' | 'solutions' | 'partners' | 'mediacenter' | 'products' | 'support' | 'admin'>('home');
  const [purchaseSmsToast, setPurchaseSmsToast] = useState<{
    show: boolean;
    itemName: string;
    quantity: number;
    amount: number;
    buyer: string;
  } | null>(null);

  const handlePurchaseOrder = (product: any, quantity: number, buyerInfo?: any) => {
    const includeVat = buyerInfo?.includeVat !== false;
    const finalVatMultiplier = includeVat ? 1.1 : 1.0;
    const totalAmount = buyerInfo?.totalAmount || (product.priceKrw * quantity * finalVatMultiplier);
    
    const buyerName = buyerInfo?.buyerName || registeredUser?.name || '공식 바이어';
    const companyName = buyerInfo?.buyerCompany || registeredUser?.company || '협력 대리점';
    const buyerPhone = buyerInfo?.buyerPhone || registeredUser?.phone || '010-1234-5678';
    
    // 1. Show the on-screen simulated SMS dispatched Toast
    setPurchaseSmsToast({
      show: true,
      itemName: language === 'ko' ? product.nameKo : product.nameEn,
      quantity,
      amount: totalAmount,
      buyer: `${companyName} ${buyerName}`
    });

    // Auto close toast after 8 seconds
    setTimeout(() => {
      setPurchaseSmsToast(null);
    }, 8000);

    // 2. Persist in localStorage SMS list so Admin.tsx can read and show them
    const existingSmsStr = localStorage.getItem('moasd_simulated_sms_logs');
    const existingLogs = existingSmsStr ? JSON.parse(existingSmsStr) : [];
    
    const newSms = {
      id: `sms-${Date.now()}`,
      toName: language === 'ko' ? '장세창 최고 마스터 관리자' : 'Supreme Master Founder (J***)',
      toPhone: '010-2242-7801',
      fromName: `${companyName} - ${buyerName}`,
      fromPhone: buyerPhone,
      text: language === 'ko' 
        ? `[MOASD ERP 물류 공제계 계통 연동] '${companyName} ${buyerName}'님이 B2B 전력 장비 [${product.nameKo}] ${quantity}대의 정식 발주를 감행하셨습니다. (총액: ${(Math.round(totalAmount)).toLocaleString()}원, 부가세 ${includeVat ? '포함' : '미포함'}). 즉시 ERP 정합 조정을 개시해 주십시오.`
        : `[MOASD ERP Secure Bidding] '${companyName} ${buyerName}' ordered ${quantity} units of [${product.nameEn}]. Total contract amount: ${(Math.round(totalAmount)).toLocaleString()} KRW (VAT ${includeVat ? 'Included' : 'Excluded'}). Immediate coordination required.`,
      timestamp: new Date().toLocaleString(),
      type: 'purchase'
    };

    const updatedLogs = [newSms, ...existingLogs];
    localStorage.setItem('moasd_simulated_sms_logs', JSON.stringify(updatedLogs));
  };
  const [activeTabCase, setActiveTabCase] = useState<string | null>(null);
  const [activeSolutionIdx, setActiveSolutionIdx] = useState<number>(4);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isCasVideoOpen, setIsCasVideoOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [loginModalTab, setLoginModalTab] = useState<'partner' | 'general'>('partner');
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState<boolean>(false);
  const [samSubmenuOpen, setSamSubmenuOpen] = useState<boolean>(false);
  const [motorcycleSubmenuOpen, setMotorcycleSubmenuOpen] = useState<boolean>(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState<boolean>(false);
  const [mobileSamOpen, setMobileSamOpen] = useState<boolean>(false);
  const [mobileMotorcycleOpen, setMobileMotorcycleOpen] = useState<boolean>(false);

  // SignUp / 회원가입 states & local storage persistence
  const [portalTab, setPortalTab] = useState<'signup' | 'login'>('login');
  const [loginEmailOrName, setLoginEmailOrName] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState<string>('');
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpCompany, setSignUpCompany] = useState<string>('');
  const [signUpPhone, setSignUpPhone] = useState<string>('');
  const [signUpRole, setSignUpRole] = useState<'general' | 'partner'>('general');
  const [signUpPartnerCode, setSignUpPartnerCode] = useState<string>('');
  const [signUpCodeNumber, setSignUpCodeNumber] = useState<string>('');
  const [signUpAgree, setSignUpAgree] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string>('');
  const [downloadApprovals, setDownloadApprovals] = useState<Record<string, 'none' | 'pending' | 'approved'>>({});
  const [isSignedUp, setIsSignedUp] = useState<boolean>(() => {
    return sessionStorage.getItem('moasd_partner_user') !== null;
  });
  const [registeredUser, setRegisteredUser] = useState<{
    email: string;
    name: string;
    company: string;
    phone: string;
    regDate: string;
    role: 'general' | 'partner';
    partnerCode?: string;
  } | null>(() => {
    const saved = sessionStorage.getItem('moasd_partner_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [partnerImages, setPartnerImages] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.removeItem('moasd_partner_images');
  }, []);

  const [isAdminUser, setIsAdminUser] = useState<boolean>(() => {
    return sessionStorage.getItem('moasd_admin_session') !== null;
  });

  useEffect(() => {
    const syncAdmin = () => {
      setIsAdminUser(sessionStorage.getItem('moasd_admin_session') !== null);
    };
    window.addEventListener('storage', syncAdmin);
    const interval = setInterval(syncAdmin, 1500);
    return () => {
      window.removeEventListener('storage', syncAdmin);
      clearInterval(interval);
    };
  }, []);

  const handlePartnerImageUpload = (caseId: string, file: File) => {
    const isEn = language === 'en';
    if (!confirm(isEn ? `Are you sure you want to upload and apply this image (${file.name})?` : `이 이미지(${file.name})를 실제로 업로드하고 적용하시겠습니까?`)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High-quality canvas compression & auto-downscaling to guarantee performance & bypass localStorage/Firestore quota limitations
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
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
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          const updated = { ...partnerImages, [caseId]: compressedBase64 };
          setPartnerImages(updated);
          localStorage.setItem('moasd_partner_images', JSON.stringify(updated));
          alert(isEn ? "🎉 Image uploaded and applied successfully!" : "🎉 이미지가 성공적으로 업로드 및 적용되었습니다.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handlePartnerImageDelete = (caseId: string) => {
    if (confirm(language === 'en' ? 'Do you want to reset this image to the default?' : '이 이미지를 기본값으로 초기화하시겠습니까?')) {
      const updated = { ...partnerImages };
      delete updated[caseId];
      setPartnerImages(updated);
      localStorage.setItem('moasd_partner_images', JSON.stringify(updated));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeSolutionIdx !== 3) {
      setActiveSubTab(null);
    }
  }, [activeSolutionIdx]);

  const handleSignUpSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    // Strict validation
    if (!signUpEmail || !signUpEmail.includes('@') || signUpEmail.trim().length < 5) {
      setSignUpError(language === 'en' ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해 주십시오.');
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError(language === 'en' ? 'Password must be at least 6 characters.' : '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (signUpPassword !== signUpPasswordConfirm) {
      setSignUpError(language === 'en' ? 'Passwords do not match.' : '비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!signUpName.trim() || signUpName.trim().length < 2) {
      setSignUpError(language === 'en' ? 'Please enter your full name (at least 2 characters).' : '성함을 정확히 입력해 주십시오 (최소 2자).');
      return;
    }
    if (!signUpCompany.trim() || signUpCompany.trim().length < 2) {
      setSignUpError(language === 'en' ? 'Please enter a valid corporate or lab name.' : '소속 기업명 혹은 부서명을 정확히 입력해 주십시오.');
      return;
    }
    
    // Check contact phone digits and basic structure
    const cleanedPhone = signUpPhone.replace(/[^0-9-]/g, '').trim();
    if (!signUpPhone.trim() || cleanedPhone.length < 9) {
      setSignUpError(language === 'en' ? 'Please enter a valid mobile phone number.' : '올바른 연락처 번호를 입력해 주십시오.');
      return;
    }

    // Role-specific check
    let assignedRole: 'general' | 'partner' = 'general';
    let validatedPartnerCode = '';

    if (signUpRole === 'partner') {
      const codeNum = signUpCodeNumber.trim();
      
      if (!codeNum) {
        setSignUpError(language === 'en' ? 'A validation code number is required for B2B Partner registration.' : 'B2B 파트너 회원가입을 위한 코드번호 입력이 필수입니다.');
        return;
      }
      if (!/^\d+$/.test(codeNum)) {
        setSignUpError(language === 'en' ? 'The code number must contain numbers only.' : '코드번호는 숫자만 입력해 주셔야 합니다.');
        return;
      }
      assignedRole = 'partner';
      validatedPartnerCode = 'M-' + codeNum;
    }

    if (!signUpAgree) {
      setSignUpError(language === 'en' ? 'Kindly agree to the terms & privacy policy.' : '개인정보 보호 정책의 수집 및 이용 조항에 동의해 주십시오.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newUser = {
      email: signUpEmail,
      name: signUpName.trim(),
      company: signUpCompany.trim(),
      phone: cleanedPhone,
      regDate: formattedDate,
      role: assignedRole,
      partnerCode: validatedPartnerCode || undefined
    };

    sessionStorage.setItem('moasd_partner_user', JSON.stringify(newUser));
    localStorage.setItem('moasd_partner_user_backup', JSON.stringify(newUser));
    
    // Store password
    const userPassesSaved = localStorage.getItem('moasd_user_passwords');
    const userPasses = userPassesSaved ? JSON.parse(userPassesSaved) : {};
    userPasses[signUpEmail] = signUpPassword;
    localStorage.setItem('moasd_user_passwords', JSON.stringify(userPasses));

    // Store in member list immediately so Admin console can view it
    const savedMembers = localStorage.getItem('moasd_member_list');
    const membersList = savedMembers ? JSON.parse(savedMembers) : [];
    if (!membersList.some((m: any) => m.email === newUser.email)) {
      localStorage.setItem('moasd_member_list', JSON.stringify([newUser, ...membersList]));
    }

    setRegisteredUser(newUser);
    setIsSignedUp(true);
    setDownloadApprovals({});
    setIsSignUpModalOpen(false);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const inputNameOrEmail = loginEmailOrName.trim();
    const inputPass = loginPassword.trim();

    if (!inputNameOrEmail || !inputPass) {
      setLoginError(language === 'en' ? 'Please fill in all login details.' : '모든 로그인 정보를 입력하십시오.');
      return;
    }

    // 1. Check Master Admin
    const MASTER_ADMIN_PASS = '0815)*!%';
    if (
      (inputNameOrEmail === '장세창' || inputNameOrEmail === 'sinhwaensol@gmail.com' || inputNameOrEmail === 'master') &&
      inputPass === MASTER_ADMIN_PASS
    ) {
      const masterUser = {
        email: 'sinhwaensol@gmail.com',
        name: '장세창 최고관리자',
        company: '(주)MOASD',
        phone: '010-2242-7801',
        regDate: new Date().toLocaleDateString(),
        role: 'partner' as 'general' | 'partner',
        partnerCode: 'MOASD_PARTNER'
      };
      
      const adminSession = {
        id: 'master-admin',
        name: '장세창',
        phone: '010-2242-7801',
        roleLabel: 'S'
      };
      sessionStorage.setItem('moasd_admin_session', JSON.stringify(adminSession));
      
      sessionStorage.setItem('moasd_partner_user', JSON.stringify(masterUser));
      setRegisteredUser(masterUser);
      setIsSignedUp(true);
      setDownloadApprovals({});
      
      // Simulated SMS logs
      const existingSmsStr = localStorage.getItem('moasd_simulated_sms_logs');
      const existingLogs = existingSmsStr ? JSON.parse(existingSmsStr) : [];
      const loginSms = {
        id: `sms-${Date.now()}`,
        toName: '장세창 최고 마스터 관리자',
        toPhone: '010-2242-7801',
        fromName: 'MOASD AI 시스템',
        fromPhone: '080-FREE-SMS',
        text: `[MOASD AI 통보] 최고 마스터 관리자(장세창 님)께서 별도 회원가입 없이 실시간 게이트웨이를 통해 직통 로그인을 완수하셨습니다.`,
        timestamp: new Date().toLocaleString(),
        type: 'status'
      };
      localStorage.setItem('moasd_simulated_sms_logs', JSON.stringify([loginSms, ...existingLogs]));
      
      alert(language === 'en' ? 'Welcome back, Master Admin! Logged in without signup.' : '장세창 최고 관리자님 환영합니다! 별도의 가입 절차 없이 즉격 로그인되었습니다.');
      return;
    }

    // 2. Check Sub Admin
    const subAdminsSaved = localStorage.getItem('moasd_sub_admins');
    const subAdminsList = subAdminsSaved ? JSON.parse(subAdminsSaved) : [];
    const matchingSub = subAdminsList.find(
      (sub: any) => sub.name.trim() === inputNameOrEmail && sub.password?.trim() === inputPass
    );

    if (matchingSub) {
      const subUser = {
        email: `${matchingSub.name.replace(/\s/g, '').toLowerCase()}@moasd.com`,
        name: `${matchingSub.name} (관리자)`,
        company: '(주)MOASD 운영부서',
        phone: matchingSub.phone,
        regDate: new Date().toLocaleDateString(),
        role: 'partner' as 'general' | 'partner',
        partnerCode: 'MOASD_PARTNER'
      };

      sessionStorage.setItem('moasd_admin_session', JSON.stringify(matchingSub));
      sessionStorage.setItem('moasd_partner_user', JSON.stringify(subUser));
      setRegisteredUser(subUser);
      setIsSignedUp(true);
      setDownloadApprovals({});

      const existingSmsStr = localStorage.getItem('moasd_simulated_sms_logs');
      const existingLogs = existingSmsStr ? JSON.parse(existingSmsStr) : [];
      const loginSms = {
        id: `sms-${Date.now()}`,
        toName: '장세창 최고 마스터 관리자',
        toPhone: '010-2242-7801',
        fromName: 'MOASD AI 시스템',
        fromPhone: '080-FREE-SMS',
        text: `[MOASD AI 통보] 등록 관리자 '${matchingSub.name}' 님이 별도 가입 없이 직격 원격 단말로 일반 포탈 로그인을 수행하였습니다.`,
        timestamp: new Date().toLocaleString(),
        type: 'status'
      };
      localStorage.setItem('moasd_simulated_sms_logs', JSON.stringify([loginSms, ...existingLogs]));

      alert(language === 'en' ? `Welcome back Admin ${matchingSub.name}!` : `관리자 "${matchingSub.name}" 님 반갑습니다! 가입 없이 즉각 로그인 하였습니다.`);
      return;
    }

    // 3. Check regular registered member list
    const membersSaved = localStorage.getItem('moasd_member_list');
    const membersList = membersSaved ? JSON.parse(membersSaved) : [];
    const userPassesSaved = localStorage.getItem('moasd_user_passwords');
    const userPasses = userPassesSaved ? JSON.parse(userPassesSaved) : {};
    
    let searchCode = inputNameOrEmail;
    if (/^\d+$/.test(inputNameOrEmail)) {
      searchCode = `M-${inputNameOrEmail}`;
    }

    const matchedMember = membersList.find((m: any) => 
      m.email.toLowerCase() === inputNameOrEmail.toLowerCase() ||
      (m.partnerCode && m.partnerCode.toUpperCase() === inputNameOrEmail.toUpperCase()) ||
      (m.partnerCode && m.partnerCode.toUpperCase() === searchCode.toUpperCase())
    );

    if (matchedMember) {
      const savedPass = userPasses[matchedMember.email];
      if (savedPass && savedPass === inputPass) {
        sessionStorage.setItem('moasd_partner_user', JSON.stringify(matchedMember));
        setRegisteredUser(matchedMember);
        setIsSignedUp(true);
        setDownloadApprovals({});
        alert(language === 'en' ? `Successfully logged in as ${matchedMember.name}!` : `파트너 회원 "${matchedMember.name}" 님으로 정상 로그인되었습니다.`);
        return;
      } else {
        setLoginError(language === 'en' ? 'Incorrect password.' : '비밀번호가 올바르지 않습니다.');
        return;
      }
    }

    const storedLocalUserStr = localStorage.getItem('moasd_partner_user_backup');
    if (storedLocalUserStr) {
      const storedLocalUser = JSON.parse(storedLocalUserStr);
      if (
        storedLocalUser.email.toLowerCase() === inputNameOrEmail.toLowerCase() ||
        (storedLocalUser.partnerCode && storedLocalUser.partnerCode.toUpperCase() === inputNameOrEmail.toUpperCase()) ||
        (storedLocalUser.partnerCode && storedLocalUser.partnerCode.toUpperCase() === searchCode.toUpperCase())
      ) {
        const savedPass = userPasses[storedLocalUser.email];
        if (!savedPass || savedPass === inputPass) {
          sessionStorage.setItem('moasd_partner_user', JSON.stringify(storedLocalUser));
          setRegisteredUser(storedLocalUser);
          setIsSignedUp(true);
          setDownloadApprovals({});
          alert(language === 'en' ? `Successfully logged in as ${storedLocalUser.name}!` : `파트너 회원 "${storedLocalUser.name}" 님으로 정상 로그인되었습니다.`);
          return;
        }
      }
    }

    setLoginError(
      language === 'en'
        ? 'No matching administrator or member account found.'
        : '일치하는 관리자 정보나 가입 회원 계정을 찾을 수 없습니다.'
    );
  };

  const handleLogOut = () => {
    sessionStorage.removeItem('moasd_admin_session');
    sessionStorage.removeItem('moasd_admin_manual_toggle');
    sessionStorage.removeItem('moasd_partner_user');
    setRegisteredUser(null);
    setIsSignedUp(false);
    // Reset all form fields
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpPasswordConfirm('');
    setSignUpName('');
    setSignUpCompany('');
    setSignUpPhone('');
    setSignUpRole('general');
    setSignUpPartnerCode('');
    setSignUpCodeNumber('');
    setSignUpAgree(false);
    setSignUpError('');
    setDownloadApprovals({});
  };

  const handleDownloadClick = (itemId: string, itemName: string) => {
    if (!isSignedUp) {
      alert(language === 'en' ? 'Unauthorized: Please complete your partner registration first' : '열람 및 다운로드 권한 없음: 좌측 폼에서 회원가입을 먼저 전격 수행해 주십시오.');
      return;
    }

    if (registeredUser?.role === 'partner') {
      alert(
        language === 'en'
          ? `[B2B PARTNER GRANTED] Successfully downloaded "${itemName}"!\nFully authorized. Access logged securely on MOASD central servers.`
          : `[B2B 파트너 인증 해제 승인] "${itemName}" 파일을 성공적으로 다운로드했습니다!\n공식 대리점 권한이 실시간 인가되어 (주)MOASD 데이터 허브에 기록되었습니다.`
      );
      return;
    }

    // Role is general: Check state of approval
    const currentStatus = downloadApprovals[itemId] || 'none';
    if (currentStatus === 'none') {
      // Trigger request
      setDownloadApprovals(prev => ({ ...prev, [itemId]: 'pending' }));
      alert(
        language === 'en'
          ? `[B2B GENERAL MEMBER LEVEL] Administrator approval is required for downloads.\n\n"Request for Manager Download License" has been securely submitted!\nOur background system will review and auto-approve in 3 seconds.`
          : `[일반회원 다운로드 정책 적용] 정식 다운로드를 위해서 관리자 전용 망 승인이 필요합니다.\n\n"관리자 다운로드 권한 심사 요청"이 실시간 제출되었습니다!\n(데모 시뮬레이션에 따라 3초 후 즉시 '승인 완료' 상태로 권한이 활성화됩니다.)`
      );

      // Simulate admin approval in 3 seconds
      setTimeout(() => {
        setDownloadApprovals(prev => {
          const next = { ...prev, [itemId]: 'approved' as const };
          // Prompt user with alert if possible but updating UI state is safer and extremely professional
          return next;
        });
      }, 3000);
    } else if (currentStatus === 'pending') {
      alert(
        language === 'en'
          ? 'Administrator license review is in progress. Please wait a moment.'
          : '보안 사양서 심사가 아직 대기 상태입니다. 약 2~3초가 소요되오니 잠시만 기다려 주십시오.'
      );
    } else if (currentStatus === 'approved') {
      alert(
        language === 'en'
          ? `[ADMIN STATUS APPROVED] Successfully downloaded "${itemName}"!\nAuthorized and verified with General License key.`
          : `[관리자 승인 해제 성공] 본사 관리자가 다운로드 권한을 승인하였습니다.\n"${itemName}" 사양 파일을 성공적으로 전송 완료했습니다.`
      );
    }
  };

  const handleUpgradeToPartner = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const validCodes = ['MOASD_B2B', 'MOASD_PARTNER', 'B2B_VIP', 'PARTNER2025', 'PARTNER2026'];
    if (validCodes.includes(trimmed)) {
      const updatedUser = {
        email: registeredUser?.email || 'B2B_PARTNER_MEMBER@COMPANY.COM',
        name: registeredUser?.name || 'B2B Partner Representative',
        company: registeredUser?.company || 'MOASD B2B Partner Inc.',
        phone: registeredUser?.phone || '010-0000-0000',
        regDate: registeredUser?.regDate || new Date().toLocaleDateString(),
        role: 'partner' as const,
        partnerCode: trimmed
      };
      sessionStorage.setItem('moasd_partner_user', JSON.stringify(updatedUser));
      setRegisteredUser(updatedUser);
      setIsSignedUp(true);
      return { success: true };
    }
    return { success: false, error: language === 'en' ? 'Incorrect or expired partner code.' : '존재하지 않거나 오탈자가 발생한 B2B 파트너 인증 코드입니다.' };
  };

  const navigateToSection = (sectionId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 120);
  };

  const navigateToMediaCenter = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('mediacenter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProducts = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSupport = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('support');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBusiness = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('business');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSolutions = (index?: number, tab?: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('solutions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (index !== undefined) {
      setActiveSolutionIdx(index);
    }
    if (tab !== undefined) {
      setActiveSubTab(tab);
    } else {
      setActiveSubTab(null);
    }
    if (index !== undefined || tab !== undefined) {
      setTimeout(() => {
        if (index !== undefined) {
          window.dispatchEvent(new CustomEvent('moasd-change-carousel-idx', { detail: { index } }));
        }
        if (tab !== undefined) {
          window.dispatchEvent(new CustomEvent('moasd-change-sol-tab', { detail: { tab } }));
        }
      }, 100);
    }
  };

  const navigateToPartners = (caseId?: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentTab('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (caseId) {
      setActiveTabCase(caseId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Dynamic Ambient Blur Background Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-950/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 1. Header Navigation Bar */}
      <header 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-xl' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Branding */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <CompanyLogoIcon className="w-9 h-9 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-red-500/20" />
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white font-sans leading-none">
                (주)MOASD
              </span>
              <span className="text-[10px] text-cyan-400 font-mono font-semibold tracking-widest mt-0.5 uppercase">
                Enterprise Solution
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            <a 
              href="#about" 
              onClick={(e) => navigateToAbout(e)}
              className={`font-semibold transition-colors ${currentTab === 'about' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400 font-medium'}`}
            >
              {t('nav.about', 'About Us', '회사소개')}
            </a>
            
            {/* Solutions Dropdown Menu */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => {
                setSolutionsDropdownOpen(false);
                setSamSubmenuOpen(false);
                setMotorcycleSubmenuOpen(false);
              }}
            >
              <button 
                className={`flex items-center gap-1 font-semibold transition-colors focus:outline-none cursor-pointer border-0 bg-transparent ${currentTab === 'solutions' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' : 'text-slate-300 hover:text-cyan-400 font-medium'}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSolutionsDropdownOpen(!solutionsDropdownOpen);
                }}
              >
                {t('nav.solutions', 'Solutions', '솔루션')}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              
              <AnimatePresence>
                {solutionsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-60 rounded-xl bg-slate-950/95 border border-white/10 p-2 shadow-2xl backdrop-blur-2xl z-50"
                  >
                    <div className="flex flex-col gap-1 relative">
                      <button
                        onClick={(e) => {
                          navigateToSolutions(4, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {language === 'en' ? 'Generator (HGE3D00)' : '발전기 (HGE3D00)'}
                      </button>

                      <button
                        onClick={(e) => {
                          navigateToSolutions(0, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {language === 'en' ? 'High-Performance Power Bank' : '고성능 파워뱅크'}
                      </button>

                      {/* SAM with nested sub-flyout */}
                      <div 
                        className="relative"
                        onMouseEnter={() => setSamSubmenuOpen(true)}
                        onMouseLeave={() => setSamSubmenuOpen(false)}
                      >
                        <button
                          onClick={(e) => {
                            navigateToSolutions(3, undefined, e);
                            setSolutionsDropdownOpen(false);
                          }}
                          className="flex items-center justify-between px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                            <span>{language === 'en' ? 'SAM Tech' : 'SAM'}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-450" />
                        </button>

                        <AnimatePresence>
                          {samSubmenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-0 left-full ml-1 w-60 rounded-xl bg-slate-950/98 border border-white/10 p-2 shadow-2xl backdrop-blur-2xl z-50"
                            >
                              <div className="flex flex-col gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToSolutions(3, 'sam-p', e);
                                    setSolutionsDropdownOpen(false);
                                    setSamSubmenuOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                                  {language === 'en' ? 'SAM Polishing' : 'SAM 메탈 및 콘크리트 폴리싱'}
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToSolutions(3, 'ecotube', e);
                                    setSolutionsDropdownOpen(false);
                                    setSamSubmenuOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                                  {language === 'en' ? 'ECOTUBE' : 'ECOTUBE (에코튜브)'}
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToSolutions(3, 'terramuvics', e);
                                    setSolutionsDropdownOpen(false);
                                    setSamSubmenuOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                                  {language === 'en' ? 'Terramuvics' : 'Terramuvics (테라뮤빅스)'}
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToSolutions(3, 'heat-coating', e);
                                    setSolutionsDropdownOpen(false);
                                    setSamSubmenuOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                                  {language === 'en' ? 'Heating Coating' : '발열 코팅'}
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToSolutions(3, 'polaris', e);
                                    setSolutionsDropdownOpen(false);
                                    setSamSubmenuOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                                  {language === 'en' ? 'Polaris Coating' : '폴라리스 코팅'}
                                </button>
                                 
                                 
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={(e) => {
                          navigateToSolutions(2, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        {language === 'en' ? 'Hybrid Motorcycle' : '하이브리드 이륜차'}
                      </button>

                      <button
                        onClick={(e) => {
                          navigateToSolutions(1, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        {language === 'en' ? 'Self-Charging E-Bicycle' : '자가충전 전기자전거'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="#partners" 
              onClick={(e) => navigateToPartners(undefined, e)}
              className={`font-semibold transition-colors ${currentTab === 'partners' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400'}`}
            >
              {t('nav.partners', 'Partners', '협력기업')}
            </a>
            <a 
              href="#business-domain" 
              onClick={(e) => navigateToBusiness(e)}
              className={`font-semibold transition-colors ${currentTab === 'business' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400 font-medium'}`}
            >
              {t('nav.business', 'Business Domain', '사업영역')}
            </a>
            <a 
              href="#media-center" 
              onClick={(e) => navigateToMediaCenter(e)}
              className={`font-semibold transition-colors ${currentTab === 'mediacenter' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400 font-medium'}`}
            >
              {language === 'en' ? 'Media Center' : '미디어센터'}
            </a>
            <a 
              href="#products" 
              onClick={(e) => navigateToProducts(e)}
              className={`font-semibold transition-colors ${currentTab === 'products' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400 font-medium'}`}
            >
              {language === 'en' ? 'Products' : '제품'}
            </a>
            <a 
              href="#customer-support" 
              onClick={(e) => navigateToSupport(e)}
              className={`font-semibold transition-colors ${currentTab === 'support' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400 font-medium'}`}
            >
              {language === 'en' ? 'Support' : '고객지원'}
            </a>
            <a 
              href="#admin-section" 
              onClick={(e) => navigateToAdmin(e)}
              className={`font-semibold transition-colors ${currentTab === 'admin' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 animate-pulse' : 'text-slate-300 hover:text-cyan-400'}`}
            >
              {t('nav.admin', 'Admin', '관리자')}
            </a>
          </nav>

          {/* Nav Right CTA Button & Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            {/* 로그인 (Log In) 및 로그아웃 항목 */}
            {!isSignedUp ? (
              <button
                id="header-login-btn"
                onClick={() => {
                  setLoginError('');
                  setIsLoginModalOpen(true);
                }}
                className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer hover:underline"
              >
                {language === 'en' ? 'Log In' : '로그인'}
              </button>
            ) : (
              <button
                id="header-logout-btn"
                onClick={handleLogOut}
                className="text-xs font-bold text-red-400 hover:text-red-300 transition-all duration-300 cursor-pointer hover:underline"
              >
                {language === 'en' ? 'Log Out' : '로그아웃'}
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center h-8 rounded-lg bg-slate-900/60 p-0.5 border border-white/5 shadow-inner">
              <button
                id="btn-lang-ko"
                onClick={() => setLanguage('ko')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-200 ${
                  language === 'ko'
                    ? 'bg-cyan-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                KR
              </button>
              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-cyan-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            <button 
              onClick={() => setIsSignUpModalOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-cyan-400/30 bg-slate-900/40 text-xs font-bold text-cyan-400 hover:text-slate-950 hover:bg-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-md shadow-cyan-500/5 hover:shadow-cyan-400/20 active:scale-95 cursor-pointer"
            >
              {isSignedUp ? (language === 'en' ? 'My Account' : '회원정보') : t('nav.cta', 'Sign Up', '회원가입')}
            </button>
          </div>

          {/* Mobile Right Block with Lang Switcher & Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* 로그인/로그아웃 항목 */}
            {!isSignedUp ? (
              <button
                id="mobile-header-login-btn"
                onClick={() => {
                  setLoginError('');
                  setIsLoginModalOpen(true);
                }}
                className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-all duration-205 cursor-pointer hover:underline mr-1"
              >
                {language === 'en' ? 'Log In' : '로그인'}
              </button>
            ) : (
              <button
                id="mobile-header-logout-btn"
                onClick={handleLogOut}
                className="text-xs font-bold text-red-500 hover:text-red-400 transition-all duration-205 cursor-pointer hover:underline mr-1"
              >
                {language === 'en' ? 'Log Out' : '로그아웃'}
              </button>
            )}

            <div className="flex items-center h-7 rounded-md bg-slate-900/60 p-0.5 border border-white/5">
              <button
                id="mobile-btn-lang-ko"
                onClick={() => setLanguage('ko')}
                className={`px-2 py-0.5 rounded text-[9px] font-extrabold transition-all duration-200 ${
                  language === 'ko'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                KR
              </button>
              <button
                id="mobile-btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[9px] font-extrabold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            <button 
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-cyan-400 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sliding Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-sm font-medium">
                <a 
                  href="#about" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToAbout(e);
                  }}
                  className={`py-2 block border-b border-white/5 whitespace-nowrap ${currentTab === 'about' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  {t('nav.about', 'About Us', '회사소개')}
                </a>
                {/* Mobile Solutions Accordion Group */}
                <div className="border-b border-white/5 pb-2">
                  <button 
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="w-full py-2 text-slate-300 hover:text-cyan-400 font-medium flex items-center justify-between text-left focus:outline-none cursor-pointer bg-transparent border-0"
                  >
                    <span className={currentTab === 'solutions' ? 'text-cyan-400 font-bold' : ''}>{t('nav.solutions', 'Solutions', '솔루션')}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {mobileSolutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 flex flex-col gap-2.5 pt-2 overflow-hidden"
                      >
                        {/* 발전기 */}
                        <button
                          onClick={() => {
                            navigateToSolutions(4);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          {language === 'en' ? 'Generator (HGE3D00)' : '발전기 (HGE3D00)'}
                        </button>

                        {/* ESS */}
                        <button
                          onClick={() => {
                            navigateToSolutions(0);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          {language === 'en' ? 'High-Performance Power Bank' : '고성능 파워뱅크'}
                        </button>

                        {/* SAM inner accordion */}
                        <div className="flex flex-col">
                          <button
                            onClick={() => setMobileSamOpen(!mobileSamOpen)}
                            className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center justify-between bg-transparent border-0 w-full"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>{language === 'en' ? 'SAM Technology' : 'SAM'}</span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-450 ${mobileSamOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {mobileSamOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.15 }}
                                className="pl-4 flex flex-col gap-2 pt-1.5 overflow-hidden pb-1"
                              >
                                <button
                                  onClick={() => {
                                    navigateToSolutions(3, 'sam-p');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-cyan-400" />
                                  {language === 'en' ? 'SAM Polishing' : 'SAM 메탈 및 콘크리트 폴리싱'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(3, 'ecotube');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-purple-400" />
                                  {language === 'en' ? 'ECOTUBE' : 'ECOTUBE (에코튜브)'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(3, 'terramuvics');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-emerald-400" />
                                  {language === 'en' ? 'Terramuvics' : 'Terramuvics (테라뮤빅스)'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(3, 'heat-coating');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-amber-400" />
                                  {language === 'en' ? 'Heating Coating' : '발열 코팅'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(3, 'polaris');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-rose-400" />
                                  {language === 'en' ? 'Polaris Coating' : '폴라리스 코팅'}
                                </button>
                                 
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 하이브리드 이륜차 */}
                        <button
                          onClick={() => {
                            navigateToSolutions(2);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                          {language === 'en' ? 'Hybrid Motorcycle' : '하이브리드 이륜차'}
                        </button>

                        {/* 자전거 */}
                        <button
                          onClick={() => {
                            navigateToSolutions(1);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          {language === 'en' ? 'Self-Charging E-Bicycle' : '자가충전 전기자전거'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <a 
                  href="#partners" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToPartners(undefined, e);
                  }}
                  className={`py-2 block border-b border-white/5 ${currentTab === 'partners' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  {t('nav.partners', 'Partners', '협력기업')}
                </a>
                <a 
                  href="#business-domain" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToBusiness(e);
                  }}
                  className={`py-2 block border-b border-white/5 ${currentTab === 'business' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  {t('nav.business', 'Business Domain', '사업영역')}
                </a>
                <a 
                  href="#media-center" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToMediaCenter(e);
                  }}
                  className={`py-2 block border-b border-white/5 whitespace-nowrap ${currentTab === 'mediacenter' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  {language === 'en' ? 'Media Center' : '미디어센터'}
                </a>
                <a 
                  href="#products" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToProducts(e);
                  }}
                  className={`py-2 block border-b border-white/5 whitespace-nowrap ${currentTab === 'products' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  {language === 'en' ? 'Products' : '제품'}
                </a>
                <a 
                  href="#customer-support" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToSupport(e);
                  }}
                  className={`py-2 block border-b border-white/5 whitespace-nowrap ${currentTab === 'support' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'}`}
                >
                  {language === 'en' ? 'Support' : '고객지원'}
                </a>
                <a 
                  href="#admin-section" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToAdmin(e);
                  }}
                  className="py-2 text-slate-300 hover:text-cyan-400 block border-b border-white/5 whitespace-nowrap"
                >
                  {t('nav.admin', 'Admin', '관리자')}
                </a>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSignUpModalOpen(true);
                  }}
                  className="mt-2 w-full text-center py-3 rounded-lg bg-cyan-400 text-slate-950 font-bold block cursor-pointer"
                >
                  {isSignedUp ? (language === 'en' ? 'My Account' : '회원정보') : t('nav.cta', 'Sign Up', '회원가입')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {currentTab === 'home' ? (
        <>
          {/* 2. Panoramic Enterprise Hero Screen Slider (KEPCO style) */}
          <MainHeroSlider />

      {/* 5. Business Domain (사업영역) */}
      <section id="business-domain-main-section" className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 relative py-12">
        <div className="border border-white/5 bg-slate-900/10 rounded-3xl p-4 sm:p-6 lg:p-10">
          <BusinessDomain isMainScreen={true} />
        </div>
      </section>

    </>
  ) : currentTab === 'business' ? (
    <div className="pt-24 min-h-[85vh] bg-slate-950">
      <BusinessDomain />
    </div>
  ) : currentTab === 'about' ? (
    <div className="pt-28 pb-20 min-h-[85vh] bg-slate-950 text-slate-100 animate-fade-in select-text">
      <article className="max-w-3xl mx-auto px-6 space-y-12 leading-relaxed">
        
        {/* Title Block */}
        <div className="space-y-4 pb-6 border-b border-white/5">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'en' ? 'Saving the Environment, MOASD Co., Ltd.' : '환경을 살리는 기업, (주)모아에스디'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            {language === 'en' ? (
              <>
                MOASD Co., Ltd. is an eco-friendly enterprise dedicated to researching and developing <strong className="text-cyan-400 font-bold">SAM materials</strong>.
              </>
            ) : (
              <>
                (주)모아에스디는 <strong className="text-cyan-400 font-bold">SAM 소재</strong>를 전문적으로 연구·발전시켜 온 친환경 기업입니다.
              </>
            )}
          </p>
        </div>

        {/* Section 1: Reality */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'The Reality We Face' : '우리가 직면한 현실'}
          </h2>
          <p className="text-sm text-slate-400">
            {language === 'en'
              ? 'Today, our planet is confronted with escalating climate crises and diverse environmental challenges:'
              : '현재 지구는 기후 위기와 다양한 환경 문제에 직면해 있습니다.'}
          </p>
          <ul className="space-y-3.5 text-sm text-slate-300 pl-4 list-disc marker:text-cyan-400">
            <li>
              <strong>{language === 'en' ? 'Climate Crisis: ' : '기후 위기: '}</strong>
              {language === 'en'
                ? 'Rising carbon dioxide emissions have intensified global warming and extreme weather.'
                : '이산화탄소 배출 증가로 인한 지구온난화와 이상기온이 심화되고 있습니다.'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Natural Disasters: ' : '자연 재해: '}</strong>
              {language === 'en'
                ? 'Glaciers are melting rapidly, and worldwide hazards like floods, heatwaves, and earthquakes threaten our daily lives.'
                : '빙하가 빠르게 녹아내리며, 홍수, 폭염, 지진 등 전 세계적인 자연재해가 일상을 위협하고 있습니다.'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Health Threats: ' : '건강 위협: '}</strong>
              {language === 'en'
                ? 'Harmful elements such as fossil fuels, microplastics, fine dust, air pollution, and processed foods are pervasive, yet viable alternatives remain scarce.'
                : '화석연료, 미세플라스틱, 미세먼지, 대기오염, 인스턴트 식품 등 우리의 건강을 해치는 요소들이 우리 주변에 만연해 있으나, 마땅한 대안이 부족한 실정입니다.'}
            </li>
          </ul>
        </div>

        {/* Section 2: Promise */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {language === 'en' ? "MOASD's Promise" : '모아에스디의 약속'}
          </h2>
          <p className="text-sm text-slate-400">
            {language === 'en'
              ? 'MOASD Co., Ltd. aims to achieve the following through innovative SAM material technology:'
              : '(주)모아에스디는 혁신적인 SAM 소재 기술을 통해 다음을 실현하고자 합니다.'}
          </p>
          <ol className="space-y-3.5 text-sm text-slate-300 pl-4 list-decimal marker:text-cyan-400 font-medium">
            <li>
              <span className="text-white font-bold">{language === 'en' ? 'Promoting Human Health: ' : '인류의 건강 증진: '}</span>
              <span className="text-slate-350 font-normal">
                {language === 'en'
                  ? 'Reducing environmental pollutants to build a healthier living environment.'
                  : '환경 오염원을 줄여 보다 건강한 삶의 터전을 만듭니다.'}
              </span>
            </li>
            <li>
              <span className="text-white font-bold">{language === 'en' ? 'Protecting Earth\'s Environment: ' : '지구 환경 보호: '}</span>
              <span className="text-slate-350 font-normal">
                {language === 'en'
                  ? 'Proposing practical solutions to mitigate severe environmental pollution.'
                  : '심각한 환경 오염을 줄이기 위한 실질적인 해결책을 제시합니다.'}
              </span>
            </li>
            <li>
              <span className="text-white font-bold">{language === 'en' ? 'Practicing Carbon Neutrality: ' : '탄소 중립 실천: '}</span>
              <span className="text-slate-350 font-normal">
                {language === 'en'
                  ? 'Leading the way in cutting carbon emissions to build a sustainable future.'
                  : '이산화탄소 배출 절감에 앞장서 지속 가능한 미래를 구축합니다.'}
              </span>
            </li>
          </ol>
        </div>

        {/* Footer/Motto Block */}
        <div className="pt-8 border-t border-white/5">
          <p className="text-sm sm:text-base font-bold text-slate-200 text-center italic">
            {language === 'en'
              ? '“MOASD Co., Ltd. will continue to conduct endless research and do its utmost for a better planet and a healthier tomorrow.”'
              : '“(주)모아에스디는 더 나은 지구와 건강한 내일을 위해 끊임없이 연구하고 최선을 다하겠습니다.”'}
          </p>
        </div>

      </article>
    </div>
  ) : currentTab === 'solutions' ? (
    <div className="pt-24 min-h-[85vh] bg-slate-950">
      {/* 4. Representative Services Slider Panel (3D Carousel) */}
      <section id="services-section" className="py-12 bg-gradient-to-b from-transparent via-slate-950/40 to-transparent relative">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> KEY SYSTEM SOLUTIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight animate-fade-in">
            {t('solutions.title', 'Our Solutions', '솔루션')}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'solutions.desc',
              'Explore our 5 core technology and industrial portfolios, including renewable grids, high-capacity power banks, e-mobility portfolios, US CAS-registered SAM materials, and discharge-free HGE3D00 generators.',
              '신재생에너지 스마트 그리드와 고성능 파워뱅크, 전기 모빌리티 구동체, 미국 CAS 공인 SAM 신소재의 유기적 공급 등 5가지 핵심 비즈니스 포트폴리오를 탐색해 보십시오.'
            )}
          </p>
        </div>

        {/* Tabbed Solutions detailed content rendering */}
        {activeSolutionIdx === 3 && activeSubTab ? (
          <SamPolishingSolutions activeTab={activeSubTab} setActiveTab={setActiveSubTab} />
        ) : (
          <ThreeDCarousel activeIndex={activeSolutionIdx} setActiveIndex={setActiveSolutionIdx} />
        )}
      </section>
    </div>
  ) : currentTab === 'partners' ? (
    <div className="pt-24 min-h-[85vh] bg-slate-950 relative">
      {/* Sticky Right-side Dot Navigation for Desktop */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3.5 bg-slate-900/60 border border-white/5 p-4 rounded-full backdrop-blur-md shadow-xl">
        {MOASD_CASES.map((caseRef, index) => (
          <button
            key={caseRef.id}
            onClick={() => {
              const el = document.getElementById(`case-section-${caseRef.id}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            title={language === 'en' ? caseRef.clientEn : caseRef.client}
            className="w-3.5 h-3.5 rounded-full transition-all border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400/80 bg-slate-950 flex items-center justify-center group relative cursor-pointer"
          >
            <span className="absolute right-7 bg-slate-950/90 border border-white/10 text-[10px] font-mono text-cyan-400 font-extrabold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
              0{index + 1} • {language === 'en' ? caseRef.clientEn : caseRef.client}
            </span>
          </button>
        ))}
      </div>

      <section className="py-8 max-w-7xl mx-auto px-6 relative space-y-12">
        {/* Main Header */}
        <div className="text-center mb-6 space-y-3 border-b border-white/5 pb-10">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> PARTNER ECOSYSTEM
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in">
            {t('partners.title', 'Partner Collaborations', '협력기업')}
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            {t(
              'partners.desc',
              'Explore our core partner network, collaborating on breakthrough energy and manufacturing integrations.',
              '주요 협력기업들이 (주)MOASD와 연계하여 축적해 온 실증 오퍼레이팅 성과 및 전력 혁신 지표 기록서입니다.'
            )}
          </p>
          
          {/* Quick Smooth Anchor Link Jump Bar */}
          <div className="pt-5 flex flex-wrap justify-center gap-3.5">
            {MOASD_CASES.map((caseRef, idx) => (
              <button
                key={caseRef.id}
                onClick={() => {
                  const el = document.getElementById(`case-section-${caseRef.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-400/30 text-xs text-slate-300 hover:text-white font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[10px] font-mono text-cyan-400">0{idx + 1}</span>
                {language === 'en' ? caseRef.clientEn : caseRef.client}
              </button>
            ))}
          </div>
        </div>

        {/* Sequentially stacked full-page sections */}
        <div className="space-y-24">
          {/* 1. (주)두현인프라텍 (Doohyun Infratech Co., Ltd.) */}
          <div 
            id="case-section-case-1" 
            className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center py-10 lg:py-16 border-b border-white/5 last:border-0 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 md:p-8 lg:p-12 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/4 w-96 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5 relative z-10">
                <div className="space-y-1.5 text-left">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-400 font-mono">
                    <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-2.5 py-1 rounded-md">
                      {language === 'en' ? 'COOPERATING ENTERPRISE 01' : '핵심 협력기업 01'}
                    </span>
                    <span>• {language === 'en' ? 'Official Corporate Profile' : '공식 기업 소개'}</span>
                  </div>
                  <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight">
                    {language === 'en' ? 'Doohyun Infratech Co., Ltd.' : '두현인프라텍(주)'}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-400 font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  PARTNER SINCE 2024
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
                {/* Left column: Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
                  {/* Slogan Quote Banner */}
                  <div className="relative pl-5 border-l-4 border-cyan-400 py-3 bg-gradient-to-r from-cyan-950/25 to-transparent rounded-r-2xl">
                    <p className="text-lg md:text-xl font-extrabold text-white tracking-tight leading-snug">
                      {language === 'en' 
                        ? '"We will continuously research based on experience gained through numerous failures."' 
                        : '"수많은 실패를 통한 경험을 바탕으로 끊임없이 연구하겠습니다."'
                      }
                    </p>
                  </div>

                  {/* Main Introduction Body Paragraphs */}
                  <div className="space-y-4 text-xs md:text-[13px] text-slate-300 leading-relaxed font-medium">
                    <p>
                      {language === 'en' ? (
                        <>
                          The trend of <strong className="text-cyan-400 font-bold">renewable energy</strong> is constantly evolving. Energy has undergone continuous transformation from fossil fuels to oil, nuclear power, and renewable wind power.
                        </>
                      ) : (
                        <>
                          <strong className="text-cyan-400 font-bold">신재생 에너지</strong>의 트렌드는 지속적으로 진화를 하고 있습니다. 에너지는 화석에서 석유로 원자력, 신재생 풍력으로 끊임없이 변화를 거듭하여 왔습니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          Larger-scale, higher-power plants are being built, transitioning to eco-friendly electric energy, and the production capacity of electric energy has become a benchmark that determines a nation's status.
                        </>
                      ) : (
                        <>
                          대규모, 더 많은 파워가 건설되고, 친환경적인 전기 에너지로 바뀌어 가고 있으며, 전기 에너지의 생산 능력이 국가의 위상을 결정하는 가늠자가 되고 있습니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          With the goal of responding to these demands of our times, we have continuously researched ways to store energy, and based on our experience gained through numerous failures, we have developed a more <strong className="text-white font-bold">progressive energy storage technology</strong>.
                        </>
                      ) : (
                        <>
                          우리는 이러한 시대적 요구 사항에 부응해 나간다는 목표로, 에너지를 저장할 수 있는 방법에 대하여 끊임없이 연구를 하고, 수많은 실패를 통한 경험을 바탕으로 하여 보다 <strong className="text-white font-bold">진보적인 에너지 저장기술</strong>을 개발하였습니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          The wisest way to store energy is through <strong className="text-cyan-400 font-bold">supercapacitors</strong>, and we will continue to manufacture various energy storage devices utilizing them. Supercapacitors will be the energy storage devices that are faster, have a longer lifespan, and prioritize the health of the global environment.
                        </>
                      ) : (
                        <>
                          에너지의 저장에서 가장 현명한 방법은 <strong className="text-cyan-400 font-bold">슈퍼 커패시터</strong>이며, 이를 이용한 다양한 에너지 저장 장치를 생산해 나갈 것입니다. 보다 빠르게, 보다 긴 수명을 가지고 있으면서도, 지구 환경의 건강을 생각하는 에너지 저장 장치는 슈퍼 커패시터가 될 것입니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          Along with our innovative energy storage technology and the advancement of the materials industry, our company will bring about a rapid transition from secondary batteries to the era of supercapacitors. We strongly believe that <strong className="text-white font-bold">hybrid supercapacitor energy storage</strong> is the absolute best way to protect the global environment.
                        </>
                      ) : (
                        <>
                          당사는 우리가 가지고 있는 에너지 저장기술의 신기술과 함께 소재산업의 발전에 따라서, 2차 배터리에서 슈퍼 커패시터의 시대로 급격한 변화를 가져올 것이며, 지구의 환경을 지키는 최선의 방법이 <strong className="text-white font-bold">하이브리드 슈퍼 커패시터의 에너지 저장</strong>임이 확실하다고 생각합니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          We, Doohyun Infratech, will contribute to <strong className="text-cyan-400 font-bold">sustaining a prosperous life for humanity</strong> by creating energy storage technologies needed by a world dedicated to human life.
                        </>
                      ) : (
                        <>
                          우리 두현인프라텍은 인간의 생활을 위한 세상이 필요로 하는 에너지 저장기술을 만들어 나감으로써 <strong className="text-cyan-400 font-bold">인류의 윤택한 삶이 지속 가능</strong>하도록 기여해 나갈 것입니다.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right column: Image ONLY with Admin controls */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 group bg-slate-900/60 aspect-[4/3] lg:h-[480px] w-full shadow-2xl flex items-center justify-center">
                    <img 
                      src={partnerImages['case-1'] || "/src/assets/images/generator_assembly_line_1781624380514.jpg"} 
                      alt="Doohyun Infratech Corporate Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    


                    {/* Admin Image control overlay */}
                    {isAdminUser && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                        <label className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-cyan-400 border border-white/15 cursor-pointer shadow-lg hover:shadow-cyan-400/25 transition-all flex items-center gap-1.5 text-xs font-bold">
                          <Upload className="w-4 h-4" />
                          <span>{language === 'en' ? 'Upload' : '업로드/수정'}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handlePartnerImageUpload('case-1', e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {partnerImages['case-1'] && (
                          <button
                            onClick={() => handlePartnerImageDelete('case-1')}
                            className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-white/15 cursor-pointer shadow-lg transition-all flex items-center gap-1.5 text-xs font-bold"
                            title={language === 'en' ? 'Delete / Reset' : '이미지 삭제'}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>{language === 'en' ? 'Delete' : '삭제'}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 2. (주)신화에너지솔루션 (Shinhwa Energy Solution Co., Ltd.) */}
          <div 
            id="case-section-case-2" 
            className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center py-10 lg:py-16 border-b border-white/5 last:border-0 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 md:p-8 lg:p-12 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/3 w-96 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5 relative z-10">
                <div className="space-y-1.5 text-left">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-emerald-400 font-mono">
                    <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-2.5 py-1 rounded-md">
                      {language === 'en' ? 'COOPERATING ENTERPRISE 02' : '핵심 협력기업 02'}
                    </span>
                    <span>• {language === 'en' ? 'Official Corporate Profile' : '공식 기업 소개'}</span>
                  </div>
                  <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight">
                    {language === 'en' ? 'Shinhwa Energy Solution Co., Ltd.' : '(주)신화에너지솔루션'}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs text-emerald-400 font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PARTNER SINCE 2024
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
                {/* Left column: Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
                  {/* Slogan Quote Banner */}
                  <div className="relative pl-5 border-l-4 border-emerald-400 py-3 bg-gradient-to-r from-emerald-950/25 to-transparent rounded-r-2xl">
                    <p className="text-lg md:text-xl font-extrabold text-white tracking-tight leading-snug">
                      {language === 'en' 
                        ? '"Shinhwa Energy Solution: An Eco-Friendly Energy Leader Restoring Nature and Leading a Sustainable Future"' 
                        : '"죽어가는 자연을 살리고 지속 가능한 미래를 선도하는 친환경 에너지 리더, (주)신화에너지솔루션"'
                      }
                    </p>
                  </div>

                  {/* Main Introduction Body Paragraphs */}
                  <div className="space-y-4 text-xs md:text-[13px] text-slate-300 leading-relaxed font-medium">
                    <p>
                      {language === 'en' ? (
                        <>
                          Recognizing the gravity of global warming and climate change, the entire world is moving toward carbon neutrality. Within this massive shift, <strong className="text-white font-bold">Shinhwa Energy Solution Co., Ltd.</strong> is striving as a specialized enterprise in low-carbon core infrastructure to hand over a healthy planet to future generations.
                        </>
                      ) : (
                        <>
                          지구 온난화와 기후 변화로 인한 심각성을 인식하고, 전 세계가 탄소 중립을 향해 나아가고 있습니다. 이 거대한 흐름 속에서 <strong className="text-white font-bold">(주)신화에너지솔루션</strong>은 탄소 중립 실현을 위한 저탄소 핵심 인프라 분야의 전문 기업으로서, 미래 세대에게 건강한 지구를 물려주기 위해 노력하고 있습니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          Our company possesses key technology to resolve the chronic issue of irregular output fluctuations in renewable power generation such as wind and solar energy. Through smart grid-based intelligent power grid systems and high-performance electricity storage technologies, we enable highly stable power distribution and construct low-carbon infrastructures to ensure clean energy is utilized efficiently without waste. This is a technology that contributes to building a sustainable energy ecosystem that the Earth can bear, going far beyond mere energy supply.
                        </>
                      ) : (
                        <>
                          저희 기업은 풍력과 태양광 등 신재생에너지 발전의 고질적인 문제였던 불규칙한 출력 변동을 해결하는 핵심 기술력을 보유하고 있습니다. 스마트 그리드 기반의 지능형 전력망 기술과 고성능 축전 기술을 통해 안정적인 전력 공급을 가능하게 하며, 깨끗한 에너지가 낭비 없이 효율적으로 사용될 수 있도록 저탄소 인프라를 구축합니다. 이는 단순한 에너지 공급을 넘어, 지구가 감당할 수 있는 지속 가능한 에너지 생태계를 만드는 데 기여하는 기술입니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          Rather than settling for the present, <strong className="text-emerald-400 font-bold">Shinhwa Energy Solution</strong> is dedicating its efforts to innovative item development and research with a mindset that prioritizes our dying nature and environment. We aim to discover new materials and technologies that will serve as the foundation of future industries, propose innovative solutions for climate crisis response through proactive research and development (R&D), and leap forward as an industry-leading eco-friendly enterprise.
                        </>
                      ) : (
                        <>
                          <strong className="text-emerald-400 font-bold">(주)신화에너지솔루션</strong>은 현재에 안주하지 않고, 죽어가는 자연과 환경을 먼저 생각하는 마음으로 획기적인 아이템 개발과 연구에 매진하고 있습니다. 미래 산업의 기반이 될 신소재와 신기술을 발굴하고, 선제적인 연구개발(R&D)을 통해 기후 위기 대응을 위한 혁신적인 솔루션을 제시하며, 업계를 선도하는 친환경 선도기업으로 도약하고자 합니다.
                        </>
                      )}
                    </p>
                    <p>
                      {language === 'en' ? (
                        <>
                          We dream of a sustainable future where human prosperity and environmental preservation coexist. We ask for your keen interest and support in our valuable journey toward clean energy. Shinhwa Energy Solution will walk beside you so that the Earth can breathe once again.
                        </>
                      ) : (
                        <>
                          인류의 번영과 환경 보전이 함께할 수 있는 지속 가능한 미래를 꿈꿉니다. 깨끗한 에너지를 향한 여정, (주)신화에너지솔루션의 가치 있는 도전에 많은 관심과 성원을 부탁드립니다. 지구가 다시 숨 쉴 수 있도록, (주)신화에너지솔루션이 함께하겠습니다.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right column: Image ONLY with Admin controls */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 group bg-slate-900/60 aspect-[4/3] lg:h-[480px] w-full shadow-2xl flex items-center justify-center">
                    <img 
                      src={partnerImages['case-2'] || "/src/assets/images/supercapacitor_factory_1781621879548.jpg"} 
                      alt="Shinhwa Energy Solution Corporate Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    


                    {/* Admin Image control overlay */}
                    {isAdminUser && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                        <label className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-cyan-400 border border-white/15 cursor-pointer shadow-lg hover:shadow-cyan-400/25 transition-all flex items-center gap-1.5 text-xs font-bold">
                          <Upload className="w-4 h-4" />
                          <span>{language === 'en' ? 'Upload' : '업로드/수정'}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handlePartnerImageUpload('case-2', e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {partnerImages['case-2'] && (
                          <button
                            onClick={() => handlePartnerImageDelete('case-2')}
                            className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-white/15 cursor-pointer shadow-lg transition-all flex items-center gap-1.5 text-xs font-bold"
                            title={language === 'en' ? 'Delete / Reset' : '이미지 삭제'}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>{language === 'en' ? 'Delete' : '삭제'}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. SAM신소재R&D (SAM Materials R&D) */}
          <div 
            id="case-section-case-3" 
            className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center py-10 lg:py-16 border-b border-white/5 last:border-0 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 md:p-8 lg:p-12 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 w-96 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5 relative z-10">
                <div className="space-y-1.5 text-left">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-400 font-mono">
                    <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-2.5 py-1 rounded-md">
                      {language === 'en' ? 'COOPERATING ENTERPRISE 03' : '핵심 협력기업 03'}
                    </span>
                    <span>• {language === 'en' ? 'Official Corporate Profile' : '공식 기업 소개'}</span>
                  </div>
                  <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight leading-tight">
                    {language === 'en' ? 'SAM Materials R&D' : 'SAM신소재R&D'}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-400 font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  PARTNER SINCE 2024
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
                {/* Left column: Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
                  {/* Slogan Quote Banner */}
                  <div className="relative pl-5 border-l-4 border-cyan-400 py-3 bg-gradient-to-r from-cyan-950/25 to-transparent rounded-r-2xl">
                    <p className="text-lg md:text-xl font-extrabold text-white tracking-tight leading-snug">
                      {language === 'en' 
                        ? '"SAM (Super Activity Material) - The Core Material of Future Industries, South Korea\'s Peak Technology"' 
                        : '"SAM(Super Activity Material) - 미래 산업의 핵심 소재, 대한민국 최고 기술"'
                      }
                    </p>
                  </div>

                  {/* Main Introduction Body Paragraphs */}
                  <div className="space-y-4 text-xs md:text-[13px] text-slate-300 leading-relaxed font-medium">
                    <p>
                      {language === 'en' ? (
                        <>
                          <strong className="text-cyan-400 font-bold">SAM (Super Activity Material)</strong> is an innovative new substance officially registered with the US CAS, symbolizing South Korea\'s cutting-edge material technology. SAM is attracting immense attention as a core material that drastically improves performance and functionality across existing industries or enables the implementation of completely new technologies.
                        </>
                      ) : (
                        <>
                          <strong className="text-cyan-400 font-bold">SAM(Super Activity Material)</strong>은 미국 CAS에 정식 등록된 혁신적인 신물질로, 대한민국의 최첨단 소재 기술력을 상징합니다. SAM은 기존 산업 전반에 적용되어 성능과 기능을 획기적으로 개선하거나, 완전히 새로운 기술 구현을 가능하게 하는 핵심 소재로 주목받고 있습니다.
                        </>
                      )}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {language === 'en' ? 'Key Application Areas Summary' : '[주요 응용 분야 핵심 요약]'}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          {
                            id: 1,
                            titleKo: "국방",
                            titleEn: "Defense",
                            descKo: "육군 탱크, 대포, 총기류의 합금 코팅으로 성능 강화, 해군 잠수함 및 선박 코팅을 통해 따개비 및 염해 방지, 공군 스텔스 기능 및 드론 유체저항/강도 개선.",
                            descEn: "Reinforcing army tanks, artillery, and firearms alloy coatings; anti-fouling/salt-damage prevention for navy submarines and ships; stealth functions and drone fluid resistance/strength improvements."
                          },
                          {
                            id: 2,
                            titleKo: "에너지",
                            titleEn: "Energy",
                            descKo: "청정에너지 ORC 발전기, 수소 연료, 산업용 보일러 및 스팀 시스템, 축전지 성능 개선.",
                            descEn: "Clean energy ORC generators, hydrogen fuels, industrial boilers/steam systems, and battery performance enhancement."
                          },
                          {
                            id: 3,
                            titleKo: "환경",
                            titleEn: "Environment",
                            descKo: "화력발전소, 제철소 등의 배기가스 저감, 폐수 수처리 및 악취 제거, 선박평형수 처리.",
                            descEn: "Emission reduction for power plants and steel mills; wastewater treatment, odor removal, and ballast water treatment."
                          },
                          {
                            id: 4,
                            titleKo: "건설",
                            titleEn: "Construction",
                            descKo: "구조체 기능 개선 및 강도/부식 방지, 해양 구조물, 유리, 냉난방 청정 시스템 적용.",
                            descEn: "Structural function enhancement, strength improvement, corrosion prevention; marine structures, glass, and HVAC clean systems."
                          },
                          {
                            id: 5,
                            titleKo: "자동차/고속철도",
                            titleEn: "Automotive & Rail",
                            descKo: "수소차 엔진 메니폴드 및 부품 플라스틱, 차량 유리, 공기청정 시스템, 고속열차 브레이크 패드 및 디스크 합금 코팅.",
                            descEn: "Hydrogen vehicle engine manifolds and plastic parts; vehicle glass, air purification systems, high-speed train brake pads and disk alloy coatings."
                          },
                          {
                            id: 6,
                            titleKo: "조선/산업설비",
                            titleEn: "Marine & Plants",
                            descKo: "선박 스크류 따개비 방지 코팅, 수출 컨테이너, 유전/정유 시설 코팅 및 송유관 부식 방지.",
                            descEn: "Anti-fouling screw coatings, export containers, oil field/refining facility coatings, and pipeline corrosion prevention."
                          },
                          {
                            id: 7,
                            titleKo: "농·어·축산/생활",
                            titleEn: "Agriculture & Daily Life",
                            descKo: "건조 가공 및 수출 포장 시스템, 기능성 가전(정수기, 가습기), 건강 케어 제품 및 기능성 의류.",
                            descEn: "Drying processing and export packaging systems; functional appliances (water purifiers, humidifiers), health care products, and functional apparel."
                          }
                        ].map((app) => (
                          <div key={app.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-400/10">0{app.id}</span>
                              <span>{language === 'en' ? app.titleEn : app.titleKo}</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-400 font-normal">
                              {language === 'en' ? app.descEn : app.descKo}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="pt-2">
                      {language === 'en' ? (
                        <>
                          Based on South Korea\'s peak material technology, <strong className="text-cyan-400 font-bold">SAM</strong> will serve as an innovative driving force leading various future industries worldwide and guiding sustainable development.
                        </>
                      ) : (
                        <>
                          <strong className="text-cyan-400 font-bold">SAM</strong>은 대한민국 최고의 소재 기술력을 바탕으로, 전 세계 다양한 미래 산업을 선도하며 지속 가능한 발전을 이끄는 혁신 동력이 될 것입니다.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right column: Image ONLY with Admin controls */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 group bg-slate-900/60 aspect-[4/3] lg:h-[480px] w-full shadow-2xl flex items-center justify-center">
                    <img 
                      src={partnerImages['case-3'] || "/src/assets/images/sam_material_lab_1781624876856.jpg"} 
                      alt="SAM Materials Corporate Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent animate-fade-in" />
                    


                    {/* Admin Image control overlay */}
                    {isAdminUser && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                        <label className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-cyan-400 border border-white/15 cursor-pointer shadow-lg hover:shadow-cyan-400/25 transition-all flex items-center gap-1.5 text-xs font-bold">
                          <Upload className="w-4 h-4" />
                          <span>{language === 'en' ? 'Upload' : '업로드/수정'}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handlePartnerImageUpload('case-3', e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {partnerImages['case-3'] && (
                          <button
                            onClick={() => handlePartnerImageDelete('case-3')}
                            className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-white/15 cursor-pointer shadow-lg transition-all flex items-center gap-1.5 text-xs font-bold"
                            title={language === 'en' ? 'Delete / Reset' : '이미지 삭제'}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>{language === 'en' ? 'Delete' : '삭제'}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer footer at the bottom of the section */}
        <div className="pt-8 border-t border-white/5 text-[10px] text-slate-500 font-mono text-center">
          {t(
            'cases.disclaimer',
            '※ This information consists of actual operating logs adjusted under our standard information safety protocols.',
            '※ 해당 정보는 정보 관리 협약 하에 가공 수치 조정 처리된 실증 오퍼레이팅 기록서입니다.'
          )}
        </div>
      </section>
    </div>
  ) : currentTab === 'mediacenter' ? (
    <div className="pt-16 min-h-[85vh] bg-slate-950">
      <MediaCenter language={language} />
    </div>
  ) : currentTab === 'products' ? (
    <div className="pt-16 min-h-[85vh] bg-slate-950">
      <Products language={language} />
    </div>
  ) : currentTab === 'support' ? (
    <div className="pt-16 min-h-[85vh] bg-slate-950">
      <CustomerSupport 
        language={language}
        isSignedUp={isSignedUp}
        registeredUser={registeredUser}
        onOpenLoginModal={() => {
          setLoginError('');
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  ) : (
    <div className="pt-16 min-h-[85vh] bg-slate-950">
      <Admin 
        language={language}
        registeredUser={registeredUser}
        setRegisteredUser={setRegisteredUser}
        setIsSignedUp={setIsSignedUp}
      />
    </div>
  )}

      {/* 8. Modern Professional footer coordinates layout */}
      <footer id="contact-section" className="border-t border-white/5 bg-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Brand left (5 cols) */}
          <div className="space-y-4 md:col-span-5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <CompanyLogoIcon className="w-8 h-8" />
              <span className="text-base font-extrabold text-white font-sans tracking-tight">
                {language === 'en' ? "MOASD Co., Ltd." : "(주)MOASD"}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              {language === 'en' 
                ? "We diagnose the core measurement structures of complex business pipelines, providing fully automated reporting systems and practical consulting solutions with zero manual intervention."
                : "우리는 복잡한 비즈니스 파이프라인의 핵심 실측 구조를 진단하고 수작업을 배제한 완벽한 자동 보고 체계와 실전형 컨설팅 솔루션을 제공합니다."
              }
            </p>
            <div className="text-xs text-slate-600 font-mono">
              Copyright © 2026 {language === 'en' ? "MOASD Co., Ltd." : "(주)MOASD"}. All Rights Reserved.
            </div>
          </div>

          {/* Coordinates Details Right (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-slate-400 text-center sm:text-left">
            {/* Services navigation links */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-300 tracking-wider">
                {language === 'en' ? "Focus Service Pipelines" : "포커스 서비스 파이프라인"}
              </h4>
              <ul className="space-y-2 text-slate-500 leading-relaxed font-sans">
                {language === 'en' ? (
                  <>
                    <li>• Custom architecture solution matchmaking</li>
                    <li>• Strategic planning & sales process alignment</li>
                    <li>• Multi-team collaboration design</li>
                    <li>• Metric-centric OKR and KPI command setups</li>
                    <li>• Automated report dispatch & BI integration</li>
                  </>
                ) : (
                  <>
                    <li>• 맞춤 아키텍처 솔루션 제공 및 매치업</li>
                    <li>• 전략 수립 및 영업 프로세스 무결화</li>
                    <li>• 전사 협업 라인업 플랫폼 이식</li>
                    <li>• 지표 중심 OKR 실적 관리 대치판 설치</li>
                    <li>• 보고서 자동화 및 BI 데이터 다이렉트화</li>
                  </>
                )}
              </ul>
            </div>

            {/* Corporate Address & Registry codes */}
            <div className="space-y-3 text-slate-500 leading-normal">
              <h4 className="font-bold text-slate-300 tracking-wider">
                {language === 'en' ? "Corporate Information" : "기업 정보"}
              </h4>
              <p>
                <strong>{language === 'en' ? "Company Name:" : "상호명:"}</strong> {language === 'en' ? "MOASD Co., Ltd." : "(주)MOASD (주식회사 모아에스디)"}
              </p>
              <p>
                <strong>{language === 'en' ? "Primary Mission:" : "설립역할:"}</strong> {language === 'en' ? "Core enterprise solutions & coaching consultation" : "기업 핵심 솔루션 제공 및 실무 코칭 컨설팅"}
              </p>
              <p>
                <strong>{language === 'en' ? "Services:" : "사업내역:"}</strong> {language === 'en' ? "Business process scaling & SI systems integration" : "비즈니스 프로세스 개선 컨설팅 및 SI 솔루션 연동"}
              </p>
              <p>
                <strong>{language === 'en' ? "Contact Sales:" : "수신 연락처:"}</strong> sinhwaensol@gmail.com
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="font-bold text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  {language === 'en' ? "Privacy Policy" : "개인정보처리방침"}
                </button>
                <span className="text-slate-600 text-[11px] select-none">|</span>
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="font-bold text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  {language === 'en' ? "Terms of Service" : "이용약관"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* CAS Video Modal Dialog */}
      <AnimatePresence>
        {isCasVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsCasVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white tracking-tight">
                    {language === 'en' ? 'American CAS Registered New Materials Introduction' : '미국 CAS 등재 SAM 신물질 소개 영상 (쌤물질이란?)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCasVideoOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video body */}
              <div className="p-4 md:p-6 bg-slate-950/30">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-inner bg-black">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/UC8dv8s2z7A?autoplay=1" 
                    title="쌤물질이란" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Footer info description */}
              <div className="p-4 border-t border-white/5 bg-slate-950/20 text-xs text-slate-400 leading-relaxed font-sans">
                <p>
                  {language === 'en' 
                    ? '(주)MOASD integrates world-class US CAS-registered SAM materials, pioneering state-of-the-art power bank systems.'
                    : '전지 표전 혁신을 이끄는 미국 CAS 공식 제정 독점 SAM 신물질(쌤물질) 설명 홍보 영상자료입니다.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B2B Partner Dedicated Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-tight">
                    {language === 'en' ? 'B2B Partner & General Login Portal' : '통합 전력망 로그인 포탈'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-0 bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Selector inside Modal */}
              <div className="px-6 pt-5 pb-1 bg-slate-950/20">
                <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-white/5 font-sans">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginModalTab('partner');
                      setLoginError('');
                      setLoginEmailOrName('');
                      setLoginPassword('');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border-0 ${
                      loginModalTab === 'partner'
                        ? 'bg-cyan-400 text-slate-950 font-extrabold shadow-md'
                        : 'text-slate-400 hover:text-slate-200 bg-transparent'
                    }`}
                  >
                    {language === 'en' ? 'B2B Partner' : 'B2B 파트너'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginModalTab('general');
                      setLoginError('');
                      setLoginEmailOrName('');
                      setLoginPassword('');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border-0 ${
                      loginModalTab === 'general'
                        ? 'bg-cyan-400 text-slate-950 font-extrabold shadow-md'
                        : 'text-slate-400 hover:text-slate-200 bg-transparent'
                    }`}
                  >
                    {language === 'en' ? 'General Member' : '일반회원'}
                  </button>
                </div>
              </div>

              {/* Login form body */}
              <form onSubmit={(e) => {
                e.preventDefault();
                setLoginError('');

                const inputVal = loginEmailOrName.trim();
                const inputPass = loginPassword.trim();

                const membersSaved = localStorage.getItem('moasd_member_list');
                const membersList = membersSaved ? JSON.parse(membersSaved) : [];
                const userPassesSaved = localStorage.getItem('moasd_user_passwords');
                const userPasses = userPassesSaved ? JSON.parse(userPassesSaved) : {};

                // 0. Check Master Admin
                const MASTER_ADMIN_PASS = '0815)*!%';
                if (
                  (inputVal === '장세창' || inputVal === 'sinhwaensol@gmail.com' || inputVal === 'master') &&
                  inputPass === MASTER_ADMIN_PASS
                ) {
                  const masterUser = {
                    email: 'sinhwaensol@gmail.com',
                    name: '장세창 최고관리자',
                    company: '(주)MOASD',
                    phone: '010-2242-7801',
                    regDate: new Date().toLocaleDateString(),
                    role: 'partner' as 'general' | 'partner',
                    partnerCode: 'MOASD_PARTNER'
                  };
                  
                  const adminSession = {
                    id: 'master-admin',
                    name: '장세창 최고관리자',
                    roleLabel: 'S',
                    loginTime: new Date().toISOString()
                  };
                  sessionStorage.setItem('moasd_admin_session', JSON.stringify(adminSession));
                  sessionStorage.setItem('moasd_partner_user', JSON.stringify(masterUser));
                  setRegisteredUser(masterUser);
                  setIsSignedUp(true);
                  setDownloadApprovals({});
                  setIsLoginModalOpen(false);
                  alert(language === 'en' ? 'Welcome back Master Administrator!' : '최고 마스터 관리자님, 환영합니다!');
                  return;
                }

                if (loginModalTab === 'partner') {
                  const digitsVal = inputVal.replace(/[^0-9]/g, '');
                  if (!digitsVal) {
                    setLoginError(language === 'en' ? 'Please enter only digits for the Partner Code.' : '가입하신 파트너 코드번호(숫자)를 입력하여 주십시오.');
                    return;
                  }
                  
                  const searchCode = `M-${digitsVal}`;
                  const matchedMember = membersList.find((m: any) => 
                    m.partnerCode && m.partnerCode.toUpperCase() === searchCode.toUpperCase()
                  );

                  if (matchedMember) {
                    const savedPass = userPasses[matchedMember.email];
                    if (savedPass && savedPass === inputPass) {
                      sessionStorage.setItem('moasd_partner_user', JSON.stringify(matchedMember));
                      setRegisteredUser(matchedMember);
                      setIsSignedUp(true);
                      setDownloadApprovals({});
                      setIsLoginModalOpen(false);
                      alert(language === 'en' ? `Successfully logged in as B2B Partner ${matchedMember.name}!` : `B2B 파트너 "${matchedMember.name}" 님으로 성공적으로 로그인되었습니다.`);
                      return;
                    } else {
                      setLoginError(language === 'en' ? 'Incorrect password.' : '비밀번호가 일치하지 않습니다.');
                      return;
                    }
                  }

                  // Try backup user check
                  const storedLocalUserStr = localStorage.getItem('moasd_partner_user_backup');
                  if (storedLocalUserStr) {
                    const storedLocalUser = JSON.parse(storedLocalUserStr);
                    if (storedLocalUser.partnerCode && storedLocalUser.partnerCode.toUpperCase() === searchCode.toUpperCase()) {
                      const savedPass = userPasses[storedLocalUser.email];
                      if (!savedPass || savedPass === inputPass) {
                        sessionStorage.setItem('moasd_partner_user', JSON.stringify(storedLocalUser));
                        setRegisteredUser(storedLocalUser);
                        setIsSignedUp(true);
                        setDownloadApprovals({});
                        setIsLoginModalOpen(false);
                        alert(language === 'en' ? `Successfully logged in as B2B Partner ${storedLocalUser.name}!` : `B2B 파트너 "${storedLocalUser.name}" 님으로 성공적으로 로그인되었습니다.`);
                        return;
                      }
                    }
                  }

                  setLoginError(
                    language === 'en'
                      ? 'No matching registered B2B Partner account found.'
                      : '가입된 B2B 파트너 정보를 찾을 수 없습니다. 코드번호와 비밀번호를 다시 확인해주십시오.'
                  );
                } else {
                  // General Member Login without Partner Code
                  if (!inputVal) {
                    setLoginError(language === 'en' ? 'Please enter your registered Email ID.' : '가입하신 이메일 ID를 입력해 주십시오.');
                    return;
                  }

                  const matchedMember = membersList.find((m: any) => 
                    m.email && m.email.toLowerCase() === inputVal.toLowerCase()
                  );

                  if (matchedMember) {
                    const savedPass = userPasses[matchedMember.email];
                    if (savedPass && savedPass === inputPass) {
                      sessionStorage.setItem('moasd_partner_user', JSON.stringify(matchedMember));
                      setRegisteredUser(matchedMember);
                      setIsSignedUp(true);
                      setDownloadApprovals({});
                      setIsLoginModalOpen(false);
                      alert(language === 'en' ? `Successfully logged in as General Member ${matchedMember.name}!` : `일반회원 "${matchedMember.name}" 님으로 성공적으로 로그인되었습니다.`);
                      return;
                    } else {
                      setLoginError(language === 'en' ? 'Incorrect password.' : '비밀번호가 일치하지 않습니다.');
                      return;
                    }
                  }

                  // Fallback checking backup user in localStorage
                  const storedLocalUserStr = localStorage.getItem('moasd_partner_user_backup');
                  if (storedLocalUserStr) {
                    const storedLocalUser = JSON.parse(storedLocalUserStr);
                    if (storedLocalUser.email && storedLocalUser.email.toLowerCase() === inputVal.toLowerCase()) {
                      const savedPass = userPasses[storedLocalUser.email];
                      if (!savedPass || savedPass === inputPass) {
                        sessionStorage.setItem('moasd_partner_user', JSON.stringify(storedLocalUser));
                        setRegisteredUser(storedLocalUser);
                        setIsSignedUp(true);
                        setDownloadApprovals({});
                        setIsLoginModalOpen(false);
                        alert(language === 'en' ? `Successfully logged in as General Member ${storedLocalUser.name}!` : `일반회원 "${storedLocalUser.name}" 님으로 성공적으로 로그인되었습니다.`);
                        return;
                      }
                    }
                  }

                  setLoginError(
                    language === 'en'
                      ? 'No matching registered General Member account found.'
                      : '가입된 일반회원 정보를 찾을 수 없습니다. 이메일과 비밀번호를 다시 확인해주십시오.'
                  );
                }
              }} className="p-6 space-y-4 bg-slate-950/40 text-left font-sans">
                {loginError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 animate-pulse">
                    {loginError}
                  </div>
                )}
                
                {loginModalTab === 'partner' ? (
                  /* 1. B2B Partner Code Number Input */
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {language === 'en' ? 'B2B Partner Code Number' : 'B2B 파트너 회원가입 코드번호'}
                    </label>
                    
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-cyan-400 font-mono font-extrabold select-none">M-</span>
                      <input
                        type="text"
                        required
                        placeholder="12345"
                        value={loginEmailOrName.replace(/[^0-9]/g, '')}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setLoginEmailOrName(val);
                          setLoginError('');
                        }}
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-cyan-500/30 text-slate-100 focus:outline-none focus:border-cyan-400 font-mono transition-colors font-bold"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1">
                      {language === 'en'
                        ? "※ Enter only the numbers (digits) you registered during signup (e.g. 12345)."
                        : "※ 회원가입 시 입력 및 발급하신 숫자 코드번호만 입력해주십시오 (예: 12345)."}
                    </p>
                  </div>
                ) : (
                  /* 1. General Member Email/ID Input */
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      {language === 'en' ? 'Registered Email ID' : '가입된 이메일 주소'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="general@member.com"
                      value={loginEmailOrName}
                      onChange={(e) => {
                        setLoginEmailOrName(e.target.value);
                        setLoginError('');
                      }}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1">
                      {language === 'en'
                        ? "※ Please enter the email address you registered with."
                        : "※ 회원가입 시 기입하신 이메일 ID를 입력해주십시오."}
                    </p>
                  </div>
                )}

                {/* 2. Login Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                    <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                    {language === 'en' ? 'Password' : '비밀번호 입력'}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError('');
                    }}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 font-extrabold text-xs md:text-sm text-slate-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
                >
                  <CheckCircle2 className="w-4 h-4" /> 
                  {loginModalTab === 'partner'
                    ? (language === 'en' ? 'B2B Partner Log In' : 'B2B 파트너 로그인 완료')
                    : (language === 'en' ? 'General Log In' : '일반회원 로그인 완료')
                  }
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B2B Partner Sign Up Modal */}
      <AnimatePresence>
        {isSignUpModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsSignUpModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-y-auto max-h-[90vh] shadow-2xl shadow-cyan-500/10 p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsSignUpModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs text-cyan-400 font-mono tracking-wider">
                    <FileCheck2 className="w-4 h-4" /> SECURE PARTNER PORTAL
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {t('support.title', 'B2B Partner Sign Up', 'B2B 파트너 회원가입')}
                  </h3>
                </div>

                {!isSignedUp ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-5 bg-cyan-400 rounded-sm"></span>
                        {language === 'en' ? 'B2B Partner Sign Up' : 'B2B파트너 회원가입'}
                      </h4>
                      <form onSubmit={handleSignUpSubmit} className="space-y-4 p-6 rounded-2xl bg-slate-950/60 border border-white/5 text-left">
                        {signUpError && (
                          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                            {signUpError}
                          </div>
                        )}

                        {/* Form Fields arranged in horizontal groups */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Email Address */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <Mail className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Email Address (ID)' : '이메일 주소 (아이디)'}
                            </label>
                            <input
                              type="email"
                              required
                              id="signup-email"
                              placeholder="partner@company.com"
                              value={signUpEmail}
                              onChange={(e) => {
                                setSignUpEmail(e.target.value);
                                setSignUpError('');
                              }}
                              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors select-text"
                            />
                          </div>

                          {/* Contact phone */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Mobile Phone Number' : '연락처 번호'}
                            </label>
                            <input
                              type="tel"
                              required
                              id="signup-phone"
                              placeholder="010-0000-0000"
                              value={signUpPhone}
                              onChange={(e) => {
                                setSignUpPhone(e.target.value);
                                setSignUpError('');
                              }}
                              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                          </div>

                          {/* Password */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Password' : '비밀번호'}
                            </label>
                            <input
                              type="password"
                              required
                              id="signup-password"
                              placeholder="••••••"
                              value={signUpPassword}
                              onChange={(e) => {
                                setSignUpPassword(e.target.value);
                                setSignUpError('');
                              }}
                              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                          </div>

                          {/* Confirm Password */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Confirm' : '비밀번호 확인'}
                            </label>
                            <input
                              type="password"
                              required
                              id="signup-password-confirm"
                              placeholder="••••••"
                              value={signUpPasswordConfirm}
                              onChange={(e) => {
                                setSignUpPasswordConfirm(e.target.value);
                                setSignUpError('');
                              }}
                              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                          </div>

                          {/* Representative Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <User className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Full Name' : '담당자 성함'}
                            </label>
                            <input
                              type="text"
                              required
                              id="signup-name"
                              placeholder={language === 'en' ? 'John Doe' : '홍길동'}
                              value={signUpName}
                              onChange={(e) => {
                                setSignUpName(e.target.value);
                                setSignUpError('');
                              }}
                              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                          </div>

                          {/* Corporate Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Corporate Name' : '기업명 / 연구소명'}
                            </label>
                            <input
                              type="text"
                              required
                              id="signup-company"
                              placeholder={language === 'en' ? 'MOASD Lab' : '소속 기업/부서명'}
                              value={signUpCompany}
                              onChange={(e) => {
                                setSignUpCompany(e.target.value);
                                setSignUpError('');
                              }}
                              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                          </div>

                          {/* Member Classification Selection */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                              {language === 'en' ? 'Membership Level' : '가입 회원 유형 분류'}
                            </label>
                            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-white/10 font-sans">
                              <button
                                type="button"
                                onClick={() => {
                                  setSignUpRole('general');
                                  setSignUpError('');
                                }}
                                className={`py-2 text-[11.5px] font-bold rounded-lg transition-all border-0 cursor-pointer ${
                                  signUpRole === 'general'
                                    ? 'bg-slate-800 text-cyan-400 shadow'
                                    : 'text-slate-400 hover:text-slate-200 bg-transparent'
                                }`}
                              >
                                {language === 'en' ? 'General' : '일반회원 (코드없음)'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSignUpRole('partner');
                                  setSignUpError('');
                                }}
                                className={`py-2 text-[11.5px] font-bold rounded-lg transition-all border-0 cursor-pointer ${
                                  signUpRole === 'partner'
                                    ? 'bg-slate-800 border-0 text-purple-400 shadow'
                                    : 'text-slate-400 hover:text-slate-200 bg-transparent'
                                }`}
                              >
                                {language === 'en' ? 'B2B Partner' : 'B2B 파트너 (코드보유)'}
                              </button>
                            </div>
                          </div>

                          {/* Conditional Partner Code Field: REQUIRED FOR B2B PARTNER */}
                          <div className="space-y-1.5">
                            {signUpRole === 'partner' ? (
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30"
                              >
                                <label className="text-xs font-bold text-cyan-400 flex items-center justify-between flex-row">
                                  <span className="flex items-center gap-1.5">
                                    <ShieldAlert className="w-3.5 h-3.5" />
                                    {language === 'en' ? 'B2B Partner Code' : 'B2B 파트너 가입 코드'}
                                  </span>
                                </label>
                                <div className="relative flex items-center">
                                  <span className="absolute left-3 text-cyan-400 font-mono font-extrabold select-none text-xs">M-</span>
                                  <input
                                    type="text"
                                    required
                                    id="signup-code-num"
                                    placeholder="12345"
                                    value={signUpCodeNumber}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/[^0-9]/g, '');
                                      setSignUpCodeNumber(val);
                                      setSignUpPartnerCode('M-' + val);
                                    }}
                                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-cyan-500/30 text-slate-100 focus:outline-none focus:border-cyan-400 font-mono transition-colors font-bold"
                                  />
                                </div>
                              </motion.div>
                            ) : (
                              <div className="hidden md:block text-xs text-slate-500 leading-normal p-3 rounded-xl border border-dashed border-white/5 bg-slate-950/30 h-[58px] flex items-center justify-center">
                                {language === 'en' ? 'No code required for General.' : '일반회원은 코드가 필요하지 않습니다.'}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Direct agreement checkbox */}
                        <div className="pt-2">
                          <label className="flex items-start gap-2.5 cursor-pointer select-none flex-row">
                            <input
                              type="checkbox"
                              id="signup-agree"
                              checked={signUpAgree}
                              onChange={(e) => {
                                setSignUpAgree(e.target.checked);
                                setSignUpError('');
                              }}
                              className="mt-0.5 rounded border-white/10 bg-slate-950 text-cyan-400 focus:ring-cyan-400/50 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-400 leading-tight">
                              {language === 'en' 
                                ? 'I agree to the collection and operational use of my partner registration details.' 
                                : 'B2B 파트너십 가입을 위한 개인정보 수집 동의 및 보안 정책 보증 조건 수락에 동의합니다.'}
                            </span>
                          </label>
                        </div>

                        {/* Submit action */}
                        <button
                          type="submit"
                          id="submit-register-btn"
                          className="w-full py-3 px-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 font-extrabold text-xs md:text-sm text-slate-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
                        >
                          <CheckCircle2 className="w-4 h-4" /> 
                          {language === 'en' ? 'Create Partner Account' : 'B2B파트너 회원가입 완료'}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-5 text-center">
                    <div className={`mx-auto w-12 h-12 rounded-full border flex items-center justify-center ${
                      registeredUser?.role === 'partner' 
                        ? 'bg-purple-950/50 border-purple-400 text-purple-400' 
                        : 'bg-cyan-950/50 border-cyan-400 text-cyan-400'
                    }`}>
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">
                        {registeredUser?.role === 'partner'
                          ? (language === 'en' ? 'B2B Partner Verified' : 'B2B 파트너 인증 활성화')
                          : (language === 'en' ? 'General Member Registered' : '일반회원 승인 활성화')}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {registeredUser?.role === 'partner'
                          ? (language === 'en' 
                            ? 'You are currently logged in as an authorized MOASD B2B Enterprise Partner.' 
                            : '현재 (주)MOASD 공식 B2B 기업 대리점 등급으로 파일 즉시 다운로드 권한을 보유하고 있습니다.')
                          : (language === 'en'
                            ? 'You are currently logged in as a General Member. Details are viewable; download requires admin approval.' 
                            : '현재 일반회원 등급입니다. 기술 서류의 내용 확인은 가능하지만 정식 다운로드 시 관리자의 심사·승인이 수반됩니다.')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-left text-xs space-y-2">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-slate-500">{language === 'en' ? 'Member Name' : '성함 / 담당대표'}</span>
                        <span className="text-slate-200 font-semibold">{registeredUser?.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-slate-500">{language === 'en' ? 'Organization' : '소속 기업명'}</span>
                        <span className="text-slate-200 font-semibold">{registeredUser?.company}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-slate-500">{language === 'en' ? 'Email ID' : '가입 이메일'}</span>
                        <span className="text-slate-200 font-semibold">{registeredUser?.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-slate-500">{language === 'en' ? 'Membership Type' : '회원 등급 구분'}</span>
                        <span className={`font-bold ${registeredUser?.role === 'partner' ? 'text-purple-400' : 'text-cyan-400'}`}>
                          {registeredUser?.role === 'partner' 
                            ? (language === 'en' ? 'PARTNER MEMBER' : '파트너 회원 (B2B)') 
                            : (language === 'en' ? 'GENERAL MEMBER' : '일반회원')}
                        </span>
                      </div>
                      {registeredUser?.role === 'partner' && (
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-slate-500">{language === 'en' ? 'Partner Code' : '인증 파트너 코드'}</span>
                          <span className="text-purple-400 font-mono font-bold text-[11px] bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/40">
                            {registeredUser?.partnerCode}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">{language === 'en' ? 'Registration Date' : '계정 등록 일자'}</span>
                        <span className="text-slate-300 font-semibold">{registeredUser?.regDate}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="logout-btn"
                      onClick={() => {
                        handleLogOut();
                        setIsSignUpModalOpen(false);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl border border-red-500/20 text-red-400 bg-red-950/10 hover:bg-red-950/20 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'en' ? 'Log Out Account' : '로그아웃 및 가입 정보 초기화'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Simulated SMS Dispatch Overlay */}
      <AnimatePresence>
        {purchaseSmsToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-[200] max-w-sm w-full bg-slate-950 border border-emerald-500/35 rounded-2xl shadow-2xl p-5 font-sans overflow-hidden"
          >
            {/* Ambient indicator */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500" />
            
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 rounded-xl shrink-0">
                <Smartphone className="w-5 h-5 animate-pulse text-emerald-400" />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-mono text-emerald-400 font-extrabold tracking-wider bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                    SIMULATED SECURE SMS
                  </span>
                  <button 
                    onClick={() => setPurchaseSmsToast(null)}
                    className="text-slate-500 hover:text-white transition-colors cursor-pointer border-0 p-0 bg-transparent"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="space-y-1.5 leading-snug text-left">
                  <p className="text-xs text-white font-black">
                    {language === 'ko' ? '마스터 최고 관리자 SMS 직통 보안 발송 완료' : 'Master Admin SMS Security Dispatch Ok'}
                  </p>
                  
                  <div className="p-2 bg-slate-900 rounded-lg text-[10.5px] text-slate-350 font-mono leading-normal border border-white/5 space-y-1">
                    <p className="text-emerald-400 font-bold border-b border-white/5 pb-1">
                      To: 010-2242-7801 (Master)
                    </p>
                    <p>
                      {language === 'ko'
                        ? `[MOASD ERP] '${purchaseSmsToast.buyer}'님이 B2B 상품 [${purchaseSmsToast.itemName}] ${purchaseSmsToast.quantity}대의 구매 요청을 접수했습니다. 최종 합금 대가: ₩${purchaseSmsToast.amount.toLocaleString()}원.`
                        : `[MOASD ERP] '${purchaseSmsToast.buyer}' submitted order for [${purchaseSmsToast.itemName}] (${purchaseSmsToast.quantity} units). Total pricing: ₩${purchaseSmsToast.amount.toLocaleString()}.`}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/5 pt-1.5 font-mono">
                  <span>Routing: KT Secure Core</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setIsPrivacyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/25 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-400/20 text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                      {language === 'en' ? 'Privacy Policy' : '개인정보처리방침'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      (주)MOASD (MOASD Co., Ltd.) • sinhwaensol@gmail.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-0 bg-transparent"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-left text-sm text-slate-300 leading-relaxed font-sans max-h-[calc(85vh-100px)]">
                
                {/* Intro banner */}
                <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 space-y-2">
                  <p className="text-xs text-cyan-400 font-bold tracking-wider uppercase font-mono">
                    NOTICE & PROTECTIONS
                  </p>
                  <p className="text-xs text-slate-450">
                    {language === 'en' 
                      ? "This Privacy Policy describes how MOASD Co., Ltd. collects, uses, and shares your personal information in accordance with Article 30 of the Personal Information Protection Act in South Korea."
                      : "주식회사 모아에스디(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다."}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Article 1 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제1조</span> (개인정보의 처리목적)
                    </h4>
                    <p className="text-xs text-slate-400">
                      회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    </p>
                    <ul className="text-xs text-slate-400 space-y-2 pl-4 list-decimal">
                      <li>
                        <strong>홈페이지 회원 가입 및 관리:</strong> 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보처리 시 법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.
                      </li>
                      <li>
                        <strong>재화 또는 서비스 제공:</strong> 물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.
                      </li>
                      <li>
                        <strong>고충 처리:</strong> 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.
                      </li>
                    </ul>
                  </div>

                  {/* Article 2 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제2조</span> (개인정보의 처리 및 보유기간)
                    </h4>
                    <p className="text-xs text-slate-400">
                      ① 회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다. <br />
                      ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    </p>
                    <div className="p-3.5 bg-slate-950/45 rounded-xl border border-white/5 text-xs text-slate-450 space-y-3">
                      <div>
                        <p className="font-bold text-white mb-1">1. 홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지 탈퇴 시까지</p>
                        <p className="pl-3">다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지:</p>
                        <ul className="pl-6 list-disc space-y-0.5 text-[11px]">
                          <li>관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지</li>
                          <li>홈페이지 이용에 따른 채권 및 채무관계 잔존 시에는 해당 채권, 채무 관계 정산 시까지</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">2. 재화 또는 서비스 제공 : 재화․서비스 공급완료 및 요금결제․정산 완료 시까지</p>
                        <p className="pl-3">다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지:</p>
                        <ul className="pl-6 list-disc space-y-0.5 text-[11px]">
                          <li>
                            <strong>「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 기록:</strong>
                            <br />- 표시․광고에 관한 기록: 6월
                            <br />- 계약 또는 청약 철회, 대금결제, 재화 등의 공급기록: 5년
                            <br />- 소비자 불만 또는 분쟁 처리에 관한 기록: 3년
                          </li>
                          <li>
                            <strong>「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관:</strong>
                            <br />- 가입자 전기통신일시, 개시․종료 시간, 상대방 가입자 번호, 사용도수, 발신기지국 위치추적자료: 1년
                            <br />- 컴퓨터 통신, 인터넷 로그 기록자료, 접속지 추적자료: 3개월
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Article 3 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제3조</span> (개인정보의 제3자 제공)
                    </h4>
                    <p className="text-xs text-slate-400">
                      ① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제 18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다. <br />
                      ② 회사는 원활한 서비스 제공을 위해 다음의 경우 개인정보보호법 제17조 제1항 제1호에 따라 정보주체의 동의를 얻어 필요 최소한의 범위로만 개인정보를 제3자에게 제공할 수 있습니다.
                    </p>
                    <ul className="text-xs text-slate-450 space-y-1 pl-4 list-disc">
                      <li>개인정보를 제공받는 자: 협약 금융사 및 결제 대행 제휴사</li>
                      <li>제공받는 자의 개인정보 이용목적: 원활한 에스크로 거래 및 안전 결제 연동</li>
                      <li>제공하는 개인정보 항목: 성명, 이메일주소, 휴대전화번호, 기업명</li>
                      <li>제공받는 자의 보유, 이용기간: 제휴 서비스 해지 또는 가입 탈퇴 시까지</li>
                    </ul>
                  </div>

                  {/* Article 4 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제4조</span> (개인정보처리의 위탁)
                    </h4>
                    <p className="text-xs text-slate-400">
                      ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
                      <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 space-y-1">
                        <p className="font-bold text-white text-xs">쇼핑몰 호스팅 및 알림 대행</p>
                        <p className="text-[11px] text-cyan-400">수탁자: 신화에너지솔루션</p>
                        <p className="text-[11px] leading-tight">위탁 업무: 쇼핑몰 호스팅 시스템 제공, 모바일 앱 서비스, 알림톡/문자메시지 발송대행 등</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 space-y-1">
                        <p className="font-bold text-white text-xs">결제 및 에스크로</p>
                        <p className="text-[11px] text-cyan-400">수탁자: 한국정보통신(KCP) 등 PG사</p>
                        <p className="text-[11px] leading-tight">위탁 업무: 결제 승인 및 에스크로 안전 결제 보호 서비스</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 space-y-1">
                        <p className="font-bold text-white text-xs">물품 배송</p>
                        <p className="text-[11px] text-cyan-400">수탁자: 우체국택배 / CJ대한통운</p>
                        <p className="text-[11px] leading-tight">위탁 업무: B2B 기술 장비 및 견적 샘플 배송 업무</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1 leading-normal">
                      ② 회사는 위탁계약 체결 시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                    </p>
                  </div>

                  {/* Article 5 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제5조</span> (정보주체 및 법정대리인의 권리와 그 행사 방법)
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      ① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다. <br />
                      1. 개인정보 열람 요구 <br />
                      2. 오류 등이 있을 경우 정정 요구 <br />
                      3. 삭제요구 <br />
                      4. 처리정지 요구 <br />
                      ② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편(sinhwaensol@gmail.com) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다. <br />
                      ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다. <br />
                      ④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
                    </p>
                  </div>

                  {/* Article 6 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제6조</span> (처리하는 개인정보 항목)
                    </h4>
                    <p className="text-xs text-slate-400">
                      회사는 다음의 개인정보 항목을 처리하고 있습니다.
                    </p>
                    <ul className="text-xs text-slate-450 space-y-2 pl-4 list-disc">
                      <li>
                        <strong>B2B 파트너 회원 가입 및 관리 (필수항목):</strong> 성명, 아이디(이메일주소), 비밀번호, 회사명(소속부서), 휴대전화번호, 가입유형 분류 및 파트너 코드
                      </li>
                      <li>
                        <strong>고객 기술 문의 및 거래 연동 (필수항목):</strong> 기업 대표자명, 담당자 연락처, 주소, 이메일 주소, 필요 시 은행 계좌정보 등 거래 대금 정산 정보
                      </li>
                    </ul>
                  </div>

                  {/* Article 7 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제7조</span> (개인정보의 파기)
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      ① 회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. <br />
                      ② 정보주체로부터 동의받은 개인정보 보유 기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. <br />
                      ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다. <br />
                      1. 파기 절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다. <br />
                      2. 파기 방법: 회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 기술적으로 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                    </p>
                  </div>

                  {/* Article 8 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제8조</span> (개인정보의 안전성 확보조치)
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다. <br />
                      1. 관리적 조치 : 내부관리계획 수립 및 시행, 정기적 직원 보안 교육 등 <br />
                      2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, SSL 보안 암호화 통신 적용, 접속 권한 통제 <br />
                      3. 물리적 조치 : 통제구역 설정 및 자료보관실 등의 비인가자 접근 통제
                    </p>
                  </div>

                  {/* Article 9 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제9조</span> (개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      ① 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. <br />
                      ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 PC 또는 모바일에 저장됩니다. <br />
                      ③ 정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 일부 어려움이 발생할 수 있습니다.
                    </p>
                  </div>

                  {/* Article 10 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제10조</span> (개인정보 보호책임자)
                    </h4>
                    <p className="text-xs text-slate-400">
                      회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    </p>
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-450 space-y-2">
                      <p>
                        <strong>개인정보 보호책임자:</strong> 장세창 대표이사
                      </p>
                      <p>
                        <strong>담당 부서:</strong> (주)MOASD 정보관리팀
                      </p>
                      <p>
                        <strong>연락처 / 이메일:</strong> sinhwaensol@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Article 11 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제11조</span> (개인정보 열람청구)
                    </h4>
                    <p className="text-xs text-slate-400">
                      정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람 청구가 신속하게 처리되도록 노력하겠습니다.
                    </p>
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-450 space-y-1">
                      <p><strong>개인정보 열람청구 접수․처리 부서:</strong> (주)MOASD 정보관리팀</p>
                      <p><strong>연락처 / 이메일:</strong> sinhwaensol@gmail.com</p>
                    </div>
                  </div>

                  {/* Article 12 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제12조</span> (권익침해 구제 방법)
                    </h4>
                    <p className="text-xs text-slate-400">
                      정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
                    </p>
                    <ul className="text-xs text-slate-450 space-y-1 pl-4 list-decimal">
                      <li>개인정보 분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                      <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
                      <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
                      <li>경찰청 : (국번없이) 182 (ecrm.police.go.kr/minwon/main)</li>
                    </ul>
                  </div>

                  {/* Article 13 */}
                  <div className="space-y-2 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제13조</span> (개인정보 처리방침 시행 및 변경)
                    </h4>
                    <p className="text-xs text-slate-400">
                      이 개인정보 처리방침은 2026. 01. 01. 부터 적용됩니다.
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/5 bg-slate-950/40 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all duration-250 cursor-pointer border-0"
                >
                  {language === 'en' ? 'Close Statement' : '방침 확인 및 닫기'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {isTermsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setIsTermsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/25 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-400/20 text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                      {language === 'en' ? 'Terms of Service' : '이용약관'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      (주)MOASD (MOASD Co., Ltd.) • sinhwaensol@gmail.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-0 bg-transparent"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-left text-sm text-slate-300 leading-relaxed font-sans max-h-[calc(85vh-100px)]">
                
                {/* Intro banner */}
                <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 space-y-2">
                  <p className="text-xs text-cyan-400 font-bold tracking-wider uppercase font-mono">
                    TERMS & CONDITIONS
                  </p>
                  <p className="text-xs text-slate-450">
                    {language === 'en' 
                      ? "These Terms of Service govern your use of the services and platforms operated by MOASD Co., Ltd."
                      : "본 이용약관은 (주)MOASD(이하 \"사이트\" 또는 \"회사\")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다."}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Article 1 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제1조</span> (목적)
                    </h4>
                    <p className="text-xs text-slate-400">
                      본 이용약관은 “(주)MOASD”(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.
                    </p>
                  </div>

                  {/* Article 2 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제2조</span> (용어의 정의)
                    </h4>
                    <p className="text-xs text-slate-400">
                      본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.
                    </p>
                    <ul className="text-xs text-slate-400 space-y-2 pl-4 list-decimal">
                      <li>
                        <strong>회원 :</strong> 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.
                      </li>
                      <li>
                        <strong>이용계약 :</strong> 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.
                      </li>
                      <li>
                        <strong>회원 아이디(이하 "ID") :</strong> 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
                      </li>
                      <li>
                        <strong>비밀번호 :</strong> 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.
                      </li>
                      <li>
                        <strong>운영자 :</strong> 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.
                      </li>
                      <li>
                        <strong>해지 :</strong> 회원이 이용계약을 해약하는 것을 말합니다.
                      </li>
                    </ul>
                  </div>

                  {/* Article 3 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제3조</span> (약관 외 준칙)
                    </h4>
                    <p className="text-xs text-slate-400">
                      운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본 약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.
                    </p>
                  </div>

                  {/* Article 4 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제4조</span> (이용계약 체결)
                    </h4>
                    <p className="text-xs text-slate-400">
                      ① 이용계약은 회원으로 등록하여 사이트를 이용하려는 자의 본 약관 내용에 대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.<br />
                      ② 회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시 본 약관을 읽고 아래에 있는 "동의합니다"를 선택하는 것으로 본 약관에 대한 동의 의사 표시를 합니다.
                    </p>
                  </div>

                  {/* Article 5 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제5조</span> (서비스 이용 신청)
                    </h4>
                    <p className="text-xs text-slate-400">
                      ① 회원으로 등록하여 사이트를 이용하려는 이용자는 사이트에서 요청하는 제반정보(이용자ID,비밀번호, 닉네임 등)를 제공해야 합니다.<br />
                      ② 타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한 정보를 등록하지 않은 회원은 사이트 이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에 따라 처벌받을 수 있습니다.
                    </p>
                  </div>

                  {/* Article 6 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제6조</span> (개인정보처리방침)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      사이트 및 운영자는 회원가입 시 제공한 개인정보 중 비밀번호를 가지고 있지 않으며 이와 관련된 부분은 사이트의 개인정보처리방침을 따릅니다.<br />
                      운영자는 관계 법령이 정하는 바에 따라 회원등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다.<br />
                      회원의 개인정보보호에 관하여 관계법령 및 사이트가 정하는 개인정보처리방침에 정한 바에 따릅니다.<br />
                      단, 회원의 귀책 사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을 지지 않습니다.<br />
                      운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등 위법한 게시물을 등록 · 배포할 경우 관련 기관의 요청이 있을 시 회원의 자료를 열람 및 해당 자료를 관련 기관에 제출할 수 있습니다.
                    </p>
                  </div>

                  {/* Article 7 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제7조</span> (운영자의 의무)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 운영자는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가급적 빨리 처리하여야 합니다. 다만, 개인적인 사정으로 신속한 처리가 곤란한 경우에는 사후에 공지 또는 이용회원에게 쪽지, 전자우편 등을 보내는 등 최선을 다합니다.<br />
                      ② 운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록 사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에 부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.
                    </p>
                  </div>

                  {/* Article 8 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제8조</span> (회원의 의무)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반 규정, 공지사항 및 운영정책 등 사이트가 공지하는 사항 및 관계 법령을 준수하여야 하며, 기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상하는 행위를 해서는 안 됩니다.<br />
                      ② 회원은 사이트의 명시적 동의가 없는 한 서비스의 이용 권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.<br />
                      ③ 이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며, 운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할 수 없습니다.<br />
                      ④ 회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안 됩니다.
                    </p>
                  </div>

                  {/* Article 9 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제9조</span> (서비스 이용 시간)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 서비스 이용 시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수 있으며 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에 사전에 공지하오니 수시로 참고하시길 바랍니다.<br />
                      ② 단, 사이트는 다음 경우에 대하여 사전 공지나 예고 없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.<br />
                      - 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우<br />
                      - 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우<br />
                      - 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우<br />
                      - 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우<br />
                      ③ 전항에 의한 서비스 중단의 경우 사이트는 사전에 공지사항 등을 통하여 회원에게 통지합니다. 단, 사이트가 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로 대신합니다.
                    </p>
                  </div>

                  {/* Article 10 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제10조</span> (서비스 이용 해지)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 회원이 사이트와의 이용계약을 해지하고자 하는 경우에는 회원 본인이 온라인을 통하여 등록해지 신청을 하여야 합니다. 한편, 사이트 이용 해지와 별개로 사이트에 대한 이용계약 해지는 별도로 하셔야 합니다.<br />
                      ② 해지 신청과 동시에 사이트가 제공하는 사이트 관련 프로그램이 회원 관리 화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를 볼 수 없습니다.
                    </p>
                  </div>

                  {/* Article 11 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제11조</span> (서비스 이용 제한)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      회원은 다음 각호에 해당하는 행위를 하여서는 아니 되며 해당 행위를 한 경우에 사이트는 회원의 서비스 이용 제한 및 적법한 조치를 할 수 있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수 있습니다.<br />
                      ① 회원 가입시 혹은 가입 후 정보 변경 시 허위 내용을 등록하는 행위<br />
                      ② 타인의 사이트 이용을 방해하거나 정보를 도용하는 행위<br />
                      ③ 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위<br />
                      ④ 사이트, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위<br />
                      ⑤ 다른 회원의 ID를 부정하게 사용하는 행위<br />
                      ⑥ 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위<br />
                      ⑦ 범죄와 결부된다고 객관적으로 판단되는 행위<br />
                      ⑧ 기타 관련 법령에 위배되는 행위
                    </p>
                  </div>

                  {/* Article 12 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제12조</span> (게시물의 관리)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 사이트의 게시물과 자료의 관리 및 운영의 책임은 운영자에게 있습니다. 운영자는 항상 불량 게시물 및 자료에 대하여 모니터링을 하여야 하며, 불량 게시물 및 자료를 발견하거나 신고를 받으면 해당 게시물 및 자료를 삭제하고 이를 등록한 회원에게 주의를 주어야 합니다.<br />
                      한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이 있으니 회원 스스로 본 이용약관에서 위배되는 게시물은 게재해서는 안 됩니다.<br />
                      ② 정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 운영자는 회원의 사전동의 없이 게시물을 삭제하거나 이동 할 수 있습니다.<br />
                      ③ 불량게시물의 판단기준은 다음과 같습니다.<br />
                      - 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상하는 내용인 경우<br />
                      - 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크 시키는 경우<br />
                      - 불법 복제 또는 해킹을 조장하는 내용인 경우<br />
                      - 영리를 목적으로 하는 광고일 경우<br />
                      - 범죄와 결부된다고 객관적으로 인정되는 내용일 경우<br />
                      - 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우<br />
                      - 기타 관계 법령에 위배된다고 판단되는 경우<br />
                      ④ 사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시 중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물 등록자 간에 소송, 합의 기타 이에 준하는 관련 기관의 결정 등이 이루어져 사이트에 접수된 경우 이에 따릅니다.
                    </p>
                  </div>

                  {/* Article 13 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제13조</span> (게시물의 보관)
                    </h4>
                    <p className="text-xs text-slate-400">
                      사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우, 회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 하기 위해 노력합니다.
                    </p>
                  </div>

                  {/* Article 14 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제14조</span> (게시물에 대한 저작권)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 회원이 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 사이트는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지 아니하며, 또한 서비스 내의 게재권을 갖습니다.<br />
                      ② 회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.<br />
                      ③ 운영자는 회원이 게시하거나 등록하는 사이트 내의 내용물, 게시 내용에 대해 제12조 각호에 해당한다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다.
                    </p>
                  </div>

                  {/* Article 15 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제15조</span> (손해배상)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 본 사이트의 발생한 모든 민, 형법상 책임은 회원 본인에게 1차적으로 있습니다.<br />
                      ② 본 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나 회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 않습니다.
                    </p>
                  </div>

                  {/* Article 16 */}
                  <div className="space-y-2 border-b border-white/5 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">제16조</span> (면책)
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      ① 운영자는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.<br />
                      ② 운영자는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는 전기통신 서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의 서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에 준합니다<br />
                      ③ 운영자는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을 지지 않습니다.<br />
                      ④ 운영자는 회원의 귀책 사유로 인하여 서비스 이용의 장애가 발생한 경우에는 책임지지 아니합니다.<br />
                      ⑤ 운영자는 회원 상호 간 또는 회원과 제3자 상호 간, 기타 회원의 본 서비스 내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에 대하여 책임을 지지 않습니다.<br />
                      ⑥ 운영자는 회원이 게시 또는 전송한 자료 및 본 사이트로 회원이 제공받을 수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는 책임지지 아니합니다.<br />
                      ⑦ 운영자는 회원 상호 간 또는 회원과 제3자 상호 간에 서비스를 매개로 하여 물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여 책임지지 아니합니다.<br />
                      ⑧ 운영자는 운영자의 귀책 사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의 분쟁에 대하여 책임지지 아니합니다.<br />
                      ⑨ 운영자는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의 운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수 있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의 저명한 연구기관이나 보안 관련 업체에 의해 대응 방법이 개발되지 아니한 컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적 사유로 인한 회원의 손해에 대하여 책임지지 않습니다.
                    </p>
                  </div>

                  {/* Appendix */}
                  <div className="space-y-2 pb-5">
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      부칙
                    </h4>
                    <p className="text-xs text-slate-400">
                      이 약관은 2026. 01. 01.부터 시행합니다.
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/5 bg-slate-950/40 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(false)}
                  className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all duration-250 cursor-pointer border-0"
                >
                  {language === 'en' ? 'Close Statement' : '약관 확인 및 닫기'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

