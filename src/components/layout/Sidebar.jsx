import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import './sidebar.css';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Truck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  FileText,
  RefreshCw,
  Banknote,
  Receipt,
  ShoppingBag,
  ChevronDown,
  Circle,
  Percent
} from 'lucide-react';
import SidebarDropdown from '../ui/DropDown';

const Sidebar = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  /* ---------------- Payments submenu ---------------- */
  const paymentSubItems = [
    { id: 'payment-dashboard', label: 'Payment Dashboard', icon: LayoutDashboard, path: '/payments/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: FileText, path: '/payments/transactions', badge: '24' },
    { id: 'refunds', label: 'Refunds', icon: RefreshCw, path: '/payments/refunds', badge: '5' },
    { id: 'invoice', label: 'Invoice', icon: Banknote, path: '/payments/invoice' },
    { id: 'details', label: 'Transaction Details', icon: Receipt, path: '/payments/details' },
    {
      id: 'offers-coupons',
      label: 'Offers & Coupons',
      icon: Percent,
      path: '/offers'
    }
  ];



  /* ---------------- Main menu ---------------- */
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed, path: '/restaurants' },

    // // Order & Delivery Heading
    // { type: 'heading', label: 'Order & Delivery' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { id: 'delivery-partners', label: 'Delivery Partners', icon: Users, path: '/delivery-partners' },
    { id: 'delivery-settings', label: 'Delivery Settings', icon: Truck, path: '/delivery-settings' },

    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      hasDropdown: true,
      badge: '3',
      subItems: paymentSubItems
    }
  ];

  /* ---------------- Active menu sync ---------------- */
  useEffect(() => {
    const path = location.pathname;

    const main = menuItems.find(m => m.path === path);
    if (main) {
      setActiveMenu(main.id);
      setOpenDropdowns({});
      return;
    }

    const paymentMatch = paymentSubItems.find(s => path.startsWith(s.path));
    if (paymentMatch) {
      setActiveMenu('payments');
      setOpenDropdowns((prev) => ({ ...prev, payments: true }));
      return;
    }

    /* 
       Since we flattened orders/delivery, they are now 'main' items 
       and matched by the first check above. 
       We only need to handle sub-items for payments.
    */
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    if (item.hasDropdown) {
      setOpenDropdowns(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
      setActiveMenu(item.id);
    } else {
      navigate(item.path);
      setActiveMenu(item.id);
      setOpenDropdowns({});
    }
  };

  const handleSubItemClick = (sub) => {
    navigate(sub.path);
  };

  return (

    <div className={`${theme === 'dark' ? 'dark' : ''} sidebar-wrapper relative`}>
      <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-full`}>

        {/* ---------- Header ---------- */}
        <div className="relative border-b border-sidebar px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-sidebar" />
            </div>
            {!isCollapsed && (
              <span className="text-2xl font-bold text-sidebar">Restro</span>
            )}
          </div>

          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary text-sidebar rounded-full flex items-center justify-center"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* ---------- Menu ---------- */}
        <nav className="py-6 px-3">
          {menuItems.map(item => {
            if (item.hasDropdown) {
              return (
                <SidebarDropdown
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  isOpen={openDropdowns[item.id]}
                  isCollapsed={isCollapsed}
                  isActive={activeMenu === item.id}
                  subItems={item.subItems}
                  onToggle={() => handleMenuClick(item)}
                  onSubItemClick={handleSubItemClick}
                />
              );
            }

            if (item.type === 'heading') {
              if (isCollapsed) return null;
              return (
                <div key={item.label} className="px-4 mt-6 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              );
            }

            const IconComponent = item.icon || Circle;
            const isActive = activeMenu === item.id;
            const isHovered = hoveredMenu === item.id;
            const isOrdersOpen = openDropdowns[item.id];

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


                  {!isActive && isHovered && (
                    <div className="absolute inset-0 rounded-xl border-2 border-sidebar pointer-events-none"></div>
                  )}
                </div>


                {item.hasDropdown && !isCollapsed && (
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOrdersOpen ? 'max-h-48 mt-2 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    {item.subItems?.map((subItem, subIndex) => (
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

        {/* Collapsed Tooltip */}
        {isCollapsed && hoveredMenu && (
          <div className="fixed left-20 bg-primary text-sidebar px-3 py-2 rounded-lg shadow-xl text-sm font-medium pointer-events-none z-50">
            {menuItems.find(m => m.id === hoveredMenu)?.label}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-primary rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
