import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Truck,
  ChevronLeft,
  ChevronRight,
  Circle,
  Bike,
  ShoppingBag
} from 'lucide-react';

const Sidebar = ({ theme = 'light' }) => { // Accept theme prop
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
      id: 'delivery-partners',
      label: 'Delivery Partners',
      icon: Bike,
      path: '/delivery-partners'
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
    // Apply theme class dynamically based on prop
    <div className={`${theme === 'dark' ? 'dark' : ''} sidebar-wrapper relative`}>
      <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-full`}>
        {/* Header with Logo */}
        <div className="relative border-b border-sidebar py-[18px] px-4">
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
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6  hover:scale-110 transition-all duration-200 z-20 p-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 text-black dark:text-white h-4" />
            ) : (
              <ChevronLeft className="w-4 text-black dark:text-white h-4" />
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
                      <IconComponent className="w-5 h-5" />
                      {item.badge && isCollapsed && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-sidebar"></div>
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
                            ? 'bg-primary text-sidebar shadow-md'
                            : 'bg-white/20 text-sidebar'
                          }
                          ${isHovered && !isActive ? 'bg-white/30' : ''}
                        `}>
                          {item.badge}
                        </span>
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
                    <div className="absolute inset-0 rounded-xl border-2 border-sidebar pointer-events-none"></div>
                  )}
                </div>

                {/* Dropdown Submenu */}
                {item.hasDropdown && !isCollapsed && (
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOrdersOpen ? 'max-h-48 mt-2 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={subItem.id}
                        className="pl-12 pr-4 py-2.5 text-sidebar/90 cursor-pointer text-sm 
                                 transition-all duration-200 rounded-lg mx-1 my-0.5
                                 hover:bg-white/10 hover:pl-14 hover:text-sidebar flex items-center gap-2.5 group"
                        style={{
                          transitionDelay: isOrdersOpen ? `${subIndex * 50}ms` : '0ms'
                        }}
                      >
                        <Circle className="w-1.5 h-1.5 fill-current transition-all duration-200 group-hover:scale-150" />
                        <span className="font-medium">{subItem.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
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