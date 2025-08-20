import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Info } from 'lucide-react';

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const isBusinessHours = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Monday-Friday 9 AM - 6 PM PHT (considering timezone offset)
    if (day >= 1 && day <= 5) {
      return hour >= 9 && hour < 18;
    }
    // Saturday 10 AM - 4 PM PHT
    if (day === 6) {
      return hour >= 10 && hour < 16;
    }
    return false; // Sunday
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isBusinessHours() ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">
                🟢 Available now! Ready to help with your virtual assistant needs.
              </span>
            </>
          ) : (
            <>
              <Info className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium">
                📧 Currently offline, but I'll respond to your message within 24 hours!
              </span>
            </>
          )}
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;