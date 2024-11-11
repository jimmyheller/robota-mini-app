'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/api-client';
import TelegramApiClient from '../../lib/telegram-api-client';
import ProgressBar from './ProgressBar';
import Button from './Button';
import Confetti from './Confetti';

interface UserData {
  telegramId: number;
  username: string;
  tokens: number;
}

const WelcomeTokenClient: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchWelcomeToken = useCallback(async () => {
    try {
      const telegramId = await TelegramApiClient.getUserId();
      if (telegramId) {
        const response = await apiClient.post<UserData>('/users/welcome-token', { telegramId });
        setUserData(response);
      } else {
        router.push('/telegram-check');
        return;
      }
    } catch (err) {
      console.error('Error fetching welcome token:', err);
      setError('Failed to fetch welcome token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchWelcomeToken();
  }, [fetchWelcomeToken]);

  // Render null during server-side rendering
  if (typeof window === 'undefined') {
    return null;
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Confetti />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold mb-4">Welcome!</h1>
        <p className="text-2xl mb-4">You`&apos;`ve received welcome bonus:</p>
        <p className="text-6xl font-bold mb-8 text-green-400">{userData?.tokens} $TODO</p>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/streak-celebration" />
        </div>
      </div>
    </div>
  );

};

export default WelcomeTokenClient;