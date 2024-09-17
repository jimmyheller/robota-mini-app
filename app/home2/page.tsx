import React, { ReactNode } from 'react';
import { Home, BarChart2, Users, Clock, Award, UserPlus, CheckSquare } from 'lucide-react';

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

const UserProfile = ({ username, balance }: { username: string; balance: string }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3">
        OR
      </div>
      <span className="text-white font-semibold">{username}</span>
    </div>
    <span className="text-white">{balance} $TODO</span>
  </div>
);

const CommunityJoin = () => (
  <div className="bg-gray-800 rounded-lg p-4 mb-4">
    <h2 className="text-white font-bold mb-2">ROBOTA COMMUNITY</h2>
    <p className="text-gray-300 mb-4">Join our Telegram for the latest and greatest in $TODO fun!</p>
    <button className="w-full bg-white text-black py-2 rounded-lg font-semibold">
      Join
    </button>
  </div>
);

const RewardItem = ({ icon, label, amount }: { icon: ReactNode; label: string; amount: string }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      {icon}
      <span className="ml-2 text-white">{label}</span>
    </div>
    <span className="text-white">{amount} $TODO</span>
  </div>
);

const Rewards = () => (
  <div>
    <h2 className="text-white font-bold mb-4">Your rewards</h2>
    <RewardItem icon={<Clock className="w-5 h-5 text-gray-400" />} label="Account Age" amount="5,000" />
    <RewardItem icon={<Award className="w-5 h-5 text-gray-400" />} label="Telegram Premium" amount="0" />
    <RewardItem icon={<UserPlus className="w-5 h-5 text-gray-400" />} label="Invited Friends" amount="3,200" />
    <RewardItem icon={<CheckSquare className="w-5 h-5 text-gray-400" />} label="Daily Check-in" amount="400" />
  </div>
);

export default function DetailedHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-4">
      <TokenLogo />
      <main className="flex-grow">
        <UserProfile username="Masih32" balance="320" />
        <CommunityJoin />
        <Rewards />
      </main>
      <nav className="flex justify-around py-4">
        <button className="flex flex-col items-center text-green-500">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">HOME</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
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