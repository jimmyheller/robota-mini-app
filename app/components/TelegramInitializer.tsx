// app/components/TelegramInitializer.tsx
'use client';

import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export default function TelegramInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      WebApp.ready();
      WebApp.expand();
    }
  }, []);

  return null;
}