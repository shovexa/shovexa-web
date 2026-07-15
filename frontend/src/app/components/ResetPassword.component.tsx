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
        setError(undefined)

        try {
            setLoading(true);
            await axios.post(`${API_URL}/forgotPassword`, { email: form.email.value })

            router.push(`?email=${form.email.value}`);

        } catch (error: unknown) {
            if (error instanceof AxiosError) {

                setLoading(false)
                setError(error?.response?.data.error)
            }

        } finally {
            setLoading(false)
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const code = form.code.value;
        const newPassword = form.newPassword.value;

        if (code.length < 6) {
            setError("Code must be 6 digits")
            return
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters")
            return

        }
        setLoading(true);
        const data = { email: email, passwordResetCode: code, newPassword: newPassword }

        try {
            await axios.post(`${API_URL}/resetPassword`, data)
            alert('Password reset successful')
            router.push('/login')

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setLoading(false)
                setError(error?.response?.data.error)


            }
        } finally {
            setLoading(false)
        }


    };

    return (
      <>
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
    {/* Header with Logo */}
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <div className="relative">
          <Image 
            src="/logo.jpg" 
            width={80} 
            height={80} 
            alt="SAADiCcollection Logo"
            className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Reset SAADiCcollection Password
      </h1>
      <p className="text-gray-600 text-sm">
        Secure access to your fashion collection
      </p>
    </div>

    {!email ? (
      /* Email Input Form */
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your email to reset password
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                <p className="text-red-600 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending code...
                </span>
              ) : (
                'Send Verification Code'
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-100">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                ← Back to Home Page
              </Link>
            </div>
          </form>
        </div>
      </div>
    ) : (
      /* Password Reset Form */
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="mb-6 text-center">
            <p className="text-gray-600 text-sm">
              Code sent to: <span className="font-semibold text-gray-800">{email}</span>
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* Verification Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter verification code
              </label>
              <input
                name="code"
                id="code"
                placeholder="Enter 6-digit code"
                required
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-center text-lg font-mono tracking-widest"
                maxLength={6}
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter new password"
                  required
                  type={passwordVisible ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-12 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(prev => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <Image 
                    src={passwordVisible ? "/eye-solid.svg" : "/eye-slash-solid.svg"}
                    width={20} 
                    height={20} 
                    alt={passwordVisible ? "Hide password" : "Show password"}
                    className="filter brightness-75"
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting password...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <div className="text-center pt-4 border-t border-gray-100">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                ← Back to Home Page
              </Link>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
</>
    );
};

export default ResetPasswordComponent;
