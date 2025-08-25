import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="w-11/12 mx-auto justify-center">
      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/8801310520842"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
};

export default Contact;
