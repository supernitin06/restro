import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Truck,
  Bike,
  ShoppingBag,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Shield,
  ShieldCheck,
  Circle,
  Menu,
  X,
} from "lucide-react";

import Button from "../ui/Button";
import "./Sidebar.css";

const Sidebar = ({ theme = "dark" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* ---------------- Menu config ---------------- */
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      path: "/users",
    },
    {
      id: "restaurants",
      label: "Restaurants",
      icon: UtensilsCrossed,
      path: "/restaurants",
    },
    {
      id: "delivery-settings",
      label: "Delivery Settings",
      icon: Truck,
      path: "/delivery-settings",
    },
    {
      id: "delivery-partners",
      label: "Delivery Partners",
      icon: Bike,
      path: "/delivery-partners",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
      path: "/orders",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      hasDropdown: true,
      subItems: [
        { id: "pay-dashboard", label: "Dashboard", path: "/payments/dashboard" },
        { id: "transactions", label: "Transactions", path: "/payments/transactions" },
        { id: "refunds", label: "Refunds", path: "/payments/refunds" },
        { id: "invoice", label: "Invoice", path: "/payments/invoice" },
      ],
    },
    {
      id: "sub-admin",
      label: "Sub Admin",
      icon: ShieldCheck,
      path: "/sub-admin",
      hasDropdown: true,
      subItems: [
        { id: "create-sub", label: "Create SubAdmin", path: "/sub-admin/create", icon: UserPlus },
        { id: "assign-admin", label: "Assign Admin", path: "/sub-admin/assign", icon: Shield },
      ],
    },
  ];

  /* ---------------- Sync active route ---------------- */
  useEffect(() => {
    const current = location.pathname;

    for (const item of menuItems) {
      if (item.path === current) {
        setActiveMenu(item.id);
        setExpandedMenu(item.hasDropdown ? item.id : null);
        return;
      }

      if (item.hasDropdown) {
        const sub = item.subItems.find((s) => current.startsWith(s.path));
        if (sub) {
          setActiveMenu(item.id);
          setExpandedMenu(item.id);
          return;
        }
      }
    }
  }, [location.pathname]);

  /* ---------------- Handlers ---------------- */
  const handleMenuClick = (item) => {
    if (item.hasDropdown) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
      setActiveMenu(item.id);
      if (item.path) navigate(item.path);
      if (item.path) setIsMobileOpen(false);
    } else {
      navigate(item.path);
      setActiveMenu(item.id);
      setExpandedMenu(null);
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className={`lg:hidden fixed top-4 left-4 z-50 ${isMobileOpen ? "hidden" : ""}`}>
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-sidebar"
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`${theme === "dark" ? "dark" : ""} sidebar-wrapper h-full`}>
        <div
          className={`
            fixed lg:static top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-sidebar
            transition-all duration-300 ease-in-out
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64
          `}
        >

        {/* ---------- Header ---------- */}
        <div className="relative border-b border-sidebar p-4 ">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-sidebar" />
            </div>
            {!isCollapsed && (
              <span className="text-2xl font-bold text-sidebar">Restro</span>
            )}
          </div>
<button
  onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-50 bg-white dark:bg-gray-900 border border-sidebar rounded-full shadow-md text-sidebar"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
              stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={isCollapsed ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
  </svg>
</button>


          {/* Mobile Close Button */}
          {isMobileOpen && (<Button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-sidebar"
          >
            <X size={20} />
          </Button>)}
        </div>

        {/* ---------- Menu ---------- */}
        <nav className="py-4 px-3 overflow-y-auto sidebar-scroll">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            const isExpanded = expandedMenu === item.id;

            return (
              <div key={item.id} className="mb-1">
                {/* Main Item */}
                <div
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition border-l-4
                    ${isActive ? "sidebar-item-active border-white" : "text-sidebar hover:bg-white/10 border-transparent hover:border-white"}
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition ${isExpanded ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* Dropdown */}
                {item.hasDropdown && !isCollapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ml-4
                      ${isExpanded ? "max-h-96 mt-2" : "max-h-0"}
                    `}
                  >
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon || Circle;
                      const isSubActive = location.pathname === sub.path;

                      return (
                        <div
                          key={sub.id}
                          onClick={() => navigate(sub.path)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer
                            ${isSubActive ? "bg-primary/20 text-primary" : "text-sidebar/70 hover:bg-white/10"}
                          `}
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{sub.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
