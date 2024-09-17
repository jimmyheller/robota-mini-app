import React from 'react';
import { Home, BarChart2, Users, UserPlus } from 'lucide-react';

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

const FriendItem = ({ username, balance }: { username: string; balance: string }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3">
        OR
      </div>
      <div className="text-white font-semibold">{username}</div>
    </div>
    <span className="text-gray-400">{balance} $TODO</span>
  </div>
);

export default function FriendsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-4">
      <TokenLogo />
      <h1 className="text-2xl font-bold mb-2">Invite friends</h1>
      <h2 className="text-xl mb-6">and get more $TODO</h2>
      <UserProfileCard username="Masih32" balance="320" rank="1236542" />
      <main className="flex-grow">
        <h3 className="text-xl font-semibold mb-4">4 Friends</h3>
        <FriendItem username="Masih32" balance="300" />
        <FriendItem username="Masih32" balance="300" />
        <FriendItem username="Masih32" balance="300" />
        <FriendItem username="Masih32" balance="300" />
      </main>
      <button className="w-full bg-white text-black py-3 rounded-lg font-semibold mb-6 flex items-center justify-center">
        <UserPlus className="w-5 h-5 mr-2" />
        Invite Friends
      </button>
      <nav className="flex justify-around py-4">
        <button className="flex flex-col items-center text-gray-500">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">HOME</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <BarChart2 className="w-6 h-6" />
          <span className="text-xs mt-1">LeaderBoard</span>
        </button>
        <button className="flex flex-col items-center text-green-500">
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">Friends</span>
        </button>
      </nav>
    </div>
  );
}