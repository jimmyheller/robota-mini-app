// app/telegram-check/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TelegramData {
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
  };
}

const TelegramCheckPage: React.FC = () => {
  const [telegramData, setTelegramData] = useState<TelegramData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      const data: TelegramData = {
        user: WebApp.initDataUnsafe.user,
      };
      setTelegramData(data);
    }
  }, []);

  if (!isClient) {
    return <div className="p-4">Loading...</div>;
  }

  if (!telegramData) {
    return <div className="p-4">Telegram Web App data is not available. Are you running this in Telegram?</div>;
  }

  const isPremium = telegramData.user?.is_premium ?? false;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Checking your account</h1>
      <div className="w-full max-w-md">
        <ProgressBar 
          label="Telegram Premium Checked" 
          progress={isPremium ? 100 : 0} 
          isComplete={isPremium} 
        />
      </div>
      <div className="w-full max-w-xs mt-8">
        <Button text="Continue..." href="/welcome-token" />
      </div>
    </div>
  );
};

export default TelegramCheckPage;