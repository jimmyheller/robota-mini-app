"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Import the SDK dynamically to avoid SSR issues
    import("@twa-dev/sdk").then((WebApp) => {
      WebApp.default.ready();
      setIsReady(true);

      // Get user info
      const user = WebApp.default.initDataUnsafe.user;
      if (user && user.username) {
        setUsername(user.username);
      }
    });
  }, []);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {username && <h2 className="text-xl mb-4">Welcome, @{username}!</h2>}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Click me!
      </button>
      {count > 0 && (
        <p className="mt-4 text-lg">
          You&apos;ve clicked the button {count} time{count !== 1 ? "s" : ""}!
        </p>
      )}
    </div>
  );
}