// components/Rewards.tsx
import React from 'react';
import { Clock, Award, UserPlus, CheckSquare } from 'lucide-react';

const RewardItem: React.FC<{ icon: React.ReactNode; label: string; amount: string }> = ({ icon, label, amount }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      {icon}
      <span className="ml-2 text-white">{label}</span>
    </div>
    <span className="text-white">{amount} $TODO</span>
  </div>
);

const Rewards: React.FC = () => (
  <div>
    <h2 className="text-white font-bold mb-4">Your rewards</h2>
    <RewardItem icon={<Clock className="w-5 h-5 text-gray-400" />} label="Account Age" amount="5,000" />
    <RewardItem icon={<Award className="w-5 h-5 text-gray-400" />} label="Telegram Premium" amount="0" />
    <RewardItem icon={<UserPlus className="w-5 h-5 text-gray-400" />} label="Invited Friends" amount="3,200" />
    <RewardItem icon={<CheckSquare className="w-5 h-5 text-gray-400" />} label="Daily Check-in" amount="400" />
  </div>
);

export default Rewards;