import { Dispatch, SetStateAction, useState } from 'react';
import { FiX, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { ProductInterface } from '../../utils/productsInterface';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const CartPanel = ({
  product,
  setShowAddTocart
}: {
  product: ProductInterface,
  setShowAddTocart: Dispatch<SetStateAction<boolean>>
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const API = process.env.NEXT_PUBLIC_API_URL

  const handleAddToCart = async () => {
    if (quantity < 1 || product.countInStock < 1) return;

    setIsAdding(true);

    try {
      await axios.post(
        `${API}/createCart`,
        {
          cartItem: [
            {
              product: product._id,
              quantity: quantity
            }
          ]
        },
        {
          withCredentials: true
        }
      )
      router.push(`/buyer/orders?tab=cart`)
    } catch (error: unknown) {

      if (error instanceof AxiosError) {
        if (error.response?.data.success === false) {
          router.push(`/login`)
        }
      }
    }

    setTimeout(() => {
      setIsAdding(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 1000);
  };

  const increment = () => setQuantity(prev => Math.min(prev + 1, 3));
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 1));
  const closePanel = () => setShowAddTocart((prev) => !prev);

  const isOutOfStock = product.countInStock <= 0;
  const hasDiscount = product.discount > 0;
  const discountPercent = hasDiscount
    ? Math.round((Number(product.discount) / Number(product.price)) * 100)
    : 0;

  return (
    <div 
    className="fixed inset-0 z-50   flex justify-end"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={closePanel}
      />

      {/* Cart Panel */}
      <div 
      className="relative max-w-md w-full   h-full bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
              <FiShoppingCart size={16} />
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">Add to Cart</h2>
          </div>
          <button
            onClick={closePanel}
            className="p-2 rounded-full hover:bg-gray-50 text-slate-400 hover:text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {/* Product line */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{product.brand}</p>
              <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">{product.title}</h3>
            </div>
            <span className={`shrink-0 text-[11px] font-semibold px-2 py-1 rounded-full ${isOutOfStock ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {isOutOfStock
                ? 'Out of stock'
                : product.countInStock > 5
                  ? 'In stock'
                  : `${product.countInStock} left`}
            </span>
          </div>

          {/* Price Display */}
          <div className="flex items-end gap-2 mt-4">
            <span className="text-3xl font-black text-slate-900">
              PKR {Number(product.price) - Number(product.discount)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-slate-400 line-through text-base mb-0.5">
                  PKR {Number(product.price).toFixed(2)}
                </span>
                <span className="ml-auto mb-0.5 text-[11px] font-bold text-gray-600 border border-dashed border-gray-300 rounded-md px-1.5 py-0.5">
                  −{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mt-7">
            <label className="block text-sm font-semibold text-slate-700 mb-2.5">
              Quantity
            </label>
            <div className="flex items-center w-fit rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={decrement}
                disabled={quantity <= 1}
                className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors ${quantity <= 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-white hover:text-gray-600 hover:shadow-sm'
                  }`}
              >
                <FiMinus size={16} />
              </button>

              <input
                type="text"
                value={quantity}
                readOnly
                className="w-10 bg-transparent text-center text-slate-900 font-bold text-sm"
              />

              <button
                onClick={increment}
                disabled={quantity >= product.countInStock}
                className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors ${quantity >= product.countInStock
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-white hover:text-gray-600 hover:shadow-sm'
                  }`}
              >
                <FiPlus size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Max 3 per order</p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock || isSuccess}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold mt-6 transition-all duration-300 ${isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : isSuccess
                ? 'bg-emerald-500 text-white'
                : isAdding
                  ? 'bg-gray-400 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/25'
              }`}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : isSuccess ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added to cart!
              </>
            ) : (
              <>
                <FiShoppingCart size={18} />
                Add to cart
              </>
            )}
          </button>

          {/* Perforated seam */}
          <div className="relative h-0 mt-7 mb-6 border-t-2 border-dashed border-gray-100">
            <span className="absolute -left-5 -top-[7px] h-3.5 w-3.5 rounded-full bg-gray-400" />
            <span className="absolute -right-5 -top-[7px] h-3.5 w-3.5 rounded-full bg-gray-400" />
          </div>

          {/* Product Details */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-2.5 uppercase tracking-wide">
              About this product
            </h3>
            <div className="space-y-2">
              <p
                onClick={() => setOpen((prev => !prev))}
                className={open ?
                  "text-sm text-slate-600 leading-relaxed break-words transition-all duration-300 cursor-pointer" :
                  "text-sm text-slate-600 leading-relaxed line-clamp-3 break-words transition-all duration-300 cursor-pointer"
                }>
                {product.description || "No description available."}
              </p>
              <button
                onClick={() => setOpen((prev => !prev))}
                className="text-gray-600 hover:text-gray-700 font-semibold text-xs transition-colors duration-200 flex items-center gap-1"
              >
                {open ? (
                  <>
                    <span>Show less</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Show more</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm font-semibold text-slate-700">Brand</span>
              <span className="text-sm text-slate-500">{product.brand}</span>
            </div>
          </div>

          {/* Order Benefits */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
              Order benefits
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 h-8 w-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Free shipping</h4>
                  <p className="text-sm text-slate-500">Delivered in 3-5 business days</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 h-8 w-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">30-day returns</h4>
                  <p className="text-sm text-slate-500">Money-back guarantee</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 h-8 w-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">24/7 support</h4>
                  <p className="text-sm text-slate-500">Dedicated customer service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={closePanel}
            className="w-full py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-full transition-colors"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;