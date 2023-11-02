import React from "react";

type Props = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
  active?: string;
};

const Button = ({
  type,
  disabled = false,
  onClick,
  ariaLabel,
  className,
  children,
  active,
}: Props) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      data-isactive={active}
    >
      {children}
    </button>
  );
};

export default Button;
