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
      <body>
        <main className="grid grid-rows-[60px,1fr,60px] p-4 m-auto gap-4 max-w-screen-lg min-h-screen">
          <nav className="flex items-center text-2xl">NavBar</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center">Footer</footer>
        </main>
      </body>
    </html>
  );
}
