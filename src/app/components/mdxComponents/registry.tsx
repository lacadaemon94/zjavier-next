import type { PostLanguage } from "@/app/lib/posts/types";
import type { Locale } from "@/app/i18n/config";
import { AsideImage } from "./AsideImage";
import { BlurImage } from "./BlurImage";
import { CodeBlock, type CodeBlockProps } from "./CodeBlock";
import { FullCode, type FullCodeProps } from "./FullCode";
import { PostCoverImage } from "./PostCoverImage";
import {
  AIForkDiagram,
  type AIForkDiagramProps,
} from "./generated/AIForkDiagram";
import { RiemannPrimeStaircase } from "./generated/RiemannPrimeStaircase";
import { RiemannCriticalLineMap } from "./generated/RiemannCriticalLineMap";
import { RiemannProofArchitecture } from "./generated/RiemannProofArchitecture";
import { OwlCamInterceptMap } from "./generated/OwlCamInterceptMap";
import { OwlCamDualPathTopology } from "./generated/OwlCamDualPathTopology";
import { OwlCamAiPipeline } from "./generated/OwlCamAiPipeline";

type MdxUiLabels = {
  copyCode?: string;
  copiedCode?: string;
  selectFile?: string;
};

export function createMdxComponents(
  language: PostLanguage = "es",
  uiLocale: Locale = language,
  labels: MdxUiLabels = {},
) {
  const copyLabel = labels.copyCode ?? (uiLocale === "es" ? "Copiar" : "Copy");
  const copiedLabel =
    labels.copiedCode ?? (uiLocale === "es" ? "Copiado" : "Copied");
  const selectFileLabel =
    labels.selectFile ??
    (uiLocale === "es" ? "Selecciona un archivo:" : "Select a File:");

  return {
    BlurImage,
    AsideImage,
    PostCoverImage,
    AIForkDiagram: (props: AIForkDiagramProps) => (
      <AIForkDiagram locale={language} {...props} />
    ),
    RiemannPrimeStaircase,
    RiemannCriticalLineMap,
    RiemannProofArchitecture,
    OwlCamInterceptMap,
    OwlCamDualPathTopology,
    OwlCamAiPipeline,
    FullCode: (props: FullCodeProps) => (
      <FullCode selectFileLabel={selectFileLabel} {...props} />
    ),
    pre: (props: CodeBlockProps) => (
      <CodeBlock
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
        {...props}
      />
    ),
  };
}

export const mdxComponents = createMdxComponents();
