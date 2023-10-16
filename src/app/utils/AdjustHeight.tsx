// AdjustHeight.tsx
"use client"; // indicate that this is a client component

import { useEffect } from "react";


type Props = {
    isNote: boolean;
};

export const AdjustHeight = ({ isNote }: Props) => {
  useEffect(() => {
    const hwrapperDiv = document.getElementById("content") as HTMLElement;

    if (hwrapperDiv) {
      if (isNote) {
          hwrapperDiv.style.height = 'fit-content';
      } else {
          hwrapperDiv.style.height = '';
      }
    }
  }, [isNote]);

  return null; // This component doesn't render anything.
};