import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import bgImage from "../../assets/space.png";
import starsImage from "../../assets/stars.png";

interface SpaceLoaderProps {
  onComplete?: () => void;
  duration?: number; // ms, used if manual progress isn't provided
  progress?: number; // 0-100, if provided it overrides the internal timer
}

export function SpaceLoader({ onComplete, duration = 4500, progress: externalProgress }: SpaceLoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const progress = externalProgress !== undefined ? externalProgress : internalProgress;

  useEffect(() => {
    if (externalProgress !== undefined) {
      if (externalProgress >= 100) {
        const timer = setTimeout(() => {
          setIsDone(true);
          setTimeout(() => onComplete?.(), 1000);
        }, 500);
        return () => clearTimeout(timer);
      }
      return;
    }

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const raw = elapsed / duration;
      // Smooth easing for loading progress
      const eased = raw < 0.7 
        ? raw * 1.2 
        : 0.84 + (raw - 0.7) * 0.53;
        
      const clamped = Math.min(eased, 1);
      setInternalProgress(clamped * 100);

      if (clamped < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => onComplete?.(), 1000);
        }, 500);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete, externalProgress]);

  const SIZE = 400;
  const CENTER = SIZE / 2;
  const ORBIT_R = 150;
  const PLANET_R = 65;
  const circumference = 2 * Math.PI * ORBIT_R;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Orbit angle (starts at -90deg/top)
  const angleDeg = (progress / 100) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const shipX = CENTER + ORBIT_R * Math.cos(angleRad);
  const shipY = CENTER + ORBIT_R * Math.sin(angleRad);
  
  // shipRotation calculation:
  // Spaceship is drawn facing UP (0 deg).
  // At progress 0 (top of circle, -90deg), it should face RIGHT (90deg).
  // So we need to add 180 to the angleDeg. 
  // Let's test: -90 + 180 = 90 (Facing right). Correct.
  const shipRotation = angleDeg + 180;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#020817",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* ── Background Image Layer ── */}
          <div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2, // Darkened for loading
            }} 
          />
          
          {/* ── Nebula Overlay (Subtle Gradient) ── */}
          <div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(2, 8, 23, 0.8) 100%)",
            }} 
          />

          {/* ── Stars Image Overlay ── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 5, ease: "easeOut" }}
            style={{ 
              position: "absolute", 
              inset: 0, 
              backgroundImage: `url(${starsImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
              mixBlendMode: "screen",
            }} 
          />

          {/* ── Main scene ── */}
          <div style={{ position: "relative", width: SIZE, height: SIZE, zIndex: 2 }}>
            <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0 }}>
              <defs>
                {/* Planet gradient with depth */}
                <radialGradient id="planetGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="35%" stopColor="#f97316" />
                  <stop offset="70%" stopColor="#9a3412" />
                  <stop offset="100%" stopColor="#431407" />
                </radialGradient>

                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <clipPath id="planetClip">
                  <circle cx={CENTER} cy={CENTER} r={PLANET_R} />
                </clipPath>
              </defs>

              {/* Orbit track */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={ORBIT_R}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.2"
                strokeDasharray="4 10"
              />

              {/* Progress arc (Glow) */}
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r={ORBIT_R}
                fill="none"
                stroke="#f97316"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                filter="url(#glowFilter)"
              />

              {/* Planet Atmosphere Glow */}
              <circle cx={CENTER} cy={CENTER} r={PLANET_R + 18} fill="rgba(234, 88, 12, 0.05)" />

              {/* Planet Body */}
              <circle cx={CENTER} cy={CENTER} r={PLANET_R} fill="url(#planetGrad)" />

              {/* Planet Surface Details */}
              <g clipPath="url(#planetClip)">
                <PlanetSurface cx={CENTER} cy={CENTER} r={PLANET_R} />
              </g>

              {/* Planet Rings */}
              <PlanetRings cx={CENTER} cy={CENTER} r={PLANET_R} />

              {/* Spaceship */}
              <g transform={`translate(${shipX}, ${shipY}) rotate(${shipRotation})`}>
                <Spaceship />
              </g>
            </svg>
          </div>

          {/* ── Loading text ── */}
          <div style={{ marginTop: 48, textAlign: "center", zIndex: 2 }}>
            <motion.h2
              animate={{ opacity: [0.3, 1, 0.3], letterSpacing: ["0.4em", "0.5em", "0.4em"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                color: "#fb923c",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                fontFamily: "ui-monospace, monospace",
                textShadow: "0 0 15px rgba(251, 146, 60, 0.4)",
              }}
            >
              Establishing Connection
            </motion.h2>
            <p
              style={{
                marginTop: 12,
                color: "rgba(255,255,255,0.45)",
                fontSize: 11,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.2em",
              }}
            >
              UPLINK: {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlanetSurface({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <motion.g
      animate={{ x: [-15, 15, -15] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {/* Horizontal banding */}
      <rect x={cx - r - 30} y={cy - 30} width={r * 2 + 60} height={14} fill="rgba(67, 20, 7, 0.25)" />
      <rect x={cx - r - 30} y={cy + 5} width={r * 2 + 60} height={10} fill="rgba(67, 20, 7, 0.2)" />
      <rect x={cx - r - 30} y={cy + 25} width={r * 2 + 60} height={12} fill="rgba(67, 20, 7, 0.25)" />
      
      {/* Craters with shadows */}
      <g opacity="0.4">
        <circle cx={cx - 25} cy={cy - 12} r={7} fill="#431407" />
        <circle cx={cx - 27} cy={cy - 14} r={4} fill="#9a3412" opacity="0.3" />
        
        <circle cx={cx + 35} cy={cy + 18} r={9} fill="#431407" />
        <circle cx={cx + 33} cy={cy + 16} r={5} fill="#9a3412" opacity="0.3" />
        
        <circle cx={cx - 15} cy={cy + 30} r={5} fill="#431407" />
        <circle cx={cx + 20} cy={cy - 38} r={11} fill="#431407" />
      </g>

      {/* Surface highlights */}
      <ellipse cx={cx - 10} cy={cy - 20} rx={15} ry={4} fill="white" opacity="0.05" />
    </motion.g>
  );
}

function PlanetRings({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g transform={`rotate(-18 ${cx} ${cy})`} opacity="0.6">
      {/* Subtle outer glow for rings */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r + 38}
        ry={14}
        fill="none"
        stroke="rgba(251, 146, 60, 0.08)"
        strokeWidth="10"
      />
      
      {/* Main ring structure */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r + 38}
        ry={14}
        fill="none"
        stroke="rgba(251, 146, 60, 0.15)"
        strokeWidth="4"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={r + 38}
        ry={14}
        fill="none"
        stroke="rgba(251, 146, 60, 0.3)"
        strokeWidth="2"
        strokeDasharray={`${(Math.PI * (r + 38)) / 1.5} ${(Math.PI * (r + 38)) / 3}`}
        strokeDashoffset={0}
      />
      
      {/* Inner faint ring */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r + 28}
        ry={10}
        fill="none"
        stroke="rgba(251, 146, 60, 0.12)"
        strokeWidth="1.5"
      />
    </g>
  );
}

function Spaceship() {
  return (
    <g transform="translate(-12, -15)">
      {/* Thruster Flame with dynamic animation */}
      <motion.path
        d="M12 28 L8 36 L12 33 L16 36 Z"
        fill="#fb923c"
        animate={{ 
          scaleY: [1, 1.4, 0.9, 1.3, 1],
          opacity: [0.7, 1, 0.6, 0.9, 0.7],
          fill: ["#fb923c", "#f97316", "#fb923c"]
        }}
        transition={{ duration: 0.15, repeat: Infinity }}
        style={{ transformOrigin: "top" }}
      />
      <motion.circle 
        cx="12" cy="30" r="2" fill="#fff" 
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.5, 1] }} 
        transition={{ duration: 0.1, repeat: Infinity }} 
      />
      
      {/* Fins */}
      <path d="M6 22 L1 29 L8 27 Z" fill="#334155" />
      <path d="M18 22 L23 29 L16 27 Z" fill="#334155" />
      
      {/* Main Body */}
      <path
        d="M12 2 Q19 10 19 25 L5 25 Q5 10 12 2 Z"
        fill="#f1f5f9"
      />
      
      {/* Panel Detail */}
      <path d="M7 20 H17" stroke="#cbd5e1" strokeWidth="0.5" />
      <path d="M12 5 V15" stroke="#cbd5e1" strokeWidth="0.5" />
      
      {/* Cockpit Glass */}
      <ellipse cx="12" cy="13" rx="3.5" ry="5" fill="#0284c7" />
      <circle cx="11" cy="11" r="1.2" fill="white" opacity="0.6" />
      
      {/* Base/Engine Housing */}
      <path d="M8 25 H16 V28 H8 Z" fill="#475569" />
    </g>
  );
}
