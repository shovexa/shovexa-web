"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import OrdersIconComponent from "../buyer/OrdersIcon.component";
import axios, { AxiosError } from "axios";
import { ProductInterface } from "../../utils/productsInterface";
import SearchComponent from "../buyer/search.component";
import CategoryComponent from "../buyer/Category.component";
import useStickyScroll from "../UseStickyScroll.component";
import { logOut } from "../../utils/LogOut";
import buyerAuth from "@/app/auths/buyerAuth";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/app/auths/auth";

const SORT_OPTIONS = [
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
    { value: "newest", label: "Newest arrivals" },
];

const BuyerNavbarComponent = () => {
    const { user } = useAuth()
    const [sortOption, setSortOption] = useState("");
    const [isProductSearched, setIsProductSearched] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userActionOpen, setUserActionOpen] = useState(false);
    const [openSortAction, setOpenSortAction] = useState(false)
    const [searchResult, setSearchResult] = useState<ProductInterface[] | null>(null);
    const searchParams = useSearchParams()
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    const searchResultParam = searchParams.get("search");
    const [searchInput, setSearchInput] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [categorisOpen, setCategorisOpen] = useState(false)
    const router = useRouter();
    const pathName = usePathname();
    const publicRoutes = ["/privacy-policy", "/request-store", "/ownership-statement", "/terms-and-conditions", "/refund-return-policy", "/shipping-policy", "/", "/contact"].includes(pathName);
    const userRoles = process.env.NEXT_PUBLIC_ROLES?.split(',')
    const authRoutes = ["/sign-up", "/verify-email", "/reset-password", "/login"];
    const isAuthRoute = authRoutes.includes(pathName);

    const roleAuth = ["/buyer"].some(route => pathName.startsWith(route));
    const sellerRoleAuth = ["/seller"].some(route => pathName.startsWith(route));
    const adminRoleAuth = ["/admin"].some(route => pathName.startsWith(route));

    const sortRef = useRef<HTMLDivElement>(null);
    const accountRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (searchResultParam) {
            setSearchInput(searchResultParam)
        }

    }, [searchResultParam, setSearchInput]);
    useEffect(() => {
        if (!searchResult) {
            setIsProductSearched(true)
        }
    }, [searchInput, setIsProductSearched])

    // Close any open dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (sortRef.current && !sortRef.current.contains(target)) setOpenSortAction(false);
            if (accountRef.current && !accountRef.current.contains(target)) setUserActionOpen(false);
            if (categoryRef.current && !categoryRef.current.contains(target)) setCategorisOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock body scroll while the mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const search = async (value: string) => {

        try {
            setIsProductSearched(false)
            const res = await axios(`${API_URL}/search-products?search=${value}`);
            const data = res.data.data;
            const uniqueProducts = Array.from(new Set(data.map((product: ProductInterface) => product.title)))
                .map(title => {
                    return data.find((product: ProductInterface) => product.title === title);
                });
            setSearchResult(uniqueProducts);

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setSearchResult([]);

                }

            }


        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchInput(value)
        if (!value) {
            setSearchResult(null)
            updatedSearchParams.delete("search")
            router.push(`?${updatedSearchParams.toString()}`);
            return
        }
        setTimeout(() => {
            if (value) {
                search(value)
            }
        }, 600);
    };

    const clearSearch = () => {
        setSearchInput("")
        setSearchResult(null)
        updatedSearchParams.delete("search")
        router.push(`?${updatedSearchParams.toString()}`);
    };

    const handleSort = (value: string) => {
        setSortOption(value)
        setOpenSortAction(false)
        router.push(`/?sort=${value}`);
    };

    const handleSitting = async (value: string) => {
        setUserActionOpen(false)
        if (value === 'log-out') {
            await logOut()
            return router.push(`/login`)
        }
        if (user?.role === userRoles?.[2] && !["sign-up", "login"].includes(value)) return router.push(`/seller/${value}`);
        if (value === 'sign-up') return router.push(`/sign-up`);
        if (value === 'login') return router.push(`/login`);
        if (value === 'profile') return router.push(`/buyer/${value}`);
        if (value === 'contact') return router.push(`/${value}`);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev)
    };

    const isSticky = useStickyScroll();

    const accountLabel = user ? (user.email?.split('@')[0] ?? "Account") : "Account";
    const accountInitial = accountLabel.charAt(0).toUpperCase();

    const chevron = (open: boolean) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );

    return (
        <>

            {(publicRoutes || (!isAuthRoute && roleAuth)) && (
                <nav
                    className={`${isSticky ? "fixed top-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]" : "relative"
                        } select-none text-white bg-orange-500 border-b border-black/10 transition-shadow duration-300 w-full z-50`}
                >
                    <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-3 py-2">
                            {/* Logo */}
                            <button
                                type="button"
                                className="group flex items-center gap-2.5 shrink-0 focus:outline-none"
                                onClick={() => {
                                    router.push("/")
                                    setSearchResult(null)
                                    setSearchInput("")
                                    setIsProductSearched(false)
                                }}
                            >
                                <span className="relative h-11 w-11 rounded-full p-[2px] bg-[conic-gradient(from_0deg,theme(colors.white),theme(colors.orange.200),theme(colors.white))] motion-safe:group-hover:animate-[spin_3s_linear_infinite]">
                                    <span className="flex h-full w-full items-center justify-center rounded-full bg-orange-500 overflow-hidden">
                                        <Image
                                            src="/logo.jpg"
                                            alt="shovexa logo"
                                            width={44}
                                            height={44}
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    </span>
                                </span>
                                <span className="hidden sm:flex flex-col items-start leading-none">
                                    <span className="text-[17px] font-bold tracking-tight text-white">
                                        shovexa
                                        <span className="ml-0.5 text-[10px] font-medium text-white/70 align-super">.com</span>
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-white/70 mt-0.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" />
                                        marketplace live
                                    </span>
                                </span>
                            </button>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
                                {!sellerRoleAuth && user?.role === userRoles?.[2] &&
                                    <Link
                                        href="/seller"
                                        className="relative px-3 py-2 text-sm font-medium text-white/85 hover:text-white transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                                    >
                                        Dashboard
                                    </Link>
                                }
                                {!adminRoleAuth && user?.role === userRoles?.[0] &&
                                    <Link
                                        href="/admin"
                                        className="relative px-3 py-2 text-sm font-medium text-white/85 hover:text-white transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                                    >
                                        Dashboard
                                    </Link>
                                }

                                {/* Search Bar */}
                                <div className="relative flex-1 max-w-xs lg:max-w-md xl:max-w-lg">
                                    <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 hover:bg-white/20 focus-within:border-white focus-within:bg-white/20 transition-colors duration-200 pl-3.5 pr-2 py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                        </svg>
                                        <input
                                            type="text"
                                            onChange={handleSearch}
                                            value={searchInput}
                                            placeholder="Search products..."
                                            className="w-full bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
                                        />
                                        {searchInput !== "" && (
                                            <button type="button" onClick={clearSearch} aria-label="Clear search" className="text-white/70 hover:text-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    {searchInput !== '' && <SearchComponent
                                        product={searchResult}
                                        isProductSearched={isProductSearched}
                                        setIsProductSearched={setIsProductSearched}
                                        setIsMenuOpen={setIsMenuOpen}

                                    />}
                                </div>

                                {/* Categories */}
                                <div ref={categoryRef} className="relative">
                                    <button
                                        onClick={() => setCategorisOpen((prev) => !prev)}
                                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 active:scale-95"
                                    >
                                        <span>Categories</span>
                                        <span
                                            className={`transition-transform duration-300 ${categorisOpen ? "rotate-180" : ""
                                                }`}
                                        >
                                            {chevron(categorisOpen)}
                                        </span>
                                    </button>
                                    {categorisOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-black/5 z-50  text-slate-700">
                                            <CategoryComponent />
                                        </div>
                                    )}
                                </div>

                                {/* Sort Dropdown */}
                                <div ref={sortRef} className="relative">
                                    <button
                                        onClick={() => {

                                            setOpenSortAction((prev) => !prev)
                                            setIsMenuOpen(false)
                                        }
                                        }
                                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 active:scale-95"
                                    >
                                        <span>
                                            {SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? "Sort by"}
                                        </span>

                                        <span
                                            className={`transition-transform duration-300 ${openSortAction ? "rotate-180" : ""
                                                }`}
                                        >
                                            {chevron(openSortAction)}
                                        </span>
                                    </button>
                                    {openSortAction && (
                                        <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-xl bg-white border border-black/5 z-50 py-1.5 overflow-hidden">
                                            {SORT_OPTIONS.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => {

                                                        handleSort(opt.value)
                                                        setIsMenuOpen(false)

                                                    }
                                                    }
                                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortOption === opt.value ? "text-orange-600 bg-orange-50 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Account */}
                                <div ref={accountRef} className="relative">
                                    <button
                                        onClick={() => {

                                            setUserActionOpen((prev) => !prev)
                                            setIsMenuOpen(false)

                                        }
                                        }
                                        className="flex items-center gap-2 py-1.5 pl-1.5 pr-3 rounded-full border border-white/25 bg-white/15 hover:bg-white/20 transition-colors"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-orange-600">
                                            {user ? accountInitial : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3.75 3.75 0 100-7.5A3.75 3.75 0 0010 9zm-7 8a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className="text-sm font-medium text-white max-w-[100px] truncate">{accountLabel}</span>
                                        {chevron(userActionOpen)}
                                    </button>
                                    {userActionOpen && (
                                        <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-xl bg-white border border-black/5 z-50 py-1.5 overflow-hidden">
                                            {!user && (
                                                <>
                                                    <button onClick={() => handleSitting('login')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Login</button>
                                                    <button onClick={() => handleSitting('sign-up')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Sign up</button>
                                                </>
                                            )}
                                            {user && (
                                                <button onClick={() => handleSitting('profile')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Profile</button>
                                            )}
                                            <button onClick={() => handleSitting('contact')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Contact us</button>
                                            {user && (
                                                <>
                                                    <div className="my-1 border-t border-slate-100" />
                                                    <button onClick={() => handleSitting('log-out')} className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors">Log out</button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="pl-1">
                                    <OrdersIconComponent />
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-black/10 transition-colors"
                                onClick={handleMenuToggle}
                                aria-label="Open menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            )}

            {/* Mobile Navigation Drawer */}
            {(publicRoutes || (!isAuthRoute && roleAuth)) && (
                <div className="md:hidden">
                    {/* Backdrop */}
                    <div
                        onClick={handleMenuToggle}
                        aria-hidden="true"
                        className={`fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-[1px] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
                            }`}
                    />

                    {/* Drawer panel */}
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        className={`fixed inset-y-0 right-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-slate-50 shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        {/* Header: account snapshot */}
                        <div className="shrink-0 bg-orange-500 px-4 pb-5 pt-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-orange-400 ring-2 ring-white/40">
                                        <Image src="/logo.jpg" alt="shovexa logo" width={36} height={36} className="h-full w-full object-cover" />
                                    </span>
                                    <span className="text-[15px] font-bold tracking-tight">
                                        shovexa<span className="text-[10px] font-medium text-white/70 align-super">.shop</span>
                                    </span>
                                </div>
                                <button
                                    onClick={handleMenuToggle}
                                    aria-label="Close menu"
                                    className="rounded-full p-1.5 text-white/90 hover:bg-white/15 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    handleSitting(user ? 'profile' : 'login')
                                }
                                }
                                className="mt-4 flex w-full items-center gap-3 rounded-xl bg-white/15 px-3 py-2.5 text-left hover:bg-white/20 transition-colors"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-orange-600 shrink-0">
                                    {user ? accountInitial : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3.75 3.75 0 100-7.5A3.75 3.75 0 0010 9zm-7 8a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold">{accountLabel}</span>
                                    <span className="block text-xs text-white/75">{user ? "View profile" : "Sign in or create an account"}</span>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto px-4 py-4">

                            {/* Search */}
                            <div className="relative">
                                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm focus-within:border-orange-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        value={searchInput}
                                        placeholder="Search products..."
                                        className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                                    />
                                    {searchInput !== "" && (
                                        <button type="button" onClick={clearSearch} aria-label="Clear search" className="text-slate-400 hover:text-slate-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <SearchComponent
                                    product={searchResult}
                                    isProductSearched={isProductSearched}
                                    setIsProductSearched={setIsProductSearched}
                                    setIsMenuOpen={setIsMenuOpen}
                                />
                            </div>

                            {/* Quick actions */}
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 shadow-sm">
                                    <OrdersIconComponent />
                                    <span className="text-[11px] font-medium text-slate-600">Orders</span>
                                </div>
                                {!sellerRoleAuth && user?.role === userRoles?.[2] && (
                                    <Link
                                        href="/seller"
                                        onClick={handleMenuToggle}
                                        className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 shadow-sm hover:border-orange-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6zM8 7a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 3a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V3z" />
                                        </svg>
                                        <span className="text-[11px] font-medium text-slate-600">Dashboard</span>
                                    </Link>
                                )}
                                {!adminRoleAuth && user?.role === userRoles?.[0] && (
                                    <Link
                                        href="/admin"
                                        onClick={handleMenuToggle}
                                        className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 shadow-sm hover:border-orange-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 1a5 5 0 00-5 5v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2H7V6a3 3 0 016 0v1a1 1 0 102 0V6a5 5 0 00-5-5z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[11px] font-medium text-slate-600">Admin</span>
                                    </Link>
                                )}
                                <button
                                    onClick={() => handleSitting('contact')}
                                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 shadow-sm hover:border-orange-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="text-[11px] font-medium text-slate-600">Contact</span>
                                </button>
                            </div>

                            {/* Browse */}
                            <p className="mt-5 mb-2 px-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Browse</p>
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                <button
                                    onClick={() => {
                                        console.log('clicked')
                                        setCategorisOpen((prev) => !prev)
                                    }

                                    }
                                    className="flex w-full items-center justify-between px-3.5 py-3 text-sm font-medium text-slate-700"
                                >
                                    <span>Categories</span>
                                    <span className="text-slate-400">{chevron(categorisOpen)}</span>
                                </button>
                                {categorisOpen && (
                                <div className=" mt-2 w-56 rounded-xl shadow-xl bg-white border border-black/5 z-50  text-slate-700">
                                            <CategoryComponent />
                                        </div>
                                )}
                                <div className="border-t border-slate-100 px-3.5 py-3">
                                    <span className="text-sm font-medium text-slate-700">Sort by</span>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {SORT_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setIsMenuOpen(false)

                                                    handleSort(opt.value)
                                                }
                                                }
                                                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${sortOption === opt.value ? "border-orange-500 bg-orange-50 text-orange-600" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Account actions */}
                            <p className="mt-5 mb-2 px-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Account</p>
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                {!user && (
                                    <>
                                        <button onClick={() => handleSitting('login')} className="w-full text-left px-3.5 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">Login</button>
                                        <button onClick={() => handleSitting('sign-up')} className="w-full text-left px-3.5 py-3 text-sm text-slate-700 hover:bg-slate-50">Sign up</button>
                                    </>
                                )}
                                {user && (
                                    <button onClick={() => handleSitting('log-out')} className="w-full text-left px-3.5 py-3 text-sm text-rose-600 hover:bg-rose-50">Log out</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};



export default buyerAuth(BuyerNavbarComponent)
