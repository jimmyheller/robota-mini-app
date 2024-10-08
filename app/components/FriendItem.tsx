// app/components/FriendItem.tsx
import React from 'react';

interface FriendItemProps {
  username: string;
  balance: string;
}

const FriendItem: React.FC<FriendItemProps> = ({ username, balance }) => (
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

export default FriendItem;