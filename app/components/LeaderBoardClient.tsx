'use client';

import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard';
import LeaderboardItem from './LeaderboardItem';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';

interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    tokens: number;
    streaks: number;
}

interface LeaderboardData {
    leaderboard: LeaderboardEntry[];
    total: number;
    limit: number;
    offset: number;
}
interface HomeData {
    user: {
        username: string;
        firstName: string;
        balance: number;
        initials: string;
        rank: number;
    }
}

function isLeaderboardData(data: unknown): data is LeaderboardData {
    return (
        typeof data === 'object' &&
        data !== null &&
        'leaderboard' in data &&
        'total' in data &&
        Array.isArray((data as LeaderboardData).leaderboard)
    );
}

export default function LeaderboardClient() {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
    const [userData, setUserData] = useState<{ username: string; balance: string; rank: string } | null>(null);
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

                // Fetch leaderboard data
                const data = await apiClient.get<LeaderboardData>('/leaderboard');
                if (!isLeaderboardData(data)) {
                    throw new Error("Invalid leaderboard data received");
                }
                setLeaderboardData(data);

                // Fetch user data for the UserProfileCard
                const userHomeData = await apiClient.get<HomeData>(`/users/home/${telegramId}`);
                setUserData({
                    username: userHomeData.user.username,
                    balance: userHomeData.user.balance.toString(),
                    rank: userHomeData.user.rank?.toString() || "N/A"
                });

            } catch (error) {
                console.error('Error fetching data:', error);
                setError("An error occurred while loading the leaderboard.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-white p-4">Loading...</div>;
    }

    if (error || !leaderboardData || !userData) {
        return <div className="text-red-500 p-4">{error || "Failed to load leaderboard data"}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

            <UserProfileCard
                username={userData.username}
                balance={userData.balance}
                rank={userData.rank}
            />

            <h2 className="text-xl font-semibold mb-4">{leaderboardData.total} holders</h2>

            {leaderboardData.leaderboard.map((item, index) => (
                <LeaderboardItem
                    key={item.id}
                    username={item.name}
                    balance={item.tokens.toString()}
                    rank={item.rank}
                    medal={index < 3 ? ['gold', 'silver', 'bronze'][index] as 'gold' | 'silver' | 'bronze' : null}
                />
            ))}
        </div>
    );
}