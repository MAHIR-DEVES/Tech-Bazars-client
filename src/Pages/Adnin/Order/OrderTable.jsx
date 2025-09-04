import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaShoppingCart,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const OrderTable = ({ order, setOrders }) => {
  const [newStatus, setNewStatus] = useState(order.status);

  const getStatusBadge = status => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: FaShoppingCart,
      },
      processing: { color: 'bg-blue-100 text-blue-800', icon: FaEdit },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: FaTruck },
      delivered: {
        color: 'bg-green-100 text-green-800',
        icon: FaCheckCircle,
      },
      cancelled: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle },
    };
    const { color, icon: Icon } = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800',
      icon: FaShoppingCart,
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium  ${color} flex items-center gap-1`}
      >
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // handle update button click
  const handleUpdate = async () => {
    if (newStatus === 'all') return; // skip if "Select Status"
    try {
      await axios.patch(`http://localhost:5000/update-order/ ${order._id}`, {
        status: newStatus,
      });

      // update UI
      setOrders(prevOrders =>
        prevOrders.map(o =>
          o._id === order._id ? { ...o, status: newStatus } : o
        )
      );

      toast.success('Order updated successfully ✅');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  return (
    <tr key={order._id} className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
        <div className="relative group">
          <div className="w-14 h-14 bg-gray-50 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center shadow-sm">
            <img
              src={order.productImage}
              alt={order.productName || 'Product'}
              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
              onError={e => {
                e.target.src =
                  'https://via.placeholder.com/56x56?text=No+Image';
              }}
            />
          </div>
          {/* Tooltip on hover */}
          {order.productName && (
            <div className="absolute hidden group-hover:block z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap">
              {order.productName}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {order.userName}
          </div>
          <div className="text-sm text-gray-500">{order.userEmail}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ₹{Number(order.price).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(order.status)}
      </td>
      <td className="whitespace-nowrap flex justify-center items-center mt-5">
        <select
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Select Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          onClick={handleUpdate}
          className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <FaEye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-900">
            <FaEdit className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </td> */}
    </tr>
  );
};

export default OrderTable;
