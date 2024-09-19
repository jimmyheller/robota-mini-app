// app/components/LeaderboardItem.tsx
import React from 'react';
import { Award } from 'lucide-react';

interface LeaderboardItemProps {
  username: string;
  balance: string;
  rank: number;
  medal: 'gold' | 'silver' | 'bronze' | null;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ username, balance, rank, medal }) => (
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
      <Award className={`w-6 h-6 ${
        medal === 'gold' ? 'text-yellow-500' : 
        medal === 'silver' ? 'text-gray-400' : 
        'text-yellow-700'
      }`} />
    ) : (
      <span className="text-gray-400">#{rank}</span>
    )}
  </div>
);

export default LeaderboardItem;