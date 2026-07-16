import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product | shovexa.com",
  description: "Add new products to your store. Manage product details, pricing, and inventory on shovexa.com.",
  keywords: ["create product", "add product", "seller dashboard", "inventory management", "shovexa.com"],
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
