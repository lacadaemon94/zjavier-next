import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const AllIcon = ({
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
      d="M3.318 14.236C4.275 15 5.684 15 8.5 15a.5.5 0 0 1 .5.5c0 2.817 0 4.225.764 5.182.163.205.349.391.554.554.957.764 2.366.764 5.182.764 2.817 0 4.225 0 5.182-.764a3.5 3.5 0 0 0 .554-.554C22 19.725 22 18.317 22 15.5c0-2.816 0-4.225-.764-5.182a3.5 3.5 0 0 0-.554-.554C19.725 9 18.317 9 15.5 9a.5.5 0 0 1-.5-.5c0-2.816 0-4.225-.764-5.182a3.5 3.5 0 0 0-.554-.554C12.725 2 11.316 2 8.5 2c-2.816 0-4.225 0-5.182.764a3.5 3.5 0 0 0-.554.554C2 4.275 2 5.684 2 8.5c0 2.816 0 4.225.764 5.182.163.205.349.391.554.554Z"
    />
  </svg>
)
export default AllIcon
