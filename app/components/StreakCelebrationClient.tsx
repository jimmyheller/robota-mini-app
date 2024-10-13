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
  languageCode: string;
  isPremium: boolean;
  tokens: number;
  currentStreak: number;
  referralCode: string;
  lastVisit: string;
  __v: number;
}

function isUserData(data: unknown): data is UserData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'telegramId' in data &&
    'tokens' in data &&
    'currentStreak' in data &&
    'firstName' in data
  );
}

export default function StreakCelebrationClient() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const telegramId = await TelegramApiClient.getUserId();
        if (telegramId) {
          const data = await apiClient.post('/users/daily-streak', { telegramId });
          if (isUserData(data)) {
            setUserData(data);
          } else {
            throw new Error('Invalid user data received');
          }
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