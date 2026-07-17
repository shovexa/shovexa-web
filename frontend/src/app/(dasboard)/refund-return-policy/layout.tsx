import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Refund and Return Policy | Shovexa",
  description:
    "Read the Shovexa Refund and Return Policy to learn about returns, refunds, exchanges, eligibility, processing times, damaged items, cancellations, and customer support for orders placed on shovexa.com.",
  keywords: [
    "refund policy",
    "return policy",
    "exchange policy",
    "order refund",
    "shovexa",
    "shovexa.com",
    "Shovexa Refund Policy",
    "Shovexa Return Policy",
    "Shovexa Exchange Policy",
    "Shovexa refunds",
    "Shovexa returns",
    "Shovexa order returns",
    "Shovexa return process",
    "Shovexa refund process",
    "Shovexa customer support",
    "Shovexa shopping",
    "Shovexa online shopping",
    "Shovexa ecommerce",
    "Shovexa Pakistan",
    "return request",
    "refund request",
    "damaged product return",
    "online shopping returns",
    "Pakistan ecommerce",
    "customer refund policy"
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
        <link
          rel="canonical"
          href="https://www.shovexa.com/refund-return-policy"
        />
      </Head>

      <main>{children}</main>
    </>
  );
}