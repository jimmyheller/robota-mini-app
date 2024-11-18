'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Button from './Button';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';

interface StreakResponse {
  rewardAmount: number;
  currentStreak: number;
}

export default function StreakCelebrationClient() {
  const [userData, setUserData] = useState<StreakResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const telegramId = await TelegramApiClient.getUserId();
        if (telegramId) {
          const data = await apiClient.post<StreakResponse>('/users/daily-streak', { telegramId });
          setUserData(data);
        } else {
          router.push('/telegram-check');
          return;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error || !userData) {
    return <div className="text-red-500">{error || "Failed to load user data. Please try again."}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-9xl font-bold mb-2 text-todo-green">{userData.currentStreak}</h1>
        <p className="text-2xl mb-4">Days Streak</p>
        <p className="text-xl mb-8">
          <span className="text-todo-green font-bold">{userData.rewardAmount}</span>{' '}
          <span className="font-bold text-todo-green">$TODO</span>
        </p>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/home" />
        </div>
      </div>
    </div>
  );
}