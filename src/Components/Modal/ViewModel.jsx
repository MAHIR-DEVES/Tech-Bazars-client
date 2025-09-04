import React from 'react';

const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{product?.name}</h2>
        <img
          src={product?.images?.[0]}
          alt={product?.name}
          className="w-full h-64 object-contain mb-4"
        />
        <p className="text-gray-600 mb-2">SKU: {product?.sku}</p>
        <p className="text-gray-600 mb-2">Category: {product?.category}</p>
        <p className="text-gray-600 mb-2">Stock: {product?.stock}</p>
        <p className="text-gray-900 font-bold mb-4">Price: ₹{product?.price}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
