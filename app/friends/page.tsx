// app/friends/page.tsx
import React from 'react';
import UserProfileCard from '../components/UserProfileCard';
import FriendItem from '../components/FriendItem';
import InviteButton from '../components/InviteButton';

export default function FriendsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Invite friends</h1>
      <h2 className="text-xl mb-6">and get more $TODO</h2>
      <UserProfileCard username="Masih32" balance="320" rank="1236542" />
      <h3 className="text-xl font-semibold mb-4">4 Friends</h3>
      <FriendItem username="Friend1" balance="300" />
      <FriendItem username="Friend2" balance="300" />
      <FriendItem username="Friend3" balance="300" />
      <FriendItem username="Friend4" balance="300" />
      <InviteButton />
    </>
  );
}