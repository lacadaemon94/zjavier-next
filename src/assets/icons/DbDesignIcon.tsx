import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const DbDesignIcon = ({
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
    <ellipse cx={12} cy={5} stroke="currentColor" strokeWidth={1.5} rx={8} ry={3} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7 10.842c.602.18 1.274.33 2 .44"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M20 12c0 1.657-3.582 3-8 3s-8-1.343-8-3"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7 17.842c.602.18 1.274.33 2 .44"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M20 5v14c0 1.657-3.582 3-8 3s-8-1.343-8-3V5"
    />
  </svg>
)
export default DbDesignIcon
