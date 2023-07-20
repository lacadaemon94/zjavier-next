import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const DesktopIcon = ({
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
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.6 6A2.4 2.4 0 0 1 6 3.6h12A2.4 2.4 0 0 1 20.4 6v9.6A2.4 2.4 0 0 1 18 18h-2.664l.148.587.964.965A1.2 1.2 0 0 1 15.6 21.6H8.4a1.2 1.2 0 0 1-.848-2.048l.964-.965.148-.587H6a2.4 2.4 0 0 1-2.4-2.4V6Zm6.925 8.4H6V6h12v8.4h-7.475Z"
      clipRule="evenodd"
    />
  </svg>
)
export default DesktopIcon
