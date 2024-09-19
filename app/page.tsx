// app/page.tsx
import React from 'react';
import ProgressBar from './components/ProgressBar';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-8">Checking your account</h1>
      <div className="w-full max-w-md">
        <ProgressBar label="Account Age Verified" progress={100} isComplete={true} />
        <ProgressBar label="Activity Level Analyzed" progress={75} isComplete={false} />
        <ProgressBar label="Telegram Premium Checked" progress={50} isComplete={false} />
        <ProgressBar label="OGStatus Confirmed" progress={25} isComplete={false} />
      </div>
    </div>
  );
}