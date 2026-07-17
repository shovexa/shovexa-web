import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Shipping Policy | Shovexa",
  description:
    "Read the Shovexa Shipping Policy to learn about delivery times, shipping methods, shipping charges, order processing, tracking, and nationwide delivery for orders placed on shovexa.com.",
  keywords: [
    "shipping policy",
    "delivery information",
    "order tracking",
    "shipping rates",
    "shovexa",
    "shovexa.com",
    "Shovexa Shipping Policy",
    "Shovexa shipping",
    "Shovexa delivery",
    "Shovexa order tracking",
    "Shovexa shipping charges",
    "Shovexa delivery times",
    "Shovexa nationwide delivery",
    "Shovexa Pakistan",
    "Shovexa ecommerce",
    "Shovexa online shopping",
    "Shovexa orders",
    "Shovexa courier",
    "Shovexa parcel tracking",
    "Pakistan shipping",
    "online shopping Pakistan",
    "delivery policy",
    "shipping information",
    "fast delivery Pakistan",
    "Pakistan ecommerce"
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

      <main>{children}</main>
    </>
  );
}