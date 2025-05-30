import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white/70 backdrop-blur-sm flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};
