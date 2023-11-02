// Core
import React from "react";
import { Option } from "./DropDown";

type Props = {
  options: Option[];
  selectedOption: Option;
  className: string;
};

export const DropDownPill = ({ options, selectedOption, className }: Props) => {
  const selected = options.find(
    (option) => option.name === selectedOption.name
  );

  return (
    <div className={className}>
      {selected && (
        <>
          <div data-selectedicon>{selected.icon}</div>
          <p data-selectedname>{selected.name}</p>
        </>
      )}
    </div>
  );
};
