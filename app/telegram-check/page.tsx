'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';
import ProgressBar from '../components/ProgressBar';

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

export default function TelegramCheckPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const initData = await TelegramApiClient.getInitData();
        console.log('initData', initData);
        if (!initData) {
          setError("Telegram Web App data is not available. Are you running this in Telegram?");
          setIsLoading(false);
          return;
        }

        const userData: UserData = await apiClient.post('/users/authenticate', { initData });
        // Store user data or token securely (e.g., in an HTTP-only cookie)
        // For now, we'll just redirect to the welcome page
        router.push('/welcome-token');
      } catch (error) {
        console.error('Error authenticating user:', error);
        setError("Failed to authenticate. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initTelegram();
  }, [router]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Authenticating your account</h1>
      <div className="w-full max-w-md">
        <ProgressBar
          label="Authentication Progress"
          progress={100}
          isComplete={true}
        />
      </div>
    </div>
  );
}