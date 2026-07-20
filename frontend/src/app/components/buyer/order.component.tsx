"use client";

import React, { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import GetProductsByIdsComponent from "./GetProductsByIds.component";
import axios, { AxiosError } from "axios";
import { ProductInterface } from "@/app/utils/productsInterface";


interface FormData {
  quantity: number;
}

const OrderPage = () => {
  const {  formState: { errors }, setValue, setError, clearErrors } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(1);
  const searchParams = useSearchParams();
  const params = useParams();
  const idParam = params.id;
  const productIds = Array.isArray(idParam) ? idParam : idParam ? [idParam] : [];
  const decoded = searchParams.get("query") && JSON.parse(atob(searchParams.get("query") || ""));
const [product, setProduct] = useState<ProductInterface[]>([]);
  const [countReviews, setCountReviews] = useState<{ [key: string]: number }>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const getProductsByIds = async () => {
    try {
      const res = await axios.patch(`${API_URL}/getProductsByIds`, {
        productIdsArr:  productIds,
      });
      setProduct(res.data.data);
      
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          alert("Product not found, it may have been removed.");
          router.back();
          return;
        }
      }
    }
  };

useEffect(() => {
    if (productIds.length > 0) {
      getProductsByIds();
    }
}, [idParam]);
  // useEffect(() => {
  //   if (!searchParams.get("query")) {
  //     return;
  //   }
  // }, [ decoded]);

  const onSubmit = async () => {
    if(idParam === null || idParam === undefined || idParam === "") {

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-gray-500 border-b-gray-600"></div>

      <p className="mt-5 text-lg font-semibold text-gray-600">
        Processing your order...
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Please wait a moment.
      </p>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
      <div className="mx-auto max-w-7xl md:px-4">

        <div className="gap-6 lg:grid-cols-[380px_1fr]">

          {/* Checkout Card */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

  <label className="mb-4 block text-lg font-semibold text-gray-900">
    Quantity
  </label>

  <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">

    <button
      type="button"
      onClick={() =>{

        selectedQuantity !== null && selectedQuantity > 1 &&
        handleQuantityChange(selectedQuantity - 1)
      }
      }
      disabled={selectedQuantity === null || selectedQuantity === 1}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-3xl font-medium text-gray-600 transition hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      −
    </button>

    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-gray-900">
        {selectedQuantity}
      </span>
      <span className="text-sm text-gray-500">
        {selectedQuantity === 1 ? "Item" : "Items"}
      </span>
    </div>

    <button
      type="button"
      onClick={() =>
        selectedQuantity !== null && selectedQuantity < 3 &&
        handleQuantityChange(selectedQuantity + 1)
      }
      disabled={selectedQuantity === 3 || selectedQuantity === null}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500 text-3xl font-medium text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
    >
      +
    </button>

  </div>

  <div className="mt-3 flex items-center justify-between text-sm">
    <span className="text-gray-500">
      Maximum quantity
    </span>

    <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-600">
      3 Items
    </span>
  </div>

  {errors.quantity && (
    <p className="mt-3 text-sm text-red-500">
      {errors.quantity.message}
    </p>
  )}

  <button
    onClick={onSubmit}
    className="mt-6 w-full rounded-2xl bg-gray-900 py-4 text-lg font-semibold text-white transition hover:bg-gray-600 active:scale-95"
  >
    Place Order
  </button>

</div>

          {/* Product Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Product Details
              </h2>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                Review
              </span>
            </div>

            {productIds.length > 0 ? (
              <GetProductsByIdsComponent
                productIds={productIds}
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
