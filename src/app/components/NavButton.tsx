"use client";
// Core
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// Utils
// Ui Elements
// Styles
import styles from "../styles/navlink.module.css";
// Assets

type Props = {
  href: string;
  icon?: JSX.Element;
  text?: string;
  ariaLabel: string;
  className?: string;
};

const NavButton = ({ icon, href, ariaLabel, className, text }: Props) => {
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
      className={className ? className : styles.navlink}
    >
      {icon && <span>{icon}</span>}
      {text && <p>{text}</p>}
    </Link>
  );
};

export default NavButton;
