// app/components/HomeClient.tsx
'use client';


import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Navigation from './Navigation';
import UserProfile, {UserProfileSkeleton} from './UserProfile';
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
        profilePhoto?: {
            smallFileUrl: string;
            largeFileUrl: string;
        };
    };
    rewards: {
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

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <main className="flex-grow p-4">
                {isLoading ? (
                    <UserProfileSkeleton />
                ) : error ? (
                    <div className="text-red-500 p-4">{error}</div>
                ) : homeData ? (
                    <>
                        <UserProfile
                            username={homeData.user.username}
                            balance={homeData.user.balance.toLocaleString()}
                            initials={homeData.user.initials}
                            profilePhoto={homeData.user.profilePhoto}
                        />
                        <CommunityJoin />
                        <Rewards
                            rewards={{
                                invitedFriends: homeData.rewards.invitedFriends.amount.toLocaleString(),
                                dailyCheckin: homeData.rewards.dailyCheckin.amount.toLocaleString()
                            }}
                        />
                    </>
                ) : null}
            </main>
        </div>
    );
};

export default HomeClient;