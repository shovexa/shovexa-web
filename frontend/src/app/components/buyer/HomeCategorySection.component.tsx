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
    <div className="col-span-full mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] sm:p-6 lg:p-8">
      <div className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl lg:text-2xl">Shop By Category</h2>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">Explore curated categories tailored for every style requirement</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-gray-400">{category.length} categories</span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-5 md:grid-cols-6 lg:grid-cols-7 lg:gap-6 xl:grid-cols-9">
        {visibleCategories.map((category) => (
          <button
            key={category.categoryName}
            onClick={() => {
              router.push(`/?category=${category.categoryName}`);
            }}
            className="group flex flex-col items-center justify-center gap-2 rounded-xl p-1.5 transition-all duration-300 sm:gap-3 sm:p-2"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-transparent bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-[#FF6B00] group-hover:shadow-[0_10px_20px_rgba(255,107,0,0.15)] sm:h-20 sm:w-20 lg:h-[100px] lg:w-[100px]">
              {category.image && (
                <Image
                  width={80}
                  height={80}
                  src={category.image}
                  alt={category.categoryName}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="line-clamp-2 text-center text-[11px] font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#FF6B00] sm:text-xs lg:text-sm">
              {category.categoryName}
            </span>
          </button>
        ))}

        {/* Show "View All" button only if there are more than 4 categories */}
        {category.length > 4 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group flex flex-col items-center justify-center gap-2 rounded-xl p-1.5 transition-all duration-300 sm:gap-3 sm:p-2"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-[0_10px_20px_rgba(255,107,0,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#E55A00] sm:h-20 sm:w-20 lg:h-[100px] lg:w-[100px]">
              {showAll ? (
                <ChevronRight className="h-6 w-6 rotate-90 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
              ) : (
                <Grid2x2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
              )}
            </div>
            <span className="text-center text-[11px] font-bold text-gray-900 transition-colors group-hover:text-[#FF6B00] sm:text-xs lg:text-sm">
              {showAll ? "Show Less" : "View All"}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default HomeCategorySectionComponent