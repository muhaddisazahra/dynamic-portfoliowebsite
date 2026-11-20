
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhaddisa Zahra | Personal Portfolio",
  description:
    "Personal portfolio of Muhaddisa Zahra, Pharm-D graduate exploring Agentic AI, healthcare technology and web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
