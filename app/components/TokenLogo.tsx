// app/components/TokenLogo.tsx
import React from 'react';

interface TokenLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const TokenLogo: React.FC<TokenLogoProps> = ({ width = 80, height = 80, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="2" />
    {[...Array(20)].map((_, index) => {
      const angle = (index * 18 - 90) * (Math.PI / 180);
      const x = 50 + 45 * Math.cos(angle);
      const y = 50 + 45 * Math.sin(angle);
      return (
        <circle
          key={index}
          cx={x}
          cy={y}
          r="3"
          fill={index < 5 ? "#4ade80" : "#333"}
        />
      );
    })}
    <path
      d="M30 50 L45 65 L70 40"
      fill="none"
      stroke="#4ade80"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TokenLogo;