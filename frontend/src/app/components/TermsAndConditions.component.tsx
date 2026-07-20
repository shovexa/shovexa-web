"use client";
import React, { useState } from "react";

interface TermSection {
  id: string;
  icon: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

const TermsAndConditionsCards = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [openId, setOpenId] = useState<string | null>("business");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const sections: TermSection[] = [
    {
      id: "business",
      icon: "🏢",
      title: "Business Information",
      summary: "Where we operate and how orders are handled",
      content: (
        <p className="leading-relaxed text-white/80">
          Shovexa is a registered business operating from Sialkot, Pakistan. All transactions,
          deliveries, and communications will be handled through this location.
        </p>
      ),
    },
    {
      id: "product",
      icon: "🏷️",
      title: "Product Information",
      summary: "Descriptions, prices, and image accuracy",
      content: (
        <p className="leading-relaxed text-white/80">
          We make every effort to display accurate product descriptions, prices, and images.
          However, slight variations may occur due to lighting or screen settings.
        </p>
      ),
    },
    {
      id: "orders",
      icon: "💳",
      title: "Orders and Payments",
      summary: "Confirmation, cancellation, and stock issues",
      content: (
        <p className="leading-relaxed text-white/80">
          Orders are confirmed once full or partial payment is received. We reserve the right to
          cancel any order in case of payment issues or stock unavailability.
        </p>
      ),
    },
    {
      id: "shipping",
      icon: "🚚",
      title: "Shipping and Delivery",
      summary: "Timelines and courier delays",
      content: (
        <p className="leading-relaxed text-white/80">
          Delivery timelines are mentioned on each product page. Delays caused by couriers or
          external factors are not our responsibility, though we assist in resolving such issues
          promptly.
        </p>
      ),
    },
    {
      id: "returns",
      icon: "↩️",
      title: "Returns and Refunds",
      summary: "How to request a refund or exchange",
      content: (
        <p className="leading-relaxed text-white/80">
          Refunds and exchanges are handled according to our Refund Policy. Customers must contact
          us within 7 days of receiving their order for any claims.
        </p>
      ),
    },
    {
      id: "privacy",
      icon: "🔐",
      title: "Privacy and Data",
      summary: "How your information is protected and used",
      content: (
        <p className="leading-relaxed text-white/80">
          We protect your personal data according to our Privacy Policy. Your information will
          only be used to process orders and improve customer experience.
        </p>
      ),
    },
    {
      id: "liability",
      icon: "⚖️",
      title: "Limitation of Liability",
      summary: "Scope of our responsibility",
      content: (
        <p className="leading-relaxed text-white/80">
          Shovexa is not liable for indirect or incidental damages arising from product use,
          delays, or unavailability. Our total liability is limited to the amount paid for the
          product.
        </p>
      ),
    },
    {
      id: "law",
      icon: "🧾",
      title: "Governing Law",
      summary: "Jurisdiction and applicable law",
      content: (
        <p className="leading-relaxed text-white/80">
          These terms are governed by the laws of Pakistan. Any disputes will be resolved under
          the jurisdiction of courts in Sialkot.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#1C1410]">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-600 via-gray-500 to-amber-500 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-black/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Shovexa
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            By using our website and purchasing our products, you agree to comply with and be
            bound by the following terms. Please read them carefully before placing any order.
          </p>
          <p className="mt-6 text-sm text-white/70">Last updated {currentDate}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="space-y-3 sm:space-y-4">
          {sections.map((section) => {
            const isOpen = openId === section.id;
            return (
              <div
                key={section.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-gray-500/60 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <button
                  onClick={() => toggle(section.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-500/20 text-lg">
                    {section.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-semibold text-white sm:text-lg">
                      {section.title}
                    </span>
                    <span className="block truncate text-sm text-white/50">
                      {section.summary}
                    </span>
                  </span>
                  <span
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-5 pb-6 pt-4 sm:px-6">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          This policy may be updated periodically. We encourage you to review this page regularly.
        </p>
      </div>
    </main>
  );
};

export default TermsAndConditionsCards;