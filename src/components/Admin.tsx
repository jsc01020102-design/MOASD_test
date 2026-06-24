import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Trash2, 
  UserPlus, 
  Shield, 
  Plus, 
  Edit, 
  Check, 
  Lock, 
  LogOut, 
  Sliders, 
  FileEdit, 
  FolderPlus, 
  AlertTriangle,
  Send,
  UserCheck,
  Tag,
  Briefcase,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X as XIcon,
  Smartphone,
  Search
} from 'lucide-react';
// No B2bMall imports - B2B Mall has been deleted

interface AdminUser {
  id: string;
  name: string;
  phone: string;
  password?: string;
  roleLabel: string; // 'S', '1', '2', '3', '4', '5'
}

interface MemberUser {
  email: string;
  name: string;
  company: string;
  phone: string;
  regDate: string;
  role: 'general' | 'partner';
  partnerCode?: string;
}

interface AdminProps {
  language: 'ko' | 'en';
  registeredUser: MemberUser | null;
  setRegisteredUser: (user: MemberUser | null) => void;
  setIsSignedUp: (isSigned: boolean) => void;
}

export const Admin: React.FC<AdminProps> = ({
  language,
  registeredUser,
  setRegisteredUser,
  setIsSignedUp
}) => {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('moasd_admin_session') !== null;
  });
  
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem('moasd_admin_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'master-admin' || parsed.name?.includes('장세창')) {
          parsed.roleLabel = 'S';
          sessionStorage.setItem('moasd_admin_session', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {}
    }
    return null;
  });

  // Login inputs
  const [loginMode, setLoginMode] = useState<'master' | 'sub'>('master');
  const [masterCodeInput, setMasterCodeInput] = useState('');
  const [subAdminNameInput, setSubAdminNameInput] = useState('');
  const [subAdminPassInput, setSubAdminPassInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [smsNotification, setSmsNotification] = useState<string | null>(null);

  useEffect(() => {
    if (smsNotification) {
      const timer = setTimeout(() => {
        setSmsNotification(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [smsNotification]);

  // Sub-admins database (Max 5, numbered 1 to 5)
  const [subAdmins, setSubAdmins] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('moasd_sub_admins');
    return saved ? JSON.parse(saved) : [];
  });

  // Registered members database
  const [members, setMembers] = useState<MemberUser[]>(() => {
    const saved = localStorage.getItem('moasd_member_list');
    let list: MemberUser[] = saved ? JSON.parse(saved) : [];
    
    // Seed default Enterprise Users for high realism if empty or if we want some defaults
    if (list.length === 0) {
      list = [
        {
          email: 'kepco_planning_hq@kebco.co.kr',
          name: '김우중 상무',
          company: '한국전력공사 에너지계획본부',
          phone: '010-4822-9011',
          regDate: '2026.04.12',
          role: 'partner',
          partnerCode: 'MOASD_PARTNER'
        },
        {
          email: 'samyang_procure@syelectric.com',
          name: '이지한 선임',
          company: '삼양전기공업 구매팀',
          phone: '010-9112-4045',
          regDate: '2026.05.02',
          role: 'general'
        },
        {
          email: 'hanwha_sol_strategic@hanwha.com',
          name: '최태완 수석',
          company: '한화솔루션 신재생전략파트',
          phone: '010-2394-8802',
          regDate: '2026.06.10',
          role: 'partner',
          partnerCode: 'MOASD_B2B'
        }
      ];
      localStorage.setItem('moasd_member_list', JSON.stringify(list));
    }
    return list;
  });

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'members' | 'subadmins' | 'sms'>('members');

  // SubAdmin Form states
  const [newSubName, setNewSubName] = useState('');
  const [newSubPhone, setNewSubPhone] = useState('');
  const [newSubPass, setNewSubPass] = useState('');
  const [subAdminError, setSubAdminError] = useState('');

  // Member Form states
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemEmail, setNewMemEmail] = useState('');
  const [newMemName, setNewMemName] = useState('');
  const [newMemCompany, setNewMemCompany] = useState('');
  const [newMemPhone, setNewMemPhone] = useState('');
  const [newMemRole, setNewMemRole] = useState<'general' | 'partner'>('general');

  // Member Search states
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [memberSearchType, setMemberSearchType] = useState<'name' | 'code'>('name');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [appliedSearchType, setAppliedSearchType] = useState<'name' | 'code'>('name');

  // Sync registered user with the member list
  useEffect(() => {
    if (registeredUser) {
      // If our current registration is not in the list, insert/update it
      const exists = members.some(m => m.email === registeredUser.email);
      if (!exists) {
        const updated = [registeredUser, ...members];
        setMembers(updated);
        localStorage.setItem('moasd_member_list', JSON.stringify(updated));
      } else {
        // sync roles
        const updated = members.map(m => {
          if (m.email === registeredUser.email) {
            return registeredUser;
          }
          return m;
        });
        // Check if there are differences to avoid infinite loop
        if (JSON.stringify(updated) !== JSON.stringify(members)) {
          setMembers(updated);
          localStorage.setItem('moasd_member_list', JSON.stringify(updated));
        }
      }
    }
  }, [registeredUser]);

  // Persist sub admins
  useEffect(() => {
    localStorage.setItem('moasd_sub_admins', JSON.stringify(subAdmins));
  }, [subAdmins]);

  // Master credentials
  const MASTER_ADMIN_INFO = {
    name: '장세창',
    residentNumber: '770102-1565719',
    phone: '010-2242-7801',
    code: '0815)*!%',
    roleLabel: 'S'
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setSmsNotification(null);

    if (loginMode === 'master') {
      if (masterCodeInput === MASTER_ADMIN_INFO.code) {
        // Successful Master login
        const masterSession: AdminUser = {
          id: 'master-admin',
          name: MASTER_ADMIN_INFO.name,
          phone: MASTER_ADMIN_INFO.phone,
          roleLabel: MASTER_ADMIN_INFO.roleLabel
        };
        sessionStorage.setItem('moasd_admin_session', JSON.stringify(masterSession));
        setCurrentAdmin(masterSession);
        setIsLoggedIn(true);

        // Sync with general application B2B privileges
        const masterUser: MemberUser = {
          email: 'sinhwaensol@gmail.com',
          name: '장세창 (최고 마스터 관리자)',
          company: '(주)MOASD 본사',
          phone: MASTER_ADMIN_INFO.phone,
          regDate: new Date().toLocaleDateString(),
          role: 'partner',
          partnerCode: 'MOASD_PARTNER'
        };
        localStorage.setItem('moasd_partner_user', JSON.stringify(masterUser));
        setRegisteredUser(masterUser);
        setIsSignedUp(true);

        // SMS Notification Toast
        const notificationMsg = language === 'en'
          ? `[SMS Dispatched] Master Admin J***, a security notification SMS has been successfully dispatched to your registered contact (010-2242-****).`
          : `[SMS 전송 안내] 마스터 최고 관리자 장*창 님, 등록 연락처(010-2242-****)로 '관리자 시스템에 접속하였습니다.' 안내 문자가 성공적으로 전송되었습니다.`;
        setSmsNotification(notificationMsg);
      } else {
        setLoginError(language === 'en' ? 'Incorrect Master Code.' : '올바르지 않은 마스터 관리자 인증번호입니다.');
      }
    } else {
      // Sub admin login
      if (!subAdminNameInput.trim() || !subAdminPassInput.trim()) {
        setLoginError(language === 'en' ? 'Please fill in all credentials.' : '모든 로그인 정보를 올바르게 입력해 주십시오.');
        return;
      }

      const matchingSub = subAdmins.find(
        sub => sub.name.trim() === subAdminNameInput.trim() && sub.password === subAdminPassInput.trim()
      );

      if (matchingSub) {
        sessionStorage.setItem('moasd_admin_session', JSON.stringify(matchingSub));
        setCurrentAdmin(matchingSub);
        setIsLoggedIn(true);

        // Sync with general application B2B privileges
        const subUser: MemberUser = {
          email: `${matchingSub.name.replace(/\s/g, '').toLowerCase()}@moasd.com`,
          name: `${matchingSub.name} (관리자)`,
          company: '(주)MOASD 운영부서',
          phone: matchingSub.phone,
          regDate: new Date().toLocaleDateString(),
          role: 'partner',
          partnerCode: 'MOASD_PARTNER'
        };
        localStorage.setItem('moasd_partner_user', JSON.stringify(subUser));
        setRegisteredUser(subUser);
        setIsSignedUp(true);
      } else {
        setLoginError(language === 'en' ? 'Invalid admin name or password.' : '등록된 관리자 이름 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('moasd_admin_session');
    localStorage.removeItem('moasd_partner_user');
    setRegisteredUser(null);
    setIsSignedUp(false);
    setCurrentAdmin(null);
    setIsLoggedIn(false);
    setMasterCodeInput('');
    setSubAdminNameInput('');
    setSubAdminPassInput('');
  };

  // Add new Sub-Admin (Master only)
  const handleAddSubAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubAdminError('');

    if (currentAdmin?.roleLabel !== 'S') {
      setSubAdminError(language === 'en' ? 'Only Master Admin can register admins.' : '마스터 관리자만 관리자를 지정할 수 있습니다.');
      return;
    }

    if (subAdmins.length >= 5) {
      setSubAdminError(language === 'en' ? 'Maximum limit of 5 admins reached.' : '추가 지정할 수 있는 관리자의 수는 최대 5명(1번~5번)입니다.');
      return;
    }

    if (!newSubName.trim() || !newSubPhone.trim() || !newSubPass.trim()) {
      setSubAdminError(language === 'en' ? 'Please enter all administrator details.' : '추가할 관리자의 정보를 빈칸 없이 입력하십시오.');
      return;
    }

    // Determine the next available number (1 to 5)
    const usedLabels = subAdmins.map(sa => parseInt(sa.roleLabel)).filter(n => !isNaN(n));
    let nextLabelNum = 1;
    for (let i = 1; i <= 5; i++) {
      if (!usedLabels.includes(i)) {
        nextLabelNum = i;
        break;
      }
    }

    const newSub: AdminUser = {
      id: `sub-${Date.now()}`,
      name: newSubName.trim(),
      phone: newSubPhone.trim(),
      password: newSubPass.trim(),
      roleLabel: String(nextLabelNum)
    };

    const updatedSubAdmins = [...subAdmins, newSub].sort((a,b) => parseInt(a.roleLabel) - parseInt(b.roleLabel));
    setSubAdmins(updatedSubAdmins);

    // reset fields
    setNewSubName('');
    setNewSubPhone('');
    setNewSubPass('');
    alert(language === 'en' ? `Admin ${newSub.name} successfully registered at Slot No.${newSub.roleLabel}!` : `관리자 "${newSub.name}" 님이 No.${newSub.roleLabel} 슬롯에 안전하게 추가 지정되었습니다.`);
  };

  // Delete Sub-Admin (Master only)
  const handleDeleteSubAdmin = (id: string, name: string) => {
    if (currentAdmin?.roleLabel !== 'S') return;
    if (confirm(language === 'en' ? `Are you sure you want to remove Admin ${name}?` : `진짜로 관리자 ${name}의 권한을 즉격 파기시키겠습니까?`)) {
      const filtered = subAdmins.filter(sa => sa.id !== id);
      setSubAdmins(filtered);
    }
  };

  // Member management actions
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAdmin) return;

    if (!newMemEmail.trim() || !newMemName.trim() || !newMemCompany.trim() || !newMemPhone.trim()) {
      alert(language === 'en' ? 'Please fill out all member details.' : '회원 정보를 모두 빈칸 없이 입력하십시오.');
      return;
    }

    const emailLower = newMemEmail.trim().toLowerCase();
    const exists = members.some(m => m.email.toLowerCase() === emailLower);
    if (exists) {
      alert(language === 'en' ? 'This email address is already registered.' : '이미 가입 처리 완료된 이메일 주소입니다.');
      return;
    }

    const newMem: MemberUser = {
      email: emailLower,
      name: newMemName.trim(),
      company: newMemCompany.trim(),
      phone: newMemPhone.trim(),
      regDate: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1),
      role: newMemRole,
      partnerCode: newMemRole === 'partner' ? 'MOASD_PARTNER' : undefined
    };

    const updated = [newMem, ...members];
    setMembers(updated);
    localStorage.setItem('moasd_member_list', JSON.stringify(updated));

    // Clear form
    setNewMemEmail('');
    setNewMemName('');
    setNewMemCompany('');
    setNewMemPhone('');
    setNewMemRole('general');
    setShowAddMemberForm(false);

    alert(language === 'en' ? `Member "${newMem.name}" registered successfully!` : `회원 "${newMem.name}" 님이 성공적으로 신규 등록 배속 완료되었습니다.`);
  };

  const handleToggleMemberRole = (memberEmail: string) => {
    if (!currentAdmin) {
      alert(language === 'en' ? 'Only administrators can modify member privileges.' : '가입 회원의 등급 변경 권한은 인가된 관리자에게만 허용됩니다.');
      return;
    }

    const updatedMembers = members.map(m => {
      if (m.email === memberEmail) {
        const nextRole = m.role === 'partner' ? 'general' : 'partner';
        const partnerCode = nextRole === 'partner' ? 'MOASD_PARTNER' : undefined;
        
        // If this matches currently logged in user on home screen, sync their state
        if (registeredUser && registeredUser.email === memberEmail) {
          const updatedUser = { ...registeredUser, role: nextRole as 'general' | 'partner', partnerCode };
          localStorage.setItem('moasd_partner_user', JSON.stringify(updatedUser));
          setRegisteredUser(updatedUser);
          setIsSignedUp(true);
        }

        return { ...m, role: nextRole as 'general' | 'partner', partnerCode };
      }
      return m;
    });

    setMembers(updatedMembers);
    localStorage.setItem('moasd_member_list', JSON.stringify(updatedMembers));
  };

  const handleDeleteMember = (memberEmail: string) => {
    if (!currentAdmin) {
      alert(language === 'en' ? 'Only administrators can delete members.' : '가입 회원의 탈퇴 및 영구 파문 권한은 인가된 관리자에게만 허용됩니다.');
      return;
    }

    if (confirm(language === 'en' ? `Remove member ${memberEmail}?` : `${memberEmail} 회원의 시스템 등록 기록을 영구 삭제 처리하시겠습니까?`)) {
      const filtered = members.filter(m => m.email !== memberEmail);
      setMembers(filtered);
      localStorage.setItem('moasd_member_list', JSON.stringify(filtered));

      // If matches currently logged in user, log them out
      if (registeredUser && registeredUser.email === memberEmail) {
        localStorage.removeItem('moasd_partner_user');
        setRegisteredUser(null);
        setIsSignedUp(false);
      }
    }
  };

  const filteredMembers = members.filter(mem => {
    if (!appliedSearchTerm) return true;
    const cleanTerm = appliedSearchTerm.trim().toLowerCase().replace(/[- ]/g, '');
    if (!cleanTerm) return true;

    if (appliedSearchType === 'name') {
      const nameMatch = mem.name?.toLowerCase().includes(appliedSearchTerm.toLowerCase());
      const companyMatch = mem.company?.toLowerCase().includes(appliedSearchTerm.toLowerCase());
      return nameMatch || companyMatch;
    } else {
      // Code search:
      const cleanCode = (mem.partnerCode || '').trim().toLowerCase().replace(/[- ]/g, '');
      return cleanCode.includes(cleanTerm);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-slate-100 min-h-[80vh]">
      
      {/* SMS notification banners */}
      <AnimatePresence>
        {smsNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8 p-4.5 bg-cyan-400/10 border border-cyan-400/35 rounded-2xl flex items-center gap-4 text-left shadow-lg shadow-cyan-400/5 relative overflow-hidden"
          >
            <div className="w-1.5 h-full bg-cyan-400 absolute left-0 top-0 bottom-0" />
            <div className="p-2 rounded-xl bg-cyan-400/15 text-cyan-400 shrink-0">
              <Send className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-xs">
              <h4 className="font-extrabold text-cyan-400 uppercase tracking-widest font-mono text-[10px] mb-0.5">
                REAL-TIME SECURITY CONTACT SYSTEM DISPATCHED
              </h4>
              <p className="text-slate-100 font-medium leading-relaxed">
                {smsNotification}
              </p>
            </div>
            <button
              onClick={() => setSmsNotification(null)}
              className="ml-auto text-slate-400 hover:text-white text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded cursor-pointer border-0"
            >
              Okay
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-8 mb-10 gap-4">
        <div>
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
            {language === 'en' ? 'Central Administration Portal' : '통합 스마트 제어소'}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 tracking-tight font-sans">
            {language === 'en' ? 'MOASD Administrator System' : 'MOASD 관리자 중앙 관제 콘솔'}
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-sans">
            {language === 'en'
              ? 'Real-time corporate member validation, and secure credential auditing.'
              : '실시간 가입 회원 자격 승인/박탈, 관리자 계정 배치 및 전체 시스템 상태 정밀 모니터링.'}
          </p>
        </div>
        
        {isLoggedIn && (
          <div className="flex items-center gap-3 bg-slate-900 border border-white/5 px-4.5 py-2.5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-bold border border-cyan-400/20 text-xs font-mono">
              {currentAdmin?.roleLabel}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentAdmin?.name}
                <span className="text-[9px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded uppercase font-mono">
                  {currentAdmin?.roleLabel === 'S' ? 'Master (S)' : `Sub-No.${currentAdmin?.roleLabel}`}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">{currentAdmin?.phone}</div>
            </div>
            
            <button
              onClick={handleLogout}
              className="ml-4 hover:bg-white/5 p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer border-0 bg-transparent"
              title={language === 'en' ? 'Log Out' : '관리자 로그아웃'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {!isLoggedIn ? (
        /* Login Form Screen */
        <div className="max-w-md mx-auto relative z-10 pt-10">
          <div className="absolute inset-0 bg-cyan-400/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/5 p-8 shadow-2xl relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Shield className="w-7 h-7" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white tracking-tight leading-none">
                {language === 'en' ? 'Security Certification Portal' : '관리자 전용 인증 게이트웨이'}
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                {language === 'en' ? 'Please supply your authorized credential tier below.' : '권한이 인가된 고유 정보 또는 마스터 키를 입력하여 주십시오.'}
              </p>
            </div>

            {/* Login Tab Toggles */}
            <div className="grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-white/5 mb-6">
              <button 
                type="button"
                onClick={() => { setLoginMode('master'); setLoginError(''); }}
                className={`py-2 text-[11.5px] font-bold rounded-lg transition-all cursor-pointer border-0 ${loginMode === 'master' ? 'bg-cyan-400 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-slate-200 bg-transparent'}`}
              >
                {language === 'en' ? 'Master Admin' : '마스터 장세창'}
              </button>
              <button 
                type="button"
                onClick={() => { setLoginMode('sub'); setLoginError(''); }}
                className={`py-2 text-[11.5px] font-bold rounded-lg transition-all cursor-pointer border-0 ${loginMode === 'sub' ? 'bg-cyan-400 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-slate-200 bg-transparent'}`}
              >
                {language === 'en' ? 'Administrators' : '등록 관리자'}
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 text-left">
              {loginError && (
                <div className="p-3 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {loginMode === 'master' ? (
                /* Master Admin login */
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-cyan-500/20 text-[11px] text-slate-400 leading-relaxed font-sans space-y-1.5 shadow-inner">
                    <p className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      {language === 'en' ? 'Master Admin Secure Gateway' : '마스터 최고 관리자 정보 보안'}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      {language === 'en' 
                        ? 'For strict internal privacy and security compliance, the Master Admin personal details are fully masked. Please enter the authorized Master passkey below to gain system-wide bypass rights.' 
                        : '외부 비지니스 파트너망 환경에서의 기밀 및 개인정보 노출 방지를 위해 마스터 관리자의 상세 인적 식별 사항은 완벽히 차단 보호되고 있습니다. 인가받으신 마스터 번호를 투입해 주십시오.'}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 uppercase font-black block tracking-wider">
                      {language === 'en' ? 'Master Passkey' : '마스터 고유 시스템 번호 입력'}
                    </label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={masterCodeInput}
                      onChange={(e) => setMasterCodeInput(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-all font-mono outline-none"
                    />
                  </div>
                </div>
              ) : (
                /* Sub Admin Login */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 uppercase font-black block tracking-wider">
                      {language === 'en' ? 'Admin Username' : '관리자 등록 성함'}
                    </label>
                    <input 
                      type="text"
                      placeholder="예) 홍길동"
                      value={subAdminNameInput}
                      onChange={(e) => setSubAdminNameInput(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 uppercase font-black block tracking-wider">
                      {language === 'en' ? 'Assigned Passcode' : '관리자 고유 비밀번호'}
                    </label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={subAdminPassInput}
                      onChange={(e) => setSubAdminPassInput(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-all font-mono outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-350 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-cyan-400/20 active:scale-[0.99] cursor-pointer border-0 mt-2"
              >
                {language === 'en' ? 'AUTHENTICATE CREDS' : '지적 보안 권한 승인 인증 드로우'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Logged In Workspace Panel */
        <div className="space-y-8">
          
          {/* Sub Navigation */}
          <div className="flex border-b border-white/5 gap-2 overflow-x-auto pb-0.5">
            <button
              onClick={() => setActiveTab('members')}
              className={`pb-4 px-4 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer bg-transparent border-0 border-b-2 ${activeTab === 'members' ? 'text-cyan-400 border-cyan-400 font-extrabold' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
            >
              <Users className="w-4 h-4" />
              <span>{language === 'en' ? 'Registered Members' : '가입 회원 관리'}</span>
              <span className="text-[10px] bg-white/5 font-mono text-cyan-400 px-1.5 py-0.5 rounded-full font-bold">
                {members.length}
              </span>
            </button>

            {/* Only Master Admin can see/add sub-admins list tab */}
            {currentAdmin?.roleLabel === 'S' && (
              <button
                onClick={() => setActiveTab('subadmins')}
                className={`pb-4 px-4 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer bg-transparent border-0 border-b-2 ${activeTab === 'subadmins' ? 'text-cyan-400 border-cyan-400 font-extrabold' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
              >
                <Shield className="w-4 h-4" />
                <span>{language === 'en' ? 'Deploy Admins' : '관리자 발탁 (S)'}</span>
                <span className="text-[10px] bg-white/5 font-mono text-cyan-400 px-1.5 py-0.5 rounded-full font-bold">
                  {subAdmins.length}/5
                </span>
              </button>
            )}

            {/* Simulated SMS direct stream terminal panel */}
            <button
              onClick={() => setActiveTab('sms')}
              className={`pb-4 px-4 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer bg-transparent border-0 border-b-2 ${activeTab === 'sms' ? 'text-emerald-400 border-emerald-400 font-extrabold' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{language === 'en' ? 'Master Direct SMS Feed' : '마스터 SMS 수신 기록 단말기'}</span>
              <span className="text-[10px] bg-emerald-550/10 font-mono text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                {JSON.parse(localStorage.getItem('moasd_simulated_sms_logs') || '[]').length}
              </span>
            </button>
          </div>

          {/* Tab Panes */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 min-h-[500px]">
            
            {/* T1: Members Management */}
            {activeTab === 'members' && (
              <div className="space-y-6 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <UserCheck className="text-cyan-400 w-5 h-5" />
                    {language === 'en' ? 'Enterprise Client Base' : '가입 기업 및 바이어 인적 목록 상태'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Member Search bar */}
                    <div className="flex items-center gap-1.5 bg-slate-950/80 border border-white/10 rounded-xl px-2.5 py-1.5 shrink-0">
                      <select
                        value={memberSearchType}
                        onChange={(e) => setMemberSearchType(e.target.value as 'name' | 'code')}
                        className="bg-transparent text-slate-300 text-xs border-0 outline-none pr-1.5 font-bold cursor-pointer hover:text-white"
                      >
                        <option value="name" className="bg-slate-900 text-white">{language === 'en' ? 'Name' : '이름검색'}</option>
                        <option value="code" className="bg-slate-900 text-white">{language === 'en' ? 'Code' : '코드검색'}</option>
                      </select>
                      <div className="h-4 w-[1px] bg-white/10 shrink-0 mx-1" />
                      <input
                        type="text"
                        placeholder={memberSearchType === 'name' ? (language === 'en' ? 'Enter name...' : '이름/회사명...') : (language === 'en' ? 'M코드번호 입력...' : 'M코드번호 입력...')}
                        value={memberSearchTerm}
                        onChange={(e) => setMemberSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setAppliedSearchTerm(memberSearchTerm);
                            setAppliedSearchType(memberSearchType);
                          }
                        }}
                        className="bg-transparent text-slate-200 text-xs border-0 outline-none w-28 md:w-36 focus:ring-0 placeholder-slate-600 font-mono"
                      />
                      <button
                        onClick={() => {
                          setAppliedSearchTerm(memberSearchTerm);
                          setAppliedSearchType(memberSearchType);
                        }}
                        className="p-1 rounded-lg hover:bg-white/5 text-cyan-400 border-0 cursor-pointer transition-colors animate-pulse"
                        title={language === 'en' ? 'Search' : '검색'}
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>
                      {appliedSearchTerm && (
                        <button
                          onClick={() => {
                            setMemberSearchTerm('');
                            setAppliedSearchTerm('');
                          }}
                          className="p-1 rounded-lg hover:bg-white/5 text-slate-400 border-0 cursor-pointer transition-colors"
                          title={language === 'en' ? 'Reset' : '초기화'}
                        >
                          <XIcon className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowAddMemberForm(!showAddMemberForm)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-350 text-slate-950 font-extrabold text-xs tracking-wide transition-all shadow-md hover:shadow-cyan-400/10 cursor-pointer border-0 shrink-0"
                    >
                      <Plus className="w-4 h-4 stroke-[3px]" />
                      <span>{language === 'en' ? 'Add Member' : '신규 회원 수동 등록'}</span>
                    </button>
                    <span className="text-[11px] text-slate-450 font-mono">
                      {language === 'en' ? 'Synced instantly' : '관리 실시간 동기화 상태'}
                    </span>
                  </div>
                </div>

                {showAddMemberForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 space-y-4"
                  >
                    <h4 className="text-xs font-extrabold text-cyan-400 font-mono">
                      [SECURE ADMIT] REGISTER NEW CLIENT / BUYER MEMBER
                    </h4>
                    <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-400">{language === 'en' ? 'Email Address' : '이메일 주소'}</label>
                        <input
                          type="email"
                          required
                          value={newMemEmail}
                          onChange={e => setNewMemEmail(e.target.value)}
                          placeholder="partner@company.com"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-400">{language === 'en' ? 'Representative Name' : '기안자 대표 성명'}</label>
                        <input
                          type="text"
                          required
                          value={newMemName}
                          onChange={e => setNewMemName(e.target.value)}
                          placeholder="홍길동 대표"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-400">{language === 'en' ? 'Company Name' : '회사명 / 소속'}</label>
                        <input
                          type="text"
                          required
                          value={newMemCompany}
                          onChange={e => setNewMemCompany(e.target.value)}
                          placeholder="우주전력(주)"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-400">{language === 'en' ? 'Contact Phone' : '연락처 번호'}</label>
                        <input
                          type="text"
                          required
                          value={newMemPhone}
                          onChange={e => setNewMemPhone(e.target.value)}
                          placeholder="010-1234-5678"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-400">{language === 'en' ? 'Tier Class' : '부여 계정 등급'}</label>
                        <select
                          value={newMemRole}
                          onChange={e => setNewMemRole(e.target.value as 'general' | 'partner')}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                        >
                          <option value="general">{language === 'en' ? 'General' : '일반 등업 대기자'}</option>
                          <option value="partner">{language === 'en' ? 'B2B Partner' : 'B2B 파트너 자재몰 개방'}</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 lg:col-span-5 flex justify-end gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddMemberForm(false)}
                          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer border border-white/5"
                        >
                          {language === 'en' ? 'Cancel' : '취소하기'}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-350 text-slate-950 font-black text-xs cursor-pointer border-0 shadow-md shadow-cyan-400/10"
                        >
                          {language === 'en' ? 'Register' : '안전 등록 승인'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-950/60">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 font-bold uppercase tracking-wider font-mono">
                        <th className="p-4">{language === 'en' ? 'Company Name' : '회사명 / 소속'}</th>
                        <th className="p-4">{language === 'en' ? 'Representative' : '기안 대리자'}</th>
                        <th className="p-4">{language === 'en' ? 'Email / Contact' : '이메일 주소 / 연락처'}</th>
                        <th className="p-4">{language === 'en' ? 'Registered Date' : '최초 등록일'}</th>
                        <th className="p-4">{language === 'en' ? 'Tier / Authorization' : '계정 등급'}</th>
                        <th className="p-4 text-center">{language === 'en' ? 'Actions' : '직권 조치'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {filteredMembers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-slate-500 font-sans">
                            {language === 'en' ? 'No matching members found.' : '검색 조건에 부합하는 회원이 존재하지 않습니다.'}
                          </td>
                        </tr>
                      ) : (
                        filteredMembers.map((mem) => {
                          const isGlobalUser = registeredUser && registeredUser.email === mem.email;
                          return (
                            <tr key={mem.email} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-4 font-bold text-white flex items-center gap-2">
                                {mem.company}
                                {isGlobalUser && (
                                  <span className="text-[9px] font-mono font-black text-xs text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded-md animate-pulse">
                                    Current YOU
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-slate-200">{mem.name}</td>
                              <td className="p-4">
                                <div className="text-slate-300 font-mono">{mem.email}</div>
                                <div className="text-slate-500 text-[10px] mt-0.5 font-mono">{mem.phone}</div>
                              </td>
                              <td className="p-4 text-slate-450 font-mono">{mem.regDate}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest leading-none ${mem.role === 'partner' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-800 text-slate-400 border border-white/5'}`}>
                                  {mem.role === 'partner' ? 'PARTNER' : 'GENERAL'}
                                </span>
                                {mem.partnerCode && (
                                  <span className="block text-[9px] font-mono text-purple-400/70 mt-1 uppercase">
                                    Code: {mem.partnerCode}
                                  </span>
                                )}
                              </td>
                              <td className="p-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleToggleMemberRole(mem.email)}
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer border-0 ${
                                      mem.role === 'partner' ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' : 'bg-purple-400/10 hover:bg-purple-400/20 text-purple-400'
                                    }`}
                                    title={language === 'en' ? 'Toggle member level' : '일반/파트너 회원 등급 수동 전환'}
                                  >
                                    {mem.role === 'partner' ? '일반 전환' : '파트너 격상'}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMember(mem.email)}
                                    className="p-1.5 rounded-lg transition-all cursor-pointer border-0 bg-red-400/10 hover:bg-red-400/20 text-red-400"
                                    title={language === 'en' ? 'Revoke / Remove Registration' : '등록 정보 완전 영구 파문'}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* T2: Deploy Sub Admins (Master Only) */}
            {activeTab === 'subadmins' && currentAdmin?.roleLabel === 'S' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Left side: Add Sub Admin form */}
                <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <UserPlus className="text-cyan-400 w-4 h-4" />
                      {language === 'en' ? 'Deploy Administrator' : '관리자 신규 배속 등록'}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {language === 'en' ? 'Submit official name, passcode and direct contact. Max 5 allowed.' : '추가 지정은 1번부터 5번 포트 슬롯까지 배색 탑재할 수 있습니다.'}
                    </p>
                  </div>

                  {subAdminError && (
                    <div className="p-3 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{subAdminError}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddSubAdmin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-450 uppercase font-black tracking-wider block">
                        성함 (실명)
                      </label>
                      <input 
                        type="text"
                        placeholder="예) 홍길동"
                        value={newSubName}
                        onChange={(e) => setNewSubName(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-450 uppercase font-black tracking-wider block">
                        관리 비상 연락처
                      </label>
                      <input 
                        type="text"
                        placeholder="010-0000-0000"
                        value={newSubPhone}
                        onChange={(e) => setNewSubPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-450 uppercase font-black tracking-wider block">
                        로그인 비밀번호 소유권
                      </label>
                      <input 
                        type="password"
                        placeholder="6자리 이상 추천"
                        value={newSubPass}
                        onChange={(e) => setNewSubPass(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={subAdmins.length >= 5}
                      className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-350 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black text-xs tracking-wider transition-all cursor-pointer border-0 active:scale-[0.98] mt-2"
                    >
                      {subAdmins.length >= 5 
                        ? '배속 완숙 (최대 5명 충족)' 
                        : `기주 관리자 배속 승인 (${subAdmins.length}/5)`}
                    </button>
                  </form>
                </div>

                {/* Right side: Active Sub Admins registry list */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex justify-between items-center bg-slate-950 border border-white/5 p-4 rounded-xl">
                    <span className="text-xs font-bold text-slate-200">
                      👨‍✈️ {language === 'en' ? 'Active Administrative Cadre' : '현재 가동 중인 관리 연대 현황'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      {subAdmins.length} ACTIVE / 5 SLOTS
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    
                    {/* Master slot first (Hardcoded M representation) */}
                    <div className="flex items-center justify-between bg-cyan-400/[0.02] border border-cyan-400/20 p-4.5 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-mono font-black text-sm tracking-wider">
                          M
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white flex items-center gap-1.5 leading-none">
                            {language === 'en' ? 'Master Administrator' : '마스터 최고 관리자'}
                            <span className="text-[9px] font-bold font-mono tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/10 px-2.5 py-0.5 rounded-full uppercase">
                              Master Founder
                            </span>
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500 block mt-1.5">
                            {language === 'en' ? 'Contact: [Masked for Security]' : '연락처: [보안 필터링 완료]'} • {language === 'en' ? 'Resident Reg Code: [Classified / Hidden]' : '주민등록번호: [개인정보 보안 기밀 수록]'}
                          </span>
                        </div>
                      </div>
                      <div className="text-[11px] text-cyan-400/60 font-medium font-mono text-right bg-cyan-400/5 px-3 py-1.5 rounded-xl border border-cyan-400/10">
                        {language === 'en' ? 'Supreme Authority Lock' : '영구 보장 시스템 최상위 통치권'}
                      </div>
                    </div>

                    {/* Sub Admins list mapper */}
                    {subAdmins.length === 0 ? (
                      <div className="border border-dashed border-white/5 p-12 rounded-2xl text-center space-y-2 text-slate-500 text-xs">
                        <p>{language === 'en' ? 'No admins deployed yet.' : '지정 배치된 임시 관리자가 존재하지 않습니다.'}</p>
                        <p className="text-[10px] text-slate-650">{language === 'en' ? 'Use left console to designate sub-clerks.' : '좌측 발탁 제어판을 사용하여 1번에서 5번 슬롯의 대리 정예를 임명하십시오.'}</p>
                      </div>
                    ) : (
                      subAdmins.map((sub) => (
                        <div 
                          key={sub.id}
                          className="flex items-center justify-between bg-slate-900/60 border border-white/5 p-4 rounded-xl hover:border-slate-800 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-300 font-mono font-bold text-sm">
                              No. {sub.roleLabel}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                {sub.name}
                                <span className="text-[9px] font-bold font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full uppercase border border-white/5">
                                  슬롯 {sub.roleLabel}
                                </span>
                              </h4>
                              <span className="text-[11px] font-mono text-slate-500 block mt-1.5">
                                연락처: {sub.phone} • 패스코드: <span className="font-mono text-emerald-400">{sub.password}</span>
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteSubAdmin(sub.id, sub.name)}
                            className="p-2.5 rounded-xl bg-red-400/5 hover:bg-red-400/10 text-red-500/80 hover:text-red-400 transition-colors cursor-pointer border-0"
                            title="권한 박탈 및 슬롯 청소"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* T4: Master SMS Receiver Feed */}
            {activeTab === 'sms' && (
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center bg-slate-950 border border-emerald-500/10 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-emerald-500" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Smartphone className="text-emerald-400 w-5 h-5" />
                      {language === 'en' ? 'Simulated Secure Carrier Feed: Master Admin Terminal' : '최고 모질 연계망: 마스터 관리자 수신 이력 단말기'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {language === 'en' 
                        ? 'Under rule #2, Master Admin direct info is masked. Under rule #3, B2B procurement transmits secure simulated alerts to 010-2242-7801.' 
                        : '사업자몰에서 바이어가 최종 구동장치 및 기자재 구매 요청을 단행할 시 최고 마스터 장세창 파운더님의 등록 연락처(010-2242-7801)로 실시간 전문 보안 통신망을 통해 원격 전송되는 전문 로그 이력입니다.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(language === 'en' ? 'Clear all raw simulated SMS packets?' : '모든 SMS 단말 송출 기록 이력을 단말기 청소/비우시겠습니까?')) {
                        localStorage.setItem('moasd_simulated_sms_logs', '[]');
                        window.dispatchEvent(new Event('storage'));
                        // Refresh trigger
                        setActiveTab('sms');
                        alert(language === 'en' ? 'Cleared successfully' : '단말 로그 및 캐시 메모리가 리셋되었습니다.');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-bold border border-red-500/20 cursor-pointer transition-colors"
                  >
                    {language === 'en' ? 'Clear Cache' : '송수신 단말함 청소'}
                  </button>
                </div>

                {/* Simulated Smartphone screen layout */}
                <div className="max-w-xl mx-auto rounded-[36px] bg-slate-950 border-[6px] border-slate-800 p-6 shadow-2xl relative">
                  {/* Speaker slot decoration */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-900 rounded-full border border-white/5 flex items-center justify-center">
                    <div className="w-10 h-1 bg-slate-750 rounded-full" />
                  </div>
                  
                  {/* Feed container */}
                  <div className="space-y-4 pt-4 max-h-[500px] overflow-y-auto pr-1">
                    {(() => {
                      const smsList = JSON.parse(localStorage.getItem('moasd_simulated_sms_logs') || '[]');
                      if (smsList.length === 0) {
                        return (
                          <div className="py-20 text-center text-slate-500 text-xs space-y-2">
                            <Smartphone className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                            <p>{language === 'en' ? 'No incoming secure SMS packets detected.' : '단말기에 수신된 무선 SMS 전문 패킷이 비어 있습니다.'}</p>
                            <p className="text-[10px] text-slate-600">
                              {language === 'en' ? 'Go to [B2B MALL] and request a product procurement order.' : '사업자몰(B2B MALL) 탭으로 이동하여 원하는 제품의 구매 절차를 테스트하고 발주 버튼을 가압해 주십시오.'}
                            </p>
                          </div>
                        );
                      }
                      return smsList.map((sms: any) => (
                        <div key={sms.id} className="p-4 bg-slate-900/80 rounded-2xl border border-white/5 space-y-2.5 relative hover:border-emerald-500/20 transition-all">
                          {/* Message Header info */}
                          <div className="flex items-center justify-between text-[10px] border-b border-white/5 pb-2">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              <span>[수신 완료: SMS PASS]</span>
                            </div>
                            <span className="text-slate-500 font-mono">{sms.timestamp}</span>
                          </div>

                          {/* Message target recipient */}
                          <div className="flex flex-col gap-1 text-[11px] font-mono text-slate-400">
                            <div>
                              <strong className="text-slate-200">{language === 'en' ? 'TO:' : '수신번호:'}</strong>{' '}
                              <span className="text-cyan-400 font-black">{sms.toPhone}</span> ({sms.toName})
                            </div>
                            <div>
                              <strong className="text-slate-200">{language === 'en' ? 'FROM:' : '발신인:'}</strong>{' '}
                              <span className="text-slate-300">{sms.fromName}</span> (연락처: {sms.fromPhone})
                            </div>
                          </div>

                          {/* Message bubble balloon text */}
                          <div className="bg-emerald-950/20 border border-emerald-500/15 p-3 rounded-xl text-slate-200 text-xs leading-relaxed text-left font-sans">
                            {sms.text}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* Home bar decorator */}
                  <div className="w-24 h-1.5 bg-slate-800 mx-auto mt-6 rounded-full" />
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Product modal deleted - B2B Mall is not in operation */}

    </div>
  );
};
