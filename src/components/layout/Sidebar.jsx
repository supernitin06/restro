// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Truck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Wallet,
  FileText,
  RefreshCw,
  Banknote,
  Settings,
  Receipt, // New icon for transaction details
  ExternalLink // Icon for transaction details
} from 'lucide-react';
import SidebarDropdown from '../ui/DropDown';

const Sidebar = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // Payment submenu items
  const paymentSubItems = [
    {
      id: 'payment-dashboard',
      label: ' Payment Dashboard',
      icon: LayoutDashboard,
      path: '/payments/dashboard'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: FileText,
      path: '/payments/transactions',
      badge: '24'
    },
    {
      id: 'transaction-details',
      label: 'Transaction Details',
      icon: Receipt,
      path: '/payments/details',
      isDynamic: true,
      // Note: For dynamic routes like /transactions/:id, we'll handle specially
    },
    {
      id: 'refunds',
      label: 'Refunds',
      icon: RefreshCw,
      path: '/payments/refunds',
      badge: '5'
    },
    {
      id: 'payment-methods',
      label: 'Invoice',
      icon: Banknote,
      path: '/payments/invoice'
    }
  ];

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      path: '/users'
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      icon: UtensilsCrossed,
      path: '/restaurants'
    },
    {
      id: 'delivery-settings',
      label: 'Delivery Settings',
      icon: Truck,
      path: '/delivery-settings'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      hasDropdown: true,
      badge: '3',
      subItems: paymentSubItems
    }
  ];

  // Check if current path is a transaction details page
  const isTransactionDetailsPath = (pathname) => {
    return pathname.startsWith('/payments/transactions/') && 
           pathname !== '/payments/transactions' &&
           !pathname.includes('/refunds') &&
           !pathname.includes('/invoice');
  };

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check main menu items
    const activeItem = menuItems.find(item => item.path === currentPath);
    
    // Check if current path is in payments submenu
    const isPaymentPath = paymentSubItems.some(subItem => 
      subItem.path === currentPath || 
      (subItem.id === 'transaction-details' && isTransactionDetailsPath(currentPath))
    );
    
    if (activeItem) {
      setActiveMenu(activeItem.id);
      // Close all dropdowns when on a main menu item
      setOpenDropdowns({});
    } else if (isPaymentPath) {
      setActiveMenu('payments');
      setOpenDropdowns(prev => ({ ...prev, payments: true }));
      
      // Update active state for payment subitems
      paymentSubItems.forEach(subItem => {
        if (subItem.path === currentPath || 
            (subItem.id === 'transaction-details' && isTransactionDetailsPath(currentPath))) {
          subItem.isActive = true;
        } else {
          subItem.isActive = false;
        }
      });
    } else if (currentPath === '/') {
      setActiveMenu('dashboard');
    }
  }, [location.pathname]);

  const handleMenuClick = (menuId, hasDropdown, path) => {
    if (hasDropdown) {
      setOpenDropdowns(prev => ({
        ...prev,
        [menuId]: !prev[menuId]
      }));
      setActiveMenu(menuId);
    } else if (path) {
      setActiveMenu(menuId);
      navigate(path);
      // Close all dropdowns when navigating to a non-dropdown item
      setOpenDropdowns({});
    }
  };

  const handleSubmenuClick = (subItem) => {
    // Handle transaction details specially
    if (subItem.id === 'transaction-details') {
      // Navigate to the transaction details page with a sample ID or create button
      // You might want to navigate to a specific transaction or show a list
      navigate('/payments/transactions');
      // Or show a message that user needs to select a transaction first
      // alert('Please select a transaction from the transactions list');
      return;
    }
    
    // Update active state for all subitems
    paymentSubItems.forEach(item => {
      item.isActive = item.id === subItem.id;
    });
    
    navigate(subItem.path);
  };

  const isPaymentActive = () => {
    const currentPath = location.pathname;
    return paymentSubItems.some(subItem => 
      subItem.path === currentPath || 
      (subItem.id === 'transaction-details' && isTransactionDetailsPath(currentPath))
    );
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} sidebar-wrapper relative`}>
      <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-full`}>
        {/* Header with Logo */}
        <div className="relative border-b border-sidebar py-5 px-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                  <UtensilsCrossed className="w-6 h-6 text-sidebar" />
                </div>
                <span className="text-2xl font-bold tracking-wide text-sidebar">Restro</span>
              </div>
            )}
            {isCollapsed && (
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center mx-auto shadow-lg transform transition-transform hover:scale-105">
                <UtensilsCrossed className="w-6 h-6 text-sidebar" />
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary text-sidebar rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-200 z-20 p-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="py-6 px-3">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            const isHovered = hoveredMenu === item.id;

            if (item.hasDropdown) {
              // Use SidebarDropdown for dropdown items
              return (
                <SidebarDropdown
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  isOpen={openDropdowns[item.id] || false}
                  onToggle={() => handleMenuClick(item.id, true, null)}
                  subItems={item.subItems}
                  badge={item.badge}
                  isActive={isActive || (item.id === 'payments' && isPaymentActive())}
                  isCollapsed={isCollapsed}
                  onSubItemClick={handleSubmenuClick}
                  isPayment={item.id === 'payments'}
                />
              );
            } else {
              // Regular menu item
              return (
                <div key={item.id} className="mb-1">
                  <div
                    onClick={() => handleMenuClick(item.id, false, item.path)}
                    onMouseEnter={() => setHoveredMenu(item.id)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    className={`
                      flex items-center justify-between px-4 py-3.5 cursor-pointer transition-all duration-300 relative group rounded-xl
                      ${isActive
                        ? 'sidebar-item-active shadow-lg scale-[1.02] font-semibold'
                        : 'text-sidebar hover:bg-white/10'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                    )}

                    <div className="flex items-center gap-3 flex-1">
                      <div className={`
                        relative transition-all duration-300
                        ${isActive ? 'scale-110' : ''}
                        ${isHovered && !isActive ? 'scale-105' : ''}
                      `}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {!isCollapsed && (
                        <span className={`text-sm transition-all duration-300 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                          {item.label}
                        </span>
                      )}
                    </div>

                    {/* Hover Effect Border */}
                    {!isActive && isHovered && (
                      <div className="absolute inset-0 rounded-xl border-2 border-sidebar pointer-events-none"></div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </nav>

        {/* Collapsed State Tooltip */}
        {isCollapsed && hoveredMenu && (
          <div className="fixed left-20 bg-primary text-sidebar px-3 py-2 rounded-lg shadow-xl text-sm font-medium pointer-events-none z-50"
            style={{
              top: `${document.querySelector(`[title="${menuItems.find(m => m.id === hoveredMenu)?.label}"]`)?.getBoundingClientRect().top}px`
            }}>
            {menuItems.find(m => m.id === hoveredMenu)?.label}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-primary rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;