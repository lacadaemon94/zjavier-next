/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import type { Post } from "./types";
import { formatLocalizedDate } from "@/app/i18n/date";

export const openGraphContentType = "image/png";

export const wideOpenGraphSize = {
  width: 1200,
  height: 630,
};

export const squareOpenGraphSize = {
  width: 1080,
  height: 1080,
};

type OpenGraphVariant = "wide" | "square";

async function loadFont(fileName: string) {
  return fs.readFile(path.join(process.cwd(), "public", fileName));
}

function getPostLanguageLabel(post: Post) {
  return post.language === "es" ? "SPA" : "ENG";
}

function getVariantCopy(post: Post) {
  if (post.language === "es") {
    return {
      eyebrow: "Notas de Javier",
      language: "Español",
      date: formatLocalizedDate(new Date(post.publishedAt), "MMM dd", post.language),
    };
  }

  return {
    eyebrow: "Javier Notes",
    language: "English",
    date: formatLocalizedDate(new Date(post.publishedAt), "MMM dd", post.language),
  };
}

export async function renderPostOpenGraphImage(
  post: Post,
  variant: OpenGraphVariant,
) {
  const size = variant === "square" ? squareOpenGraphSize : wideOpenGraphSize;
  const isSquare = variant === "square";
  const [boldFont, thinFont] = await Promise.all([
    loadFont("MuseoModerno-Bold.ttf"),
    loadFont("MuseoModerno-Thin.ttf"),
  ]);
  const copy = getVariantCopy(post);
  const visibleTags = post.tags.slice(0, isSquare ? 4 : 3);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#0C0C0C",
          color: "#F6FBFC",
          fontFamily: "MuseoModerno",
        }}
      >
        <img
          src="https://zjavier.com/OG_BG.png"
          alt=""
          width={size.width}
          height={size.height}
          style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.56,
          }}
        />

        <div
          style={{
            display: "flex",
            position: "absolute",
            width: isSquare ? "820px" : "930px",
            height: isSquare ? "820px" : "930px",
            borderRadius: "999px",
            border: "1px solid rgba(250, 84, 28, 0.5)",
            top: isSquare ? "-220px" : "-320px",
            left: isSquare ? "-240px" : "-290px",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: isSquare ? "540px" : "720px",
            height: isSquare ? "540px" : "720px",
            borderRadius: "999px",
            border: "1px solid rgba(250, 84, 28, 0.42)",
            right: isSquare ? "-260px" : "-180px",
            bottom: isSquare ? "-220px" : "-360px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
            height: "100%",
            padding: isSquare ? "64px" : "48px 48px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <img
                src="https://zjavier.com/OG_Icon.png"
                alt=""
                width={isSquare ? 92 : 76}
                height={isSquare ? 92 : 76}
                style={{
                  border: "1px solid #FA541C",
                  borderRadius: "24px",
                  padding: "3px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "rgba(246, 251, 252, 0.72)",
                    fontSize: isSquare ? "28px" : "24px",
                    fontWeight: 100,
                  }}
                >
                  {copy.eyebrow}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#FA541C",
                    fontSize: isSquare ? "22px" : "18px",
                    fontWeight: 800,
                  }}
                >
                  {getPostLanguageLabel(post)} · {copy.language}
                </p>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                color: "rgba(246, 251, 252, 0.72)",
                fontSize: isSquare ? "34px" : "42px",
                fontWeight: 800,
              }}
            >
              Javier
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isSquare ? "28px" : "20px",
              width: "100%",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#fff",
                fontSize: isSquare ? "74px" : "54px",
                lineHeight: 1.03,
                fontWeight: 800,
                letterSpacing: "0",
                maxWidth: isSquare ? "930px" : "980px",
              }}
            >
              {post.title}
            </h1>

            {post.excerpt && isSquare && (
              <p
                style={{
                  margin: 0,
                  color: "rgba(246, 251, 252, 0.76)",
                  fontSize: "30px",
                  lineHeight: 1.34,
                  fontWeight: 100,
                  maxWidth: "880px",
                }}
              >
                {post.excerpt}
              </p>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                color: "rgba(246, 251, 252, 0.78)",
                fontSize: isSquare ? "24px" : "22px",
                fontWeight: 100,
              }}
            >
              <span>zjavier.com</span>
              <span style={{ color: "#FA541C" }}>•</span>
              <span>{copy.date}</span>
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "flex",
                    border: "1px solid rgba(250, 84, 28, 0.34)",
                    borderRadius: "999px",
                    padding: "8px 14px",
                    color: "#F6FBFC",
                    background: "rgba(250, 84, 28, 0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "MuseoModerno",
          data: boldFont,
          style: "normal",
          weight: 800,
        },
        {
          name: "MuseoModerno",
          data: thinFont,
          style: "normal",
          weight: 100,
        },
      ],
    },
  );
}
