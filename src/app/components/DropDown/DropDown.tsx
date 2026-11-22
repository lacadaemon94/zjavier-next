"use client";
// Core
import React, { forwardRef } from "react";
// Styles
import styles from "../../styles/dropdown.module.css";

export type DropDownProps = {
  icon?: React.JSX.Element;
  text?: string;
  title?: string;
  ariaLabel: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleDropdown: () => void;
};

const DropDown = forwardRef<HTMLDivElement, DropDownProps>(
  ({ icon, text, title, ariaLabel, children, isOpen, toggleDropdown }, ref) => {
    return (
      <div ref={ref} className={styles.dropdown}>
        <button
          type="button"
          className={styles.trigger}
          title={title}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={toggleDropdown}
        >
          {icon && <span aria-hidden="true">{icon}</span>}
          {text && <p>{text}</p>}
        </button>
        <div
          className={styles.optionscontainer}
          role="menu"
          data-open={isOpen ? "true" : "false"}
          aria-hidden={!isOpen}
          onClick={toggleDropdown}
        >
          {children}
        </div>
      </div>
    );
  },
);

DropDown.displayName = "DropDown";

export default DropDown;
