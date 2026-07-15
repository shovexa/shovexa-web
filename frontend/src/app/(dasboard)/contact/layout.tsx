import type { Metadata } from "next";
import Head from "next/head";


export const metadata:Metadata = {
  title: "Contact Us | SAADiCcollection.shop",
  description:
    "Get in touch with SAADiCcollection.shop support team for help with orders, products, or account-related questions.",
  keywords: [
    "contact",
    "support",
    "customer service",
    "help center",
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
        <link rel="canonical" href="https://www.shovexa.com/contact" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
