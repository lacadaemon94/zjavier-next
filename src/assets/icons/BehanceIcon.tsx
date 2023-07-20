import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const BehanceIcon = ({
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
      d="M10.795 11.581s1.183-.088 1.183-1.475-.968-2.064-2.194-2.064H5.751v7.751h4.033s2.462.078 2.462-2.287c0 0 .108-1.925-1.451-1.925Zm-1.3-2.16h.29s.548 0 .548.806-.323.923-.689.923H7.528V9.42h1.966Zm.175 4.995H7.528v-2.072h2.256s.817-.01.817 1.065c0 .906-.61 1-.93 1.007Zm5.86-4.402c-2.98 0-2.978 2.979-2.978 2.979s-.204 2.962 2.978 2.962c0 0 2.652.152 2.652-2.06h-1.364s.046.832-1.242.832c0 0-1.365.092-1.365-1.348h4.017s.44-3.364-2.698-3.364Zm-1.333 2.33s.166-1.194 1.364-1.194c1.197 0 1.182 1.194 1.182 1.194h-2.546Zm2.863-2.89h-3.197v-.955h3.197v.955Z"
    />
  </svg>
)
export default BehanceIcon
