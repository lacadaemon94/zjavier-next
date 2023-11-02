// Core
import React, { HTMLInputTypeAttribute, useState, useEffect } from "react";

type Props = {
  type: HTMLInputTypeAttribute;
  id: string;
  label: JSX.Element | string;
  placeholder: string;
  className: string;
  disabled?: boolean;
  pattern?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetTrigger?: boolean;
};

export const Input = ({
  type,
  id,
  label,
  placeholder,
  disabled,
  className,
  pattern,
  value,
  onChange,
  resetTrigger,
}: Props) => {
  const [localValue, setLocalValue] = useState<string>(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    if (resetTrigger) {
      setLocalValue("");
    }
  }, [resetTrigger]);

  return (
    <div className={className}>
      <label htmlFor={id} data-label>
        {label}
      </label>
      <input
        data-input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        disabled={disabled}
        pattern={pattern}
        value={localValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
