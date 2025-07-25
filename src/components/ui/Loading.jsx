import React from "react";

const Loading = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Task input skeleton */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5 bg-neutral-200 rounded"></div>
          <div className="flex-1 h-6 bg-neutral-200 rounded"></div>
          <div className="h-6 w-16 bg-neutral-200 rounded-full"></div>
        </div>
      </div>

      {/* Task list skeleton */}
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-neutral-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
            </div>
            <div className="h-5 w-12 bg-neutral-200 rounded-full"></div>
            <div className="h-5 w-5 bg-neutral-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;