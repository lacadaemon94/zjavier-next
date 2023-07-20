import * as React from "react"
import { SVGProps } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const LogoIcon = ({
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
      strokeWidth={0.387}
      d="m6.546 13.354.2.749m5.519-6.695a5.812 5.812 0 0 1 5.811 5.812c0 3.21-1.149 6.78-4.359 6.78-2.408 0-5.291-2.01-6.581-4.369a1.937 1.937 0 0 1-.506-3.84 5.814 5.814 0 0 1 5.635-4.383Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.258}
      d="M14.662 15.045c.795.253 1.298.078 1.51-.525.316-.905-1.364-1.605-.804-2.269M12.676 16.61c.662.161 1.227.242 1.695.242.468 0 .872-.08 1.211-.242"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.194}
      d="M16.526 12.057a.775.775 0 1 0 0-1.55.775.775 0 0 0 0 1.55Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.194}
      d="M15.848 10.944a2.458 2.458 0 0 0 1.356 0"
    />
    <path
      fill="currentColor"
      d="M16.526 11.428a.242.242 0 1 0 0-.484.242.242 0 0 0 0 .484Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.194}
      d="M13.185 12.082a.775.775 0 1 0 0-1.55.775.775 0 0 0 0 1.55Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.194}
      d="M12.507 10.968c.226.064.452.097.678.097.226 0 .452-.033.678-.097"
    />
    <path
      fill="currentColor"
      d="M13.185 11.452a.242.242 0 1 0 0-.484.242.242 0 0 0 0 .484Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.258}
      d="M13.766 10.338c-.117-.161-.31-.242-.581-.242-.271 0-.594.08-.969.242M15.945 10.338c.117-.161.31-.242.581-.242.271 0 .594.08.969.242"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.065}
      d="M14.609 11.312c-.042.065-.072.186-.088.362h-.211c-.07-.655-.535-.995-1.392-1.018-.716-.046-1.144.242-1.285.863h-.282l-.37-.362v-.57c.787-.195 1.433-.275 1.937-.241.37.025.806.117 1.323.233l.192.043c.089.02.23.043.423.069l.05-.007c.167-.023.291-.044.372-.062l.215-.049c.508-.113.937-.202 1.3-.227.5-.034 1.137.044 1.913.236l.024.005v.57l-.37.362h-.282c-.14-.621-.569-.909-1.285-.863-.849.023-1.312.356-1.39.999l-.002.02h-.21l-.003-.023c-.017-.164-.045-.277-.086-.34-.041-.064-.12-.114-.237-.152l-.01-.003c-.122.038-.204.09-.246.155Z"
      clipRule="evenodd"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.097}
      d="M11.633 11.511c0 .897.428 1.346 1.285 1.346s1.321-.397 1.392-1.19M18.078 11.511c0 .897-.428 1.346-1.285 1.346s-1.321-.397-1.391-1.19"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.065}
      d="m11.2 10.556-4.723.775-.097.218 4.82-.484v-.509Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.194}
      d="M14.468 4.623c1.909.827 2.753 1.94 2.858 2.785.071.578-.066 1.191-.412 1.84-1.405-.16-2.51-.072-3.318.267-1.602.673-3.249.633-4.94-.121.199.823.388 1.477.291 2.373-.064.597-.258 1.51-.581 2.736-.59-1.327-.96-2.094-1.114-2.3-.153-.207-.46-.352-.92-.436-.372-1.382-.678-2.034-.436-3.1.242-1.065 1.136-2.245 2.155-2.566.114-.036-.047-.263-.484-.678 1.217-.363 2.091-.572 2.623-.627.187-.02.12-.263-.202-.73 1.715-.18 3.208.006 4.48.557Z"
      clipRule="evenodd"
    />
  </svg>
)
export default LogoIcon
