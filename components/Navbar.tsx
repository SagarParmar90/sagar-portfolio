import React from 'react';
import { Menu, Search, Video, Bell, Mic, Moon, Sun, Plus } from 'lucide-react';
import { PROFILE } from '../constants';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, darkMode, toggleDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-yt-black flex items-center justify-between px-4 z-50 border-b border-transparent dark:border-yt-borderDark">
      
      {/* Left: Toggle & Logo */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-yt-darkGray text-yt-text dark:text-yt-textDark">
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-1 relative">
           <div className="w-8 h-6 bg-yt-red rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
             CV
           </div>
           <span className="text-xl font-bold tracking-tighter text-yt-text dark:text-white font-sans">
             SagarPortfolio
           </span>
           <span className="absolute -top-1 -right-3 text-[10px] text-yt-meta dark:text-yt-metaDark font-normal">IN</span>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center flex-1 max-w-[720px] ml-10">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center border border-gray-300 dark:border-yt-borderDark rounded-l-full px-4 py-1.5 bg-white dark:bg-[#121212] ml-8 shadow-inner dark:shadow-none focus-within:border-blue-500 dark:focus-within:border-blue-500">
            <input 
              type="text" 
              placeholder="Search projects, skills, or case studies" 
              className="w-full bg-transparent outline-none text-yt-text dark:text-yt-textDark placeholder-gray-500 font-normal text-base"
            />
          </div>
          <button className="h-full px-5 py-2 bg-gray-100 dark:bg-yt-darkGray border border-l-0 border-gray-300 dark:border-yt-borderDark rounded-r-full hover:bg-gray-200 dark:hover:bg-[#3f3f3f]">
            <Search size={20} className="text-yt-text dark:text-yt-textDark" />
          </button>
        </div>
        <button className="ml-4 p-2.5 bg-gray-100 dark:bg-[#181818] rounded-full hover:bg-gray-200 dark:hover:bg-[#3f3f3f]">
          <Mic size={20} className="text-yt-text dark:text-yt-textDark" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-yt-darkGray text-yt-text dark:text-yt-textDark">
           {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        
        <Link to="/admin" className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-yt-darkGray text-yt-text dark:text-yt-textDark" title="Upload / Manage Content">
          <Video size={24} />
          <span className="absolute bottom-3 right-3 bg-yt-red text-white rounded-full w-3 h-3 flex items-center justify-center border border-white dark:border-yt-black text-[8px]">
            <Plus size={8} />
          </span>
        </Link>

        <button className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-yt-darkGray text-yt-text dark:text-yt-textDark relative">
          <Bell size={24} />
          <span className="absolute top-1 right-1 bg-yt-red text-white text-[10px] px-1 rounded-full border-2 border-white dark:border-yt-black">2</span>
        </button>
        <div className="px-2">
           <img 
             src={PROFILE.avatar} 
             alt="User" 
             className="w-8 h-8 rounded-full object-cover cursor-pointer"
           />
        </div>
      </div>

    </header>
  );
};