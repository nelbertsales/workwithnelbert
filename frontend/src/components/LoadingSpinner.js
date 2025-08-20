import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin ${sizeClasses[size]}`}></div>
      {text && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );
};

export const InlineLoader = ({ className = '' }) => (
  <div className={`inline-flex items-center ${className}`}>
    <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mr-2"></div>
    <span className="text-gray-600 text-sm">Loading...</span>
  </div>
);

export default LoadingSpinner;