import React from 'react';

interface QaltIconProps {
  size?: number;
  color?: string;
  eyeColor?: string;
  className?: string;
}

/**
 * QaltIcon Component
 * * Features:
 * - Symmetrical circular frame.
 * - Sharp, crisp vertical bar eyes (||) in vibrant cyan.
 * - Integrated SVG SMIL blinking animation (no external JS required).
 * * Usage:
 * <QaltIcon size={48} color="#1E40AF" eyeColor="#60A5FA" />
 */
const QaltIcon = ({ 
  size = 100, 
  color = "currentColor", 
  eyeColor = "#60A5FA",
  className = "text-[#255d84]" 
}: QaltIconProps) => {
  // Animation keyframes for the blink effect (4s interval)
  const blinkAnimation = (
    <>
      <animate 
        attributeName="height"
        values="24;24;2;24;24"
        keyTimes="0;0.95;0.97;0.99;1"
        dur="4s"
        repeatCount="indefinite"
      />
      <animate 
        attributeName="y"
        values="38;38;49;38;38"
        keyTimes="0;0.95;0.97;0.99;1"
        dur="4s"
        repeatCount="indefinite"
      />
    </>
  );

  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className}
      style={{ overflow: 'visible' }}
      aria-label="Qalt Animated Icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Symmetrical Bold Circle Frame */}
      <circle 
        cx="50" 
        cy="50" 
        r="38" 
        fill="none" 
        stroke={color} 
        strokeWidth="14" 
      />
      
      {/* Left Eye Bar */}
      <rect x="38" y="38" width="6" height="24" rx="1" fill={eyeColor}>
        {blinkAnimation}
      </rect>

      {/* Right Eye Bar */}
      <rect x="56" y="38" width="6" height="24" rx="1" fill={eyeColor}>
        {blinkAnimation}
      </rect>
    </svg>
  );
};

export default QaltIcon;
