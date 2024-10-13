'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Confetti from '../components/Confetti';
import Button from '../components/Button';
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

async function getUserData(telegramId: string): Promise<UserData | null> {
  try {
    const response = await apiClient.post('/users/daily-streak', { telegramId });

    if (typeof response === 'object' && response !== null &&
      'telegramId' in response &&
      'tokens' in response &&
      'currentStreak' in response) {
      return response as UserData;
    }

    console.error('Invalid user data received:', response);
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export default function StreakCelebrationPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const telegramId = await TelegramApiClient.getUserId();
        if (telegramId) {
          const data = await getUserData(telegramId);
          if (data) {
            setUserData(data);
          } else {
            setError("Failed to load user data. Please try again.");
          }
        } else {
          // Redirect to telegram-check page if Telegram ID is not available
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