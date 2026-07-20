"use client";
import React, { useState } from "react";
import Link from "next/link";

interface PolicySection {
  id: string;
  icon: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

const OwnershipStatementCards = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [openId, setOpenId] = useState<string | null>("owner");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const sections: PolicySection[] = [
    {
      id: "owner",
      icon: "👤",
      title: "Ownership",
      summary: "Who owns and operates this site",
      content: (
        <p className="leading-relaxed text-white/80">
          This website, <span className="font-semibold text-white">Shovexa</span>, is owned and
          operated by{" "}
          <Link
            href="https://umarkhitab.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline underline-offset-2 hover:text-gray-300"
          >
            Umar Khitab
          </Link>
          .
        </p>
      ),
    },
    {
      id: "address",
      icon: "📍",
      title: "Registered Business Address",
      summary: "Chakwal, Punjab, Pakistan",
      content: <p className="leading-relaxed text-white/80">Chakwal, Punjab, Pakistan</p>,
    },
    {
      id: "contact",
      icon: "📞",
      title: "Contact Information",
      summary: "Email and phone for inquiries",
      content: (
        <div className="space-y-2 leading-relaxed text-white/80">
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Email</span>
            <span>shovexa@gmail.com</span>
          </p>
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold text-white">Phone</span>
            <span>0333 4186523</span>
          </p>
        </div>
      ),
    },
    {
      id: "content-rights",
      icon: "©️",
      title: "Content Rights",
      summary: "All materials are Shovexa's property",
      content: (
        <p className="leading-relaxed text-white/80">
          All content, images, and materials displayed on this website are the property of Shovexa
          unless otherwise stated. Unauthorized use, reproduction, or distribution of any content
          is strictly prohibited.
        </p>
      ),
    },
    {
      id: "responsibility",
      icon: "✅",
      title: "Responsibility",
      summary: "Accuracy of information and offerings",
      content: (
        <p className="leading-relaxed text-white/80">
          Shovexa takes full responsibility for the accuracy of information, services, and products
          offered on this website.
        </p>
      ),
    },
    {
      id: "inquiries",
      icon: "✉️",
      title: "Inquiries",
      summary: "How to reach us about ownership",
      content: (
        <p className="leading-relaxed text-white/80">
          For any inquiries related to website ownership, please contact us through the details
          provided above.
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
            Ownership Statement
          </h1>
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
          This statement may be updated periodically. We encourage you to review this page
          regularly.
        </p>
      </div>
    </main>
  );
};

export default OwnershipStatementCards;