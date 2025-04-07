import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "confirm";
}

export default function Button(props: PropsWithChildren<Props>) {
  const {
    variant = "default",
    type = "button",
    children,
    ...buttonProps
  } = props;

  const buttonClassNames = classNames({
    "border-2": true,
    "rounded-lg": true,
    "px-10": true,
    "py-3": true,
    "text-sm": true,
    "font-bold": true,
    "cursor-pointer": true,
    ...(!buttonProps.disabled &&
      variant === "default" && {
        "text-black": true,
        "bg-gray-100": true,
        "hover:bg-gray-200": true,
      }),
    ...(!buttonProps.disabled &&
      variant === "confirm" && {
        "text-white": true,
        "bg-blue-700": true,
        "hover:bg-blue-800": true,
      }),
    ...(buttonProps.disabled && {
      "bg-gray-600": true,
      "hover:bg-gray-700": true,
      "cursor-not-allowed": true,
    }),
  });

  return (
    <button className={buttonClassNames} {...buttonProps} type={type}>
      {children}
    </button>
  );
}
