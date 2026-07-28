'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductInterface } from '../utils/productsInterface'
import axios, { AxiosError } from 'axios'

const SLIDE_DURATION = 5000

const Slider: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [discountedProducts, setDiscountedProducts] = useState<ProductInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const startRef = useRef<number>(Date.now())
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    if (discountedProducts.length <= 0) {
      return;
    }
  }, [discountedProducts])
  const fetchDiscountedProducts = async () => {
    try {
      const endpoint = `${API_URL}/get-products`
      const response = await axios.get(endpoint)
      setDiscountedProducts(
        response.data.data.filter(
          (product: ProductInterface) =>
            product.discount > 0 && product.countInStock > 0
        )
      )
      setError(null)
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || 'An error occurred while fetching products.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiscountedProducts()
  }, [])

  useEffect(() => {
    if (paused || discountedProducts.length === 0) return
    startRef.current = Date.now()
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % discountedProducts.length)
      startRef.current = Date.now()
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [paused, index, discountedProducts.length])

  const next = () => setIndex((prev) => (prev + 1) % discountedProducts.length)
  const prev = () =>
    setIndex((prev) => (prev - 1 + discountedProducts.length) % discountedProducts.length)

  if (loading) {
    return (
      <div className="relative w-full h-[62vh] max-h-[620px] min-h-[420px] rounded-2xl bg-gradient-to-br from-ink-900/10 via-amber-500/5 to-ink-900/10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative w-full h-[62vh] max-h-[620px] min-h-[420px] rounded-2xl bg-gradient-to-br from-ink-900/10 via-amber-500/5 to-ink-900/10 overflow-hidden flex items-center justify-center">
        <p className="text-white text-lg">{error}</p>
      </div>
    )
  }

  const product = discountedProducts[index]
  const discountPercent = Math.round((Number(product?.discount) / Number(product?.price)) * 100)

  return (
    discountedProducts.length > 0 &&
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-[62vh] max-h-[620px] min-h-[420px] overflow-hidden rounded-2xl shadow-2xl shadow-amber-900/20 select-none ring-1 ring-white/10"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-amber-400/20 blur-[100px] pointer-events-none z-10"
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      {/* Story-style progress segments */}
      <div className="absolute top-4 left-4 right-4 z-30 flex gap-1.5">
        {discountedProducts.map((p, i) => (
          <button
            key={p._id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="relative h-[3px] flex-1 rounded-full bg-white/20 overflow-hidden"
          >
            {i === index && (
              <motion.span
                key={`${index}-${paused}`}
                initial={{ width: '0%' }}
                animate={{ width: paused ? undefined : '100%' }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                style={paused ? { width: '100%', transition: 'none' } : undefined}
              />
            )}
            {i < index && (
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/70 to-orange-400/70 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={product?._id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) next()
            else if (info.offset.x > 80) prev()
          }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <img
            src={product?.image}
            alt={product?.title}
            draggable={false}
            className="w-full h-full object-cover animate-kenburns pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 md:px-14 md:pb-16 z-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-3"
            >
              <motion.span
                className="w-8 h-px bg-gradient-to-r from-amber-400 to-orange-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="uppercase tracking-[0.35em] bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent text-xs md:text-sm font-semibold">
                Deal of the Day
              </span>
              <motion.span
                animate={{ boxShadow: ['0 0 0px rgba(251,146,60,0.4)', '0 0 14px rgba(251,146,60,0.7)', '0 0 0px rgba(251,146,60,0.4)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              >
                {discountPercent}% OFF
              </motion.span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-6xl font-bold mb-4 max-w-2xl leading-[1.05] bg-gradient-to-br from-white via-amber-100 to-orange-200 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            >
              {product?.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex items-baseline gap-3 mb-7"
            >
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                PKR {product?.price - product?.discount}
              </span>
              <span className="text-sm text-white/40 line-through font-light">PKR {product?.price}</span>
            </motion.p>

            <div className="flex items-center gap-6">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251,146,60,0.5)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push(`/buyer/product/${product?._id}`)}
                className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-sm tracking-wide shadow-lg shadow-orange-900/40 transition-shadow group"
              >
                <span className="relative z-10">Shop Now</span>
                <motion.span
                  className="absolute inset-0 bg-white/25"
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '120%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ skewX: -20 }}
                />
              </motion.button>

              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-amber-200/60 text-xs font-mono tracking-widest hidden sm:inline"
              >
                {String(index + 1).padStart(2, '0')} / {String(discountedProducts?.length).padStart(2, '0')}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <div className="absolute bottom-6 right-6 z-30 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(251,146,60,0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          aria-label="Previous slide"
          className="bg-white/10 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
        >
          ‹
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(251,146,60,0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          aria-label="Next slide"
          className="bg-white/10 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
        >
          ›
        </motion.button>
      </div>
    </div>
  )
}

export default Slider