import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  href: string;
  icon?: JSX.Element;
  ariaLabel: string;
  className?: string;
};

const NavButton = ({icon, href, ariaLabel, className }: Props) => {
  const pathname = usePathname();
  const isActive = (): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-isactive={isActive() ? "true" : "false"}
      className={className}
    >
      {icon}
    </Link>
  );
};

export default NavButton;
