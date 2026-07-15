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
      console.log(response)
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
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.success === false) {
          router.push(`/login`)
        }
      }
    }

  };
  return (
    <div className="px-6 py-10">
      {loading && <Loading />}

     

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="flex flex-col gap-3">


          {
            loading ?
              <div className="flex justify-center items-center min-h-screen">
                <Loading />
              </div>
              :

              products.length === 0 && (
                <div
                  className={`flex flex-col items-center justify-center min-h-screen px-4`}>
                  <h1 className="text-5xl font-bold text-yellow-600 mb-4">No Products Found</h1>
                  <p className="text-lg text-gray-700 mb-3 text-center max-w-md">
                    There are currently no products available. Please check back soon.
                  </p>
                </div>
              )}

            <HomeCategorySectionComponent />
             {searchedProducts && <h1 className="text-gray-600 font-semibold mb-6 text-lg">{searchResult} items found for &quot;{searchedProducts}&quot;</h1>}
      {(categoryName || sort )&&(

       <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
      Current Filter
    </p>

    <h2 className="mt-1 text-xl font-semibold text-gray-900">
      {categoryName || sort}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Showing products that match your selection.
    </p>
  </div>

  <Link
    href="/"
    className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
  >
    View All
  </Link>
</div>
      )
      }
          <div className="grid bg-transparent grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            
            {products.map((product: ProductInterface) => {
              const productId = product._id;
              const averageRating = parseFloat(getAverageRating(productId));
              const isOutOfStock = product.countInStock <= 0;
              const hasDiscount = product.discount && product.discount > 0;
              const discountPercent = hasDiscount
                ? Math.round((Number(product.discount) / Number(product.price)) * 100)
                : 0;
              const isFavorite = favProductsIds.includes(product._id);
              const stockLevel = Math.max(0, Math.min((product.countInStock / 20) * 100, 100));

              return (
                <div
                  key={product._id}
                  className="group relative   bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_24px_45px_-18px_rgba(249,115,22,0.4)] hover:-translate-y-1"
                >
                  {/* Image */}
                  <div
                    onClick={() =>
                      router.push(`/buyer/order?query=${btoa(JSON.stringify({ productId, price: product.price - product.discount, stock: product.countInStock, rating: averageRating }))}`)
                    }
                    className="relative aspect-[4/3] overflow-hidden bg-slate-50 cursor-pointer"
                  >
                    <Image
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={300}
                    />

                    {/* Discount price-tag */}
                    {hasDiscount && (
                      <div
                        className="absolute top-4 -left-1 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold pl-3 pr-4 py-1.5 shadow-lg z-10"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                        {discountPercent}% OFF
                      </div>
                    )}

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
                      className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur border border-white/60 text-rose-500 shadow-sm hover:bg-white z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isFavorite ? 0 : 1.6}>
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Sold out ribbon */}
                    {isOutOfStock && (
                      <div className="absolute top-5 -left-11 w-40 rotate-[-45deg] bg-slate-900 text-white text-[10px] font-bold tracking-[0.15em] text-center py-1 shadow-md z-10">
                        SOLD OUT
                      </div>
                    )}
                  </div>

                  {/* Perforation seam */}
                  <div className="relative h-0 border-t-2 border-dashed border-orange-100">
                    <span className="absolute -left-1 -top-[7px] h-3.5 w-3.5 rounded-full bg-orange-400" />
                    <span className="absolute -right-1 -top-[7px] h-3.5 w-3.5 rounded-full bg-orange-400" />
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-5 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 truncate">
                        {product.brand}
                      </p>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-xs font-semibold text-slate-600">{averageRating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h2 title={product.title} className="text-base font-extrabold text-slate-900 leading-snug line-clamp-2">
                      {product.title}
                    </h2>

                    <div>
                      <p
                        onClick={() => setOpenId(openId === product._id ? null : product._id)}
                        className={`text-sm leading-relaxed text-slate-500 break-words cursor-pointer ${openId === product._id ? "" : "line-clamp-1"}`}
                      >
                        {product.description}
                      </p>
                      <button
                        onClick={() => setOpenId(openId === product._id ? null : product._id)}
                        className="text-orange-600 hover:text-orange-700 font-semibold text-xs mt-0.5"
                      >
                        {openId === product._id ? "Show less" : "Show more"}
                      </button>
                    </div>

                    {/* Stock capacity bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-medium">
                        <span className={isOutOfStock ? "text-rose-600" : "text-slate-500"}>
                          {isOutOfStock ? "Sold out" : `${product.countInStock} left in stock`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isOutOfStock ? "bg-rose-400" : "bg-orange-500"}`}
                          style={{ width: `${isOutOfStock ? 100 : stockLevel}%` }}
                        />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-[10px] font-medium text-slate-400 self-center">PKR</span>
                      {hasDiscount ? (
                        <>
                          <span className="text-xl font-black text-slate-900">
                            {Number(product.price) - Number(product.discount)}
                          </span>
                          <span className="text-xs text-slate-400 line-through">{product.price}</span>
                          <span className="ml-auto text-[11px] font-bold text-orange-600 border border-dashed border-orange-300 rounded-md px-1.5 py-0.5">
                            −{discountPercent}%
                          </span>
                        </>
                      ) : (
                        <span className={`text-xl font-black ${isOutOfStock ? "text-slate-400" : "text-slate-900"}`}>
                          {product.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action bar */}
                  <button
                    disabled={isOutOfStock}
                    onClick={() => {
                      setcartId(product._id);
                      setCartLoading(true);
                      handleAddToCart(product);
                    }}

                    className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-bold tracking-wide transition-colors ${isOutOfStock ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-orange-500"}`}
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
