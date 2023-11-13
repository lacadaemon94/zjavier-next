import { ImageResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export const runtime = "edge";

export const contentType = "image/png";

// Font
const museoModerno = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/MuseoModerno-Bold.ttf`);
    return res.arrayBuffer();
  };
const museoModernoThin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/MuseoModerno-Thin.ttf`);
    return res.arrayBuffer();
  };

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const alt = "Javier Notes";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OpenGraph({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post.slug === params.slug);
  const boldFont = await museoModerno()
  const thinFont = await museoModernoThin()

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
                borderRadius: "36px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://zjavier.com/OG_Icon.png"
                alt="OG Icon"
                width={96}
                height={96}
                style={{
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "3em",
                color: "rgba(246, 251, 252, 0.35)",
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
                fontWeight: '100',
              }}
            >
              <p>zjavier.com</p>
              <p>•</p>
              <p>6 Ago</p>
              <p>•</p>
              <p>#tag1</p>
              <p>•</p>
              <p>#tag2</p>
              <p>•</p>
              <p>#tag3</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
            name: 'MuseoModerno',
            data: boldFont,
            style: 'normal',
            weight: 800
        },
        {
            name: 'MuseoModerno',
            data: thinFont,
            style: 'normal',
            weight: 100
        },
      ],
    }
  );
}
