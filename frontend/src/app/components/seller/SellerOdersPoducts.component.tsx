'use client'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import adminOrdersInterface from '../../utils/AdminOrdersInterface';
import Image from 'next/image';
import StatusButtonComponent from '../StatusButton.component';
import sellerAuth from '../../auths/sellerAuth';


const SellerOrdersComponent = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [adminOrders, setAdminOrders] = React.useState<adminOrdersInterface[]>([])
  const [activeTab, setActiveTab] = useState("Active");
  const tabs = ["Active", "Delevered", "Cancelled", "Refund Pending", "Refunded"]
  const [openTabMenu, setOpenTabMenu] = useState(false)
  const filteredOrders = adminOrders.filter(order => {
    if (activeTab === "Cancelled") return order.cancelled && !order.transactionId;
    if (activeTab === "Delevered") return order.isDelivered && !order.cancelled;
    if (activeTab === "Refund Pending") return order.cancelled && order.transactionId && !order.refund;
    if (activeTab === "Refunded") return order.cancelled && order.transactionId && order.refund;
    return !order.cancelled && !order.refund && !order.isDelivered; // Active
  });

  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const updatedSearchParams = new URLSearchParams(searchParams.toString())
  const router = useRouter()




  const fetchAdminOderspoducts = async () => {

    try {
      const response = await axios.get(`${API_URL}/seller/get-ordered-products`, { withCredentials: true })
      const data = await response.data.data
      setAdminOrders(data)
      setLoading(false)

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setLoading(false)

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {

          router.push(`/login?track=${updatedSearchParams.toString()}`)

        }

      }

    }
  }

  useEffect(() => {
    fetchAdminOderspoducts()
  }, [API_URL])

  // handleOrderConfirmation
  const handleOrderConfirmation = async (orderId: string) => {

    try {
      await axios.patch(`${API_URL}/order-confirmation/${orderId}`, {}, { withCredentials: true })

      await fetchAdminOderspoducts()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {
          router.push(`/login?track=${updatedSearchParams.toString()}`)
        }
      }
    }
  }
  // handlePaymentConfirmation
  const handlePaymentConfirmation = async (orderId: string) => {

    try {
      await axios.patch(`${API_URL}/payment-confirmation/${orderId}`, {}, { withCredentials: true })

      await fetchAdminOderspoducts()

    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {
          router.push(`/login?track=${updatedSearchParams.toString()}`)
        }
      }
    }
  }
  // handleOrderShipping
  const handleOrderShipping = async (orderId: string) => {

    try {
      await axios.patch(`${API_URL}/order-shipping/${orderId}`, {}, { withCredentials: true })

      await fetchAdminOderspoducts()

    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {
          router.push(`/login?track=${updatedSearchParams.toString()}`)
        }
      }
    }
  }
  // handleOrderReadyForPickUp 
  const handleOrderReadyForPickUp = async (orderId: string) => {

    try {
      await axios.patch(`${API_URL}/orderReadyForPickUp/${orderId}`, {}, { withCredentials: true })

      await fetchAdminOderspoducts()

    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {
          router.push(`/login?track=${updatedSearchParams.toString()}`)
        }
      }
    }
  }

  // handleOrderDelivered
  const handleOrderDelivered = async (orderId: string) => {

    try {
      await axios.patch(`${API_URL}/order-delivered/${orderId}`, {}, { withCredentials: true })
      await fetchAdminOderspoducts()
      setLoading(false)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setLoading(false)

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {
          router.push(`/login?track=${updatedSearchParams.toString()}`)
        }
      }
    }
  }
  // handlePickByCounter
  const handlePickByCounter = async (orderId: string) => {

    try {
      await axios.patch(`${API_URL}/orderPickedByCounte/${orderId}`, {}, { withCredentials: true })

      await fetchAdminOderspoducts()

    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        const notLoggedIn = error.response?.data.error === 'Unauthorized'
        if (notLoggedIn) {
          router.push(`/login?track=${updatedSearchParams.toString()}`)
        }
      }
    }
  }
  // handleRefund
  const handleRefund = async (orderId: string) => {
    try {
      await axios.patch(`${API_URL}/refund/${orderId}`, {}, { withCredentials: true })
      await fetchAdminOderspoducts()

    } catch (error) {
      console.log("refund error", error)
    }
  }
  return (

    <div className="p-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-t-cyan-500 border-r-blue-600 border-b-indigo-600 border-l-violet-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading orders...</p>
        </div>
      ) : adminOrders.length <= 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 h-screen flex flex-col justify-center items-center text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
          <p className="text-gray-500 max-w-md mx-auto">All orders will appear here once customers start placing orders.</p>
        </div>
      ) : (

        <div>
          {/* Mobile menu */}
          <div className="flex flex-col w-full z-40 mb-8  justify-center items-center p-3  md:hidden  left-0 gap-3 bg-white ">
            <button
              onClick={() => setOpenTabMenu((prev) => !prev)}
              className="w-full flex flex-wrap justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition">
              {activeTab}
              <span
                className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full  bg-white text-blue-600`}
              >
                {filteredOrders.length}
              </span>

              <span>
                {`${openTabMenu ? '▲' : '▼'}`}
              </span>

            </button>

            {openTabMenu && <div className="flex  flex-wrap gap-2 w-full ">
              {tabs.map((tab) => {
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setOpenTabMenu(false)

                      setActiveTab(tab)

                    }}
                    className={`flex justify-between items-center w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <span>{tab}</span>

                  </button>
                );
              })}
            </div>}
          </div>
          {/* desktop Tabs */}
          <div className="md:flex flex-wrap gap-3 hidden mb-6 border-b pb-3">

            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                }}

                className={`px-4 py-2 text-sm font-medium flex flex-wrap gap-2  justify-between items-center rounded-md transition ${activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {tab}
                {
                  activeTab === tab &&
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-blue-600 `}
                  >
                    {filteredOrders.length}
                  </span>
                }
              </button>
            ))}
          </div>


          <div className={`space-y-5 ${filteredOrders.length === 0 && "h-screen"} `}>
            {
              filteredOrders.length === 0 &&
              <div className="bg-white rounded-xl shadow-sm p-12 h-screen flex flex-col justify-center items-center text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No {activeTab} orders available
                </h3>

              </div>}
            {filteredOrders.map((order) => (

              <div key={order._id} className="bg-white  rounded-xl shadow overflow-hidden border border-gray-100">
                {/* Order Header */}
                <div
                  className={`px-6 py-4 border-b ${order.cancelled ? "bg-red-50" : "bg-gray-50"
                    }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {order.cancelled && order.transactionId && (
                      <div className="flex items-center flex-wrap gap-2 justify-between ">
                        <h5 className="text-sm font-semibold text-gray-700">
                          Refund
                        </h5>
                        <p
                          className={`text-sm ${order.refund ? "text-green-600" : "text-yellow-600"
                            }`}
                        >
                          {order.refund ? "Refunded" : "Pending"}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${order.cancelled
                          ? "bg-red-100 text-red-800"
                          : order.isDelivered
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {order.cancelled
                          ? "Cancelled"
                          : order.isDelivered
                            ? "Delivered"
                            : "Active"}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        PKR {order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Customer Information */}
                    <div className="lg:col-span-1">
                      <h4 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b">Customer Information</h4>
                      {

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium text-gray-400">{order.userId ? order.userId.username : "null"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-400">{order.userId ? order.userId.email : "null"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-400">{order.userId ? order.userId.phone : 'null'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-medium text-gray-400">{order.paymentMethod}</p>
                            <p className="text-sm text-gray-500">TransactionId</p>
                            <p className="font-medium text-gray-400">{order.transactionId || 'N/A'}</p>
                          </div>
                          {/* address */}
                          <div>
                            <p className="text-sm text-gray-500">Shipping Address</p>
                            <div className="font-medium text-gray-400">
                              <p>{order.address ? `Street: ${order.address.Street}` : "null"},{order.address ? `House No:${order.address.HouseNo}` : "null"}</p>
                              <p>{order.address ? order.address.City : "null"}, {order.address ? order.address.Province : "null"}</p>
                            </div>
                          </div>
                        </div>
                      }
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-1">
                      <h4 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b">Products</h4>
                      <div className="space-y-4">

                        {
                          order.products && order.products.length > 0
                            ? order.products.map((p) => {
                              const prod = p.productId;
                              const deleted = !prod || !prod._id;

                              if (deleted) {
                                return (
                                  <div key={p._id} className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                      </div>
                                      <div>
                                        <p className="text-sm font-semibold text-red-800">Item No Longer Available</p>
                                        <p className="text-xs text-red-600 mt-1">This product has been removed</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={prod._id}
                                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden"
                                >
                                  {/* Image Container */}
                                  <div className="">
                                    <Image
                                      alt={prod.title}
                                      src={prod.image}
                                      onClick={() => window.open(prod.image, "_blank")}
                                      width={400}
                                      height={400}
                                      className=" w-full object-cover transition-transform duration-700 "

                                    />


                                    <button
                                      onClick={() => window.open(prod.image, "_blank")}

                                      className="bg-white/90 backdrop-blur-sm text-gray-700 hover:text-blue-600 p-2 rounded-lg shadow-sm transition-colors duration-200">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    </button>
                                  </div>

                                  {/* Content Container */}
                                  <div className="p-6 space-y-3">
                                    {/* Title */}
                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                      {prod.title}
                                    </h3>

                                    {/* Product Details */}
                                    <div className="flex items-center justify-between">
                                      <div className="space-y-2">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                          </div>
                                          <span>Qty: <strong className="font-semibold text-gray-900">{p.quantity}</strong></span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                              <path d="M6 4h2v16H6V4zm3 0h2v7.5l4-4V4h2v16h-2v-7.5l-4 4V20h-2V4z" />
                                            </svg>
                                          </div>
                                          <span className="text-lg font-bold text-green-700">
                                            PKR {typeof prod.price === 'number' ? prod.price.toLocaleString() : prod.price}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Subtotal (if applicable) */}
                                      {p.quantity > 1 && (
                                        <div className="text-right">
                                          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                                          <p className="text-sm font-semibold text-gray-900">
                                            PKR {typeof prod.price === 'number' ? (prod.price * p.quantity).toLocaleString() : 'N/A'}
                                          </p>
                                        </div>
                                      )}
                                    </div>

                                    {/* Additional Info */}
                                    <div className="pt-3 border-t border-gray-100">
                                      <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                          In Stock
                                        </span>
                                        <span>Free Shipping</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                            : (
                              <div className="flex items-center gap-3 p-6 bg-red-50 border border-red-200 rounded-lg">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-red-800">No Products Found</p>
                                  <p className="text-xs text-red-600">This order has no product items</p>
                                </div>
                              </div>
                            )
                        }

                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="lg:col-span-1">
                      <h4 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b">Order Management</h4>
                      {order.cancelled && order.transactionId &&
                        <div>
                          <div>

                            <StatusButtonComponent
                              label="Refund Status"
                              status={order.refund}
                              trueText="Refunded"
                              falseText="Not refunded"
                              onClick={() => handleRefund(order._id)}
                            />
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                            <h2 className="text-base font-semibold text-gray-800 mb-2">
                              Refund Payment Account
                            </h2>
                            <div className="text-sm text-gray-700 space-y-1">
                              <p>
                                <span className="font-medium text-gray-600">Platform:</span>{" "}
                                {order.paymentData?.paymentPlatform || "N/A"}
                              </p>
                              <p>
                                <span className="font-medium text-gray-600">Account Name:</span>{" "}
                                {order.paymentData?.accountUsername || "N/A"}
                              </p>
                              <p>
                                <span className="font-medium text-gray-600">Account Number:</span>{" "}
                                {order.paymentData?.accountNumber || "N/A"}
                              </p>
                            </div>
                          </div>

                        </div>

                      }
                      {!order.cancelled && order.createdAt && (() => {
                        const createdDate = new Date(order.createdAt);
                        const currentDate = new Date();
                        const minutesPassed = (currentDate.getTime() - createdDate.getTime()) / (1000 * 60);
                        const canAccess = minutesPassed >= 15;

                        if (canAccess) {
                          return (
                            <>
                              <div className="space-y-3">
                                <StatusButtonComponent
                                  label="Payment Status"
                                  status={order.isPaid}
                                  trueText="Paid"
                                  falseText="Not Paid"
                                  onClick={() => handlePaymentConfirmation(order._id)}
                                />

                                <StatusButtonComponent
                                  label="Order Confirmation"
                                  status={order.confirmed}
                                  trueText="Confirmed"
                                  falseText="Not Confirmed"
                                  onClick={() => handleOrderConfirmation(order._id)}
                                />

                                <StatusButtonComponent
                                  label="Counter Pickup"
                                  status={order.pickedByCounter}
                                  trueText="Picked by Counter"
                                  falseText="Not Picked"
                                  onClick={() => handlePickByCounter(order._id)}
                                />

                                <StatusButtonComponent
                                  label="Shipping Status"
                                  status={order.orderShipped}
                                  trueText="Shipped"
                                  falseText="Not Shipped"
                                  onClick={() => handleOrderShipping(order._id)}
                                />

                                <StatusButtonComponent
                                  label="Ready for Pickup"
                                  status={order.readyForPickup}
                                  trueText="Ready"
                                  falseText="Not Ready"
                                  onClick={() => handleOrderReadyForPickUp(order._id)}
                                />

                                <StatusButtonComponent
                                  label="Delivery Status"
                                  status={order.isDelivered}
                                  trueText="Delivered"
                                  falseText="Not Delivered"
                                  onClick={() => handleOrderDelivered(order._id)}
                                />
                              </div>
                            </>
                          );
                        } else {
                          const remaining = Math.max(0, Math.ceil(15 - minutesPassed));
                          return (
                            <div className="flex flex-wrap justify-center items-center">
                              <p className="text-sm text-gray-500 mt-2">
                                {remaining > 0
                                  ? `Order management opens in  ${remaining} ${remaining === 1 ? 'minute' : 'minutes'}.`
                                  : 'Order management will be available shortly.'}
                              </p>
                            </div>
                          );
                        }
                      })()}
                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>


  )
}




export default sellerAuth(SellerOrdersComponent)
