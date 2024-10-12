'use client';

import React, { useEffect, useState } from 'react';
import Confetti from '../components/Confetti';
import Button from '../components/Button';

async function awardWelcomeToken() {
  const response = await fetch('/api/users/welcome-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // You might need to pass user identification here, depending on your backend implementation
    // body: JSON.stringify({ userId: 'some-user-id' }),
  });

  if (!response.ok) {
    throw new Error('Failed to award welcome token');
  }

  return response.json();
}

export default function WelcomeTokenClient() {
  const [tokens, setTokens] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    awardWelcomeToken()
      .then((data) => {
        setTokens(data.tokens);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error awarding welcome token:', err);
        setError('Failed to award welcome token. Please try again.');
        setIsLoading(false);
      });
  }, []);

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
        <p className="text-2xl mb-4">You`&apos;`ve received your welcome bonus:</p>
        <p className="text-6xl font-bold mb-8 text-green-400">{tokens} $TODO</p>
        <div className="w-full max-w-xs">
          <Button text="Continue..." href="/streak-celebration" />
        </div>
      </div>
    </div>
  );
}