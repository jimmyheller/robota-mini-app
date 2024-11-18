'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import UserProfileCard, { UserProfileCardSkeleton } from './UserProfileCard';
import LeaderboardItem, {LeaderboardItemSkeleton} from './LeaderboardItem';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';

interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    tokens: number;
    streaks: number;
    initials: string;
    profilePhoto?: {
        smallFileUrl?: string;
        largeFileUrl?: string;
    };
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
        profilePhoto?: {
            smallFileUrl?: string;
            largeFileUrl?: string;
        };
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
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [userData, setUserData] = useState<{
        username: string;
        balance: string;
        rank: string;
        initials: string;
        profilePhoto?: {
            smallFileUrl?: string;
            largeFileUrl?: string;
        };
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const LIMIT = 500;
    const SKELETON_COUNT = 3;

    const hasMore = useRef(true);
    const observerTarget = useRef(null);

    const loadMoreItems = useCallback(async () => {
        if (isLoadingMore || !hasMore.current) return;

        try {
            setIsLoadingMore(true);

            const data = await apiClient.get<LeaderboardData>(`/leaderboard?limit=${LIMIT}&offset=${offset}`);

            if (!isLeaderboardData(data)) {
                throw new Error("Invalid leaderboard data received");
            }

            if (data.leaderboard.length === 0) {
                hasMore.current = false;
                return;
            }

            setLeaderboardEntries(prev => [...prev, ...data.leaderboard]);
            setTotalUsers(data.total);
            setOffset(prev => prev + LIMIT);

            // Check if we've loaded all items
            hasMore.current = offset + LIMIT < data.total;

        } catch (error) {
            console.error('Error loading more items:', error);
            setError("Error loading more items");
        } finally {
            setIsLoadingMore(false);
        }
    }, [offset, isLoadingMore]);

    // Improved Intersection Observer setup
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting && hasMore.current) {
                    loadMoreItems();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '200px' // Start loading before reaching the end
            }
        );

        const currentTarget = observerTarget.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loadMoreItems]);

    // Initial data fetch
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const telegramId = await TelegramApiClient.getUserId();
                if (!telegramId) {
                    setError("Telegram ID not found");
                    return;
                }

                // Fetch initial leaderboard data
                const data = await apiClient.get<LeaderboardData>(`/leaderboard?limit=${LIMIT}&offset=0`);
                if (!isLeaderboardData(data)) {
                    throw new Error("Invalid leaderboard data received");
                }
                setLeaderboardEntries(data.leaderboard);
                setTotalUsers(data.total);
                setOffset(LIMIT);
                hasMore.current = LIMIT < data.total;

                // Fetch user data for the UserProfileCard
                const userHomeData = await apiClient.get<HomeData>(`/users/home/${telegramId}`);
                setUserData({
                    username: userHomeData.user.username,
                    balance: userHomeData.user.balance.toString(),
                    rank: userHomeData.user.rank?.toString() || "N/A",
                    initials: userHomeData.user.initials,
                    profilePhoto: userHomeData.user.profilePhoto
                });

            } catch (error) {
                console.error('Error fetching data:', error);
                setError("An error occurred while loading the leaderboard.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-black text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

            {isLoading ? (
                <>
                    <UserProfileCardSkeleton />
                    <h2 className="text-xl font-semibold mb-4">
                        <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
                    </h2>
                    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                        <LeaderboardItemSkeleton key={index} />
                    ))}
                </>
            ) : error ? (
                <div className="text-red-500 p-4">{error}</div>
            ) : userData ? (
                <>
                    <UserProfileCard
                        username={userData.username}
                        balance={userData.balance}
                        rank={userData.rank}
                        initials={userData.initials}
                        profilePhoto={userData.profilePhoto}
                    />

                    <h2 className="text-xl font-semibold mb-4">
                        {totalUsers} holders
                    </h2>

                    <div className="flex flex-col space-y-4">
                        {leaderboardEntries.map((item, index) => (
                            <LeaderboardItem
                                key={item.id}
                                username={item.name}
                                balance={item.tokens.toString()}
                                rank={item.rank}
                                medal={index < 3 ? ['gold', 'silver', 'bronze'][index] as 'gold' | 'silver' | 'bronze' : null}
                                initials={item.initials}
                                profilePhoto={item.profilePhoto}
                            />
                        ))}
                    </div>

                    <div ref={observerTarget} className="h-10 w-full">
                        {isLoadingMore && (
                            <div className="py-4">
                                <LeaderboardItemSkeleton />
                            </div>
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
}