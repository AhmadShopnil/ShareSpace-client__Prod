import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-600 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Share Space</h2>
            <p className="mb-4">
              Find your ideal flat with ease. We provide the best listings to
              help you find the perfect home.
            </p>
            <p>&copy; 2024 Flat Finder. All rights reserved.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">123 Main Street, Downtown City</p>
            <p className="mb-2">Email: info@flatfinder.com</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <div className="mt-4">
              <a href="#" className="text-teal-300 hover:text-teal-100 mr-4">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="#" className="text-teal-300 hover:text-teal-100 mr-4">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" className="text-teal-300 hover:text-teal-100 mr-4">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
