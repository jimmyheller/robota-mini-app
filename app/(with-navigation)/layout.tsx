'use client';

import Navigation from '../components/Navigation';
import TokenLogo from '../components/TokenLogo';

export default function LayoutWithNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center p-4">
        <TokenLogo width={60} height={60} />
      </div>
      <div className="flex-grow p-4 pb-24">
        {children}
      </div>
      <Navigation />
    </div>
  );
}