import React from 'react';
import UserProfileCard from '../../components/UserProfileCard';
import LeaderboardItem from '../../components/LeaderboardItem';
import { getLeaderboard, LeaderboardResponse } from '../../../services/leaderboard-service';

async function getLeaderboardData(): Promise<LeaderboardResponse> {
  return getLeaderboard();
}

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <UserProfileCard username="Masih32" balance="320" rank="1236542" />
      <h2 className="text-xl font-semibold mb-4">{data.total} holders</h2>
      {data.leaderboard.map((item, index) => (
        <LeaderboardItem 
          key={item.id}
          username={item.name}
          balance={item.tokens.toString()}
          rank={item.rank}
          medal={index < 3 ? ['gold', 'silver', 'bronze'][index] as 'gold' | 'silver' | 'bronze' : null}
        />
      ))}
    </>
  );
}