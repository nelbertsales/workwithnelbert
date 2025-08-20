import React, { useState } from 'react';
import { Edit, Save, X, Plus, Trash2, Eye, Settings, BarChart } from 'lucide-react';
import { mockData } from '../mock/mockData';
import { useToast } from '../hooks/use-toast';

const AdminPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState({});
  const [formData, setFormData] = useState({
    name: 'Nelbert Tomicos',
    tagline: 'General Virtual Assistant',
    bio: "I'm a resourceful and detail-oriented General Virtual Assistant with a passion for helping businesses run smoothly and smartly.",
    email: 'nelberttomicos@gmail.com',
    phone: '+63 975-912-0840',
    location: 'Mandaue City, Cebu, Philippines'
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSave = (section) => {
    setIsEditing({ ...isEditing, [section]: false });
    toast({
      title: "Changes Saved",
      description: `${section} has been updated successfully.`,
      duration: 3000,
    });
  };

  const handleCancel = (section) => {
    setIsEditing({ ...isEditing, [section]: false });
    // Reset form data here if needed
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: Edit },
    { id: 'blog', name: 'Blog Posts', icon: Plus },
    { id: 'analytics', name: 'Analytics', icon: BarChart },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <h2 className="text-2xl font-bold text-gray-900">
            Content Management Panel
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                  
                  {/* Basic Info */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
                      {!isEditing.basic ? (
                        <button
                          onClick={() => setIsEditing({ ...isEditing, basic: true })}
                          className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSave('basic')}
                            className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </button>
                          <button
                            onClick={() => handleCancel('basic')}
                            className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        {isEditing.basic ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{formData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Professional Title
                        </label>
                        {isEditing.basic ? (
                          <input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{formData.tagline}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        {isEditing.basic ? (
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{formData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        {isEditing.basic ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{formData.phone}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        {isEditing.basic ? (
                          <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{formData.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Profile Photo</h4>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200">
                        <img 
                          src="https://customer-assets.emergentagent.com/job_0514d4c0-8919-46e5-8284-36a12b4ff7cf/artifacts/aieijo2h_Profile%20Photo.jpeg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200">
                          Upload New Photo
                        </button>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended: 400x400px, under 2MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Tab */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Blog Management</h3>
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </button>
                  </div>

                  <div className="space-y-4">
                    {mockData.blogPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-gray-900 mb-2">
                              {post.title}
                            </h4>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{post.category}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Analytics Overview</h3>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700 mb-2">
                        {mockData.analytics.websiteViews}
                      </div>
                      <div className="text-purple-600">Website Views</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700 mb-2">
                        {mockData.analytics.blogViews}
                      </div>
                      <div className="text-blue-600">Blog Views</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                      <div className="text-2xl font-bold text-green-700 mb-2">
                        {mockData.analytics.contactInquiries}
                      </div>
                      <div className="text-green-600">Contact Inquiries</div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                      <div className="text-2xl font-bold text-indigo-700 mb-2">
                        {mockData.analytics.socialMediaFollowers}
                      </div>
                      <div className="text-indigo-600">Social Followers</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">New contact form submission</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Blog post "5 Essential Tools" published</span>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Profile information updated</span>
                        <span className="text-sm text-gray-500">3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Website Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Maintenance Mode</h5>
                          <p className="text-sm text-gray-600">Put website in maintenance mode</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Email Notifications</h5>
                          <p className="text-sm text-gray-600">Receive email notifications for new contacts</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;