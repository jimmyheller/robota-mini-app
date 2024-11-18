// components/TelegramCheckClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';
import Button from './Button';
import TokenLogo from './TokenLogo';

interface CheckItem {
  label: string;
  progress: number;
  isComplete: boolean;
}

const TelegramCheckClient: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    { label: 'Verifing your account', progress: 0, isComplete: false }
  ]);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const initData = await TelegramApiClient.getInitData();
        if (!initData) {
          setError("Telegram Web App data is not available. Are you running this in Telegram?");
          setIsLoading(false);
          return;
        }

        // Simulate progress for each check item
        for (let i = 0; i < checkItems.length; i++) {
          setCheckItems(prev => prev.map((item, index) => {
            if (index === i) {
              return { ...item, progress: 100, isComplete: true };
            }
            return item;
          }));
          await new Promise(resolve => setTimeout(resolve, 500)); // Add delay between checks
        }

        const userData = await apiClient.post('/users/authenticate', { initData });
        setIsLoading(false);
      } catch (error) {
        console.error('Error authenticating user:', error);
        setError("Failed to authenticate. Please try again.");
        setIsLoading(false);
      }
    };

    initTelegram();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Logo Section */}
      <div className="flex justify-center items-center p-8">
        <TokenLogo width={180} height={180} />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center px-4">
        <h1 className="text-3xl font-bold mb-8">Checking your account</h1>

        {/* Progress Bars */}
        <div className="w-full max-w-md space-y-6 mb-8">
          {checkItems.map((item, index) => (
            <ProgressBar
              key={index}
              label={item.label}
              progress={item.progress}
              isComplete={item.isComplete}
            />
          ))}
        </div>

        {/* Button Section - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
          <div className="max-w-md mx-auto">
            <Button
              text="Continue..."
              href="/welcome-token"
              onClick={() => !isLoading && router.push('/welcome-token')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramCheckClient;