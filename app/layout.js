import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Creaut Bali - Digital Creative Agency",
  description:
    "Video Production, Social Media Management, Visual Photography & Branding. Bali-based creative agency.",

  icons: {
    icon: "/image/logo/logo.webp",
    shortcut: "/image/logo/logo.webp",
    apple: "/image/logo/logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}