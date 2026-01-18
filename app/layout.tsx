import type { Metadata } from "next";
import { Kanit, Pacifico } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "OrangeLeafy - Digital Solutions",
  description: "OrangeLeafy - Professional digital solutions. Crafting modern digital experiences with cutting-edge technologies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${kanit.variable} ${pacifico.variable}`} suppressHydrationWarning>
      <body
        className="font-sans font-light antialiased"
        style={{ fontFamily: 'var(--font-kanit), sans-serif' }}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
