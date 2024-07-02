"use client";
// components/Navbar.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600">Flat Finder</div>
          <div className="hidden md:flex space-x-4 justify-center w-full">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              About Us
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Blog
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Contact Us
            </a>
          </div>
          <div className="hidden md:block">
            <a
              href="#"
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              Sign In
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6 text-gray-600"
              />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden text-center">
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-600 py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-600 py-2"
            >
              About Us
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-600 py-2"
            >
              Blog
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-600 py-2"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="block border border-blue-500 text-blue-500 px-4 py-2 rounded mt-4 hover:bg-blue-500 hover:text-white"
            >
              Sign In
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
