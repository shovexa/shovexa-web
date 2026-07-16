import type { Metadata } from "next";

export const metadata: Metadata = {
title: "Order Details | shovexa.com",
  description: "View product details, choose quantity, and proceed to checkout securely on shovexa.com.",
  keywords: ["order details", "product information", "checkout", "shovexa.com"],
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
