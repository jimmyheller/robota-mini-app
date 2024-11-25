'use client';

import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {HomeIcon, LeaderboardIcon, FriendsIcon} from './Icons';

const Navigation: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black py-2 z-50">
            <div className="flex justify-around max-w-screen-sm mx-auto">
                <Link href="/home" className="flex flex-col items-center">
                    <HomeIcon
                        isActive={pathname === '/home'}
                        className="w-6 h-6"
                    />
                    <span className={`text-[10px] mt-0.5 font-regular uppercase tracking-wide ${
                        pathname === '/home' ? 'text-todo-green' : 'text-[#A3A3A5]'
                    }`}>
            Home
          </span>
                </Link>

                <Link href="/leaderboard" className="flex flex-col items-center">
                    <LeaderboardIcon
                        isActive={pathname === '/leaderboard'}
                        className="w-6 h-6"
                    />
                    <span className={`text-[10px] mt-0.5 font-regular uppercase tracking-wide ${
                        pathname === '/leaderboard' ? 'text-todo-green' : 'text-[#A3A3A5]'
                    }`}>
            Leaderboard
          </span>
                </Link>

                <Link href="/friends" className="flex flex-col items-center">
                    <FriendsIcon
                        isActive={pathname === '/friends'}
                        className="w-6 h-6"
                    />
                    <span className={`text-[10px] mt-0.5 font-regular uppercase tracking-wide ${
                        pathname === '/friends' ? 'text-todo-green' : 'text-[#A3A3A5]'
                    }`}>
            Invite
          </span>
                </Link>
            </div>
        </nav>
    );
};

export default Navigation;