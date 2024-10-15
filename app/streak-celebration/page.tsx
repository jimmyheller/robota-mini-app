import dynamic from 'next/dynamic';

const StreakCelebrationClient = dynamic(
  () => import('../components/StreakCelebrationClient'),
  { ssr: false }
);

export default function StreakCelebrationPage() {
  return <StreakCelebrationClient />;
}