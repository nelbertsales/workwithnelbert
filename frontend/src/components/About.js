import React from 'react';
import { Target, Heart, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Target,
      title: "Detail-Oriented",
      description: "I thrive in creating order out of chaos, ensuring every detail is perfectly managed."
    },
    {
      icon: Heart,
      title: "Positive Personality",
      description: "I bring an approachable and positive attitude to every project and client interaction."
    },
    {
      icon: Lightbulb,
      title: "Creative Problem Solver",
      description: "I enjoy finding creative solutions that make work easier for both clients and teams."
    },
    {
      icon: Users,
      title: "Trusted Partner",
      description: "I aim to be not just a VA, but a trusted partner who contributes to growth and success."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Description */}
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-700">
              <p className="text-xl leading-relaxed mb-6">
                I'm a resourceful and detail-oriented General Virtual Assistant with a passion for helping businesses run smoothly and smartly. I thrive in creating order out of chaos - whether it's managing schedules, handling customer interactions, or streamlining workflows.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Beyond efficiency, I bring a positive and approachable personality to every project. I enjoy learning new tools, exploring fresh ideas, and finding creative solutions that make work easier for both clients and teams.
              </p>
              
              <p className="text-lg leading-relaxed">
                I believe in collaboration where both sides learn from each other, and I aim to be not just a VA, but a trusted partner who contributes to growth and success.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
              <p className="text-lg font-medium text-gray-800 italic">
                "Let's simplify your workload so you can focus on what matters most - I'll handle the details while you take the big steps forward."
              </p>
            </div>
          </div>

          {/* Right Column - Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                    <highlight.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              3+
            </div>
            <div className="text-gray-600 text-sm md:text-base">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-gray-600 text-sm md:text-base">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              15+
            </div>
            <div className="text-gray-600 text-sm md:text-base">Tools Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-gray-600 text-sm md:text-base">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;