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

  const fetchDiscountedProducts = async () => {
    try {
      const endpoint = `${API_URL}/get-products`
      const response = await axios.get(endpoint)
      setDiscountedProducts(
        response.data.data.filter((product: ProductInterface) => product.discount > 0)
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

  // fetch once on mount — the original depended on `discountedProducts`,
  // which re-triggered the effect every time the fetch resolved (infinite loop)
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

  // loading state
  if (loading) {
    return (
      <div className="relative w-full h-[62vh] max-h-[620px] min-h-[420px] rounded-2xl bg-ink-900/5 animate-pulse" />
    )
  }

  // empty / error state — no discounted products to show right now
  if (error || discountedProducts.length === 0) {
    return (
      <div className="relative w-full h-[62vh] max-h-[620px] min-h-[420px] rounded-2xl bg-gradient-to-br from-ink-900 to-ink-900/80 flex flex-col items-center justify-center text-center px-6">
        <span className="uppercase tracking-[0.3em] text-brand-300 text-xs font-semibold mb-3">
          Shovexa
        </span>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
          New styles are on their way
        </h2>
        <p className="text-white/70 text-sm max-w-md">
          {error ?? "Check back shortly for today's deals."}
        </p>
      </div>
    )
  }

  const product = discountedProducts[index]
  const discountPercent = Math.round((Number(product.discount) / Number(product.price)) * 100)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-[62vh] max-h-[620px] min-h-[420px] overflow-hidden rounded-2xl shadow-2xl shadow-ink-900/20 select-none"
    >
      {/* Story-style progress segments — one per discounted product */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5">
        {discountedProducts.map((p, i) => (
          <button
            key={p._id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="relative h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden"
          >
            {i === index && (
              <motion.span
                key={`${index}-${paused}`}
                initial={{ width: '0%' }}
                animate={{ width: paused ? undefined : '100%' }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                className="absolute inset-y-0 left-0 bg-brand-400 rounded-full"
                style={paused ? { width: '100%', transition: 'none' } : undefined}
              />
            )}
            {i < index && <span className="absolute inset-0 bg-brand-400/70 rounded-full" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={product._id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) next()
            else if (info.offset.x > 80) prev()
          }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <img
            src={product.image}
            alt={product.title}
            draggable={false}
            className="w-full h-full object-cover animate-kenburns pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/50 via-transparent to-transparent" />

          {/* Editorial bottom-left content block */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 md:px-14 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-8 h-px bg-brand-400" />
              <span className="uppercase tracking-[0.3em] text-brand-300 text-xs md:text-sm font-semibold">
                { 'Deal of the Day'}
              </span>
              <span className="bg-brand-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display text-3xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg max-w-2xl leading-[1.05]"
            >
              {product.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-baseline gap-2 text-white/90 mb-7"
            >
              <span className="text-xl md:text-2xl font-bold">
                PKR {product.price - product.discount}
              </span>
              <span className="text-sm text-white/50 line-through">PKR {product.price}</span>
            </motion.p>

            <div className="flex items-center gap-6">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(`/buyer/product/${product._id}`)}
                className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-full font-semibold text-sm tracking-wide shadow-lg shadow-brand-900/30 transition-colors"
              >
                Shop Now
              </motion.button>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-white/50 text-xs font-mono tracking-widest hidden sm:inline"
              >
                {String(index + 1).padStart(2, '0')} / {String(discountedProducts.length).padStart(2, '0')}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="bg-white/10 backdrop-blur-sm text-white w-10 h-10 rounded-full hover:bg-brand-500 transition-colors flex items-center justify-center"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="bg-white/10 backdrop-blur-sm text-white w-10 h-10 rounded-full hover:bg-brand-500 transition-colors flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Slider