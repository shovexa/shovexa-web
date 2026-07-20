'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginFormData } from '../utils/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NoInternetComponent from './NoInternet.component';
import Image from 'next/image';
import SignInWithGoogleComponent from './SignInWithGoogle.component';

const LoginComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams.toString());
  const trackedPath = searchParams.get("track");

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await axios.post(`${API_URL}/user/Login`, data, { withCredentials: true });
      const resData = response.data.data;

      if (resData === "notVerified") {
        const maskEmail = (email: string) => {
          const [name, domain] = email.split('@');
          return `${name.slice(0, 2)}****${name.slice(-2)}@${domain}`;
        };
        const maskedEmail = maskEmail(data.email);
        router.push(`/verify-email?email=${maskedEmail}`);
      }

      const userRole = resData.role;
      setLoading(false);

      if (resData.isVerified) {
        if (userRole === "buyer") router.push(`${trackedPath || "/"}?${updatedSearchParams}`);
        if (userRole === "super-admin") router.push("/admin");
        if (userRole === "seller") router.push("/seller");
      }

    } catch (err: unknown) {
      setLoading(false);

      if (err instanceof AxiosError) {
        const message = err.response?.data?.error || "Something went wrong. Please try again later.";

        if (err.response?.status === 500) setNetworkError(true);

        setError(message);
        setTimeout(() => setError(undefined), 3000);

        if (err.code === "ERR_NETWORK") setNetworkError(true);
      } else {
        setError('An unknown error occurred.');
        setTimeout(() => setError(undefined), 3000);
      }
    }
  };

  return (
    <>
      {networkError && <NoInternetComponent />}

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-700 p-4">
      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel – Branding (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-gray-600/30 backdrop-blur-sm p-10 flex-col justify-center items-center text-white">
          <div className="mb-6">
            <Image src="/logo.jpg" alt="Shovexa Logo" width={120} height={120} className="rounded-full shadow-lg" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-100">Shovexa</h1>
          <p className="text-lg text-gray-200/80 mt-3 text-center max-w-xs">
            Manage your world, securely.
          </p>
          <div className="mt-8 w-16 h-1 bg-gray-400 rounded-full" />
          <p className="mt-6 text-sm text-gray-200/60 text-center">
            Your trusted platform for seamless account management.
          </p>
        </div>

        {/* Right Panel – Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-200/70 mt-1">Log in to your Shovexa account</p>
          </div>

          {/* Error toast */}
          {error && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 max-w-sm w-[90%] bg-red-500/90 backdrop-blur text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 text-center break-words">
              {error.split(" at ")[0]}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field – Floating Label */}
            <div className="relative">
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                id="email"
                placeholder=" "
                className={`w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300/50 focus:ring-gray-400"
                } transition`}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                  errors.email ? "text-red-400" : "text-gray-200/70"
                } 
                `}
              >
                Email
              </label>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field – Floating Label with Toggle */}
            <div className="relative">
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder=" "
                className={`w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 pr-12 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300/50 focus:ring-gray-400"
                } transition`}
              />
              <label
                htmlFor="password"
                className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                  errors.password ? "text-red-400" : "text-gray-200/70"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200/70 hover:text-white transition"
              >
                <Image
                  src={passwordVisible ? "/eye-solid.svg" : "/eye-slash-solid.svg"}
                  width={20}
                  height={20}
                  alt="Toggle visibility"
                />
              </button>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-500 to-amber-500 hover:from-gray-600 hover:to-amber-600 text-white hover:shadow-gray-500/30"
              }`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Divider + Social Login */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200/30" />
            <span className="px-3 text-sm text-gray-200/60">or continue with</span>
            <div className="flex-1 border-t border-gray-200/30" />
          </div>

          <SignInWithGoogleComponent />

          {/* Footer Links */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <Link
              href="/sign-up"
              className="w-full sm:w-auto text-center px-6 py-2 rounded-full border border-gray-400/60 text-gray-200 hover:bg-gray-500/20 transition"
            >
              Create account
            </Link>
            <div className="flex gap-4">
              <Link href="/reset-password" className="text-gray-200/70 hover:text-gray-100 transition">
                Forgot password?
              </Link>
              <Link href="/" className="text-gray-200/70 hover:text-gray-100 transition">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginComponent;
