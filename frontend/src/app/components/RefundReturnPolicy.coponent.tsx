"use client";
import React, { useState } from "react";

interface PolicySection {
  id: string;
  icon: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

const RefundReturnPolicyCards = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [openId, setOpenId] = useState<string | null>("eligibility");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const sections: PolicySection[] = [
    {
      id: "eligibility",
      icon: "📦",
      title: "Eligibility for Returns",
      summary: "7-day window, unused and original packaging",
      content: (
        <p className="leading-relaxed text-white/80">
          You may request a return within 7 days of receiving your order. Items must be unused,
          in their original packaging, and in the same condition as received. We do not accept
          returns for used, damaged, or customized products.
        </p>
      ),
    },
    {
      id: "non-returnable",
      icon: "🚫",
      title: "Non-Returnable Items",
      summary: "Hygiene and customized products excluded",
      content: (
        <p className="leading-relaxed text-white/80">
          Certain items are non-returnable for hygiene or customization reasons, such as
          undergarments, personalized items, or perishable goods.
        </p>
      ),
    },
    {
      id: "refund-process",
      icon: "💰",
      title: "Refund Process",
      summary: "5–7 business days after inspection",
      content: (
        <p className="leading-relaxed text-white/80">
          Once we receive and inspect your returned item, we will notify you about the status of
          your refund. Approved refunds are processed within 5 to 7 business days through the
          original payment method. Bank or card processing times may vary.
        </p>
      ),
    },
    {
      id: "exchange",
      icon: "🔄",
      title: "Exchange Policy",
      summary: "Free replacement for defective or wrong items",
      content: (
        <p className="leading-relaxed text-white/80">
          If you received a defective or incorrect product, please contact us within 48 hours of
          delivery. We will arrange a replacement at no extra cost, depending on product
          availability.
        </p>
      ),
    },
    {
      id: "cancellations",
      icon: "⏱️",
      title: "Order Cancellations",
      summary: "15-minute window before processing",
      content: (
        <p className="leading-relaxed text-white/80">
          You can cancel your order within 15 minutes after placing it. To request cancellation,
          contact our support team immediately through email or phone. Once your order is
          processed or shipped, it cannot be canceled but may qualify for return after delivery.
        </p>
      ),
    },
    {
      id: "contact",
      icon: "📞",
      title: "Contact Us",
      summary: "Reach our support team for refunds or returns",
      content: (
        <div className="space-y-3 leading-relaxed text-white/80">
          <p>For refunds or returns, contact us using the details below:</p>
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Email</span>
            <span>support@shovexa.com</span>
          </p>
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Phone</span>
            <span>0333 4186523</span>
          </p>
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Address</span>
            <span>Shovexa, Chakwal, Pakistan</span>
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#1C1410]">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-black/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Shovexa
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Refund & Return Policy
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            We aim to provide you with high-quality products and a smooth shopping experience. If
            you&apos;re not satisfied with your purchase, here&apos;s how returns and refunds work.
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
                    ? "border-orange-500/60 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <button
                  onClick={() => toggle(section.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-lg">
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
                    className={`flex-shrink-0 text-orange-400 transition-transform duration-200 ${
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

export default RefundReturnPolicyCards;