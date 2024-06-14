import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const ViewFilledIcon = ({
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
      d="M5.52 6.713C7.226 5.381 9.43 4.25 12 4.25c2.57 0 4.774 1.131 6.48 2.463 1.707 1.333 2.969 2.907 3.675 3.897l.053.074c.253.352.542.754.542 1.316s-.289.964-.542 1.316l-.053.074c-.706.99-1.968 2.564-3.675 3.897-1.706 1.332-3.91 2.463-6.48 2.463-2.57 0-4.774-1.131-6.48-2.463-1.707-1.333-2.969-2.907-3.675-3.896l-.053-.075c-.253-.352-.542-.754-.542-1.316s.289-.964.542-1.316l.053-.074c.706-.99 1.968-2.564 3.675-3.897ZM8.5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ViewFilledIcon
