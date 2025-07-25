import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "relative flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
        checked 
          ? "bg-primary-600 border-primary-600 text-white" 
          : "bg-white border-neutral-300 hover:border-primary-400",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          className="h-3 w-3 animate-scale-in" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;