import type { Metadata } from "next";
import Head from "next/head";



export const metadata: Metadata = {
  title: "Sign Up | shovexa.com",
  description: "Create your account to start selling or shopping on shovexa.com. Join now to manage products, track orders, and explore deals.",
  keywords: ["sign up", "register", "create account", "seller registration", "buyer registration", "shovexa.com"],
};




export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <>
      <Head>
        <link rel="canonical" href="https://www.shovexa.com/sign-up" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
