// app/components/HomeClient.tsx
'use client';

import {motion} from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TelegramApiClient from '../../lib/telegram-api-client';
import apiClient from '../../lib/api-client';
import { PlusCircleIcon } from './Icons';

interface Todo {
    id: string;
    title: string;
    reward: number;
    type: 'channel' | 'group' | 'bot' | 'app';
    status: 'pending' | 'completed';
    link: string;
}

interface HomeData {
    user: {
        username: string;
        firstName: string;
        balance: number;
        initials: string;
        rank: number;
    };
}

const TodoItem = ({ title, reward, status }: { title: string; reward: number; status: 'pending' | 'completed' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#171717] rounded-xl p-4 mb-4"
    >
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <h3 className="text-white text-lg">{title}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
                <button
                    className={`px-6 py-2 rounded-lg text-sm font-medium ${
                        status === 'completed'
                            ? 'bg-white text-black'
                            : 'bg-[#52FF00] text-black'
                    }`}
                >
                    {status === 'completed' ? 'Verify' : 'Start'}
                </button>
                <span className="text-white text-sm">{reward} $TODO</span>
            </div>
        </div>
    </motion.div>
);
const HomeClient = () => {
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Load tasks from localStorage
        const loadTasks = () => {
            const savedTasks = localStorage.getItem('todoTasks');
            if (savedTasks) {
                setTodos(JSON.parse(savedTasks));
            }
        };

        const fetchHomeData = async () => {
            try {
                const telegramId = await TelegramApiClient.getUserId();
                if (!telegramId) {
                    router.push('/telegram-check');
                    return;
                }

                const data = await apiClient.get<HomeData>(`/users/home/${telegramId}`);
                setHomeData(data);
                loadTasks();
            } catch (error) {
                console.error('Error fetching home data:', error);
                setError('Failed to load home data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, [router]);

    if (isLoading) {
        return (
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-48 bg-gray-700 rounded-lg"/>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="flex flex-col flex-1 px-4"
        >
            {/* Balance Display */}
            <motion.div
                initial={{scale: 0.9}}
                animate={{scale: 1}}
                className="flex justify-center items-center mb-16"
            >
        <span className="text-[48px] font-bold text-[#52FF00]">
          {homeData?.user.balance.toLocaleString() || '0'}
        </span>
            </motion.div>

            {/* TODOs Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-[36px] font-bold text-white">TODOs</h1>
                <button
                    onClick={() => router.push('/create-todo')}
                    className="flex items-center gap-3 text-white hover:text-[#52FF00] transition-colors group"
                >
                    <PlusCircleIcon className="w-6 h-6"/>
                    <span className="text-[18px] font-medium">Add yours</span>
                </button>
            </div>

            {/* TODOs List */}
            <div className="space-y-4">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            title={todo.title}
                            reward={todo.reward}
                            status={todo.status}
                        />
                    ))
                ) : (
                    <p className="text-[17px] text-white">
                        All tasks are done for today. Come back tomorrow!
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default HomeClient;