import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;