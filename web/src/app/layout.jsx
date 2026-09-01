import "@fontsource-variable/google-sans-flex";
import "./globals.css";

export const metadata = {
  title: "CLYRA | AI Customer Support & Automation",
  description: "AI customer support, order tracking, and ticket management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
