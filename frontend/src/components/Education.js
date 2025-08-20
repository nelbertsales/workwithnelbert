import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "BS in Hospitality Management",
      institution: "Dipolog City Institute of Technology",
      location: "Dipolog City, Philippines",
      year: "2022",
      type: "Bachelor's Degree",
      specializations: [
        "Hospitality Management",
        "Hotel Management", 
        "Cruise Management",
        "Event Management"
      ],
      description: "Comprehensive program covering hospitality industry operations, customer service excellence, and business management principles."
    },
    {
      degree: "General Virtual Assistance Extensive Course",
      institution: "FHMOMS Apprenticeship Program",
      location: "Online",
      year: "2025",
      type: "Professional Certification",
      specializations: [
        "General Virtual Assistance",
        "Social Media Management",
        "Inbox Management",
        "Administrative Support"
      ],
      description: "Intensive training program focused on modern virtual assistance skills, digital tools, and client management best practices."
    }
  ];

  const certifications = [
    {
      name: "Social Media Management",
      issuer: "FHMOMS",
      year: "2025",
      icon: "📱"
    },
    {
      name: "Administrative Support Specialist",
      issuer: "FHMOMS",
      year: "2025", 
      icon: "📋"
    },
    {
      name: "Digital Communication Expert",
      issuer: "FHMOMS",
      year: "2025",
      icon: "💬"
    }
  ];

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Education & <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Training</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Continuous learning and professional development to deliver exceptional virtual assistance services
          </p>
        </div>

        {/* Education Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Academic Background</h3>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* Left Content */}
                    <div className="flex-1 mb-6 lg:mb-0 lg:mr-8">
                      <div className="flex items-start mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mr-4">
                          <GraduationCap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {edu.degree}
                          </h4>
                          <div className="flex items-center text-purple-600 font-semibold mb-2">
                            <BookOpen className="w-4 h-4 mr-2" />
                            <span>{edu.institution}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {edu.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {edu.specializations.map((spec, specIndex) => (
                          <span 
                            key={specIndex}
                            className="px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="lg:text-right">
                      <div className="flex items-center lg:justify-end text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{edu.year}</span>
                      </div>
                      <div className="flex items-center lg:justify-end text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{edu.location}</span>
                      </div>
                      <span className="inline-flex px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
                        {edu.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Certifications</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6 text-center">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {cert.name}
                </h4>
                <p className="text-purple-600 font-medium mb-1">
                  {cert.issuer}
                </p>
                <p className="text-gray-500 text-sm">
                  {cert.year}
                </p>
                <div className="mt-4 w-full h-1 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Philosophy */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 text-center">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Commitment to Continuous Learning
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I believe that learning never stops. My educational journey combines formal academic training with 
              practical, industry-focused certifications to ensure I'm always equipped with the latest skills and 
              knowledge to serve my clients effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;