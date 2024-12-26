import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-600 text-white py-10  mb-10 lg:mb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tangail Spaces</h2>
            <p className="mb-4">
              Find your ideal flat with ease. We provide the best listings to
              help you find the perfect home.
            </p>
            <p>&copy; 2024 Share Space. All rights reserved.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">Tangail, Dhaka, Bangladesh</p>
            <p className="mb-2">Email: tangailspaces@gmail.com</p>
            {/* <p className="mb-2">Phone: (123) 456-7890</p> */}
            <div className="mt-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61571308793569&mibextid=ZbWKwL"
                className="text-teal-300 hover:text-teal-100 mr-4"
                aria-label="Visit our Facebook page"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Link>
              <Link
                href="#"
                className="text-teal-300 hover:text-teal-100 mr-4"
                aria-label="Visit our Twitter profile"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </Link>
              <Link
                href="#"
                className="text-teal-300 hover:text-teal-100 mr-4"
                aria-label="Visit our Instagram profile"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
