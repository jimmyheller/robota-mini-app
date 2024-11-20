// app/components/UserProfileCard.tsx
import React, { useState, useRef } from 'react';

interface UserProfileCardProps {
  username: string;
  balance: string;
  rank: string;
  initials: string;
  profilePhoto?: {
    smallFileUrl?: string;
    largeFileUrl?: string;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  balance,
  rank,
  initials,
  profilePhoto
}) => {
  const [imageError, setImageError] = useState(false);

  // Check if we have a valid profile photo URL
  const hasValidPhoto = profilePhoto?.smallFileUrl && !imageError;

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-6">
      <div className="flex items-center">
        {hasValidPhoto ? (
          <div className="relative w-10 h-10 mr-3">
            <img
              src={profilePhoto.smallFileUrl}
              alt={username}
              className="rounded-full object-cover w-full h-full"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3">
            {initials}
          </div>
        )}
        <div>
          <div className="text-white font-semibold">{username}</div>
          <div className="text-gray-400">{balance.toLocaleString()} $TODO</div>
        </div>
      </div>
      <span className="text-gray-400">#{rank}</span>
    </div>
  );
};

export const UserProfileCardSkeleton: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-6">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full mr-3 bg-gray-700 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
    <div className="h-4 w-8 bg-gray-700 rounded animate-pulse" />
  </div>
);

export default UserProfileCard;