import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Buyers | shovexa.com",
  description:
    "View and manage all registered buyers on shovexa.com. Monitor activity, handle account issues, and maintain a secure shopping environment.",
  keywords: [
    "manage buyers",
    "buyer accounts",
    "admin dashboard",
    "user management",
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
