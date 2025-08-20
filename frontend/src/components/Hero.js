import React from 'react';
import { Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Hero = () => {
  const profileImage = "https://customer-assets.emergentagent.com/job_0514d4c0-8919-46e5-8284-36a12b4ff7cf/artifacts/aieijo2h_Profile%20Photo.jpeg";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full opacity-15 animate-pulse delay-500"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src={profileImage}
                  alt="Nelbert Tomicos - Virtual Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20"></div>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Nelbert Tomicos
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
            General Virtual Assistant
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Resourceful and detail-oriented Virtual Assistant with a passion for helping businesses run smoothly. 
            I thrive in creating order out of chaos - turning your workload into streamlined workflows.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-gray-700">Mandaue City, Cebu, Philippines</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700">nelberttomicos@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Phone className="w-4 h-4 text-purple-500" />
              <span className="text-gray-700">+63 975-912-0840</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </a>
            
            <a 
              href="https://www.linkedin.com/in/nelbertt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transform hover:scale-105 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              View LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;