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
import { B2bMall, PRODUCTS, Product } from './components/B2bMall';
import { Admin } from './components/Admin';
import { MediaCenter } from './components/MediaCenter';
import { CustomerSupport } from './components/CustomerSupport';
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

  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'solutions' | 'partners' | 'mediacenter' | 'support' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('moasd_b2b_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  const [purchaseSmsToast, setPurchaseSmsToast] = useState<{
    show: boolean;
    itemName: string;
    quantity: number;
    amount: number;
    buyer: string;
  } | null>(null);

  const handlePurchaseOrder = (product: Product, quantity: number, buyerInfo?: any) => {
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
  const [activeSolutionIdx, setActiveSolutionIdx] = useState<number>(5);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isCasVideoOpen, setIsCasVideoOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalTab, setLoginModalTab] = useState<'partner' | 'general'>('partner');
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState<boolean>(false);
  const [samSubmenuOpen, setSamSubmenuOpen] = useState<boolean>(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState<boolean>(false);
  const [mobileSamOpen, setMobileSamOpen] = useState<boolean>(false);

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
    return localStorage.getItem('moasd_partner_user') !== null;
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
    const saved = localStorage.getItem('moasd_partner_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeSolutionIdx !== 4) {
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

    localStorage.setItem('moasd_partner_user', JSON.stringify(newUser));
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
      (inputNameOrEmail === '장세창' || inputNameOrEmail === 'jsc01020102@gmail.com' || inputNameOrEmail === 'master') &&
      inputPass === MASTER_ADMIN_PASS
    ) {
      const masterUser = {
        email: 'jsc01020102@gmail.com',
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
        roleLabel: 'M'
      };
      sessionStorage.setItem('moasd_admin_session', JSON.stringify(adminSession));
      
      localStorage.setItem('moasd_partner_user', JSON.stringify(masterUser));
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
        name: `${matchingSub.name} (부관리자)`,
        company: '(주)MOASD 운영부서',
        phone: matchingSub.phone,
        regDate: new Date().toLocaleDateString(),
        role: 'partner' as 'general' | 'partner',
        partnerCode: 'MOASD_PARTNER'
      };

      sessionStorage.setItem('moasd_admin_session', JSON.stringify(matchingSub));
      localStorage.setItem('moasd_partner_user', JSON.stringify(subUser));
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
        text: `[MOASD AI 통보] 등록 부관리자 '${matchingSub.name}' 님이 별도 가입 없이 직격 원격 단말로 일반 포탈 로그인을 수행하였습니다.`,
        timestamp: new Date().toLocaleString(),
        type: 'status'
      };
      localStorage.setItem('moasd_simulated_sms_logs', JSON.stringify([loginSms, ...existingLogs]));

      alert(language === 'en' ? `Welcome back Admin ${matchingSub.name}!` : `부관리자 "${matchingSub.name}" 님 반갑습니다! 가입 없이 즉각 로그인 하였습니다.`);
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
        localStorage.setItem('moasd_partner_user', JSON.stringify(matchedMember));
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
          localStorage.setItem('moasd_partner_user', JSON.stringify(storedLocalUser));
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
    localStorage.removeItem('moasd_partner_user');
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
      localStorage.setItem('moasd_partner_user', JSON.stringify(updatedUser));
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
                          navigateToSolutions(5, undefined, e);
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
                        {language === 'en' ? 'ESS (Supercapacitor)' : 'ESS (에너지저장장치)'}
                      </button>

                      {/* SAM with nested sub-flyout */}
                      <div 
                        className="relative"
                        onMouseEnter={() => setSamSubmenuOpen(true)}
                        onMouseLeave={() => setSamSubmenuOpen(false)}
                      >
                        <button
                          onClick={(e) => {
                            navigateToSolutions(4, undefined, e);
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
                                    navigateToSolutions(4, 'sam-p', e);
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
                                    navigateToSolutions(4, 'ecotube', e);
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
                                    navigateToSolutions(4, 'terramuvics', e);
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
                                    navigateToSolutions(4, 'heat-coating', e);
                                    setSolutionsDropdownOpen(false);
                                    setSamSubmenuOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-2 py-1.5 text-[11.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                                >
                                  <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                                  {language === 'en' ? 'Heating Coating' : '발열 코팅'}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={(e) => {
                          navigateToSolutions(3, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        {language === 'en' ? 'E-Motorcycle' : '오토바이'}
                      </button>

                      <button
                        onClick={(e) => {
                          navigateToSolutions(2, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        {language === 'en' ? 'E-Bicycle' : '자전거'}
                      </button>

                      <button
                        onClick={(e) => {
                          navigateToSolutions(1, undefined, e);
                          setSolutionsDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-bold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg text-left transition-all cursor-pointer w-full bg-transparent border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {language === 'en' ? 'Solar Energy' : '태양열'}
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
              href="#simulator-section" 
              onClick={(e) => navigateToSection('simulator-section', e)}
              className="text-slate-300 hover:text-cyan-400 font-medium transition-colors"
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

            <a 
              href="#proposal-section"
              className="px-5 py-2.5 rounded-xl border border-cyan-400/30 bg-slate-900/40 text-xs font-bold text-cyan-400 hover:text-slate-950 hover:bg-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-md shadow-cyan-500/5 hover:shadow-cyan-400/20 active:scale-95"
            >
              {t('nav.cta', 'Sign Up', '회원가입')}
            </a>
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
                            navigateToSolutions(5);
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
                          {language === 'en' ? 'ESS (Supercapacitor)' : 'ESS (에너지저장장치)'}
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
                                    navigateToSolutions(4, 'sam-p');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-cyan-400" />
                                  {language === 'en' ? 'SAM Polishing' : 'SAM 메탈 및 콘크리트 폴리싱'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(4, 'ecotube');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-purple-400" />
                                  {language === 'en' ? 'ECOTUBE' : 'ECOTUBE (에코튜브)'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(4, 'terramuvics');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-emerald-400" />
                                  {language === 'en' ? 'Terramuvics' : 'Terramuvics (테라뮤빅스)'}
                                </button>
                                <button
                                  onClick={() => {
                                    navigateToSolutions(4, 'heat-coating');
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-left text-[11px] font-semibold text-slate-500 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-1.5 bg-transparent border-0"
                                >
                                  <span className="w-1 h-0.5 bg-amber-400" />
                                  {language === 'en' ? 'Heating Coating' : '발열 코팅'}
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 오토바이 */}
                        <button
                          onClick={() => {
                            navigateToSolutions(3);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                          {language === 'en' ? 'E-Motorcycle' : '오토바이'}
                        </button>

                        {/* 자전거 */}
                        <button
                          onClick={() => {
                            navigateToSolutions(2);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          {language === 'en' ? 'E-Bicycle' : '자전거'}
                        </button>

                        {/* 태양열 */}
                        <button
                          onClick={() => {
                            navigateToSolutions(1);
                            setMobileMenuOpen(false);
                          }}
                          className="text-left text-xs font-bold text-slate-400 hover:text-cyan-400 py-1 cursor-pointer flex items-center gap-2 bg-transparent border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          {language === 'en' ? 'Solar Energy' : '태양열'}
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
                  href="#simulator-section" 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToSection('simulator-section', e);
                  }}
                  className="py-2 text-slate-300 hover:text-cyan-400 block border-b border-white/5"
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
                <a 
                  href="#proposal-section"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToSection('proposal-section', e);
                  }}
                  className="mt-2 w-full text-center py-3 rounded-lg bg-cyan-400 text-slate-950 font-bold block"
                >
                  {t('nav.cta', 'Sign Up', '회원가입')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {currentTab === 'home' ? (
        <>
          {/* 2. Panoramic Enterprise Hero Screen Slider (KEPCO style) */}
          <MainHeroSlider />

      {/* 5. Business Domain & Interactive Production Line Tour (사업영역) */}
      <section id="simulator-section" className="py-24 max-w-7xl mx-auto px-6 relative space-y-12">
        <Factory3DWalkthrough />
        <ConsultingSimulator />
      </section>

      {/* 7. Strategic Consultation Estimate & Proposal Build Engine */}
      <section id="proposal-section" className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form left (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs text-cyan-400 font-mono tracking-wider">
                <FileCheck2 className="w-4 h-4" /> SECURE PARTNER PORTAL
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                {t('support.title', 'B2B Partner Sign Up', 'B2B 파트너 회원가입')}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t(
                  'support.desc',
                  'Register as an official partner to immediately unlock exclusive premium technical specifications, comprehensive CAD datasets, material chemistry reports, and live direct-consultation engineering access.',
                  '자유로운 신재생 그리드 설계 모형, HGE3D00의 정밀 CAD 외형 치수 도면, 고전도 첨단 소재 SAM 자료실 즉시 다운로드를 위해 무료 B2B 대리점 파트너사 정보 등록을 완료해 주십시오.'
                )}
              </p>
            </div>

            {!isSignedUp ? (
              <div className="space-y-8">
                {/* 1. B2B Partner Sign Up Section */}
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-5 bg-cyan-400 rounded-sm"></span>
                    {language === 'en' ? 'B2B Partner Sign Up' : 'B2B파트너 회원가입'}
                  </h4>
                  <form onSubmit={handleSignUpSubmit} className="space-y-4 p-6 rounded-2xl bg-slate-900/40 border border-white/5 text-left">
                    {signUpError && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                        {signUpError}
                      </div>
                    )}

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

                    {/* Password Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    {/* Representative Name & Corporate Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 flex-row">
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          {language === 'en' ? 'Full Name' : '담당자 성함합의'}
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
                          {language === 'en' ? 'General Member' : '일반회원 (코드없음)'}
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
                          {language === 'en' ? 'B2B Partner' : 'B2B 파트너 회원 (코드보유)'}
                        </button>
                      </div>
                    </div>

                    {/* Conditional Partner Code Field: REQUIRED FOR B2B PARTNER */}
                    {signUpRole === 'partner' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30"
                      >
                        <label className="text-xs font-bold text-cyan-400 flex items-center justify-between flex-row">
                          <span className="flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            {language === 'en' ? 'B2B Partner Code Number' : 'B2B 파트너 회원가입 코드번호'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono font-bold font-sans">REQUIRED (DIGITS ONLY)</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-cyan-400 font-mono font-extrabold select-none">M-</span>
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
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-cyan-500/30 text-slate-100 focus:outline-none focus:border-cyan-400 font-mono transition-colors font-bold"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                          {language === 'en'
                            ? "※ The prefix 'M-' is fixed. Enter only numbers to register your partner code (e.g. M-12345)."
                            : "※ 앞에 'M-' 문구는 고정으로 들어갑니다. 숫자만 입력하여 가입 코드를 등록해 주십시오 (예: M-12345)."}
                        </p>
                      </motion.div>
                    )}

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
                          className="mt-0.5 rounded border-white/10 bg-slate-950 text-cyan-450 focus:ring-cyan-400/50 cursor-pointer"
                        />
                        <span className="text-[11px] text-slate-400 leading-tight">
                          {language === 'en' 
                            ? 'I agree to the collection and operational use of my partner registration details under standard safety directives.' 
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
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-5 text-center">
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
                        ? 'You are currently logged in as an authorized MOASD B2B Enterprise Partner with instant download clearance.' 
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
                  onClick={handleLogOut}
                  className="w-full py-2.5 px-4 rounded-xl border border-red-500/20 text-red-400 bg-red-950/10 hover:bg-red-950/20 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  {language === 'en' ? 'Log Out Account' : '로그아웃 및 가입 정보 초기화'}
                </button>
              </div>
            )}
          </div>

          {/* Right hand privileges portal (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full justify-between border border-cyan-500/20 bg-gradient-to-br from-slate-950 to-slate-900/60 p-6 md:p-8 rounded-3xl relative overflow-hidden min-h-[500px]">
            
            {/* 1. Secure Lock Blur Overlay for Anonymous Non-Members */}
            {!isSignedUp && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/5">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="text-lg font-extrabold text-white tracking-tight">
                    {language === 'en' ? 'Access Restricted (Non-Members)' : '비회원 정보 열람 및 다운로드 제한'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {language === 'en'
                      ? 'In accordance with intellectual property directives, corporate CAD layouts, SAM nanocompound ratio sheets, and chemical research analysis datasets are strictly locked for unregistered guests.'
                      : '본사 지식재산권 수집 보호 조항에 따라 하이브리드 발전 장치 도면 및 SAM 연구사 분석서 등 핵심 기밀 자료는 비회원의 세부 내용 열람 및 다운로드가 엄격히 제한됩니다.'}
                  </p>
                  <p className="text-xs text-cyan-400 font-bold p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 inline-block">
                    {language === 'en'
                      ? '🔒 Please sign up or log in first to activate viewing & download credentials.'
                      : '🔒 좌측 파트너 포탈을 통해 신속 가입 후 회원 자녀 등급 번호로 정식 로그인해 주십시오.'}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> B2B_VIPMEMBERSHIP
            </div>

            <div className="space-y-5">
              <div className="border-b border-white/5 pb-4">
                <span className="text-lg md:text-xl font-bold text-white font-sans tracking-tight block">
                  {language === 'en' ? 'MOASD B2B Exclusive Partner benefits' : '(주)MOASD B2B 독점 파트너 혜택 및 자료실'}
                </span>
                <span className="text-[10px] font-mono text-purple-400 font-semibold tracking-wider block mt-1 uppercase">
                  AUTHORIZED SPECIFICATION DOWNLOAD CENTER
                </span>
                <div className="flex justify-between items-center text-xs mt-3">
                  <span className="text-slate-400">
                    {language === 'en' ? 'Connection Status:' : '가입 연동 상태:'}{' '}
                    <strong className={isSignedUp ? "text-cyan-400" : "text-amber-400"}>
                      {isSignedUp 
                        ? (registeredUser?.role === 'partner' 
                          ? (language === 'en' ? 'VERIFIED PARTNER (ALL-ACCESS)' : 'B2B 파트너 공식 대리점 인증 상태') 
                          : (language === 'en' ? 'GENERAL MEMBER (READ-ONLY, DOWNLOAD PENDING)' : '일반회원 연동 상태 (조회 가능, 다운로드 승인 대기)'))
                        : (language === 'en' ? 'ANONYMOUS GUEST (EXPIRED)' : '미인증 비회원 게스트 상태')}
                    </strong>
                  </span>
                  <span className="text-slate-500 font-mono">CODE: L4_B2B_SYS</span>
                </div>
              </div>

              {/* PDF & XLS Downloads Section - Deleted individual messy item columns and replaced with a clean, streamlined enterprise status panel */}
              <div className="space-y-4 pt-1">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/20 to-purple-950/20 border border-cyan-500/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <ShieldCheck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider">
                        {language === 'en' ? 'Verified Security Access' : '보안 연동 연계 계정'}
                      </span>
                      <span className="text-sm font-extrabold text-white font-mono break-all">
                        {isSignedUp ? registeredUser?.email : 'PENDING_AUTHORIZATION@COMPANY.COM'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed font-sans">
                    {language === 'en'
                      ? 'Registration complete. To protect proprietary design rights, detailed material chemistry sheets, power simulators, and technical CAD layouts are securely dispatched directly to your registered business mailbox.'
                      : '회원가입이 완료되었습니다. 본사 핵심 지식재산권 보호 정책에 따라 각 사업 파트별 상세 치수 도면, 고전도 SAM 특허 연구서, 마이크로 그리드 전원 계통 수치 데이터 시트는 고객님의 가입 이메일 수신함으로 안전하게 즉시 개별 자동 전송 처리됩니다.'}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                      <span className="text-slate-400 font-bold block">
                        {language === 'en' ? 'Support Channel' : '1:1 기술 지원 채널'}
                      </span>
                      <span className="text-cyan-400 font-semibold block">
                        {language === 'en' ? 'Chief Engineer Assigned' : '담당 수석 엔지니어 배정'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                      <span className="text-slate-400 font-bold block">
                        {language === 'en' ? 'Partner Transmission' : '각 파트 기밀자료 전송'}
                      </span>
                      <span className="text-emerald-400 font-semibold block">
                        {language === 'en' ? 'Email Queue Dispatched' : '수신 이메일 전송 대기'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure statement draft text or benefits text */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-400 leading-relaxed font-sans space-y-2">
                <p>
                  {language === 'en'
                    ? 'Unauthorized redistribution, copying, or reverse-engineering of downloading assets is strictly prohibited by commercial IP protection clauses under MOASD security guidelines.'
                    : '본 자료실의 치수, 연구서, 시트 자료에 대한 외부 무단 배포나 복제, 리버스 엔지니어링 행위는 산학연 지식재산권(IP) 보호 조항 및 MOASD 보안 규정에 따라 법적으로 전격 금지되어 있습니다.'}
                </p>
                <p>
                  {language === 'en'
                    ? '(주)MOASD vertically aligns corporate partnerships to safeguard absolute engineering decision integrity across all renewable and operational nodes.'
                    : '(주)MOASD는 파트너십 보호 체계를 수직 정렬하고, 모든 공동 엔지니어링 인프라와 신형 동력 노드의 완벽한 전략 연동을 정밀 책임 보증합니다.'}
                </p>
              </div>

            </div>

            {/* Simulated Watermark */}
            <div className="pt-8 text-center text-[10px] font-mono text-slate-600 block leading-tight">
              {language === 'en' ? "MOASD" : "(주)MOASD"} B2B PARTNER SPECIFICATION DIRECTIVE PORTAL
              <br /> All download assets are cryptographically tagged with registered partner information.
            </div>
          </div>
        </div>
      </section>
    </>
  ) : currentTab === 'about' ? (
    <div className="pt-24 min-h-[85vh] bg-slate-950">
      {/* 3. Company Introduction Section (Bento Grid of 3D Glassmorphic Cards) */}
      <section id="strengths-section" className="py-12 max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> COMPANY GENERAL OVERVIEW
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight animate-fade-in">
            {t('about.title', 'About MOASD', '회사소개')}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'about.desc',
              'MOASD Co., Ltd. integrates peerless US CAS-registered SAM new material intellectual properties, high-density hybrid supercapacitor fab lines, and eco-friendly electric mobility manufacturing infrastructures to demonstrate tomorrow\'s green energy patterns today.',
              '(주)MOASD는 독보적인 미국 CAS 등재 SAM 신소재 지적재산권과 하이브리드 슈퍼커패시터 최고 팹 라인, 그리고 친환경 전기 모빌리티 제조 인프라를 통합하여 내일의 녹색 에너지를 오늘 실증 선포합니다.'
            )}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {MOASD_STRENGTHS.map((strength) => {
            // Pick a matching icon for the strength
            const getIcon = (id: string) => {
              if (id === 'cas-auth') return <Sparkles className="w-6 h-6 text-emerald-400" />;
              if (id === 'supercapacitor-tech') return <Cpu className="w-6 h-6 text-cyan-400" />;
              if (id === 'eco-ev-mass') return <Layers className="w-6 h-6 text-purple-400" />;
              return <Compass className="w-6 h-6 text-indigo-400" />;
            };

            const getAccentColor = (id: string) => {
              if (id === 'cas-auth') return 'emerald-500/10';
              if (id === 'supercapacitor-tech') return 'cyan-500/10';
              if (id === 'eco-ev-mass') return 'purple-500/10';
              return 'indigo-500/10';
            };

            return (
              <ThreeDCard 
                key={strength.id}
                maxRotation={10}
                scaleOnHover={1.03}
                glowColor={getAccentColor(strength.id)}
                className={`h-full relative overflow-hidden group/card ${strength.id === 'cas-auth' ? 'border-emerald-500/20 hover:border-emerald-400/40' : ''}`}
                onClick={() => {
                  if (strength.id === 'cas-auth') {
                    setIsCasVideoOpen(true);
                  }
                }}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 shadow-inner">
                        {getIcon(strength.id)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {strength.id === 'cas-auth' && (
                          <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase py-1 px-2.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-450/25 shadow-sm animate-pulse select-none">
                            <Play className="w-2.5 h-2.5 fill-current" /> Play Video
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-extrabold tracking-widest text-cyan-400 bg-slate-900 px-3 py-1.5 rounded-full border border-white/5">
                          {strength.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {language === 'en' && strength.titleEn ? strength.titleEn : strength.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-400">
                        {language === 'en' && strength.descriptionEn ? strength.descriptionEn : strength.description}
                      </p>
                    </div>
                  </div>

                  {/* Visual Grid Marker bottom right of each strength */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    {strength.id === 'cas-auth' ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5 transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current" /> {language === 'en' ? 'WATCH INTRODUCTION VIDEO' : '미국 CAS 소개 영상 재생'}
                      </span>
                    ) : (
                      <span>MOASD FOCUS CRITERIA</span>
                    )}
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${strength.id === 'cas-auth' ? 'text-emerald-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5' : 'text-slate-600'}`} />
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </section>
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
              'Explore our 5 core technology and industrial portfolios, including renewable grids, hybrid supercapacitor cells, e-mobility packages, US CAS-registered SAM materials, and discharge-free HGE3D00 generators.',
              '신재생에너지 스마트 그리드와 하이브리드 슈퍼커패시터 셀, 전기 모빌리티 구동체, 미국 CAS 공인 SAM 신소재의 유기적 공급 등 5가지 핵심 비즈니스 포트폴리오를 탐색해 보십시오.'
            )}
          </p>
        </div>

        {/* Tabbed Solutions detailed content rendering */}
        {activeSolutionIdx === 4 && activeSubTab ? (
          <SamPolishingSolutions activeTab={activeSubTab} setActiveTab={setActiveSubTab} />
        ) : (
          <ThreeDCarousel activeIndex={activeSolutionIdx} setActiveIndex={setActiveSolutionIdx} />
        )}
      </section>
    </div>
  ) : currentTab === 'partners' ? (
    <div className="pt-24 min-h-[85vh] bg-slate-950">
      <section className="py-12 max-w-7xl mx-auto px-6 relative space-y-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> PARTNER RECORDS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight animate-fade-in">
            {t('partners.title', 'Partner Collaborations', '협력기업')}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'partners.desc',
              'Explore the details of real-time power metrics, stabilization factors, and operational cost savings achieved by our partners.',
              '주요 협력기업들이 (주)MOASD와 연계하여 축적해 온 실증 오퍼레이팅 성과 및 전력 혁신 지표 기록서입니다.'
            )}
          </p>
        </div>

        {/* Cooperating Enterprises Interactive Section Block */}
        <div id="partners-section-root" className="w-full transition-all">
          {activeTabCase === null ? (
            /* 3 Grid Multi-Enterprise selector cards (Initially shown, extremely highly-polished UI) */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOASD_CASES.map((caseRef, index) => {
                const isCase1 = caseRef.id === 'case-1';
                const isCase2 = caseRef.id === 'case-2';
                
                const cardBorder = isCase1 
                  ? 'border-blue-500/25 hover:border-blue-400/50' 
                  : isCase2 
                    ? 'border-emerald-500/25 hover:border-emerald-400/50' 
                    : 'border-cyan-500/25 hover:border-cyan-400/50';

                const accentText = isCase1 
                  ? 'text-blue-400' 
                  : isCase2 
                    ? 'text-emerald-400' 
                    : 'text-cyan-400';

                const bgGradient = isCase1 
                  ? 'from-blue-950/20 via-slate-900/40 to-slate-950/90 hover:from-blue-950/30' 
                  : isCase2 
                    ? 'from-emerald-950/20 via-slate-900/40 to-slate-950/90 hover:from-emerald-950/30' 
                    : 'from-cyan-950/20 via-slate-900/40 to-slate-950/90 hover:from-cyan-950/30';

                return (
                  <button
                    key={caseRef.id}
                    onClick={() => {
                      setActiveTabCase(caseRef.id);
                      const rootEl = document.getElementById('partners-section-root');
                      if (rootEl) {
                        rootEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`group relative p-6 md:p-8 rounded-3xl border ${cardBorder} bg-gradient-to-b ${bgGradient} transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between text-left h-full min-h-[290px] hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="space-y-4 w-full">
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${accentText}`}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-500">0{index + 1}</span>
                      </div>

                      <div className="space-y-1.5">
                        <span className={`text-[9px] font-mono font-extrabold tracking-widest uppercase block ${accentText}`}>
                          {language === 'en' && caseRef.industryEn ? caseRef.industryEn : caseRef.industry}
                        </span>
                        <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                          {language === 'en' && caseRef.clientEn ? caseRef.clientEn : caseRef.client}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-2 pt-1">
                          {language === 'en' && caseRef.challengeEn ? caseRef.challengeEn : caseRef.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/5 mt-6 flex items-center justify-between w-full">
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                        {language === 'en' ? 'Open Enterprise Log →' : '실증 기록서 열람 →'}
                      </span>
                      <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all ${accentText}`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Active Selected Enterprise Mode: Renders top task bar + chosen enterprise details */
            <div className="space-y-5 animate-fade-in">
              
              {/* Top Navigation Bar: Back to List + Segmented Switcher (Zero Scroll layout) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 backdrop-blur-md">
                <button
                  onClick={() => setActiveTabCase(null)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl cursor-pointer transition-all self-start"
                >
                  <ArrowLeft className="w-4 h-4 text-cyan-400" />
                  {language === 'en' ? 'Back to Enterprise List' : '← 협력기업 목록으로 돌아가기'}
                </button>

                {/* Switch easily on the fly */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-white/5 rounded-xl">
                  {MOASD_CASES.map((caseRef) => {
                    const isCurActive = caseRef.id === activeTabCase;
                    return (
                      <button
                        key={caseRef.id}
                        onClick={() => setActiveTabCase(caseRef.id)}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          isCurActive
                            ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/15'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {language === 'en' && caseRef.clientEn ? caseRef.clientEn : caseRef.client}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seamless, High-End Details board */}
              <AnimatePresence mode="wait">
                {MOASD_CASES.filter(c => c.id === activeTabCase).map((activeStudy) => (
                  <motion.div
                    key={activeStudy.id}
                    initial={{ opacity: 0, scale: 0.99, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* The main details panel */}
                    <div className="border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
                        <div className="space-y-1.5 text-left">
                          <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-400 font-mono">
                            <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-2.5 py-1 rounded-md">
                              {language === 'en' && activeStudy.industryEn ? activeStudy.industryEn : activeStudy.industry}
                            </span>
                            <span>• {language === 'en' ? 'Verified Success Reference' : '정합 수렴 검증 완료'}</span>
                          </div>
                          <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                            {language === 'en' && activeStudy.clientEn ? activeStudy.clientEn : activeStudy.client}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs text-emerald-400 font-bold font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE REPORT
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Left: Challenge and Solution and Result info boxes */}
                        <div className="space-y-5 text-left">
                          {/* Issue Box (Red left line) */}
                          <div className="pl-4 border-l-2 border-red-500/50 space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider block uppercase">
                              {language === 'en' ? 'INITIALLY IDENTIFIED FRICTION' : '기존 핵심 해결 장벽'}
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              {language === 'en' && activeStudy.challengeEn ? activeStudy.challengeEn : activeStudy.challenge}
                            </p>
                          </div>

                          {/* Solution Applied Box (Cyan left line) */}
                          <div className="pl-4 border-l-2 border-cyan-400/50 space-y-1">
                            <span className="text-[10px] font-mono text-cyan-400/80 font-bold tracking-wider block uppercase">
                              {language === 'en' ? 'MOASD APPLIED MEDICINE' : 'MOASD 적용 핵심 솔루션'}
                            </span>
                            <p className="text-xs text-cyan-300 leading-relaxed font-medium">
                              {language === 'en' && activeStudy.solutionEn ? activeStudy.solutionEn : activeStudy.solution}
                            </p>
                          </div>

                          {/* Result Summary Box (Green left line) */}
                          <div className="pl-4 border-l-2 border-emerald-500/50 space-y-1">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider block uppercase">
                              {language === 'en' ? 'RESULT & IMPACT GAINED' : '실증 개선 성과 수치'}
                            </span>
                            <p className="text-xs text-emerald-300 font-semibold leading-relaxed">
                              {language === 'en' && activeStudy.resultEn ? activeStudy.resultEn : activeStudy.result}
                            </p>
                          </div>
                        </div>

                        {/* Right: Metrics graphics */}
                        <div className="space-y-4 p-5 rounded-2xl bg-slate-900/60 border border-white/5 text-left">
                          <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
                            {language === 'en' ? 'Key Optimization Metrics Active' : '핵심 연계 최적화 지표'}
                          </h4>

                          {activeStudy.metrics.map((metric, mIdx) => {
                            const label = language === 'en' && metric.labelEn ? metric.labelEn : metric.label;
                            let valueStr = metric.value;
                            if (language === 'en') {
                              valueStr = valueStr
                                .replace('초', 's')
                                .replace('연장', ' Ext')
                                .replace('격감', ' Cut')
                                .replace('절감', ' Saved');
                            }

                            return (
                              <div key={mIdx} className="space-y-2 p-3 rounded-lg bg-slate-950/80 border border-white/5 flex flex-col">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-semibold text-slate-300">{label}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`font-extrabold font-mono tracking-tight text-right ${
                                      metric.trend === 'up' ? 'text-emerald-400' : 'text-cyan-400'
                                    }`}>
                                      {valueStr}
                                    </span>
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                      metric.trend === 'up' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'
                                    }`} />
                                  </div>
                                </div>

                                {/* Visual Bar chart utilizing HTML divs */}
                                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: metric.trend === 'up' ? '88%' : '20%' }}
                                    transition={{ duration: 0.8, delay: mIdx * 0.15 }}
                                    className={`h-full rounded-full ${
                                      metric.trend === 'up' ? 'bg-gradient-to-r from-emerald-500/40 to-emerald-400' : 'bg-gradient-to-r from-cyan-500/40 to-cyan-400'
                                    }`}
                                  />
                                </div>
                              </div>
                            );
                          })}

                          {/* Simulated Growth Trend Arrow */}
                          <div className="mt-2 text-center text-[10px] font-mono text-slate-500 uppercase flex items-center justify-center gap-1 flex-row">
                            <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" /> SYSTEM LEVEL: ACCELERATED SUCCESS
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-white/5 text-[10px] text-slate-500 font-mono text-left">
                        {t(
                          'cases.disclaimer',
                          '※ This information consists of actual operating logs adjusted under our standard information safety protocols.',
                          '※ 해당 정보는 정보 관리 협약 하에 가공 수치 조정 처리된 실증 오퍼레이팅 기록서입니다.'
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  ) : currentTab === 'mediacenter' ? (
    <div className="pt-16 min-h-[85vh] bg-slate-950">
      <MediaCenter language={language} />
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
        products={products}
        setProducts={setProducts}
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
                <strong>{language === 'en' ? "Contact Sales:" : "수신 연락처:"}</strong> jsc01020102@gmail.com
              </p>
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
                    ? '(주)MOASD integrates world-class US CAS-registered SAM materials, pioneering state-of-the-art supercapacitor systems.'
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
                  (inputVal === '장세창' || inputVal === 'jsc01020102@gmail.com' || inputVal === 'master') &&
                  inputPass === MASTER_ADMIN_PASS
                ) {
                  const masterUser = {
                    email: 'jsc01020102@gmail.com',
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
                    loginTime: new Date().toISOString()
                  };
                  sessionStorage.setItem('moasd_admin_session', JSON.stringify(adminSession));
                  localStorage.setItem('moasd_partner_user', JSON.stringify(masterUser));
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
                      localStorage.setItem('moasd_partner_user', JSON.stringify(matchedMember));
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
                        localStorage.setItem('moasd_partner_user', JSON.stringify(storedLocalUser));
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
                      localStorage.setItem('moasd_partner_user', JSON.stringify(matchedMember));
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
                        localStorage.setItem('moasd_partner_user', JSON.stringify(storedLocalUser));
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
    </div>
  );
}
