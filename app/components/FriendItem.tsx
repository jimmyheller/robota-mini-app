import React, { useState } from 'react';

interface FriendItemProps {
    username: string;
    balance: string | number;
    initials: string;
    profilePhoto?: {
        smallFileUrl?: string;
        largeFileUrl?: string;
    };
}

const FriendItem: React.FC<FriendItemProps> = ({
    username,
    balance,
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
                </div>
            </div>
            <div className="text-gray-400">{balance} $TODO</div>
        </div>
    );
};

// Add loading skeleton for consistency
export const FriendItemSkeleton: React.FC = () => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-700 animate-pulse" />
            <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
            </div>
        </div>
    </div>
);

export default FriendItem;