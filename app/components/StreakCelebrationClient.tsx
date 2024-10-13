'use client';

import React, { useEffect, useState } from 'react';
import Confetti from '../components/Confetti';
import Button from '../components/Button';
import TelegramApiClient from '../..//lib/telegram-api-client';

interface StreakData {
  streak: number;
  tokens: number;
}

interface StreakCelebrationClientProps {
  initialStreakData: StreakData | null;
}

export default function StreakCelebrationClient({ initialStreakData }: StreakCelebrationClientProps) {
  const [streakData, setStreakData] = useState<StreakData | null>(initialStreakData);
  const [isLoading, setIsLoading] = useState(!initialStreakData);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const telegramId = await TelegramApiClient.getUserId();

        // If we don't have initial streak data, we could fetch it here
        // or redirect to a page that will fetch it server-side
        if (!streakData && telegramId) {
          // Example: router.push(`/api/fetch-streak?telegramId=${telegramId}`);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
        setIsLoading(false);
      }
    };

    initTelegram();
  }, [streakData]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!streakData) {
    return <div className="text-red-500">Failed to load streak data. Please try again.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Confetti />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-9xl font-bold mb-2 text-green-400">{streakData.streak}</h1>
        <p className="text-2xl mb-4">Days Streak</p>
        <p className="text-xl mb-8">
          <span className="text-gray-400">{streakData.tokens}</span>{' '}
          <span className="font-bold">$TODO</span>
        </p>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/home" />
        </div>
      </div>
    </div>
  );
}