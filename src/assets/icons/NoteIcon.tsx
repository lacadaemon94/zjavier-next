import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const NoteIcon = ({
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
      d="m12.88 7.017 4.774 1.271m-5.796 2.525 2.386.636m-2.268 6.517.955.255c2.7.72 4.05 1.079 5.114.468 1.063-.61 1.425-1.953 2.148-4.637l1.023-3.797c.724-2.685 1.085-4.027.471-5.085-.614-1.057-1.963-1.417-4.664-2.136l-.954-.255c-2.7-.72-4.05-1.079-5.113-.468-1.064.61-1.426 1.953-2.15 4.637l-1.022 3.797c-.724 2.685-1.086 4.027-.471 5.085.614 1.057 1.964 1.417 4.663 2.136Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m12 20.946-.952.26c-2.694.733-4.04 1.1-5.102.477-1.06-.622-1.422-1.991-2.143-4.729l-1.021-3.87c-.722-2.738-1.083-4.107-.47-5.185C2.842 6.966 4 7 5.5 7"
    />
  </svg>
)
export default NoteIcon
