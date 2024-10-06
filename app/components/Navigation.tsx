'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BarChart2, Users, Info } from 'lucide-react';

const Navigation: React.FC = () => (
  <nav className="flex justify-around py-4 bg-black text-white">
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
  </nav>
);

export default Navigation;