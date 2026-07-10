"use client";

import React from "react";

type Props = {
  label: string;
  className?: string;
};

const PrintButton = ({ label, className }: Props) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.print()}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default PrintButton;
