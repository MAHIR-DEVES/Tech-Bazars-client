import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaUpload, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    discountPrice: '',
    stock: '',
    description: '',
    brand: '',
    sku: '',
    warranty: '',
    specifications: [''],
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = [
    'Electronics',
    'Computers & Laptops',
    'Smartphones',
    'Gaming',
    'Audio & Video',
    'Cameras',
    'Wearables',
    'Accessories',
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Dell',
    'HP',
    'Lenovo',
    'Sony',
    'LG',
    'Microsoft',
    'Asus',
    'Acer',
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecificationChange = (index, value) => {
    const newSpecifications = [...productData.specifications];
    newSpecifications[index] = value;
    setProductData(prev => ({
      ...prev,
      specifications: newSpecifications,
    }));
  };

  const addSpecification = () => {
    setProductData(prev => ({
      ...prev,
      specifications: [...prev.specifications, ''],
    }));
  };

  const removeSpecification = index => {
    const newSpecifications = productData.specifications.filter(
      (_, i) => i !== index
    );
    setProductData(prev => ({
      ...prev,
      specifications: newSpecifications,
    }));
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Tech_Bazar');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkfxcjixb/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const urlData = await res.json();

      if (urlData.secure_url) {
        // images state update
        setProductData(prev => ({
          ...prev,
          images: [...prev.images, urlData.secure_url],
        }));

        // for image preview
        setImagePreviews(prev => [...prev, urlData.secure_url]);
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const removeImage = index => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = productData.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setProductData(prev => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        Swal.fire({
          title: 'Drag me!',
          icon: 'success',
          draggable: true,
        });

        setProductData({
          name: '',
          category: '',
          price: '',
          discountPrice: '',
          stock: '',
          description: '',
          brand: '',
          sku: '',
          warranty: '',
          specifications: [''],
          images: [],
        });
        setImagePreviews([]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  const generateSKU = () => {
    const sku = `SKU- ${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setProductData(prev => ({ ...prev, sku }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600">Add a new product to your inventory</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={productData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={productData.discountPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warranty
                  </label>
                  <input
                    type="text"
                    name="warranty"
                    value={productData.warranty}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 years"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Generate SKU
                  </button>
                </div>
                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product SKU"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Images & Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Media & Description
            </h2>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="flex flex-col items-center justify-center">
                  <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag & drop images here or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium cursor-pointer hover:bg-blue-600"
                  >
                    Browse Files
                  </label>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uploaded Images
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview  ${index}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description..."
                required
              />
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications
              </label>
              {productData.specifications.map((spec, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={e =>
                      handleSpecificationChange(index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Processor: Intel Core i5"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecification}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
              >
                <FaPlus className="w-3 h-3 mr-1" />
                Add Specification
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product .
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
