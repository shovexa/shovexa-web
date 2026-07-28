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
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Active", "Delevered", "Cancelled", "Refund Pending", "Refunded"]
  const [openTabMenu, setOpenTabMenu] = useState(false)
  const filteredOrders = adminOrders.filter(order => {
    let matchesTab = false;

    if (activeTab === "All") matchesTab = true;
    else if (activeTab === "Cancelled") matchesTab = order.cancelled && !order.transactionId;
    else if (activeTab === "Delevered") matchesTab = order.isDelivered && !order.cancelled;
    else if (activeTab === "Refund Pending") matchesTab = order.cancelled && Boolean(order.transactionId) && !order.refund;
    else if (activeTab === "Refunded") matchesTab = order.cancelled && Boolean(order.transactionId) && order.refund;
    else matchesTab = !order.cancelled && !order.refund && !order.isDelivered; // Active

    const matchesSearch = searchQuery.trim() === "" ||
      order._id.toLowerCase().includes(searchQuery.trim().toLowerCase());

    return matchesTab && matchesSearch;
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
      console.error("refund error", error)
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
          <div className="mb-6">
            <div className="max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order ID..."
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Searches only within the <span className="font-medium text-gray-500">{activeTab}</span> tab.
              </p>
            </div>
          </div>
          <>
  {/* Compact trigger — mobile only */}
  <div className="w-full md:hidden mb-8">
    <button
      onClick={() => setOpenTabMenu(true)}
      className="w-full flex items-center justify-between gap-3 bg-white border border-[#F0E4D8] rounded-2xl px-4 py-3 shadow-sm active:scale-[0.99] transition"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FDECE3] text-[#EA5B22] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 01.8 1.6L12 10.4V16a1 1 0 01-1.45.9l-3-1.5A1 1 0 017 14.5v-4.1L3.2 3.6A1 1 0 013 3z" clipRule="evenodd" />
          </svg>
        </span>
        <div className="flex flex-col items-start min-w-0 text-left">
          <span className="text-[11px] text-[#B0A296] font-medium leading-none mb-1">Filtering by</span>
          <span className="text-sm font-semibold text-[#241B15] truncate">{activeTab}</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-xs font-bold px-2.5 py-1 mt-0 rounded-full bg-[#EA5B22] text-white">
          {filteredOrders.length}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#B0A296]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </button>
  </div>

  {/* Bottom sheet */}
  <div className={`fixed inset-0 z-50 md:hidden ${openTabMenu ? '' : 'pointer-events-none'}`}>
    <div
      onClick={() => setOpenTabMenu(false)}
      className={`absolute inset-0 bg-[#241B15]/50 transition-opacity duration-300 ${
        openTabMenu ? 'opacity-100' : 'opacity-0'
      }`}
    />

    <div
      className={`absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
        openTabMenu ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-center pt-3">
        <span className="w-10 h-1.5 rounded-full bg-[#F0E4D8]" />
      </div>

      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <h2 className="text-base font-semibold text-[#241B15]">Filter orders</h2>
        <button
          onClick={() => setOpenTabMenu(false)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#8A7A6D] hover:bg-[#FFF8F3] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-3 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              setOpenTabMenu(false)
            }}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-1 transition-colors ${
              activeTab === tab ? 'bg-[#FDECE3]' : 'hover:bg-[#FFF8F3]'
            }`}
          >
            <span className={`text-sm font-medium ${activeTab === tab ? 'text-[#B8390E]' : 'text-[#241B15]'}`}>
              {tab}
            </span>
            {activeTab === tab && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#EA5B22]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
</>
          {/* desktop Tabs */}
          <div className="md:flex flex-wrap justify-between items-center gap-3 hidden mb-6 border-b pb-3">

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
            <div className="max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order ID..."
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Searches only within the <span className="font-medium text-gray-500">{activeTab}</span> tab.
              </p>
            </div>
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
