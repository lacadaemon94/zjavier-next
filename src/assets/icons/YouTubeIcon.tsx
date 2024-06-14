import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const YouTubeIcon = ({
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
      strokeWidth={1.5}
      d="M12 20.5c1.81 0 3.545-.179 5.153-.507 2.01-.41 3.014-.614 3.93-1.792.917-1.179.917-2.532.917-5.238v-1.926c0-2.706 0-4.06-.917-5.238-.916-1.178-1.92-1.383-3.93-1.792A25.884 25.884 0 0 0 12 3.5c-1.81 0-3.545.179-5.153.507-2.01.41-3.014.614-3.93 1.792C2 6.978 2 8.331 2 11.036v1.928c0 2.705 0 4.058.917 5.237.916 1.178 1.92 1.383 3.93 1.792 1.608.328 3.343.507 5.153.507Z"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.962 12.313c-.148.606-.938 1.04-2.517 1.911-1.718.947-2.577 1.42-3.272 1.237a1.692 1.692 0 0 1-.635-.317C9 14.709 9 13.806 9 12s0-2.709.538-3.144c.182-.147.4-.256.635-.317.695-.183 1.554.29 3.272 1.237 1.58.87 2.369 1.305 2.517 1.911.05.206.05.42 0 .626Z"
    />
  </svg>
)
export default YouTubeIcon
