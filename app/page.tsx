"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [strikes, setStrikes] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  const [canStrike, setCanStrike] = useState(true);
  const [duration, setDuration] = useState(30);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setCanStrike(true);
          return duration;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const handleStrike = () => {
    if (canStrike) {
      setStrikes((prevStrikes) => prevStrikes + 1);
      setCanStrike(false);
      setTimer(duration);
    }
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(event.target.value);
    setDuration(newDuration);
    setTimer(newDuration);
    setCanStrike(true);
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {username && <h2 className="text-xl mb-4">Welcome, @{username}!</h2>}
      <p className="text-2xl font-bold mb-4">Strikes: {strikes}</p>
      <p className="mb-4">Time until next available strike: {timer}s</p>
      <button
        onClick={handleStrike}
        className={`px-4 py-2 text-white rounded transition-colors ${
          canStrike ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!canStrike}
      >
        Strike!
      </button>
      <div className="mt-8">
        <label htmlFor="duration" className="block mb-2">Strike Interval (seconds):</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          className="px-2 py-1 border rounded"
          min="1"
        />
      </div>
    </div>
  );
}