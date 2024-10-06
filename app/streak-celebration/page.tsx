// app/streak-celebration/page.tsx
'use client';

import React from 'react';
import Confetti from '../components/Confetti';
import Button from '../components/Button';

export default function StreakCelebrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Confetti />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-9xl font-bold mb-2 text-green-400">17</h1>
        <p className="text-2xl mb-4">Days Streak</p>
        <p className="text-xl mb-8">
          <span className="text-gray-400">1,400</span>{' '}
          <span className="font-bold">$TODO</span>
        </p>
        </div>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/home" />
        </div>
    </div>
  );
}