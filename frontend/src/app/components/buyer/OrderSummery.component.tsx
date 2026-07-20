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
      <div className=" bg-transparent h-full  grid-row-2  w-full  ">


        {
          loading && <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-80 flex flex-col justify-center items-center z-50">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 border-b-blue-500 rounded-full animate-spin"></div>
            <p className="text-black text-lg mt-4 border-t-black ">loading...</p>
          </div>
        }




        <div className="max-w-5xl mx-auto px-4 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
    {/* Left column: Address + Selected Item */}
    <div className="space-y-6 order-2 lg:order-1">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
        <AddressComponent />
      </div>

      {decoded ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h1 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gray-500 rounded-full" />
            Selected Item for Checkout
          </h1>
          <SingleProductComponent productIds={[decoded.productId]} />
        </div>
      ) : (
        <p className="text-red-600 font-light flex justify-center items-center py-6 bg-white rounded-2xl border border-red-100">
          Invalid order details provided.
        </p>
      )}
    </div>

    {/* Right column: Order Summary (sticky receipt card) */}
    <div className="order-1 lg:order-2">
      <div className="lg:sticky lg:top-6 bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        {/* gray header strip */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-500 px-5 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-white">Order Summary</h1>
          <p className="text-xs text-gray-50/90 mt-1">
            Order cancelling is not allowed after 15 minutes of placing order
          </p>
        </div>

        <div className="p-5 sm:p-6">
          {decoded ? (
            <>
              <div className="space-y-4 divide-y divide-dashed divide-gray-100">
                <div className="pb-4">
                  <div className="flex justify-between items-start text-sm font-medium text-gray-800">
                    <span>Items Total ({orderSummary.products[0].quantity})</span>
                    <span className="font-semibold text-gray-900">
                      PKR {orderSummary.products[0].price - orderSummary.products[0].discount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-400 line-through">
                      PKR {orderSummary.products[0].price}
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
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

                <div className="flex justify-between text-sm font-medium text-gray-700 py-3">
                  <span>Delivery Fee</span>
                  <span>PKR {orderSummary.shippingPrice}</span>
                </div>

                <div className="flex justify-between text-sm font-medium text-gray-700 py-3">
                  <span>Tax Price</span>
                  <span>PKR {orderSummary.taxPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-600">
                    PKR {orderSummary.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedPay}
                disabled={loading}
                className="mt-6 w-full bg-gray-600 text-white font-semibold py-3 rounded-xl hover:bg-gray-700 active:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Processing…" : "Proceed to Pay"}
              </button>
            </>
          ) : (
            <p className="text-red-600 font-light flex justify-center items-center py-6">
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
