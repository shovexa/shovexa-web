import type { Metadata } from "next";
import Head from "next/head";


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
};





export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <>
      <Head>
        <link rel="canonical" href="https://www.shovexa.com/request-store" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
