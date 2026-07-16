import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin Order Details | shovexa.com",
  description:
    "View detailed information about a specific order as an admin, including products, quantities, payment, and shipping status on shovexa.com.",
  keywords: [
    "admin order details",
    "order management",
    "order tracking",
    "admin dashboard",
    "shovexa.com"
  ],
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
                      <main className="flex-grow">
              {children}
            </main>

      
  )
}
