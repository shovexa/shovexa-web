"use client"
import { JSX, useState, FormEvent } from "react"
import {
  // FaFacebookF,
  // FaInstagram,
  // FaTelegramPlane,
  // FaTwitter,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCreditCard
} from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import PolicyLinksCoponent from "../PolicyLinks.coponent"
import { usePathname } from "next/navigation"

const Footer = () => {
  const [email, setEmail] = useState("")
  const year = new Date().getFullYear()
  const pathName = usePathname();
  const roleRoutes = ["/admin"];
  const socialLinks: {
  href: string;
  icon: JSX.Element;
}[] = [
  {
    href: "https://wa.me/03334186523 ",
    icon: <FaWhatsapp />,
  },
  // {
  //   href: "https://t.me/SaadiCollection",
  //   icon: <FaTelegramPlane />,
  // },
  {
    href: "https://www.youtube.com/@NimiSaleem",
    icon: <FaYoutube />,
  },
  // {
  //   href: "https://facebook.com/profile.php?id=61579311066499",
  //   icon: <FaFacebookF />,
  // },
  // {
  //   href: "https://instagram.com/saadicollection313",
  //   icon: <FaInstagram />,
  // },
  {
    href: "https://tiktok.com/@adamkibeti86",
    icon: <FaTiktok />,
  },
  // {
  //   href: "https://x.com/sadicollection1",
  //   icon: <FaTwitter />,
  // },
  {
    href: "mailto:shovexa@gmail.com",
    icon: <FaEnvelope />,
  },
];
  const adminRoute = roleRoutes.some(route => pathName.startsWith(route));
  const authRoutes = ["/sign-up", "/verify-email", "/reset-password",
    "/seller/status/pending",
    "/seller/status/suspended",
    "/seller/status/blocked", 
    "/login"];
  const isAuthRoute = authRoutes.includes(pathName);
  if (adminRoute) {
    return;
  }
  const submitNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.")
      return
    }
    alert(`Thanks — ${email} subscribed.`)
    setEmail("")
  }

  return (
    <>
      {
        !isAuthRoute && 
        <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white border-t border-slate-800">
  {/* gray Top Border */}
  <div className="h-1 w-full bg-gradient-to-r from-gray-500 via-amber-400 to-gray-500" />

  {/* Background Glow */}
  <div className="absolute -top-40 -left-32 w-96 h-96 bg-gray-500/10 blur-[140px] rounded-full" />
  <div className="absolute bottom-0 -right-40 w-96 h-96 bg-gray-400/10 blur-[140px] rounded-full" />

  <div className="relative max-w-7xl mx-auto px-6 py-16">

    <div className="grid gap-8 lg:grid-cols-4">

      {/* ================= Brand ================= */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6">

        <div className="flex items-center gap-4">

          <Image
            src="/logo.jpg"
            alt="Shovexa"
            width={80}
            height={80}
            className="rounded-2xl shadow-xl"
          />

          <div>
            <h2 className="text-2xl font-bold">
              Shovexa
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Fashion that fits every style.
            </p>
          </div>

        </div>

        <p className="mt-6 text-slate-400 leading-7 text-sm">
          Discover premium clothing with modern styles, quality fabrics,
          affordable prices and reliable delivery across Pakistan.
        </p>

        <div className="mt-8">
          <PolicyLinksCoponent />
        </div>

        <div className="mt-8">

          <div className="inline-flex items-center gap-4 rounded-full bg-slate-800 px-5 py-3 text-3xl text-slate-300">

            <FaCcVisa />

            <FaCcMastercard />

            <FaCcPaypal />

            <FaCreditCard />

          </div>

        </div>

      </div>

      {/* ================= Quick Links ================= */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6">

        <h3 className="text-lg font-semibold">
          Quick Links
        </h3>

        <div className="w-12 h-1 rounded-full bg-gray-500 mt-2 mb-6" />

        <div className="flex flex-col gap-4 text-slate-300">

          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>

          <Link href="/" className="hover:text-gray-400 transition">
            Shop
          </Link>        

          <Link href="/about" className="hover:text-gray-400 transition">
            About Us
          </Link>

          <Link href="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>

        </div>

      </div>

      {/* ================= Store Location ================= */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6">

        <h3 className="text-lg font-semibold">
          Visit Our Store
        </h3>

        <div className="w-12 h-1 rounded-full bg-gray-500 mt-2 mb-6" />

        <div className="overflow-hidden rounded-2xl">

          <iframe
            title="chakwal"
            src="https://www.google.com/maps?q=Dhok+Kala+Khan,+Shamsabad,+Rawalpindi,+Pakistan&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-56 border-0"
          />

        </div>

        <div className="mt-5 text-sm text-slate-400 leading-7">

          <p className="font-semibold text-white">
            Shovexa
          </p>

          <p>
            Dhok Kala Khan, Shamsabad, Rawalpindi
          </p>

          <p>
            Pakistan
          </p>

        </div>

      </div>

      {/* ================= Newsletter ================= */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6">

        <h3 className="text-lg font-semibold">
          Stay Updated
        </h3>

        <div className="w-12 h-1 rounded-full bg-gray-500 mt-2 mb-6" />

        <p className="text-slate-400 text-sm leading-6">
          Subscribe and receive exclusive offers, new arrivals and product updates.
        </p>

        <form
          onSubmit={submitNewsletter}
          className="mt-6 space-y-4"
        >

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-gray-500 py-3 font-semibold transition hover:bg-gray-600"
          >
            Subscribe
          </button>

        </form>

        <div className="grid grid-cols-4 gap-3 mt-8">

          {socialLinks.map(({ href, icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-lg transition duration-300 hover:scale-110 hover:bg-gray-500"
            >
              {icon}
            </Link>
          ))}

        </div>

      </div>

    </div>

    {/* Bottom */}

    <div className="mt-14 border-t border-slate-800 pt-8">

      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

        <p className="text-sm text-slate-400">
          © {year} Shovexa. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">

          <Link href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </Link>

          <Link href="/refund-return-policy" className="hover:text-gray-400">
            Refund Policy
          </Link>

          <Link href="/shipping-policy" className="hover:text-gray-400">
            Shipping Policy
          </Link>

          <Link href="/terms-and-conditions" className="hover:text-gray-400">
            Terms
          </Link>

          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>

        </div>

      </div>

    </div>

  </div>

  {/* Scroll Top */}

  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-xl shadow-xl transition hover:scale-110 hover:bg-gray-600"
  >
    ↑
  </button>

</footer>
      }
    </>
  )
}

export default Footer
