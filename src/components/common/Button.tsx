import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Color = "primary" | "danger" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  color?: Color;
  className?: string;
}

export const Button = ({
  name,
  color = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "text-white rounded-lg w-full px-4 py-2 disabled:bg-opacity-50 font-bold",
        {
          "bg-primary hover:bg-primary-medium-light": color === "primary",
          "bg-red-600 hover:bg-red-500": color === "danger",
          "bg-green-700 hover:bg-green-600": color === "success",
        },
        className
      )}
      {...props}
    >
      {name}
    </button>
  );
};
