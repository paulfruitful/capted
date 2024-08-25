import '../_styles/loader.css'
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-48">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-900 rounded-full loader animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-300 rounded-full loader animate-spin"></div>
      </div>
    </div>
    </div>
  );
};

export default Loader;

