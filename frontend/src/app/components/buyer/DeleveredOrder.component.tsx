'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { OrderInterface } from '../../utils/orderInterface';




const DeleveredOrderComponent =
  ({
    fetchOrders,
    deleveredOders,
    
  }: {
    fetchOrders: () => void;
    deleveredOders: OrderInterface[],
    
  }
  ) => {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [detailToggleBtn, SetDetailToggleBtn] = useState<boolean>(false);

    const detailRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      fetchOrders()

    }, [])
    const handleShowDetails = (orderId: string) => {
      fetchOrders()
      setSelectedOrderId(orderId);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    return (
      <>
        {deleveredOders.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8  rounded-2xl ">
            <h3 className="text-lg font-semibold text-gray-700">No Order History</h3>
            <p className="text-sm text-gray-500 mt-2">You haven not placed any orders yet.</p>
          </div>
        )}

        {deleveredOders.map((order) => (
          <div key={order._id} className="animate-fadeIn">
            <div className="flex flex-wrap items-center w-full justify-between gap-3 bg-green-50 rounded-xl p-4 mb-4">
              {order.products.map((product, productIndex) => (
                product.productId
                  ?
                  <div
                    key={`${product.productId._id}-${productIndex}`}
                    className="  w-16 h-16 flex flex-col items-center justify-center p-1"
                  >
                    <a
                      href={product.productId.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={product.productId.image}
                        alt={product.productId.title}
                        width={50}
                        height={50}
                        className="rounded object-cover cursor-pointer hover:opacity-80 transition"
                      />
                    </a>

                    <p className="text-xs text-gray-700 text-center">{product.productId.title}</p>
                  </div>
                  :
                  <div 
                  key={productIndex + Math.random()} 
                  className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-800">
                          Item No Longer Available
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          This product has been removed
                        </p>
                      </div>
                    </div>


                  </div>
              ))}

              <div className="ml-4">
                <p className="font-medium text-gray-800">Order #{order._id}</p>
                <p className="text-gray-600 text-sm">
                  Delivered on{" "}
                  {new Date(order.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center mt-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-green-700">Delivered</span>
                </div>
              </div>

              <button
                onClick={() => {
                  handleShowDetails(order._id);
                  if (selectedOrderId === order._id) {
                    SetDetailToggleBtn((prev) => !prev);
                  }
                }}
                className="ml-auto w-full text-green-600 hover:text-green-800 font-medium"
              >
                {detailToggleBtn && selectedOrderId === order._id ? "Close Details" : "View Details"}
              </button>

              {detailToggleBtn && selectedOrderId === order._id && (
                <div
                  ref={detailRef}
                  className="flex flex-col justify-between mb-8 w-full mt-3 rounded-xl bg-green-50"
                >
                  <hr className="border-t-2 border-gray-400" />

                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <span className="text-gray-400 text-sm">
                      {new Intl.DateTimeFormat("en-GB").format(new Date(order.updatedAt))}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    Delivery Status:
                    <span
                      className={`font-medium ${order.isDelivered ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {" "}
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mb-2">
                    Payment Status:
                    <span
                      className={`font-medium ${order.isPaid ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {" "}
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    transactionId:
                    <span
                      className={`font-medium text-green-500`}
                    >
                      {" "}
                      {order.transactionId}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mb-4">
                    Total Price:
                    <span className="font-medium text-gray-800">
                      ${order.totalPrice.toFixed(2)}
                    </span>{" "}
                    (Tax: ${order.taxPrice.toFixed(2)}, Shipping: $
                    {order.shippingPrice.toFixed(2)})
                  </p>
             
                  {/* <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 transition">
                      Order
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        ))}

      </>

    );


  }

export default DeleveredOrderComponent
