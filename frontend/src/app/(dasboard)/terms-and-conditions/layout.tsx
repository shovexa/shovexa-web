import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Terms and Conditions | Shovexa",
  description:
    "Read the Shovexa Terms and Conditions to understand the rules, responsibilities, user obligations, seller policies, and conditions for using shovexa.com.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "user agreement",
    "website terms",
    "shovexa",
    "shovexa.com",
    "Shovexa Terms and Conditions",
    "Shovexa Terms of Service",
    "Shovexa user agreement",
    "Shovexa legal",
    "Shovexa policies",
    "Shovexa website terms",
    "Shovexa seller terms",
    "Shovexa buyer terms",
    "Shovexa marketplace rules",
    "Shovexa ecommerce",
    "Shovexa online shopping",
    "Shovexa Pakistan",
    "online shopping Pakistan",
    "Pakistan ecommerce",
    "website policies",
    "legal agreement",
    "customer terms",
    "seller agreement",
    "usage policy"
  ],
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 

      <main>{children}</main>
   
  );
}