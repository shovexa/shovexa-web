"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import PendingOrderComponent from "./PendingOrder.component";
import DeleveredOrderComponent from "./DeleveredOrder.component";
import ProductReviewComponent from "./ProductReviewForm.component";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductInterface } from "../../utils/productsInterface";
import { OrderInterface } from "../../utils/orderInterface";
import buyerAuth from "../../auths/buyerAuth";
import GetUserCartComponent from "./BuyerUserCart.component";
import FavouriteProductsComponent from "./FavorateProducts.component";
import CancelOrderComponent from "./CancelOrder.component";
import {
  Package,
  CircleCheckBig,
  CircleX,
  Heart,
  ShoppingCart,
} from "lucide-react";


const BuyerOrderComponent = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const tabFromParams = searchParams.get('tab')
  const productId = searchParams.get("product");
  const updatedSearchParams = new URLSearchParams(searchParams.toString())
  const trackPath = usePathname();
  const router = useRouter()
  const [pendingOders, setPendingOrders] = useState<OrderInterface[]>([]);
  const [deleveredOders, setDeleveredOders] = useState<OrderInterface[]>([]);
  const [cancelOrders, setCancelOrders] = useState<OrderInterface[]>([])
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: '0px',
    left: '0px',
    opacity: 0
  });


  const tabs = [
    { id: 'pending', label: 'Pending Orders' },
    { id: 'canceled', label: 'Canceled Orders' },
    { id: 'delivered', label: 'Order History' },
    { id: 'favorites', label: 'Favorite Products' },
    { id: 'cart', label: 'Cart Products' },
  ];

  useEffect(() => {
    if (tabFromParams) {
      setMenuOpen(false)
      setActiveTab(tabFromParams)
    }
  }, [tabFromParams])
  useEffect(() => {
    // Simulate indicator animation on tab change

    const activeTabElement = document.getElementById(`tab-${activeTab}`);
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({
        width: `${offsetWidth}px`,
        left: `${offsetLeft}px`,
        opacity: 1
      });
    }
  }, [activeTab]);
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/user-order`, {
        withCredentials: true,
      });
      const data = res.data.data
      const fetchedPendingOrders: OrderInterface[] = data.filter((order: OrderInterface) => !order.isDelivered);
      const fetchedDeleveredOrders: OrderInterface[] = data.filter((order: OrderInterface) => order.isDelivered);
      const fetchCancelOrders: OrderInterface[] = fetchedPendingOrders.filter((order: OrderInterface) => order.cancelled);
      const fetchedPendingOrdersAcceptedcancelled = fetchedPendingOrders.filter((order: OrderInterface) => !order.cancelled);
      setCancelOrders(fetchCancelOrders)
      setPendingOrders(fetchedPendingOrdersAcceptedcancelled);
      setDeleveredOders(fetchedDeleveredOrders);

      const productIds = [
        ...new Set(
          fetchedPendingOrders.flatMap((order) =>
            order.products.map((product) => product.productId)
          )
        ),
      ];
      if (productIds.length === 0) {
        return;
      }

      const productRes = await axios.post(
        `${API_URL}/find-ordered-products`,
        { productIds },
        { withCredentials: true }
      );
      setProducts(productRes.data.data);
    } catch  {

      router.push(`/login?track=${trackPath}&${updatedSearchParams}`)

    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const calculateRemainingMinutes = () => {
      const minutesLeft: { [key: string]: number } = {};
      pendingOders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        const timeDifference = (currentDate.getTime() - orderDate.getTime()) / (1000 * 60); // Time difference in minutes
        const remainingMinutes = 30 - timeDifference;
        minutesLeft[order._id] = remainingMinutes;
      });
    };

    calculateRemainingMinutes();
  }, [pendingOders]);



  return (
    <div className="p-3 flex flex-wrap justify-between   min-h-screen">
      {/* mobile menu  */}
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden">
  <div className="flex items-center gap-2 rounded-full border border-orange-100 bg-white/95 p-2 shadow-2xl backdrop-blur-xl">
    {tabs.map((tab) => {
      const active = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
            active
              ? "bg-orange-500 text-white scale-110"
              : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
          }`}
        >
      <span>
  {tab.id === "pending" && <Package size={22} />}
  {tab.id === "delivered" && <CircleCheckBig size={22} />}
  {tab.id === "canceled" && <CircleX size={22} />}
  {tab.id === "favorites" && <Heart size={22} />}
  {tab.id === "cart" && <ShoppingCart size={22} />}
</span>

          <span className="absolute -top-10 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            {tab.label}
          </span>
        </button>
      );
    })}
  </div>
</div>
      {/* Order Management*/}
      <div className="mx-auto mt-20 w-full max-w-7xl px-4 pb-10 md:mt-8 md:px-6">
  <div className="mb-8 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-widest text-orange-100">
        Dashboard
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        Order Management
      </h1>

      <p className="mt-2 max-w-xl text-orange-100">
        Manage your orders, track deliveries, review cancelled purchases and
        access your wishlist from one place.
      </p>
    </div>

    <div className="flex gap-4">
      <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
        <p className="text-xs uppercase text-orange-100">
          Orders
        </p>

        <p className="mt-1 text-2xl   font-bold">
          {pendingOders.length +
            deleveredOders.length +
            cancelOrders.length}
        </p>
      </div>

    
    </div>
  </div>

 <div className="mb-8 hidden md:block">
  <div className="grid grid-cols-2 gap-3  md:flex md:flex-wrap md:gap-3">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
          activeTab === tab.id
            ? "bg-orange-500 text-white shadow-lg"
            : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-600"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>

  <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-8 min-h-[450px]">
    {activeTab === "pending" && (
      <PendingOrderComponent
        fetchOrders={fetchOrders}
        pendingOders={pendingOders}
        products={products}
      />
    )}

    {activeTab === "canceled" && (
      <CancelOrderComponent
        cancelOrders={cancelOrders}
        products={products}
      />
    )}

    {activeTab === "delivered" && (
      <DeleveredOrderComponent
        fetchOrders={fetchOrders}
        deleveredOders={deleveredOders}
      />
    )}

    {activeTab === "favorites" && (
      <FavouriteProductsComponent />
    )}

    {activeTab === "cart" && (
      <GetUserCartComponent />
    )}
  </div>
</div>



      <ProductReviewComponent productId={productId} />

    </div>
  );
};

export default buyerAuth(BuyerOrderComponent);