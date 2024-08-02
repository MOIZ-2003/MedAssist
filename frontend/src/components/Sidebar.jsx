// Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaInfo, FaComment } from 'react-icons/fa';
import { SiGoogleforms } from "react-icons/si";

const Sidebar = ({ candidateId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      {!isOpen && (
        <button
          className="absolute top-4 left-4 text-white focus:outline-none z-50"
          onClick={openSidebar}
        >
          <FaBars className="h-8 w-8" />
        </button>
      )}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center text-lg">
                <FaHome className="mr-3" size={30} />
                Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/Chatbot" className="flex items-center text-lg">
                <FaComment className="mr-3" size={20} />
                Chatbot
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/about" className="flex items-center text-lg">
                <FaInfo className="mr-3" size={20} />
                About Us
              </Link>
            </li>
          </ul>
          {/* Logout Button */}
          <Link to="/" className="flex items-center text-lg mt-8">Logout</Link>
        </div>
        {/* Sidebar toggle button */}
        {isOpen && (
          <button
            className="absolute top-4 right-4 text-white focus:outline-none z-50"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
