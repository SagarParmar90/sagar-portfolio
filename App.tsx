import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProjectDetail } from './pages/ProjectDetail';
import { Admin } from './pages/Admin';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or local storage logic could go here
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-yt-black transition-colors duration-200">
        <Navbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
        
        <div className="pt-14 flex">
          <Sidebar isOpen={sidebarOpen} />
          
          {/* Main Content Area */}
          <main className={`flex-1 transition-all duration-200 ${sidebarOpen ? 'md:ml-[72px] lg:ml-60' : 'md:ml-[72px]'} w-full`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;