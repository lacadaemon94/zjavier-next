// Core
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Ui Elements
import Button from "./buttons/Button";

export type Option = {
  name?: string;
  icon?: JSX.Element;
};

type Props = {
  options: Option[];
  icon?: JSX.Element;
  text?: string;
  className: string;
  optionsIcon: boolean;
  setSelected: (selected: Option) => void;
};

export const DropDown = ({
  options,
  icon,
  text,
  className,
  optionsIcon,
  setSelected,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setIsOpen(!isOpen);
    setSelected(option);
  }

  return (
    <div className={className}>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <div data-ddcwrapper>
          {icon && <div data-ddicon>{icon}</div>}
          {text && <div data-ddtext>{text}</div>}
        </div>
      </Button>
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            data-ddoptions
            layout
            initial={{ scaleX: 0.3, scaleY: 0.4, opacity: 0.5 }}
            animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            exit={{ scaleX: 0.3, scaleY: 0.2, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.4 }}
          >
            {options.map((option, index) => (
              <button key={index} data-ddoptionwrapper onClick={() => handleOptionClick(option)}>
                {optionsIcon && <div data-ddopticon>{option.icon}</div>}
                <p data-ddoptname>{option.name}</p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
