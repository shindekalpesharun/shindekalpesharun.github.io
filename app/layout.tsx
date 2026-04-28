import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Shindekalpesharun OS | Portfolio',
  description: 'Interactive portfolio of Kalpesh Shinde - Full-Stack & Android Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0 overflow-hidden">{children}</body>
    </html>
  );
}