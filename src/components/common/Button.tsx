import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  variant?: "primary" | "outline";
  loading?: boolean;
}

export const Button = ({
  text,
  children,
  variant = "primary",
  className = "",
  loading = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-8 py-3 rounded-full font-extrabold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 font-tech flex items-center justify-center min-w-[150px]";

  const variantStyles =
    variant === "primary"
      ? "bg-brand-accent text-slate-900 hover:brightness-110 shadow-lg shadow-brand-accent/20"
      : "border-2 border-brand-accent text-brand-accent hover:bg-brand-accent/10";

  const isDisabled = loading || props.disabled;

  return (
    <button
      {...props} // type="submit" funciona corretamente
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles} ${className} ${
        isDisabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Enviando...
        </span>
      ) : (
        children || text
      )}
    </button>
  );
};
