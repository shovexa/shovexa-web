'use client'
import React, { useEffect, useState } from 'react'

import {
    Grid2x2,
} from "lucide-react";
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

                    console.error('Error fetching category:', error.response?.data || error.message);}
            } 
        };
        fetchCategory();
    }, [API_URL]);
  
    const visibleCategories = showAll
        ? category
        : category.slice(0, 4);
    return (


        <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
   
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
                {visibleCategories.map((category) => (
                    <button
                        key={category.categoryName}
                        onClick={() => {
                            router.push(`/?category=${category.categoryName}`);
                        }}
                        
                        className="group flex flex-col items-center justify-center gap-2 rounded-xl p-2 transition-all hover:bg-orange-50"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-100 sm:h-16 sm:w-16">
                            {category.image && (
                                <Image
                                width={80}
                                height={80}
                                    src={category.image}
                                    alt={category.categoryName}
                                    className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                                />
                            )}
                        </div>

                        <span className="text-center text-xs font-medium text-gray-700 transition-colors group-hover:text-orange-500 sm:text-sm">
                            {category.categoryName}
                        </span>
                    </button>
                ))}

                {/* {!showAll && ( */}
                {
visibleCategories.length > 4 && (
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="group flex flex-col items-center justify-center gap-2 rounded-xl p-2 transition-all hover:bg-orange-50"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 transition-all duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                        <Grid2x2 className="h-8 w-8" />
                    </div>

                    <span className="text-center text-xs font-medium text-orange-500 sm:text-sm">
                        {showAll ? "View Less" : "View All"}
                    </span>
                </button>
)
                }
                {/* )} */}
            </div>
        </div>
    )
}

export default HomeCategorySectionComponent
