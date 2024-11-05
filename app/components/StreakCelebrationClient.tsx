'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Confetti from './Confetti';
import Button from './Button';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';

interface UserData {
  _id: string;
  telegramId: number;
  username: string;
  firstName: string;
  lastName: string;
  tokens: number;
  currentStreak: number;
}

export default function StreakCelebrationClient() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const processStreak = async () => {
      try {
        const telegramId = await TelegramApiClient.getUserId();
        if (!telegramId) {
          router.push('/telegram-check');
          return;
        }

        const timezoneOffset = new Date().getTimezoneOffset();

        // Try to process streak
        try {
          const { user } = await apiClient.post<{ success: boolean; user: UserData }>(
            '/users/process-daily-streak',
            { telegramId, timezoneOffset }
          );
          setUserData(user);
        } catch (error: any) {
          // If streak was already processed, redirect to home
          if (error.response?.data?.shouldRedirect) {
            router.push('/home');
            return;
          }
          throw error; // Re-throw other errors
        }
      } catch (error) {
        console.error('Error processing streak:', error);
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    processStreak();
  }, [router]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error || !userData) {
    return <div className="text-red-500">{error || "Failed to load user data"}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Confetti />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-9xl font-bold mb-2 text-green-400">{userData.currentStreak}</h1>
        <p className="text-2xl mb-4">Days Streak</p>
        <p className="text-xl mb-8">
          <span className="text-gray-400">{userData.tokens}</span>{' '}
          <span className="font-bold">$TODO</span>
        </p>
        <p className="text-lg mb-4">Welcome back, {userData.firstName}!</p>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/home" />
        </div>
      </div>
    </div>
  );
}