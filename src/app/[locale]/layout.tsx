import React from "react";
import { notFound } from "next/navigation";
import { Outfit, MuseoModerno } from "next/font/google";
import type { Metadata } from "next";
import { LOCALES, isLocale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { SplashScreen } from "@/app/components/SplashScreen/SplashScreen";
import "@/app/styles/globals.css";

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

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

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

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} ${museoModerno.variable}`}>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
