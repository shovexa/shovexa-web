import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductInterface } from "../../utils/productsInterface";
import ProductReviewFormComponent from "./ProductReviewForm.component";
import ReviewComponent from "./Review.component";

const GetProductsByIdsComponent = ({ productIds }: { productIds: string[] | [] }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const router = useRouter();
  const decoded = searchParams.get('query') && JSON.parse(atob(searchParams.get('query') || ''));
  const idsAndQuantityArr = decoded && decoded.productIds || [];
  const queryProductIds = idsAndQuantityArr || [];
  const params = useParams();
  const idParamRaw = params.id;
  const idParam = typeof idParamRaw === "string" ? idParamRaw : null;
  const [product, setProduct] = useState<ProductInterface[]>([]);
  const [countReviews, setCountReviews] = useState<{ [key: string]: number }>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const pathName = usePathname();
  const productReviewShowingRoutes = ["/buyer/order", `/buyer/product/${idParamRaw}`, "/buyer/payment-cashier"].includes(pathName);

  const getProductsByIds = async () => {
    try {
      const res = await axios.patch(`${API_URL}/getProductsByIds`, {
        productIdsArr: queryProductIds && queryProductIds.length !== 0 ? queryProductIds : productIds,
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
    getProductsByIds();
  }, []);

  return (
    <>
      {product.map((products: ProductInterface) => {
        const hasDiscount = products.discount && products.discount > 0;
        const isOutOfStock = products.countInStock <= 0;

        return (
          <div key={products._id}>
            <div className="flex flex-wrap justify-center md:flex-nowrap md:p-4 gap-6">
              <div className="rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-6 p-4 sm:p-6 border border-gray-100">
                {/* -------- Image Section (Responsive) -------- */}
                <div className="relative flex-shrink-0 w-full md:w-48 lg:w-64 xl:w-72">
                  {hasDiscount && (
                    <div className="absolute -top-2 -left-2 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 text-xs sm:text-sm">
                        {Math.round((Number(products.discount) / Number(products.price)) * 100)}% OFF
                      </div>
                      <div className="absolute -bottom-1 left-3 w-2 h-2 bg-red-700 transform rotate-45"></div>
                    </div>
                  )}

                  {products.image ? (
                    <div className="relative overflow-hidden rounded-xl shadow-md group aspect-square">
                      <Image
                        src={products.image}
                        alt={products.title || "Product image"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover rounded-xl cursor-pointer transition-transform duration-500 group-hover:scale-105"
                        onClick={() => window.open(products.image, "_blank")}
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-gray-100 text-gray-500 rounded-xl border-2 border-dashed border-gray-300">
                      No Image
                    </div>
                  )}
                </div>

                {/* -------- Product Details (Flexible) -------- */}
                <div className="flex-1 flex flex-col gap-3 w-full min-w-0">
                  {/* Title */}
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight break-words">
                    {products.title || "Untitled Product"}
                  </h1>

                  {/* Price */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {hasDiscount ? (
                      <>
                        <span className="text-xl sm:text-2xl font-bold text-green-600">
                          PKR {Number(products.price) - Number(products.discount)}
                        </span>
                        <span className="text-base sm:text-lg text-gray-500 line-through">
                          PKR {products.price?.toFixed(2)}
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                          Save {Math.round((Number(products.discount) / Number(products.price)) * 100)}%
                        </span>
                      </>
                    ) : (
                      <span className="text-xl sm:text-2xl font-bold text-green-600">
                        PKR {products.price?.toFixed(2) || 'N/A'}
                      </span>
                    )}
                  </div>

                  {/* Brand */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Brand:</span>
                    <span className="text-sm sm:text-base text-gray-900 bg-gray-100 px-3 py-0.5 sm:py-1 rounded-full">
                      {products.brand || "Unknown"}
                    </span>
                  </div>

                  {/* Description with expand/collapse */}
                  <div>
                    <h1 className="font-semibold text-gray-700 text-sm sm:text-base">Description:</h1>
                    <p
                      onClick={() => setOpenId(openId === products._id ? null : products._id)}
                      className={`text-gray-700 leading-relaxed break-words transition-all duration-300 cursor-pointer ${
                        openId === products._id ? "" : "line-clamp-3"
                      }`}
                    >
                      {products.description || "No description available."}
                    </p>
                    <button
                      onClick={() => setOpenId(openId === products._id ? null : products._id)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 flex items-center gap-1 mt-1"
                    >
                      {openId ? (
                        <>
                          <span>Show less</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Show more</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={`text-xl sm:text-2xl ${
                            index < Math.round(countReviews[products._id] || 0)
                              ? "text-amber-400"
                              : "text-gray-300"
                          }`}
                        >
                          {index < Math.round(countReviews[products._id] || 0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="#review"
                      scroll={true}
                      className="text-sm sm:text-base text-gray-700 hover:text-black underline transition-colors duration-200 font-medium"
                    >
                      {countReviews[products._id] ? countReviews[products._id] : "No"} ratings
                    </Link>
                  </div>

                  {/* Stock & Shipping */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${isOutOfStock ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                      <span className={`text-xs sm:text-sm font-medium ${isOutOfStock ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {isOutOfStock ? 'Out of Stock' : `${products.countInStock} Available`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Free Shipping</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------- Reviews (if applicable) -------- */}
              {productReviewShowingRoutes && (
                <div id="review" className="w-full space-y-6 sm:space-y-8">
                  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <ReviewComponent setCountReviews={setCountReviews} productId={products._id} />
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <ProductReviewFormComponent productId={idParam} />
                  </div>
                </div>
              )}

              <hr className="border-dashed border-gray-300 w-full my-6 sm:my-8" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GetProductsByIdsComponent;