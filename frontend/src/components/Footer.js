import React from 'react';
import { Mail, Phone, Linkedin, MapPin, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' }
  ];

  const services = [
    'Administrative Support',
    'Social Media Management',
    'Calendar Management',
    'Customer Service',
    'Data Entry'
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-blue-500/10 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-purple-400/10 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Nelbert Tomicos
                </span>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Professional Virtual Assistant dedicated to helping businesses streamline operations, 
                improve productivity, and achieve their goals through reliable and efficient support.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="mailto:nelberttomicos@gmail.com"
                  className="p-3 bg-purple-600/20 hover:bg-purple-600 rounded-lg transition-colors duration-300 group"
                >
                  <Mail className="w-5 h-5 text-purple-400 group-hover:text-white" />
                </a>
                <a 
                  href="tel:+639759120840"
                  className="p-3 bg-blue-600/20 hover:bg-blue-600 rounded-lg transition-colors duration-300 group"
                >
                  <Phone className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/nelbertt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-indigo-600/20 hover:bg-indigo-600 rounded-lg transition-colors duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a 
                    href="#blog"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-sm">Mandaue City, Cebu, Philippines</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-sm">nelberttomicos@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-indigo-400" />
                  <span className="text-sm">+63 975-912-0840</span>
                </div>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
                <span>© {currentYear} Nelbert Tomicos. Made with</span>
                <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" />
                <span>for helping businesses grow.</span>
              </div>
              
              <div className="text-gray-400 text-sm">
                <span>Professional Virtual Assistant Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;