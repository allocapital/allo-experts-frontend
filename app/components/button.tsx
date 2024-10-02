import { ReactNode } from "react";
import { tv } from "tailwind-variants";

// interface ButtonProps {
//   isLoading?: boolean;
//   disabled?: boolean;
//   className?: string;
//   buttonVariant?: "primary" | "secondary";
// }

const button = tv({
  base: "px-5 py-3.5 w-fit text-center rounded-lg font-mono font-medium leading-none flex-shrink-0 transition-all duration-300",
  variants: {
    type: {
      primary:
        "bg-green-700 hover:bg-green-500 text-white border-[2px] border-green-700 hover:border-green-500",
      secondary:
        "border-[2px] border-green-700 text-green-700 bg-transparent hover:text-white hover:bg-green-700",
    },
    isLoading: {
      true: "opacity-50",
    },
  },
});

export const Button = ({
  type,
  onClick,
  isLoading,
  className,
  children,
}: {
  type: "primary" | "secondary";
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <button
      disabled={!!isLoading}
      onClick={onClick}
      className={`${button({ type, isLoading: !!isLoading })} ${className}`}
    >
      {children}
    </button>
  );
};
