import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaStore, FaTruck, FaBars } from 'react-icons/fa';

const Layout = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: <FaHome /> },
        { path: '/users', label: 'Users', icon: <FaUsers /> },
        { path: '/restaurants', label: 'Restaurants', icon: <FaStore /> },
        { path: '/delivery-settings', label: 'Delivery Settings', icon: <FaTruck /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white bg-red-600 border-r border-gray-200 flex flex-col h-screen overflow-y-auto">
                <div className="p-6 border-b bg-yellow-400 border-gray-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                    <span className="text-xl font-bold text-gray-800 tracking-tight">Bitmax Restro</span>
                </div>

                {/* Sidebar nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-medium shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl">
                        <p className="text-xs text-indigo-800 font-medium">Admin Dashboard</p>
                        <p className="text-[10px] text-gray-500 mt-1">v.1.0.2</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-red-600 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden  bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-800">Bitmax Restro</span>
                    <button className="text-gray-600"><FaBars /></button>
                </div>

                {/* Scrollable main content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>
        </div>


    );
};

export default Layout;