import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sarra — Creative Developer & Multidisciplinary Designer",
    template: "%s — Sarra",
  },
  description:
    "Sarra is a creative developer and multidisciplinary designer combining AI, web development, UI/UX, illustration, product design, and 3D.",
};

export const viewport: Viewport = {
  themeColor: "#fbf8f5",
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('usagi-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
