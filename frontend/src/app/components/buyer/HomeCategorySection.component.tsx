'use client'
import React, { useEffect, useState } from 'react'
import { Grid2x2, ChevronRight } from "lucide-react";
import axios, { AxiosError } from 'axios';
import { Category } from '@/app/utils/categoryInterface';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function HomeCategorySectionComponent() {
  const [showAll, setShowAll] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${API_URL}/all-category-list`);
        setCategory(res.data.data || []);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error('Error fetching category:', error.response?.data || error.message);
        }
      }
    };
    fetchCategory();
  }, [API_URL]);

  const visibleCategories = showAll ? category : category.slice(0, 4);

  return (
    <div className="col-span-full rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-6 transition-all hover:shadow-orange-500/10">
      {/* Optional header – you can add a title like "Shop by Category" if needed */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white/90">Browse Categories</h2>
        <span className="text-xs text-orange-300/70">{category.length} categories</span>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
        {visibleCategories.map((category) => (
          <button
            key={category.categoryName}
            onClick={() => {
              router.push(`/?category=${category.categoryName}`);
            }}
            className="group flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition-all duration-300 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20 group-hover:shadow-md">
              {category.image && (
                <Image
                  width={80}
                  height={80}
                  src={category.image}
                  alt={category.categoryName}
                  className="h-9 w-9 object-contain drop-shadow-md"
                />
              )}
            </div>
            <span className="text-center text-xs font-medium text-white/80 transition-colors group-hover:text-orange-300 sm:text-sm">
              {category.categoryName}
            </span>
          </button>
        ))}

        {/* Show "View All" button only if there are more than 4 categories */}
        {visibleCategories.length > 4 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition-all duration-300 hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-orange-500/40">
              {showAll ? (
                <ChevronRight className="h-8 w-8 rotate-90" />
              ) : (
                <Grid2x2 className="h-8 w-8" />
              )}
            </div>
            <span className="text-center text-xs font-medium text-orange-300 transition-colors group-hover:text-orange-100 sm:text-sm">
              {showAll ? "Show Less" : "View All"}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default HomeCategorySectionComponent