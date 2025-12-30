import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Truck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [hoveredMenu, setHoveredMenu] = useState(null);

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
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      path: '/orders'
    },
    
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    // Find an exact match first, or a parent match for sub-routes
    const activeItem = menuItems.find(item => 
      item.path === currentPath || (item.path !== '/' && currentPath.startsWith(item.path))
    );
    if (activeItem) {
      setActiveMenu(activeItem.id);
    } else if (currentPath === '/') {
      setActiveMenu('dashboard');
    }
  }, [location.pathname]); // menuItems is static, no need to include

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    const item = menuItems.find(i => i.id === menuId);
    if (item?.path) {
      navigate(item.path);
    }
  };

  return (
    <div className={`bg-gradient-to-b from-[#2563eb] to-[#1e40af] dark:from-gray-900 dark:to-gray-950 min-h-screen text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} relative shadow-2xl`}>
      {/* Header with Logo */}
      <div className="relative border-b border-white/10 dark:border-gray-800 py-5 px-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                <UtensilsCrossed className="w-6 h-6 text-[#2563eb] dark:text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide text-white">Restro</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-11 h-11 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center mx-auto shadow-lg transform transition-transform hover:scale-105">
              <UtensilsCrossed className="w-6 h-6 text-[#2563eb] dark:text-white" />
            </div>
          )}
        </div>

        {/* Toggle Button - Positioned absolutely */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-800 text-[#2563eb] dark:text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-200 z-20"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="py-6 px-3">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = activeMenu === item.id;
          const isHovered = hoveredMenu === item.id;

          return (
            <div key={item.id} className="mb-1">
              {/* Main Menu Item */}
              <div
                onClick={() => handleMenuClick(item.id)}
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
                className={`
                  flex items-center justify-between px-4 py-3.5 cursor-pointer transition-all duration-300 relative group
                  ${isActive
                    ? 'bg-white dark:bg-gray-800 text-[#2563eb] dark:text-white shadow-lg rounded-xl scale-[1.02] font-semibold'
                    : 'text-white rounded-xl hover:bg-white/10'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ec4899] rounded-r-full"></div>
                )}

                <div className="flex items-center gap-3 flex-1">
                  <div className={`
                    relative transition-all duration-300
                    ${isActive ? 'scale-110' : ''}
                    ${isHovered && !isActive ? 'scale-105' : ''}
                  `}>
                    <IconComponent className="w-5 h-5" />
                    {item.badge && isCollapsed && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ec4899] rounded-full border-2 border-[#2563eb]"></div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className={`text-sm transition-all duration-300 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                      {item.label}
                    </span>
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-xs font-bold transition-all duration-300
                        ${isActive
                          ? 'bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white shadow-md'
                          : 'bg-white/20 text-white'
                        }
                        ${isHovered && !isActive ? 'bg-white/30' : ''}
                      `}>
                        {item.badge}
                      </span>
                    )}
                    {item.hasArrow && (
                      <ChevronRight className={`
                        w-4 h-4 transition-all duration-300
                        ${isHovered ? 'translate-x-1' : ''}
                      `} />
                    )}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`
                          w-4 h-4 transition-all duration-300
                          ${isOrdersOpen ? 'rotate-180' : 'rotate-0'}
                        `}
                      />
                    )}
                  </div>
                )}

                {/* Hover Effect Border */}
                {!isActive && isHovered && (
                  <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none"></div>
                )}
              </div>

            </div>
          );
        })}
      </nav>

      {/* Collapsed State Tooltip */}
      {isCollapsed && hoveredMenu && (
        <div className="fixed left-20 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium pointer-events-none z-50"
          style={{
            top: `${document.querySelector(`[title="${menuItems.find(m => m.id === hoveredMenu)?.label}"]`)?.getBoundingClientRect().top}px`
          }}>
          {menuItems.find(m => m.id === hoveredMenu)?.label}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
