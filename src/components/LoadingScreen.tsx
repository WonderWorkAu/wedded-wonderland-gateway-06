
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-wedding-light-gray border-t-wedding-black rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-wedding-black">Loading content...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
