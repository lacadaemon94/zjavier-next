// Core
import React from "react";

type Props = {
  icon?: JSX.Element;
  value: string;
  className?: string;
};

export const DetailPill = ({ icon, value, className }: Props) => {
  return (
    <div className={className}>
      <div data-icon>{icon}</div>
      <p data-value>{value}</p>
    </div>
  );
};
