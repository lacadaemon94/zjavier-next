import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const TikTokIcon = ({
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
      d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109C18.717 21.5 16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391C2.5 18.717 2.5 16.479 2.5 12Z"
    />
    <path
      fill="currentColor"
      d="M10.394 11.778a.75.75 0 0 0 .212-1.485l-.212 1.485ZM17.5 10.25a.75.75 0 0 0 0-1.5v1.5ZM14.25 6a.75.75 0 0 0-1.5 0h1.5Zm-1.5 8.5A2.75 2.75 0 0 1 10 17.25v1.5a4.25 4.25 0 0 0 4.25-4.25h-1.5ZM10 17.25a2.75 2.75 0 0 1-2.75-2.75h-1.5A4.25 4.25 0 0 0 10 18.75v-1.5ZM7.25 14.5A2.75 2.75 0 0 1 10 11.75v-1.5a4.25 4.25 0 0 0-4.25 4.25h1.5ZM10 11.75c.134 0 .266.01.394.028l.212-1.485A4.276 4.276 0 0 0 10 10.25v1.5Zm7.5-3c-.775 0-1.608-.32-2.244-.85-.636-.532-1.006-1.212-1.006-1.9h-1.5c0 1.245.664 2.315 1.544 3.05.88.736 2.048 1.2 3.206 1.2v-1.5ZM12.75 6v8.5h1.5V6h-1.5Z"
    />
  </svg>
)
export default TikTokIcon
