import { cookies } from 'next/headers';
import StreakCelebrationClient from '../components/StreakCelebrationClient';
import apiClient from '../../lib/api-client';

interface StreakData {
  streak: number;
  tokens: number;
}

async function getStreakData(telegramId: string): Promise<StreakData | null> {
  try {
    const response = await apiClient.post('/users/daily-streak', { telegramId });

    // Type assertion to treat response as any
    const data = response as any;

    // Check if the response has the correct shape
    if (typeof data === 'object' && data !== null &&
      typeof data.streak === 'number' &&
      typeof data.tokens === 'number') {
      return data as StreakData;
    }

    console.error('Invalid streak data received:', data);
    return null;
  } catch (error) {
    console.error('Error fetching streak data:', error);
    return null;
  }
}

export default async function StreakCelebrationPage() {
  const cookieStore = cookies();
  const telegramId = cookieStore.get('telegramId')?.value;

  let streakData: StreakData | null = null;
  if (telegramId) {
    streakData = await getStreakData(telegramId);
  }

  if (!streakData) {
    // Handle the case where streak data is not available
    return <div>Unable to load streak data. Please try again later.</div>;
  }

  // Only render the client component if we have valid streak data
  return <StreakCelebrationClient initialStreakData={streakData} />;
}