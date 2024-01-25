import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Store ALR",
  description: "Book Store by AlbertLnz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
