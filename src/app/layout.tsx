// Root Layout
import { SessionProvider } from "./utils/SessionProvider";
import { getI18n } from "./i18n/server";

// Global Styles
import "./styles/globals.css";

// Global Assets
import { Outfit, MuseoModerno } from "next/font/google";
import type { Metadata } from "next";

// Global Elements

const outfit = Outfit({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-outfit",
});

const museoModerno = MuseoModerno({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-museoModerno",
});

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return {
    title: {
      template: "Javier Flores | %s",
      default: dictionary.metadata.defaultTitle,
    },
    description: dictionary.metadata.description,
    applicationName: "ZJAVIER",
    generator: "Next.js",
    keywords: [...dictionary.metadata.keywords],
    authors: [{ name: "Javier Flores", url: "https://zjavier.com" }],
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
    manifest: "https://zjavier.com/manifest.json",
    metadataBase: new URL("https://zjavier.com"),
  };
}

export const viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6FBFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0C" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = await getI18n();

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} ${museoModerno.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
