import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { GoogleAnalytics } from "@next/third-parties/google";

// Prevent FontAwesome from dynamically adding its css since it's already imported
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tangail Space",
  description: "Easy way to share and find home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
        <GoogleAnalytics gaId="G-93J7TGVM84" />
      </html>
    </Providers>
  );
}
