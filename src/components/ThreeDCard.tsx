import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

export const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // Gracefully fallback to Activity if icon isn’t found
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Activity className={className} />;
  return <IconComponent className={className} />;
};

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum hover rotation angle, defaults to 12
  scaleOnHover?: number; // Scale on hover, defaults to 1.03
  glowColor?: string; // Tailwind format, e.g. blue-500/20
  id?: string;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  maxRotation = 12,
  scaleOnHover = 1.03,
  glowColor = 'cyan-500/10',
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    
    // Calculate fractional mouse position from central pivot (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Set 3D rotation angles
    setRotateX(-relativeY * maxRotation * 2); // Tilt up/down
    setRotateY(relativeX * maxRotation * 2);  // Tilt left/right
    
    // Calculate light reflection percentiles
    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;
    setShinePos({ x: shineX, y: shineY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      className={`perspective-1000 cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-xl transition-all duration-100 ease-out"
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? scaleOnHover : 1,
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px 10px var(--glow-color, rgba(6, 182, 212, 0.1))`
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        style={
          {
            transformStyle: 'preserve-3d',
            '--glow-color': isHovered ? `rgba(6, 182, 212, 0.12)` : 'transparent',
          } as any
        }
      >
        {/* Dynamic Inner Highlight Border */}
        <div 
          className="absolute inset-x-0 -top-px h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-purple-500/20 opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(10px)'
          }}
        />

        {/* 3D Glossy Shine Sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 select-none z-10"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle 140px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.8), transparent 80%)`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Outer ambient glow element */}
        <div
          className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 transition-opacity duration-300 bg-cyan-500/5 blur-xl group-hover:opacity-100"
          style={{
            transform: 'translateZ(-5px)'
          }}
        />

        {/* Re-nested Content with preserve-3d to enable parallax inside */}
        <div 
          className="w-full h-full p-6 select-none"
          style={{ transform: 'translateZ(20px)' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
