// app/actions/streakActions.ts
'use server';

import apiClient from "@/lib/api-client";

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
        await apiClient.get('')
        const response = await fetch(`/streak/check/${telegramId}?tzOffset=${tzOffset}`);

        if (!response.ok) {
            throw new Error('Failed to check streak status');
        }

        return await response.json() as StreakStatus;
    } catch (error) {
        console.error('Error checking streak:', error);
        throw error;
    }
}