import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Manage Sellers | shovexa.com",
  description:
    "View, approve, or remove sellers from the platform. Manage seller accounts and performance on shovexa.com.",
  keywords: [
    "manage sellers",
    "seller dashboard",
    "admin sellers",
    "seller management",
    "shovexa.com"
  ],
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <div className="">

      <main className="flex-grow">
        {children}
      </main>
    </div>


  )
}
