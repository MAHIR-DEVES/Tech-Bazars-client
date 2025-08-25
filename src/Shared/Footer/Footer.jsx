import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1D232A] to-[#2A3441] text-white pt-12 pb-6">
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 text-white mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-[#1D232A] font-bold text-lg">TB</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-xl">Tech Bazars</span>
                <span className="text-xs text-gray-300">BEATS PREMIUM</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for premium computer components and
              accessories. Quality products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  All Products
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Special Offers
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Power Supplies
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Graphics Cards
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Processors
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Motherboards
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-amber-500 transition-colors">
                  Storage
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 text-amber-500 mt-1 mr-3" />
                <span className="text-gray-400">
                  123 Tech Street, Silicon Valley, CA 94301
                </span>
              </div>
              <div className="flex items-center">
                <FaPhone className="w-5 h-5 text-amber-500 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-amber-500 mr-3" />
                <span className="text-gray-400">support@techbazars.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">NEWSLETTER</h4>
              <p className="text-gray-400 text-sm mb-3">
                Subscribe for updates and offers
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 rounded-r-md font-medium transition duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Tech Bazars. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 text-sm transition-colors">
                Privacy Policy
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 text-sm transition-colors">
                Terms of Service
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-amber-500 text-sm transition-colors">
                Return Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
