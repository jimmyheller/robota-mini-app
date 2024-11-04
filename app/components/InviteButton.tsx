import React from 'react';
import { UserPlus } from 'lucide-react';

interface InviteButtonProps {
  referralCode: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ referralCode }) => {
  const handleInvite = () => {
    const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME || 'rob_mini_test_bot';
    const shareText = "Join me on Robota and earn $TODO tokens!";
    const botUrl = `https://t.me/${botUsername}?start=${referralCode}`;
    const shareUrl = `https://t.me/share/url?url=${botUrl}&text=${shareText}`;

    window.open(shareUrl, '_blank');
  };

  return (
    <button
      onClick={handleInvite}
      className="w-full bg-white text-black py-3 rounded-lg font-semibold mb-6 flex items-center justify-center"
    >
      <UserPlus className="w-5 h-5 mr-2" />
      Invite Friends
    </button>
  );
};

export default InviteButton;