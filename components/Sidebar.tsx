import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Clock, ThumbsUp, PlaySquare, Film, Code, Tv } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center px-3 py-2.5 rounded-lg mb-1 transition-colors ${
      isActive 
        ? 'bg-gray-100 dark:bg-yt-darkGray font-medium text-yt-text dark:text-yt-textDark' 
        : 'text-yt-text dark:text-yt-textDark hover:bg-gray-100 dark:hover:bg-yt-darkGray'
    }`;

  // If closed on desktop (mini sidebar) could be implemented, but for simplicity we just hide/show on mobile or reduce width
  // Implementing a permanent drawer style for this demo.
  
  return (
    <aside className={`
      fixed left-0 top-14 bottom-0 bg-white dark:bg-yt-black z-40 overflow-y-auto no-scrollbar
      w-60 p-3 transition-transform duration-200 border-r border-transparent
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-[72px]'} 
    `}>
      {/* Main Nav */}
      <nav className="border-b border-yt-border dark:border-yt-borderDark pb-3 mb-3">
        <NavLink to="/" className={navItemClass}>
          <Home size={24} className="mr-4 md:mx-auto lg:mr-4 lg:mx-0" />
          <span className={`${!isOpen && 'md:hidden lg:inline'}`}>Home</span>
        </NavLink>
        <NavLink to="/about" className={navItemClass}>
          <User size={24} className="mr-4 md:mx-auto lg:mr-4 lg:mx-0" />
          <span className={`${!isOpen && 'md:hidden lg:inline'}`}>About</span>
        </NavLink>
      </nav>

      {/* Categories - Only visible when fully open or on large screens if we implemented responsive logic strictly */}
      <div className={`${!isOpen && 'md:hidden'} lg:block`}>
        <h3 className="px-3 py-2 text-base font-medium text-yt-text dark:text-yt-textDark">Categories</h3>
        <nav>
          <NavLink to="/?cat=Motion" className={navItemClass}>
            <Film size={24} className="mr-4" />
            <span>Motion Graphics</span>
          </NavLink>
           <NavLink to="/?cat=Web" className={navItemClass}>
            <Code size={24} className="mr-4" />
            <span>Web Apps</span>
          </NavLink>
           <NavLink to="/?cat=Production" className={navItemClass}>
            <Tv size={24} className="mr-4" />
            <span>Production</span>
          </NavLink>
        </nav>
      </div>
      
      {/* Footer links for PRD completeness */}
      <div className={`mt-auto pt-4 px-3 text-xs text-yt-meta dark:text-yt-metaDark font-medium ${!isOpen && 'md:hidden'} lg:block`}>
        <p>© 2025 Sagar Parmar</p>
      </div>
    </aside>
  );
};
