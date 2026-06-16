import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Play, Pause, RefreshCw, Layers, ShieldCheck, Cpu, Database, Landmark, Download, Zap, Eye, Compass, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FactoryCamera {
  id: number;
  name: string;
  nameEn: string;
  focus: string;
  gridColor: string;
  lineSpeed: number;
}

export const Factory3DWalkthrough: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentCam, setCurrentCam] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [scanMode, setScanMode] = useState<'normal' | 'thermal' | 'hologram'>('normal');
  const [stats, setStats] = useState({
    pressure: 1013,
    capacityUtil: 94.6,
    activeRobots: 12,
    ambientTemp: 23.4,
    gridLoad: 412,
  });

  const isEn = language === 'en';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const angleRef = useRef<number>(0);

  const cameras: FactoryCamera[] = [
    { id: 0, name: "CAM 01: 하이브리드 커패시터 자동 제반라인", nameEn: "CAM 01: Automated Hybrid Capacitor Fab Line", focus: "Capacitor Fab Unit 4", gridColor: "rgba(34, 211, 238, 0.2)", lineSpeed: 1.5 },
    { id: 1, name: "CAM 02: 친환경 EV 자전거/오토바이 용접&조립", nameEn: "CAM 02: Eco-EV Assembly & Robotic Welding Line", focus: "Smart EV Chassis Station", gridColor: "rgba(168, 85, 247, 0.25)", lineSpeed: 2.2 },
    { id: 2, name: "CAM 03: 미국 CAS 등재 SAM 신소재 함침 챔버", nameEn: "CAM 03: America CAS Conductive SAM Infuser Chamber", focus: "Nano-Material Gaseous Infuser", gridColor: "rgba(16, 185, 129, 0.2)", lineSpeed: 1.0 },
    { id: 3, name: "CAM 04: 풍력·태양광 통합그리드 동기 제어판", nameEn: "CAM 04: Renewable Wind & Solar Synchronous Command Grid", focus: "Renewable Sync Hub", gridColor: "rgba(234, 179, 8, 0.2)", lineSpeed: 1.8 },
    { id: 4, name: "CAM 05: HGE3D00 하이브리드 발전기 최종 조립", nameEn: "CAM 05: Flagship HGE3D00 Hybrid Generator Final Packaging", focus: "HGE3D00 Assembly Line", gridColor: "rgba(245, 158, 11, 0.25)", lineSpeed: 2.0 }
  ];

  const totalCams = cameras.length;

  const nextCam = () => {
    setCurrentCam((prev) => (prev + 1) % totalCams);
  };

  const prevCam = () => {
    setCurrentCam((prev) => (prev - 1 + totalCams) % totalCams);
  };

  // Dynamic telemetry simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        pressure: Math.round(1010 + Math.random() * 6),
        capacityUtil: parseFloat((94 + Math.random() * 1.5).toFixed(1)),
        activeRobots: Math.random() > 0.8 ? (Math.random() > 0.5 ? 13 : 11) : prev.activeRobots,
        ambientTemp: parseFloat((23.2 + Math.random() * 0.4).toFixed(2)),
        gridLoad: Math.round(408 + Math.random() * 8),
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Main 3D Interactive Manufacturing Rendering Loop (Full-scale custom canvas 3D simulation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!ctx || !canvas) return;

      // Clear Screen based on chosen Scan Mode
      if (scanMode === 'normal') {
        ctx.fillStyle = '#020617'; // Deep dark slate
        ctx.fillRect(0, 0, width, height);
      } else if (scanMode === 'thermal') {
        ctx.fillStyle = '#0f0502'; // Warm dark red
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = '#050c18'; // Cosmic deep navy
        ctx.fillRect(0, 0, width, height);
      }

      // Progress Simulation angle
      if (isPlaying) {
        angleRef.current += 0.005;
      }

      const camInfo = cameras[currentCam];
      const viewAngle = angleRef.current;

      // Perspective Math parameters
      const centerX = width / 2;
      const centerY = height / 2;
      const t = viewAngle;

      const camX = Math.sin(t * 0.4) * 150;
      const camY = Math.cos(t * 0.3) * 80;
      const lookAtZ = Math.sin(t * 0.5) * 50;

      // Draw 3D Grid floor with perspective warping
      ctx.strokeStyle = camInfo.gridColor;
      ctx.lineWidth = 1;

      const numLines = 24;
      const depthScale = depthScaleCalc();

      function depthScaleCalc() {
        return 350 * zoom;
      }

      // Draw perspective grid floor
      for (let i = -numLines; i <= numLines; i++) {
        ctx.beginPath();
        for (let j = 0; j <= 40; j++) {
          const rawX = i * 25 + camX;
          const rawY = j * 20 - 150 + camY;
          const z = j * 12 + lookAtZ;

          const screenX = centerX + (rawX * depthScale) / (z + 200);
          const screenY = centerY + (rawY * depthScale) / (z + 200) + 100;

          if (j === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }

      // Draw horizontal cross grid floor lines
      for (let j = 0; j <= 40; j += 2) {
        ctx.beginPath();
        for (let i = -numLines; i <= numLines; i++) {
          const rawX = i * 25 + camX;
          const rawY = j * 20 - 150 + camY;
          const z = j * 12 + lookAtZ;

          const screenX = centerX + (rawX * depthScale) / (z + 200);
          const screenY = centerY + (rawY * depthScale) / (z + 200) + 100;

          if (i === -numLines) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }

      // Render factory hardware assemblies based on the current camera
      if (currentCam === 0) {
        // CAM 01: Supercapacitor cylindrical wrapping machines simulation
        drawWrappingMachine(ctx, centerX, centerY, t, depthScale, camX, camY);
      } else if (currentCam === 1) {
        // CAM 02: EV welding station lasers simulation
        drawWeldingLaser(ctx, centerX, centerY, t, depthScale, camX, camY);
      } else if (currentCam === 2) {
        // CAM 03: SAM gas material crystallization vapor simulation
        drawCrystallization(ctx, centerX, centerY, t, depthScale, camX, camY);
      } else if (currentCam === 3) {
        // CAM 04: Renewable Green Grid integration server grids
        drawRenewableNetwork(ctx, centerX, centerY, t, depthScale, camX, camY);
      } else {
        // CAM 05: Flagship HGE3D00 heavy generator final casing
        drawHgeAssembly(ctx, centerX, centerY, t, depthScale, camX, camY);
      }

      // Drone Camera crosshairs HUD overlays
      drawDroneHUD(ctx, width, height, t, camInfo);

      requestRef.current = requestAnimationFrame(render);
    };

    // Helper: Cylindrical wrapping simulation drawing routine
    const drawWrappingMachine = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, t: number, depth: number, camX: number, camY: number) => {
      const xObj = Math.sin(t * 1.5) * 40;
      const numCylinders = 5;

      for (let i = 0; i < numCylinders; i++) {
        const spaceOffset = (i - (numCylinders / 2)) * 60;
        const rawX = spaceOffset + camX;
        const rawY = -40 + camY + Math.sin(t * 3 + i) * 15;
        const z = 160 + lookXOffset();

        function lookXOffset() {
          return Math.sin(t * 0.5) * 50;
        }

        const screenX = centerX + (rawX * depth) / (z + 200);
        const screenY = centerY + (rawY * depth) / (z + 200) + 40;
        const radius = Math.max(8, (28 * depth) / (z + 200));

        // Glass cylinder body
        ctx.fillStyle = scanMode === 'thermal' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 211, 238, 0.1)';
        ctx.strokeStyle = scanMode === 'thermal' ? '#ef4444' : '#22d3ee';
        ctx.lineWidth = 1.5;

        // Draw wrapping barrel
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Copper core coils wire
        ctx.strokeStyle = scanMode === 'thermal' ? '#f97316' : '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(screenX, screenY - radius * 1.2);
        ctx.lineTo(screenX, screenY + radius * 1.2);
        ctx.stroke();

        ctx.fillStyle = scanMode === 'thermal' ? '#ef4444' : '#22d3ee';
        ctx.font = '9px monospace';
        ctx.fillText(`CELL_R${i+1}`, screenX - radius, screenY - radius * 1.4);
      }
    };

    // Helper: Laser Welding station drawing routine
    const drawWeldingLaser = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, t: number, depth: number, camX: number, camY: number) => {
      const rawX = camX;
      const rawY = -30 + camY;
      const z = 180;

      const screenX = centerX + (rawX * depth) / (z + 200);
      const screenY = centerY + (rawY * depth) / (z + 200) + 50;
      const bodyX = Math.max(15, (65 * depth) / (z + 200));
      const bodyY = Math.max(10, (35 * depth) / (z + 200));

      // Draw metallic welding arm body
      ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
      ctx.strokeStyle = scanMode === 'thermal' ? '#f59e0b' : '#a855f7';
      ctx.lineWidth = 2;
      ctx.fillRect(screenX - bodyX / 2, screenY - bodyY * 1.5, bodyX, bodyY);
      ctx.strokeRect(screenX - bodyX / 2, screenY - bodyY * 1.5, bodyX, bodyY);

      // Active laser beam flashing to floor plate
      if (Math.sin(t * 12) > -0.2) {
        ctx.strokeStyle = scanMode === 'thermal' ? '#ff2a00' : '#f43f5e';
        ctx.lineWidth = 3;
        ctx.shadowColor = scanMode === 'thermal' ? '#ff2a00' : '#f43f5e';
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(screenX, screenY - bodyY / 2);
        ctx.lineTo(screenX + Math.sin(t * 6) * 12, screenY + bodyY * 1.8);
        ctx.stroke();

        ctx.shadowBlur = 0; // reset
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(screenX + Math.sin(t * 6) * 12, screenY + bodyY * 1.8, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Helper: CAS SAM compound chemical molecular infuser simulation
    const drawCrystallization = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, t: number, depth: number, camX: number, camY: number) => {
      const rawX = camX;
      const rawY = -15 + camY;
      const z = 150;

      const screenX = centerX + (rawX * depth) / (z + 200);
      const screenY = centerY + (rawY * depth) / (z + 200) + 40;
      const radius = Math.max(25, (85 * depth) / (z + 200));

      // Gaseous chamber enclosing
      ctx.fillStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Free floating energetic molecules bouncing
      const numMolecules = 8;
      ctx.fillStyle = '#34d399';
      for (let i = 0; i < numMolecules; i++) {
        const mAngle = t * 2 + (i * (Math.PI * 2 / numMolecules));
        const mDist = (radius * 0.6) * (0.6 + Math.sin(t * 3 + i) * 0.3);
        const molX = screenX + Math.cos(mAngle) * mDist;
        const molY = screenY + Math.sin(mAngle) * mDist;

        ctx.beginPath();
        ctx.arc(molX, molY, 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(molX, molY);
        ctx.stroke();
      }
    };

    // Helper: Renewable energy integration dashboard
    const drawRenewableNetwork = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, t: number, depth: number, camX: number, camY: number) => {
      const rawX = camX;
      const rawY = -40 + camY;
      const z = 170;

      const screenX = centerX + (rawX * depth) / (z + 200);
      const screenY = centerY + (rawY * depth) / (z + 200) + 30;
      const sizeX = Math.max(30, (90 * depth) / (z + 200));
      const sizeY = Math.max(20, (60 * depth) / (z + 200));

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 2;
      ctx.fillRect(screenX - sizeX / 2, screenY - sizeY / 2, sizeX, sizeY);
      ctx.strokeRect(screenX - sizeX / 2, screenY - sizeY / 2, sizeX, sizeY);

      // Inside sinus energy waveforms representing grids
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let lx = 0; lx < sizeX - 10; lx++) {
        const gx = screenX - sizeX / 2 + 5 + lx;
        const gy = screenY + Math.sin(t * 10 + lx * 0.2) * (sizeY * 0.25);
        if (lx === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.stroke();
    };

    // Helper: Flagship HGE3D00 generator packaging line
    const drawHgeAssembly = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, t: number, depth: number, camX: number, camY: number) => {
      const rawX = camX;
      const rawY = -15 + camY;
      const z = 160;

      const screenX = centerX + (rawX * depth) / (z + 200);
      const screenY = centerY + (rawY * depth) / (z + 200) + 40;
      const boxSize = Math.max(20, (75 * depth) / (z + 200));

      // HGE3D00 outer durable generator casing
      ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
      ctx.strokeStyle = '#f59e00';
      ctx.lineWidth = 2.5;

      ctx.fillRect(screenX - boxSize / 2, screenY - boxSize / 2, boxSize, boxSize);
      ctx.strokeRect(screenX - boxSize / 2, screenY - boxSize / 2, boxSize, boxSize);

      // Embedded active energy cells core rings
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(screenX, screenY, boxSize * 0.28, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawDroneHUD = (ctx: CanvasRenderingContext2D, width: number, height: number, t: number, camInfo: FactoryCamera) => {
      const border = 30;

      // Scanning bounds lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(border, border, width - border * 2, height - border * 2);

      // Corner angles HUD bracket lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.lineWidth = 2.5;

      // Top Left Corner Bracket
      ctx.beginPath();
      ctx.moveTo(border + 25, border);
      ctx.lineTo(border, border);
      ctx.lineTo(border, border + 25);
      ctx.stroke();

      // Top Right Corner Bracket
      ctx.beginPath();
      ctx.moveTo(width - border - 25, border);
      ctx.lineTo(width - border, border);
      ctx.lineTo(width - border, border + 25);
      ctx.stroke();

      // Bottom Left Corner Bracket
      ctx.beginPath();
      ctx.moveTo(border + 25, height - border);
      ctx.lineTo(border, height - border);
      ctx.lineTo(border, height - border - 25);
      ctx.stroke();

      // Bottom Right Corner Bracket
      ctx.beginPath();
      ctx.moveTo(width - border - 25, height - border);
      ctx.lineTo(width - border, height - border);
      ctx.lineTo(width - border, height - border - 25);
      ctx.stroke();

      // Interactive flashing RECORD tag on Top Left Center
      ctx.fillStyle = (Math.floor(t * 2) % 2 === 0) ? '#ef4444' : 'rgba(239, 68, 68, 0.25)';
      ctx.beginPath();
      ctx.arc(border + 20, border + 22, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.fillText("LIVE REC FEED", border + 32, border + 25);

      // Drone Coordinates overlay metrics
      ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
      ctx.font = '9px monospace';
      ctx.fillText(`CAM_LAT: 37°31'22.2"N`, border + 15, height - border - 25);
      ctx.fillText(`CAM_LON: 126°57'11.8"E`, border + 15, height - border - 12);

      // Scanning compass indicator
      ctx.fillText(`HUD_AZIMUTH: ${Math.round((t * 57.29) % 360)}°`, width - border - 150, height - border - 12);
    };

    render();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [currentCam, isPlaying, zoom, scanMode]);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/30 overflow-hidden shadow-2xl relative select-none">
      
      {/* HUD Header */}
      <div className="p-4 md:p-5 border-b border-white/5 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg bg-cyan-950 border border-cyan-400/20 text-cyan-400">
            <Camera className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-mono tracking-tight uppercase">
              {t('walkthrough.title', 'Live Operating Factory 3D Camera Tour', '실시간 가동 공장 3D 카메라 투어')}
            </h4>
            <span className="text-[10px] md:text-[11px] text-slate-400 block font-mono uppercase">
              REAL-TIME PRODUCTION LINE DRONE WALKTHROUGH
            </span>
          </div>
        </div>

        {/* Camera Selector Selectbox tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {cameras.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setCurrentCam(idx)}
              className={`px-3 py-1.5 rounded-lg text-[11.2px] font-mono tracking-tighter transition-all cursor-pointer ${
                currentCam === idx
                  ? 'bg-cyan-500 font-bold text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isEn ? c.nameEn.split(":")[0] : c.name.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Screen Canvas Block */}
      <div className="relative w-full h-[320px] md:h-[420px] bg-slate-950">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Scan mode HUD Overlay */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10 select-none pointer-events-none">
          <div className="p-3.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-mono space-y-2.5 text-slate-300 w-[180px] shadow-2xl">
            <span className="font-bold text-white block border-b border-white/5 pb-1">
              {isEn ? cameras[currentCam].nameEn : cameras[currentCam].name}
            </span>
            <div className="flex justify-between">
              <span>{isEn ? 'Obs Focus:' : '관측 포커스:'}</span>
              <span className="text-cyan-400 font-bold">{cameras[currentCam].focus}</span>
            </div>
            <div className="flex justify-between">
              <span>{isEn ? 'Pneumatic Pressure:' : '기기 압력 지수:'}</span>
              <span>{stats.pressure} hPa</span>
            </div>
            <div className="flex justify-between">
              <span>{isEn ? 'Active Robots:' : '가동 로봇군:'}</span>
              <span className="text-purple-400 font-semibold">{stats.activeRobots} Units</span>
            </div>
            <div className="flex justify-between">
              <span>{isEn ? 'Ambient Temp:' : '초점 실내 온도:'}</span>
              <span>{stats.ambientTemp} °C</span>
            </div>
            <div className="flex justify-between">
              <span>{isEn ? 'Feedrate Speed:' : '라인 점유 속도:'}</span>
              <span className="text-emerald-400">{cameras[currentCam].lineSpeed.toFixed(1)} m/s</span>
            </div>
          </div>
        </div>

        {/* Realism Drone Scanner HUD on Left */}
        <div className="absolute left-4 top-16 flex flex-col gap-2 z-10 pointer-events-none">
          <div className="px-3 py-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 text-[10px] items-center flex gap-2 w-auto shadow-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-slate-300">BMS THERMAL SENSORS: ONLINE</span>
          </div>
          <div className="px-3 py-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 text-[10px] items-center flex gap-2 w-auto shadow-md">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-slate-300">CAS SAM MATERIAL SYNC: STABLE</span>
          </div>
        </div>
      </div>

      {/* Camera Interactive control dock */}
      <div className="p-4 bg-slate-900/40 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
        {/* Playback trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-lg bg-white text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer shadow-md"
            title={isPlaying ? "일시정지" : "촬영 시작"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          
          <button
            onClick={prevCam}
            className="px-3.5 py-2 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-xs cursor-pointer font-bold"
          >
            {t('walkthrough.prevCam', 'Prev Camera', '이전 카메라')}
          </button>

          <button
            onClick={nextCam}
            className="px-3.5 py-2 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-xs cursor-pointer font-bold"
          >
            {t('walkthrough.nextCam', 'Next Camera', '다음 카메라')}
          </button>
        </div>

        {/* Visual scan filter control selectors */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 hidden md:inline">
            {isEn ? 'Scan Mode:' : '스캔 모드:'}
          </span>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-white/5">
            {(['normal', 'thermal', 'hologram'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setScanMode(mode)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-all ${
                  scanMode === mode
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-white/10 text-transparent" />

          {/* Zoom spec control */}
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            {isEn ? 'Lens Zoom:' : '렌즈 줌:'}
          </span>
          <input
            type="range"
            min="0.7"
            max="1.5"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-20 md:w-28 accent-cyan-400 cursor-pointer h-1.5 rounded-lg bg-slate-950"
          />
        </div>
      </div>
    </div>
  );
};
