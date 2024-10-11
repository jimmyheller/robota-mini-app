// app/streak-celebration/page.tsx
import StreakCelebrationClient from '../components/StreakCelebrationClient';

async function checkDailyStreak() {
  const response = await fetch('/api/users/daily-streak', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ telegramId: 112344123 }), // Replace with actual Telegram ID
  });
  if (!response.ok) {
    throw new Error('Failed to fetch streak data');
  }

  return response.json();
}

export default async function StreakCelebrationPage() {
  const streakData = await checkDailyStreak();
  return <StreakCelebrationClient initialStreakData={streakData} />;
}