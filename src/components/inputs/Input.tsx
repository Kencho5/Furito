import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "w-full", ...props }, ref) => {
    const styles = [
      // Base styles
      "h-11 rounded-2xl border px-3.5 py-2.5 outline-none text-sm sm:text-base",
      // Placeholder styles
      "placeholder:font-normal placeholder:text-neutral-400",
      // Error/Focus styles
      error
        ? "border-orange-500 focus:border-orange-500 focus:ring-0"
        : "border-neutral-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400",
      // Custom className
      className,
    ].join(" ");

    return <input ref={ref} {...props} className={styles} />;
  },
);

Input.displayName = "Input";
