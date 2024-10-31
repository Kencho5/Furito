import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <p className="mb-2">{label}</p>
        <input
          ref={ref}
          {...props}
          className={`h-11 w-full rounded-2xl border px-3.5 py-2.5 outline-none placeholder:font-normal placeholder:text-neutral-400 ${
            error ? "border-orange-500" : "border-neutral-200"
          }`}
        />
      </div>
    );
  },
);
