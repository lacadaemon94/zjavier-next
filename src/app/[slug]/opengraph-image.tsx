/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
import { allPosts } from "contentlayer/generated";
import format from "date-fns/format";

export const runtime = "edge";

export const contentType = "image/png";

export const alt = "Javier Notes";
export const size = {
  width: 1200,
  height: 630,
};

// Font
const museoModerno = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/MuseoModerno-Bold.ttf`
  );
  return res.arrayBuffer();
};
const museoModernoThin = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/MuseoModerno-Thin.ttf`
  );
  return res.arrayBuffer();
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function OpenGraph({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post.slug === params.slug);
  const boldFont = await museoModerno();
  const thinFont = await museoModernoThin();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          zIndex: "3",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "1200px",
            height: "630px",
            padding: "48px 48px 96px 48px",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            overflow: "hidden",
            zIndex: "3",
          }}
        >
          <img
            src="https://zjavier.com/OG_BG.png"
            alt="Background"
            width={1200}
            height={630}
            style={{
              display: "flex",
              position: "absolute",
              objectFit: "fill",
              objectPosition: "center",
              zIndex: "0",
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              flexWrap: "nowrap",
              width: "360px",
              height: "360px",
              borderRadius: "180px",
              border: "1px solid #FA541C",
              top: "-6rem",
              left: "-6rem",
              opacity: "0.5",
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              flexWrap: "nowrap",
              width: "720px",
              height: "720px",
              borderRadius: "360px",
              border: "1px solid #FA541C",
              top: "-17rem",
              left: "-15rem",
              opacity: "0.5",
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              flexWrap: "nowrap",
              width: "930px",
              height: "930px",
              borderRadius: "468px",
              border: "1px solid #FA541C",
              top: "-20rem",
              left: "-18rem",
              opacity: "0.5",
            }}
          />
          <div
            style={{
              display: "flex",
              position: "relative",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                flexWrap: "nowrap",
                width: "96px",
                height: "96px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "36px",
                border: "1px solid #FA541C",
                padding: "3px",
              }}
            >
              <img
                src="https://zjavier.com/OG_Icon.png"
                alt="OG Icon"
                width={128}
                height={128}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "3em",
                color: "rgba(246, 251, 252, 0.75)",
                textAlign: "right",
                fontWeight: "800",
              }}
            >
              Javier
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              flexWrap: "nowrap",
              width: "100%",
              height: "auto",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: "3em",
                fontWeight: "800",
              }}
            >
              {post && post.title}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                alignSelf: "stretch",
                color: "#fff",
                fontSize: "1.5em",
                fontWeight: "100",
              }}
            >
              <p>zjavier.com</p>
              <p>•</p>
              <p>{post && format(new Date(post.publishedAt), "MMM dd")}</p>
              <p>•</p>
              <p>{post && post.tags[0]}</p>
              <p>•</p>
              <p>{post && post.tags[1]}</p>
              <p>•</p>
              <p>{post && post.tags[2]}</p>
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
    }
  );
}
