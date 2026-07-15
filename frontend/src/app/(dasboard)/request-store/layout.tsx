import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Request a Store | SAADiCcollection.shop",
  description:
    "Submit a request to open your own store on SAADiCcollection.shop and start selling your products online.",
  keywords: [
    "request store",
    "open store",
    "seller registration",
    "become a seller",
    "SAADiCcollection.shop"
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
