// app/actions/streakActions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface StreakStatus {
    shouldShowCelebration: boolean;
    userData: {
        telegramId: number;
        currentStreak: number;
        tokens: number;
        // ... other user data fields
    } | null;
    isFirstTime: boolean;
}

export async function checkUserStreak(telegramId: string, tzOffset: number) {
    try {
        const response = await fetch(
            `${process.env.API_URL}/api/streak/check/${telegramId}?tzOffset=${tzOffset}`,
            {
                cache: 'no-store'  // Ensure we don't cache the streak check
            }
        );

        if (!response.ok) {
            throw new Error('Failed to check streak status');
        }

        return await response.json() as StreakStatus;
    } catch (error) {
        console.error('Error checking streak:', error);
        throw error;
    }
}