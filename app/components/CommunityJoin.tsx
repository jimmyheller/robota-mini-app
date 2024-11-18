// components/CommunityJoin.tsx
import React from 'react';
import Button from './Button';

const CommunityJoin: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-4 mb-4">
    <h2 className="text-white font-bold mb-2">TODO CHANNEL</h2>
    <p className="text-gray-300 mb-4">Stay updated! Join the TODO Telegram channel for the latest news and announcements.</p>
    <Button text="Join" href="https://t.me/TODOmanytask" />
  </div>
);

export default CommunityJoin;