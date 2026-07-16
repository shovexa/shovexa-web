'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { FaBox, FaCheck, FaPhone, FaTruck, FaUser } from 'react-icons/fa';
import { OrderInterface, OrderProduct } from '../../utils/orderInterface';



const TrackOrderComponent = ({ product, order, setOpenTrackOrder }: { product: OrderProduct[] | null, order: OrderInterface, setOpenTrackOrder: Dispatch<SetStateAction<boolean>> }) => {

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="relative w-full md:w-[90%] max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
      <button
        className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-white transition"
        onClick={() => setOpenTrackOrder(false)}
      >
        <Image
          className="rounded-full cursor-pointer"
          src="/cross.jpg"
          alt="Close"
          width={20}
          height={20}
        />
      </button>

      <div className="mx-auto">
        <article className="rounded-2xl overflow-hidden">
          <header className="bg-gradient-to-r from-orange-600 to-amber-500 text-white px-6 py-5 text-xl font-semibold">
            My Orders / Tracking
          </header>

          <div className="p-6 space-y-6">
            <h6 className="text-sm text-gray-500 font-medium">
              Order ID: <span className="text-gray-800 font-semibold">{order._id}</span>
            </h6>

            <article className="bg-orange-50 border border-orange-100 text-gray-700 p-4 rounded-xl">
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong className="text-gray-900">Estimated Delivery time:</strong>
                  <br />
                  15-20 days
                </div>

                <div>
                  <strong className="text-gray-900">Status:</strong>
                  <br />
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                    {order.isDelivered
                      ? "Order Delivered"
                      : order.confirmed
                      ? "Order Confirmed"
                      : "Pending"}
                  </span>
                </div>

                <div>
                  <strong className="text-gray-900">Tracking #:</strong>
                  <br />
                  {order._id}
                </div>

                <div>
                  <strong className="text-gray-900">Shipped By:</strong>
                  <br />
                  Customer Support
                  <br />
                  <a
                    href="tel:+923409751709"
                    className="text-orange-600 hover:underline hover:text-orange-700 flex items-center gap-1.5 mt-1"
                  >
                    <FaPhone className="inline text-xs" /> 0333 4186523
                  </a>
                </div>
              </div>
            </article>

            {/* Tracking Steps */}
            <div className="relative flex items-start justify-between gap-2 text-sm overflow-x-auto px-2 py-4">
              <div className="absolute top-[38px] left-8 right-8 h-0.5 bg-gray-200 -z-0" />

              <div className="relative z-10 flex flex-col items-center flex-1 min-w-[80px]">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full mb-2 ${
                    order.confirmed ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FaCheck className="text-lg" />
                </span>
                <span
                  className={
                    order.confirmed
                      ? "text-orange-600 font-medium text-center"
                      : "text-gray-400 text-center"
                  }
                >
                  {order.confirmed ? "Order Confirmed" : "Order Pending..."}
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center flex-1 min-w-[80px]">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full mb-2 ${
                    order.pickedByCounter ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FaUser className="text-lg" />
                </span>
                <span
                  className={
                    order.pickedByCounter
                      ? "text-orange-600 font-medium text-center"
                      : "text-gray-400 text-center"
                  }
                >
                  Picked By Counter
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center flex-1 min-w-[80px]">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full mb-2 ${
                    order.orderShipped ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FaTruck className="text-lg" />
                </span>
                <span
                  className={
                    order.orderShipped
                      ? "text-orange-600 font-medium text-center"
                      : "text-gray-400 text-center"
                  }
                >
                  On the way
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center flex-1 min-w-[80px]">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full mb-2 ${
                    order.readyForPickup ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FaBox className="text-lg" />
                </span>
                <span
                  className={
                    order.readyForPickup
                      ? "text-orange-600 font-medium text-center"
                      : "text-gray-400 text-center"
                  }
                >
                  Ready for pickup
                </span>
              </div>
            </div>

            <hr className="border-orange-100" />

            {/* Product List */}
            <ul className="grid md:grid-cols-3 gap-4">
              {product &&
                product.map((product: OrderProduct) => (
                  <li
                    key={product.productId._id}
                    className="flex text-gray-600 items-start gap-4 bg-white border border-orange-100 rounded-xl p-3"
                  >
                    <Image
                      src={product.productId.image}
                      alt="Product"
                      width={80}
                      height={80}
                      className="border border-gray-100 rounded-lg object-contain flex-shrink-0"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-medium text-gray-900">{product.productId.title}</p>
                      <span className="text-gray-500 text-sm">
                        Price: {product.productId.price}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Quantity: {product.quantity}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>

            <hr className="border-orange-100" />
          </div>
        </article>
      </div>
    </div>
  </div>
);
};

export default TrackOrderComponent;
