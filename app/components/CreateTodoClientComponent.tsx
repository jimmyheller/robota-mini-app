//app/component/CreateTodoClient.tsx
'use client';

import React from 'react';
import {useRouter} from 'next/navigation';

const taskTypes = [
    {id: 'channel', label: 'Join my Channel', enabled: true},
    {id: 'group', label: 'Join my Group', enabled: true},
    {id: 'bot', label: 'Start my Telegram Bot', enabled: true},
    {id: 'app', label: 'Launch my Telegram App', enabled: true},
    {id: 'twitter-follow', label: 'Follow on X (coming soon)', enabled: false},
    {id: 'twitter-repost', label: 'Repost on X (coming soon)', enabled: false},
    {id: 'youtube', label: 'Subscribe on Youtube (coming soon)', enabled: false},
    {id: 'app-download', label: 'Download and Register my app (coming soon)', enabled: false},
];

const CreateTodoClient = () => {
    const router = useRouter();
    const balance = 1100400; // This will come from API later

    return (
        <div className="flex flex-col min-h-screen bg-black text-white p-4">
            {/* Balance display */}
            <div className="flex justify-between items-center mb-8">
        <span className="text-[48px] font-bold text-[#52FF00]">
          {balance.toLocaleString()}
            <span className="text-2xl">$TODO</span>
        </span>
                <button
                    className="flex items-center gap-2 text-white bg-[#1C1C1E] px-4 py-2 rounded-lg"
                    onClick={() => {/* TODO: Implement buy TODO */
                    }}
                >
                    <span>Buy TODO</span>
                </button>
            </div>

            {/* Task type selection */}
            <h2 className="text-2xl mb-6">What do you want TODOers to do?</h2>

            <div className="space-y-4">
                {taskTypes.map(type => (
                    <button
                        key={type.id}
                        className={`w-full p-4 rounded-lg border border-[#52FF00] text-left ${
                            type.enabled ? 'text-white hover:bg-[#52FF00] hover:text-black' : 'text-gray-500 border-gray-500'
                        }`}
                        onClick={() => type.enabled && router.push(`/create-todo/${type.id}`)}
                        disabled={!type.enabled}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CreateTodoClient;