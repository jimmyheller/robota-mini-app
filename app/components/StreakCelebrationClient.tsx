'use client';

import React, { useState, useEffect } from 'react';
import Confetti from '../components/Confetti';
import Button from '../components/Button';
import apiClient from '../../lib/api-client';
import TelegramApiClient from '../../lib/telegram-api-client';

interface StreakData {
  streak: number;
  tokens: number;
}

export default function StreakCelebrationClient() {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const telegramId = await TelegramApiClient.getUserId();
        const data = await apiClient.post<StreakData>('/users/daily-streak', { telegramId });
        setStreakData(data);
      } catch (err) {
        console.error('Error fetching streak data:', err);
        setError('Failed to fetch streak data. Please try again.');
      }
    };

    fetchStreakData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!streakData) {
    return <div>Loading...</div>;
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