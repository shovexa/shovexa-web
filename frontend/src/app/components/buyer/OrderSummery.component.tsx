"use client";

import React, { useEffect, useState } from "react";
import AddressComponent from "./Address.component";
import axios from "axios";
import buyerAuth from "../../auths/buyerAuth";
import SingleProductComponent from "./GetProductsByIds.component";
import { useRouter, useSearchParams } from "next/navigation";

const ShippingComponent = () => {

  const orderSummaryStructure = {
    products: [{ price: 0, quantity: 0, discount: 0 }],
    shippingPrice: 0,
    taxPrice: 0,
    price: 0,
    totalPrice: 0
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState<boolean>(false)
  const [orderSummary, setOrderSummary] = useState(orderSummaryStructure)
  const searchParams = useSearchParams()
  const decoded = searchParams.get("query") && JSON.parse(atob(searchParams.get("query") || ""))


  const router = useRouter()
  useEffect(() => {
    if (!searchParams.get("query")) {
      return;
    }
  }, [decoded]);

  const getAddress = async (): Promise<boolean> => {
    try {

      const res = await axios.get(`${API_URL}/find-address`, { withCredentials: true });
      setLoading(false)
      const hasAddress = res.data.success
      return hasAddress;
    } catch {
      setLoading(false)

      return false;
    }
  };
  useEffect(() => {
    getAddress()
  }, []);



  useEffect(() => {
    if (!decoded) {
      return;
    }
    const formdata = {
      "products": [{
        "productId": decoded.productId,
        "quantity": decoded.quantity
      },
      ],


    }
    const previewOrder = async () => {

      const res = await axios.post(`${API_URL}/preview-order`, formdata)
      
      setOrderSummary(res.data.data)

    }
    previewOrder()

  }, [API_URL])





  const handleProceedPay = async () => {
    setLoading(true)
    const hasAddress = await getAddress();

    if (!decoded) {
      setLoading(false)
      alert("Invalid order data. Please try again.");
      if (window.history.length > 1) {
        router.back()
      } else {
        router.push('/')
      }
      return;
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000);

    if (!hasAddress) {
      alert("Please add a shipping address before proceeding to payment.");
      return;
    }

    router.push(`/buyer/payment-cashier?query=${btoa(JSON.stringify({ productIdsAndQtyArr: [{ productId: decoded.productId, quantity: decoded.quantity }], price: orderSummary.products[0].price - orderSummary.products[0].discount }))}`)
  }
  return (
  <>
  <div className="bg-[#FFF8F3] min-h-full w-full">

    {loading && (
      <div className="fixed inset-0 bg-[#241B15]/40 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="w-11 h-11 border-[3px] border-[#F2D9C8] border-t-[#2c201c] rounded-full animate-spin"></div>
        <p className="text-[#FFF8F3] text-sm mt-4 tracking-wide">Loading…</p>
      </div>
    )}

    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 sm:gap-6 lg:gap-8">

        {/* Left column: Address + Selected Item */}
        <div className="space-y-5 sm:space-y-6 order-2 lg:order-1">
          <div className="bg-white rounded-2xl border border-[#F0E4D8] shadow-sm p-4 sm:p-6">
            <AddressComponent />
          </div>

          {decoded ? (
            <div className="bg-white rounded-2xl border border-[#F0E4D8] shadow-sm p-4 sm:p-6">
              <h1 className="text-base sm:text-lg font-semibold text-[#241B15] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-gray-500 rounded-full" />
                Selected Item for Checkout
              </h1>
              <SingleProductComponent productIds={[decoded.productId]} />
            </div>
          ) : (
            <p className="text-[#B8390E] font-medium flex justify-center items-center text-center py-6 px-4 bg-white rounded-2xl border border-[#F6D9CC] text-sm sm:text-base">
              Invalid order details provided.
            </p>
          )}
        </div>

        {/* Right column: Order Summary (sticky receipt card) */}
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-6 bg-white rounded-2xl border border-[#F0E4D8] shadow-md overflow-hidden">

            {/* orange header strip */}
            <div className="bg-gradient-to-r from-gray-500 to-gray-700 px-5 py-4 sm:px-6">
              <h1 className="text-base sm:text-lg font-semibold text-white">Order Summary</h1>
              <p className="text-[11px] sm:text-xs text-white/85 mt-1 leading-snug">
                Order cancelling is not allowed after 15 minutes of placing order
              </p>
            </div>

            {/* perforated "ticket" edge */}
            <div className="relative h-3 bg-white">
              <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-[#F0E4D8]" />
              <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#FFF8F3]" />
              <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#FFF8F3]" />
            </div>

            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
              {decoded ? (
                <>
                  <div className="space-y-4 divide-y divide-dashed divide-[#F0E4D8]">
                    <div className="pb-4">
                      <div className="flex justify-between items-start text-sm font-medium text-[#241B15]">
                        <span>Items Total ({orderSummary.products[0].quantity})</span>
                        <span className="font-semibold tabular-nums">
                          PKR {orderSummary.products[0].price - orderSummary.products[0].discount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-[#B0A296] line-through tabular-nums">
                          PKR {orderSummary.products[0].price}
                        </span>
                        <span className="bg-[#FDECE3] text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          Save{" "}
                          {Math.round(
                            (Number(orderSummary.products[0].discount) /
                              Number(orderSummary.products[0].price)) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm font-medium text-[#5C4F44] py-3">
                      <span>Delivery Fee</span>
                      <span className="tabular-nums">PKR {orderSummary.shippingPrice}</span>
                    </div>

                    <div className="flex justify-between text-sm font-medium text-[#5C4F44] py-3">
                      <span>Tax Price</span>
                      <span className="tabular-nums">PKR {orderSummary.taxPrice?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <span className="text-sm sm:text-base font-semibold text-[#241B15]">Total</span>
                      <span className="text-lg sm:text-xl font-bold text-gray-700 tabular-nums">
                        PKR {orderSummary.totalPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedPay}
                    disabled={loading}
                    className="mt-6 w-full bg-gray-500 text-white font-semibold py-3 rounded-xl hover:bg-gray-600 active:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-[#EA5B22]/20"
                  >
                    {loading ? "Processing…" : "Proceed to Pay"}
                  </button>
                </>
              ) : (
                <p className="text-gray-700 font-medium flex justify-center items-center text-center py-6 text-sm sm:text-base">
                  Invalid order details provided.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</>

  );

};

export default buyerAuth(ShippingComponent);
