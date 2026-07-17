import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterComponent from "./components/footers/footer.component";
import SideWhatsappIconComponent from "./components/SideWhatsappIcon.component";
import BuyerNavbarComponent from "./components/navbars/BuyerNavbar.component";
import { Suspense } from "react";
import Loading from "./components/Loading.component";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shovexa.com"),

  title: {
    default: "Shovexa",
    template: "%s | Shovexa",
  },

  description:
    "Shovexa is an online shopping marketplace in Pakistan where customers can buy electronics, fashion, home essentials, and more from trusted sellers.",

  keywords: [
    "Shovexa",
    "Shovexa Pakistan",
    "online shopping Pakistan",
    "Pakistan ecommerce",
    "electronics",
    "fashion",
    "home essentials",
    "online marketplace",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://www.shovexa.com",
    siteName: "Shovexa",
    title: "Shovexa",
    description:
      "Shop electronics, fashion, home essentials, and more from trusted sellers.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shovexa",
    description:
      "Shop electronics, fashion, home essentials, and more from trusted sellers.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<Loading/>}>
          <div className="flex flex-col justify-between  h-auto min-h-screen">
            <div className="relative">
              <BuyerNavbarComponent />
              <div className="fixed bottom-4 right-4 z-50">
                <SideWhatsappIconComponent />
              </div>
            </div>

            <main className="flex-grow">
              {children}
            </main>
            <div >

            <FooterComponent />
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  )
}
