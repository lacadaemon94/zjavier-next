import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const TwitterIcon = ({
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
      d="M17.277 8.732c-.299.438-.66.81-1.085 1.118a6.14 6.14 0 0 1-.248 2.019 6.28 6.28 0 0 1-.773 1.665 6.541 6.541 0 0 1-1.236 1.41 5.503 5.503 0 0 1-1.728.977 6.325 6.325 0 0 1-2.163.365 6.007 6.007 0 0 1-3.321-.971c.156.018.33.027.522.027 1.005 0 1.9-.309 2.686-.925a2.11 2.11 0 0 1-1.26-.431 2.117 2.117 0 0 1-.763-1.069c.148.023.284.034.409.034.192 0 .381-.025.569-.074a2.13 2.13 0 0 1-1.242-.746 2.089 2.089 0 0 1-.493-1.377v-.026c.304.17.63.261.978.274a2.16 2.16 0 0 1-.964-1.801c0-.393.098-.757.294-1.092a6.131 6.131 0 0 0 1.973 1.597c.774.4 1.603.622 2.487.667a2.397 2.397 0 0 1-.053-.496c0-.598.21-1.108.633-1.53a2.086 2.086 0 0 1 1.53-.633c.625 0 1.152.228 1.58.683a4.244 4.244 0 0 0 1.373-.522 2.1 2.1 0 0 1-.951 1.192c.415-.045.83-.156 1.245-.335h.001Z"
    />
  </svg>
)
export default TwitterIcon
