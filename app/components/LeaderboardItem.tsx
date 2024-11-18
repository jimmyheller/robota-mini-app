// app/components/LeaderboardItem.tsx
import React, { useState } from 'react';
import { Award } from 'lucide-react';

interface LeaderboardItemProps {
  username: string;
  balance: string;
  rank: number;
  medal: 'gold' | 'silver' | 'bronze' | null;
  initials: string;
  profilePhoto?: {
    smallFileUrl?: string;
    largeFileUrl?: string;
  };
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  username,
  balance,
  rank,
  medal,
  initials,
  profilePhoto
}) => {
  const [imageError, setImageError] = useState(false);

  // Check if we have a valid profile photo URL
  const hasValidPhoto = profilePhoto?.smallFileUrl && !imageError;

  return (
    <div className="flex items-center justify-between mb-4">
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
};

// Add loading skeleton
export const LeaderboardItemSkeleton: React.FC = () => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full mr-3 bg-gray-700 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
    <div className="h-6 w-6 bg-gray-700 rounded animate-pulse" />
  </div>
);

export default LeaderboardItem;