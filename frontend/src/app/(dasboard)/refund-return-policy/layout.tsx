import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Refund and Return Policy | shovexa.com",
  description:
    "Review the shovexa.com refund and return policy to understand how refunds, exchanges, and returns are handled for your orders.",
  keywords: [
    "refund policy",
    "return policy",
    "exchange policy",
    "order refund",
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
        <link rel="canonical" href="https://www.shovexa.com/refund-return-policy" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
