import { AsideImage } from "./AsideImage";
import { BlurImage } from "./BlurImage";
import { FullCode, type FullCodeProps } from "./FullCode";

export const mdxComponents = {
  BlurImage,
  AsideImage,
  FullCode: (props: FullCodeProps) => <FullCode {...props} />,
};
