import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",

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
    "customer support Pakistan",
  ],

  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}