import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const GridIcon = ({
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
      d="M6 3.6A2.4 2.4 0 0 0 3.6 6v2.4A2.4 2.4 0 0 0 6 10.8h2.4a2.4 2.4 0 0 0 2.4-2.4V6a2.4 2.4 0 0 0-2.4-2.4H6Zm0 9.6a2.4 2.4 0 0 0-2.4 2.4V18A2.4 2.4 0 0 0 6 20.4h2.4a2.4 2.4 0 0 0 2.4-2.4v-2.4a2.4 2.4 0 0 0-2.4-2.4H6ZM13.2 6a2.4 2.4 0 0 1 2.4-2.4H18A2.4 2.4 0 0 1 20.4 6v2.4a2.4 2.4 0 0 1-2.4 2.4h-2.4a2.4 2.4 0 0 1-2.4-2.4V6Zm0 9.6a2.4 2.4 0 0 1 2.4-2.4H18a2.4 2.4 0 0 1 2.4 2.4V18a2.4 2.4 0 0 1-2.4 2.4h-2.4a2.4 2.4 0 0 1-2.4-2.4v-2.4Z"
    />
  </svg>
)
export default GridIcon
