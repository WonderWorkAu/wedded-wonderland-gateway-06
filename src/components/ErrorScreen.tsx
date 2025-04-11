
import React from 'react';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 mb-4">{error}</p>
        <button 
          className="px-4 py-2 bg-wedding-black text-white rounded hover:bg-wedding-dark-gray"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
