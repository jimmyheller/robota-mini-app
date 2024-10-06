// app/telegram-data/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramData {
  initData: string;
  colorScheme: string;
  themeParams: any;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  version: string;
  user?: WebAppUser;
}

interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
}

export default function TelegramDataPage() {
  const [telegramData, setTelegramData] = useState<TelegramData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data: TelegramData = {
        initData: WebApp.initData,
        colorScheme: WebApp.colorScheme,
        themeParams: WebApp.themeParams,
        isExpanded: WebApp.isExpanded,
        viewportHeight: WebApp.viewportHeight,
        viewportStableHeight: WebApp.viewportStableHeight,
        headerColor: WebApp.headerColor,
        backgroundColor: WebApp.backgroundColor,
        isClosingConfirmationEnabled: WebApp.isClosingConfirmationEnabled,
        version: WebApp.version,
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

  return (
    <div className="p-4 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Telegram Web App Data</h1>
      <h2 className="text-xl font-semibold mb-2">User Information</h2>
      {telegramData.user ? (
        <div className="mb-4">
          <p>ID: {telegramData.user.id}</p>
          <p>First Name: {telegramData.user.first_name}</p>
          {telegramData.user.last_name && <p>Last Name: {telegramData.user.last_name}</p>}
          {telegramData.user.username && <p>Username: {telegramData.user.username}</p>}
          {telegramData.user.language_code && <p>Language Code: {telegramData.user.language_code}</p>}
          <p>Is Premium: {telegramData.user.is_premium ? 'Yes' : 'No'}</p>
          <p>Allows Write to PM: {telegramData.user.allows_write_to_pm ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
      <h2 className="text-xl font-semibold mb-2">Other Telegram Web App Data</h2>
      <pre className="whitespace-pre-wrap break-words">
        {JSON.stringify(telegramData, null, 2)}
      </pre>
    </div>
  );
}