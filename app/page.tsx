import React from 'react';
import { Home, BarChart2, Users, Check } from 'lucide-react';

const ProgressBar = ({ label, progress, isComplete }: { label: string; progress: number; isComplete: boolean }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-300">{label}</span>
      {isComplete && <Check className="w-4 h-4 text-green-500" />}
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-green-500 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

const TokenLogo = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" className="mb-4">
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-6">
      <main className="flex-grow flex flex-col items-center justify-center">
        <TokenLogo />
        <h1 className="text-2xl font-bold mb-8">Checking you account</h1>
        <div className="w-full max-w-md">
          <ProgressBar label="Account Age Verified" progress={100} isComplete={true} />
          <ProgressBar label="Activity Level Analyzed" progress={75} isComplete={false} />
          <ProgressBar label="Telegram Premium Checked" progress={50} isComplete={false} />
          <ProgressBar label="OGStatus Confirmed" progress={25} isComplete={false} />
        </div>
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