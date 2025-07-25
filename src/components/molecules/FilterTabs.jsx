import React from "react";
import { cn } from "@/utils/cn";

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts = {} }) => {
  const filters = [
    { key: "all", label: "All", count: taskCounts.total || 0 },
    { key: "active", label: "Active", count: taskCounts.active || 0 },
    { key: "completed", label: "Completed", count: taskCounts.completed || 0 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="flex">
        {filters.map((filter, index) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset",
              index === 0 && "rounded-l-lg",
              index === filters.length - 1 && "rounded-r-lg",
              activeFilter === filter.key
                ? "filter-tab-active"
                : "filter-tab-inactive"
            )}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{filter.label}</span>
              <span className={cn(
                "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs rounded-full",
                activeFilter === filter.key
                  ? "bg-primary-100 text-primary-700"
                  : "bg-neutral-100 text-neutral-600"
              )}>
                {filter.count}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;