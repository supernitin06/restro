import React from 'react';
import { Moon, Sun } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300 bg-transparent shadow-none"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-sidebar transition-transform duration-300 ease-in-out hover:scale-110" />
      ) : (
        <Sun className="w-6 h-6 text-sidebar transition-transform duration-300 ease-in-out hover:rotate-90" />
      )}
    </Button>
  );
};

export default ThemeToggle;
