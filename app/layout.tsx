import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme.provider";
import { siteConfig } from "@/config/site.config";
import CommunityBanner from "@/components/custom/community.banner";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.origin,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.og,
        width: 2880,
        height: 1800,
        alt: siteConfig.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.socials.x,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: siteConfig.og,
      width: 2880,
      height: 1800,
      alt: siteConfig.name,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {/* Floating Community Banner */}
          <div className="hidden md:block fixed top-0 left-0 w-full z-[5000]">
            <CommunityBanner />
          </div>

          {/* Push content down to prevent overlap */}
          <div className="md:pt-10 lg:max-w-20xl mx-auto px-6 xl:px-30">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
