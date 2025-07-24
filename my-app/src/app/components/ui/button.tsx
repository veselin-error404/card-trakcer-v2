import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "px-4 py-2 rounded-md font-semibold transition-colors";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700"
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className || ""}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
