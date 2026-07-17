import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Shovexa",
  description:
    "Verify your email address to activate your Shovexa account, secure your profile, and start shopping or selling on shovexa.com.",
  keywords: [
    "verify email",
    "email verification",
    "account activation",
    "secure login",
    "shovexa",
    "shovexa.com",
    "Shovexa Verify Email",
    "Shovexa email verification",
    "Shovexa account verification",
    "Shovexa account activation",
    "Shovexa secure account",
    "Shovexa verification",
    "Shovexa customer account",
    "Shovexa seller account",
    "Shovexa buyer account",
    "Shovexa login",
    "Shovexa sign up",
    "Shovexa online shopping",
    "Shovexa ecommerce",
    "Shovexa Pakistan",
    "email confirmation",
    "verify account",
    "secure account verification",
    "online shopping Pakistan",
    "Pakistan ecommerce"
  ],
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}