import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { Settings } from 'lucide-react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Blog from './components/Blog';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationBar from './components/NotificationBar';

// Styles
import './App.css';

const HomePage = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <NotificationBar />
        <Header />
        
        {/* Admin Panel Toggle Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed top-24 right-4 z-40 p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-110 transition-all duration-300 hidden md:flex items-center group"
          title="Content Management"
        >
          <Settings className="w-5 h-5" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium">
            Admin
          </span>
        </button>

        {/* Mobile Admin Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-4 right-4 z-40 p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-110 transition-all duration-300 md:hidden"
          title="Content Management"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Main Content */}
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Blog />
          <References />
          <Contact />
        </main>

        <Footer />

        {/* Admin Panel */}
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;