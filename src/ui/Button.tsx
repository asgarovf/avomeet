import { ComponentPropsWithoutRef, useMemo } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  color?: "primary" | "secondary";
}

export const Button = (props: Props) => {
  const { children, className, color = "primary", ...rest } = props;

  const colorBasedClasses = useMemo(() => {
    if (color === "primary") {
      return "bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700";
    } else if (color === "secondary") {
      return "bg-gray-600 border-gray-600 hover:bg-gray-700 hover:border-gray-700";
    }
  }, [color]);

  return (
    <button
      className={`relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white border rounded-full ${colorBasedClasses} ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
