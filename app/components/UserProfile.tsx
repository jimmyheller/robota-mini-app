// app/components/UserProfile.tsx
import React, { useState, useRef } from 'react';

interface UserProfileProps {
    username: string;
    balance: string;
    initials: string;
    profilePhoto?: {
        smallFileUrl: string;
        largeFileUrl: string;
    };
}

const UserProfile: React.FC<UserProfileProps> = ({
                                                     username,
                                                     balance,
                                                     initials,
                                                     profilePhoto
                                                 }) => {
    const [imageError, setImageError] = useState(false);
    const initialsContainerRef = useRef<HTMLDivElement>(null);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center">
                {profilePhoto && !imageError ? (
                    <div className="relative w-10 h-10 mr-3">
                        <img
                            src={profilePhoto.smallFileUrl}
                            alt={username}
                            className="rounded-full object-cover w-full h-full"
                            onError={handleImageError}
                        />
                    </div>
                ) : (
                    <div
                        ref={initialsContainerRef}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold mr-3"
                    >
                        {initials}
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="text-white font-semibold">{username}</span>
                </div>
            </div>
            <div className="flex items-center">
                <span className="text-white font-medium">{balance}</span>
                <span className="text-gray-400 ml-1">$TODO</span>
            </div>
        </div>
    );
};

// Simple loading skeleton component
export const UserProfileSkeleton: React.FC = () => (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-4">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-700 animate-pulse" />
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
    </div>
);

export default UserProfile;