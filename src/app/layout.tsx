import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HustleOS | Premium Lifetime-Licensed Career Tools",
  description: "Automate your career with premium desktop applications. Pay once, use forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30`}>
        <Navbar />
        <main className="flex-1 pt-16 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
