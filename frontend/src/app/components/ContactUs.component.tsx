"use client";

import React, { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await axios.post(`${API}/contact-us`, formData);
      setStatus("Message sent successfully.");
      setTimeout(() => {
        setStatus("");
      }, 3000);

      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-10 px-4 sm:py-16 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-widest mb-4">
            Shovexa
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Have a question or need help? Send us a message and we'll respond quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden shadow-xl border border-orange-100">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-200 text-gray-900 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 text-gray-900 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="How can we help?"
                  className="w-full border border-gray-200 text-gray-900 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-xl transition-all shadow-sm ${
                  loading
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 hover:shadow-md"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p
                  className={`text-center text-sm mt-2 rounded-lg py-2 px-3 ${
                    status.includes("success")
                      ? "text-green-700 bg-green-50 border border-green-100"
                      : "text-red-600 bg-red-50 border border-red-100"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 bg-gradient-to-br from-orange-600 to-amber-500 p-6 sm:p-10 flex flex-col justify-center text-white">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 flex-shrink-0">
                  📍
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-orange-50/80">
                    Address
                  </p>
                  <p className="font-medium">Sialkot, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 flex-shrink-0">
                  📞
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-orange-50/80">
                    Phone
                  </p>
                  <p className="font-medium">0333 4186523</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 flex-shrink-0">
                  📧
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-orange-50/80">
                    Email
                  </p>
                  <p className="font-medium">shovexa@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}