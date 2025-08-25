import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaRegUser,
  FaShoppingCart,
  FaTimes,
  FaBars,
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search submission
  const handleSearch = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
    setSearchQuery('');
  };

  return (
    <nav className="bg-gradient-to-r from-[#1D232A] to-[#2A3441] shadow-lg sticky top-0 z-50 py-2">
      <div className="w-full px-2 sm:w-10/12 mx-auto">
        {/* Main navbar content */}
        <div className="flex justify-between items-center py-3">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-2 text-white">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-[#1D232A] font-bold text-lg">TB</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold sm:text-xl">Tech Bazars</span>
              <span className="text-xs text-gray-300">BEATS PREMIUM</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="bg-amber-500 text-gray-900 px-4 py-2 rounded-r-md hover:bg-amber-600 transition duration-200 font-medium"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Search icon - Mobile */}
            <button
              onClick={() => document.getElementById('mobile-search').focus()}
              className="text-white p-2 rounded-full hover:bg-gray-700 transition duration-200 md:hidden"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* User account icon */}
            <Link
              to="/account"
              className="text-white p-2 rounded-full hover:bg-gray-700 transition duration-200"
              aria-label="User account"
            >
              <FaRegUser className="w-5 h-5" />
            </Link>

            {/* Shopping cart icon */}
            <Link
              to="/cart"
              className="text-white p-2 rounded-full hover:bg-gray-700 transition duration-200 relative"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-xs w-5 h-5 flex items-center justify-center rounded-full text-gray-900">
                3
              </span>
            </Link>

            {/* Offers button */}
            <Link
              to="/offers"
              className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 rounded-md font-medium transition duration-200 hidden md:block"
            >
              Offers
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-gray-700 transition duration-200 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="py-3 border-t border-gray-700 md:hidden">
          <form onSubmit={handleSearch} className="flex">
            <input
              id="mobile-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="bg-amber-500 text-gray-900 px-4 py-2 rounded-r-md hover:bg-amber-600 transition duration-200 font-medium"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Mobile Offers Button */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="pt-2 pb-3">
              <Link
                to="/offers"
                className="block w-full text-center bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-medium transition duration-200 hover:bg-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                View Offers
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
