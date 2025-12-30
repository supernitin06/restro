import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
    FaHome, 
    FaUsers, 
    FaStore, 
    FaTruck, 
    FaBars, 
    FaCreditCard, 
    FaExchangeAlt, 
    FaReceipt, 
    FaFileInvoiceDollar, 
    FaChartBar,
    FaFileAlt 
} from 'react-icons/fa';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { path: '/', label: 'Dashboard', icon: <FaHome /> },
        { path: '/users', label: 'Users', icon: <FaUsers /> },
        { path: '/restaurants', label: 'Restaurants', icon: <FaStore /> },
        { path: '/delivery-settings', label: 'Delivery Charge', icon: <FaTruck /> },
        // Payment Module Navigation Items
        { path: '/payment/dashboard', label: 'Payment Dashboard', icon: <FaChartBar /> },
        { path: '/payment/transactions', label: 'Transactions', icon: <FaExchangeAlt /> },
        { path: '/payment/refunds', label: 'Refunds', icon: <FaReceipt /> },
        { path: '/payment/invoices', label: 'Invoices', icon: <FaFileInvoiceDollar /> },
        { path: '/payment/tax-reports', label: 'Tax Reports', icon: <FaFileAlt /> },
        { path: '/payment/settlements', label: 'Settlements', icon: <FaCreditCard /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`fixed md:relative z-20 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className={`p-6 border-b border-gray-200 dark:border-gray-700 flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                        {isSidebarOpen ? (
                            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent truncate">
                                BitMax
                            </h1>
                        ) : (
                            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">B</span>
                        )}
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {/* Main Navigation */}
                        <div className="mb-4">
                            <h3 className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ${!isSidebarOpen && 'text-center'}`}>
                                {isSidebarOpen ? 'Main' : '•'}
                            </h3>
                            {navItems.slice(0, 4).map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400'
                                        }`
                                    }
                                    title={!isSidebarOpen ? item.label : ''}
                                >
                                    <span className={`text-xl ${!isSidebarOpen && 'mx-auto'}`}>
                                        {item.icon}
                                    </span>
                                    <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                                        {item.label}
                                    </span>

                                    {!isSidebarOpen && (
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* Payment Module Navigation */}
                        <div className="mt-6">
                            <h3 className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ${!isSidebarOpen && 'text-center'}`}>
                                {isSidebarOpen ? 'Payments' : '💰'}
                            </h3>
                            {navItems.slice(4).map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-emerald-600 dark:hover:text-emerald-400'
                                        }`
                                    }
                                    title={!isSidebarOpen ? item.label : ''}
                                >
                                    <span className={`text-xl ${!isSidebarOpen && 'mx-auto'}`}>
                                        {item.icon}
                                    </span>
                                    <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                                        {item.label}
                                    </span>

                                    {!isSidebarOpen && (
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                        >
                            <FaBars className="transform transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                    <span className="font-bold text-gray-800 dark:text-white">Admin</span>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                        className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FaBars />
                    </button>
                </header>

                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;