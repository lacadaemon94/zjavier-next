import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  href: string;
  icon?: JSX.Element;
  ariaLabel: string;
};

const NavButton = ({icon, href, ariaLabel }: Props) => {
  const pathname = usePathname();
  const isActive = (): boolean => {
    return pathname === href;
  };

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-isactive={isActive() ? "true" : "false"}
    >
      {icon}
    </Link>
  );
};

export default NavButton;
