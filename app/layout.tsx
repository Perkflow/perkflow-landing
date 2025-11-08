import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perkflow - Employee Recognition & Rewards Platform",
  description: "Transform your workplace culture with Perkflow's comprehensive employee recognition and rewards platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
