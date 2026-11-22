import type { PostLanguage } from "@/app/lib/posts/types";
import { AsideImage } from "./AsideImage";
import { BlurImage } from "./BlurImage";
import { FullCode, type FullCodeProps } from "./FullCode";
import { PostCoverImage } from "./PostCoverImage";
import {
  AIForkDiagram,
  type AIForkDiagramProps,
} from "./generated/AIForkDiagram";

export function createMdxComponents(language: PostLanguage = "es") {
  return {
    BlurImage,
    AsideImage,
    PostCoverImage,
    AIForkDiagram: (props: AIForkDiagramProps) => (
      <AIForkDiagram locale={language} {...props} />
    ),
    FullCode: (props: FullCodeProps) => <FullCode {...props} />,
  };
}

export const mdxComponents = createMdxComponents();
