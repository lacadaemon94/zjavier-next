import React, { useState, useEffect, useReducer } from "react";
import {
  FormAction,
  FormState,
  formReducer,
  initialState,
} from "@/app/utils/formReducer";

type Props = {
  className?: string;
  id: string;
  label: string;
  minLength: number;
  maxLength: number;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetTrigger?: boolean;
  value?: string;
  state: FormState;
};

export const TextArea = ({
  className,
  id,
  label,
  minLength,
  maxLength,
  placeholder,
  autoComplete,
  onChange,
  resetTrigger,
  value,
  state,
}: Props) => {
  const [localValue, setLocalValue] = useState<string>(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        name={id}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={handleInputChange}
        value={localValue}
      ></textarea>
      <div
        data-counter
        style={{
          color: state.values.message.length >= 250 ? "#ff1c22" : "#a8a8a8",
        }}
      >
        {state.values.message.length}/250
      </div>
    </div>
  );
};
