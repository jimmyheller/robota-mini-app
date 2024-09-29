// app/home1/page.tsx
'use client';

import React from 'react';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

export default function Home1Page() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-center">Checking your account</h1>
        <ProgressBar label="Account Age Verified" progress={100} isComplete={true} />
        <ProgressBar label="Activity Level Analyzed" progress={75} isComplete={false} />
        <ProgressBar label="Telegram Premium Checked" progress={50} isComplete={false} />
        <ProgressBar label="OGStatus Confirmed" progress={25} isComplete={false} />
      </div>
      <div className="w-full max-w-xs mt-8">
        <Button text="Continue..." href="/streak-celebration" />
      </div>
    </div>
  );
}