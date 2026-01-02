 import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
 
const Layout = () => {
  return (
    <div className="app flex h-screen ">
      {/* LEFT SIDEBAR */}
      <div className=" sticky top-0">
      <Sidebar />
      </div>
 
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
