import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ activeTaskCount = 0 }) => {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <ApperIcon name="CheckSquare" className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                DeskFlow
              </h1>
              <p className="text-sm text-neutral-600">
                Your office task manager
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {activeTaskCount}
            </div>
            <p className="text-sm text-neutral-600">
              {activeTaskCount === 1 ? "task remaining" : "tasks remaining"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;