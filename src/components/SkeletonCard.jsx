import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-64 animate-pulse">
      <div className="w-full h-80 bg-gray-300 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonCard;
