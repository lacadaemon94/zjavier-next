// Core
import React from "react";

type Props = {
  icon?: JSX.Element;
  value?: string;
  className?: string;
};

export const DetailPill = ({ icon, value, className }: Props) => {
  return (
    <div className={className}>
      {icon && <span>{icon}</span>}
      {value && <p>{value}</p>}
    </div>
  );
};
