import React from 'react';

const ProgressRing = ({ 
  percentage = 0, 
  size = 80, 
  strokeWidth = 8, 
  color = 'stroke-brand-blue',
  trackColor = 'stroke-dark-border',
  textColor = 'text-white'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Track circle */}
        <circle
          className={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`${color} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Inner Text */}
      <span className={`absolute text-sm font-black ${textColor}`}>
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default ProgressRing;
