import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Add your first task to get started with DeskFlow",
  actionText = "Add Task",
  onAction 
}) => {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-primary-50 rounded-full">
            <ApperIcon name="CheckSquare" className="h-12 w-12 text-primary-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-neutral-900">
              {title}
            </h3>
            <p className="text-neutral-600">
              {description}
            </p>
          </div>
          {onAction && (
            <button
              onClick={onAction}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 font-medium"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span>{actionText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Empty;