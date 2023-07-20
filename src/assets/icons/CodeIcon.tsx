import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const CodeIcon = ({
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
      d="M14.78 3.661a1.2 1.2 0 0 1 .759 1.518l-4.8 14.4a1.2 1.2 0 0 1-2.278-.758l4.8-14.4a1.201 1.201 0 0 1 1.518-.76Zm-7.932 3.89a1.2 1.2 0 0 1 0 1.697L4.097 12l2.751 2.752a1.2 1.2 0 1 1-1.696 1.696l-3.6-3.6a1.2 1.2 0 0 1 0-1.696l3.6-3.6a1.2 1.2 0 0 1 1.696 0Zm10.304 0a1.2 1.2 0 0 1 1.696 0l3.6 3.6a1.2 1.2 0 0 1 0 1.697l-3.6 3.6a1.2 1.2 0 1 1-1.696-1.696L19.903 12l-2.751-2.752a1.2 1.2 0 0 1 0-1.696Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CodeIcon
