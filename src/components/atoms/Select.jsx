import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "transition-all duration-200 ease-out cursor-pointer",
        error && "border-error-500 focus:ring-error-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;