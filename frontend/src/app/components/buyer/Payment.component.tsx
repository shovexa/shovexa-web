"use client";
import axios, { AxiosError } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import GetProductsByIdsComponent from './GetProductsByIds.component';
import buyerAuth from '../../auths/buyerAuth';

const PaymentComponent = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const trackPath = usePathname();
  const updatedSearchParams = new URLSearchParams(searchParams.toString())
  const decoded = searchParams.get('query') !== null && JSON.parse(atob(searchParams.get('query') || ''))
  const productIds = decoded.productIdsAndQtyArr ? decoded.productIdsAndQtyArr.map((item: { productId: string; quantity: number }) => item.productId) : []
  const [loading, setLoading] = useState(false)
  const paymentMethods = [
    // { id: "JazzCash", label: "JazzCash" },
    { id: "easyPaisa", label: "easyPaisa" },
    { id: "cod", label: "Cash on Delivery" }
  ]
  const [transactionId, setTransactionId] = useState("");




  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter()

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransactionId(value);

    const isValid = /^[A-Za-z0-9]{11,20}$/.test(value);

    setError(isValid ? "" : "Invalid transaction ID format");
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined)
    setSelectedPayment(event.target.value);
  };


  const handleProceed = async () => {
    setLoading(true)
    if (selectedPayment !== "Cash on Delivery" && !transactionId) {
      setLoading(false)
      return setError("transactionId  is required")

    }
    if (selectedPayment) {
      try {

        const paymentMethod = selectedPayment;
        if (!decoded) {
          setError("Invalid order data. Please try again.")
          setLoading(false)
          setTimeout(() => {
            setError(undefined)
          }, 2000);
          if (window.history.length > 1) {
            router.back()
          } else {
            router.push('/')
          }
          return;
        }

        await axios.post(`${API_URL}/create-order`, {
          "products": decoded.productIdsAndQtyArr,
          "paymentMethod": paymentMethod,
          "transactionId": transactionId
        }, { withCredentials: true });

        return router.push(`/buyer/orders?decoded=${btoa(JSON.stringify(decoded))}`)


      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 403) {
            router.push(`/verify-email?track=${trackPath}&${updatedSearchParams}`)

          }
          setError(error.response?.data?.error);

        }
        setLoading(false)
      } finally {
        setLoading(false)
      }
    };
  };

  return (
   <div className="flex md:flex-row flex-col gap-6 max-w-5xl mx-auto px-4 py-8">
  {/* Payment method column */}
  <div className="text-gray-800 w-full md:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100">
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
      Select Payment Method
    </h1>

    {decoded.price && (
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-center font-medium text-gray-700">
          Total Amount:{" "}
          <span className="font-bold text-gray-600 text-lg">
            PKR {decoded.price}
          </span>
        </p>
      </div>
    )}

    <div className="space-y-3 mb-8">
      {paymentMethods.map((method) => (
        <div key={method.id}>
          <div
            className={`
              flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
              ${
                selectedPayment === method.label
                  ? "border-gray-500 bg-gray-50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }
            `}
            onClick={() => document.getElementById(method.id)?.click()}
          >
            <span
              className={`
                flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 transition-colors
                ${
                  selectedPayment === method.label
                    ? "border-gray-500"
                    : "border-gray-300"
                }
              `}
            >
              {selectedPayment === method.label && (
                <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
              )}
            </span>

            <input
              type="radio"
              id={method.id}
              name="payment"
              value={method.label}
              className="sr-only"
              onChange={handlePaymentChange}
              checked={selectedPayment === method.label}
            />
            <label
              htmlFor={method.id}
              className="text-gray-800 font-medium cursor-pointer flex-1"
            >
              {method.label}
            </label>

            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-2 font-medium">
              No fee
            </span>
          </div>

          <div>
            {selectedPayment === "JazzCash" && selectedPayment === method.label && (
              <div
                onClick={() => (window.location.href = "jazzcash://pay?number=03281250745")}
                className="flex flex-col gap-2 p-3 mt-1 border-2 border-t-0 border-gray-200 cursor-pointer rounded-b-xl bg-gray-50/50"
              >
                <div className="flex gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-700">JazzCash:</p>
                  <span className="text-sm text-gray-900">
                    {process.env.NEXT_PUBLIC_JAZZCASH_NUMBER}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-700">Holder Name:</p>
                  <span className="text-sm text-gray-900">
                    {process.env.NEXT_PUBLIC_JAZZCASH_HOLDER_NAME}
                  </span>
                </div>
              </div>
            )}
            {selectedPayment === "easyPaisa" && selectedPayment === method.label && (
              <div
                onClick={() => (window.location.href = "easypaisa://pay?number=03281250745")}
                className="flex flex-col gap-2 p-3 mt-1 border-2 border-t-0 border-gray-200 cursor-pointer rounded-b-xl bg-gray-50/50"
              >
                <div className="flex gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-700">EasyPaisa:</p>
                  <span className="text-sm text-gray-900">
                    {process.env.NEXT_PUBLIC_EASYPAISA_NUMBER}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-700">Holder Name</p>
                  <span className="text-sm text-gray-900">
                    {process.env.NEXT_PUBLIC_EASYPAISA_HOLDER_NAME}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {selectedPayment !== "Cash on Delivery" && (
        <div>
          <input
            value={transactionId}
            onChange={handleTransactionIdChange}
            type="text"
            placeholder={`Enter ${selectedPayment} transaction ID`}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
          />
        </div>
      )}
    </div>

    {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

    <div
      className={`transition-opacity duration-300 ${
        selectedPayment ? "opacity-100" : "opacity-0 h-0"
      }`}
    >
      <button
        className={`
          w-full py-3 px-4 rounded-xl font-bold text-white transition-all
          shadow-md hover:shadow-lg transform hover:-translate-y-0.5
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-600 to-amber-500 hover:from-gray-500 hover:to-amber-400"
          }
        `}
        onClick={handleProceed}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : selectedPayment === "Cash on Delivery" ? (
          "Confirm Order"
        ) : (
          "Proceed to Payment"
        )}
      </button>
    </div>
  </div>

  {/* Checkout summary column */}
  <div className="w-full">
    {productIds.length === 0 ? (
      <p className="text-red-500 text-center mt-4">No products selected for checkout.</p>
    ) : (
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-600 to-amber-500 rounded-2xl px-4 py-4 sm:px-5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 bg-white/20 rounded-full flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm uppercase tracking-wide">
              Selected for Checkout
            </h2>
            <p className="text-gray-50/80 text-xs">Ready to complete your purchase</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-2xl font-bold text-white">{productIds.length}</span>
            <span className="text-gray-50/80 text-sm font-medium">items</span>
          </div>
          <div className="w-24 h-1.5 bg-white/25 rounded-full mt-1.5 ml-auto">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((productIds.length / (productIds.length + 10)) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    )}

    <div className="mt-4">
      <GetProductsByIdsComponent productIds={productIds} />
    </div>
  </div>
</div>
  );
};

export default buyerAuth(PaymentComponent);
