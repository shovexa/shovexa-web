import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Shipping Details | shovexa.com",
  description: "Add or select your delivery address, review order summary, and proceed to payment on shovexa.com.",
  keywords: ["shipping", "delivery address", "order summary", "checkout", "buyer shipping", "shovexa.com"],
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
