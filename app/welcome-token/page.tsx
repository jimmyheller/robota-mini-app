import dynamic from 'next/dynamic';

const WelcomeTokenClient = dynamic(() => import('../components/WelcomeTokenClient'), {
  ssr: false,
});

export default function WelcomeTokenPage() {
  return <WelcomeTokenClient />;
}