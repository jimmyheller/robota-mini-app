// (with-navigation)/leaderboard/page.tsx
import dynamic from 'next/dynamic';

const LeaderboardClient = dynamic(
  () => import('../../components/LeaderBoardClient'),
  { ssr: false }
);

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}