import type { Metadata } from "next";


export const metadata:Metadata = {
  title: "My Orders | shovexa.com",
  description:
    "View and manage your pending and delivered orders. Access your favorites and cart products on shovexa.com.",
  keywords: [
    "buyer orders",
    "pending orders",
    "delivered orders",
    "favorites",
    "cart",
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
