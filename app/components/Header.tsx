// app/components/Header.tsx
'use client'

import { usePathname } from 'next/navigation';
import TokenLogo from './TokenLogo';

export default function Header() {
  const pathname = usePathname();
  const showLogo = pathname !== '/streaks';

  if (!showLogo) return null;

  return (
    <div className="flex justify-center items-center p-4">
      <TokenLogo width={60} height={60} />
    </div>
  );
}