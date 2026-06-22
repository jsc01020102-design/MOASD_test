import React, { useState, useEffect } from 'react';
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
  Clock,
  Plus,
  Trash2,
  Edit,
  Upload,
  Search,
  MapPin
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

export const KOREAN_POSTAL_ADDRESSES = [
  { zip: '06164', main: '서울특별시 강남구 영동대로 513', desc: '코엑스 그린에너지 실증센터' },
  { zip: '13487', main: '경기도 성남시 분당구 판교역로 166', desc: '판교테크노에너지밸리 3층' },
  { zip: '04778', main: '서울특별시 성동구 뚝섬로 1길 25', desc: '한라 에너지R&D 테크노타워' },
  { zip: '21990', main: '인천광역시 연수구 송도과학로 32', desc: '송도 IT융합전력단지 2호기' },
  { zip: '46241', main: '부산광역시 금정구 중앙대로 1617', desc: '부산 스마트그리드 물류기기' },
  { zip: '34115', main: '대전광역시 유성구 가정로 120', desc: '한국에너지기술연구원 제1기술동' },
  { zip: '44538', main: '울산광역시 중구 종가로 406', desc: '한국에너지공단 본관 전하센터' },
  { zip: '58327', main: '전라남도 나주시 전력로 55', desc: '한국전력공사 나주본사 에코기지' },
  { zip: '15004', main: '경기도 시흥시 공단1대로 196', desc: '시화 전력IT 융합연구원 복합동' },
  { zip: '51532', main: '경상남도 창원시 성산구 창원대로 1144', desc: '창원 기전하이테크 제작기지' },
  { zip: '04147', main: '서울특별시 마포구 백범로 311', desc: '마포 창업에너지 허브공간' },
  { zip: '61186', main: '광주광역시 북구 첨단과기로 333', desc: '광주 신재생에너지 클러스터' },
  { zip: '38120', main: '경상북도 경주시 동해대로 1000', desc: '원자력에너지 R&D 본관기지' },
  { zip: '24398', main: '강원특별자치도 춘천시 대성로 150', desc: '춘천 소수력발전 설계지원관' },
  { zip: '63143', main: '제주특별자치도 제주시 첨단로 213-3', desc: '제주 스마트 첨단 에너지 실증기지' }
];

export interface B2bMallProps {
  language: 'ko' | 'en';
  isSignedUp: boolean;
  registeredUser: RegisteredUser | null;
  onUpgradeToPartner: (code: string) => { success: boolean; error?: string };
  products?: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
  onPurchaseOrder?: (product: Product, quantity: number, buyerInfo?: any) => void;
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

export const PRODUCTS: Product[] = [];

export const B2bMall: React.FC<B2bMallProps> = ({
  language,
  isSignedUp,
  registeredUser,
  onUpgradeToPartner,
  products,
  setProducts,
  onPurchaseOrder
}) => {
  const currentProducts = products || PRODUCTS;
  const isPartner = isSignedUp && registeredUser?.role === 'partner';
  const isGeneral = isSignedUp && registeredUser?.role === 'general';
  
  // Power Admin identification
  const isPowerAdmin = registeredUser && (
    registeredUser.email === 'jsc01020102@gmail.com' ||
    registeredUser.name?.includes('관리자') ||
    registeredUser.company?.includes('MOASD') ||
    registeredUser.company?.includes('moasd') ||
    registeredUser.company?.includes('모아에스디')
  );

  const [codeValue, setCodeValue] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Direct Product registration states (for master/admin)
  const [showDirectProductModal, setShowDirectProductModal] = useState(false);
  const [directEditingProduct, setDirectEditingProduct] = useState<Product | null>(null);
  const [directProdId, setDirectProdId] = useState('');
  const [directProdNameKo, setDirectProdNameKo] = useState('');
  const [directProdNameEn, setDirectProdNameEn] = useState('');
  const [directProdDescKo, setDirectProdDescKo] = useState('');
  const [directProdDescEn, setDirectProdDescEn] = useState('');
  const [directProdPriceKrw, setDirectProdPriceKrw] = useState<number>(0);
  const [directProdPriceUsd, setDirectProdPriceUsd] = useState<number>(0);
  const [directProdCategoryKo, setDirectProdCategoryKo] = useState('');
  const [directProdCategoryEn, setDirectProdCategoryEn] = useState('');
  const [directProdIconName, setDirectProdIconName] = useState<'generator' | 'capacitor' | 'binder' | 'ev'>('generator');
  const [directProdSpecKoText, setDirectProdSpecKoText] = useState('');
  const [directProdSpecEnText, setDirectProdSpecEnText] = useState('');
  const [directProdAvailabilityKo, setDirectProdAvailabilityKo] = useState('');
  const [directProdAvailabilityEn, setDirectProdAvailabilityEn] = useState('');
  const [directProdImageUrl, setDirectProdImageUrl] = useState('');

  // Purchase Modal State (Enriched with Buyer Inputs, VAT options and bank transfers)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(5);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Buyer Info fields
  const [buyerName, setBuyerName] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  
  // Post office style address states (우체국식 상세 우편 주소)
  const [buyerZipCode, setBuyerZipCode] = useState('');
  const [buyerMainAddress, setBuyerMainAddress] = useState('');
  const [buyerDetailAddress, setBuyerDetailAddress] = useState('');
  const [showZipSearchModal, setShowZipSearchModal] = useState(false);
  const [zipSearchKeyword, setZipSearchKeyword] = useState('');
  
  // Payment confirmation & VAT toggle
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);
  const [depositAlertVisible, setDepositAlertVisible] = useState(false);
  const [includeVat, setIncludeVat] = useState(true);

  const t = (en: string, ko: string) => (language === 'en' ? en : ko);

  // Auto-synchronize buyerAddress state when components elements change
  useEffect(() => {
    if (buyerZipCode || buyerMainAddress || buyerDetailAddress) {
      setBuyerAddress(`[${buyerZipCode}] ${buyerMainAddress} ${buyerDetailAddress}`.trim());
    }
  }, [buyerZipCode, buyerMainAddress, buyerDetailAddress]);

  // Synchronize buyer info on opening the checkout modal
  useEffect(() => {
    if (selectedProduct) {
      setBuyerName(registeredUser?.name || '');
      setBuyerCompany(registeredUser?.company || '');
      setBuyerPhone(registeredUser?.phone || '');
      setBuyerEmail(registeredUser?.email || '');
      setBuyerZipCode('04778');
      setBuyerMainAddress(registeredUser ? `${registeredUser.company} 본사 지정 물류기지` : '서울특별시 성동구 뚝섬로 1길 25');
      setBuyerDetailAddress('정문 기전하역반 C동 1층');
      setIsDepositConfirmed(false);
      setDepositAlertVisible(false);
      setIncludeVat(true);
    }
  }, [selectedProduct, registeredUser]);

  // Product Direct Management actions (Master/Admin)
  const openDirectAddProduct = () => {
    setDirectEditingProduct(null);
    setDirectProdId(`prod-${Date.now()}`);
    setDirectProdNameKo('');
    setDirectProdNameEn('');
    setDirectProdDescKo('');
    setDirectProdDescEn('');
    setDirectProdPriceKrw(15000000);
    setDirectProdPriceUsd(12500);
    setDirectProdCategoryKo('기전 복합 자재');
    setDirectProdCategoryEn('Advanced Gear');
    setDirectProdIconName('generator');
    setDirectProdSpecKoText('설계 수명: 15년 이상 보장\n계통 제어 수율 대응 유닛 장착\n정밀 부하 보호 회로 내장');
    setDirectProdSpecEnText('Service Life: 15+ years guaranteed\nGrid sync yield balancing module\nInternal precise surge suppression');
    setDirectProdAvailabilityKo('본사 입고 승인 즉시 직송');
    setDirectProdAvailabilityEn('Freight direct upon head office approval');
    setDirectProdImageUrl('');
    setShowDirectProductModal(true);
  };

  const openDirectEditProduct = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirectEditingProduct(prod);
    setDirectProdId(prod.id);
    setDirectProdNameKo(prod.nameKo);
    setDirectProdNameEn(prod.nameEn);
    setDirectProdDescKo(prod.descKo);
    setDirectProdDescEn(prod.descEn);
    setDirectProdPriceKrw(prod.priceKrw);
    setDirectProdPriceUsd(prod.priceUsd);
    setDirectProdCategoryKo(prod.categoryKo);
    setDirectProdCategoryEn(prod.categoryEn);
    setDirectProdIconName(prod.iconName);
    setDirectProdSpecKoText(prod.specKo.join('\n'));
    setDirectProdSpecEnText(prod.specEn.join('\n'));
    setDirectProdAvailabilityKo(prod.availabilityKo);
    setDirectProdAvailabilityEn(prod.availabilityEn);
    setDirectProdImageUrl(prod.imageUrl || '');
    setShowDirectProductModal(true);
  };

  const handleDirectSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directProdNameKo.trim() || !directProdNameEn.trim()) {
      alert(language === 'en' ? 'Product Name (both EN and KO) is required.' : '제품 품명은 필수 입력 항목입니다 (국문 및 영문 필수).');
      return;
    }

    const compiledProduct: Product = {
      id: directProdId,
      nameKo: directProdNameKo,
      nameEn: directProdNameEn,
      descKo: directProdDescKo,
      descEn: directProdDescEn,
      priceKrw: Number(directProdPriceKrw) || 0,
      priceUsd: Number(directProdPriceUsd) || 0,
      categoryKo: directProdCategoryKo || '기타 자재',
      categoryEn: directProdCategoryEn || 'Miscellaneous',
      iconName: directProdIconName,
      specKo: directProdSpecKoText.split('\n').map(s => s.trim()).filter(Boolean),
      specEn: directProdSpecEnText.split('\n').map(s => s.trim()).filter(Boolean),
      availabilityKo: directProdAvailabilityKo || '즉시 출하 가능',
      availabilityEn: directProdAvailabilityEn || 'Ready for shipment',
      imageUrl: directProdImageUrl || undefined
    };

    let updatedList: Product[];
    const exits = currentProducts.some(p => p.id === directProdId);
    if (exits) {
      updatedList = currentProducts.map(p => p.id === directProdId ? compiledProduct : p);
    } else {
      updatedList = [...currentProducts, compiledProduct];
    }

    // Save and alert
    localStorage.setItem('moasd_b2b_products', JSON.stringify(updatedList));
    if (setProducts) {
      setProducts(updatedList);
    }
    setShowDirectProductModal(false);
    setDirectEditingProduct(null);
    alert(language === 'en' ? 'Product saved successfully!' : '제품이 성공적으로 등록/수정되었습니다!');
  };

  const handleDirectDeleteProduct = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === 'en' ? `Are you sure you want to delete product "${name}"?` : `정식 등록된 사업자몰 상품 "${name}" 품목을 즉격 삭제 조치하시겠습니까?`)) {
      const filtered = currentProducts.filter(p => p.id !== id);
      localStorage.setItem('moasd_b2b_products', JSON.stringify(filtered));
      if (setProducts) {
        setProducts(filtered);
      }
      alert(language === 'en' ? 'Product deleted successfully.' : '해당 상품이 삭제 처리되었습니다.');
    }
  };

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
    if (!buyerName.trim() || !buyerCompany.trim() || !buyerPhone.trim() || !buyerEmail.trim() || !buyerAddress.trim()) {
      alert(language === 'en' ? 'Please fill in all buyer info fields.' : '구매를 위해 구매자 필수 정보(성명, 회사명, 연락처, 이메일, 인도구역)를 모두 채워주십시오.');
      return;
    }

    if (!isDepositConfirmed) {
      setDepositAlertVisible(true);
      alert(language === 'en' 
        ? 'Please check the payment confirmation state to proceed.' 
        : '무통장 입금 완료 동의가 이루어지지 않으면 구매진행이 안됩니다. 입금 후 체크박스를 반드시 체크해주세요.');
      return;
    }

    setIsSubmittingOrder(true);
    
    // Calculate final contract billing based on VAT option
    const baseUnitPrice = getProductPrice(selectedProduct!);
    const subtotal = baseUnitPrice * purchaseQuantity;
    const discountRate = purchaseQuantity >= 5 ? 0.025 : 0;
    const discountAmount = Math.round(subtotal * discountRate);
    const taxableAmount = subtotal - discountAmount;
    const vatAmount = includeVat ? Math.round(taxableAmount * 0.1) : 0;
    const finalAmount = taxableAmount + vatAmount;

    // Simulate API request to ERP central database
    setTimeout(() => {
      setIsSubmittingOrder(false);
      setOrderComplete(true);
      if (onPurchaseOrder && selectedProduct) {
        onPurchaseOrder(selectedProduct, purchaseQuantity, {
          buyerName,
          buyerCompany,
          buyerPhone,
          buyerEmail,
          buyerAddress,
          includeVat,
          totalAmount: finalAmount
        });
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
          isPowerAdmin ? (
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-400/30 max-w-md w-full shrink-0 flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-cyan-400 font-extrabold block">
                    ● SYSTEM MASTER ADMIN ACTIVE
                  </span>
                  <span className="text-xs font-black text-slate-200 block">
                    {registeredUser?.company} ({registeredUser?.name} 최고관리자)
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal font-sans pt-1">
                {t('Master privileges activated. You can add brand new products or update specs immediately.', '마스터 관리자 보안 권한이 활성화되었습니다. 쇼핑몰에 판매할 신규 전력 품목을 추가 등록하거나 규격을 실시간으로 수정/삭제할 수 있습니다.')}
              </p>
              <button
                type="button"
                onClick={openDirectAddProduct}
                className="w-full mt-1.5 py-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-xs font-black rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1 border-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                <span>{t('Register New Product', '신규 판매 제품 추가 등록')}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-400/20 max-w-md w-full shrink-0 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
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
          )
        )}
      </div>

      {/* Grid of MOASD Products */}
      {currentProducts.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-3xl bg-slate-900/40 border border-white/5 relative z-10 font-sans shadow-xl">
          <ShoppingBag className="w-14 h-14 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-base font-extrabold text-white mb-2">
            {t('No Registered Products', '사업자 등록 품목이 존재하지 않습니다')}
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            {t(
              'Currently, no commercial equipment, solar materials, or ESS system units are registered. If you are authorized as a Master Administrator, please use the registration button above to register products directly into the catalog.',
              '현재 데이터베이스에 등록된 공급 장비, 태양광 기자재, 또는 모빌리티용 ESS 시스템 자재가 존재하지 않습니다. 최고 관리자 권한을 보유하셨다면 상단 우측의 [신규 판매 제품 추가 등록] 버튼을 가압하여 당사 지배기술 제품군을 즉시 등록해 주십시오.'
            )}
          </p>
        </div>
      ) : (
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
                      type="button"
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

                  {/* Admin-only override edit/delete controls */}
                  {isPowerAdmin && (
                    <div className="flex gap-2 border-t border-white/5 pt-2.5 mt-1 font-mono">
                      <button
                        type="button"
                        onClick={(e) => openDirectEditProduct(prod, e)}
                        className="flex-1 py-1 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer border border-cyan-400/10"
                      >
                        <Edit className="w-3 h-3 text-cyan-400" />
                        <span>{t('Edit', '규격수정')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDirectDeleteProduct(prod.id, prod.nameKo, e)}
                        className="py-1 px-2 rounded-lg bg-rose-500/5 hover:bg-rose-500/15 text-rose-400 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer border border-rose-500/10"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{t('Delete', '단종삭제')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* B2B Procurement and Order Confirmation Modal */}
      <AnimatePresence>
        {selectedProduct && (() => {
          const baseUnitPrice = getProductPrice(selectedProduct);
          const subtotal = baseUnitPrice * purchaseQuantity;
          const discountRate = purchaseQuantity >= 5 ? 0.025 : 0;
          const discountAmount = Math.round(subtotal * discountRate);
          const taxableAmount = subtotal - discountAmount;
          const vatAmount = includeVat ? Math.round(taxableAmount * 0.1) : 0;
          const totalAmountCombined = taxableAmount + vatAmount;

          return (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-left max-h-[90vh] overflow-y-auto scrollbar-thin my-8"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title Header */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-400 font-mono font-bold uppercase">
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
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 text-left">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        {t(selectedProduct.categoryEn, selectedProduct.categoryKo)}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-none">
                        {t(selectedProduct.nameEn, selectedProduct.nameKo)}
                      </h4>
                      <p className="text-xs text-slate-400 leading-normal font-sans">
                        {t(selectedProduct.descEn, selectedProduct.descKo)}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-slate-950/65 p-3 rounded-xl border border-white/5">
                      <span className="text-xs font-bold text-slate-300">
                        {t('Select Bulk Qty:', 'B2B 발주 수량 선택 (개단위):')}
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

                    {/* VAT Option Segment */}
                    <div className="space-y-1.5">
                      <span className="text-[10.5px] uppercase font-mono text-slate-400 font-bold block">{t('VAT Configuration:', '주문서 부가세 구분 선택:')}</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setIncludeVat(true)}
                          className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            includeVat 
                              ? 'bg-cyan-500/15 border-cyan-400 text-cyan-450 font-black shadow shadow-cyan-400/5' 
                              : 'bg-slate-950/70 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {t('VAT Included (10%)', '부가세 포함 (공급가의 10%)')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIncludeVat(false)}
                          className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            !includeVat 
                              ? 'bg-cyan-500/15 border-cyan-400 text-cyan-450 font-black shadow shadow-cyan-400/5' 
                              : 'bg-slate-950/70 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {t('VAT Excluded', '부가세 별도 / 영세율')}
                        </button>
                      </div>
                    </div>

                    {/* Pricing statement */}
                    <div className="p-4 bg-slate-950 rounded-xl space-y-2.5 text-xs text-slate-400 border border-white/5 font-mono text-left font-mono">
                      <div className="flex justify-between">
                        <span>{t('Unit Price:', '개당 공급 단가:')}</span>
                        <span className="text-slate-200">{formatCurrency(baseUnitPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('Subtotal:', '발주 총 공급가:')}</span>
                        <span className="text-slate-200">{formatCurrency(subtotal)}</span>
                      </div>
                      
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-bold text-[11px] border-t border-dashed border-white/5 pt-1.5">
                          <span>{t('B2B Logistics Allowance Active:', '대리점 기전 물류 공제 혜택:')}</span>
                          <span>-{formatCurrency(discountAmount)} ({t('2.5% Shipping credit', '본선인도가 2.5% 인센티브')})</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>{t('VAT (10%):', '부가세 (10%):')}</span>
                        <span className={includeVat ? 'text-slate-200' : 'text-slate-500 font-normal italic'}>
                          {includeVat ? formatCurrency(vatAmount) : t('Excluded (Separate)', '미포함 (영세율 등 적용)')}
                        </span>
                      </div>

                      <div className="flex justify-between border-t border-white/5 pt-2.5 text-sm font-extrabold text-white font-sans">
                        <span>{t('Total Contract Amount:', '최종 계약 대가 (합계):')}</span>
                        <span className="text-cyan-400 text-base font-black">
                          {formatCurrency(totalAmountCombined)}
                        </span>
                      </div>
                    </div>

                    {/* Buyer Information input form */}
                    <div className="space-y-1.5 text-left">
                      <span className="text-[10px] uppercase font-mono text-cyan-400 font-black tracking-wider block">{t('BUYER IDENTIFICATION CARD (MANDATORY)', '구매자 실명 정정서 (필수 기입 요소)')}</span>
                      <div className="space-y-2 bg-slate-950/75 p-3.5 rounded-xl border border-white/5">
                        <div className="grid grid-cols-2 gap-2 font-sans">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block font-bold">{t('Buyer Name:', '기안 성명 *')}</label>
                            <input
                              type="text"
                              required
                              value={buyerName}
                              onChange={(e) => setBuyerName(e.target.value)}
                              placeholder={t('Contact Name', '실명 기입')}
                              className="w-full bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block font-bold">{t('Company Name:', '상호/회사명 *')}</label>
                            <input
                              type="text"
                              required
                              value={buyerCompany}
                              onChange={(e) => setBuyerCompany(e.target.value)}
                              placeholder={t('MOASD partner name', '대리점 상호명')}
                              className="w-full bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 font-sans">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block font-bold">{t('Contact Phone:', '연락처 *')}</label>
                            <input
                              type="text"
                              required
                              value={buyerPhone}
                              onChange={(e) => setBuyerPhone(e.target.value)}
                              placeholder={t('Delivery Phone', '연락가능한 휴대전화')}
                              className="w-full bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 block font-bold">{t('Authorized Email:', '정산용 이메일 *')}</label>
                            <input
                              type="email"
                              required
                              value={buyerEmail}
                              onChange={(e) => setBuyerEmail(e.target.value)}
                              placeholder={t('Business email', '계산서 발행용 이메일')}
                              className="w-full bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 font-sans pt-1">
                          <label className="text-[10px] font-mono text-cyan-400 block font-bold uppercase tracking-wider">
                            {t('Designated Handover Address:', '지정 물량 인도구역 주소 (우편 우배수 수령지) *')}
                          </label>
                          
                          {/* Zip Code / Search Postal Row */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              required
                              readOnly
                              value={buyerZipCode}
                              placeholder={t('Zip Code', '우편번호')}
                              className="w-24 bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white text-center font-mono outline-none focus:border-cyan-400"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setZipSearchKeyword('');
                                setShowZipSearchModal(true);
                              }}
                              className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-400 font-bold rounded-md text-xs cursor-pointer select-none transition-colors flex items-center gap-1.5 font-sans"
                            >
                              <Search className="w-3.5 h-3.5" />
                              {t('Search Zip Code', '우편번호 검색')}
                            </button>
                          </div>

                          {/* Main Address */}
                          <input
                            type="text"
                            required
                            value={buyerMainAddress}
                            onChange={(e) => setBuyerMainAddress(e.target.value)}
                            placeholder={t('Search or enter main address', '우편번호 검색으로 입력하거나 기본 주소 직접 입력')}
                            className="w-full bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                          />

                          {/* Detail Address */}
                          <input
                            type="text"
                            required
                            value={buyerDetailAddress}
                            onChange={(e) => setBuyerDetailAddress(e.target.value)}
                            placeholder={t('Enter detailed address (e.g. bldg 102)', '상세 주소 입력 (예: 기전동 B-3호실, 정문 집하장 등)')}
                            className="w-full bg-slate-900 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Seller Payment Information Box */}
                    <div className="space-y-1.5 font-sans text-left">
                      <span className="text-[10px] uppercase font-mono text-cyan-400 font-extrabold block">
                        {t('OFFICIAL SELLER PAYMENT GATEWAY (BANK TRANSFER)', '물량 공급 계약 대가 수납처 정보')}
                      </span>
                      <div className="p-3 bg-slate-950/90 rounded-xl border border-cyan-500/20 space-y-1.5 text-left">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span className="font-semibold text-slate-350">{t('Seller:', '판매자 정보')}</span>
                          <span className="text-white font-bold">MOASD&신화</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span className="font-semibold text-slate-350">{t('Account Holder:', '예금주')}</span>
                          <span className="text-cyan-300 font-black">신화에너지솔루션(장세창)</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span className="font-semibold text-slate-350">{t('Payment Account:', '수납 계좌번호 (농협)')}</span>
                          <span className="text-white font-mono font-bold text-[13px] tracking-wider bg-slate-900 px-1.5 py-0.5 rounded border border-white/5">352-2336-3984-23</span>
                        </div>
                      </div>
                    </div>

                    {/* Deposit and compliance confirmation */}
                    <div className={`p-3.5 rounded-xl border transition-all ${
                      depositAlertVisible 
                        ? 'bg-rose-950/45 border-rose-500/60 shadow-lg shadow-rose-500/10' 
                        : 'bg-slate-950/60 border-white/5'
                    }`}>
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isDepositConfirmed}
                          onChange={(e) => {
                            setIsDepositConfirmed(e.target.checked);
                            if (e.target.checked) setDepositAlertVisible(false);
                          }}
                          className="mt-1 w-4 h-4 rounded accent-cyan-400 border-white/15 bg-slate-900 cursor-pointer"
                        />
                        <div className="text-[11px] leading-relaxed text-slate-300 font-sans text-left">
                          <span className="font-extrabold text-cyan-455 block mb-0.5">
                            {t('I confirm bank transfer transfer complete to Shinwha Energy Solution.', '상기 지정 계좌(농협 신화에너지솔루션)로 최종 발주 계약 전액을 입금 완료했습니다.')}
                          </span>
                          <span className="text-slate-450 block mb-1">
                            계산서 공급 대금 입금 내역 수동 확인 즉시 ERP에서 출고 승인 승낙 처리됩니다.
                          </span>
                          
                          {/* ABSOLUTELY REQUIRED WARNING ANNOUNCEMENT */}
                          <span className="text-rose-450 font-black text-[12px] block bg-rose-950/30 border border-rose-500/20 px-2 py-1 rounded mt-1.5">
                            ⚠️ {t('WARNING: NO SHIPMENT WITHOUT PAYMENT CONFIRMATION', '입금이 이루어지지 않으면, 구매진행이 안됩니다.')}
                          </span>
                        </div>
                      </label>
                    </div>

                    {/* Action row */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="flex-1 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-450 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-white/5"
                      >
                        {t('Cancel Order', '발주 기각 취소')}
                      </button>
                      <button
                        onClick={handleConfirmOrder}
                        disabled={isSubmittingOrder}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:brightness-110 text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-0 shadow-lg shadow-cyan-400/10"
                      >
                        {isSubmittingOrder ? (
                          <>
                            <Clock className="w-3.5 h-3.5 animate-spin" />
                            <span>{t('Broadcasting to ERP...', '입금 대조 및 ERP 승인 처리 중...')}</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t('Confirm and File Order', '무통장 입금 확인 및 구매 확정')}</span>
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
                    <div className="space-y-1.5 text-center">
                      <h4 className="text-lg font-black text-white">{t('B2B Electronic Order Completed', 'MOASD ERP 기주 분집전 전력 발주 완료')}</h4>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                        STATUS CODE: MOASD_TX_SECURE_OK
                      </span>
                    </div>

                    <p className="text-xs text-slate-350 leading-relaxed font-sans max-w-sm mx-auto text-center">
                      {t(
                        `Encryption sync complete. To uphold strict industrial trade policies, B2B price bidding sheets, commercial tax logs, and central shipping dispatch rosters are secure-sent exclusively to: ${buyerEmail}.`,
                        `보안 거래 승인이 완료되었습니다. (주)MOASD-신화에너지솔루션 수납 대조 부속 지침에 따라, 계약 보증서 및 물류 출고 지의서 초안이 입금 동의하신 기화 이메일(${buyerEmail})로 정식 발송 처리되었습니다.`
                      )}
                    </p>

                    <div className="p-3.5 bg-slate-950 rounded-xl max-w-sm mx-auto border border-white/5 text-[11px] text-slate-400 leading-relaxed space-y-1 text-left font-mono">
                      <p className="font-bold text-slate-300">✓ {t('Order Specification Summary:', '정식 수납 및 영수 조서 요약:')}</p>
                      <p>• {t('Item:', '발주 설비품:')} {t(selectedProduct.nameEn, selectedProduct.nameKo)}</p>
                      <p>• {t('Qty & VAT Option:', '수량 및 부가세 처리:')} {purchaseQuantity}개 / {includeVat ? '대금 부가세 10% 포함 수납' : '부가세 영세율 처리 분리 수납'}</p>
                      <p>• {t('Authorized Total Contract Price:', '최종 수납 결정 계약 금액:')} <span className="text-cyan-400 font-extrabold">{formatCurrency(totalAmountCombined)}</span></p>
                      <p>• {t('Registered Account:', '영수 수령 청구처:')} {buyerCompany} ({buyerName} 본부장 / {buyerPhone})</p>
                      <p>• {t('Designated Zone:', '인도 구역:')} {buyerAddress}</p>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="mt-6 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition-colors cursor-pointer border-0 mx-auto block"
                    >
                      {t('Return to Mall', '사업자 쇼핑몰로 복귀')}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Direct Product Registration/Modification Modal (Admin-only) */}
      <AnimatePresence>
        {showDirectProductModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-cyan-400/30 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-left my-8 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <button
                onClick={() => {
                  setShowDirectProductModal(false);
                  setDirectEditingProduct(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer animate-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-400 font-mono font-bold uppercase">
                  {directEditingProduct ? 'EDIT CONFIGURATION' : 'SYSTEM PRODUCT PROVISIONING'}
                </div>
                <h3 className="text-base font-extrabold text-white tracking-tight mt-1.5 font-sans">
                  {directEditingProduct ? t('Modify Active Sale Product', 'B2B 등록 공급 설비 규격 수정') : t('Register New Sale Product', '사업자 공급용 신규 전력 설비 등록')}
                </h3>
                <p className="text-[11px] text-slate-405 mt-0.5 font-sans">
                  {t('Fill in technical sheets, specific prices and supply constraints mapped to ERP sync.', '신규 기자재 및 전력 설비 제품의 국영문 단가, 제원 설명, 인도 한계를 설정합니다.')}
                </p>
              </div>

              <form onSubmit={handleDirectSaveProduct} className="space-y-3.5 pr-2">
                {/* Row 1: Name Ko / Name En */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">제품명 (국문명) *</label>
                    <input
                      type="text"
                      required
                      value={directProdNameKo}
                      onChange={(e) => setDirectProdNameKo(e.target.value)}
                      placeholder="예) SH-300 분산형 인버터 복합기"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Product Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={directProdNameEn}
                      onChange={(e) => setDirectProdNameEn(e.target.value)}
                      placeholder="e.g. SH-300 Grid Tie Inverter"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>
                </div>

                {/* Row 2: Category Ko / Category En */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">카테고리 (국문)</label>
                    <input
                      type="text"
                      value={directProdCategoryKo}
                      onChange={(e) => setDirectProdCategoryKo(e.target.value)}
                      placeholder="예) 신에너지 발전 설비"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Category (English)</label>
                    <input
                      type="text"
                      value={directProdCategoryEn}
                      onChange={(e) => setDirectProdCategoryEn(e.target.value)}
                      placeholder="e.g. Renewable Energy Equipment"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>
                </div>

                {/* Row 3: KRW Price / USD Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">원화 공급가 (₩, 부가세 제외)</label>
                    <input
                      type="number"
                      required
                      value={directProdPriceKrw}
                      onChange={(e) => setDirectProdPriceKrw(Number(e.target.value))}
                      placeholder="숫자만 기입"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">USD Price ($, ex. VAT)</label>
                    <input
                      type="number"
                      required
                      value={directProdPriceUsd}
                      onChange={(e) => setDirectProdPriceUsd(Number(e.target.value))}
                      placeholder="e.g. 15000"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                {/* Row 4: Icons & Image Upload (Direct File Selection) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">기본 데코레이션 아이콘</label>
                    <select
                      value={directProdIconName}
                      onChange={(e) => setDirectProdIconName(e.target.value as any)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans h-[38px]"
                    >
                      <option value="generator">{t('Generator', '발전기 / ESS')}</option>
                      <option value="capacitor">{t('Capacitor', '콘덴서 / 수배전')}</option>
                      <option value="binder">{t('Binder', '기전 바인더 / 기계')}</option>
                      <option value="ev">{t('Mobility', '모빌리티 / 소방')}</option>
                    </select>
                  </div>

                  {/* Direct Image File Upload Option */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
                      {t('Product Photo Setup (Direct Upload)', '제품 실물 사진 직접 등록 *')}
                    </label>
                    <div className="relative border border-dashed border-white/10 hover:border-cyan-400/50 rounded-lg p-2 bg-slate-950/70 transition-all flex flex-col items-center justify-center text-center group cursor-pointer h-[120px] overflow-hidden">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 1.5 * 1024 * 1024) {
                              alert(language === 'en' ? 'File is too large. Max 1.5MB allowed.' : '파일 크기가 너무 큽니다. 모바일/웹 저장성능을 위해 최대 1.5MB 이하 이미지로 등록해 주십시오.');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setDirectProdImageUrl(event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      {directProdImageUrl ? (
                        <div className="flex items-center gap-2 w-full h-full p-2 relative z-20 justify-between">
                          <img 
                            src={directProdImageUrl} 
                            alt="Direct Product Upload" 
                            className="h-full w-2/3 rounded object-cover border border-white/15 shadow"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setDirectProdImageUrl('');
                            }}
                            className="text-[10px] py-1 px-2.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border-0 rounded cursor-pointer transition-colors font-bold"
                          >
                            {t('Remove', '삭제')}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-450 group-hover:text-cyan-400/85 transition-colors pointer-events-none">
                          <Upload className="w-5 h-5" />
                          <div>
                            <span className="text-[11px] font-bold block">{t('Upload Image File', '이미지 파일 첨부')}</span>
                            <span className="text-[9px] text-slate-500 block">{t('PNG, JPG (Max 1.5M)', 'PNG, JPG 최대 1.5MB')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 5: Description Ko & Desc En */}
                <div className="space-y-1 font-sans">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">국문 제원 단문요약 설명</label>
                  <textarea
                    value={directProdDescKo}
                    onChange={(e) => setDirectProdDescKo(e.target.value)}
                    placeholder="예) 고전압 그리드 서지 순간 충격 차단 유닛으로, 모빌리티와 배선망 보호에 최적화."
                    rows={2}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans resize-none"
                  />
                </div>
                <div className="space-y-1 font-sans">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">English Description Summary</label>
                  <textarea
                    value={directProdDescEn}
                    onChange={(e) => setDirectProdDescEn(e.target.value)}
                    placeholder="e.g. Robust grid coupling interface safe guarding solar power generation units."
                    rows={2}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans resize-none"
                  />
                </div>

                {/* Row 6: Specs lists (newline split) */}
                <div className="space-y-1 font-sans">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">국문 주요 제원 사양 (한 줄에 하나씩)</label>
                  <textarea
                    value={directProdSpecKoText}
                    onChange={(e) => setDirectProdSpecKoText(e.target.value)}
                    placeholder="예) 보증 수명: 15년 보증&#10;정격 수율: 99.8% 효율 저감 차전"
                    rows={3}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
                <div className="space-y-1 font-sans">
                  <label className="text-[10px] font-mono font-bold text-slate-455 block uppercase tracking-wider">English Technical Sheets (one spec per line)</label>
                  <textarea
                    value={directProdSpecEnText}
                    onChange={(e) => setDirectProdSpecEnText(e.target.value)}
                    placeholder="e.g. Service Life: 15 years&#10;Power Rating: 99.8% total efficiency yield"
                    rows={3}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-455 font-sans"
                  />
                </div>

                {/* Row 7: Availability Ko / En */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">인도기한 (국문)</label>
                    <input
                      type="text"
                      value={directProdAvailabilityKo}
                      onChange={(e) => setDirectProdAvailabilityKo(e.target.value)}
                      placeholder="예) 본사 승인 즉시 당일 화물 항공 배속"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Availability (English)</label>
                    <input
                      type="text"
                      value={directProdAvailabilityEn}
                      onChange={(e) => setDirectProdAvailabilityEn(e.target.value)}
                      placeholder="e.g. Direct freight shipping within 3 business days"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3 font-sans font-sans">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDirectProductModal(false);
                      setDirectEditingProduct(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 font-bold text-xs transition-colors cursor-pointer border border-white/5"
                  >
                    {t('Cancel', '수정작업 취소')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-350 text-slate-950 font-black text-xs transition-colors cursor-pointer border-0"
                  >
                    {t('Save Product Specs', '공식 판매 설비 저장 적용')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Postal Zip Code Search Modal */}
      <AnimatePresence>
        {showZipSearchModal && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-sans">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl text-left"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-extrabold text-white font-sans">
                    {t('Postal Zip Code Search', '행정 지정 우편번호 및 물류 인도지 검색')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowZipSearchModal(false)}
                  className="text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Live search input field */}
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                  {t('Search by Road/Center name (e.g., Pangyo, Seoul)', '도로명 또는 에너지단지 키워드 검색 (예: 판교, 나주, 서울, 공단)')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={zipSearchKeyword}
                    onChange={(e) => setZipSearchKeyword(e.target.value)}
                    placeholder={t('Enter destination keyword...', '검색 키워드 입력...')}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-450 pointer-events-none" />
                </div>
              </div>

              {/* Lists of matching Korean addresses */}
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {(() => {
                  const filtered = KOREAN_POSTAL_ADDRESSES.filter(item => {
                    const query = zipSearchKeyword.toLowerCase().trim();
                    if (!query) return true;
                    return (
                      item.zip.includes(query) ||
                      item.main.toLowerCase().includes(query) ||
                      item.desc.toLowerCase().includes(query)
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-8 text-xs text-slate-500 font-sans">
                        {t('No matching energy-hub address found.', '일치하는 지정 물류 지구 주소가 없습니다.')}
                        <button
                          type="button"
                          onClick={() => {
                            setBuyerZipCode('00000');
                            setBuyerMainAddress(zipSearchKeyword);
                            setShowZipSearchModal(false);
                          }}
                          className="mt-2 block mx-auto text-cyan-410 font-bold underline bg-transparent border-0 cursor-pointer text-xs"
                        >
                          "{zipSearchKeyword}" 을 기본 주소로 직접 입력하기
                        </button>
                      </div>
                    );
                  }

                  return filtered.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setBuyerZipCode(item.zip);
                        setBuyerMainAddress(item.main);
                        setShowZipSearchModal(false);
                      }}
                      className="w-full text-left p-3 rounded-lg bg-slate-950/80 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/20 transition-all group flex gap-3 cursor-pointer"
                    >
                      <div className="text-cyan-400 font-mono font-bold text-xs bg-slate-900 border border-white/5 px-2 py-1 rounded h-fit">
                        {item.zip}
                      </div>
                      <div className="space-y-0.5 text-xs font-sans min-w-0 flex-1">
                        <p className="text-slate-200 group-hover:text-white font-semibold truncate">
                          {item.main}
                        </p>
                        <p className="text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors truncate">
                          [기전 물류거점] {item.desc}
                        </p>
                      </div>
                    </button>
                  ));
                })()}
              </div>

              {/* Bottom helpers */}
              <div className="text-[10.5px] text-slate-450 leading-relaxed font-sans bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                💡 {t(
                  'Post Office standard distribution search indexing is active. For other global delivery locations, close search and enter address directly.',
                  '신화에너지솔루션-MOASD 전국 거점 물류기지가 인덱싱되어 있습니다. 목록에 없는 일반 주소는 검색창 아래 직접 기입하기 또는 닫기 후 빈 주소칸 수동 수정이 가능합니다.'
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
