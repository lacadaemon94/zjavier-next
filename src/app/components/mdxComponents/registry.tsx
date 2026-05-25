import { AsideImage } from "./AsideImage";
import { BlurImage } from "./BlurImage";
import { FullCode, type FullCodeProps } from "./FullCode";
import { PostCoverImage } from "./PostCoverImage";
import { AIForkDiagram } from "./generated/AIForkDiagram";

export const mdxComponents = {
  BlurImage,
  AsideImage,
  PostCoverImage,
  AIForkDiagram,
  FullCode: (props: FullCodeProps) => <FullCode {...props} />,
};
