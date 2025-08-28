import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
} from 'react-icons/fa';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageHeight, setImageHeight] = useState('auto');
  const rightContentRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/single-products/${id}`
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Related products
  const relatedProducts = [
    {
      id: 1,
      name: 'Logitech F310 Gamepad USB port',
      description: 'Precision from two analog sticks with...',
      price: '1,900',
      image:
        'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Rapco V600 Electric Vibration Gamepad',
      price: '2,000',
      image:
        'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'XIGMATEK AIR-KILLER PRO ARCTIC AIO CPU COOLER',
      price: '2,800',
      image:
        'https://images.unsplash.com/photo-1586074299757-d8956365c5d0?w=200&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Logitech Z313 Stereo Speaker',
      price: '3,900',
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
    },
  ];

  // Function to render star ratings
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-500" />);
      }
    }

    return stars;
  };

  // Update image height when right content height changes
  useEffect(() => {
    const updateHeight = () => {
      if (rightContentRef.current && imageContainerRef.current) {
        const rightHeight = rightContentRef.current.offsetHeight;
        setImageHeight(`${rightHeight}px`);
      }
    };

    updateHeight();

    // Update on window resize
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [product]); // Added product as dependency to update when product loads

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-lg text-red-500">Product not found</p>
      </div>
    );
  }

  // Extract product details with fallbacks
  const {
    name = 'Product Name',
    category = 'Uncategorized',
    price = 0,
    discountPrice = 0,
    stock = 'Out of Stock',
    description = 'No description available',
    brand = 'Unknown Brand',
    sku = 'N/A',
    warranty = 'No warranty information',
    specifications = [],
    images = ['https://via.placeholder.com/500x500?text=No+Image'],
    rating = 0,
    reviews = 0,
    model = 'Unknown Model',
    pid = 'N/A',
  } = product;
  console.log(product);

  // Calculate discount percentage if discountPrice exists
  const discountPercent =
    discountPrice && price > 0
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  return (
    <div className="w-10/12 mx-auto py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / {category} / {brand} / {name.substring(0, 20)}...
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images - Height will match right side */}
        <div
          ref={imageContainerRef}
          style={{ height: imageHeight }}
          className="transition-all duration-300"
        >
          <div className="bg-white rounded-lg p-4 shadow-md mb-4 h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <img
                src={images[selectedImage]}
                alt={name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex gap-2 justify-center mt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`border-2 rounded cursor-pointer p-1 ${
                    selectedImage === index
                      ? 'border-amber-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info - This height will be matched by left side */}
        <div ref={rightContentRef}>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(rating)}</div>
            <span className="text-sm text-gray-600">({reviews} Reviews)</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Description:</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Product Details Table */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Stock:</td>
                  <td
                    className={`py-1 font-semibold ${
                      stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </td>
                  <td className="py-1 text-gray-600 font-medium">PID:</td>
                  <td className="py-1">{pid}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">SKU:</td>
                  <td className="py-1">{sku}</td>
                  <td className="py-1 text-gray-600 font-medium">Brand:</td>
                  <td className="py-1">{brand}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Model:</td>
                  <td className="py-1">{model}</td>
                  <td className="py-1 text-gray-600 font-medium">Warranty:</td>
                  <td className="py-1">{warranty}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Specifications */}
          {specifications && specifications.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Specifications:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Price Section */}
          <div className="mb-6">
            {discountPrice > 0 && discountPrice < price ? (
              <>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{discountPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{price.toLocaleString()}
                  </span>
                  {discountPercent > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{price.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={stock <= 0}
            >
              <FaShoppingCart className="mr-2" />
              {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={stock <= 0}
            >
              Buy Now
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex gap-4">
            <button className="flex items-center text-gray-600 hover:text-amber-500">
              <FaHeart className="mr-2" /> Add to Wishlist
            </button>
            <button className="flex items-center text-gray-600 hover:text-amber-500">
              <FaShare className="mr-2" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-3"
              />
              <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
              {product.description && (
                <p className="text-xs text-gray-600 mb-2">
                  {product.description}
                </p>
              )}
              <p className="text-lg font-bold text-gray-900">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Disclaimer */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 text-center">
          © Product Disclaimer | Any Suggestions?
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
