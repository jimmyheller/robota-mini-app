// app/components/InviteButton.tsx
import React from 'react';
import { UserPlus } from 'lucide-react';

const InviteButton: React.FC = () => (
  <button className="w-full bg-white text-black py-3 rounded-lg font-semibold mb-6 flex items-center justify-center">
    <UserPlus className="w-5 h-5 mr-2" />
    Invite Friends
  </button>
);

export default InviteButton;