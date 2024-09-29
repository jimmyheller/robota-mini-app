// app/components/Button.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, href }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <button
      className="w-full py-3 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;