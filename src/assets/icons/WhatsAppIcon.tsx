import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const WhatsAppIcon = ({
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
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.379.28 2.693.784 3.888.279.66.418.99.436 1.24.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204.25.018.58.157 1.24.436A9.97 9.97 0 0 0 12 22Z"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="m8.588 12.377.871-1.081c.367-.456.82-.88.857-1.488.008-.153-.1-.841-.315-2.218C9.916 7.049 9.41 7 8.973 7c-.57 0-.855 0-1.138.13-.358.163-.725.622-.806 1.007-.064.305-.016.515.079.935.402 1.783 1.347 3.544 2.811 5.009 1.465 1.464 3.226 2.409 5.01 2.811.42.095.629.143.934.079.385-.08.844-.448 1.008-.806.129-.283.129-.568.129-1.138 0-.438-.049-.943-.59-1.028-1.377-.216-2.065-.323-2.218-.315-.607.036-1.032.49-1.488.857l-1.081.87"
    />
  </svg>
)
export default WhatsAppIcon
