import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-500",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "transition-all duration-200 ease-out",
        error && "border-error-500 focus:ring-error-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;