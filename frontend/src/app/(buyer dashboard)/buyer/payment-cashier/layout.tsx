import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Payment | shovexa.com",
  description: "Choose your payment method and complete your purchase securely on shovexa.com.",
  keywords: ["payment", "checkout", "cash on delivery", "credit card", "JazzCash", "buyer payment", "shovexa.com"],
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
