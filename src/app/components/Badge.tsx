// Core
import React from "react";
// Styles
import styles from "../styles/badge.module.css";

type BadgeProps = {
  icon: React.JSX.Element;
  tooltipText: string;
};

const Badge = ({ icon, tooltipText }: BadgeProps) => {
  return (
    <div className={styles.badge} tabIndex={0} aria-label={tooltipText}>
      <span aria-hidden="true">{icon}</span>
      <div className={styles.tooltip} role="tooltip">
        <p>{tooltipText}</p>
      </div>
    </div>
  );
};

export default Badge;
