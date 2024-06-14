"use client";
// Core
import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Utils
// Ui Elements
// Assets
// Styles
import styles from "../../styles/dropdown.module.css";

export type DropDownProps = {
  icon?: JSX.Element;
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
      <div
        ref={ref}
        className={styles.dropdown}
        title={title}
        aria-label={ariaLabel}
        onClick={toggleDropdown}
      >
        {icon && <span>{icon}</span>}
        {text && <p>{text}</p>}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.optionscontainer}
              initial={{
                opacity: 0,
                y: -16,
                filter: "blur(3px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", duration: 0.5 },
              }}
              exit={{
                y: -10,
                opacity: 0,
                filter: "blur(5px)",
                transition: { type: "spring", duration: 0.5 },
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

DropDown.displayName = "DropDown";

export default DropDown;
