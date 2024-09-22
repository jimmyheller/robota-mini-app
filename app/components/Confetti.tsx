// components/Confetti.tsx
import React from 'react';

const Confetti: React.FC = () => (
  <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 100 100" preserveAspectRatio="none">
    {[...Array(50)].map((_, i) => (
      <g key={i}>
        <rect
          x={Math.random() * 100}
          y={Math.random() * 50}
          width={Math.random() * 2 + 0.5}
          height={Math.random() * 3 + 1}
          fill={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]}
        />
        <path
          d={`M${Math.random() * 100},${Math.random() * 50} q${Math.random() * 20 - 10},${Math.random() * 20 + 10} ${Math.random() * 20 - 10},${Math.random() * 20 + 20}`}
          stroke={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]}
          fill="none"
          strokeWidth="0.5"
        />
      </g>
    ))}
  </svg>
);

export default Confetti;