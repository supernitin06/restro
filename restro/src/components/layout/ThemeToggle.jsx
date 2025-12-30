import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-gray-600 transition-transform duration-300 ease-in-out hover:scale-110" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-400 transition-transform duration-300 ease-in-out hover:rotate-90" />
      )}
    </button>
  );
};

export default ThemeToggle;
