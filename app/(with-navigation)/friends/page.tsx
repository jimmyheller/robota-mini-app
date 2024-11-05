import dynamic from 'next/dynamic';

const FriendsClient = dynamic(
  () => import('../../components/FriendsClient'),
  { ssr: false }
);

export default function FriendsPage() {
  return <FriendsClient />;
}