'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ProductInterface } from '../../utils/productsInterface'
import { OrderInterface } from '../../utils/orderInterface'
import UserPaymentForm from './UserPaymentForm.component'
import {
  Eye,
  Package2,
  PackageX,
  ShoppingBag,
  Wallet,
    CalendarDays,
  Ban,
  ChevronDown,
  ChevronUp,
  Receipt,
} from "lucide-react";
const CancelOrderComponent = ({
  cancelOrders,
  products,
}: {
  cancelOrders: OrderInterface[]
  products: ProductInterface[]
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  if (cancelOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl">
        <p className="text-sm text-gray-500 mt-2">
          You haven’t canceled any orders yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {cancelOrders.map((order) => {
        const showDetails = selectedOrderId === order._id

        return (
          <div key={order._id} className="border p-4 rounded-md bg-white shadow">
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

    <div className="space-y-3">

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
          <Receipt className="h-6 w-6 text-gray-600" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Order ID
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            #{order._id.slice(-6).toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">

        <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
          <Ban size={16} />
          Cancelled
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <CalendarDays size={16} className="text-gray-500" />
          {new Date(order.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

      </div>

    </div>

    <button
      onClick={() =>
        setSelectedOrderId((prev) =>
          prev === order._id ? null : order._id
        )
      }
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-500 px-6 py-3 font-semibold text-white transition hover:bg-gray-600"
    >
      {showDetails ? (
        <>
          <ChevronUp size={18} />
          Hide Details
        </>
      ) : (
        <>
          <ChevronDown size={18} />
          View Details
        </>
      )}
    </button>

  </div>
</div>

            {showDetails && (
              <div className="mt-6 flex flex-wrap justify-between border-t pt-4">
                <div>
                  {order.transactionId && <p className="text-sm text-gray-600 mb-1">
                    Refund Status:{' '}
                    <span
                      className={`font-medium ${order.refund ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                      {order.refund ? 'Refunded' : 'Pending'}
                    </span>
                  </p>}

                  <p className="text-sm text-gray-600 mb-1">
                    Transaction ID:{' '}
                    <span className="text-green-500 font-medium">
                      {order.transactionId || 'N/A'}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mb-3">
                    Total Amount:{' '}
                    <span className="font-medium text-gray-800">
                      PKR {order.totalPrice.toFixed(2)}
                    </span>{' '}
                    (Tax: PKR {order.taxPrice.toFixed(2)}, Shipping: PKR{' '}
                    {order.shippingPrice.toFixed(2)})
                  </p>
                  <div className="flex flex-wrap gap-4 justify-start">
                    {order.products.map((orderProduct) => {
                      const product = products.find(
                        (p) => p._id === orderProduct.productId._id
                      )


                      return (
                        product ?
            
<div
  key={orderProduct.productId._id}
  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
>
  <div className="flex flex-col gap-5 p-5 md:flex-row">

    {/* Product Image */}
    <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-2xl bg-gray-50 md:mx-0">
      <Image
        src={product.image}
        alt={product.title}
        fill
        onClick={() => window.open(product.image, "_blank")}
        className="cursor-pointer object-cover transition duration-300 group-hover:scale-110"
      />
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col">

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            Ordered Product
          </span>

          <h3 className="mt-3 line-clamp-2 text-xl font-bold text-gray-800">
            {product.title}
          </h3>
        </div>

        <button
          onClick={() => window.open(product.image, "_blank")}
          className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-500 hover:text-white"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-gray-600">
            <Wallet size={18} />
            <span className="text-xs font-semibold uppercase">
              Price
            </span>
          </div>

          <p className="text-lg font-bold text-gray-900">
            PKR {orderProduct.price.toFixed(0)}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-gray-700">
            <Package2 size={18} />
            <span className="text-xs font-semibold uppercase">
              Quantity
            </span>
          </div>

          <p className="text-lg font-bold text-gray-900">
            {orderProduct.quantity}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-500 p-4 text-white">
          <div className="mb-2 flex items-center gap-2">
            <ShoppingBag size={18} />
            <span className="text-xs font-semibold uppercase">
              Subtotal
            </span>
          </div>

          <p className="text-lg font-bold">
            PKR {(orderProduct.price * orderProduct.quantity).toFixed(0)}
          </p>
        </div>

      </div>
    </div>

  </div>
</div>
                          :
               

<div
  key={order._id}
  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-5 shadow-sm"
>
  <div className="flex items-center gap-4">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
      <PackageX className="h-7 w-7 text-gray-600" />
    </div>

    <div>
      <h3 className="text-base font-semibold text-gray-800">
        Product Unavailable
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        This item is no longer available in our store.
      </p>
    </div>
  </div>

  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
    Removed
  </span>
</div>


                          

                      )
                    })}
                  </div>
                </div>

                {
                  order.transactionId && order.cancelled && !order.refund &&
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Refund will be issued to:
                    </p>
                    <UserPaymentForm />

                  </div>
                }
              </div>
            )}

          </div>
        )
      })}
    </div>
  )
}

export default CancelOrderComponent
