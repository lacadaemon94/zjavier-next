// Root Layout
import { SessionProvider } from "./utils/SessionProvider";

// Global Styles
import "./styles/globals.css";

// Global Assets
import { Outfit } from "next/font/google";

// Global Elements
import { Topbar } from "./components/Topbar/Topbar";
import { Leftbar } from "./components/LeftBar/LeftBar";

const outfit = Outfit({
  subsets: ["latin-ext"],
  display: "swap",
  variable: '--font-outfit'
});

export const metadata = {
  title: {
    template: 'Javier Flores | %s',
    default: "Full Stack Developer",
  },
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
  manifest: "https://zjavier.com/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <SessionProvider>
          <Topbar></Topbar>
          <div className='hwrapper' id="content">
            <Leftbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
