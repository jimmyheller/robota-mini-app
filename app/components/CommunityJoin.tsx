// components/CommunityJoin.tsx
import React from 'react';
import Button from './Button';

const CommunityJoin: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-4 mb-4">
    <h2 className="text-white font-bold mb-2">TODO COMMUNITY</h2>
    <p className="text-gray-300 mb-4">Join our Telegram for the latest and greatest in $TODO fun!</p>
    <Button text="Continue..." href="/home" />
  </div>
);

export default CommunityJoin;