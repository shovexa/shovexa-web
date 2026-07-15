import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Login | SAADiCcollection.shop",
  description: "Access your seller or buyer account. Secure login to manage your store, track orders, and shop on SAADiCcollection.shop.",
  keywords: ["login", "seller login", "buyer login", "account access", "SAADiCcollection.shop"]
};

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.shovexa.com/login" />
      </Head>
      <main>{children}</main>
    </>
  );
}
