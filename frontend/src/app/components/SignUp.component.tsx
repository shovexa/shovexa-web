'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignupSchema, SignupFormData } from '../utils/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SignUpWithGoogleComponent from './SignUpWithGoogle.component';

const SignupComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(undefined);

    try {
      await axios.post(`${API_URL}/user/signup`, data, { withCredentials: true });

      const maskEmail = (email: string) => {
        const [name, domain] = email.split('@');
        const firstTwo = name.slice(0, 2);
        const lastTwo = name.slice(-2);
        return `${firstTwo}****${lastTwo}@${domain}`;
      };

      const maskedEmail = maskEmail(data.email);
      router.push(`/verify-email?email=${maskedEmail}`);
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError('An unknown error occurred.');
        }
      }
    }
  };

  return (
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
            Join the community today.
          </p>
          <div className="mt-8 w-16 h-1 bg-gray-400 rounded-full" />
          <p className="mt-6 text-sm text-gray-200/60 text-center">
            Start managing your world with security and ease.
          </p>
        </div>

        {/* Right Panel – Sign Up Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="text-gray-200/70 mt-1">Join Shovexa today</p>
          </div>

          {/* Error toast */}
          {error && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 max-w-sm w-[90%] bg-red-500/90 backdrop-blur text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 text-center break-words">
              {error.split(" at ")[0]}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Field – Floating Label */}
            <div className="relative">
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                id="username"
                placeholder=" "
                className={`w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 ${
                  errors.username
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300/50 focus:ring-gray-400"
                } transition`}
              />
              <label
                htmlFor="username"
                className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                  errors.username ? "text-red-400" : "text-gray-200/70"
                }`}
              >
                Username
              </label>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Phone Field – Floating Label */}
            <div className="relative">
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                id="phone"
                placeholder=" "
                className={`w-full p-3 pt-5 pb-2 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300/50 focus:ring-gray-400"
                } transition`}
              />
              <label
                htmlFor="phone"
                className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                  errors.phone ? "text-red-400" : "text-gray-200/70"
                }`}
              >
                Phone Number
              </label>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email Field – Floating Label */}
            <div className="relative">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
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
                }`}
              >
                Email Address
              </label>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field – Floating Label with Toggle */}
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
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
              disabled={loading || !isValid}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                loading || !isValid
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-500 to-amber-500 hover:from-gray-600 hover:to-amber-600 text-white hover:shadow-gray-500/30"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider + Social Login */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200/30" />
            <span className="px-3 text-sm text-gray-200/60">or continue with</span>
            <div className="flex-1 border-t border-gray-200/30" />
          </div>

          <SignUpWithGoogleComponent />

          {/* Footer Links */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <Link
              href="/login"
              className="w-full sm:w-auto text-center px-6 py-2 rounded-full border border-gray-400/60 text-gray-200 hover:bg-gray-500/20 transition"
            >
              Sign in instead
            </Link>
            <Link href="/" className="text-gray-200/70 hover:text-gray-100 transition">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
