// app/components/HomeClient.tsx
'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';
import {PlusCircleIcon} from './Icons';

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
        <div className="flex flex-col flex-1">
            {isLoading ? (
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-48 bg-gray-700 rounded-lg" />
                </div>
            ) : error ? (
                <div className="text-red-500 p-4">{error}</div>
            ) : homeData ? (
                <>
                    <div className="px-6">
                        <div className="flex justify-center mt-4">
              <span className="text-[48px] leading-[77px] font-bold text-todo-green">
                {homeData.user.balance.toLocaleString()}
              </span>
                        </div>
                    </div>

                    {/* Changed this div to have specific margin instead of flex-1 */}
                    <div className="mt-auto mb-8" />

                    <div className="px-6 mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <h1 className="text-[32px] font-bold text-white">TODOs</h1>
                            <button
                                className="flex items-center gap-2 text-white"
                                onClick={() => {/* TODO: Add handler */}}
                            >
                                <PlusCircleIcon className="w-6 h-6" />
                                <span className="text-[17px]">Add yours</span>
                            </button>
                        </div>
                        <p className="text-[17px] text-white">
                            All tasks are done for today. Come back tomorrow!
                        </p>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default HomeClient;