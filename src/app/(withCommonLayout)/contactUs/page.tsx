"use client";
import React from "react";
import { FaFacebook, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const pageId = "61571308793569"; // Replace with your actual page ID
  const fbAppLink = `fb://page/${pageId}`;
  const fbWebLink =
    "https://www.facebook.com/profile.php?id=61571308793569&mibextid=ZbWKwL";

  return (
    <div className="h-screen bg-gradient-to-r from-teal-400 via-teal-600 to-teal-800 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform hover:scale-105 transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-6 tracking-wide">
          Contact with Us
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-8 leading-relaxed">
          We’d love to hear from you! Reach out via Facebook or email, and we’ll
          respond promptly.
        </p>

        {/* Facebook Link */}
        <a
          href={fbAppLink}
          className="flex items-center justify-center gap-3 sm:gap-4 bg-blue-500 hover:bg-blue-600 text-white
          py-2 px-3 md:py-4 md:px-6 rounded-full font-semibold mb-5 sm:mb-6 transform transition-all duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            setTimeout(() => {
              window.open(fbWebLink, "_blank", "noopener,noreferrer");
            }, 500);
          }}
        >
          <FaFacebook size={28} />
          <span className="text-sm sm:text-lg">Message on Facebook</span>
        </a>

        {/* Email Link */}
        <a
          href="mailto:tangailspaces@gmail.com"
          className="flex items-center justify-center gap-3 sm:gap-4 bg-teal-500 hover:bg-teal-600 text-white 
         py-2 px-3 md:py-4 md:px-6 rounded-full font-semibold transform transition-all duration-300 hover:scale-105"
        >
          <FaEnvelope size={28} />
          <span className="text-sm sm:text-lg">Email Us</span>
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
