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
import { ConsultingSimulator } from './components/ConsultingSimulator';
import { MainHeroSlider } from './components/MainHeroSlider';
import { Factory3DWalkthrough } from './components/Factory3DWalkthrough';
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
  ThumbsUp, 
  Lock,
  FileCheck2
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
  const [activeTabCase, setActiveTabCase] = useState<string>('case-1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Estimation state for Proposal Engine
  const [clientCompany, setClientCompany] = useState<string>('');
  const [selectedObjective, setSelectedObjective] = useState<string>('solution-consulting');
  const [scopeSize, setScopeSize] = useState<string>('medium');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute values for proposal draft
  const getProposalMetrics = () => {
    const isEn = language === 'en';
    let duration = isEn ? '4 to 6 Weeks' : '4주 ~ 6주';
    let expectedGains = isEn ? '80% reporting labor reduction, instant pipeline easing' : '보고서 공수 80% 절감, 파이프라인 정체 전격 완화';
    let consultantTier = isEn ? '2 Senior Consultants Assigned' : '시니어 컨설턴트 2인 배정';
    let priority = isEn ? 'Priority execution of intensive inefficiency diagnosis' : '중점 비효율 정밀 진단 우선 실행';

    if (selectedObjective === 'solution-provision') {
      duration = isEn ? '6 to 8 Weeks' : '6주 ~ 8주';
      expectedGains = isEn ? 'Seamless system architecture link, 35% license leak prevention' : '시스템 아키텍처 연동 무결화, 라이선스 누수 35% 차단';
      consultantTier = isEn ? 'Lead Tech Architect & 3 Partners Assigned' : '테크 아키텍트 리드 및 파트너 3인 배정';
      priority = isEn ? 'Legacy analysis & core module migration integration' : '레거시 분석 및 핵심 모듈 결합 마이그레이션';
    } else if (selectedObjective === 'collaboration-build') {
      duration = isEn ? '3 to 5 Weeks' : '3주 ~ 5주';
      expectedGains = isEn ? 'Company-wide milestone sync, zero communication latency' : '전사 실시간 마일스톤 동기화, 커뮤니케이션 오차 제로화';
      consultantTier = isEn ? '2 Agile Operation Coaches Assigned' : '오퍼레이션 코치 2인 배정';
      priority = isEn ? 'Transplanting standardized workflow to eliminate silos' : '사일로 타파 플랫폼 표준 워크플로우 이식';
    } else if (selectedObjective === 'performance-mgmt') {
      duration = isEn ? '5 to 7 Weeks' : '5주 ~ 7주';
      expectedGains = isEn ? '100% quantitative KPI indicator consensus, target deadline reduction' : '지표 기반 정량 평가 동의율 100%, 목표 완성 기한 단축';
      consultantTier = isEn ? 'Strategic Process Partner & Data Analysts Assigned' : '전략 프로세스 파트너 및 데이터 분석가 배정';
      priority = isEn ? 'Deploying auto-linked department contribution portals' : '부서별 기여 지점 자동 연동 모니터링 체계 도입';
    }

    if (scopeSize === 'large') {
      duration = isEn ? 'Around 12 Weeks' : '12주 내외';
      consultantTier = isEn ? 'Consortium Lead Director & Special TF Activated' : '컨소시엄 리드 임원 및 직속 스페셜 태스크포스(TF) 가동';
    } else if (scopeSize === 'small') {
      duration = isEn ? '3 to 4 Weeks' : '3주 ~ 4주';
      consultantTier = isEn ? '1 Dedicated Lead Consultant focusing exclusively' : '단독 전담 집중 실행 컨설턴트 1인 리드';
    }

    return { duration, expectedGains, consultantTier, priority };
  };

  const proposal = getProposalMetrics();

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientCompany.trim()) {
      alert(language === 'en' ? 'Please enter your corporate name.' : '기업명을 입력해 주십시오.');
      return;
    }
    setIsSubmitted(true);
    setSubmissionFeedback(
      language === 'en'
        ? `Corporate matching files for ${clientCompany} have been successfully synced to (주)MOASD precision diagnostics. Our certified consultant will reach out within 24 business hours with an initial draft.`
        : `(주)MOASD 정밀 진단 포트폴리오 분석 시스템에 ${clientCompany}님의 매칭 사양이 정상 전송되었습니다. 검증된 실전 컨설턴트가 영업일 기준 24시간 이내에 분석 제안서 초안과 함께 연락을 드리겠습니다.`
    );
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
          <a href="#" className="flex items-center gap-2.5 group">
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
            <a href="#strengths-section" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              {t('nav.about', 'About Us', '회사소개')}
            </a>
            <a href="#services-section" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              {t('nav.solutions', 'Solutions', '솔루션')}
            </a>
            <a href="#cases-section" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              {t('nav.partners', 'Partners', '협력기업')}
            </a>
            <a href="#simulator-section" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              {t('nav.business', 'Business Domain', '사업영역')}
            </a>
            <a href="#proposal-section" className="text-slate-300 hover:text-purple-400 font-medium transition-colors">
              {t('nav.support', 'Customer Support', '고객지원')}
            </a>
            <a href="#contact-section" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              {t('nav.b2b', 'B2B Mall', '사업자몰')}
            </a>
          </nav>

          {/* Nav Right CTA Button & Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
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
              {t('nav.cta', 'Request Consultation', '전담 의뢰 신청')}
            </a>
          </div>

          {/* Mobile Right Block with Lang Switcher & Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
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
                  href="#strengths-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-300 hover:text-cyan-400 block border-b border-white/5"
                >
                  {t('nav.about', 'About Us', '회사소개')}
                </a>
                <a 
                  href="#services-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-300 hover:text-cyan-400 block border-b border-white/5"
                >
                  {t('nav.solutions', 'Solutions', '솔루션')}
                </a>
                <a 
                  href="#cases-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-300 hover:text-cyan-400 block border-b border-white/5"
                >
                  {t('nav.partners', 'Partners', '협력기업')}
                </a>
                <a 
                  href="#simulator-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-300 hover:text-cyan-400 block border-b border-white/5"
                >
                  {t('nav.business', 'Business Domain', '사업영역')}
                </a>
                <a 
                  href="#proposal-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-300 hover:text-purple-400 block border-b border-white/5"
                >
                  {t('nav.support', 'Customer Support', '고객지원')}
                </a>
                <a 
                  href="#contact-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-300 hover:text-cyan-400 block whitespace-nowrap"
                >
                  {t('nav.b2b', 'B2B Mall', '사업자몰')}
                </a>
                <a 
                  href="#proposal-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full text-center py-3 rounded-lg bg-cyan-400 text-slate-950 font-bold block"
                >
                  {t('nav.cta', 'Request Consultation', '전담 의뢰 신청')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Panoramic Enterprise Hero Screen Slider (KEPCO style) */}
      <MainHeroSlider />

      {/* 3. Company Introduction Section (Bento Grid of 3D Glassmorphic Cards) */}
      <section id="strengths-section" className="py-24 max-w-7xl mx-auto px-6 relative">
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
                className="h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 shadow-inner">
                        {getIcon(strength.id)}
                      </div>
                      <span className="text-[10px] font-mono font-extrabold tracking-widest text-cyan-400 bg-slate-900 px-3 py-1.5 rounded-full border border-white/5">
                        {strength.badge}
                      </span>
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
                    <span>MOASD FOCUS CRITERIA</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </section>

      {/* 4. Representative Services Slider Panel (3D Carousel) */}
      <section id="services-section" className="py-24 bg-gradient-to-b from-transparent via-slate-950/40 to-transparent relative">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> KEY SYSTEM SOLUTIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
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

        {/* 3D Sliding Stage component */}
        <ThreeDCarousel />
      </section>

      {/* 5. Business Domain & Interactive Production Line Tour (사업영역) */}
      <section id="simulator-section" className="py-24 max-w-7xl mx-auto px-6 relative space-y-12">
        <Factory3DWalkthrough />
        <ConsultingSimulator />
      </section>

      {/* 6. Success Client Case Studies (Translucent Glassmorphism Tab selection & Custom CSS chart statistics) */}
      <section id="cases-section" className="py-24 max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> CLIENT LOG REFS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {t('partners.title', 'Partner Collaborations', '협력기업')}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'partners.desc',
              'This is the verified record of real-time power metrics, stabilization factors, and operational cost savings achieved when these leading enterprises integrated MOASD solutions.',
              '주요 기업들이 (주)MOASD의 정합 수렴 프로세스를 도입한 결과 축적된 실제 파워매트릭스 성능 향상 기록서입니다.'
            )}
          </p>
        </div>

        {/* Glass Tabs selections */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
          {MOASD_CASES.map((caseRef) => {
            const tabName = language === 'en' && caseRef.clientEn 
              ? caseRef.clientEn.replace('Co., Ltd.', '').trim() 
              : caseRef.client.split(' ')[0];
            return (
              <button
                key={caseRef.id}
                onClick={() => setActiveTabCase(caseRef.id)}
                id={`case-tab-${caseRef.id}`}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-tight border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTabCase === caseRef.id
                    ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/10 scale-105'
                    : 'bg-slate-900/60 text-slate-300 border-white/5 hover:border-white/15'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{tabName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study detailed board */}
        <AnimatePresence mode="wait">
          {MOASD_CASES.filter(c => c.id === activeTabCase).map((activeStudy) => (
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-white/5 bg-slate-900/15 backdrop-blur-xl p-6 md:p-10 rounded-3xl"
            >
              {/* Context Summary left (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-400 font-mono">
                    <span className="font-bold uppercase tracking-wider bg-slate-900 border border-white/5 px-3 py-1.5 rounded-md">
                      {language === 'en' && activeStudy.industryEn ? activeStudy.industryEn : activeStudy.industry}
                    </span>
                    <span>• Verified Success Reference</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                    {language === 'en' && activeStudy.clientEn ? activeStudy.clientEn : activeStudy.client}
                  </h3>

                  <div className="space-y-4">
                    {/* Issue Box (Red left line) */}
                    <div className="pl-4 border-l-2 border-red-500/50 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider">
                        {language === 'en' ? 'INITIALLY IDENTIFIED FRICTION' : '기존 핵심 해결 장벽'}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {language === 'en' && activeStudy.challengeEn ? activeStudy.challengeEn : activeStudy.challenge}
                      </p>
                    </div>

                    {/* Solution Applied Box (Cyan left line) */}
                    <div className="pl-4 border-l-2 border-cyan-400/50 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400/80 font-bold tracking-wider">
                        {language === 'en' ? 'MOASD APPLIED MEDICINE' : 'MOASD 적용 핵심 솔루션'}
                      </span>
                      <p className="text-xs text-cyan-300 leading-relaxed font-medium">
                        {language === 'en' && activeStudy.solutionEn ? activeStudy.solutionEn : activeStudy.solution}
                      </p>
                    </div>

                    {/* Result Summary Box (Green left line) */}
                    <div className="pl-4 border-l-2 border-emerald-500/50 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
                        {language === 'en' ? 'RESULT & IMPACT GAINED' : '실증 개선 성과 수치'}
                      </span>
                      <p className="text-xs text-emerald-300 font-semibold leading-relaxed">
                        {language === 'en' && activeStudy.resultEn ? activeStudy.resultEn : activeStudy.result}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-[11px] text-slate-500 font-mono">
                  {t(
                    'cases.disclaimer',
                    '※ This information consists of actual operating logs adjusted under our standard information safety protocols.',
                    '※ 해당 정보는 정보 관리 협약 하에 가공 수치 조정 처리된 실증 오퍼레이팅 기록서입니다.'
                  )}
                </div>
              </div>

              {/* Statistics Chart & KPI Displays Right (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center gap-5 p-6 rounded-2xl bg-slate-900/60 border border-white/5">
                <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-2">
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
                    <div key={mIdx} className="space-y-2 p-3.5 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-300">{label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-base font-extrabold font-mono tracking-tight ${
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
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
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
                <div className="mt-2 text-center text-[10px] font-mono text-slate-500 uppercase flex items-center justify-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" /> SYSTEM LEVEL: ACCELERATED SUCCESS
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 7. Strategic Consultation Estimate & Proposal Build Engine */}
      <section id="proposal-section" className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form left (6 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs text-cyan-400 font-mono tracking-wider">
                <FileCheck2 className="w-4 h-4" /> SECURE SUPPORT & PROPOSALS
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                {t('support.title', 'Customer Support', '고객지원')}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t(
                  'support.desc',
                  'Please specify your core matching target and organization scale below. The MOASD consulting engine will immediately model estimated teams, milestones, and strategic recommendations for you.',
                  '현재 해소하고자 하시는 핵심 목표 사양과 조직 규모를 지정해 주십시오. 즉시 MOASD 컨설팅 알고리즘이 예상 투입 팀, 정밀 마일스톤 일수, 권장 사항을 모델링한 공식 기획서 초안 양식을 구성합니다.'
                )}
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-5 p-6 rounded-2xl bg-slate-900/40 border border-white/5">
              {/* Input: Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('support.form.company', 'Company / Division Name', '기업명 / 소속 부서명')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'e.g. MOASD Tech, Pipe Laboratory' : '예: MOASD 테크, 파이프 연구소'}
                  value={clientCompany}
                  onChange={(e) => {
                    setClientCompany(e.target.value);
                    setIsSubmitted(false);
                  }}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Select: Objective */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('support.form.objective', 'Key Matching Consult Area', '중점 매칭 컨설팅 영역')}
                </label>
                <select
                  value={selectedObjective}
                  onChange={(e) => {
                    setSelectedObjective(e.target.value);
                    setIsSubmitted(false);
                  }}
                  className="w-full px-3 py-3 text-xs md:text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="solution-provision">
                    {language === 'en' ? 'Solution Provision (System Architecture)' : '솔루션 제공 (시스템 아키텍처 연동)'}
                  </option>
                  <option value="solution-consulting">
                    {language === 'en' ? 'Solution Consulting (Sales & Strategy Option)' : '솔루션 컨설팅 (영업 및 전략 최적화)'}
                  </option>
                  <option value="collaboration-build">
                    {language === 'en' ? 'Collaboration Line Construction (Silo Removal)' : '협업 라인업 구축 (사일로 해체)'}
                  </option>
                  <option value="performance-mgmt">
                    {language === 'en' ? 'Operational Efficiency & Indicator Alignment (OKR)' : '조직 운영 및 실적 관리 체계 (지표 OKR)'}
                  </option>
                </select>
              </div>

              {/* Select: Scope Size */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('support.form.scope', 'Project Scale / Coverage Level', '프로젝트 규모 / 범위 레벨')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      id={`scope-btn-${size}`}
                      onClick={() => {
                        setScopeSize(size);
                        setIsSubmitted(false);
                      }}
                      className={`py-2 px-3 rounded-xl text-[10px] md:text-xs font-bold font-mono uppercase border transition-all cursor-pointer ${
                        scopeSize === size
                          ? 'bg-purple-500/10 border-purple-400 text-purple-300'
                          : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {size === 'small' 
                        ? (language === 'en' ? 'Small' : '소규모 단독') 
                        : size === 'medium' 
                        ? (language === 'en' ? 'Medium' : '중형 전사') 
                        : (language === 'en' ? 'Large' : '대형 컨소')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button: Simulate Inquiry */}
              <button
                type="submit"
                id="submit-proposal-btn"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 font-extrabold text-xs md:text-sm text-slate-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <Send className="w-4 h-4" /> 
                {language === 'en' ? 'Submit Inquiry & Unlock Proposal Draft' : '의뢰 접수 및 초안 잠금 해제'}
              </button>
            </form>
          </div>

          {/* Proposal draft document result right (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full justify-between border border-purple-500/20 bg-gradient-to-br from-slate-950 to-slate-900/60 p-6 md:p-8 rounded-3xl relative overflow-hidden">
            {/* Ambient secure locks layout */}
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> MOASD_DRAFTSECURE
            </div>

            <div className="space-y-5">
              <div className="border-b border-white/5 pb-4">
                <span className="text-lg md:text-xl font-bold text-white font-sans tracking-tight block">
                  {language === 'en' ? 'Strategic Business Operations Proposal' : '비즈니스 오퍼레이션 진단 제안서'}
                </span>
                <span className="text-[10px] font-mono text-purple-400 font-semibold tracking-wider block mt-1 uppercase">
                  CONFIDENTIAL CONSULTING PROPOSAL DRAFT
                </span>
                <div className="flex justify-between items-center text-xs mt-3">
                  <span className="text-slate-400">
                    {language === 'en' ? 'To:' : '수신:'}{' '}
                    <strong className="text-white">
                      {clientCompany || (language === 'en' ? 'Valued Partner' : '의뢰 기업 파트너')} {language === 'en' ? '' : '귀하'}
                    </strong>
                  </span>
                  <span className="text-slate-500 font-mono">Status: {isSubmitted ? 'SUBMITTED' : 'EDITING'}</span>
                </div>
              </div>

              {/* Calculated Specifications Table */}
              <div className="space-y-4">
                {/* Milestone duration */}
                <div className="flex justify-between items-start text-xs py-2 border-b border-white/5 gap-2">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    {language === 'en' ? 'Expected Project Duration' : '예상 프로젝트 추진 소요일'}
                  </span>
                  <span className="text-slate-200 font-bold text-right font-sans">{proposal.duration}</span>
                </div>

                {/* Team Assignment */}
                <div className="flex justify-between items-start text-xs py-2 border-b border-white/5 gap-2">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    {language === 'en' ? 'Assigned Consultant Tier' : '배정 예정 컨설턴트급'}
                  </span>
                  <span className="text-slate-200 font-bold text-right font-sans">{proposal.consultantTier}</span>
                </div>

                {/* Impact expected */}
                <div className="flex justify-between items-start text-xs py-2 border-b border-white/5 gap-2">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    {language === 'en' ? 'Quantifiable Key Performance Indicator' : '정량화 목표 핵심 성과 지표'}
                  </span>
                  <span className="text-cyan-400 font-bold text-right font-sans">{proposal.expectedGains}</span>
                </div>

                {/* Scope priority */}
                <div className="flex justify-between items-start text-xs py-2 border-b border-white/5 gap-2">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    {language === 'en' ? 'Critical Initial Execution Task' : '최우선 개시 설계 및 실행 태스크'}
                  </span>
                  <span className="text-purple-400 font-bold text-right font-sans">{proposal.priority}</span>
                </div>
              </div>

              {/* Secure statement draft text */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-400 leading-relaxed font-sans space-y-2">
                <p>
                  {language === 'en'
                    ? 'This auto-modeled draft is built in matching correlation with your reported scale matrix, linking historical database audit templates (v4.2) and verified operational metrics.'
                    : '본 제안서는 귀사가 명기해 주신 오퍼레이션 규모 매트릭스에 매칭되어, (주)MOASD 내부 축적 진료 이력서(Data Case reference v4.2)와 실효 성능을 연동하여 자동 도출되었습니다.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'MOASD Co., Ltd. vertically aligns corporate strategy and sales pipes, auditing all communication pipelines to ensure absolute decision integrity.'
                    : '(주)MOASD는 전략과 영업 병목 지점을 수직 정렬하고 내부 보고 전 과정을 정밀화하여 의사결정의 무결성을 보장합니다.'}
                </p>
              </div>

              {/* Inquiry Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    id="submission-success-indicator"
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-medium leading-relaxed"
                  >
                    <div className="flex gap-2 items-center mb-1">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <strong className="text-emerald-300">
                        {language === 'en' ? 'Proposal Match Success' : '의뢰 제안서 매칭 완료'}
                      </strong>
                    </div>
                    {submissionFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated Watermark */}
            <div className="pt-8 text-center text-[10px] font-mono text-slate-600 block leading-tight">
              (주)MOASD CORPORATE PORTFOLIO DIAGNOSTIC SERVICE GROUP
              <br /> All calculations are subject to custom operations auditing.
            </div>
          </div>
        </div>
      </section>

      {/* 8. Modern Professional footer coordinates layout */}
      <footer id="contact-section" className="border-t border-white/5 bg-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Brand left (5 cols) */}
          <div className="space-y-4 md:col-span-5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <CompanyLogoIcon className="w-8 h-8" />
              <span className="text-base font-extrabold text-white font-sans tracking-tight">
                (주)MOASD
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              우리는 복잡한 비즈니스 파이프라인의 핵심 실측 구조를 진단하고 수작업을 배제한 완벽한 자동 보고 체계와 실전형 컨설팅 솔루션을 제공합니다.
            </p>
            <div className="text-xs text-slate-600 font-mono">
              Copyright © 2026 (주)MOASD. All Rights Reserved.
            </div>
          </div>

          {/* Coordinates Details Right (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-slate-400 text-center sm:text-left">
            {/* Services navigation links */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-300 tracking-wider">포커스 서비스 파이프라인</h4>
              <ul className="space-y-2 text-slate-500 leading-relaxed font-sans">
                <li>• 맞춤 아키텍처 솔루션 제공 및 매치업</li>
                <li>• 전략 수립 및 영업 프로세스 무결화</li>
                <li>• 전사 협업 라인업 플랫폼 이식</li>
                <li>• 지표 중심 OKR 실적 관리 대치판 설치</li>
                <li>• 보고서 자동화 및 BI 데이터 다이렉트화</li>
              </ul>
            </div>

            {/* Corporate Address & Registry codes */}
            <div className="space-y-3 text-slate-500 leading-normal">
              <h4 className="font-bold text-slate-300 tracking-wider">사업자몰 정보</h4>
              <p>
                <strong>상호명:</strong> (주)MOASD (주식회사 모아에스디)
              </p>
              <p>
                <strong>설립역할:</strong> 기업 핵심 솔루션 제공 및 실무 코칭 컨설팅
              </p>
              <p>
                <strong>사업내역:</strong> 비즈니스 프로세스 개선 컨설팅 및 SI 솔루션 연동
              </p>
              <p>
                <strong>수신 연락처:</strong> jsc01020102@gmail.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
