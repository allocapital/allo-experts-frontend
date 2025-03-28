import { ReactNode } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "px-5 py-3.5 w-fit text-center rounded-lg font-mono font-medium leading-none flex-shrink-0 transition-all duration-300",
  variants: {
    type: {
      primary:
        "bg-green-700 hover:bg-green-500 text-white border-[2px] border-green-700 hover:border-green-500",
      secondary:
        "border-[2px] border-green-700 text-green-700 bg-transparent hover:text-white hover:bg-green-700",
      tertiary:
        "border-[2px] border-yellow-200 text-yellow-200 text-yellow-200 bg-transparent hover:text-black hover:bg-yellow-200",
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
  type: "primary" | "secondary" | "tertiary";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
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
