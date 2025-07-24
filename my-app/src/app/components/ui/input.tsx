import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
