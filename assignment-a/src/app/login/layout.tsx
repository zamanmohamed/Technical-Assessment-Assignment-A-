import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BootstrapClient from "@/components/BootstrapClient";
import Script from "next/script";
import Head from "next/head";

// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
