'use client'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import FavInterface from '../../utils/favInterface'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const FavouriteProductsComponent = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [favProducts, setFavProducts] = useState<FavInterface[]>([])
  const router = useRouter();
  const getFavProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-fav-product`, { withCredentials: true })
      setFavProducts(res.data.data)

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return;
      }
    }
  }
  useEffect(() => {
    getFavProducts()
  }, [])
  const removeFavHandler = async (productId: string) => {
    try {
      await axios.delete(`${API_URL}/remove-fav/${productId}`, { withCredentials: true })
      await getFavProducts()

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return alert(error.message)
      }
    }
  }
  return (
    <>
      {favProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            No favorite product found
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            You haven’t added any products to favorites yet.
          </p>
        </div>
      )}

      <div className="animate-fadeIn">
        <div className="grid  md:grid-cols-3 md:gap-4 space-y-2 space-x-2">
          {favProducts.map((fav: FavInterface) => (
            <div
              key={fav._id}

              className="bg-transparent  border flex flex-wrap flex-col gap-3 rounded-xl p-4">

              {fav.item ?
                <>
                <div
  className=" cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl  border border-gray-100 "
  onClick={() =>
    router.push(`/buyer/order?query=${btoa(JSON.stringify({ 
      productId: fav.item._id, 
      p: fav.item.price, 
      stock: fav.item.countInStock, 
      rating: fav.item.rating 
    }))}`)
  }
>
  {/* Image Container */}
  <div className="relative overflow-hidden bg-gray-50">
    <Image
      className="w-full h-64 object-cover "
      width={400}
      height={400}
      src={fav.item.image}
      alt={fav.item.title || "Product image"}
         />
    

  </div>

  {/* Content Container */}
  <div className="p-5">
    {/* Title */}
    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
      {fav.item.title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
      {fav.item.description}
    </p>

    {/* Price & Info Row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Price */}
        <span className="text-2xl font-bold text-gray-900">
          ${typeof fav.item.price === 'number' ? fav.item.price.toFixed(2) : fav.item.price}
        </span>
        
        {/* Stock Status */}
        {fav.item.countInStock > 0 ? (
          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

   
    </div>

    {/* Additional Info */}
    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
      <span>Free shipping</span>
      <span>15-day returns</span>
    </div>
  </div>

  {/* Hover Border Effect */}
  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl pointer-events-none transition-all duration-300" />
                  <button
                    onClick={() => removeFavHandler(fav.item._id)}
                    className="text-red-500 w-32 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
</div>
                </>
                :
                  <div key={fav._id} className="text-center py-8">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex flex-wrap items-center justify-center mx-auto space-y-4 mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">
      No favorite product found. The product was removed. 
      </p>
   <button
  onClick={() => removeFavHandler(fav._id)}
  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 active:bg-red-700"
>
  Remove
</button>

    </div>
              }

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FavouriteProductsComponent
