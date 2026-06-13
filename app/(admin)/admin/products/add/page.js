"use client";

import { useState } from "react";
import {
  ChevronDown,
  Upload,
  Plus,
  Minus,
} from "lucide-react";

export default function AddProductPage() {
  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    color: "",
    weight: "",
    length: "",
    width: "",
    description: "",
    price: "",
    salePrice: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePublish = () => {
    console.log(formData);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Add Product
        </h1>
        <p className="text-gray-500 mt-1">
          Create and publish a new product.
        </p>
      </div>

      <div className="space-y-6">
        {/* Product Description */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h2 className="font-semibold text-lg">
              Product Description
            </h2>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-gray-300 appearance-none"
                  >
                    <option value="">
                      Select Category
                    </option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Furniture</option>
                  </select>

                  <ChevronDown
                    className="absolute right-4 top-3.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand
                </label>

                <div className="relative">
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-gray-300 appearance-none"
                  >
                    <option value="">
                      Select Brand
                    </option>
                    <option>Apple</option>
                    <option>Samsung</option>
                    <option>Sony</option>
                  </select>

                  <ChevronDown
                    className="absolute right-4 top-3.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color
                </label>

                <div className="relative">
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-gray-300 appearance-none"
                  >
                    <option value="">
                      Select Color
                    </option>
                    <option>Black</option>
                    <option>White</option>
                    <option>Blue</option>
                  </select>

                  <ChevronDown
                    className="absolute right-4 top-3.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Weight (KG)
                </label>

                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                />
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Length (CM)
                </label>

                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                />
              </div>

              {/* Width */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Width (CM)
                </label>

                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write product description..."
                className="w-full rounded-lg border border-gray-300 p-4 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Availability */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h2 className="font-semibold text-lg">
              Pricing & Availability
            </h2>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sale Price
                </label>

                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                >
                  <option value="">
                    Select Status
                  </option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                  <option>Pre Order</option>
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6 max-w-md">
              <label className="block text-sm font-medium mb-2">
                Stock Quantity
              </label>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity(
                      quantity > 1
                        ? quantity - 1
                        : 1
                    )
                  }
                  className="px-5 py-3 border-r"
                >
                  <Minus size={18} />
                </button>

                <div className="flex-1 text-center">
                  {quantity}
                </div>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="px-5 py-3 border-l"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h2 className="font-semibold text-lg">
              Product Images
            </h2>
          </div>

          <div className="p-6">
            <label
              htmlFor="images"
              className="border-2 border-dashed border-gray-300 rounded-xl h-72 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
            >
              <Upload
                className="text-gray-400 mb-4"
                size={32}
              />

              <p className="font-medium">
                Upload Product Images
              </p>

              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, WEBP (Max 5MB)
              </p>

              <input
                id="images"
                type="file"
                multiple
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 border rounded-xl font-medium">
            Draft
          </button>

          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
          >
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
}