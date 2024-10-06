// app/components/UserProfileCard.tsx
import React from 'react';

interface UserProfileCardProps {
  username: string;
  balance: string;
  rank: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ username, balance, rank }) => (
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

export default UserProfileCard;