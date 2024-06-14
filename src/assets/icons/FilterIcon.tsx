import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const FilterIcon = ({
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
      d="M8.857 12.506C6.37 10.646 4.596 8.6 3.627 7.45c-.3-.356-.398-.617-.457-1.076-.202-1.572-.303-2.358.158-2.866C3.788 3 4.604 3 6.234 3h11.532c1.63 0 2.445 0 2.906.507.461.508.36 1.294.158 2.866-.06.459-.158.72-.457 1.076-.97 1.152-2.747 3.202-5.24 5.065a1.05 1.05 0 0 0-.402.747c-.247 2.731-.475 4.227-.617 4.983-.229 1.222-1.96 1.957-2.888 2.612-.552.39-1.222-.074-1.293-.678a196.402 196.402 0 0 1-.674-6.917 1.049 1.049 0 0 0-.402-.755Z"
    />
  </svg>
)
export default FilterIcon
