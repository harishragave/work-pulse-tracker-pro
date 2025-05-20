
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTaskContext } from '../contexts/TaskContext';

interface NavbarProps {
  title: string;
  onSettingsClick: () => void;
  onQuitClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, onSettingsClick, onQuitClick }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex justify-between items-center p-3 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-amber-50 text-gray-900 border-amber-200'
    } border-b`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
          U
        </div>
        <div className="text-sm font-medium">User</div>
      </div>
      
      <h1 className="text-lg font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={onSettingsClick}
          className={`p-1 rounded-full ${
            isDarkMode 
              ? 'hover:bg-gray-700' 
              : 'hover:bg-amber-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        <button 
          onClick={onQuitClick}
          className={`p-1 rounded-full ${
            isDarkMode 
              ? 'hover:bg-gray-700' 
              : 'hover:bg-amber-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
