import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FooterComponent from "./components/footers/footer.component";
import SideWhatsappIconComponent from "./components/SideWhatsappIcon.component";
import BuyerNavbarComponent from "./components/navbars/BuyerNavbar.component";
import { Suspense } from "react";
import Loading from "./components/Loading.component";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shovexa",
  description: "Buy electronics, fashion, home items, and daily essentials.",
  keywords: [
    "online store",
    "electronics",
    "fashion",
    "home products",
    "best prices",
    "shovexa"
  ],
  openGraph: {
    title: "shovexa",
    description: "Shop electronics, fashion, and home items.",
    images: [
      {
        url: "/og-image1.jpg",
        width: 1200,
        height: 630,
        alt: "shovexa Store"
      },
      {
        url: "/og-image2.jpg",
        width: 1200,
        height: 630,
        alt: "Sapizo Store"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "shovexa",
    description: "Shop electronics, fashion, and home items.",
    images: ["/og-image1.jpg"]
  }
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
