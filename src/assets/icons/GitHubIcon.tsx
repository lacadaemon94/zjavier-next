import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const GitHubIcon = ({
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
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 20.567c-3.429 1.158-6.286 0-8-3.567"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 22v-3.242c0-.598.184-1.118.48-1.588.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2.166-.236.25-.354.27-.46.02-.108-.015-.247-.085-.527-.283-1.136-.264-2.343.16-3.43 0 0 .877-.287 2.874.96.456.285.684.428.885.46.2.032.469-.035 1.005-.169A9.532 9.532 0 0 1 13.5 3c.852 0 1.609.098 2.343.28.536.134.805.2 1.006.169.2-.032.428-.175.884-.46 1.997-1.247 2.874-.96 2.874-.96.424 1.087.443 2.294.16 3.43-.07.28-.104.42-.084.526.02.107.103.225.269.461.668.95 1.048 2.04 1.048 3.2 0 4.462-2.134 5.807-5.177 6.643-.367.101-.507.559-.303.88.296.47.48.99.48 1.589V22"
    />
  </svg>
)
export default GitHubIcon
