import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const FacebookIcon = ({
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
      d="M14.594 7.075v1.583h-.936c-.743 0-.883.355-.883.86v1.142h1.765l-.236 1.776h-1.529V17h-1.84v-4.564h-1.53V10.66h1.53V9.347c0-1.518.936-2.347 2.292-2.347.646 0 1.206.043 1.367.075Z"
    />
  </svg>
)
export default FacebookIcon
