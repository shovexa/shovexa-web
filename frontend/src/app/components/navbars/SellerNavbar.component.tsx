"use client"
import React, { useRef, useState } from 'react'
import useStickyScroll from '../UseStickyScroll.component';
import { usePathname, useRouter } from 'next/navigation';
import AdminNavLinkComponent from '../seller/SellerNavBarLink.component';
import sellerAuth from '@/app/auths/sellerAuth';
import Image from 'next/image';
import { logOut } from "../../utils/LogOut";
import { useAuth } from '@/app/auths/auth';

const SellerNavbarComponent = () => {
  const { user } = useAuth()
  const accountLabel = user ? (user.email?.split('@')[0] ?? "Account") : "Account";
  const accountInitial = accountLabel.charAt(0).toUpperCase();
  const userRoles = process.env.NEXT_PUBLIC_ROLES?.split(',')
  const accountRef = useRef<HTMLDivElement>(null);
  const isSticky = useStickyScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userActionOpen, setUserActionOpen] = useState(false);
  const authRoutes = ["/sign-up", "/verify-email",
    "/seller/status/pending",
    "/seller/status/suspended",
    "/seller/status/blocked",
    "/reset-password", "/login", "/log-out"];
  const roleAuth = ["/seller"].some(route => pathName.startsWith(route));
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
  const isAuthRoute = authRoutes.includes(pathName);
  return (
    <>
      {!isAuthRoute && roleAuth && (
        <nav
          className={
            `${isSticky
              ? "fixed top-0 bg-gray-600 backdrop-blur-sm shadow-lg"
              : "relative bg-gray-900"} text-white flex justify-between items-center transition-all duration-300 w-full z-50 py-3`
          }
        >
          <div className="container md:flex md:justify-between md:items-center mx-auto px-4">
            <div className="flex flex-row flex-wrap items-center justify-between gap-4">
              <div className="flex items-center select-none">
                {/* logo */}
                <div
                  onClick={() => router.push('/seller')}
                  className="text-xl flex select-none flex-col justify-center items-center hover:text-[#F2A365] cursor-pointer font-bold tracking-tight transition-colors"
                >
                  <div>
                    <Image
                      src="/logo.jpg"
                      alt="Logo"
                      width={70}
                      height={70}
                      className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] object-center rounded-full border-2 border-[#EA5B22] hover:border-[#F2A365] transition-colors"
                    />
                  </div>
                  <div className="overflow-hidden whitespace-nowrap max-w-[90px] sm:max-w-none">
                    <div className="inline-block animate-marquee text-[14px] sm:text-[15px] font-semibold tracking-wide">
                      shovexa
                      <span className="text-[10px] ml-0.5 text-[#EA5B22]">.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile menu button */}
              <div
                className="md:hidden mb-4 flex z-50 items-center justify-center cursor-pointer w-9 h-9 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F2A365]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div
              className={
                `${!menuOpen ? 'hidden md:flex' : 'flex'} 
        flex-col md:flex-row flex-wrap gap-2 md:gap-3 p-2 
        animate-in fade-in slide-in-from-top-2 duration-200`
              }
            >
              <AdminNavLinkComponent
                href="/"
                icon={
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
                }
              >
                View Store
              </AdminNavLinkComponent>
              <AdminNavLinkComponent
                href="/seller/create-product"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                }
              >
                Add Product
              </AdminNavLinkComponent>
<AdminNavLinkComponent
  href="/"
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.447.894L10 15.118l-4.553 1.776A1 1 0 014 16V4zm2 0v10.566l3.553-1.387a1 1 0 01.894 0L14 14.566V4H6z" clipRule="evenodd" />
    </svg>
  }
>
  My Products
</AdminNavLinkComponent>
              <AdminNavLinkComponent
                href="/seller/orders"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                }
              >
                Orders
              </AdminNavLinkComponent>

              
 


<div ref={accountRef} className="relative">
  <button
    onClick={() => {
      setUserActionOpen((prev) => !prev);
      setIsMenuOpen(false);
    }}
    className={`
      group relative flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full text-sm font-medium
      border border-white/15 text-white/80 hover:text-white
      transition-all duration-200 overflow-hidden
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#241B15] focus:ring-[#EA5B22]
    `}
  >
    {/* fill that slides in on hover, same as AdminNavLinkComponent */}
    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out bg-gradient-to-r from-[#EA5B22] to-[#B8390E]" />

    {user ? (
      <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#EA5B22] to-[#B8390E] text-xs font-bold text-white shadow-sm shadow-[#EA5B22]/30 shrink-0">
        {accountInitial}
      </span>
    ) : (
      <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-[16px] w-[16px]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3.75 3.75 0 100-7.5A3.75 3.75 0 0010 9zm-7 8a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </span>
    )}
    <span className="relative z-10 max-w-[100px] truncate">{accountLabel}</span>
  </button>

  {userActionOpen && (
    <div className="absolute md:right-0 mt-3 w-52 rounded-xl border border-[#F0E4D8] bg-white shadow-xl shadow-[#241B15]/5 z-50 py-1.5 overflow-hidden">
      {user && (
        <button
          onClick={() => handleSitting('profile')}
          className="w-full text-left px-4 py-2 text-sm text-[#5C4F44] hover:bg-[#FFF8F3] hover:text-[#EA5B22] transition-colors"
        >
          Profile
        </button>
      )}
      <button
        onClick={() => handleSitting('login')}
        className="w-full text-left px-4 py-2 text-sm text-[#5C4F44] hover:bg-[#FFF8F3] hover:text-[#EA5B22] transition-colors"
      >
        Login
      </button>
      <button
        onClick={() => handleSitting('sign-up')}
        className="w-full text-left px-4 py-2 text-sm text-[#5C4F44] hover:bg-[#FFF8F3] hover:text-[#EA5B22] transition-colors"
      >
        Sign up
      </button>
      {user && (
        <>
          <div className="my-1 border-t border-[#F0E4D8]" />
          <button
            onClick={() => handleSitting('log-out')}
            className="w-full text-left px-4 py-2 text-sm text-[#B8390E] hover:bg-[#FDECE3] hover:text-[#7A2E1E] transition-colors"
          >
            Log out
          </button>
        </>
      )}
    </div>
  )}
</div>


            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export default sellerAuth(SellerNavbarComponent)
