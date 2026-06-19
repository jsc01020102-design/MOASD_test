import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import original high-resolution local image files
import prodGeneratorImg from '../assets/images/hge3d00_generator_1781622900745.jpg';
import prodCapacitorImg from '../assets/images/supercapacitor_factory_1781621879548.jpg';
import prodBinderImg from '../assets/images/sam_material_lab_1781624876856.jpg';
import prodEvImg from '../assets/images/ev_moto_assembly_1781624859000.jpg';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Lock, 
  ShieldCheck, 
  Check, 
  Activity, 
  ChevronRight, 
  Coins, 
  Package, 
  Truck, 
  FileText, 
  X, 
  Tag,
  AlertCircle,
  Clock
} from 'lucide-react';

export interface RegisteredUser {
  email: string;
  name: string;
  company: string;
  phone: string;
  regDate: string;
  role: 'general' | 'partner';
  partnerCode?: string;
}

export interface B2bMallProps {
  language: 'ko' | 'en';
  isSignedUp: boolean;
  registeredUser: RegisteredUser | null;
  onUpgradeToPartner: (code: string) => { success: boolean; error?: string };
  products?: Product[];
  onPurchaseOrder?: (product: Product, quantity: number) => void;
}

export interface Product {
  id: string;
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
  priceKrw: number;
  priceUsd: number;
  categoryKo: string;
  categoryEn: string;
  iconName: 'generator' | 'capacitor' | 'binder' | 'ev';
  specKo: string[];
  specEn: string[];
  availabilityKo: string;
  availabilityEn: string;
  imageUrl?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    nameKo: 'HGE3D00 스마트 하이브리드 발전기 / ESS',
    nameEn: 'HGE3D00 Enterprise Hybrid Generator Model',
    descKo: '미국 CAS 등재 SAM 신물질과 0.01초 계통 서지 차단 장치가 결합된 차세대 모바일 하이브리드 발전 및 에너지 저장 시스템.',
    descEn: 'Next-generation tactical mobile hybrid generator integrating proprietary SAM electrode bindings and rapid grid stabilizers.',
    priceKrw: 42500000,
    priceUsd: 34800,
    categoryKo: '발전기 / ESS',
    categoryEn: 'Power & Storage',
    iconName: 'generator',
    specKo: ['출력 전압: 단상/삼상 220V/380V 가변', '가동 수명: 15년 이상 보증', '충전 주기: 최대 35,000회 완숙'],
    specEn: ['AC Output: 220V/380V Multi-Phase', 'Warranty: 15-Year Life Cycle', 'Cycle Count: 35,000 Full Cycles'],
    availabilityKo: '본사 승인 즉시 출하 가능',
    availabilityEn: 'Immediate Dispatch Upon Approval',
    imageUrl: prodGeneratorImg
  },
  {
    id: 'prod-2',
    nameKo: '하이브리드 슈퍼커패시터 전하 제어 백업 뱅크 HSC-100K',
    nameEn: 'HSC-100K Grid Stabilizing Supercapacitor Bank',
    descKo: '풍력 및 태양광 발전 흐름의 불규칙한 순간 맥동을 충격 없이 흡수 평탄화하는 고출력 무정전 보조 인가 커패시터 뱅크.',
    descEn: 'High-power uninterruptible smoothing capacitor array engineered to absorb solar/wind line ripples with zero latency.',
    priceKrw: 18900000,
    priceUsd: 15500,
    categoryKo: '전력 제어 기어',
    categoryEn: 'Grid Components',
    iconName: 'capacitor',
    specKo: ['서지 감쇄 속도: 0.02초 미만 즉시 대응', '동작 주파수: 50Hz/60Hz 싱크', '외장 규격: 19인치 서브랙 마운트'],
    specEn: ['Surge Latency: < 0.02s Clamping', 'Line Frequency: 50Hz/60Hz Sync', 'Chassis: 19-inch Subrack Mount'],
    availabilityKo: '소량 수주 후 주문 제작 (약 2주)',
    availabilityEn: 'Custom Built Order (approx. 2 weeks)',
    imageUrl: prodCapacitorImg
  },
  {
    id: 'prod-3',
    nameKo: '고전도성 특허 극판 바인더 용액 SAM-01 (100L)',
    nameEn: 'SAM-01 High-Conductivity Binder Solvent (100L)',
    descKo: '극판 활물질 박리 및 미끄러짐 현상을 나노 분집전 수준에서 평탄 억제하고 이온 전도율을 45% 극대화하는 바이폴라 복합 용액.',
    descEn: 'Patented water-soluble polymer solvent minimizing active agent delamination while boosting charge speeds by 4.5x.',
    priceKrw: 24000000,
    priceUsd: 19800,
    categoryKo: '원천 소재 라이브러리',
    categoryEn: 'Advanced Materials',
    iconName: 'binder',
    specKo: ['원소 등록: 미국 CAS 화학 고유 지정', '배합 수지: 바이폴라 카본 배합액', '추천 점도: 극판 슬러리 배합 극대화'],
    specEn: ['Registry: US CAS Officially Logged', 'Chemistry: Bipolar Carbon Complex', 'Viscosity: Optimized for sheet slurry'],
    availabilityKo: '항공 밀폐 특수 용역 직송',
    availabilityEn: 'Special pressurized airtight freight',
    imageUrl: prodBinderImg
  },
  {
    id: 'prod-4',
    nameKo: '친환경 스마트 Micro EV 구동 섀시 키트 EB-206',
    nameEn: 'EB-206 Eco Micro EV Drivetrain Frame Kit',
    descKo: '경량 우주선용 알루미늄 인클로저 프레임, 정밀 서라운드 동력 회생 제동 모터, 과하중 충격 흡수 서스펜션 올인원 세트.',
    descEn: 'Lightweight aerospace alloy monocoque frame, integrated regenerative drive-motor, and high-tensile damper linkages.',
    priceKrw: 5800000,
    priceUsd: 4750,
    categoryKo: '모빌리티 하드웨어',
    categoryEn: 'E-Mobility Hardware',
    iconName: 'ev',
    specKo: ['구동 전압: 48V/72V 변환 모듈', '정합 토크: 최대 115 Nm 출력', '프레임 규격: 스마트 일체형 볼팅 바디'],
    specEn: ['Rated Voltage: 48V/72V Auto Module', 'Starting Torque: Peak 115 Nm', 'Assembly: Smart bolted alloy monocoque'],
    availabilityKo: '본사 조립 완료 수량 기준 즉시 발송',
    availabilityEn: 'Dispatches directly from ready stock',
    imageUrl: prodEvImg
  }
];

export const B2bMall: React.FC<B2bMallProps> = ({
  language,
  isSignedUp,
  registeredUser,
  onUpgradeToPartner,
  products,
  onPurchaseOrder
}) => {
  const currentProducts = products || PRODUCTS;
  const isPartner = isSignedUp && registeredUser?.role === 'partner';
  const isGeneral = isSignedUp && registeredUser?.role === 'general';

  const [codeValue, setCodeValue] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Purchase Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(5);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const t = (en: string, ko: string) => (language === 'en' ? en : ko);

  const handleVerifyCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!codeValue.trim()) {
      setErrorMsg(t('Please enter your B2B Partner validation code.', 'B2B 파트너 인증 코드를 입력해주십시오.'));
      return;
    }

    const res = onUpgradeToPartner(codeValue);
    if (res.success) {
      setSuccessMsg(t(
        'Partner clearance activated! Price sheets and instant purchasing are now open.',
        'B2B 파트너 인증 해제가 완료되었습니다! 사양 단가표가 투명하게 개방되었습니다.'
      ));
      setCodeValue('');
    } else {
      setErrorMsg(res.error || t('Invalid validation code.', '올바르지 않은 파트너 코드입니다.'));
    }
  };

  const handleOpenOrder = (product: Product) => {
    setSelectedProduct(product);
    setPurchaseQuantity(5); // Typical min business quantity
    setOrderComplete(false);
    setIsSubmittingOrder(false);
  };

  const handleConfirmOrder = () => {
    setIsSubmittingOrder(true);
    // Simulate API request to ERP central database
    setTimeout(() => {
      setIsSubmittingOrder(false);
      setOrderComplete(true);
      if (onPurchaseOrder && selectedProduct) {
        onPurchaseOrder(selectedProduct, purchaseQuantity);
      }
    }, 1800);
  };

  const formatCurrency = (amount: number) => {
    if (language === 'en') {
      return `$${amount.toLocaleString()}`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  const getProductPrice = (p: Product) => {
    return language === 'en' ? p.priceUsd : p.priceKrw;
  };

  const renderIcon = (name: string) => {
    const cls = "w-6 h-6 text-cyan-400";
    switch (name) {
      case 'generator':
        return <Activity className={cls} />;
      case 'capacitor':
        return <Coins className={cls} />;
      case 'binder':
        return <Package className={cls} />;
      case 'ev':
        return <Truck className={cls} />;
      default:
        return <ShoppingBag className={cls} />;
    }
  };

  return (
    <section id="b2b-mall-section" className="py-24 max-w-7xl mx-auto px-6 relative border-t border-white/5 bg-slate-950/25 rounded-3xl my-10">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1 text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> MOASD GLOBAL ENTERPRISE B2B MALL
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t('Commercial Business Mall', 'MOASD 공식 사업자 쇼핑몰')}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t(
              'Prisistebulished exhibition space for proprietary products manufactured directly by MOASD. Designed to protect IP regulations, commercial pricing tables and online procurement flows are exclusively revealed to authorized partner accounts.',
              '(주)MOASD 본사 공장에서 양산 및 검수 완료되어 직접 출하되는 핵심 장비 및 극판 자재 전시관입니다. 지식재산권 수호 원칙에 의거하여, 판매가 공개 및 실시간 발주 채널은 오직 파트너 인증 코드를 보유하신 사업자 고객에게만 실시간 활성화됩니다.'
            )}
          </p>
        </div>

        {/* Upgrade / Code entry banner for non-partners */}
        {!isPartner && (
          <div className="p-4 rounded-xl bg-slate-900 border border-white/5 max-w-md w-full shrink-0 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
              <Lock className="w-4 h-4" />
              <span>{t('B2B PARTNER CODE REQUIRED', 'B2B 파트너 코드 인증 필요')}</span>
            </div>
            
            <form onSubmit={handleVerifyCodeSubmit} className="flex gap-2">
              <input
                type="text"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                placeholder={t('Enter partner code (e.g. MOASD_PARTNER)', '인증 코드 입력 (예: MOASD_PARTNER)')}
                className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 outline-none transition-colors"
                id="mall-partner-code-input"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-xs font-extrabold rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer border-0"
              >
                {t('Unlock', '인증 실행')}
              </button>
            </form>

            {errorMsg && (
              <p className="text-[11px] text-rose-400 font-sans flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errorMsg}
              </p>
            )}
            {successMsg && (
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3 shrink-0" /> {successMsg}
              </p>
            )}
            
            <p className="text-[10px] text-slate-500 leading-normal">
              {t(
                'If you are a General Registered Member, enter your company’s designated partner code here to instantly upgrade privileges.',
                '이미 다른 계정으로 일반가입을 완료하셨다면, 우측 폼에서 다시 가입할 필요 없이 이곳에 회사용 B2B 코드를 입력하여 즉시 등급을 파트너로 인상할 수 있습니다.'
              )}
            </p>
          </div>
        )}

        {/* Status indicator for partner login */}
        {isPartner && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-400/20 max-w-md w-full shrink-0 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block">
                ● B2B AUTHORIZED PARTNER
              </span>
              <span className="text-xs font-black text-slate-200 block">
                {registeredUser?.company} ({registeredUser?.name}님)
              </span>
              <span className="text-[11px] text-slate-500 block leading-none mt-1">
                {t('All commercial pricing sheets and automated purchasing are unlocked.', '전품목 사업자 공급 단가 공개 및 구매 요청 포털 가동 중')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Grid of MOASD Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10" id="b2b-products-grid">
        {currentProducts.map((prod) => {
          return (
            <div 
              key={prod.id} 
              className="group/pcard rounded-2xl bg-slate-900/65 border border-white/5 hover:border-cyan-400/20 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-cyan-400/2 text-left"
            >
              <div className="space-y-4">
                {/* Product Image Section */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/5 group-hover/pcard:border-cyan-400/20 transition-all flex items-center justify-center">
                  {prod.imageUrl ? (
                    <img 
                      src={prod.imageUrl} 
                      alt={t(prod.nameEn, prod.nameKo)} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/pcard:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-500 gap-2">
                      <div className="animate-pulse">{renderIcon(prod.iconName)}</div>
                      <span className="text-[9px] font-mono tracking-wider font-bold text-slate-600 uppercase">No Image</span>
                    </div>
                  )}
                  {/* Floating category badge on top-left of image */}
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-mono font-extrabold text-cyan-400 tracking-wider uppercase bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-cyan-400/10">
                    {t(prod.categoryEn, prod.categoryKo)}
                  </span>
                  
                  {/* Floating icon on top-right of image */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    {renderIcon(prod.iconName)}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover/pcard:text-cyan-400 transition-colors tracking-tight leading-snug">
                    {t(prod.nameEn, prod.nameKo)}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans min-h-[50px]">
                    {t(prod.descEn, prod.descKo)}
                  </p>
                </div>

                {/* Specs list */}
                <div className="border-t border-white/5 pt-3.5 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">
                    {t('PRODUCT SPECS', '주요 설계 제원')}
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-350 font-sans">
                    {(language === 'en' ? prod.specEn : prod.specKo).map((spec, sI) => (
                      <li key={sI} className="flex items-start gap-1">
                        <span className="text-cyan-400 shrink-0">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action Section */}
              <div className="border-t border-white/5 pt-4 mt-5 space-y-3">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">
                    {t('B2B CONTRACT PRICE', '사업자 공급 가격')}
                  </span>
                  
                  {isPartner ? (
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
                        {formatCurrency(getProductPrice(prod))}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        {t('ex. VAT / unit', '부가세 별도 / 개당 단가')}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-1 bg-rose-950/20 border border-rose-500/10 p-2 rounded-xl">
                      <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-rose-400 block">
                          {t('Locked (B2B Only)', '판매가 비공개')}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-normal">
                          {isGeneral 
                            ? t('Authorize code above to open', '좌측에 파트너 코드를 입력하십시오.') 
                            : t('B2B verification required', 'B2B 파트너 등록 후 열람 가능')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Button */}
                {isPartner ? (
                  <button
                    onClick={() => handleOpenOrder(prod)}
                    className="w-full py-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 hover:scale-[1.02] transition-transform text-slate-950 text-xs font-black rounded-xl shadow-md shadow-cyan-400/5 flex items-center justify-center gap-1.5 cursor-pointer border-0"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t('B2B Purchase Inquiry', 'MOASD 물량 발주계정 이송')}</span>
                  </button>
                ) : (
                  <a
                    href="#proposal-section"
                    onClick={() => {
                      if (!isSignedUp) {
                        // Encourage B2B signup
                        const c = document.getElementById('signup-partner-code-field');
                        if (c) setTimeout(() => c.focus(), 400);
                      }
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-755 text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors border border-white/5 hover:border-white/10"
                  >
                    <span>
                      {isGeneral 
                        ? t('Verify Partner Privileges', '파트너 권한 획득하기') 
                        : t('Verify B2B Account', 'B2B 파트너 가입하기')}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* B2B Procurement and Order Confirmation Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-400 font-mono">
                  {t('SECURE EDI TRANSMISSION', '보안 전용 원격 발주')}
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {t('B2B Procurement Request', '대리점·파트너 기전 물량 정식 발주')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('Authorized Business Partner: ', '공식 제휴사 승인 기업명: ')} 
                  <span className="text-cyan-400 font-bold">{registeredUser?.company}</span>
                </p>
              </div>

              {!orderComplete ? (
                <>
                  {/* Product Panel */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400">
                      {t(selectedProduct.categoryEn, selectedProduct.categoryKo)}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-none">
                      {t(selectedProduct.nameEn, selectedProduct.nameKo)}
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal font-sans">
                      {t(selectedProduct.descEn, selectedProduct.descKo)}
                    </p>
                  </div>

                  {/* Quantity and Pricing calculator */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        {t('Select Bulk Qty:', 'B2B 발주 수량 선택:')}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPurchaseQuantity(Math.max(1, purchaseQuantity - 1))}
                          disabled={purchaseQuantity <= 1}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-750 border border-white/15 text-white text-sm font-bold disabled:opacity-40 cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-sm font-black text-white font-mono bg-slate-950 py-1 border border-white/10 rounded-lg">
                          {purchaseQuantity}
                        </span>
                        <button
                          onClick={() => setPurchaseQuantity(purchaseQuantity + 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-750 border border-white/15 text-white text-sm font-bold cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Pricing statement */}
                    <div className="p-4 bg-slate-950 rounded-xl space-y-2.5 text-xs text-slate-400 border border-white/5 font-mono">
                      <div className="flex justify-between">
                        <span>{t('Unit Price:', '개당 공급 단가:')}</span>
                        <span className="text-slate-200">{formatCurrency(getProductPrice(selectedProduct))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('Subtotal:', '발주 총 공급가:')}</span>
                        <span className="text-slate-200">{formatCurrency(getProductPrice(selectedProduct) * purchaseQuantity)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>{t('Estimated VAT (10%):', '부가세 세산정 (10%):')}</span>
                        <span>{formatCurrency(Math.round(getProductPrice(selectedProduct) * purchaseQuantity * 0.1))}</span>
                      </div>
                      
                      {/* Bulk Discount Indicator */}
                      {purchaseQuantity >= 5 && (
                        <div className="flex justify-between text-emerald-400 font-bold text-[11px] border-t border-dashed border-white/5 pt-2">
                          <span>{t('B2B Logistics Allowance Active:', '대리점 기전 물류 공제 혜택:')}</span>
                          <span>{t('- 2.5% Shipping credit', '- 2.5% 본선인도가 인센티브')}</span>
                        </div>
                      )}

                      <div className="flex justify-between border-t border-white/5 pt-2.5 text-sm font-extrabold text-white">
                        <span>{t('Total Contract Amount:', '최종 계약 대가 (합계):')}</span>
                        <span className="text-cyan-400">
                          {formatCurrency(Math.round(getProductPrice(selectedProduct) * purchaseQuantity * 1.1))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Location Info */}
                  <div className="space-y-1.5 text-xs font-sans">
                    <span className="text-slate-400 font-bold block">{t('Registered Delivery Workspace:', '대리점 지정 물량 인도 구역:')}</span>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                      <p className="text-white font-medium">{registeredUser?.company} - Central HQ Fleet</p>
                      <p className="text-slate-500 font-mono text-[10px]">{t('Liaison Direct Contact: ', '수령 직통 채널: ')} {registeredUser?.phone}</p>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-450 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-white/5"
                    >
                      {t('Cancel Order', '발주 취소')}
                    </button>
                    <button
                      onClick={handleConfirmOrder}
                      disabled={isSubmittingOrder}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:brightness-110 text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-0 shadow-lg shadow-cyan-400/10"
                    >
                      {isSubmittingOrder ? (
                        <>
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>{t('Broadcasting to ERP...', 'ERP 데이터 이송 중...')}</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t('Confirm and File Order', '전자 서명 및 정식 발주')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* Success screen */
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-white">{t('B2B Electronic Order Completed', 'MOASD ERP 기주 분집전 전력 발주 완료')}</h4>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                      STATUS CODE: MOASD_TX_SECURE_OK
                    </span>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed font-sans max-w-sm mx-auto">
                    {t(
                      `Encryption sync complete. To uphold strict industrial trade policies, B2B price bidding sheets, commercial tax logs, and central shipping dispatch rosters are secure-sent exclusively to: ${registeredUser?.email}.`,
                      `보안 전자서명이 성공적으로 인가되었습니다. (주)MOASD 자동 전력 상거래 보호 조항에 따라, 정식 세금계산서 초안, 단가 보증 각서 및 물류 센터 출하 예정 스케줄표가 회원님의 가가 등록 이메일(${registeredUser?.email})로 즉시 영구 전송되었습니다.`
                    )}
                  </p>

                  <div className="p-3 bg-slate-950 rounded-xl max-w-sm mx-auto border border-white/5 text-[11px] text-slate-450 leading-relaxed space-y-1 text-left">
                    <p className="font-bold text-slate-300">✓ 발주 사양 요약:</p>
                    <p>• {t('Item:', '발주 품목:')} {t(selectedProduct.nameEn, selectedProduct.nameKo)}</p>
                    <p>• {t('Qty & Total:', '수량 및 대가:')} {purchaseQuantity}{t(' units / Total ', '개 / 총 합계 ')} <span className="text-cyan-400 font-bold">{formatCurrency(Math.round(getProductPrice(selectedProduct) * purchaseQuantity * 1.1))}</span></p>
                    <p>• {t('Account Logged:', '기안 담당사:')} {registeredUser?.company} ({registeredUser?.name})</p>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-6 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition-colors cursor-pointer border-0"
                  >
                    {t('Return to Mall', '사업자 쇼핑몰로 복귀')}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
