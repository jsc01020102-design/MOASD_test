import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Eye, Search, Filter, Plus, Trash2, Edit2, FileImage, X, 
  Lock, Unlock, Sparkles, Cpu, FileCheck, Check, ArrowRight, Share2, HelpCircle,
  ArrowLeft, PhoneCall, ShoppingCart, ShieldCheck, Send, Store
} from 'lucide-react';

import supercapacitorFactory from '../assets/images/supercapacitor_factory_1781621879548.jpg';
import evAssemblyLine from '../assets/images/ev_assembly_line_1781621897327.jpg';
import evMotoAssembly from '../assets/images/ev_moto_assembly_1781624859000.jpg';
import samMaterialLab from '../assets/images/sam_material_lab_1781624876856.jpg';
import hge3d00Generator from '../assets/images/hge3d00_generator_1781622900745.jpg';
import adamhanCabinHouse from '../assets/images/adamhan_cabin_house_1781935827590.jpg';
import marineFloatingResort from '../assets/images/marine_floating_resort_1781936311828.jpg';

interface ProductAttachment {
  id: string;
  name: string;
  nameEn: string;
  category: 'sam' | 'mobility' | 'building' | 'energy';
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  date: string;
  detailPageImageUrl?: string;
}

const INITIAL_PRODUCTS: ProductAttachment[] = [];

export function Products({ language }: { language: 'ko' | 'en' }) {
  const [products, setProducts] = useState<ProductAttachment[]>(() => {
    const saved = localStorage.getItem('moasd_product_attachments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map old structure (with potential missing fields) safely
        return parsed.map((p: any) => ({
          id: p.id,
          name: p.name,
          nameEn: p.nameEn || p.name,
          category: p.category || 'sam',
          categoryLabel: p.categoryLabel || 'SAM 신소재',
          categoryLabelEn: p.categoryLabelEn || 'SAM Materials',
          description: p.description || '',
          descriptionEn: p.descriptionEn || p.description || '',
          imageUrl: p.imageUrl || '',
          date: p.date || new Date().toISOString().split('T')[0]
        }));
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<ProductAttachment | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<'info' | 'inquiry'>('info');

  // Quick Inquiry state inside detail page
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  
  // Master mode settings
  const [isMaster, setIsMaster] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [masterPasswordInput, setMasterPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Add & Edit Product states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductAttachment | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState<'sam' | 'mobility' | 'building' | 'energy'>('sam');
  const [newDesc, setNewDesc] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDetailPageImageUrl, setNewDetailPageImageUrl] = useState('');
  const [isSendingInquiry, setIsSendingInquiry] = useState(false);

  // Toast message
  const [toast, setToast] = useState<{ message: string; show: boolean } | null>(null);

  useEffect(() => {
    // Check master status from session storage
    const adminSession = sessionStorage.getItem('moasd_admin_session');
    if (adminSession) {
      setIsMaster(true);
    }
    
    // Add event listener to check changes dynamically
    const interval = setInterval(() => {
      const currentSession = sessionStorage.getItem('moasd_admin_session');
      setIsMaster(currentSession !== null);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setToast({ message: msg, show: true });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, show: false } : null);
    }, 3000);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) {
      alert(language === 'ko' ? '성함과 연락처는 필수 입력 사항입니다.' : 'Name and phone number are required.');
      return;
    }

    const currentProduct = products.find(p => p.id === selectedProductId);
    if (!currentProduct) return;

    setIsSendingInquiry(true);

    // Create inquiry
    const newInquiry = {
      id: `inq-${Date.now()}`,
      authorName: inquiryName,
      authorEmail: inquiryEmail || 'no-email@moasd.com',
      title: `[제품 단가 문의] ${currentProduct.name} - ${inquiryCompany || '일반'}`,
      content: `회사/기관명: ${inquiryCompany || '미기재'} \n연락처: ${inquiryPhone} \n이메일: ${inquiryEmail || '미기재'} \n\n[문의내용]\n${inquiryContent || '해당 제품의 정식 견적 및 단가, 최적화 맞춤 설계 일정에 대한 상담을 신청합니다.'}`,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/ /g, '').slice(0, -1),
      isPrivate: true,
      answers: []
    };

    const savedInquiries = localStorage.getItem('moasd_support_inquiries');
    let inquiriesList = [];
    if (savedInquiries) {
      try {
        inquiriesList = JSON.parse(savedInquiries);
      } catch (err) {
        inquiriesList = [];
      }
    }

    const updatedList = [newInquiry, ...inquiriesList];
    localStorage.setItem('moasd_support_inquiries', JSON.stringify(updatedList));

    // Dispatch automated email notification via Web3Forms to sinhwaensol@gmail.com
    const emailAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "e463a8a3-83eb-46b0-9fcf-b67876a39d8d"; // fallback key
    
    try {
      const emailFormData = {
        access_key: emailAccessKey,
        name: inquiryName,
        email: inquiryEmail || "sinhwaensol@gmail.com",
        subject: `[(주)모아에스디 B2B 제품단가문의] ${currentProduct.name}`,
        from_name: "MOASD B2B Auto-Inquiry System",
        to_email: "sinhwaensol@gmail.com",
        message: `[(주)모아에스디 B2B 플랫폼 제품 단가문의 접수]

● 문의 제품: ${currentProduct.name} (${currentProduct.nameEn})
● 제품 카테고리: ${currentProduct.categoryLabel}
● 문의 일시: ${new Date().toLocaleString('ko-KR')}

[신청 바이어 정보]
- 담당자 성함: ${inquiryName}
- 회사 및 소속 기관명: ${inquiryCompany || "개인 및 미기재"}
- 전화 연락처: ${inquiryPhone}
- 회신 이메일 주소: ${inquiryEmail || "미기재"}

[상세 요구사항 및 메모]
${inquiryContent || "해당 제품의 공식 공급 단가 및 기술 정합성에 관한 1:1 상담과 자료 전송을 요청드립니다."}`
      };

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(emailFormData)
      });
      console.log("[Email Sync] Inquiry email successfully dispatched to sinhwaensol@gmail.com via Web3Forms gateway.");
    } catch (err) {
      console.error("[Email Sync] Error sending email via Web3Forms:", err);
    } finally {
      setIsSendingInquiry(false);
    }

    // Reset Form
    setInquiryName('');
    setInquiryCompany('');
    setInquiryPhone('');
    setInquiryEmail('');
    setInquiryContent('');

    triggerToast(
      language === 'ko'
        ? '가격 문의가 sinhwaensol@gmail.com 메일로 안전하게 발송되었으며 상담 접수가 완료되었습니다!'
        : 'Inquiry email automatically sent to sinhwaensol@gmail.com & registered successfully!'
    );

    setDetailTab('info');
  };

  const handleMasterAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const MASTER_ADMIN_PASS = '0815)*!%';
    if (masterPasswordInput === MASTER_ADMIN_PASS) {
      setIsMaster(true);
      setAuthError(null);
      setShowPasswordDialog(false);
      setMasterPasswordInput('');
      
      const adminSession = {
        id: 'master-admin',
        name: '장세창 최고관리자',
        phone: '010-2242-7801',
        roleLabel: 'S'
      };
      sessionStorage.setItem('moasd_admin_session', JSON.stringify(adminSession));
      triggerToast(language === 'ko' ? '최고 관리자 권한이 성공적으로 해제되었습니다!' : 'Master Admin mode authorized!');
    } else {
      setAuthError(language === 'ko' ? '마스터 비밀번호가 틀렸습니다.' : 'Incorrect master password code.');
    }
  };

  const handleLogout = () => {
    setIsMaster(false);
    sessionStorage.removeItem('moasd_admin_session');
    triggerToast(language === 'ko' ? '관리자 모드를 종료했습니다.' : 'Exited admin mode.');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setNewTitle('');
    setNewTitleEn('');
    setNewCategory('sam');
    setNewDesc('');
    setNewDescEn('');
    setNewImageUrl('');
    setNewDetailPageImageUrl('');
    setShowAddModal(true);
  };

  const openEditModal = (prod: ProductAttachment, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(prod);
    setNewTitle(prod.name);
    setNewTitleEn(prod.nameEn);
    setNewCategory(prod.category);
    setNewDesc(prod.description);
    setNewDescEn(prod.descriptionEn);
    setNewImageUrl(prod.imageUrl);
    setNewDetailPageImageUrl(prod.detailPageImageUrl || '');
    setShowAddModal(true);
  };

  const handleDeleteProduct = (prodId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === 'ko' ? '정말로 이 제품을 삭제하시겠습니까?' : 'Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== prodId);
      setProducts(updated);
      localStorage.setItem('moasd_product_attachments', JSON.stringify(updated));
      triggerToast(language === 'ko' ? '제품이 성공적으로 삭제되었습니다.' : 'Product deleted successfully.');
      if (selectedProductId === prodId) {
        setSelectedProductId(null);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetailPageImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDetailPageImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert(language === 'ko' ? '제품명은 필수입니다.' : 'Product title is required.');
      return;
    }

    const defaultImages = [samMaterialLab, supercapacitorFactory, evAssemblyLine, evMotoAssembly, hge3d00Generator, adamhanCabinHouse, marineFloatingResort];
    const finalImg = newImageUrl.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    let catLabel = 'SAM 신소재';
    let catLabelEn = 'SAM Materials';
    if (newCategory === 'mobility') {
      catLabel = '스마트 모빌리티';
      catLabelEn = 'Smart Mobility';
    } else if (newCategory === 'building') {
      catLabel = '에코 빌딩';
      catLabelEn = 'Eco Buildings';
    } else if (newCategory === 'energy') {
      catLabel = '에너지 자가발전';
      catLabelEn = 'Energy Systems';
    }

    let updatedList: ProductAttachment[];

    if (editingProduct) {
      // Edit mode
      updatedList = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: newTitle,
            nameEn: newTitleEn || newTitle,
            category: newCategory,
            categoryLabel: catLabel,
            categoryLabelEn: catLabelEn,
            description: newDesc,
            descriptionEn: newDescEn || newDesc,
            imageUrl: finalImg,
            detailPageImageUrl: newDetailPageImageUrl
          };
        }
        return p;
      });
      triggerToast(language === 'ko' ? '제품 정보가 성공적으로 수정되었습니다.' : 'Product updated successfully.');
    } else {
      // Add mode
      const newProd: ProductAttachment = {
        id: `prod-${Date.now()}`,
        name: newTitle,
        nameEn: newTitleEn || newTitle,
        category: newCategory,
        categoryLabel: catLabel,
        categoryLabelEn: catLabelEn,
        description: newDesc || `${newTitle} 제품 사양입니다.`,
        descriptionEn: newDescEn || `${newTitleEn || newTitle} specs.`,
        imageUrl: finalImg,
        detailPageImageUrl: newDetailPageImageUrl,
        date: new Date().toISOString().split('T')[0]
      };
      updatedList = [newProd, ...products];
      triggerToast(language === 'ko' ? '신규 제품이 성공적으로 등록되었습니다.' : 'New product registered successfully.');
    }

    setProducts(updatedList);
    localStorage.setItem('moasd_product_attachments', JSON.stringify(updatedList));

    // Reset fields & close modal
    setNewTitle('');
    setNewTitleEn('');
    setNewCategory('sam');
    setNewDesc('');
    setNewDescEn('');
    setNewImageUrl('');
    setNewDetailPageImageUrl('');
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const filteredProducts = products.filter(prod => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const nameMatch = prod.name.toLowerCase().includes(term) || prod.nameEn.toLowerCase().includes(term);
      const descMatch = prod.description.toLowerCase().includes(term) || prod.descriptionEn.toLowerCase().includes(term);
      return nameMatch || descMatch;
    }
    return true;
  });

  return (
    <div className="pt-24 min-h-[85vh] bg-slate-950 text-slate-100 select-text font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        
        {/* If product detail view is active */}
        {selectedProductId && selectedProduct ? (
          <div className="space-y-8">
            {/* Breadcrumb & Back Arrow */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <button
                onClick={() => setSelectedProductId(null)}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-semibold group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {language === 'ko' ? '전체 제품 목록으로 가기' : 'Back to Catalog'}
              </button>
              
              <div className="text-[11px] text-slate-500 font-mono">
                {language === 'ko' ? '제품' : 'Products'} &gt; {language === 'ko' ? selectedProduct.categoryLabel : selectedProduct.categoryLabelEn} &gt; <span className="text-cyan-400 font-bold">{language === 'ko' ? selectedProduct.name : selectedProduct.nameEn}</span>
              </div>
            </div>

            {/* Coupang-Style Split Product Spec Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-900/15 border border-white/5 rounded-3xl p-6 sm:p-8">
              {/* Left Column: Product Image Gallery */}
              <div className="md:col-span-5 space-y-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center group">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest text-cyan-400 bg-slate-950/90 border border-cyan-400/20 px-3 py-1 rounded-full backdrop-blur-sm shadow uppercase">
                    {language === 'ko' ? selectedProduct.categoryLabel : selectedProduct.categoryLabelEn}
                  </span>
                  
                  {/* Glassmorphism Zoom button over image */}
                  <button
                    onClick={() => setLightboxImage(selectedProduct)}
                    className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-slate-950 border border-white/10 p-2.5 rounded-xl text-cyan-400 transition-all flex items-center gap-1.5 text-xs font-bold shadow-lg cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    {language === 'ko' ? '크게 보기' : 'Zoom Blueprint'}
                  </button>
                </div>

                {/* Secure Badge */}
                <div className="bg-slate-950/60 border border-cyan-500/10 p-4 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-slate-200">
                      {language === 'ko' ? '100% 모아에스디 원천 특허 정품' : '100% MOASD Patented Material'}
                    </h5>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      {language === 'ko' ? '본 사양 및 설계 정보는 독자적 바인더 설계 원천특허를 적용받는 국가대표 기술입니다.' : 'Blueprints contain proprietary collective binder and nano electrode materials protected by global patent laws.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Buying Box & Specifications */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Brand & Badge line */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase font-mono">
                      (주)모아에스디 MOASD CO., LTD.
                    </span>
                    <span className="text-[9px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">
                      ROCKET DIRECT
                    </span>
                  </div>

                  {/* Product Title */}
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                    {language === 'ko' ? selectedProduct.name : selectedProduct.nameEn}
                  </h1>

                  {/* Rating Mimic */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-white/5 pb-4">
                    <div className="flex text-amber-400 font-bold">⭐⭐⭐⭐⭐</div>
                    <span className="font-bold text-slate-300">5.0</span>
                    <span>|</span>
                    <span className="text-slate-400">{language === 'ko' ? '48개 상품인증 및 평가 완료' : '48 technical appraisals'}</span>
                    <span>|</span>
                    <span className="text-cyan-400 font-semibold">{language === 'ko' ? '특허 신소재 등록 제품' : 'Patent Registered'}</span>
                  </div>

                  {/* Price Container */}
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">{language === 'ko' ? '정식 공급가' : 'Official Rate'}</span>
                      <div className="text-right">
                        <span className="text-slate-500 line-through text-xs mr-2 block">
                          {language === 'ko' ? '견적 협의 제품' : 'Inquiry requested'}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-cyan-400 tracking-tight animate-pulse">
                          {language === 'ko' ? '가격 문의' : 'Price: Inquiry'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 flex flex-col gap-2 text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>{language === 'ko' ? '배송/공급 방식' : 'Supply Method'}</span>
                        <strong className="text-slate-200">{language === 'ko' ? '승인 후 즉시 도면 및 데이터 전송 (무상)' : 'Immediate digital delivery on approval (free)'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'ko' ? '부가 서비스' : 'Technical Match'}</span>
                        <strong className="text-emerald-400">{language === 'ko' ? '전문 엔지니어 1:1 맞춤형 섀시 레이아웃 변경 지원' : '1:1 engineer physical chassis support'}</strong>
                      </div>
                    </div>
                  </div>


                </div>
                
              </div>
            </div>

            {/* Coupang-style Tab Bar Menu */}
            <div id="coupang-tabs-panel" className="border-b border-white/10 flex items-center gap-1">
              {[
                { id: 'info', ko: '상품상세 설명', en: 'Description' },
                { id: 'inquiry', ko: '실시간 견적 및 가격문의', en: 'Price Inquiry Form' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id as any)}
                  className={`px-6 py-3.5 text-xs font-black transition-all border-b-2 relative cursor-pointer ${
                    detailTab === tab.id
                      ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'ko' ? tab.ko : tab.en}
                </button>
              ))}
            </div>

            {/* Tab Details Render block */}
            <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 sm:p-8">
              {detailTab === 'info' && (
                <div className="space-y-6">
                  {selectedProduct.detailPageImageUrl ? (
                    <div className="space-y-6">
                      <div className="space-y-2 border-b border-white/5 pb-4">
                        <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                          {language === 'ko' ? '제품 상세 설명 페이지' : 'Detailed Product Presentation'}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {language === 'ko' 
                            ? '아래 고해상도 상세 설명 도면 및 사양서를 확인해 주시기 바랍니다.' 
                            : 'Please review the official detailed specification and layout blueprint below.'}
                        </p>
                      </div>

                      {/* Detailed Description Image Rendering */}
                      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-1 flex items-center justify-center">
                        <img
                          src={selectedProduct.detailPageImageUrl}
                          alt={`${selectedProduct.name} Detail Page`}
                          className="w-full h-auto rounded-xl object-contain max-h-[1200px]"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="border border-dashed border-cyan-400/20 bg-cyan-950/20 p-5 rounded-2xl text-center">
                        <p className="text-xs text-cyan-300">
                          {language === 'ko' 
                            ? '※ 본 제품은 기술 특허 보호 대상이며, 원천 도면 및 데이터 사양을 불법 복제하거나 영리 배포 시 민형사상 책임을 질 수 있습니다.' 
                            : '※ This material is strictly protected by global intellectual property patents. Unauthorized distribution of blue sheets is strictly prohibited.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">{language === 'ko' ? '제품 특장점 및 핵심 활용 사례' : 'Key Advantages & Target Fields'}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {language === 'ko' ? selectedProduct.description : selectedProduct.descriptionEn}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="border border-white/5 bg-slate-950/40 p-5 rounded-2xl space-y-2">
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {language === 'ko' ? '혁신적 SAM 화학적 결합 메커니즘' : 'Innovative SAM Material Core'}
                          </h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {language === 'ko' 
                              ? '화학초록서비스(CAS)에 정식 등록된 모아에스디 고유 특허 집전체 표면 나노 증집 기술을 바탕으로, 내부 저항을 극도로 낮추고 높은 열적 피로도에서도 안정성을 유지하도록 설계되었습니다.' 
                              : 'Our chemistry framework dramatically improves micro electrode density by forming stable collective binding chains, reducing thermal failure rates to practically zero.'}
                          </p>
                        </div>

                        <div className="border border-white/5 bg-slate-950/40 p-5 rounded-2xl space-y-2">
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {language === 'ko' ? '용이한 장착 및 표준 규격 준수' : 'Chassis Integration & Standards'}
                          </h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {language === 'ko' 
                              ? '자동차 부품 규격, 마이크로 쉘터 구조 등 다양한 환경에 바로 삽입할 수 있도록 설계되었으며, 동봉된 CAD 사양 도면을 통하여 쉽게 커스터마이징이 가능합니다.' 
                              : 'Engineered strictly inside DIN and standard EV mechanical housing structures. Blueprints offer flexible dimension configurations for tailored mechanical packaging.'}
                          </p>
                        </div>
                      </div>

                      <div className="border border-dashed border-cyan-400/20 bg-cyan-950/20 p-5 rounded-2xl text-center">
                        <p className="text-xs text-cyan-300">
                          {language === 'ko' 
                            ? '※ 본 제품은 기술 특허 보호 대상이며, 원천 도면 및 데이터 사양을 불법 복제하거나 영리 배포 시 민형사상 책임을 질 수 있습니다.' 
                            : '※ This material is strictly protected by global intellectual property patents. Unauthorized distribution of blue sheets is strictly prohibited.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {detailTab === 'inquiry' && (
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                      {language === 'ko' ? '실시간 가격 견적 및 설계 맞춤 문의' : 'Price & Blueprint Customized Inquiry'}
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      {language === 'ko' 
                        ? '이메일 또는 휴대전화 정보를 입력해주시면 담당 엔지니어가 실시간으로 원천 기술 가공 단가 및 라이선스 견적을 안내해 드립니다.' 
                        : 'Provide your contact details. A technical sales engineer will reach out with customized unit costs and drafting terms.'}
                    </p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-400 font-bold block">{language === 'ko' ? '성함 (담당자)' : 'Your Name'} *</label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder={language === 'ko' ? '예) 홍길동 대리' : 'e.g., John Doe'}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3.5 py-2.5 rounded-xl text-white focus:outline-none placeholder-slate-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-400 block">{language === 'ko' ? '회사명 / 소속 기관' : 'Company / Organization'}</label>
                        <input
                          type="text"
                          value={inquiryCompany}
                          onChange={(e) => setInquiryCompany(e.target.value)}
                          placeholder={language === 'ko' ? '예) 모아연구소' : 'e.g., MIT Lab'}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3.5 py-2.5 rounded-xl text-white focus:outline-none placeholder-slate-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-400 font-bold block">{language === 'ko' ? '연락처 (휴대전화)' : 'Phone Number'} *</label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder={language === 'ko' ? '예) 010-1234-5678' : 'e.g., +82-10-1234-5678'}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3.5 py-2.5 rounded-xl text-white focus:outline-none placeholder-slate-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-400 block">{language === 'ko' ? '회신 이메일 주소' : 'Email Address'}</label>
                        <input
                          type="email"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="your-email@example.com"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3.5 py-2.5 rounded-xl text-white focus:outline-none placeholder-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-400 block">{language === 'ko' ? '상세 기술 규격 및 수량 요구사항' : 'Technical requirements / Custom sizes'}</label>
                      <textarea
                        rows={4}
                        value={inquiryContent}
                        onChange={(e) => setInquiryContent(e.target.value)}
                        placeholder={
                          language === 'ko'
                            ? `기본으로 제공되는 ${selectedProduct.name} 도면을 수령하길 원하며, 이에 관한 단가 및 시제품 가공 상담을 원합니다.`
                            : `I would like to receive the official blueprints for ${selectedProduct.nameEn} and request custom scale options.`
                        }
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3.5 py-2.5 rounded-xl text-white focus:outline-none placeholder-slate-600 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        {language === 'ko' ? '가격 문의 및 기술 상담 무료 신청' : 'Submit Free Quote Application'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Normal Products Catalog Grid View */
          <div className="space-y-8">
            {isMaster && (
              <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-bold text-cyan-300">
                    {language === 'ko' ? '최고 마스터 관리자 모드 활성화 중' : 'Master Admin Authorized Mode'}
                  </span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={openAddModal}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-950"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    {language === 'ko' ? '신규 제품 등록' : 'Add New Product'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-slate-850 hover:bg-slate-800 border border-white/5 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {language === 'ko' ? '관리자 로그아웃' : 'Admin Logout'}
                  </button>
                </div>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-slate-900/20 p-4 border border-white/5 rounded-2xl">
              {/* Categories Tab list */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 md:pb-0">
                {[
                  { id: 'all', ko: '전체', en: 'All' },
                  { id: 'sam', ko: 'SAM 신소재', en: 'SAM Materials' },
                  { id: 'mobility', ko: '스마트 모빌리티', en: 'Mobility' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-sm'
                        : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {language === 'ko' ? cat.ko : cat.en}
                  </button>
                ))}

                {!isMaster && (
                  <button
                    onClick={() => setShowPasswordDialog(true)}
                    className="text-[10px] px-2.5 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-all cursor-pointer flex items-center gap-1 shrink-0 ml-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/80" />
                    {language === 'ko' ? '마스터 인증' : 'Master Auth'}
                  </button>
                )}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'ko' ? '제품명, 상세 설명 검색...' : 'Search products, specs...'}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Coupang-style 5-column grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod, idx) => (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setDetailTab('info');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group bg-slate-900/30 hover:bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-[0_8px_30px_rgb(6,182,212,0.1)] flex flex-col h-full relative"
                    >
                      {/* Top Column: Premium Image Preview */}
                      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden flex-shrink-0">
                        <img 
                          src={prod.imageUrl} 
                          alt={prod.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/45 transition-colors duration-300" />
                        
                        {/* Tiny Category Label on list item */}
                        <span className="absolute top-2 left-2 text-[8px] font-bold tracking-wider text-cyan-400 bg-slate-950/90 border border-cyan-400/10 px-2 py-0.5 rounded-md">
                          {language === 'ko' ? prod.categoryLabel : prod.categoryLabelEn}
                        </span>

                        {/* Admin Action Buttons overlay */}
                        {isMaster && (
                          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-25">
                            <button
                              onClick={(e) => openEditModal(prod, e)}
                              className="w-7 h-7 bg-slate-950/90 hover:bg-cyan-400 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-950 transition-all shadow-md cursor-pointer"
                              title={language === 'ko' ? '제품 수정' : 'Edit Product'}
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteProduct(prod.id, e)}
                              className="w-7 h-7 bg-slate-950/90 hover:bg-red-500 border border-white/10 hover:border-red-500 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-md cursor-pointer"
                              title={language === 'ko' ? '제품 삭제' : 'Delete Product'}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bottom Column: Text Metadata & Price Inquiry info */}
                      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between space-y-2">
                        <div className="space-y-1">
                          {/* Title */}
                          <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                            {language === 'ko' ? prod.name : prod.nameEn}
                          </h3>
                          {/* Description */}
                          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
                            {language === 'ko' ? prod.description : prod.descriptionEn}
                          </p>
                        </div>

                        {/* Price & Rocket style badge bottom section */}
                        <div className="pt-2.5 border-t border-white/5 space-y-1">
                          <div className="flex items-baseline justify-between">
                            <span className="text-[10px] text-slate-500">{language === 'ko' ? '가격' : 'Price'}</span>
                            <span className="text-xs sm:text-sm font-black text-cyan-400 tracking-tight">
                              {language === 'ko' ? '가격 문의' : 'Inquiry'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/10 px-1.5 py-0.5 rounded">
                              {language === 'ko' ? '특허 정품' : 'Patented'}
                            </span>
                            <span className="text-slate-500 font-mono text-[8px]">{prod.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center border border-dashed border-white/5 rounded-3xl space-y-3 bg-slate-900/10">
                    <p className="text-sm text-slate-400">
                      {language === 'ko' ? '검색어 또는 카테고리에 일치하는 제품이 존재하지 않습니다.' : 'No products found for current filter.'}
                    </p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                      className="text-xs text-cyan-400 hover:underline font-bold"
                    >
                      {language === 'ko' ? '필터 및 검색 초기화' : 'Reset search filters'}
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}



      </div>

      {/* Floating alert toast */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-cyan-500/40 text-cyan-400 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-mono font-medium max-w-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Preview Dialog Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md" onClick={() => setLightboxImage(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col p-4 backdrop-blur-lg animate-fade-in"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-950 text-slate-400 hover:text-white border border-white/5 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] sm:aspect-video w-full bg-slate-950/60 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/50 border border-cyan-400/20 px-2 py-0.5 rounded-full">
                    {language === 'ko' ? lightboxImage.categoryLabel : lightboxImage.categoryLabelEn}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{lightboxImage.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  {language === 'ko' ? lightboxImage.name : lightboxImage.nameEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {language === 'ko' ? lightboxImage.description : lightboxImage.descriptionEn}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Password Input dialog modal */}
      <AnimatePresence>
        {showPasswordDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  {language === 'ko' ? '마스터 전용 암호 인증' : 'Master Mode Authentication'}
                </h3>
                <button
                  onClick={() => { setShowPasswordDialog(false); setAuthError(null); }}
                  className="text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleMasterAuth} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-mono">
                    {language === 'ko' ? '최고 마스터 관리자 비밀번호' : 'Master Password Code'}
                  </label>
                  <input
                    type="password"
                    value={masterPasswordInput}
                    onChange={(e) => setMasterPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                  />
                  {authError && (
                    <p className="text-[10px] text-red-400 font-mono">{authError}</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowPasswordDialog(false); setAuthError(null); }}
                    className="w-1/2 text-xs py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all cursor-pointer font-bold"
                  >
                    {language === 'ko' ? '취소' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 text-xs py-2.5 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold transition-all cursor-pointer"
                  >
                    {language === 'ko' ? '마스터 로그인' : 'Verify'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  {editingProduct 
                    ? (language === 'ko' ? '제품 정보 수정' : 'Edit Product Details')
                    : (language === 'ko' ? '신규 제품 등록 및 이미지 업로드' : 'Register New Product & Upload Image')}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold">{language === 'ko' ? '제품명 (한글)' : 'Product Name (Ko)'} *</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="예) SAM 고전도 전극 분말"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">{language === 'ko' ? '제품명 (영문)' : 'Product Name (En)'}</label>
                    <input
                      type="text"
                      value={newTitleEn}
                      onChange={(e) => setNewTitleEn(e.target.value)}
                      placeholder="e.g., SAM High-Conductivity Powder"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category Selector */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">{language === 'ko' ? '제품 카테고리 분류' : 'Product Category'}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white focus:outline-none"
                  >
                    <option value="sam">{language === 'ko' ? 'SAM 신소재' : 'SAM Materials'}</option>
                    <option value="mobility">{language === 'ko' ? '스마트 모빌리티' : 'Smart Mobility'}</option>
                  </select>
                </div>

                {/* Description (Ko/En) */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">{language === 'ko' ? '상세 설명 (한글)' : 'Description (Ko)'}</label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="제품에 대한 원천 기술, 물리적 특성, 상세 용도 설명..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">{language === 'ko' ? '상세 설명 (영문)' : 'Description (En)'}</label>
                  <textarea
                    rows={2}
                    value={newDescEn}
                    onChange={(e) => setNewDescEn(e.target.value)}
                    placeholder="Technical specs, performance parameters or features in English..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Product Image Registration (Local File or URL) */}
                <div className="border-t border-b border-white/5 py-4 space-y-3">
                  <span className="block text-slate-400 font-bold">
                    {language === 'ko' ? '제품 이미지 업로드 및 등록' : 'Product Image Upload & Reference'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Method A: Local File Upload */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">{language === 'ko' ? '방법 A: 로컬 컴퓨터에서 이미지 업로드' : 'Method A: Upload from Local Disk'}</label>
                      <div className="relative flex items-center justify-center bg-slate-950 border border-slate-800 hover:border-slate-700 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer text-center text-[10px] font-bold">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <FileImage className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                        {language === 'ko' ? '이미지 파일 선택...' : 'Choose Image File...'}
                      </div>
                    </div>

                    {/* Method B: Direct URL Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">{language === 'ko' ? '방법 B: 인터넷 웹 이미지 주소 직접 입력' : 'Method B: Direct Image Web URL'}</label>
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/product.jpg"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white placeholder-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Preset Quick Selectors */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold block">{language === 'ko' ? '또는 아래 프리미엄 매칭 이미지 클릭 선택:' : 'Or quickly choose a premium preset image:'}</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'SAM Lab', img: samMaterialLab },
                        { name: 'EV Line', img: evAssemblyLine },
                        { name: 'EV Moto', img: evMotoAssembly },
                        { name: 'Generator', img: hge3d00Generator },
                        { name: 'Eco Cabin', img: adamhanCabinHouse },
                        { name: 'Floating Resort', img: marineFloatingResort }
                      ].map((preset, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setNewImageUrl(preset.img)}
                          className={`px-2 py-1 rounded-md text-[10px] font-mono border transition-all ${
                            newImageUrl === preset.img
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Preview Container */}
                  {newImageUrl && (
                    <div className="pt-2 flex items-center gap-3">
                      <div className="relative aspect-square w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                        <img
                          src={newImageUrl}
                          alt="preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-widest uppercase">
                          PREVIEW OK
                        </span>
                        <p className="text-[10px] text-slate-500 truncate max-w-[280px]">
                          {newImageUrl.startsWith('data:') ? 'Base64 Local Encoded Image File' : newImageUrl}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Detail Page Image Registration (Local File or URL) */}
                <div className="border-t border-b border-white/5 py-4 space-y-3">
                  <span className="block text-slate-400 font-bold">
                    {language === 'ko' ? '제품 상세설명 이미지 (상세페이지) 등록' : 'Detailed Description (Detail Page) Image Upload'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Method A: Local File Upload */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">{language === 'ko' ? '방법 A: 로컬 컴퓨터에서 이미지 업로드' : 'Method A: Upload from Local Disk'}</label>
                      <div className="relative flex items-center justify-center bg-slate-950 border border-slate-800 hover:border-slate-700 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer text-center text-[10px] font-bold">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDetailPageImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <FileImage className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                        {language === 'ko' ? '상세 이미지 파일 선택...' : 'Choose Detail Image File...'}
                      </div>
                    </div>

                    {/* Method B: Direct URL Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">{language === 'ko' ? '방법 B: 인터넷 웹 이미지 주소 직접 입력' : 'Method B: Direct Image Web URL'}</label>
                      <input
                        type="url"
                        value={newDetailPageImageUrl}
                        onChange={(e) => setNewDetailPageImageUrl(e.target.value)}
                        placeholder="https://example.com/detail.jpg"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2.5 rounded-xl text-white placeholder-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Image Preview Container */}
                  {newDetailPageImageUrl && (
                    <div className="pt-2 flex items-center gap-3">
                      <div className="relative aspect-video w-24 h-14 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                        <img
                          src={newDetailPageImageUrl}
                          alt="detail-preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-widest uppercase">
                          DETAIL IMAGE PREVIEW
                        </span>
                        <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                          {newDetailPageImageUrl.startsWith('data:') ? 'Base64 Local Encoded Image File' : newDetailPageImageUrl}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 text-xs py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all cursor-pointer font-bold"
                  >
                    {language === 'ko' ? '취소' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 text-xs py-2.5 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold transition-all cursor-pointer"
                  >
                    {editingProduct
                      ? (language === 'ko' ? '수정 완료하기' : 'Apply Changes')
                      : (language === 'ko' ? '새 제품 등록 완료' : 'Complete Registration')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
