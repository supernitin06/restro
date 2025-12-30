import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT SECTION */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TOP NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
