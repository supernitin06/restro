import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCog } from "react-icons/fa";
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
  Receipt,
  RefreshCw,
  FileText,
  ChevronDown,
  UserPlus,
  Shield,
  ShieldCheck,
  Circle,
  Menu,
  X,
} from "lucide-react";

import Button from "../ui/Button";
import "./sidebar.css";

const Sidebar = ({ theme = "dark" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      id: "offers",
      label: "Offers",
      icon: FaCog,
      path: "/offers",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      hasDropdown: true,
      subItems: [
        {
          id: "pay-dashboard",
          label: "Dashboard",
          path: "/payments/dashboard",
          icon: LayoutDashboard,
        },
        {
          id: "transactions",
          label: "Transactions",
          path: "/payments/transactions",
          icon: Receipt,
        },
        {
          id: "refunds",
          label: "Refunds",
          path: "/payments/refunds",
          icon: RefreshCw,
        },
        {
          id: "invoice",
          label: "Invoice",
          path: "/payments/invoice",
          icon: FileText,
        },
      ],
    },
    {
      id: "sub-admin",
      label: "Sub Admin",
      icon: ShieldCheck,
      path: "/sub-admin",
      hasDropdown: true,
      subItems: [
        {
          id: "create-sub",
          label: "Create SubAdmin",
          path: "/sub-admin/create",
          icon: UserPlus,
        },
        {
          id: "assign-admin",
          label: "Assign Admin",
          path: "/sub-admin/assign",
          icon: Shield,
        },
      ],
    },
    {
      id: "support",
      label: "Support & Tickets",
      icon: Shield,
      path: "/support-tickets",

    },
    {
      id: "settings",
      label: "Settings",
      icon: FaCog,
      path: "/settings",
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
        const sub = item.subItems.find((s) =>
          current.startsWith(s.path)
        );
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
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${isMobileOpen ? "hidden" : "block"}`}
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-gray-700 dark:text-gray-300" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={` h-screen sidebar-wrapper`}>
        <div
          className={`
            fixed lg:static top-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar
            transition-transform duration-300 ease-in-out
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64
            shadow-xl lg:shadow-none
          `}
        >

          {/* ---------- Header ---------- */}
          <div className="relative border-b border-sidebar p-4 ">
            <div className="flex items-center gap-3 h-14">
              <div
                onClick={() => setIsCollapsed(!isCollapsed)}
                className=" bg-sidebar rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 ml-4 text-sidebar" />
              </div>
              {!isCollapsed && (
                <span className="text-2xl font-bold text-sidebar">
                  Restro
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden ${isCollapsed ? "lg:hidden" : "lg:flex"} absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-50 border border-sidebar rounded-full shadow-md text-sidebar`}>
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
            {isMobileOpen && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* ---------- Menu ---------- */}
          <nav className="py-4 px-3 overflow-y-auto sidebar-scroll h-[calc(100vh-90px)] overflow-hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              const isExpanded = expandedMenu === item.id;

              return (
                <div key={item.id} className="mb-1">

                  {/* Main Item */}
                  <div
                    onClick={() => handleMenuClick(item)}
                    className={`flex items-center  justify-between px-4 py-3 rounded-xl cursor-pointer transition border-l-4
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
                        className={`w-4 h-4 transition ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </div>

                  {/* Dropdown */}
                  {item.hasDropdown && !isCollapsed && (
                    <div
                      className={`
                      overflow-hidden transition-all duration-400 ml-4
                      ${isExpanded ? "max-h-96 mt-2" : "max-h-0"}
                    `}
                    >
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon || Circle;
                        const isSubActive =
                          location.pathname === sub.path;

                        return (
                          <div
                            key={sub.id}
                            onClick={() => {
                              navigate(sub.path);
                              setIsMobileOpen(false);
                            }}
                            className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer
                            transition-all duration-200
                            ${isSubActive
                                ? "bg-primary/20 text-white scale-105 font-semibold translate-x-4"
                                : "text-sidebar/70 hover:bg-white/10 hover:translate-x-2"
                              }
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