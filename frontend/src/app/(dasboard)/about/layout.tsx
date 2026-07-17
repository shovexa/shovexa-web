import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Shovexa, our mission, values, and commitment to providing a trusted online shopping experience in Pakistan. Discover how Shovexa connects buyers and sellers through a secure ecommerce marketplace.",

  keywords: [
    "about us",
    "about shovexa",
    "shovexa",
    "shovexa.com",
    "Shovexa Pakistan",
    "Shovexa ecommerce",
    "Shovexa online shopping",
    "Shovexa marketplace",
    "Shovexa mission",
    "Shovexa vision",
    "Shovexa company",
    "Shovexa story",
    "Shovexa team",
    "Shovexa brand",
    "Shovexa platform",
    "trusted online shopping",
    "Pakistan ecommerce",
    "online shopping Pakistan",
    "buy online Pakistan",
    "ecommerce platform",
    "online marketplace",
    "fashion marketplace Pakistan",
    "secure online shopping",
    "Shovexa buyers",
    "Shovexa sellers",
  ],

  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}