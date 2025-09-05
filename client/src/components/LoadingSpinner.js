import React from 'react';

const LoadingSpinner = ({ height = '60px' }) => (
  <div 
    className="flex items-center justify-center"
    style={{ height }}
  >
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
  </div>
);

export default LoadingSpinner;
