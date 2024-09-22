// app/page.tsx
import React from 'react';
import TokenLogo from './components/TokenLogo';
import Navigation from './components/Navigation';
import UserProfile from './components/UserProfile';
import CommunityJoin from './components/CommunityJoin';
import Rewards from './components/Rewards';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow p-4">
        <TokenLogo className="mb-4" />
        <UserProfile username="Masih32" balance="320" />
        <CommunityJoin />
        <Rewards />
      </main>
      <Navigation />
    </div>
  );
}