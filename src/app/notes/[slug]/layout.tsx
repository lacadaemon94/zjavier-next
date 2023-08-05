// Posts Layout

// Posts Styles
import "../../styles/posts.module.css";

export const metadata = {
  title: "Javier Flores | Full Stack Developer",
  description:
    "Full Stack Developer from El Salvador, +3 Years of experience as a Full Stack Developer; I really like the entire journey of taking an idea and transforming it into a compelling digital brand.",
  applicationName: "ZJAVIER",
  generator: "Next.js",
  keywords: [
    "ZJAVIER",
    "Javier",
    "Flores",
    "Full",
    "Stack",
    "Developer",
    "ES",
    "El",
    "Salvador",
    "Desarrollador",
    "Web",
    "Aplicaciones",
    "Salvadoreno",
    "Salvadoran",
  ],
  authors: [{ name: "Javier Flores", url: "https://zjavier.com" }],
  colorScheme: "dark",
  creator: "Javier Flores",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      nocache: true,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6FBFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0C" },
  ],
  manifest: "http://localhost:3000/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
        {children}
    </main>
  );
}
