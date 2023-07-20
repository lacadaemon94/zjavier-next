import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const ListIcon = ({
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
      d="M3.6 4.8a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 1 1 0 2.4H4.8a1.2 1.2 0 0 1-1.2-1.2Zm0 4.8a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 1 1 0 2.4H4.8a1.2 1.2 0 0 1-1.2-1.2Zm0 4.8a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 1 1 0 2.4H4.8a1.2 1.2 0 0 1-1.2-1.2Zm0 4.8A1.2 1.2 0 0 1 4.8 18h14.4a1.2 1.2 0 1 1 0 2.4H4.8a1.2 1.2 0 0 1-1.2-1.2Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ListIcon
