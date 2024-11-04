import React from 'react';
import { UserPlus } from 'lucide-react';
import WebApp from '@twa-dev/sdk';

interface InviteButtonProps {
  referralCode: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ referralCode }) => {
  const handleInvite = () => {
    // Create the shareable message
    const message = `Join me on Robota and get TODO tokens! https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=${referralCode}`;

    // Use Telegram's native sharing
    WebApp.showPopup({
      title: "Share Invitation",
      message: "Share your referral link with friends",
      buttons: [
        { type: "default", text: "Share", id: "share" },
        { type: "cancel" }
      ]
    }, (buttonId) => {
      if (buttonId === "share") {
        WebApp.switchInlineQuery(message, ["users", "groups"]);
      }
    });
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