import React, { useState } from 'react';
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaFilter,
  FaBox,
  FaSort,
} from 'react-icons/fa';

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'Laptops',
      price: 199999,
      stock: 15,
      status: 'active',
      sku: 'MBP16-2023',
      sales: 45,
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'Smartphones',
      price: 129999,
      stock: 0,
      status: 'out-of-stock',
      sku: 'IP15P-2023',
      sales: 78,
      image:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Samsung OLED TV',
      category: 'TVs',
      price: 89999,
      stock: 8,
      status: 'active',
      sku: 'SMS-OLED65',
      sales: 23,
      image:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Sony Headphones',
      category: 'Audio',
      price: 24999,
      stock: 25,
      status: 'active',
      sku: 'SNY-WH1000',
      sales: 156,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    },
    {
      id: 5,
      name: 'Gaming Keyboard',
      category: 'Accessories',
      price: 8999,
      stock: 5,
      status: 'low-stock',
      sku: 'GM-KB2023',
      sales: 89,
      image:
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop',
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      category: 'Accessories',
      price: 2999,
      stock: 42,
      status: 'active',
      sku: 'WL-MS2023',
      sales: 203,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
    },
    {
      id: 7,
      name: '4K Monitor',
      category: 'Monitors',
      price: 45999,
      stock: 3,
      status: 'low-stock',
      sku: '4K-MON27',
      sales: 34,
      image:
        'https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?w=300&h=200&fit=crop',
    },
    {
      id: 8,
      name: 'Smart Watch',
      category: 'Wearables',
      price: 34999,
      stock: 18,
      status: 'active',
      sku: 'SM-WTCH4',
      sales: 67,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    },
  ];

  const categories = [
    'all',
    'Laptops',
    'Smartphones',
    'TVs',
    'Audio',
    'Accessories',
    'Monitors',
    'Wearables',
  ];
  const statuses = ['all', 'active', 'out-of-stock', 'low-stock'];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === 'all' || product.category === filterCategory;
      const matchesStatus =
        filterStatus === 'all' || product.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'sales':
          return b.sales - a.sales;
        case 'stock':
          return b.stock - a.stock;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getStatusBadge = status => {
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

    const { color, text } = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800',
      text: status,
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const handleDelete = productId => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', productId);
      // Add your delete logic here
    }
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.length}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <FaBox className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {products.filter(p => p.status === 'out-of-stock').length}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <FaBox className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter(p => p.status === 'low-stock').length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <FaBox className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-green-600">
                {products.reduce((total, product) => total + product.sales, 0)}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <FaBox className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
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

      {/* Products Grid */}
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
                  Sales
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
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image}
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
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
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

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">8</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span>{' '}
            products
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-md text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
