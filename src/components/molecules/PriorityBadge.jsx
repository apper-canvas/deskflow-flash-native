import React from "react";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority, className }) => {
  const priorityConfig = {
    high: {
      label: "High",
      className: "priority-high"
    },
    medium: {
      label: "Med",
      className: "priority-medium"
    },
    low: {
      label: "Low",
      className: "priority-low"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <span className={cn(
      "inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};

export default PriorityBadge;