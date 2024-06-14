// Core
import React from "react";
// Utils
// Ui Elements
// Assets
// Styles
import styles from "../../styles/dropdown.module.css";

export type DropDownOption = {
  icon?: JSX.Element;
  text?: string;
  title?: string;
  ariaLabel: string;
  action: () => void;
  isActive: boolean;
};

const DropDownOption = ({
  icon,
  text,
  title,
  ariaLabel,
  action,
  isActive,
}: DropDownOption) => {
  return (
    <div
      className={styles.ddoption}
      title={title}
      aria-label={ariaLabel}
      onClick={action}
      data-isactive={isActive}
    >
      {icon && <span>{icon}</span>}
      {text && <p>{text}</p>}
    </div>
  );
};

export default DropDownOption;
