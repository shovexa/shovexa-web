import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Contact Us | Shovexa",
  description:
    "Contact Shovexa for help with orders, shipping, returns, payments, products, seller inquiries, or your account. Our support team is here to assist you.",
  keywords: [
    "contact",
    "support",
    "customer service",
    "help center",
    "contact shovexa",
    "shovexa",
    "shovexa.com",
    "Shovexa Pakistan",
    "Shovexa support",
    "Shovexa customer service",
    "Shovexa contact",
    "Shovexa help",
    "Shovexa support team",
    "Shovexa order support",
    "Shovexa delivery support",
    "Shovexa shipping support",
    "Shovexa returns",
    "Shovexa refunds",
    "Shovexa seller support",
    "Shovexa online shopping",
    "Shovexa ecommerce",
    "online shopping Pakistan",
    "Pakistan ecommerce",
    "customer support Pakistan"
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

      <main>{children}</main>
    </>
  );
}