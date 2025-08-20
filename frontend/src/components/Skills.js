import React from 'react';
import { 
  MessageSquare, 
  Share2, 
  Palette, 
  Calendar, 
  Shield, 
  Database,
  Users,
  FileText,
  Clock,
  Target,
  TrendingUp,
  Settings
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Core Skills",
      icon: Target,
      skills: [
        "General Administrative Support",
        "Social Media Management", 
        "Calendar Management",
        "Inbox Management",
        "Customer Service",
        "Meta Ads Management",
        "Data Entry & Database Management",
        "Scheduling & Task Coordination",
        "Document Preparation & Reporting"
      ]
    },
    {
      title: "Communication & Collaboration",
      icon: MessageSquare,
      skills: [
        "Microsoft Teams",
        "Google Meet", 
        "Zoom",
        "Viber",
        "WhatsApp"
      ]
    },
    {
      title: "Social Media Platforms",
      icon: Share2,
      skills: [
        "Facebook",
        "LinkedIn",
        "Instagram", 
        "TikTok",
        "YouTube",
        "Thread",
        "X (Twitter)"
      ]
    },
    {
      title: "Design & Content Creation",
      icon: Palette,
      skills: [
        "Canva",
        "CapCut",
        "Microsoft Word",
        "Microsoft PowerPoint",
        "Grammarly",
        "ChatGPT"
      ]
    },
    {
      title: "Scheduling & Productivity",
      icon: Calendar,
      skills: [
        "Calendly",
        "Google Calendar",
        "MS Office Calendar",
        "Trello",
        "DocuSign",
        "CamScanner"
      ]
    },
    {
      title: "Cloud & Security Tools",
      icon: Shield,
      skills: [
        "Google Workspace",
        "LastPass",
        "Google Drive",
        "Dropbox"
      ]
    }
  ];

  const getSkillColor = (index) => {
    const colors = [
      "from-purple-500 to-blue-500",
      "from-blue-500 to-indigo-500", 
      "from-indigo-500 to-purple-500",
      "from-purple-400 to-pink-400",
      "from-blue-400 to-cyan-400",
      "from-indigo-400 to-blue-400"
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Tools</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive toolkit for delivering exceptional virtual assistance across multiple domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getSkillColor(categoryIndex)} p-6 text-white`}>
                <div className="flex items-center space-x-3">
                  <category.icon className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="p-6">
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getSkillColor(categoryIndex)}`}></div>
                      <span className="text-gray-700 text-sm md:text-base">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Highlight */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Always Learning & Growing
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              I'm constantly expanding my skill set and staying updated with the latest tools and technologies 
              to provide the best possible service to my clients.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-purple-200">
                <span className="text-purple-600 font-medium">Continuous Learning</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-blue-200">
                <span className="text-blue-600 font-medium">Adaptable</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-200">
                <span className="text-indigo-600 font-medium">Tech-Savvy</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-purple-200">
                <span className="text-purple-600 font-medium">Detail-Oriented</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;