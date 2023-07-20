import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const GithubIcon = ({
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
      d="M12 6.95c-2.875 0-5.05 2.333-5.05 5.05 0 2.355 1.631 4.257 3.624 4.845v-.928c0-.747.385-1.041.385-1.041-1.653-.182-2.627-.974-2.627-2.853 0-1.02.611-1.563.611-1.563s-.317-.588.046-1.517c.566-.135 1.607.59 1.607.59s.544-.205 1.427-.205 1.426.204 1.426.204 1.042-.724 1.608-.589c.362.929.045 1.517.045 1.517s.611.544.611 1.563c0 1.879-.973 2.671-2.626 2.853 0 0 .385.294.385 1.041v.928c1.97-.611 3.577-2.468 3.577-4.845 0-2.717-2.173-5.05-5.049-5.05ZM12 6c3.306 0 6 2.694 6 6s-2.694 6-6 6a6.01 6.01 0 0 1-6-6c0-3.306 2.694-6 6-6Z"
    />
  </svg>
)
export default GithubIcon
