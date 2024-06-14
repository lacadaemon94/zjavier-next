"use client";
// Core
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Utils
// Ui Elements
// Assets
// Styles
import styles from "../styles/badge.module.css";

type BadgeProps = {
  icon: JSX.Element;
  tooltipText: string;
};

const Badge = ({ icon, tooltipText }: BadgeProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className={styles.badge}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{icon}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles.tooltip}
            initial={{ scale: 0.3, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 15 }}
            transition={{
              type: "spring",
              duration: 0.3,
            }}
          >
            <p>{tooltipText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Badge;
