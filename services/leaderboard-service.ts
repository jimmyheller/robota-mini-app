import apiClient from '../lib/api-client';

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  tokens: number;
  streaks: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  total: number;
  limit: number;
  offset: number;
}

export const getLeaderboard = () => {
  return apiClient.get<LeaderboardResponse>('/leaderboard');
};