import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Request a Store | shovexa.com",
  description:
    "Submit a request to open your own store on shovexa.com and start selling your products online.",
  keywords: [
    "request store",
    "open store",
    "seller registration",
    "become a seller",
    "shovexa.com"
  ],
  alternates: {
    canonical: "/request-store",
  },
};





export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
   <main className="">{children}</main>
   
  );
}
