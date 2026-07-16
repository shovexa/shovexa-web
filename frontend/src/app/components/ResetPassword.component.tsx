"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ResetPasswordComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const [error, setError] = useState<string | undefined>(undefined);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setError(undefined);

    try {
      setLoading(true);
      await axios.post(`${API_URL}/forgotPassword`, { email: form.email.value });
      router.push(`?email=${form.email.value}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setLoading(false);
        setError(error?.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const code = form.code.value;
    const newPassword = form.newPassword.value;

    if (code.length < 6) {
      setError("Code must be 6 digits");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const data = { email: email, passwordResetCode: code, newPassword: newPassword };

    try {
      await axios.post(`${API_URL}/resetPassword`, data);
      alert("Password reset successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setLoading(false);
        setError(error?.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-amber-700 p-4">
      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel – Branding */}
        <div className="hidden md:flex md:w-1/2 bg-orange-600/30 backdrop-blur-sm p-10 flex-col justify-center items-center text-white">
          <div className="mb-6">
            <Image src="/logo.jpg" alt="Shovexa Logo" width={120} height={120} className="rounded-full shadow-lg" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-orange-100">Shovexa</h1>
          <p className="text-lg text-orange-200/80 mt-3 text-center max-w-xs">
            Reset your password securely.
          </p>
          <div className="mt-8 w-16 h-1 bg-orange-400 rounded-full" />
          <p className="mt-6 text-sm text-orange-200/60 text-center">
            We’ll help you get back into your account.
          </p>
        </div>

        {/* Right Panel – Forms */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-white">
              {!email ? "Reset Password" : "Set New Password"}
            </h2>
            <p className="text-orange-200/70 mt-1">
              {!email
                ? "Enter your email to receive a verification code"
                : `Code sent to ${email}`}
            </p>
          </div>

          {/* Error Toast – fixed at bottom, consistent with previous redesigns */}
          {error && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 max-w-sm w-[90%] bg-red-500/90 backdrop-blur text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 text-center break-words">
              {error}
            </div>
          )}

          {!email ? (
            /* ---------- Step 1: Email Input ---------- */
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="email"
                  id="reset-email"
                  name="email"
                  placeholder=" "
                  required
                  className="w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 border-orange-300/50 focus:ring-orange-400 transition"
                />
                <label
                  htmlFor="reset-email"
                  className="absolute left-3 transition-all duration-200 pointer-events-none text-orange-200/70"
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-orange-500/30"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending code...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </button>

              <div className="text-center pt-4 border-t border-orange-200/30">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-orange-200/70 hover:text-orange-100 transition"
                >
                  ← Back to Home
                </Link>
              </div>
            </form>
          ) : (
            /* ---------- Step 2: Code + New Password ---------- */
            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* Verification Code */}
              <div className="relative">
                <input
                  type="text"
                  id="reset-code"
                  name="code"
                  placeholder=" "
                  required
                  maxLength={6}
                  className="w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 border-orange-300/50 focus:ring-orange-400 transition text-center font-mono tracking-widest"
                />
                <label
                  htmlFor="reset-code"
                  className="absolute left-3 transition-all duration-200 pointer-events-none text-orange-200/70"
                >
                  Verification Code
                </label>
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="reset-password"
                  name="newPassword"
                  placeholder=" "
                  required
                  className="w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 border-orange-300/50 focus:ring-orange-400 transition pr-12"
                />
                <label
                  htmlFor="reset-password"
                  className="absolute left-3 transition-all duration-200 pointer-events-none text-orange-200/70"
                >
                  New Password
                </label>
                <button
                  type="button"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-200/70 hover:text-white transition"
                >
                  <Image
                    src={passwordVisible ? "/eye-solid.svg" : "/eye-slash-solid.svg"}
                    width={20}
                    height={20}
                    alt="Toggle visibility"
                  />
                </button>
              </div>

              <p className="text-xs text-orange-200/60 -mt-2">
                Must be at least 8 characters with uppercase, lowercase, and numbers.
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-orange-500/30"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              <div className="text-center pt-4 border-t border-orange-200/30">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-orange-200/70 hover:text-orange-100 transition"
                >
                  ← Back to Home
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;