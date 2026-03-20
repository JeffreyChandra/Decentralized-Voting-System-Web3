// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "../app/components/Web3Provider"; // Import Provider kamu

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voting System Web3",
  description: "Decentralized Voting App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* KUNCINYA ADA DI SINI: Web3Provider harus membungkus children */}
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}