import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className=" border-b border-sidebar text-primary shadow-sm px-8 py-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        {/* Left - Title */}
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <ThemeToggle />

          {/* 🔔 Notification */}
          <IconBadge count={12}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.4-1.4a2 2 0 01-.6-1.44V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.16c0 .53-.21 1.05-.59 1.43L4 17h5m6 0v1a3 3 0 11-6 0v-1"
            />
          </IconBadge>

          {/* 💬 Messages */}
          <IconBadge count={6}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </IconBadge>

          {/* 🎁 Gifts */}
          <IconBadge count={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </IconBadge>

          {/* Divider */}
          <div className="w-px h-8 bg-border-sidebar" />

          {/* 👤 Profile */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <div className="text-right">
              <p className="text-xs opacity-80">Good Morning</p>
              <p className="text-sm font-semibold">James Sullivan</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-sidebar overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔁 Reusable Icon with Badge */
const IconBadge = ({ children, count }) => (
  <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
    <svg
      className="w-6 h-6 text-sidebar"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {count}
    </span>
  </div>
);

export default Navbar;
