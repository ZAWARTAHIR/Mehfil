// import React from 'react'
import { FaCopyright } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 mt-12 text-base md:text-lg">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {/* Quick Links */}
        <div className="sm:ml-6 md:ml-10 mb-8 md:mb-0">
          <h3 className="text-xl font-bold mb-3 text-primary">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/calendar" className="hover:text-primary transition-colors">Calendar</Link></li>
            <li><Link to="/wallet" className="hover:text-primary transition-colors">Wallet</Link></li>
            <li><Link to="/want-to-add" className="hover:text-primary transition-colors">Add Event</Link></li>
          </ul>
        </div>
        {/* Company */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-bold mb-3 text-primary">Company</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Our Services</a></li>
            <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-primary transition-colors">Terms &amp; Condition</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-primary">Contact</h3>
          <ul className="space-y-2 mb-3">
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" />Main Jaranwala Road, Faisalabad</li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-primary" /><a href="tel:+923037065198" className="hover:text-primary transition-colors">+92 303 7065198</a></li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-primary" /><a href="mailto:info@eventoems.com" className="hover:text-primary transition-colors">chzawartahir12@gmail.com</a></li>
          </ul>
          <div className="flex gap-4 mb-2 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaFacebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaInstagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaTwitter size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
          </div>
          {/* Removed gradient line and arrow below contact info */}
        </div>
        </div>
        {/* Copyright & Branding - full width below grid */}
        <div className="w-full flex flex-col items-center justify-center mt-6 px-2 text-center">
          <div className="flex items-center gap-2 mb-2">
            <FaCopyright className="h-5" />
            <span className="font-semibold tracking-wide">Mehfil {new Date().getFullYear()}</span>
          </div>
          <span className="text-sm text-gray-300 mt-1 italic tracking-wide text-center block">
            <span className="font-bold text-primary">Mehfil</span> &mdash; Crafted with <span className="text-pink-400">&#10084;</span> by <span className="font-semibold">Zawar &amp; Co.</span> | All Rights Reserved {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
