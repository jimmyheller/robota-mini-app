import dynamic from 'next/dynamic';

const TelegramCheckClient = dynamic(
  () => import('../components/TelegramCheckClient'),
  { ssr: false }
);

export default function TelegramCheckPage() {
  return <TelegramCheckClient />;
}