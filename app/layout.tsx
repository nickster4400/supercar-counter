import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supercar Counter - Miami Economy Index",
  description: "Track Miami's economy through live supercar counting - The Pentagon Pizza Index for luxury cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
