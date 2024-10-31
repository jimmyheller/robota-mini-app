// app/components/HomeClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TokenLogo from './TokenLogo';
import Navigation from './Navigation';
import UserProfile from './UserProfile';
import CommunityJoin from './CommunityJoin';
import Rewards from './Rewards';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';

interface HomeData {
    user: {
        username: string;
        firstName: string;
        balance: number;
        initials: string;
        rank: number;
    };
    rewards: {
        accountAge: {
            amount: number;
            lastCalculated: Date;
        };
        premium: {
            amount: number;
            lastCalculated: Date;
        };
        dailyCheckin: {
            amount: number;
            lastCalculated: Date;
        };
        invitedFriends: {
            amount: number;
            count: number;
        };
    };
    stats: {
        currentStreak: number;
        isPremium: boolean;
    };
}

const HomeClient: React.FC = () => {
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const telegramId = await TelegramApiClient.getUserId();
                if (!telegramId) {
                    router.push('/telegram-check');
                    return;
                }

                const data = await apiClient.get<HomeData>(`/users/home/${telegramId}`);
                setHomeData(data);
            } catch (error) {
                console.error('Error fetching home data:', error);
                setError('Failed to load home data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, [router]);

    if (isLoading) {
        return <div className="text-white p-4">Loading...</div>;
    }

    if (error || !homeData) {
        return <div className="text-red-500 p-4">{error || 'Failed to load data'}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <main className="flex-grow p-4">
                <TokenLogo className="mb-4" />
                <UserProfile
                    username={homeData.user.username}
                    balance={homeData.user.balance.toLocaleString()}
                    initials={homeData.user.initials}
                />
                <CommunityJoin />
                <Rewards
                    rewards={{
                        accountAge: homeData.rewards.accountAge.amount.toLocaleString(),
                        premium: homeData.rewards.premium.amount.toLocaleString(),
                        invitedFriends: homeData.rewards.invitedFriends.amount.toLocaleString(),
                        dailyCheckin: homeData.rewards.dailyCheckin.amount.toLocaleString()
                    }}
                />
            </main>
        </div>
    );
};

export default HomeClient;