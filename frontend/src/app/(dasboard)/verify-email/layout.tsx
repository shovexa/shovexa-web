import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Verify Email | shovexa.com",
  description:
    "Verify your email address to activate your shovexa.com account and start shopping or selling securely.",
  keywords: [
    "verify email",
    "email verification",
    "account activation",
    "secure login",
    "shovexa.com"
  ],
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
