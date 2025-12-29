import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  UtensilsCrossed, 
  BarChart3, 
  ChevronDown,
  Menu,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: '65',
      hasDropdown: true,
      subItems: [
        { id: 'pending', label: 'Pending Orders', path: '/orders/pending' },
        { id: 'completed', label: 'Completed Orders', path: '/orders/completed' },
        { id: 'cancelled', label: 'Cancelled Orders', path: '/orders/cancelled' }
      ]
    },
    {
      id: 'menus',
      label: 'Menus',
      icon: UtensilsCrossed,
      hasArrow: true,
      path: '/menus'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      hasArrow: true,
      path: '/customers'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      hasArrow: true,
      path: '/analytics'
    }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (menuId === 'orders') {
      setIsOrdersOpen(!isOrdersOpen);
    }
  };

  return (
    <div className={`bg-[#2563eb] min-h-screen text-[#2563eb] transition-all duration-300 ease-in-out ${isCollapsed ? 'w-29' : 'w-65'} relative`}>
      {/* Header with Logo */}
      <div className="relative border-b border-white/20 py-4 px-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-6 h-6 text-[#2563eb]" />
              </div>
              <span className="text-2xl font-bold tracking-wide text-white">Restro</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto shadow-lg">
              <UtensilsCrossed className="w-6 h-6 text-[#2563eb]" />
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white text-2xl p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-6 relative">
        {/* White curved background for Dashboard */}
        {activeMenu === 'dashboard' && !isCollapsed && (
          <div className="absolute top-6 left-0 right-0 bg-white rounded-r-[60px] h-14 z-0"></div>
        )}
        
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div
                onClick={() => handleMenuClick(item.id)}
                className={`
                  flex items-center justify-between px-5 py-3.5 mx-4 cursor-pointer transition-all duration-300 relative z-10
                  ${item.id === 'dashboard' && activeMenu === 'dashboard' 
                    ? 'text-[#ec4899] font-semibold' 
                    : activeMenu === item.id
                    ? 'bg-white text-[#2563eb] font-semibold shadow-lg rounded-lg' 
                    : 'text-white hover:bg-[#1d4ed8] hover:bg-opacity-10 rounded-lg'
                  }
                  ${item.id !== 'dashboard' ? 'my-1' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5" />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={`
                        px-2 py-0.5 rounded-xl text-xs font-semibold
                        ${activeMenu === item.id 
                          ? 'bg-pink-600 text-white' 
                          : 'bg-white bg-opacity-20 text-white'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                    {item.hasArrow && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {item.hasDropdown && (
                      <ChevronDown 
                        className={`
                          w-4 h-4 transition-transform duration-300
                          ${isOrdersOpen ? 'rotate-180' : 'rotate-0'}
                        `}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Dropdown Submenu for Orders */}
              {item.hasDropdown && !isCollapsed && (
                <div className={`
                  overflow-hidden transition-all duration-400 ease-in-out pl-12
                  ${isOrdersOpen ? 'max-h-48 mt-1' : 'max-h-0'}
                `}>
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className="px-4 py-2.5 text-white text-opacity-90 cursor-pointer text-sm 
                               transition-all duration-200 rounded-md my-0.5 mx-4
                               hover:bg-[#1d4ed8] hover:bg-opacity-10 hover:pl-5 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white bg-opacity-60"></div>
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;