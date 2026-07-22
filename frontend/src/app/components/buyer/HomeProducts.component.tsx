"use client";

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ProductInterface } from '../../utils/productsInterface';
import Loading from '../Loading.component';
import FavInterface from '../../utils/favInterface';
import ErrorMessage from '../ErrorMessage.component';
import { useFetchData } from '@/app/utils/useFetchData';

import Link from 'next/link';
import HomeCategorySectionComponent from './HomeCategorySection.component';
import Slider from '../Slider.component';

const Products = () => {
  const [sort, setSort] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [searchResult, setSearchResult] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<{ product: string; rating: number }[]>([]);
  const [favProductsIds, setFavProductsIds] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null)
  const router = useRouter();
  const [cartloading, setCartLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const routePath = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const searchedProducts = searchParams.get("search");
  const categoryName = searchParams.get("category");
  const value = searchParams.get("sort");
  const favIdInParams = searchParams.get("favId");
  const [cartId, setcartId] = useState<string | null>(null);

  const { fetchData } = useFetchData(setLoading);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (value) {
      setSort(value);
      if (routePath !== "/") router.push("/");
    } else setSort(null);
  }, [value, routePath, router]);

  const fetchProducts = async () => {
    try {
      const endpoint = sort ? `${API_URL}/${sort}` : `${API_URL}/get-products`;
      const response = await axios.get(endpoint);
      setProducts(response.data.data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "An error occurred while fetching products.");
      }
    }
  };

  const fetchSearchedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/search-products?search=${searchedProducts}`);
      
      setProducts(response.data.data);
      setSearchResult(response.data.data.length);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof AxiosError) setError(err.message || "An error occurred while fetching products.");
    }
  };

  useEffect(() => {
    if (searchedProducts) {
      fetchSearchedProducts();
    }
    if (!searchedProducts && !categoryName) fetchProducts();
  }, [API_URL, sort, searchedProducts, categoryName]);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-all-reviews`);
      setReviews(res.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.code === "ERR_NETWORK") return;
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [API_URL]);

  const getFavProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-fav-product`, { withCredentials: true });
      const productIds = res.data.data
        .map((fav: FavInterface) => fav.item?._id)
        .filter((id: string): id is string => Boolean(id));
      setFavProductsIds(productIds);
    } catch { }
  };

  useEffect(() => {
    getFavProducts();
  }, []);

  const categoryBaseProducts = async () => {
    if (!categoryName) return;
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/find-Category-Products?category=${encodeURIComponent(categoryName)}`);
      setProducts(res.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "An error occurred while fetching products.");
      }
    }
  };

  useEffect(() => {
    if (categoryName) categoryBaseProducts();
  }, [API_URL, categoryName]);

  const getAverageRating = (productId: string) => {
    const productReviews = reviews.filter(review => review.product === productId);
    if (!productReviews.length) return "0";
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const addToFavHandler = async (productId: string) => {
    try {
      await axios.post(`${API_URL}/add-to-fav/${productId}`, {}, { withCredentials: true });
      if (favIdInParams) alert('✅ Product added to favorite successfully');
      fetchProducts();
      getFavProducts();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push(`/login?favId=${productId}`);
      }
    }
  };

  const removeFavHandler = async (productId: string) => {
    try {
      await axios.delete(`${API_URL}/remove-fav/${productId}`, { withCredentials: true });
      getFavProducts();
    } catch { }
  };

  useEffect(() => {
    if (favIdInParams) {
      addToFavHandler(favIdInParams);
      setTimeout(() => {
        params.delete("favId");
        router.replace(`?${params.toString()}`);
      }, 3000);
    }
  }, [favIdInParams]);
  const handleAddToCart = async (product: ProductInterface) => {


    try {
      setCartLoading(true);
      await axios.post(
        `${API_URL}/createCart`,
        {
          cartItem: [
            {
              product: product._id,
              quantity: 1
            }
          ]
        },
        {
          withCredentials: true
        }
      )
      setCartLoading(false);
      router.push(`/buyer/orders?tab=cart`)
    } catch (error: unknown) {
      setCartLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.data.success === false) {
          router.push(`/login`)
        }
      }
    }

  };
  return (
    <div className="bg-gray-50 px-6 py-10 lg:px-10">
      {loading && <Loading />}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3">

          {
            loading ?
              <div className="flex justify-center items-center min-h-screen">
                <Loading />
              </div>
              :

              products.length === 0 && (
                <div
                  className={`flex flex-col items-center justify-center min-h-screen px-4`}>
                  <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">No Products Found</h1>
                  <p className="text-lg text-gray-500 mb-3 text-center max-w-md">
                    There are currently no products available. Please check back soon.
                  </p>
                </div>
              )}
<Slider />
          <HomeCategorySectionComponent />

          {searchedProducts && (
            <h1 className="mb-6 text-lg font-bold text-gray-900">
              {searchResult} items found for &quot;{searchedProducts}&quot;
            </h1>
          )}

          {(categoryName || sort) && (
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Current Filter
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-gray-900">
                  {categoryName || sort}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing products that match your selection.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-bold text-gray-900 transition hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
              >
                View All
              </Link>
            </div>
          )}

          {/* Section header, matching "Trending This Week" style
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-[30px]">
              Trending This Week
            </h2>
            <p className="mt-1.5 text-[15px] text-gray-600">
              The most sought-after pieces in Pakistan right now
            </p>
          </div> */}

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product: ProductInterface) => {
              const productId = product._id;
              const averageRating = parseFloat(getAverageRating(productId));
              const isOutOfStock = product.countInStock <= 0;
              const hasDiscount = product.discount && product.discount > 0;
              const discountPercent = hasDiscount
                ? Math.round((Number(product.discount) / Number(product.price)) * 100)
                : 0;
              const isFavorite = favProductsIds.includes(product._id);

            

              return (
                <div
                  key={product._id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                >
                  {/* Image frame */}
                  <div
                    onClick={() => {
                      router.push(`/buyer/product/${product._id}`);
                      // router.push(`/buyer/order?query=${btoa(JSON.stringify({ productId,image:product.image, price: product.price - product.discount, stock: product.countInStock, rating: averageRating }))}`);
                    }}
                    className="relative h-[280px] cursor-pointer overflow-hidden bg-gray-100 sm:h-[320px]"
                  >
                    {/* Badges */}
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                      {isOutOfStock && (
                        <span className="rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                          Sold Out
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="rounded-md bg-red-100 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-red-500">
                          -{discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (isFavorite) {
                          removeFavHandler(product._id);
                        } else {
                          addToFavHandler(product._id);
                        }
                      }}
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      className="absolute right-4 top-4 z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-rose-500 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-all duration-200 hover:scale-105"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isFavorite ? 0 : 1.6}>
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <Image
                      className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={300}
                    />

                    {/* Quick-add overlay */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-[70%] bg-gradient-to-t from-black/40 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        disabled={isOutOfStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          setcartId(product._id);
                          setCartLoading(true);
                          handleAddToCart(product);
                        }}
                        className={`w-full rounded-lg py-3 text-[13px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-colors ${isOutOfStock
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : "bg-white text-gray-900 hover:bg-[#FF6B00] hover:text-white"
                          }`}
                      >
                        {isOutOfStock ? "Unavailable" : cartloading && product._id === cartId ? "Adding..." : "Quick Add"}
                      </button>
                    </div>
                  </div>

                  {/* Info frame */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="truncate text-[11px] font-extrabold uppercase tracking-wide text-gray-400">
                        {product.brand}
                      </p>
                      <div className="flex shrink-0 items-center gap-1 text-[12px] font-bold text-amber-400">
                        <span>★</span>
                        <span className="text-gray-600">{averageRating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h2 title={product.title} className="mb-2 line-clamp-2 text-[17px] font-semibold leading-snug text-gray-900">
                      {product.title}
                    </h2>

                    <div className="mb-4">
                      <p
                        onClick={() => setOpenId(openId === product._id ? null : product._id)}
                        className={`cursor-pointer break-words text-sm leading-relaxed text-gray-500 ${openId === product._id ? "" : "line-clamp-1"}`}
                      >
                        {product.description}
                      </p>
                      <button
                        onClick={() => setOpenId(openId === product._id ? null : product._id)}
                        className="mt-0.5 text-xs font-bold text-[#FF6B00] hover:text-[#E55A00]"
                      >
                        {openId === product._id ? "Show less" : "Show more"}
                      </button>
                    </div>

                    <div className="mt-auto flex items-baseline gap-2">
                      <span className="self-center text-[10px] font-semibold text-gray-400">PKR</span>
                      {hasDiscount ? (
                        <>
                          <span className="text-[19px] font-extrabold text-gray-900">
                            {Number(product.price) - Number(product.discount)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">{product.price}</span>
                        </>
                      ) : (
                        <span className={`text-[19px] font-extrabold ${isOutOfStock ? "text-gray-400" : "text-gray-900"}`}>
                          {product.price}
                        </span>
                      )}
                      <span className={isOutOfStock ? "ml-auto text-[11px] font-semibold text-rose-500" : "ml-auto text-[11px] font-semibold text-gray-400"}>
                        {isOutOfStock ? "Sold out" : `${product.countInStock} left`}
                      </span>
                    </div>
                  </div>

                  {/* Bottom action bar */}
                  <button
                    disabled={isOutOfStock}
                    onClick={() => {
                      setcartId(product._id);
                      setCartLoading(true);
                      handleAddToCart(product);
                    }}
                    className={`flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold tracking-wide transition-colors ${isOutOfStock ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-[#FF6B00]"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 3a1 1 0 000 2h1.22l.31 1.243 1.7 6.8A2 2 0 008.16 15h6.68a2 2 0 001.94-1.51L18.16 7H6.34l-.24-1H17a1 1 0 100-2H5.22l-.22-.87A1 1 0 004 3H3zM7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm8 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    {isOutOfStock ? "Unavailable" : cartloading && product._id === cartId ? "Adding..." : "Add to cart"}
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default Products;