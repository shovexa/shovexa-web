import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Login | Shovexa",
  description:
    "Securely log in to your Shovexa account to shop online, manage orders, save addresses, access your wishlist, or manage your seller store.",
  keywords: [
    "login",
    "seller login",
    "buyer login",
    "account access",
    "shovexa",
    "shovexa.com",
    "Shovexa login",
    "Shovexa account",
    "Shovexa sign in",
    "Shovexa secure login",
    "Shovexa seller login",
    "Shovexa buyer login",
    "Shovexa customer login",
    "Shovexa online shopping",
    "Shovexa ecommerce",
    "Shovexa store",
    "Shovexa marketplace",
    "Shovexa Pakistan",
    "Shovexa orders",
    "Shovexa account access",
    "online shopping Pakistan",
    "Pakistan ecommerce",
    "secure account login",
    "customer account"
  ]
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.shovexa.com/login" />
      </Head>

      <main>{children}</main>
    </>
  );
}