import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`h-11 w-full rounded-2xl border px-3.5 py-2.5 outline-none placeholder:font-normal placeholder:text-neutral-400 ${
          error
            ? "border-orange-500 focus:border-orange-500 focus:ring-0"
            : "border-neutral-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
        }`}
      />
    );
  },
);
