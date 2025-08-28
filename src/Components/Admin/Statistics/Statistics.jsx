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

  // Sales data for bar chart
  const salesData = [
    { month: 'Jan', sales: 1200000, orders: 240 },
    { month: 'Feb', sales: 1800000, orders: 320 },
    { month: 'Mar', sales: 1500000, orders: 280 },
    { month: 'Apr', sales: 2100000, orders: 380 },
    { month: 'May', sales: 1900000, orders: 350 },
    { month: 'Jun', sales: 2548900, orders: 448 },
  ];

  const StatCard = ({ title, value, icon, change, isPositive }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
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

  // Enhanced Bar Chart Component
  const BarChart = () => {
    const maxSales = Math.max(...salesData.map(item => item.sales));
    const maxOrders = Math.max(...salesData.map(item => item.orders));

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Monthly Sales Performance
          </h2>
          <div className="flex space-x-4">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors">
              Sales
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Orders
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between h-64 px-4 pb-4">
          {salesData.map((item, index) => {
            const salesHeight = (item.sales / maxSales) * 100;
            const ordersHeight = (item.orders / maxOrders) * 100;

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 mx-1 group relative"
              >
                {/* Combined bar with sales and orders */}
                <div className="w-10 relative mb-2" style={{ height: '180px' }}>
                  {/* Sales Bar (Primary) */}
                  <div
                    className="w-10 absolute bottom-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500 group-hover:w-12"
                    style={{ height: `${salesHeight}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      ₹{(item.sales / 100000).toFixed(1)}L
                    </div>
                  </div>

                  {/* Orders Bar (Secondary) */}
                  <div
                    className="w-6 absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg transition-all duration-300 hover:from-green-500 hover:to-green-400 group-hover:w-8"
                    style={{ height: `${ordersHeight}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {item.orders} orders
                    </div>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-600 mt-2">
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6 space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Sales (₹)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-t from-green-400 to-green-300 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Orders</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Last updated: Today, 10:30 AM
          </div>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
            View detailed report
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Bar Chart */}
        <BarChart />
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
            <div className="p-3 bg-green-100 rounded-full">
              <FaMoneyBillWave className="w-6 h-6 text-green-600" />
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
            <div className="p-3 bg-purple-100 rounded-full">
              <FaChartLine className="w-6 h-6 text-purple-600" />
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
