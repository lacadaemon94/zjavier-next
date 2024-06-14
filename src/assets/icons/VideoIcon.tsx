import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const VideoIcon = ({
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
      d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12Zm12.257-3.014.082.051c.681.422 1.25.773 1.662 1.1.424.338.797.737.931 1.292.09.375.09.768 0 1.142-.134.556-.507.954-.931 1.292-.412.327-.98.679-1.662 1.1l-.082.05c-.657.407-1.208.748-1.665.96-.463.214-.992.376-1.543.206a2.125 2.125 0 0 1-.944-.604c-.372-.409-.494-.942-.55-1.476-.055-.532-.055-1.22-.055-2.056v-.086c0-.837 0-1.524.055-2.056.056-.533.178-1.067.55-1.476.256-.28.58-.492.944-.604.551-.17 1.08-.008 1.543.207.457.211 1.008.552 1.665.958Z"
      clipRule="evenodd"
    />
  </svg>
)
export default VideoIcon
