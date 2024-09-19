// app/leaderboard/page.tsx
import React from 'react';
import UserProfileCard from '../components/UserProfileCard';
import LeaderboardItem from '../components/LeaderboardItem';

export default function LeaderboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <UserProfileCard username="Masih32" balance="320" rank="1236542" />
      <h2 className="text-xl font-semibold mb-4">45.7M holders</h2>
      <LeaderboardItem username="User1" balance="500" medal="gold" rank={1} />
      <LeaderboardItem username="User2" balance="450" medal="silver" rank={2} />
      <LeaderboardItem username="User3" balance="400" medal="bronze" rank={3} />
      <LeaderboardItem username="Masih32" balance="320" rank={4} medal={null} />
    </>
  );
}