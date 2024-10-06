// app/components/ClientSideWrapper.tsx
'use client';

import React, { useEffect } from 'react';

const ClientSideWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Check if it's the first visit
    if (!localStorage.getItem('hasVisited')) {
      // Set the flag for future visits
      localStorage.setItem('hasVisited', 'true');
      // Set a cookie for the server-side check
      document.cookie = 'hasVisited=true; path=/; max-age=31536000'; // 1 year expiry
    }
  }, []);

  return <>{children}</>;
};

export default ClientSideWrapper;