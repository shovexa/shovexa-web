import React from "react";
import Link from "next/link";

const AboutComponent = () => {
  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description:
        "Every product is chosen with care so you get exactly what you see — no surprises.",
    },
    {
      icon: "🚚",
      title: "Reliable Delivery",
      description:
        "We partner with trusted couriers to make sure your order arrives safely and on time.",
    },
    {
      icon: "💬",
      title: "Real Support",
      description:
        "A real person reads every message — no bots, no runaround, just quick answers.",
    },
    {
      icon: "🤝",
      title: "Fair Pricing",
      description:
        "Honest prices with no hidden fees, so you always know what you're paying for.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "5K+", label: "Orders Delivered" },
    { value: "4.8★", label: "Average Rating" },
    { value: "24/7", label: "Support Response" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-600 via-gray-500 to-amber-500 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-black/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            About Us
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            We're Shovexa
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            A small team on a mission to make online shopping simple, honest,
            and genuinely enjoyable.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-gray-600">
              Our Story
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              Built around getting the little things right
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Shovexa started with a simple idea: shopping online should feel
              as trustworthy as buying from someone you know. What began as a
              small operation has grown into a store people rely on for
              quality products, honest pricing, and support that actually
              helps.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We're based in Pakistan and ship nationwide, with every order
              packed carefully and tracked from the moment it leaves our
              hands to the moment it reaches your door.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-xl bg-gradient-to-r from-gray-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:from-gray-500 hover:to-amber-400 hover:shadow-md"
            >
              Get in Touch
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-gray-600 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50/40 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gray-600">
              What We Stand For
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              The values behind every order
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                  {value.icon}
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Have a question before you order?
        </h2>
        <p className="mt-3 text-gray-600">
          Our support team is quick to respond and happy to help — reach out
          anytime.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-xl bg-gradient-to-r from-gray-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:from-gray-500 hover:to-amber-400 hover:shadow-md sm:w-auto"
          >
            Contact Support
          </Link>
          <Link
            href="/"
            className="w-full rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutComponent;