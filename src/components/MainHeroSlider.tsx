import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Upload, Check } from 'lucide-react';

// IndexedDB logic for saving and loading video files locally inside the browser's persistent sandbox
const DB_NAME = 'moasd-hero-video-db';
const STORE_NAME = 'video-store';

const saveVideoToDB = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const putReq = store.put(file, 'hero-video');
      putReq.onsuccess = () => {
        const url = URL.createObjectURL(file);
        resolve(url);
      };
      putReq.onerror = () => reject(putReq.error);
    };
    request.onerror = () => reject(request.error);
  });
};

const loadVideoFromDB = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getReq = store.get('hero-video');
      getReq.onsuccess = () => {
        const file = getReq.result as File | undefined;
        if (file) {
          resolve(URL.createObjectURL(file));
        } else {
          resolve(null);
        }
      };
      getReq.onerror = () => resolve(null);
    };
    request.onerror = () => resolve(null);
  });
};

import bgSkyscraper from '../assets/images/moasd_skyscraper_hq_bg_1781618333946.jpg';
import bgGenerator from '../assets/images/hge3d00_generator_1781622900745.jpg';
import bgEvMoto from '../assets/images/ev_moto_assembly_1781624859000.jpg';
import bgMaterialLab from '../assets/images/sam_material_lab_1781624876856.jpg';

interface Slide {
  image: string;
}

const DESIGN_SLIDES: Slide[] = [
  { image: bgSkyscraper },
  { image: bgGenerator },
  { image: bgEvMoto },
  { image: bgMaterialLab }
];

export const MainHeroSlider: React.FC = () => {
  const { language, t } = useLanguage();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load user video from IndexedDB cache or static deployment fallback on mount
  useEffect(() => {
    loadVideoFromDB().then((url) => {
      if (url) {
        setVideoUrl(url);
      } else {
        // Use the statically deployed video in the public folder
        setVideoUrl('/video.mp4');
      }
    });
  }, []);

  // Sync video play
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoUrl]);

  // Slideshow interval (for fallback background images if no video is uploaded yet)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % DESIGN_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Video File Handler
  const handleVideoFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      showToast(
        language === 'en'
          ? '❌ Please upload a valid video format file.'
          : '❌ 올바른 규격의 동영상 포맷 비디오 파일을 드롭해 주세요.'
      );
      return;
    }

    try {
      showToast(
        language === 'en'
          ? '💾 Encoding and applying background video...'
          : '💾 브라우저 로컬 DB에 동영상을 인코딩하여 안전하게 저장 중...'
      );
      const localUrl = await saveVideoToDB(file);
      setVideoUrl(localUrl);
      showToast(
        language === 'en'
          ? '🎉 Beautiful! Background video applied perfectly.'
          : '🎉 완벽합니다! (주)MOASD 기업 동영상 배경 설정이 완료되었습니다.'
      );
    } catch (err) {
      console.error(err);
      showToast(
        language === 'en'
          ? '❌ Failed to store video. File might be too large.'
          : '❌ 저장을 실패했습니다. 더 작은 해상도의 비디오를 드롭하는 것을 권장합니다.'
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section 
      id="hero-section" 
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className="relative w-full h-[85vh] min-h-[620px] md:h-[90vh] md:min-h-[780px] bg-slate-950 overflow-hidden flex items-center justify-center select-none cursor-default"
    >
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <AnimatePresence mode="wait">
          {videoUrl ? (
            // Custom uploaded video background
            <motion.div
              key="custom-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            // Smooth Cinematic Multi-slide background (Ken Burns styling)
            <div className="absolute inset-0 w-full h-full">
              {DESIGN_SLIDES.map((slide, index) => (
                index === activeSlide && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={slide.image}
                      alt="MOASD Scene"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                  </motion.div>
                )
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Ambient Dark Premium Gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-slate-950/40 z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Floating high-tech framing accents mapping high corporate quality */}
      <div className="absolute inset-0 z-20 pointer-events-none select-none border border-white/5 m-5 md:m-8 rounded-2xl overflow-hidden">
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-400/20" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-400/20" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-400/20" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-400/20" />
      </div>

      {/* Full screen Drag & Drop Active Overlay */}
      <AnimatePresence>
        {dragActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center gap-4 border-4 border-dashed border-cyan-500/40 m-6 rounded-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400/30 flex items-center justify-center text-cyan-400 animate-bounce">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-white tracking-wider font-mono">
                {t('media.drop_files', 'DROP STREAM MP4 HERE', '여기에 파일을 놓아주세요')}
              </p>
              <p className="text-xs text-slate-400 px-4">
                {t('media.drop_details', 'Drag new background video logic directly on screen', '기업 홍보 영상을 마우스 드래그로 떨어트리면 메인 배경음 및 영상으로 즉시 등록됩니다')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide & Action Toast Notification Overlay */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] px-5 py-3.5 rounded-2xl bg-slate-900 border border-cyan-400/30 backdrop-blur-xl shadow-2xl text-xs text-white flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400 animate-pulse">
              <Check className="w-3 h-3" />
            </div>
            <span className="font-semibold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
