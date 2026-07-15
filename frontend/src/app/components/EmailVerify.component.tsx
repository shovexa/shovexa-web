'use client';

import React, {  useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import ResendVerificationCode from '../components/ResendVerificationCode.component';
import Link from 'next/link';
import Image from 'next/image';
// Define Zod schema for form validation
const VerifyEmailSchema = z.object({
  emailVerificationCode: z
    .string()
    .min(6, 'emailVerificationCode must be exactly 6 characters long')
    .max(6, 'emailVerificationCode must be exactly 6 characters long'),
});

// TypeScript type for the form fields
type VerifyEmailFormData = z.infer<typeof VerifyEmailSchema>;

const VerifyEmail = ({ email }: { email: string | null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(VerifyEmailSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const searchParams = useSearchParams()
  const trackedPath = searchParams.get("track")

  const code = searchParams.get('code')
  const updatedSearchParams = new URLSearchParams(searchParams.toString())
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL


  // verifyEmailFromEmaiBox
  useEffect(() => {
    const verifyEmailFormEmaiBox = async () => {
      try {
        const emailVerificationCode = { emailVerificationCode: code }
        await axios.post(`${API_URL}/verify-email`, emailVerificationCode, { withCredentials: true });
        setSuccess(true);
     
     router.push(`${trackedPath || "/"}?${updatedSearchParams} `);
        setTimeout(() => {
          window.location.reload()
        }, 700)
        

      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data.error);
          // return router.push("/login")
        }

      } finally {
        setLoading(false);
      }
    }
    if (code) {
      verifyEmailFormEmaiBox()
    }
  }, [API_URL, code, router])

  const onSubmit = async (data: VerifyEmailFormData) => {
    setLoading(true);
    setError(null);
    try {
      const emailVerificationCode = { emailVerificationCode: data.emailVerificationCode }
      await axios.post(`${API_URL}/verify-email`, emailVerificationCode, { withCredentials: true });
      setSuccess(true);
     router.push(`${trackedPath || "/"}?${updatedSearchParams} `);
        setTimeout(() => {
          window.location.reload()
        }, 700)

    } catch (err: unknown) {
      if (err instanceof AxiosError) {

        setError(err.response?.data.error);
        if (err.response?.data.error === 'Unauthorized') {

          return router.push("/login")
        }
      }

    } finally {
      setLoading(false);

    }
  };


  return (
 <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-10">
  {!code && (
    <div className="w-full max-w-md overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-10 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l9 6 9-6m-18 8h18V8l-9 6-9-6v8z"
            />
          </svg>
        </div>

        <h2 className="mt-5 text-3xl font-bold text-white">
          Verify Your Email
        </h2>

        <p className="mt-2 text-sm text-orange-100">
          Enter the verification code sent to
        </p>

        <p className="mt-1 break-all font-semibold text-white">
          {email || "your email"}
        </p>
      </div>

      <div className="p-8">
        {success ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="font-semibold text-green-700">
              Your email has been successfully verified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Verification Code
              </label>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  {...register("emailVerificationCode")}
                  placeholder="Enter 6 digit code"
                  className={`w-full rounded-xl border bg-orange-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 ${
                    errors.emailVerificationCode
                      ? "border-red-500"
                      : "border-orange-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setPasswordVisible((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <Image
                    src={
                      passwordVisible
                        ? "/eye-solid.svg"
                        : "/eye-slash-solid.svg"
                    }
                    width={20}
                    height={20}
                    alt="toggle password visibility"
                  />
                </button>
              </div>

              {errors.emailVerificationCode && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.emailVerificationCode.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <ResendVerificationCode />
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-orange-600 transition hover:text-orange-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default VerifyEmail;
