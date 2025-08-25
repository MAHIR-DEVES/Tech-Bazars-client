import React, { useState, useRef, useEffect } from 'react';
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
} from 'react-icons/fa';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageHeight, setImageHeight] = useState('auto');
  const rightContentRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Sample product data
  const product = {
    name: 'Lenovo IdeaPad Slim 3i 15IAU7 Core i3 12th Gen 15.6-Inch FHD Arctic Grey Laptop',
    price: '49,500',
    shipping: '+46,000',
    discountPrice: '46,000',
    stock: 'In Stock',
    pid: 'P0142506300',
    sku: '52RK0152N4',
    brand: 'Lenovo',
    model: 'IdeaPad Slim 3i 15IAU7',
    warranty: "2 Year's",
    rating: 4.5,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=350&fit=crop',
    ],
  };

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
    const fullStars = Math.floor(rating);

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
  }, []);

  return (
    <div className="w-10/12 mx-auto py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / Laptops / Lenovo / {product.name.substring(0, 20)}...
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
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex gap-2 justify-center mt-4">
              {product.images.map((img, index) => (
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-600">
              ({product.reviews} Reviews)
            </span>
          </div>

          {/* Product Details Table */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Stock:</td>
                  <td className="py-1 text-green-600 font-semibold">
                    {product.stock}
                  </td>
                  <td className="py-1 text-gray-600 font-medium">PID:</td>
                  <td className="py-1">{product.pid}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">SKU:</td>
                  <td className="py-1">{product.sku}</td>
                  <td className="py-1 text-gray-600 font-medium">Brand:</td>
                  <td className="py-1">{product.brand}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Model:</td>
                  <td className="py-1">{product.model}</td>
                  <td className="py-1 text-gray-600 font-medium">Warranty:</td>
                  <td className="py-1">{product.warranty}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Specifications:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Intel Core i3-1215U, 12th Gen Processor</li>
              <li>15.6 Inch FHD (1920x1080) Display</li>
              <li>8GB RAM 256GB SSD</li>
              <li>Intel UHD Graphics</li>
            </ul>
          </div>

          {/* Price Section */}
          <div className="mb-6">
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Shipping {product.shipping}
              </span>
            </div>
            <p className="text-green-600 font-semibold">
              Discount Price ₹{product.discountPrice}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              + Available Payment Method
            </p>
          </div>

          {/* Promotion */}
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-3 mb-6">
            <p className="text-amber-800 font-semibold text-sm">
              Upto 2000Tk Voucher + Lucky Spin
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2 text-gray-600"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-3 py-2 text-gray-600"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-medium transition-colors">
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
