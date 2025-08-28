import React from 'react';
import { FaShoppingCart, FaHeart, FaEye, FaStar, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCards = ({ product }) => {
  const {
    _id,
    name,
    price,
    discountPrice,
    brand,
    images,
    rating = 4.5,
    reviewCount = 42,
    isNew = true,
    isHot = false,
    stock = 15,
  } = product || {};

  // Calculate discount percentage if discountPrice exists
  const discountPercent = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative pt-[75%] bg-gray-50 overflow-hidden">
        <img
          src={
            images && images[0]
              ? images[0]
              : 'https://via.placeholder.com/300x300'
          }
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
              NEW
            </span>
          )}
          {isHot && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md flex items-center">
              <FaFire className="mr-1" size={10} /> HOT
            </span>
          )}
        </div>

        {/* Discount badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            -{discountPercent}%
          </div>
        )}

        {/* Quick action buttons */}
        <div className="absolute top-12 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <FaHeart className="text-gray-600 hover:text-red-500" size={14} />
          </button>
          <Link to={`/products-details/${_id}`}>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <FaEye className="text-gray-600 hover:text-blue-500" size={14} />
            </button>
          </Link>
        </div>

        {/* Stock indicator for low stock items */}
        {stock < 10 && (
          <div className="absolute bottom-3 left-3 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
            Only {stock} left
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Brand name */}
        {brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {brand}
          </p>
        )}

        {/* Product name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-amber-600 transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'
                }
                size={14}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline mb-4">
            {discountPrice ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  ${discountPrice}
                </span>
                <span className="text-lg text-gray-500 line-through ml-2">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">${price}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Link
              to={`/products-details/${_id}`}
              className="flex-1  text-white py-3 rounded-lg flex items-center justify-center transition-colors font-medium group-hover:shadow-lg"
            >
              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg flex items-center justify-center transition-colors font-medium group-hover:shadow-lg">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
