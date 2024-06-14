import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const TelegramIcon = ({
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
      d="m11.985 15.408 3.242 3.686c1.2 1.365 1.801 2.048 2.43 1.881.628-.166.844-1.064 1.275-2.861l2.39-9.968c.665-2.768.997-4.151.259-4.834-.738-.683-2.017-.175-4.575.84L5.14 8.865c-2.046.813-3.069 1.219-3.134 1.917a1.177 1.177 0 0 0 0 .214c.063.699 1.084 1.108 3.128 1.927.925.371 1.388.557 1.72.912.038.04.073.082.108.124.306.38.436.88.697 1.876l.489 1.867c.253.97.38 1.456.713 1.522.333.066.622-.336 1.201-1.141l1.924-2.674Zm0 0-.317-.33c-.362-.378-.543-.566-.543-.8 0-.235.18-.423.543-.8l3.573-3.724"
    />
  </svg>
)
export default TelegramIcon
