// app/streak-check/[[...slug]]/StreakCheckClient.tsx
'use client';

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TelegramApiClient from '../../../lib/telegram-api-client';
import apiClient from '../../../lib/api-client';

interface StreakStatus {
    shouldShowCelebration: boolean;
    userData: {
        telegramId: number;
        currentStreak: number;
        tokens: number;
    } | null;
    isFirstTime: boolean;
}

export default function StreakCheckClient() {
    const router = useRouter();

    const checkStreak = useCallback(async () => {
        try {
            const telegramId = await TelegramApiClient.getUserId();
            if (!telegramId) {
                router.push('/telegram-check');
                return;
            }

            const tzOffset = new Date().getTimezoneOffset();
            const response = await apiClient.get<StreakStatus>(
                `/streak/check/${telegramId}?tzOffset=${tzOffset}`
            );

            if (response.shouldShowCelebration) {
                router.push('/streak-celebration');
            } else {
                router.push('/home');
            }
        } catch (error) {
            console.error('Error checking streak:', error);
            router.push('/telegram-check');
        }
    }, [router]);

    useEffect(() => {
        checkStreak();
    }, [checkStreak]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4"></h1>

            </div>
        </div>
    );
}