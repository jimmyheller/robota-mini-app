// app/components/ProgressBar.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  label: string;
  progress: number;
  isComplete: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress, isComplete }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-300">{label}</span>
      {isComplete && <Check className="w-4 h-4 text-green-500" />}
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-green-500 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;