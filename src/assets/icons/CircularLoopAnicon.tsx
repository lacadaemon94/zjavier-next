"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const CircularLoopAnicon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <motion.path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M21 12a9 9 0 1 0-.018.563"
      animate={{
        pathLength: [0, 0.15],
        pathOffset: [0, 2],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        type: "spring",
      }}
    />
  </svg>
);
export default CircularLoopAnicon;
