import React from "react";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-tertiary max-padd-container text-white py-12 rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <Link to={"/"} className="bold-24 mb-4">
            <h3>
              Purple<span className="text-secondary">Shop</span>
            </h3>
          </Link>
          <p className="text-center md:text-left">
            Purple Shop is your one-stop shop for the latest in electronics,
            fashion, and more. We bring you high-quality products at unbeatable
            prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="bold-20 mb-4">Quick Links</h4>
          <ul className="space-y-2 regular-15 text-gray-30">
            <li>
              <a href="/" className="hover:text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-secondary">
                Categories
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-secondary">
                Shop
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-secondary">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg mb-4">Contact Us</h4>
          <p>
            Email:{" "}
            <a
              href="mailto:support@purple.com"
              className="hover:text-secondary"
            >
              support@purple.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-secondary">
              +123 456 7890
            </a>
          </p>
          <p>Address: 123 Purple Street, City, Country</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <SocialIcons />
        <hr className="h-[1px] w-full max-w-screen-md my-4 border-white" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Purple Shop | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
