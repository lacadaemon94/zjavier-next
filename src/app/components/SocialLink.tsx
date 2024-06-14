// Core
import React from "react";
// Utils
// Ui Elements
// Assets
// Styles
import styles from "../styles/sociallink.module.css";

type SocialLinkProps = {
  icon?: JSX.Element;
  text?: string;
  href: string;
  ariaLabel: string;
  className?: string;
};

const SocialLink = ({
  icon,
  href,
  ariaLabel,
  className,
  text,
}: SocialLinkProps) => {
  return (
    <a
      className={className ? className : styles.sociallink}
      href={href}
      aria-label={ariaLabel}
      rel="noopener noreferrer"
      target="_blank"
    >
      {icon && <span>{icon}</span>}
      {text && <p>{text}</p>}
    </a>
  );
};

export default SocialLink;
