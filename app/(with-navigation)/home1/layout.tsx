// app/home1/layout.tsx
import React from 'react';

export default function Home1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {children}
    </div>
  );
}