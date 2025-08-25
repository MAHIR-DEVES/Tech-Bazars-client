import React from 'react';
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaBox,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
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

  // Top selling products
  const topProducts = [
    { name: 'Gaming Laptop', sales: 124, revenue: 1248000 },
    { name: 'Wireless Headphones', sales: 89, revenue: 267000 },
    { name: 'Mechanical Keyboard', sales: 76, revenue: 228000 },
    { name: 'Gaming Mouse', sales: 68, revenue: 136000 },
    { name: 'Monitor 27"', sales: 45, revenue: 675000 },
  ];

  const StatCard = ({ title, value, icon, change, isPositive }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{value.toLocaleString()}
          </p>
          <div
            className={`flex items-center mt-2 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? (
              <FaArrowUp className="mr-1" />
            ) : (
              <FaArrowDown className="mr-1" />
            )}
            <span className="text-sm font-medium">{change}%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
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
          icon={<FaMoneyBillWave className="w-6 h-6 text-blue-600" />}
          change={statsData.revenueChange}
          isPositive={statsData.revenueChange > 0}
        />
        <StatCard
          title="Total Orders"
          value={statsData.totalOrders}
          icon={<FaShoppingCart className="w-6 h-6 text-green-600" />}
          change={statsData.ordersChange}
          isPositive={statsData.ordersChange > 0}
        />
        <StatCard
          title="Total Customers"
          value={statsData.totalCustomers}
          icon={<FaUsers className="w-6 h-6 text-purple-600" />}
          change={statsData.customersChange}
          isPositive={statsData.customersChange > 0}
        />
        <StatCard
          title="Total Products"
          value={statsData.totalProducts}
          icon={<FaBox className="w-6 h-6 text-orange-600" />}
          change={statsData.salesChange}
          isPositive={statsData.salesChange > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
            <button className="text-blue-600 text-sm font-medium">
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
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 text-sm">{order.id}</td>
                    <td className="py-3 text-sm">{order.customer}</td>
                    <td className="py-3 text-sm">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Top Selling Products
            </h2>
            <button className="text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                    <FaBox className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {product.sales} sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    ₹{product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">+12%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Chart (Placeholder) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Sales Overview
          </h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
              Monthly
            </button>
            <button className="px-3 py-1 text-gray-600 rounded-md text-sm">
              Quarterly
            </button>
            <button className="px-3 py-1 text-gray-600 rounded-md text-sm">
              Yearly
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FaChartLine className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Sales chart will be displayed here</p>
            <p className="text-sm text-gray-500">
              Integrate with Chart.js or similar library
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Average Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{statsData.averageOrder.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaMoneyBillWave className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">3.2%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaChartLine className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Returning Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">42%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FaUsers className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
