// components/Rewards.tsx
import React from 'react';
import { Clock, Award, UserPlus, CheckSquare } from 'lucide-react';

interface RewardItemProps {
  icon: React.ReactNode;
  label: string;
  amount: string;
}

const RewardItem: React.FC<RewardItemProps> = ({ icon, label, amount }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      {icon}
      <span className="ml-2 text-white">{label}</span>
    </div>
    <span className="text-white">{amount} $TODO</span>
  </div>
);

interface RewardsProps {
  rewards: {
    invitedFriends: string;
    dailyCheckin: string;
  };
}

const Rewards: React.FC<RewardsProps> = ({ rewards }) => (
  <div>
    <h2 className="text-white font-bold mb-4">Your rewards</h2>
    {/* <RewardItem
      icon={<Clock className="w-5 h-5 text-gray-400" />}
      label="Account Age"
      amount={rewards.accountAge}
    /> */}
    {/* <RewardItem
      icon={<Award className="w-5 h-5 text-gray-400" />}
      label="Telegram Premium"
      amount={rewards.premium}
    /> */}
    <RewardItem
      icon={<UserPlus className="w-5 h-5 text-gray-400" />}
      label="Invited Friends"
      amount={rewards.invitedFriends}
    />
    <RewardItem
      icon={<CheckSquare className="w-5 h-5 text-gray-400" />}
      label="Daily Check-in"
      amount={rewards.dailyCheckin}
    />
  </div>
);

export default Rewards;