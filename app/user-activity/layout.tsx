// app/user-activity/layout.tsx
import React from 'react';

export default function UserActivityLayout({
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