import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Shovexa",
  description:
    "Read the Shovexa Privacy Policy to learn how we collect, use, store, and protect your personal information, account data, payment information, and browsing activity on shovexa.com.",
  keywords: [
    "privacy policy",
    "data protection",
    "user information",
    "security",
    "shovexa",
    "shovexa.com",
    "Shovexa Privacy Policy",
    "Shovexa privacy",
    "Shovexa data protection",
    "Shovexa personal information",
    "Shovexa account security",
    "Shovexa customer privacy",
    "Shovexa cookies",
    "Shovexa data security",
    "Shovexa online shopping",
    "Shovexa ecommerce",
    "Shovexa Pakistan",
    "privacy policy Pakistan",
    "online shopping privacy",
    "customer data protection",
    "website privacy policy",
    "secure online shopping",
    "Pakistan ecommerce",
    "GDPR privacy",
    "data privacy"
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 

      <main>{children}</main>
    
  );
}