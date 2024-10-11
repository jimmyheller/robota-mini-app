'use client';

import React, { useState } from 'react';
import Confetti from '../components/Confetti';
import Button from '../components/Button';

interface StreakCelebrationClientProps {
  initialStreakData: {
    streak: number;
    tokens: number;
  };
}

export default function StreakCelebrationClient({ initialStreakData }: StreakCelebrationClientProps) {
  const [streakData] = useState(initialStreakData);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Confetti />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-9xl font-bold mb-2 text-green-400">{streakData.streak}</h1>
        <p className="text-2xl mb-4">Days Streak</p>
        <p className="text-xl mb-8">
          <span className="text-gray-400">{streakData.tokens}</span>{' '}
          <span className="font-bold">$TODO</span>
        </p>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/home" />
        </div>
      </div>
    </div>
  );
}