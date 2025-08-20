import React from 'react';
import { Mail, User, Building, Star, Quote, ExternalLink } from 'lucide-react';
import { mockData } from '../mock/mockData';

const References = () => {
  const references = [
    {
      name: "Maria Korina Bertulfo",
      title: "CEO & Founder",
      company: "FHMOMS, Inc.",
      email: "mk@fhmoms.com",
      phone: "+63 XXX-XXX-XXXX", // Placeholder for privacy
      relationship: "Training Supervisor & Mentor",
      testimonial: "Nelbert demonstrated exceptional dedication and skill during our comprehensive VA training program. His attention to detail and eagerness to learn made him one of our standout apprentices. I highly recommend him for any virtual assistant role.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      linkedIn: "https://www.linkedin.com/company/fhmoms"
    }
  ];

  const additionalTestimonials = mockData.testimonials;

  return (
    <section id="references" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            References & <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional references and client testimonials highlighting my commitment to excellence
          </p>
        </div>

        {/* Professional References */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional References</h3>
          
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {references.map((ref, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-start">
                    {/* Profile Section */}
                    <div className="flex items-center mb-6 md:mb-0 md:mr-8">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-100 mr-4">
                        <img 
                          src={ref.image}
                          alt={ref.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {ref.name}
                        </h4>
                        <p className="text-purple-600 font-semibold mb-1">
                          {ref.title}
                        </p>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <Building className="w-4 h-4 mr-1" />
                          <span>{ref.company}</span>
                        </div>
                        {ref.linkedIn && (
                          <a 
                            href={ref.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Company LinkedIn
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Contact & Relationship */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <span className="inline-flex px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
                          {ref.relationship}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <a href={`mailto:${ref.email}`} className="text-purple-600 hover:text-purple-700 transition-colors">
                            {ref.email}
                          </a>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
                        <Quote className="w-6 h-6 text-purple-400 mb-3" />
                        <p className="text-gray-700 italic leading-relaxed">
                          "{ref.testimonial}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Client Testimonials</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {additionalTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-purple-600 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">
                    {testimonial.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Request CTA */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 text-center">
            <User className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Additional References?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm happy to provide additional professional references upon request. 
              Feel free to reach out if you'd like to speak with more of my previous clients or colleagues.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Request References
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;