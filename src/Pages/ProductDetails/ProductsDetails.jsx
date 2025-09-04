import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
} from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import BuyNowModal from '../../Components/Modal/BuyNowModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  console.log(products);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/get-products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-lg">Loading product...</p>
      </div>
    );
  }

  // if (!product) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-center text-lg text-red-500">Product not found</p>
  //     </div>
  //   );
  // }

  // Extract product details
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

  // Discount %
  const discountPercent =
    discountPrice && price > 0
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  return (
    <div className="sm:max-w-7xl mx-auto py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / {category} / {brand} / {name.substring(0, 20)}...
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={images[selectedImage]}
              alt={name}
              className="max-w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-contain"
            />
          </div>
          <div className="flex gap-2 justify-center mt-4 flex-wrap">
            {images.map((img, index) => (
              <div
                key={index}
                className={`border-2 rounded cursor-pointer p-1  ${
                  selectedImage === index
                    ? 'border-amber-500'
                    : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`Thumbnail  ${index + 1}`}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
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
          <div className="bg-gray-100 rounded-lg p-4 mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Stock:</td>
                  <td
                    className={`py-1 font-semibold  ${
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
              <div className="flex items-baseline mb-2 flex-wrap gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${discountPrice.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ৳{price.toLocaleString()}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  ৳{price.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border rounded-md w-full sm:w-auto">
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
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={stock <= 0}
            >
              <FaShoppingCart className="mr-2" />
              {stock > 0 ? 'Buy Now' : 'Out of Stock'}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-medium transition-colors"
            >
              <IoMdArrowRoundBack size={20} /> Back
            </button>
          </div>

          <BuyNowModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={product}
            quantity={quantity}
          />

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.slice(0, 4).map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.images[0]}
                alt={product?.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
              {product.description && (
                <p className="text-xs text-gray-600 mb-2">
                  {product.description}
                </p>
              )}
              <p className="text-lg font-bold text-gray-900">
                ৳{product.price}
              </p>
              <Link to={`/products-details/${product?._id}`}>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg flex items-center justify-center transition-colors font-medium group-hover:shadow-lg">
                  {' '}
                  Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
