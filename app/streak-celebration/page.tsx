// app/streak-celebration/page.tsx
import { cookies } from 'next/headers';
import StreakCelebrationClient from '../components/StreakCelebrationClient';
import apiClient from '../../lib/api-client';

async function getStreakData(telegramId: string) {
  try {
    return await apiClient.post('/users/daily-streak', { telegramId });
  } catch (error) {
    console.error('Error fetching streak data:', error);
    return null;
  }
}

export default async function StreakCelebrationPage() {
  const cookieStore = cookies();
  const telegramId = cookieStore.get('telegramId')?.value;

  let streakData = null;
  if (telegramId) {
    streakData = await getStreakData(telegramId);
  }

  return <StreakCelebrationClient initialStreakData={streakData} />;
}