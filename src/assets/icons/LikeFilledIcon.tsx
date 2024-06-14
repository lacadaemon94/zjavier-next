import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const LikeFilledIcon = ({
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
      d="M4.145 3.355c2.98-1.828 5.655-1.1 7.27.114.266.2.449.336.585.428.135-.092.318-.229.584-.428 1.615-1.214 4.29-1.942 7.27-.114 2.062 1.265 3.221 3.906 2.814 6.94-.409 3.05-2.382 6.498-6.562 9.592C14.655 20.96 13.59 21.75 12 21.75c-1.59 0-2.656-.789-4.107-1.863-4.18-3.094-6.153-6.543-6.562-9.592-.407-3.034.753-5.675 2.814-6.94Z"
    />
  </svg>
)
export default LikeFilledIcon
