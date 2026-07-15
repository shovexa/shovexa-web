import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Privacy Policy | SAADiCcollection.shop",
  description:
    "Read the SAADiCcollection.shop privacy policy to understand how we collect, use, and protect your personal information.",
  keywords: [
    "privacy policy",
    "data protection",
    "user information",
    "security",
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
        <link rel="canonical" href="https://www.shovexa.com/privacy-policy" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
