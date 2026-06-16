import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOASD_SERVICES } from '../data';
import { DynamicIcon } from './ThreeDCard';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ThreeDCarousel: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(2); // Start looking at the middle element
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const isEn = language === 'en';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = MOASD_SERVICES.length;

  const navigate = (direction: 'next' | 'prev') => {
    setShowDetail(false);
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % total);
    } else {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }
  };

  const handleCardClick = (idx: number) => {
    if (idx === activeIndex) {
      setShowDetail(!showDetail);
    } else {
      setShowDetail(false);
      setActiveIndex(idx);
    }
  };

  return (
    <div className="relative w-full py-16 px-4 select-none overflow-hidden flex flex-col items-center">
      {/* 3D Scene Wrapper */}
      <div 
        className="relative w-full max-w-5xl h-[360px] md:h-[460px] flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {MOASD_SERVICES.map((service, index) => {
          // Calculate circular index difference
          let diff = index - activeIndex;
          
          // Adjust for circular wraps
          if (diff < -total / 2) diff += total;
          if (diff > total / 2) diff -= total;

          const isActive = index === activeIndex;
          const isLeft = diff === -1;
          const isRight = diff === 1;
          const isFarLeft = diff <= -2;
          const isFarRight = diff >= 2;

          // Compute 3D values based on position relative to active item
          let translateX = '0%';
          let translateZ = '0px';
          let rotateY = '0deg';
          let opacity = 0;
          let scale = 1;
          let zIndex = 10;

          if (isActive) {
            translateX = '0%';
            translateZ = '40px';
            rotateY = '0deg';
            opacity = 1;
            scale = 1.05;
            zIndex = 30;
          } else if (isLeft) {
            translateX = isMobile ? '-40%' : '-85%';
            translateZ = isMobile ? '-80px' : '-120px';
            rotateY = isMobile ? '15deg' : '28deg';
            opacity = isMobile ? 0.4 : 0.55;
            scale = isMobile ? 0.8 : 0.88;
            zIndex = 20;
          } else if (isRight) {
            translateX = isMobile ? '40%' : '85%';
            translateZ = isMobile ? '-80px' : '-120px';
            rotateY = isMobile ? '-15deg' : '-28deg';
            opacity = isMobile ? 0.4 : 0.55;
            scale = isMobile ? 0.8 : 0.88;
            zIndex = 20;
          } else if (isFarLeft) {
            translateX = isMobile ? '-80%' : '-165%';
            translateZ = '-240px';
            rotateY = '45deg';
            opacity = isMobile ? 0 : 0.15;
            scale = 0.75;
            zIndex = 10;
          } else if (isFarRight) {
            translateX = isMobile ? '80%' : '165%';
            translateZ = '-240px';
            rotateY = '-45deg';
            opacity = isMobile ? 0 : 0.15;
            scale = 0.75;
            zIndex = 10;
          }

          const serviceTitle = isEn && service.titleEn ? service.titleEn : service.title;
          const serviceSubtitle = isEn && service.subtitleEn ? service.subtitleEn : service.subtitle;
          const serviceDesc = isEn && service.descriptionEn ? service.descriptionEn : service.description;

          return (
            <motion.div
              key={service.id}
              className="absolute w-[265px] xs:w-[310px] sm:w-[390px] md:w-[470px] h-[340px] md:h-[420px] cursor-pointer"
              animate={{
                transform: `
                  translateX(${translateX}) 
                  translateZ(${translateZ}) 
                  rotateY(${rotateY})
                `,
                opacity: opacity,
                scale: scale,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
              }}
              style={{
                zIndex: zIndex,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => handleCardClick(index)}
            >
              {/* Card Design - Styled with pure opaque dark slate for ultra-clear readability with zero bleed-through */}
              <div 
                className={`w-full h-full rounded-2xl p-7 flex flex-col justify-between border transition-all duration-500 relative shadow-2xl ${
                  isActive 
                    ? 'bg-[#0a0f1d] border-cyan-400/80 shadow-cyan-500/10 ring-1 ring-cyan-400/20' 
                    : 'bg-[#0f1524] border-white/10 opacity-40 hover:opacity-70 saturate-[0.5]'
                }`}
              >
                {/* Active Highlight Ambient Light */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-950/35 via-transparent to-purple-950/20 opacity-80 pointer-events-none" />
                )}

                {/* Card Header */}
                <div className="flex justify-between items-start relative z-10">
                  <div className={`p-3.5 rounded-xl border shadow-inner transition-colors ${
                    isActive ? 'bg-slate-900 border-cyan-400/30' : 'bg-slate-950/80 border-white/5'
                  }`}>
                    <DynamicIcon name={service.iconName} className={`w-6.5 h-6.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider transition-colors ${
                    isActive ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-slate-950/80 border-white/5 text-slate-500'
                  }`}>
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-600'}`} />
                    IMPACT {service.impactScore}%
                  </div>
                </div>

                {/* Card Main Description */}
                <div className="mt-5 flex-1 flex flex-col justify-center relative z-10">
                  <h3 className={`text-2xl font-extrabold tracking-tight mb-1.5 font-sans transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}>
                    {serviceTitle}
                  </h3>
                  <p className={`text-xs font-bold tracking-tight mb-3 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-550'
                  }`}>
                    {serviceSubtitle}
                  </p>
                  <p className={`line-clamp-3 text-xs leading-relaxed transition-colors ${
                    isActive ? 'text-slate-300 font-medium' : 'text-slate-500'
                  }`}>
                    {serviceDesc}
                  </p>
                </div>

                {/* Card Sub-Features Preview */}
                <div className="mt-5 space-y-1 relative z-10">
                  {service.benefits.slice(0, 1).map((benefit, bIdx) => {
                    const benefitText = isEn && service.benefitsEn ? service.benefitsEn[bIdx] : benefit;
                    return (
                      <div key={bIdx} className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-colors ${
                          isActive ? 'bg-emerald-500/20' : 'bg-slate-900'
                        }`}>
                          <Check className={`w-3 h-3 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                        </div>
                        <span className={`text-[11px] font-semibold truncate transition-colors ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}>{benefitText}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Indicator / Prompt */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10 font-medium">
                  <span>{isActive ? t('carousel.viewMore', 'Click to view specifications', '클릭 시 정밀 솔루션 보기') : t('carousel.select', 'Select to focus', '선택하여 포커싱')}</span>
                  <div className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-cyan-400 shadow-md shadow-cyan-400 animate-pulse' : 'bg-slate-700'
                  }`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Slider Navigation Controllable buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => navigate('prev')}
          id="carousel-btn-prev"
          className="p-3 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all duration-300 hover:shadow-lg shadow-cyan-500/5 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Dots indicators */}
        <div className="flex items-center gap-2">
          {MOASD_SERVICES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                setShowDetail(false);
                setActiveIndex(dotIdx);
              }}
              id={`carousel-dot-${dotIdx}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate('next')}
          id="carousel-btn-next"
          className="p-3 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all duration-300 hover:shadow-lg shadow-cyan-500/5 active:scale-95 cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Expanded Details Panel with Smooth Exit animations */}
      <div className="relative w-full max-w-3xl mt-12 min-h-[100px]">
        <AnimatePresence mode="wait">
          {showDetail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 to-slate-900 p-6 md:p-8 shadow-xl shadow-cyan-950/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Key Benefits */}
                <div className="md:col-span-6 space-y-4">
                  <h4 className="text-xs md:text-sm font-semibold text-white tracking-widest uppercase flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-3 bg-cyan-400 rounded-full" />
                    {t('carousel.benefits', 'EXPECTED BUSINESS BENEFITS', 'EXPECTED BUSINESS BENEFITS')}
                  </h4>
                  <ul className="space-y-2.5">
                    {MOASD_SERVICES[activeIndex].benefits.map((benefit, bIdx) => {
                      const svc = MOASD_SERVICES[activeIndex];
                      const benefitText = isEn && svc.benefitsEn ? svc.benefitsEn[bIdx] : benefit;
                      return (
                        <li key={bIdx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                          <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span>{benefitText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Practical Deliverables & Features or Image Render */}
                <div className="md:col-span-6 space-y-4 flex flex-col justify-start">
                  {MOASD_SERVICES[activeIndex].imageUrl ? (
                    <div className="space-y-3">
                      <h4 className="text-xs md:text-sm font-semibold text-white tracking-widest uppercase flex items-center gap-2 font-mono">
                        <span className="w-1.5 h-3 bg-amber-500 rounded-full" />
                        {t('carousel.productView', 'PRODUCT HIGH-FIDELITY VIEW', 'PRODUCT HIGH-FIDELITY VIEW')}
                      </h4>
                      <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-slate-950/60 flex items-center justify-center">
                        <img 
                          src={MOASD_SERVICES[activeIndex].imageUrl} 
                          alt={MOASD_SERVICES[activeIndex].title}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            filter: 'contrast(1.08) brightness(1.04) saturate(1.03)',
                          }}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-amber-500/30 text-[9px] font-mono text-amber-400">
                          HGE3D00 MODEL RENDER
                        </div>
                      </div>
                      <div className="space-y-2">
                        {MOASD_SERVICES[activeIndex].features.slice(0, 2).map((feature, fIdx) => {
                          const svc = MOASD_SERVICES[activeIndex];
                          const featureText = isEn && svc.featuresEn ? svc.featuresEn[fIdx] : feature;
                          return (
                            <div key={fIdx} className="text-[11px] leading-relaxed text-slate-400 font-mono">
                              ⚡ {featureText}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-xs md:text-sm font-semibold text-white tracking-widest uppercase flex items-center gap-2 font-mono">
                        <span className="w-1.5 h-3 bg-purple-500 rounded-full" />
                        CORE PRACTICE INITIATIVES
                      </h4>
                      <ul className="space-y-2.5">
                        {MOASD_SERVICES[activeIndex].features.map((feature, fIdx) => {
                          const svc = MOASD_SERVICES[activeIndex];
                          const featureText = isEn && svc.featuresEn ? svc.featuresEn[fIdx] : feature;
                          return (
                            <li key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                              <div className="w-5 h-5 mt-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400 font-mono">
                                0{fIdx + 1}
                              </div>
                              <span>{featureText}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Action Suggestion Line */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-400 text-center sm:text-left">
                  {t(
                    'carousel.suggest',
                    'You can generate stronger performance improvements through our customized case matching system.',
                    '당사에 특화된 사례 매칭 시스템과 실전형 진단을 통해 더욱 강력한 성능 개선 성과를 창출할 수 있습니다.'
                  )}
                </p>
                <a
                  href="#simulator-section"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors duration-200 rounded-lg shadow-md shadow-cyan-400/20 active:scale-95"
                >
                  {t('carousel.suggestBtn', 'Match by Simulator', '시뮬레이터로 매칭')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
