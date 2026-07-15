import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Shipping Policy | SAADiCcollection.shop",
  description:
    "Read the SAADiCcollection.shop shipping policy to learn about delivery times, shipping methods, and order tracking details.",
  keywords: [
    "shipping policy",
    "delivery information",
    "order tracking",
    "shipping rates",
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
        <link rel="canonical" href="https://www.shovexa.com/shipping-policy" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
