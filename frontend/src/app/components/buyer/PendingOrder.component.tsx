import { useState, useRef } from 'react';
import Image from 'next/image';
import TrackOrderComponent from './TrackOrder.component';
import { ProductInterface } from '../../utils/productsInterface';
import { OrderInterface } from '../../utils/orderInterface';
import axios, { AxiosError } from 'axios';
import {AlertTriangle, X } from "lucide-react";
const PendingOrderComponent = ({
  fetchOrders,
  pendingOders,
  products,
}: {
  fetchOrders: () => void,
  pendingOders: OrderInterface[];
  products: ProductInterface[];
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const [openTrackOrderMap, setOpenTrackOrderMap] = useState<Record<string, boolean>>({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [productMap, setProductMap] = useState<Record<string, ProductInterface | null>>({});
  const [isCancellingMap, setIsCancellingMap] = useState<Record<string, boolean>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  // const [detailToggleBtn, SetDetailToggleBtn] = useState<boolean>(false)

const formatOrderDate = (createdAt: string | Date) => {
  const orderDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - orderDate.getTime();
  const diffMins = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMins / 60);

  const isToday = orderDate.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = orderDate.toDateString() === yesterday.toDateString();

  const timeStr = orderDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (isToday) {
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  if (isYesterday) {
    return `Yesterday at ${timeStr}`;
  }

  return orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

  const handleCancelOrder = async (orderId: string) => {

    setLoadingMap((prev) => ({ ...prev, [orderId]: true }));
    try {
      await axios.post(`${API_URL}/cancel-order/${orderId}`, {}, { withCredentials: true });
      setLoadingMap((prev) => ({ ...prev, [orderId]: false }));
      setIsCancellingMap((prev) => ({ ...prev, [orderId]: false }))
      fetchOrders()

      return pendingOders
    } catch (error: unknown) {
      setLoadingMap((prev) => ({ ...prev, [orderId]: false }));

      if (error instanceof AxiosError) {
        return;
      }
    }
  };
  return (
    <>
      {
        pendingOders.length === 0 &&
        <div className="flex flex-col items-center justify-center p-8  rounded-2xl ">

          <p className="text-sm text-gray-500 mt-2">Looks like you haven&rsquo;t placed an order yet. Start shopping to see your orders here!</p>
        </div>
      }
      <div className="space-y-6">
        {pendingOders.
        sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).
        map((order) => {
          const orderDate = new Date(order.createdAt);
          const delivered = order.isDelivered;
          const now = new Date();
          const timeDiff = (now.getTime() - orderDate.getTime()) / 1000 / 60;
          const remainingTime = Math.max(15 - timeDiff, 0);

          const openTrackOrder = openTrackOrderMap[order._id] || false;


          const product = productMap[order._id] || null;

          const isCancelling = isCancellingMap[order._id] || false;
          const loading = loadingMap[order._id] || false;

          return (
            <div key={order._id} className="border w-auto p-3   rounded-md bg-white shadow">
              <div className="flex flex-wrap justify-between items-center">
                <h2 className="font-bold text-gray-700">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>

            <p className="text-gray-600 text-sm">
  order on {formatOrderDate(order.createdAt)}
</p>
                <div className="flex items-center mt-1">
                  <span className={`inline-block w-3 h-3 rounded-full ${order.confirmed ? 'bg-green-500' : 'bg-red-500'}  mr-2`}></span>
                  <span className={`text-sm ${order.confirmed ? 'text-green-700' : 'text-red-500'} `}>
                    {order.confirmed ? 'confirm' : 'pending'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedOrderId((prev) =>
                      prev === order._id ? null : order._id
                    )
                  }}
                  className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
                >
                  {selectedOrderId === order._id
                    ? "Close Details"
                    : "View Details"}
                </button>
              </div>

              {selectedOrderId === order._id && (
                <div        
           
                  ref={detailRef} className="mt-6 p-6  rounded-xl  ">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                      <div>
                        <p className="text-xs uppercase tracking-widest text-orange-100">
                          Order ID
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-white">
                          #{order._id.slice(-6).toUpperCase()}
                        </h2>

                        <p className="mt-2 text-sm text-orange-100">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">

                        <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                          <p className="text-xs text-orange-100">
                            Status
                          </p>

                          <p className="font-semibold text-white">
                            {order.confirmed ? "Confirmed" : "Pending"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                          <p className="text-xs text-orange-100">
                            Total
                          </p>

                          <p className="font-bold text-white">
                            PKR {order.totalPrice.toFixed(0)}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
<div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
      Delivery Status
    </p>

    <div className="mt-3 flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${
          delivered ? "bg-green-500" : "bg-orange-500"
        }`}
      />

      <span
        className={`font-semibold ${
          delivered ? "text-green-600" : "text-orange-600"
        }`}
      >
        {delivered ? "Delivered" : "Pending"}
      </span>
    </div>
  </div>

  <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
      Payment Status
    </p>

    <div className="mt-3 flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${
          order.isPaid ? "bg-green-500" : "bg-orange-500"
        }`}
      />

      <span
        className={`font-semibold ${
          order.isPaid ? "text-green-600" : "text-orange-600"
        }`}
      >
        {order.isPaid ? "Paid" : "Pending"}
      </span>
    </div>
  </div>

  <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
      Transaction ID
    </p>

    <p className="mt-3 truncate text-sm font-semibold text-gray-800">
      {order.transactionId || "N/A"}
    </p>
  </div>

  <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-500 to-orange-400 p-4 text-white">
    <p className="text-xs font-medium uppercase tracking-wider text-orange-100">
      Total Amount
    </p>

    <p className="mt-2 text-2xl font-bold">
      PKR {order.totalPrice.toFixed(2)}
    </p>

    <div className="mt-3 flex justify-between text-xs text-orange-100">
      <span>Tax</span>
      <span>PKR {order.taxPrice.toFixed(2)}</span>
    </div>

    <div className="mt-1 flex justify-between text-xs text-orange-100">
      <span>Shipping</span>
      <span>PKR {order.shippingPrice.toFixed(2)}</span>
    </div>
  </div>

</div>
                  <div className=" flex gap-2 items-center justify-center flex-wrap">
                  <div className="grid gap-5 md:grid-cols-2">
<div className="space-y-4">
  {order.products.map((orderProduct) => {
    const product = products.find(
      (p) => p._id === orderProduct.productId._id
    );

    if (!product) return null;

    return (
      <div
        key={orderProduct.productId._id}
        className="overflow-hidden rounded-3xl border border-orange-100 bg-white transition hover:border-orange-300 hover:shadow-lg"
      >
        <div className="flex flex-col lg:flex-row">

          {/* Product Image */}
          <div className="flex items-center justify-center bg-orange-50 p-6 lg:w-44">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white shadow">
              <Image
              width={80}
              height={80}
                src={product.image}
                alt={product.title}
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 p-6">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Ordered Item
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                x{orderProduct.quantity}
              </span>

            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              {product.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
              {product.description}
            </p>

          </div>

          {/* Price Section */}
          <div className="border-t border-orange-100 bg-gray-50 p-6 lg:w-64 lg:border-l lg:border-t-0">

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <span className="text-gray-500">
                  Price
                </span>

                <span className="font-semibold text-gray-500">
                  PKR {orderProduct.price.toFixed(0)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">
                  Quantity
                </span>

                <span className="font-semibold text-gray-500">
                  {orderProduct.quantity}
                </span>
              </div>

              <hr />

              <div className="flex items-center justify-between">

                <span className="font-semibold text-gray-700">
                  Total
                </span>

                <span className="rounded-xl bg-orange-500 px-4 py-2 font-bold text-white">
                  PKR {(orderProduct.price * orderProduct.quantity).toFixed(0)}
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  })}
</div>
</div>

                  </div>

                  <div className={` flex ${remainingTime > 0 ? 'justify-between' : 'justify-end'}  items-center gap-4 mt-4`}>
                   
                    {!delivered && (
                      <button
                        onClick={() => {
                          setOpenTrackOrderMap((prev) => ({
                            ...prev,
                            [order._id]: !openTrackOrder,
                          }));
                          setProductMap((prev) => ({ ...prev, [order._id]: product }));
                        }}
                        className="px-4 py-2  bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition mt-4 md:mt-0"
                      >
                        Track Order
                      </button>
                    )}
           <button
  onClick={() =>{
scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedOrderId(null)
  }
    }
  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
>
  <X size={18} />
</button>
                    {openTrackOrder && (
                      <TrackOrderComponent
                        product={order.products}
                        order={order}
                        setOpenTrackOrder={() =>
                          setOpenTrackOrderMap((prev) => ({
                            ...prev,
                            [order._id]: !prev[order._id],
                          }))
                        }
                      />
                    )}

                    {remainingTime > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-red-500">
                          {Math.floor(remainingTime)} minutes left to cancel
                        </span>
                        <button
                          onClick={() =>
                            setIsCancellingMap((prev) => ({ ...prev, [order._id]: true }))
                          }
                          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition"
                        >
                          Cancel Order
                        </button>


{isCancelling && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

      {/* Close Button */}
      <button
        onClick={() =>
          setIsCancellingMap((prev) => ({
            ...prev,
            [order._id]: false,
          }))
        }
        className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
      >
        <X size={18} />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center border-b border-orange-100 bg-orange-50 px-6 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-800">
          Cancel Order?
        </h2>

        <p className="mt-2 text-center text-sm leading-6 text-gray-500">
          This action cannot be undone. Your order will be cancelled immediately.
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row">
        <button
          onClick={() =>
            setIsCancellingMap((prev) => ({
              ...prev,
              [order._id]: false,
            }))
          }
          className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Keep Order
        </button>

        <button
          id={order._id}
          onClick={() => handleCancelOrder(order._id)}
          disabled={loading}
          className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Cancelling..." : "Cancel Order"}
        </button>
      </div>

    </div>
  </div>
)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PendingOrderComponent;
