import React from 'react';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "General Virtual Assistant",
      company: "Security Bank Corporation", 
      location: "Philippines",
      period: "2023 - Present",
      type: "Full-time",
      description: "Sales Associate - JAM",
      achievements: [
        "Managed client records and maintained accurate databases, ensuring compliance and data integrity",
        "Conducted outreach through calls and presentations, strengthening communication skills and building client relationships", 
        "Supported branch targets by handling inquiries, resolving concerns, and providing timely assistance",
        "Gained experience in scheduling, follow-ups, and task organization to keep client engagements on track"
      ]
    },
    {
      title: "Telesales Representative", 
      company: "Security Bank Corporation",
      location: "Philippines",
      period: "2022 - 2023",
      type: "Full-time",
      description: "Telesales operations and customer relationship management",
      achievements: [
        "Handled outbound calls and follow-ups to nurture leads and confirm client bookings",
        "Assisted in managing client data and updating records to ensure accuracy",
        "Provided customer support by addressing inquiries and coordinating solutions promptly",
        "Developed strong communication skills through direct client interactions"
      ]
    },
    {
      title: "Virtual Assistant",
      company: "DeliveryBizConnect",
      location: "Remote",
      period: "2021 - 2022", 
      type: "Contract",
      description: "Virtual Buddy 24/7 - Remote support services",
      achievements: [
        "Provided comprehensive virtual assistance for business operations",
        "Managed multiple client accounts simultaneously with high attention to detail",
        "Implemented efficient workflow systems to improve productivity",
        "Maintained excellent client satisfaction ratings throughout the contract period"
      ]
    },
    {
      title: "Outbound Telemarketer",
      company: "Various Clients",
      location: "Remote", 
      period: "2021",
      type: "Freelance",
      description: "Lead generation and client acquisition services",
      achievements: [
        "Conducted outbound calls to introduce services and qualify potential leads",
        "Maintained organized call logs and client information for tracking progress", 
        "Practiced upselling and cross-selling techniques while delivering excellent client communication",
        "Successfully generated qualified leads resulting in increased client conversions"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building expertise through diverse roles in virtual assistance, customer service, and business support
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-blue-300 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                {/* Content */}
                <div className="md:ml-16 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-purple-600 font-semibold mb-2">
                          <Building className="w-4 h-4 mr-2" />
                          <span>{exp.company}</span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-base mb-3">
                          {exp.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col md:items-end text-sm md:text-base">
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                        <span className="inline-flex px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-xs font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Add Value to Your Business?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Let's discuss how my experience and skills can help streamline your operations and drive growth.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Let's Work Together
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;