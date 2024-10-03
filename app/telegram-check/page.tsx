// app/telegram-check/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import ProgressBar from '../components/ProgressBar';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data: TelegramData = {
        user: WebApp.initDataUnsafe.user,
      };
      setTelegramData(data);
    }
  }, []);

  if (typeof window === 'undefined') {
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
      {isPremium ? (
        <p className="mt-4 text-green-500">Thank you for being a Telegram Premium user!</p>
      ) : (
        <p className="mt-4 text-yellow-500">Consider upgrading to Telegram Premium for additional benefits.</p>
      )}
    </div>
  );
};

export default TelegramCheckPage;