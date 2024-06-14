import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const TutorialIcon = ({
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M2 11c2.332-2.442 5.643-2.557 8 0M8.495 4.5c0 1.38-1.12 2.5-2.503 2.5a2.502 2.502 0 0 1-2.504-2.5c0-1.38 1.12-2.5 2.504-2.5a2.502 2.502 0 0 1 2.503 2.5ZM14 22c2.332-2.442 5.643-2.557 8 0m-1.505-6.5c0 1.38-1.12 2.5-2.504 2.5a2.502 2.502 0 0 1-2.503-2.5c0-1.38 1.12-2.5 2.503-2.5a2.502 2.502 0 0 1 2.504 2.5Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 14c0 3.87 3.13 7 7 7l-1-2M15 3h6m-6 3h6m-6 3h3.5"
    />
  </svg>
)
export default TutorialIcon
