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
  ChevronDown,
  UserPlus,
  Shield,
  ShieldCheck,
  Circle,
  Receipt,
  RefreshCw,
  FileText,
} from "lucide-react";

import Button from "../ui/Button";
import "./Sidebar.css";

const Sidebar = ({ theme = "dark" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);

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
      id:"support",
      label:"Support & Tickets",
      icon:Shield,
    },
    {
      id:"settings",
      label:"Settings",
      icon:FaCog,
      path:"/settings",
    }
  ];

  /* ---------------- Sync active route ---------------- */
  useEffect(() => {
    const current = location.pathname;

    for (const item of menuItems) {
      if (item.path === current) {
        setActiveMenu(item.id);
        setExpandedMenu(null);
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
    } else {
      navigate(item.path);
      setActiveMenu(item.id);
      setExpandedMenu(null);
    }
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""} sidebar-wrapper h-screen overflow-y-auto`}>

      <div className={`${isCollapsed ? "w-20" : "w-64"} h-screen`}>

        {/* ---------- Header ---------- */}
        <div className="relative border-b border-sidebar px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-sidebar" />
            </div>
            {!isCollapsed && (
              <span className="text-2xl font-bold text-sidebar">
                Restro
              </span>
            )}
          </div>

          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary text-sidebar rounded-full"
          >
            {isCollapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronLeft size={14} />
            )}
          </Button>
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
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition
                    ${
                      isActive
                        ? "sidebar-item-active font-semibold"
                        : "text-sidebar hover:bg-white/10"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Dropdown */}
                {item.hasDropdown && !isCollapsed && (
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ml-4
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
                          onClick={() => navigate(sub.path)}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer
                            transition-all duration-200
                            ${
                              isSubActive
                                ? "bg-primary/20 text-primary font-semibold translate-x-2"
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
  );
};

export default Sidebar;