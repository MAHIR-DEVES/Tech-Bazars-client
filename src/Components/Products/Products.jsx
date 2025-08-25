import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router';

const Products = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      discount: '12%',
      name: 'DEEPCOOL DOBSOM-V3L 850W 80+ GOLD FULL MODULAR POWER SUPPLY',
      price: '1,400',
      shipping: '+199',
      image:
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=350&fit=crop',
      category: 'Power Supplies',
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      discount: '15%',
      name: 'CORSAIR RM850x 80+ GOLD FULLY MODULAR POWER SUPPLY',
      price: '1,550',
      shipping: '+199',
      image:
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=350&fit=crop',
      category: 'Power Supplies',
      rating: 4.8,
      reviews: 204,
    },
    {
      id: 3,
      discount: '8%',
      name: 'SEASONIC FOCUS GX-850 80+ GOLD MODULAR PSU',
      price: '1,320',
      shipping: '+199',
      image:
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500&h=350&fit=crop',
      category: 'Power Supplies',
      rating: 4.6,
      reviews: 97,
    },
    {
      id: 4,
      discount: '10%',
      name: 'EVGA SUPERNOVA 850 G5 80+ GOLD MODULAR POWER SUPPLY',
      price: '1,450',
      shipping: '+199',
      image:
        'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=500&h=350&fit=crop',
      category: 'Power Supplies',
      rating: 4.4,
      reviews: 153,
    },
    {
      id: 5,
      discount: '18%',
      name: 'NVIDIA GeForce RTX 4070 Ti 12GB GDDR6X Graphics Card',
      price: '59,999',
      shipping: '+299',
      image:
        'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=500&h=350&fit=crop',
      category: 'Graphics Cards',
      rating: 4.9,
      reviews: 342,
    },

    {
      id: 7,
      discount: '22%',
      name: 'Intel Core i9-13900K Desktop Processor 24 Cores',
      price: '57,999',
      shipping: '+149',
      image:
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=350&fit=crop',
      category: 'Processors',
      rating: 4.8,
      reviews: 276,
    },
    {
      id: 8,
      discount: '14%',
      name: 'AMD Ryzen 9 7950X 16-Core, 32-Thread Desktop Processor',
      price: '61,499',
      shipping: '+149',
      image:
        'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=500&h=350&fit=crop',
      category: 'Processors',
      rating: 4.9,
      reviews: 312,
    },
    {
      id: 9,
      discount: '5%',
      name: 'G.SKILL Trident Z5 RGB Series 32GB DDR5 6000MHz RAM',
      price: '12,999',
      shipping: '+99',
      image:
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=350&fit=crop',
      category: 'Memory',
      rating: 4.6,
      reviews: 168,
    },

    {
      id: 11,
      discount: '9%',
      name: 'ASUS ROG Strix Z790-E Gaming WiFi Motherboard',
      price: '36,999',
      shipping: '+249',
      image:
        'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=500&h=350&fit=crop',
      category: 'Motherboards',
      rating: 4.7,
      reviews: 194,
    },
    {
      id: 12,
      discount: '16%',
      name: 'NZXT H9 Flow Dual-Chamber Tempered Glass Case',
      price: '13,999',
      shipping: '+349',
      image:
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500&h=350&fit=crop',
      category: 'Cases',
      rating: 4.8,
      reviews: 237,
    },
    {
      id: 13,
      discount: '13%',
      name: 'Corsair iCUE H150i ELITE CAPELLIX Liquid CPU Cooler',
      price: '16,499',
      shipping: '+199',
      image:
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=350&fit=crop',
      category: 'Cooling',
      rating: 4.5,
      reviews: 178,
    },
    {
      id: 14,
      discount: '6%',
      name: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
      price: '12,999',
      shipping: '+99',
      image:
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=350&fit=crop',
      category: 'Peripherals',
      rating: 4.8,
      reviews: 512,
    },
  ];

  return (
    <div className="w-full sm:w-10/12 mx-auto py-8 px-2 sm:px-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Power Supplies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {/* Product Image Container with Fixed Aspect Ratio */}
            <div className="relative pt-[70%]">
              {' '}
              {/* This creates a fixed aspect ratio container */}
              <img
                src={product.image}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-contain p-4" /* Changed to object-contain */
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                {product.discount} OFF
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                {product.name}
              </h3>

              {/* Price Section */}
              <div className="mt-auto">
                <div className="flex items-baseline mt-4 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    Shipping {product.shipping}
                  </span>
                </div>

                {/* Buy Now Button */}
                <Link to={`/products-details/${product.id}`}>
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md flex items-center justify-center mt-2 transition-colors">
                    <FaShoppingCart className="mr-2" />
                    Buy Now!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
