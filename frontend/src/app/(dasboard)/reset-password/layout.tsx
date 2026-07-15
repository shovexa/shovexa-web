import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Reset Password | SAADiCcollection.shop",
  description:
    "Securely reset your SAADiCcollection.shop account password to regain access to your profile and orders.",
  keywords: [
    "reset password",
    "account recovery",
    "password change",
    "forgot password",
    "SAADiCcollection.shop"
  ],
};




export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <>
      <Head>
        <link rel="canonical" href="https://www.shovexa.com/reset-password" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
