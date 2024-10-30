// components/UserProfile.tsx
import React from 'react';

interface UserProfileProps {
  username: string;
  balance: string;
  initials: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, balance, initials }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3">
        {initials}
      </div>
      <span className="text-white font-semibold">{username}</span>
    </div>
    <span className="text-white">{balance} $TODO</span>
  </div>
);

export default UserProfile;