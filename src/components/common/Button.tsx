import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import LoadingImage from "./LoadingImage";

type Color = "primary" | "danger" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  color?: Color;
  isLoading?: boolean;
  className?: string;
}

export const Button = ({
  name,
  color = "primary",
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "text-white rounded-lg w-full px-4 py-2 disabled:bg-opacity-50 font-bold flex justify-center items-center",
        {
          "bg-primary hover:bg-primary-medium-light": color === "primary",
          "bg-red-600 hover:bg-red-500": color === "danger",
          "bg-green-700 hover:bg-green-600": color === "success",
        },
        className
      )}
      {...props}
    >
      {isLoading ? <LoadingImage height={20} /> : name}
    </button>
  );
};
