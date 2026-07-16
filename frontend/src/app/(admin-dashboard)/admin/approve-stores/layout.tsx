import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Approve Stores | shovexa.com",
  description:
    "Review and approve new store requests from sellers. Manage store verification and activation on shovexa.com.",
  keywords: [
    "approve stores",
    "store approval",
    "seller stores",
    "admin panel",
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
