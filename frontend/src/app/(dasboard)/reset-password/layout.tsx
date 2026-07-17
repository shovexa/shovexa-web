import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | shovexa.com",
  description:
    "Securely reset your shovexa.com account password to regain access to your profile and orders.",
  keywords: [
    "reset password",
    "account recovery",
    "password change",
    "forgot password",
    "shovexa.com"
  ],
  alternates: {
    canonical: "/reset-password",
  },
};




export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

   <main className="">{children}</main>

  );
}
