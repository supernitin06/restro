import React from "react";
import {
  Bell,
  MessageSquare,
  Gift,
  Search,
  Menu
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import InputField from "../ui/InputField";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="px-6 py-4 flex items-center justify-between gap-4">

        {/* Left Section - Search & Toggle */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Toggle (Visible on smaller screens if needed) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* Search Bar */}
          <div className="hidden md:flex items-center w-full max-w-md relative group">
            <Search className="absolute left-3 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <InputField
              placeholder="Search anything..."
              className="w-full bg-gray-100 dark:bg-gray-800/50 border-none outline-none py-2.5 pl-10 pr-4 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            {/* Notifications */}
            <IconButton count={12} icon={<Bell className="w-5 h-5" />} />

            {/* Messages */}
            <IconButton count={6} icon={<MessageSquare className="w-5 h-5" />} />

            {/* Gifts / Offers */}
            <IconButton count={2} icon={<Gift className="w-5 h-5" />} />
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-primary transition-colors">Super Admin</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white leading-none mt-0.5">James Sullivan</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-primary to-purple-600">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="User"
                  className="w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Icon Button */
const IconButton = ({ icon, count, onClick }) => (
  <button
    onClick={onClick}
    className="relative p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:text-primary dark:hover:text-primary group"
  >
    {icon}
    {count > 0 && (
      <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-gray-900"></span>
      </span>
    )}
  </button>
);

export default Navbar;
