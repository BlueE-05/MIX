import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIX",
  description: "CRM by RAYDEV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
