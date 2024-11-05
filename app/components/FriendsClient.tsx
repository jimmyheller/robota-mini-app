'use client';

import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard';
import FriendItem from './FriendItem';
import InviteButton from './InviteButton';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';

interface FriendData {
    username: string;
    balance: number;
    initials: string;
}

interface FriendsResponse {
    user: {
        username: string;
        balance: number;
        rank: string;
        referralCode: string;
        initials: string;
    };
    friends: FriendData[];
}

export default function FriendsClient() {
    const [friendsData, setFriendsData] = useState<FriendsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const telegramId = await TelegramApiClient.getUserId();
                if (!telegramId) {
                    setError("Telegram ID not found");
                    return;
                }

                const data = await apiClient.get<FriendsResponse>(`/users/friends/${telegramId}`);
                setFriendsData(data);
            } catch (error) {
                console.error('Error fetching friends data:', error);
                setError("An error occurred while loading friends data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-white p-4">Loading...</div>;
    }

    if (error || !friendsData) {
        return <div className="text-red-500 p-4">{error || "Failed to load friends data"}</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Invite friends</h1>
            <h2 className="text-xl mb-6">and get more $TODO</h2>
            <UserProfileCard
                username={friendsData.user.username}
                balance={friendsData.user.balance.toString()}
                rank={friendsData.user.rank}
            />
            <h3 className="text-xl font-semibold mb-4">
                {friendsData.friends.length} Friends
            </h3>
            {friendsData.friends.map((friend, index) => (
                <FriendItem
                    key={index}
                    username={friend.username}
                    balance={friend.balance.toString()}
                    initials={friend.initials}
                />
            ))}
            <InviteButton referralCode={friendsData.user.referralCode} />
        </>
    );
}