"use client";

import React, { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import GetProductsByIdsComponent from "./GetProductsByIds.component";
import PolicyLinksCoponent from "../PolicyLinks.coponent";


interface FormData {
  quantity: number;
}

const OrderPage = () => {
  const {  formState: { errors }, setValue, setError, clearErrors } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(1);
  const searchParams = useSearchParams();
  const decoded = searchParams.get("query") && JSON.parse(atob(searchParams.get("query") || ""));

  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get("query")) {
      return;
    }
  }, [ decoded]);

  const onSubmit = async () => {
if (!decoded) {
  setError("quantity", { type: "manual", message: "Invalid order data. Please try again." });
  alert("Invalid order data. Please try again.");
       if (window.history.length>1) {
      router.back()
    }else{
        router.push('/')
    }
  return;
}

    if (!selectedQuantity) {
      setError("quantity", { type: "manual", message: "Quantity is required" });
      return;
    }

    if (decoded.stock < selectedQuantity) {
      setError("quantity", { type: "manual", message: "Quantity exceeds available stock" });
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/buyer/shipping?query=${btoa(JSON.stringify({ productId: decoded.productId, quantity: selectedQuantity, price: decoded.price }))}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
    setValue("quantity", quantity, { shouldValidate: true });
    clearErrors("quantity");
  };

  return (
  <>
  {loading ? (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500 border-b-orange-600"></div>

      <p className="mt-5 text-lg font-semibold text-orange-600">
        Processing your order...
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Please wait a moment.
      </p>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-6">
      <div className="mx-auto max-w-7xl px-4">

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">

          {/* Checkout Card */}
          <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-lg">

            <div className="mb-6">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                Quick Checkout
              </span>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                Select Quantity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose how many items you want to order.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => handleQuantityChange(qty)}
                  className={`rounded-xl py-3 text-lg font-bold transition-all duration-200 ${
                    selectedQuantity === qty
                      ? "bg-orange-500 text-white shadow-lg scale-105"
                      : "border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>

            {errors.quantity && (
              <p className="mt-3 text-center text-sm text-red-500">
                {errors.quantity.message}
              </p>
            )}

            <button
              onClick={onSubmit}
              className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600 active:scale-95"
            >
              Place Order
            </button>

            <div className="mt-5 border-t border-orange-100 pt-4">
              <PolicyLinksCoponent />
            </div>
          </div>

          {/* Product Card */}
          <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-lg">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Product Details
              </h2>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                Review
              </span>
            </div>

            {decoded ? (
              <GetProductsByIdsComponent
                productIds={[decoded.productId]}
              />
            ) : (
              <div className="flex h-52 items-center justify-center rounded-xl border border-red-200 bg-red-50">
                <p className="text-center text-red-600">
                  Invalid order details provided.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )}
</>
  );
};

export default OrderPage;
