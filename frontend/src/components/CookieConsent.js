import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show after 2 seconds to not be intrusive
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-start space-x-3 flex-1">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Cookie className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Cookie Notice</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              This website uses cookies to enhance your browsing experience, analyze site traffic, and track analytics. 
              We respect your privacy and only collect essential data to improve our services.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center"
          >
            <Shield className="w-4 h-4 mr-2" />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;