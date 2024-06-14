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
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109C18.717 21.5 16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391C2.5 18.717 2.5 16.479 2.5 12Z"
    />
    <path
      fill="currentColor"
      d="M17 8.75a.75.75 0 0 0 0-1.5v1.5ZM16 8v.75V8Zm-4.75 13.5a.75.75 0 0 0 1.5 0h-1.5ZM10 13.25a.75.75 0 0 0 0 1.5v-1.5Zm5 1.5a.75.75 0 0 0 0-1.5v1.5Zm2-7.5h-1v1.5h1v-1.5ZM11.25 12v9.5h1.5V12h-1.5ZM16 7.25c-.922 0-1.688-.002-2.294.08-.628.084-1.195.27-1.65.725l1.06 1.061c.13-.13.328-.237.79-.3.482-.064 1.13-.066 2.094-.066v-1.5ZM12.75 12c0-.964.002-1.612.066-2.095.063-.461.17-.659.3-.789l-1.06-1.06c-.456.455-.642 1.022-.726 1.65-.082.606-.08 1.372-.08 2.294h1.5ZM10 14.75h5v-1.5h-5v1.5Z"
    />
  </svg>
)
export default FacebookIcon
