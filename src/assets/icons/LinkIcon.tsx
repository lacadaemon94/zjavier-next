import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const LinkIcon = ({
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
      d="M15.162 5.444a2.4 2.4 0 1 1 3.394 3.394l-3.6 3.6a2.4 2.4 0 0 1-3.394 0 1.2 1.2 0 0 0-1.697 1.697 4.8 4.8 0 0 0 6.788 0l3.6-3.6a4.8 4.8 0 0 0-6.788-6.788l-1.8 1.8a1.199 1.199 0 0 0 1.308 1.966 1.2 1.2 0 0 0 .39-.269l1.8-1.8Zm-6 6a2.4 2.4 0 0 1 3.394 0 1.199 1.199 0 1 0 1.697-1.697 4.8 4.8 0 0 0-6.788 0l-3.6 3.6a4.8 4.8 0 1 0 6.788 6.788l1.8-1.8a1.2 1.2 0 1 0-1.697-1.697l-1.8 1.8a2.4 2.4 0 1 1-3.394-3.394l3.6-3.6Z"
      clipRule="evenodd"
    />
  </svg>
)
export default LinkIcon
