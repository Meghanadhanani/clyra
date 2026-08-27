import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLYRA",
  description: "AI customer support and order tracking",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
