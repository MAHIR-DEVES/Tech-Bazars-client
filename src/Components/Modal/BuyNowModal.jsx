import React, { useState } from 'react';
import axios from 'axios';
import {
  FaTimes,
  FaCheckCircle,
  FaShoppingBag,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const BuyNowModal = ({ isOpen, onClose, product, quantity }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0],
        price: product.discountPrice || product.price,
        quantity,
        userName: userInfo.name,
        userEmail: userInfo.email,
        userPhone: userInfo.phone,
        userAddress: userInfo.address,
      };

      const res = await axios.post('http://localhost:5000/orders', orderData);
      alert(res.data.message);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = (product?.discountPrice || product?.price || 0) * quantity;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-white relative">
          <h2 className="text-2xl font-bold flex items-center">
            <FaCheckCircle className="mr-2" /> Confirm Your Order
          </h2>
          <p className="text-amber-100 mt-1">
            Complete your purchase with confidence
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {/* Product Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
              <FaShoppingBag className="mr-2 text-amber-500" /> Order Summary
            </h3>

            <div className="flex items-center mb-3">
              <img
                src={product?.images?.[0] || 'https://via.placeholder.com/60'}
                alt={product?.name}
                className="w-16 h-16 object-contain rounded-md border border-gray-200 mr-3"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 line-clamp-2">
                  {product?.name}
                </h4>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="font-medium text-gray-700">Total:</span>
              <span className="text-xl font-bold text-amber-600">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* User Info Form */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <FaUser className="mr-2 text-amber-500" /> Your Information
            </h3>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={userInfo.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  value={userInfo.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-6">
            <p className="text-sm text-blue-700 flex items-start">
              <svg
                className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Your information is secure and will only be used for order
              processing.
            </p>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="bg-gray-50 px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row-reverse sm:justify-between">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={
                isSubmitting ||
                !userInfo.name ||
                !userInfo.email ||
                !userInfo.phone ||
                !userInfo.address
              }
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Secure checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
