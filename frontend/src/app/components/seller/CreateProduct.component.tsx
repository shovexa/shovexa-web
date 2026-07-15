"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateProductSchema, CreateProductFormData } from '../../utils/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios'; import sellerAuth from '../../auths/sellerAuth';
import { Category } from '@/app/utils/categoryInterface';


// Zod schema validation


const CreateProductComponent = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [productImgPreview, setproductImgPreview] = useState<string | null>(null);
    const [categoryImgPreview, setCategoryImgPreview] = useState<string | null>(null);
    const [discountPer, setDiscountPer] = useState<number | null>(null)
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateProductFormData>({
        resolver: zodResolver(CreateProductSchema),
    });
    const categoryRegister = register("categoryName");
    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`${API_URL}/all-category-list`);
            setCategories(res.data.data);
        };

        getCategories();
    }, []);
    const filteredCategories = categories.filter(category =>
        category.categoryName
            .toLowerCase()
            .includes(categoryName.toLowerCase())
    );
    const handleProductImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setproductImgPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setproductImgPreview(null);
        }
    };
    const handleCategoryImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCategoryImgPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setCategoryImgPreview(null);
        }
    };
    const onSubmit = async (data: CreateProductFormData) => {
        setError("")
        setLoading(true)
        const formData = new FormData()
        formData.append('productImg', data.productImg[0]);
        formData.append('categoryImg', data.categoryImg[0]);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('brand', data.brand);
        formData.append('countInStock', data.countInStock.toString());
        formData.append('categoryName', data.categoryName);
        // formData.append("categoryName", categoryName);
        if (data.discount) {
            formData.append('discount', data.discount?.toString());
            if (data.discount > data.price) {
                setLoading(false)

                return alert("Discount must be smaller than price")
            }
        }

        try {
            const res = await axios.post(`${API_URL}/product/create`, formData, { withCredentials: true })


            setMessage(res.data.message)
            setTimeout(() => { setMessage("") }, 2000)
            setLoading(false)
            setCategoryName("")
            setCategoryImgPreview(null)
            reset()
            setproductImgPreview(null)




        } catch (error: unknown) {

            setLoading(false)

            if (error instanceof AxiosError) {

                setError(error.response?.data.error || "An error occurred while creating the product.")
            }
        }
    };

    return (
        <div className="w-screen  bg-white rounded-xl  shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-center text-white">Create New Product</h2>
            </div>

            <div className="p-6">


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(['title', 'brand', 'price', "discount", 'countInStock', 'categoryName'] as Array<keyof CreateProductFormData>).map((field) => (
                            <div key={field} className="space-y-1">
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                    {field === 'countInStock' ? 'Stock Quantity' :
                                        field === 'categoryName' ? 'Category' :
                                            field.charAt(0).toUpperCase() + field.slice(1)}
                                    {' '}{field === "discount" && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Optional Discount Available: {discountPer}%
                                        </span>
                                    )}

                                </label>
                                {field === 'categoryName' ? (
                                    <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Category Details
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Select a category and upload its representative image.
                                        </p>

                                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">

                                            {/* Category */}
                                            <div>
                                                <label
                                                    htmlFor={field}
                                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                                >
                                                    Category
                                                </label>


                                                <input
                                                    {...categoryRegister}
                                                    value={categoryName}
                                                    onChange={(e) => {
                                                        categoryRegister.onChange(e);
                                                        setCategoryName(e.target.value);
                                                        setShowSuggestions(true);
                                                    }}
                                                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                />
                                                {showSuggestions && filteredCategories.length > 0 && (
                                                    <div className="mt-2 rounded-lg border bg-white text-black shadow">
                                                        {filteredCategories.map(category => (
                                                            <button
                                                                type="button"
                                                                key={category._id}
                                                                onClick={() => {
                                                                    setCategoryName(category.categoryName);
                                                                    setShowSuggestions(false);
                                                                }}
                                                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                                            >
                                                                {category.categoryName}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {categoryName &&
                                                    filteredCategories.length === 0 && (
                                                        <p className="mt-2 text-sm text-blue-600">
                                                            New category will be created.
                                                        </p>
                                                    )}
                                                {errors.categoryName && (
                                                    <p className="mt-2 text-sm text-red-500">
                                                        {errors.categoryName.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Image Upload */}
                                            <div>
                                                <label
                                                    htmlFor="categoryImg"
                                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                                >
                                                    Category Image
                                                </label>

                                                {categoryImgPreview ? (
                                                    <div className="relative overflow-hidden rounded-2xl border bg-gray-50">
                                                        <img
                                                            src={categoryImgPreview}
                                                            alt="Category Preview"
                                                            className="h-52 w-full object-contain p-4"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => setCategoryImgPreview(null)}
                                                            className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow transition hover:bg-red-600"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor="categoryImg"
                                                        className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="mb-3 h-12 w-12 text-blue-500"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>

                                                        <p className="font-semibold text-gray-700">
                                                            Upload Category Image
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            PNG, JPG or WEBP
                                                        </p>

                                                        <input
                                                            id="categoryImg"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            {...register("categoryImg", {
                                                                onChange: handleCategoryImgChange,
                                                            })}
                                                        />
                                                    </label>
                                                )}

                                             
                                            </div>
                                        </div>
                                    </div>

                                ) : (
                                    <input
                                        type={
                                            field === 'price'
                                                || field === "discount"
                                                || field === 'countInStock' ? 'number' : 'text'}
                                        id={field}
                                        {...register(field)}
                                        onChange={(e) => {
                                            const id = e.currentTarget.id
                                            const value = e.currentTarget.value

                                            const price = id === "price" ? value : watch("price")
                                            const discount = id === "discount" ? value : watch("discount")

                                            if (price && discount) {
                                                const percent = Math.round((Number(discount) / Number(price)) * 100)
                                                setDiscountPer(percent)
                                            } else {
                                                setDiscountPer(0)
                                            }
                                            return register(field).onChange(e)
                                        }}

                                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                    />
                                )}
                         
                            </div>
                        ))}

                        {/* Description - Full Width */}
                        <div className="md:col-span-2 space-y-1">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register('description')}
                                rows={3}
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter product description"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {String(errors.description?.message)}
                                </p>
                            )}
                        </div>

                        {/* Image Upload with Preview */}
                        <div className="md:col-span-2 space-y-1 flex flex-col  gap-16">
                            <label htmlFor="productImg" className="block text-sm font-medium text-gray-700">
                                Product Image
                            </label>
                            <div className="flex flex-col items-center">
                                {/* Image Preview */}
                                {productImgPreview ? (
                                    <div className="relative mb-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                        <img
                                            src={productImgPreview}
                                            alt="Preview"
                                            className="max-h-60 w-auto object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setproductImgPreview(null)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                            aria-label="Remove image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center relative w-full mt-8 mb-4">
                                        <label
                                            htmlFor="productImg"
                                            className="flex absolute flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-10 w-10 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span>
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </label>

                                        <input
                                            id="productImg"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            {...register("productImg", {
                                                onChange: handleProductImgChange,
                                            })}
                                        />
                                    </div>

                                )}


                            </div>
                            {errors.productImg && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {String(errors.productImg?.message)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-10">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Product...
                                </>
                            ) : (
                                "Create Product"
                            )}
                        </button>
                    </div>
                </form>
                {/* Status Messages */}
                <div className={`text-center mb-6 p-3 rounded-lg transition-all duration-300 ${error ? "bg-red-100 text-red-700" :
                    message ? "bg-green-100 text-green-700" :
                        "bg-transparent"
                    }`}>
                    {error && (
                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    {message && (
                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default sellerAuth(CreateProductComponent);
