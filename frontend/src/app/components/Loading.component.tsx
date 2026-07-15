'use client';

import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm select-none">
      <div className="flex flex-col items-center gap-6  px-10 py-8 ">
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin"></div>

          <div className="absolute h-14 w-14 rounded-full border-4 border-orange-200 border-b-orange-400 animate-spin [animation-direction:reverse] [animation-duration:1.4s]"></div>

          <div className="absolute h-4 w-4 rounded-full bg-orange-500 animate-pulse shadow-lg shadow-orange-400/60"></div>
        </div>

        <div className="flex  gap-1 text-center">
          <h2 className="text-xl font-bold text-orange-500">
            Loading
          </h2>

          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce"></span>
            <span
              className="h-2 w-2 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></span>
            <span
              className="h-2 w-2 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Loading;