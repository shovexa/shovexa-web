import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Shovexa",
  description:
    "Create your Shovexa account to shop online, sell products, manage orders, save your wishlist, and enjoy a secure ecommerce experience on shovexa.com.",
  keywords: [
    "sign up",
    "register",
    "create account",
    "seller registration",
    "buyer registration",
    "shovexa",
    "shovexa.com",
    "Shovexa Sign Up",
    "Shovexa Register",
    "Shovexa account",
    "Shovexa registration",
    "Shovexa seller registration",
    "Shovexa buyer registration",
    "Shovexa create account",
    "Shovexa online shopping",
    "Shovexa ecommerce",
    "Shovexa marketplace",
    "Shovexa Pakistan",
    "Shovexa store",
    "join Shovexa",
    "online shopping Pakistan",
    "Pakistan ecommerce",
    "secure account registration",
    "customer registration",
    "seller account"
  ],
  alternates: {
    canonical: "/sign-up",
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