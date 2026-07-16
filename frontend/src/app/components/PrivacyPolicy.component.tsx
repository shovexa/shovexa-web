"use client";
import React, { useState } from "react";

interface PolicySection {
  id: string;
  icon: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

const PrivacyPolicyCards = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [openId, setOpenId] = useState<string | null>("collect");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const policySections: PolicySection[] = [
    {
      id: "collect",
      icon: "📋",
      title: "Information We Collect",
      summary: "Name, contact details, address, and payment data",
      content: (
        <p className="leading-relaxed text-white/80">
          We collect personal information that you voluntarily provide when you interact with our
          services, including but not limited to: name, email address, phone number, shipping
          address, and payment information. We may also automatically collect technical data such
          as IP address, browser type, and usage patterns through cookies and similar technologies.
        </p>
      ),
    },
    {
      id: "use",
      icon: "⚙️",
      title: "How We Use Your Information",
      summary: "Orders, support, updates, and site improvements",
      content: (
        <ul className="space-y-2.5 leading-relaxed text-white/80">
          {[
            "Process and fulfill your orders and transactions",
            "Provide customer support and respond to inquiries",
            "Send important service updates and administrative information",
            "Improve our website functionality and user experience",
            "Comply with legal obligations and prevent fraudulent activities",
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 flex-shrink-0 text-orange-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "security",
      icon: "🔒",
      title: "Data Protection & Security",
      summary: "SSL encryption and strict access controls",
      content: (
        <p className="leading-relaxed text-white/80">
          We implement industry-standard security measures including SSL encryption, secure server
          infrastructure, and strict access controls. Your personal information is never sold to
          third parties. We only share data with trusted service providers essential for order
          fulfillment (payment processors, shipping carriers) and when required by law.
        </p>
      ),
    },
    {
      id: "cookies",
      icon: "🍪",
      title: "Cookies & Tracking Technologies",
      summary: "How we use cookies and how to manage them",
      content: (
        <p className="leading-relaxed text-white/80">
          Our website uses cookies to enhance user experience, analyze site traffic, and personalize
          content. You can manage your cookie preferences through your browser settings. Note that
          disabling certain cookies may affect website functionality.
        </p>
      ),
    },
    {
      id: "rights",
      icon: "✅",
      title: "Your Rights & Choices",
      summary: "Access, correct, delete, or port your data",
      content: (
        <p className="leading-relaxed text-white/80">
          You have the right to access, correct, or delete your personal data. You may also object
          to processing, request data portability, or withdraw consent at any time. To exercise
          these rights, please contact us using the information below. We will respond to all
          legitimate requests within 30 days.
        </p>
      ),
    },
    {
      id: "retention",
      icon: "🗄️",
      title: "Data Retention",
      summary: "How long we keep your information",
      content: (
        <p className="leading-relaxed text-white/80">
          We retain personal data only for as long as necessary to fulfill the purposes outlined in
          this policy, unless a longer retention period is required or permitted by law. Transaction
          data is typically maintained for 7 years to comply with legal obligations.
        </p>
      ),
    },
    {
      id: "contact",
      icon: "📞",
      title: "Contact Information",
      summary: "Reach our support team",
      content: (
        <div className="space-y-3 leading-relaxed text-white/80">
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Email</span>
            <span>shovexa@gmail.com</span>
          </p>
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Phone</span>
            <span>03334186523  (Mon–Fri, 9AM–5PM PST)</span>
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
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Protecting your privacy is our priority — here&apos;s exactly how we collect, use, and
            safeguard your information.
          </p>
          <p className="mt-6 text-sm text-white/70">Last updated {currentDate}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="space-y-3 sm:space-y-4">
          {policySections.map((section) => {
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

export default PrivacyPolicyCards;