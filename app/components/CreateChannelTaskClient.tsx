//app/components/CreateChannelTaskClient.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ChannelTask {
    id: string;
    type: 'channel';
    title: string;
    link: string;
    reward: number;
    hasLimit: boolean;
    status: 'pending';
    createdAt: number;
}

const CreateChannelTaskClient = () => {
    const router = useRouter();
    const [channelLink, setChannelLink] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [reward, setReward] = useState(50);
    const [hasLimit, setHasLimit] = useState(false);
    const balance = 1100400; // This will come from API later

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: ChannelTask = {
            id: Date.now().toString(),
            type: 'channel',
            title: taskTitle,
            link: channelLink,
            reward,
            hasLimit,
            status: 'pending',
            createdAt: Date.now(),
        };

        // Get existing tasks from localStorage
        const existingTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');

        // Add new task
        localStorage.setItem('todoTasks', JSON.stringify([...existingTasks, newTask]));

        router.push('/home');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col min-h-screen bg-black text-white p-4"
        >
            {/* Balance display */}
            <div className="flex justify-between items-center mb-8">
        <span className="text-[48px] font-bold text-[#52FF00]">
          {balance.toLocaleString()}
            <span className="text-2xl">$TODO</span>
        </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Channel Link Input */}
                <div>
                    <label className="block text-white mb-2">Insert Your Channel Link</label>
                    <input
                        type="text"
                        value={channelLink}
                        onChange={(e) => setChannelLink(e.target.value)}
                        placeholder="t.me/channelname"
                        className="w-full p-4 rounded-lg bg-[#1C1C1E] text-white border border-[#333336] focus:border-[#52FF00] focus:outline-none"
                        required
                    />
                </div>

                {/* Task Title Input */}
                <div>
                    <label className="block text-white mb-2">Write Task Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Join mychannel today"
                        className="w-full p-4 rounded-lg bg-[#1C1C1E] text-white border border-[#333336] focus:border-[#52FF00] focus:outline-none"
                        required
                    />
                </div>

                {/* Reward Token Slider */}
                <div>
                    <label className="block text-white mb-2">Reward Token</label>
                    <input
                        type="range"
                        min="10"
                        max="500"
                        step="10"
                        value={reward}
                        onChange={(e) => setReward(Number(e.target.value))}
                        className="w-full h-2 bg-[#1C1C1E] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>10</span>
                        <span>30</span>
                        <span>50</span>
                        <span>100</span>
                        <span>300</span>
                        <span>400</span>
                        <span>500</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Set tokens per completed task.</p>
                </div>

                {/* Optional Limits Toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-white">Optional: Set Limits</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hasLimit}
                            onChange={(e) => setHasLimit(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1C1C1E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#52FF00]"></div>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-4 bg-[#52FF00] text-black rounded-lg font-semibold hover:bg-[#4AE600] transition-colors mt-8"
                >
                    Submit
                </button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
                Add t.me/ourbot to your channel admins for accurate verification.
            </p>
        </motion.div>
    );
};

export default CreateChannelTaskClient;