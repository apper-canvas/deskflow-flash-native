import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-error-100 rounded-full">
            <ApperIcon name="AlertCircle" className="h-8 w-8 text-error-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Oops! Something went wrong
            </h3>
            <p className="text-neutral-600 text-sm">
              {message}
            </p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;