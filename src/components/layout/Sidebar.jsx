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
  Settings
} from 'lucide-react';
import SidebarDropdown from '../ui/DropDown';

const Sidebar = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);

  /* ---------------- Payments submenu ---------------- */
  const paymentSubItems = [
    { id: 'payment-dashboard', label: 'Payment Dashboard', icon: LayoutDashboard, path: '/payments/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: FileText, path: '/payments/transactions', badge: '24' },
    { id: 'refunds', label: 'Refunds', icon: RefreshCw, path: '/payments/refunds', badge: '5' },
    { id: 'invoice', label: 'Invoice', icon: Banknote, path: '/payments/invoice' },
    { id: 'details', label: 'Transaction Details', icon: Receipt, path: '/payments/details' }
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
    <div className={`${theme === 'dark' ? 'dark' : ''} sidebar-wrapper overflow-y-auto scroll-bar-thin overflow-x-hidden`}>
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

            return (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                  ${activeMenu === item.id ? 'sidebar-item-active' : 'text-sidebar hover:bg-white/10'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
