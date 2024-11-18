// components/ProgressBar.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  label: string;
  progress: number;
  isComplete: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress, isComplete }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-2">
      <span className="text-base text-white font-medium">{label}</span>
      {isComplete && (
        <div className="rounded-full bg-green-500/20 p-1">
          <Check className="w-4 h-4 text-green-500" />
        </div>
      )}
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;