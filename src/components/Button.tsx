import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  color?: string;
}

export const Button = ({ name, color = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-lg w-full px-4 py-2 disabled:bg-opacity-50 font-bold",
        {
          "bg-primary": color === "primary",
          "hover:bg-primary-medium-light": color === "primary",
          "text-white": color === "primary" || color === "danger",
          "bg-red-600": color === "danger",
          "hover:bg-red-500": color === "danger",
        }
      )}
      {...props}
    >
      {name}
    </button>
  );
};
