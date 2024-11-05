'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BarChart2, Users, Info } from 'lucide-react';

const Navigation: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-4 z-50">
    <div className="flex justify-around">
      <Link href="/home" className="flex flex-col items-center">
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link href="/leaderboard" className="flex flex-col items-center">
        <BarChart2 className="w-6 h-6" />
        <span className="text-xs mt-1">Leader Board</span>
      </Link>
      <Link href="/friends" className="flex flex-col items-center">
        <Users className="w-6 h-6" />
        <span className="text-xs mt-1">Friends</span>
      </Link>
    </div>
  </nav>
);

export default Navigation;