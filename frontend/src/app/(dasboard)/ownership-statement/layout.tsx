import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Ownership Statement | Shovexa",
  description:
    "Read the Shovexa Ownership Statement to understand our intellectual property rights, trademarks, website content ownership, brand assets, and legal information for shovexa.com.",
  keywords: [
    "ownership statement",
    "intellectual property",
    "content rights",
    "legal information",
    "shovexa",
    "shovexa.com",
    "Shovexa ownership",
    "Shovexa ownership statement",
    "Shovexa intellectual property",
    "Shovexa trademarks",
    "Shovexa copyright",
    "Shovexa legal",
    "Shovexa content",
    "Shovexa brand",
    "Shovexa website",
    "Shovexa ecommerce",
    "Shovexa online shopping",
    "Shovexa Pakistan",
    "website ownership",
    "brand ownership",
    "copyright policy",
    "trademark policy",
    "online shopping Pakistan",
    "Pakistan ecommerce"
  ],
  alternates: {
    canonical: "/ownership-statement",
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