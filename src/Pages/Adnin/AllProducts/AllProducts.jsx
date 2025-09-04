import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  FaSearch,
  // FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaBox,
} from 'react-icons/fa';
import ProductModal from '../../../Components/Modal/ViewModel';

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const categories = [
    'all',
    'Laptops',
    'Smartphones',
    'TVs',
    'Audio',
    'Accessories',
    'Monitors',
    'Wearables',
    'Gaming',
  ];
  const statuses = ['all', 'active', 'out-of-stock', 'low-stock'];

  // 🟢 Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const name = product.name ? product.name.toLowerCase() : '';
      const sku = product.sku ? product.sku.toLowerCase() : '';
      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        sku.includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === 'all' || product.category === filterCategory;

      // 🟢 calculate status based on stock
      let status = 'active';
      const stock = Number(product.stock) || 0;
      if (stock === 0) status = 'out-of-stock';
      else if (stock < 5) status = 'low-stock';

      const matchesStatus = filterStatus === 'all' || status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      const stockA = Number(a.stock) || 0;
      const stockB = Number(b.stock) || 0;
      const salesA = Number(a.sales) || 0;
      const salesB = Number(b.sales) || 0;

      switch (sortBy) {
        case 'price-high':
          return priceB - priceA;
        case 'price-low':
          return priceA - priceB;
        case 'sales':
          return salesB - salesA;
        case 'stock':
          return stockB - stockA;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getStatusBadge = stockValue => {
    const stock = Number(stockValue) || 0;
    let status = 'active';
    if (stock === 0) status = 'out-of-stock';
    else if (stock < 5) status = 'low-stock';

    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'In Stock' },
      'out-of-stock': {
        color: 'bg-red-100 text-red-800',
        text: 'Out of Stock',
      },
      'low-stock': {
        color: 'bg-yellow-100 text-yellow-800',
        text: 'Low Stock',
      },
    };

    const { color, text } = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          // API request
          const res = await axios.delete(
            `http://localhost:5000/products/${id}`
          );

          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');

            // state থেকে remove করে UI আপডেট করো
            setProducts(prevProducts =>
              prevProducts.filter(product => product._id !== id)
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };
  const handleView = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600">
          <FaPlus className="w-4 h-4 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Products
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or SKU..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full lg:w-40 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full lg:w-40 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? 'All Status'
                    : status === 'active'
                    ? 'In Stock'
                    : status === 'out-of-stock'
                    ? 'Out of Stock'
                    : 'Low Stock'}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              className="w-full lg:w-40 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="sales">Sales</option>
              <option value="stock">Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.images?.[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{Number(product.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.stock)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleView(product)} // ✅ open modal
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(product._id)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <ProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <FaBox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No products found matching your criteria
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
