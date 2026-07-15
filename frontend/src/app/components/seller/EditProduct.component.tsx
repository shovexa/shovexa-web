'use client';

import { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { ProductInterface } from '../../utils/productsInterface';
import Image from 'next/image';
import { Category } from '@/app/utils/categoryInterface';



const EditProductComponent = ({ refresh, setEditProductId, product }: { refresh: Dispatch<SetStateAction<ProductInterface[]>>, setEditProductId: Dispatch<SetStateAction<string | ''>>, product: ProductInterface | null }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [categoryImgPreview, setCategoryImgPreview] = useState<string | null>(null);


  const [formData, setFormData] = useState({
    categoryName: product?.category.categoryName || '',
    title: product?.title || '',
    price: product?.price || 0,
    description: product?.description || '',
    countInStock: product?.countInStock || 0,
    brand: product?.brand || '',
    discount: product?.discount
  });

  const [productImage, setProductImage] = useState<File | null>(null);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | ''>('')
  const [loading, setLoading] = useState(false);
  const percent = Math.round((Number(formData.discount) / Number(formData.price)) * 100)

  const editBtnRef = useRef<HTMLButtonElement | null>(null);
const [categoryName, setCategoryName] = useState(
  product?.category.categoryName || ""
);
const [categories, setCategories] = useState<Category[]>([]);
const [showSuggestions, setShowSuggestions] = useState(false);

const filteredCategories = categories.filter((category) =>
  category.categoryName
    .toLowerCase()
    .includes(categoryName.toLowerCase())
);
  useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`${API_URL}/all-category-list`);
            setCategories(res.data.data);
        };

        getCategories();
    }, []);
  const onClose = () => {
    setEditProductId('')
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setProductImage(file);
    }
  };
  const handleCategoryImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCategoryImgPreview(URL.createObjectURL(file));
      setCategoryImage(file);
    }
  };
useEffect(() => {
  if (!product) return;

  setCategoryName(product.category.categoryName);

  setFormData({
    categoryName: product.category.categoryName,
    title: product.title,
    price: product.price,
    description: product.description,
    countInStock: product.countInStock,
    brand: product.brand,
    discount: product.discount,
  });
}, [product]);
  const editProduct = async () => {
    setError('')
    if (!product) return;
    setLoading(true);
    try {
      const data = new FormData();
      data.append('categoryName', formData.categoryName);
      data.append('title', formData.title);
      data.append('price', formData.price.toString());
      data.append('description', formData.description);
      data.append('countInStock', formData.countInStock.toString());
      data.append('brand', formData.brand);
      console.log('productImage', productImage)
      console.log('categoryImage', categoryImage)
      if (productImage) data.append('productImg', productImage);
      if (categoryImage) data.append('categoryImg', categoryImage);
      if (formData.discount && formData.discount > 0) data.append('discount', formData.discount.toString());
      if (formData.discount && formData.discount > formData.price) {

        return alert("Discount must be smaller than price")
      }
      await axios.patch(`${API_URL}/product/update/${product._id}`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditProductId('')


      refresh((prev) => prev) // or fetch updated products and pass them here
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data?.error || 'Failed to update product');
      }

      ;
    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          editBtnRef.current?.scrollIntoView({ behavior: 'smooth' });

          editProduct()
        }
      }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">

        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">EDIT PRODUCT</h2>
        <div className="space-y-4">
          <label className='text-gray-400 text-sm' htmlFor="categoryName">CATEGORY NAME</label>

          <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Category Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a category and upload its representative image.
            </p>

            <div className="mt-6  grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Category */}
              <div>
           

                
<div>
  <label
    htmlFor="categoryName"
    className="mb-2 block text-sm font-semibold text-gray-700"
  >
    Category
  </label>

  <input
    type="text"
    value={categoryName}
    onChange={(e) => {
      setCategoryName(e.target.value);

      setFormData((prev) => ({
        ...prev,
        categoryName: e.target.value,
      }));

      setShowSuggestions(true);
    }}
    placeholder="Search or create category"
    className="w-full rounded-xl border px-4 py-3 text-black"
  />

  {showSuggestions && filteredCategories.length > 0 && (
    <div className="mt-2 rounded-lg border bg-white shadow">
      {filteredCategories.map((category) => (
        <button
          type="button"
          key={category._id}
          onClick={() => {
            setCategoryName(category.categoryName);

            setFormData((prev) => ({
              ...prev,
              categoryName: category.categoryName,
            }));

            setShowSuggestions(false);
          }}
          className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  )}

  {categoryName && filteredCategories.length === 0 && (
    <p className="mt-2 text-sm text-blue-600">
      New category will be created.
    </p>
  )}
</div>

              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="categoryImg"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Category Image
                </label>

                {(product?.category.image) ? (
                  <div className="relative overflow-hidden rounded-2xl border bg-gray-50">
                    <img
                      src={categoryImgPreview || product?.category.image}
                      alt="Category Preview"
                      className="h-52 w-full object-contain p-4"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCategoryImgChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                ) :
                  (
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
                        onChange={handleCategoryImgChange}
                      />
                    </label>
                  )}


              </div>
            </div>
             
          </div>
          <label className='text-gray-400 text-sm' htmlFor="title">TITLE</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
          <label className='text-gray-400 text-sm' htmlFor="price">PRICE</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
          <label className='text-gray-400 text-sm' htmlFor="price">DISCOUNT</label>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Optional Discount Available: {percent}%
          </span>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="discount"
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
          <label className='text-gray-400 text-sm' htmlFor="description">DESCRIPTION</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded h-24 text-black resize-none"
          />
          <label className='text-gray-400 text-sm' htmlFor="countInStock">COUNT IN STACK</label>
          <input
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            placeholder="Stock Count"
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
          <label className='text-gray-400 text-sm ' htmlFor="brand">BRAND</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-2 border border-gray-300 rounded text-black"
          />

          {/* Image + File Input */}
          <div className="relative w-full h-60 border border-gray-300 rounded overflow-hidden">
            {product?.image && (
              <Image
                src={previewUrl ? previewUrl : product?.image}
                width={300}
                height={300}
                alt="Product image"
                className="object-contain w-full h-full"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImgChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {
            error &&
            <p className='text-red-500 text-sm'>{error}</p>
          }

          <button
            ref={editBtnRef}
            onClick={editProduct}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </div>
    </div>


  );
};

export default EditProductComponent;
