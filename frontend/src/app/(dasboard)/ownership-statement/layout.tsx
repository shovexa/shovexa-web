import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Ownership Statement | SAADiCcollection.shop",
  description:
    "Learn about the ownership and rights of SAADiCcollection.shop, including trademarks, content usage, and intellectual property information.",
  keywords: [
    "ownership statement",
    "intellectual property",
    "content rights",
    "SAADiCcollection.shop",
    "legal information"
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
        <link rel="canonical" href="https://www.shovexa.com/ownership-statement" />
      </Head>
   <main className="">{children}</main>
   </>
     
  );
}
