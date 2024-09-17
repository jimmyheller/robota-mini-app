import React from 'react';
import { Home, BarChart2, Users } from 'lucide-react';

const Confetti = () => (
  <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 100 100" preserveAspectRatio="none">
    {[...Array(50)].map((_, i) => (
      <g key={i}>
        <rect
          x={Math.random() * 100}
          y={Math.random() * 50}
          width={Math.random() * 2 + 0.5}
          height={Math.random() * 3 + 1}
          fill={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]}
          transform={`rotate(${Math.random() * 360} ${Math.random() * 100} ${Math.random() * 100})`}
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

export default function StreakCelebrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Confetti />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-9xl font-bold mb-2 text-green-400">17</h1>
        <p className="text-2xl mb-4">Days Streak</p>
        <p className="text-xl mb-8">
          <span className="text-gray-400">1,400</span>{' '}
          <span className="font-bold">$TODO</span>
        </p>
        {/* Add any additional content or buttons here */}
      </main>
      <nav className="flex justify-around py-4">
        <button className="flex flex-col items-center">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">HOME</span>
        </button>
        <button className="flex flex-col items-center">
          <BarChart2 className="w-6 h-6" />
          <span className="text-xs mt-1">LeaderBoard</span>
        </button>
        <button className="flex flex-col items-center">
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">Friends</span>
        </button>
      </nav>
    </div>
  );
}