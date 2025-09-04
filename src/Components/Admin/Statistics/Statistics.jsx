import React, { useState } from 'react';
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaBox,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaLaptop,
  FaMobile,
  FaTshirt,
  FaHome,
  FaBook,
  FaCouch,
} from 'react-icons/fa';

const Statistics = () => {
  // Sample data - replace with actual data from your backend
  const statsData = {
    totalSales: 1254300,
    totalOrders: 1248,
    totalCustomers: 892,
    totalProducts: 156,
    revenue: 2548900,
    averageOrder: 2042,
    salesChange: 12.5,
    ordersChange: 8.3,
    customersChange: 5.7,
    revenueChange: 15.2,
  };

  // Recent orders data
  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      amount: 12500,
      status: 'Delivered',
      date: '2024-01-15',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      amount: 8900,
      status: 'Processing',
      date: '2024-01-15',
    },
    {
      id: '#ORD-003',
      customer: 'Robert Johnson',
      amount: 15600,
      status: 'Shipped',
      date: '2024-01-14',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      amount: 7200,
      status: 'Delivered',
      date: '2024-01-14',
    },
    {
      id: '#ORD-005',
      customer: 'Mike Brown',
      amount: 18900,
      status: 'Processing',
      date: '2024-01-13',
    },
  ];

  // Order status data for the circular chart
  const orderStatusData = [
    {
      status: 'Delivered',
      percentage: 65,
      count: 811,
      color: '#10B981',
    },
    {
      status: 'Processing',
      percentage: 18,
      count: 225,
      color: '#F59E0B',
    },
    {
      status: 'Shipped',
      percentage: 12,
      count: 150,
      color: '#3B82F6',
    },
    {
      status: 'Cancelled',
      percentage: 5,
      count: 62,
      color: '#EF4444',
    },
  ];

  // Stat Card Component
  const StatCard = ({ title, value, icon, change, isPositive }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {title.includes('₹') ? '₹' : ''}
            {value.toLocaleString()}
          </p>
          <div
            className={`flex items-center mt-2 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? (
              <FaArrowUp className="mr-1" size={12} />
            ) : (
              <FaArrowDown className="mr-1" size={12} />
            )}
            <span className="text-sm font-medium">{change}%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">{icon}</div>
      </div>
    </div>
  );

  // Circular Chart Component for Product Categories
  const CircularChart = ({ data, title, type = 'products' }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercentage = 0;

    return (
      <div className="bg-white rounded-xl shadow-md p-6 h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-64 h-64 flex items-center justify-center mb-4 md:mb-0">
            <svg className="w-full h-full transform -rotate-90">
              {data.map((item, index) => {
                const strokeDasharray = circumference;
                const strokeDashoffset =
                  circumference - (item.percentage / 100) * circumference;
                const offset = accumulatedPercentage;
                accumulatedPercentage +=
                  (item.percentage / 100) * circumference;

                return (
                  <circle
                    key={index}
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transform: `rotate(${(offset / circumference) * 360}deg)`,
                      transformOrigin: 'center',
                    }}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-800">
                {type === 'products' ? 'Products' : 'Orders'}
              </span>
              <span className="text-lg text-gray-600">
                {type === 'products'
                  ? statsData.totalProducts
                  : statsData.totalOrders}
              </span>
            </div>
          </div>

          <div className="ml-0 md:ml-6 space-y-3 flex-1">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-gray-50 rounded-lg"
              >
                <div
                  className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon || (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.category || item.status}
                    </span>
                    <span className="text-sm font-bold">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {type === 'products'
                      ? `₹${item.value.toLocaleString()} • ${item.percentage}%`
                      : `${item.count} orders • ${item.percentage}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={statsData.revenue}
          icon={<FaMoneyBillWave className="w-6 h-6" />}
          change={statsData.revenueChange}
          isPositive={statsData.revenueChange > 0}
        />
        <StatCard
          title="Total Orders"
          value={statsData.totalOrders}
          icon={<FaShoppingCart className="w-6 h-6" />}
          change={statsData.ordersChange}
          isPositive={statsData.ordersChange > 0}
        />
        <StatCard
          title="Total Customers"
          value={statsData.totalCustomers}
          icon={<FaUsers className="w-6 h-6" />}
          change={statsData.customersChange}
          isPositive={statsData.customersChange > 0}
        />
        <StatCard
          title="Total Products"
          value={statsData.totalProducts}
          icon={<FaBox className="w-6 h-6" />}
          change={statsData.salesChange}
          isPositive={statsData.salesChange > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium">{order.id}</td>
                    <td className="py-3 text-sm">{order.customer}</td>
                    <td className="py-3 text-sm font-semibold">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        <FaEye className="mr-1" size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Status Circular Chart */}
        <CircularChart
          data={orderStatusData}
          title="Order Status Distribution"
          type="orders"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Average Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{statsData.averageOrder.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <FaMoneyBillWave className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">3.2%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
              <FaChartLine className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Returning Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">42%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full text-orange-600">
              <FaUsers className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
