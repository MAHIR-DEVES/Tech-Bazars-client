import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ProductCards from './ProductCards';

const Products = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <div className="w-full sm:max-w-7xl mx-auto py-8 px-2 sm:px-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Power Supplies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCards key={product._id} product={product}></ProductCards>
        ))}
      </div>
    </div>
  );
};

export default Products;
