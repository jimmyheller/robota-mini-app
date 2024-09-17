import React from 'react';
import { Home, BarChart2, Users, Award } from 'lucide-react';

const TokenLogo = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" className="mb-4">
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

const UserProfileCard = ({ username, balance, rank }: { username: string; balance: string; rank: string }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-6">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3">
        OR
      </div>
      <div>
        <div className="text-white font-semibold">{username}</div>
        <div className="text-gray-400">{balance} $TODO</div>
      </div>
    </div>
    <span className="text-gray-400">#{rank}</span>
  </div>
);

const LeaderboardItem = ({ username, balance, rank, medal }: { username: string; balance: string; rank: number; medal: string | null }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3">
        OR
      </div>
      <div>
        <div className="text-white font-semibold">{username}</div>
        <div className="text-gray-400">{balance} TODO</div>
      </div>
    </div>
    {medal ? (
      <Award className={`w-6 h-6 ${medal === 'gold' ? 'text-yellow-500' : medal === 'silver' ? 'text-gray-400' : 'text-yellow-700'}`} />
    ) : (
      <span className="text-gray-400">#{rank}</span>
    )}
  </div>
);

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-4">
      <TokenLogo />
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <UserProfileCard username="Masih32" balance="320" rank="1236542" />
      <main className="flex-grow">
        <h2 className="text-xl font-semibold mb-4">45.7M holders</h2>
        <LeaderboardItem username="Masih32" balance="320" medal="gold" rank={1236542} />
        <LeaderboardItem username="Masih32" balance="320" medal="silver" rank={1236542} />
        <LeaderboardItem username="Masih32" balance="320" medal="bronze" rank={1236542} />
        <LeaderboardItem username="Masih32" balance="320" rank={1236542} medal={null}/>
        
      </main>
      <nav className="flex justify-around py-4">
        <button className="flex flex-col items-center text-gray-500">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">HOME</span>
        </button>
        <button className="flex flex-col items-center text-green-500">
          <BarChart2 className="w-6 h-6" />
          <span className="text-xs mt-1">LeaderBoard</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">Friends</span>
        </button>
      </nav>
    </div>
  );
}