import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBox,
  FaPlusCircle,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      path: '/admin/all-products',
      name: 'All Products',
      icon: <FaBox className="w-5 h-5" />,
    },
    {
      path: '/admin/add-product',
      name: 'Add Product',
      icon: <FaPlusCircle className="w-5 h-5" />,
    },

    {
      path: '/admin/orders',
      name: 'Orders',
      icon: <FaShoppingCart className="w-5 h-5" />,
    },
  ];

  const isActive = path => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        bg-gradient-to-b from-[#1D232A] to-[#2A3441]
        text-white w-64 transform transition-transform duration-300 ease-in-out
         ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <Link to={'/'}>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-[#1D232A] font-bold text-lg">TB</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg">Tech Bazars</span>
                <span className="text-xs text-gray-300">Admin Panel</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                     ${
                       isActive(item.path)
                         ? 'bg-amber-500 text-gray-900 font-semibold'
                         : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                     }
                  `}
                  onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            className="
            flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
            text-gray-300 hover:bg-red-500 hover:text-white w-full
          "
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
