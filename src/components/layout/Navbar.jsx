import React, { useState, useRef, useEffect } from "react";
import { logout } from "../../api/services/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import fallbackImg from "../../assets/fallback.png";

import {
  Bell,
  MessageSquare,
  Gift,
  Search,
  Menu,
  Settings,
  LogOut,
  ShieldCheck,
  Mail,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import InputField from "../ui/InputField";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // ✅ fix key
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleSettings = () => {
  navigate("/settings");
};

  if (!user) return null; // loading or not logged in

  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center w-full max-w-md relative">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <InputField
              placeholder="Search anything..."
              className="w-full bg-gray-100 dark:bg-gray-800/50 py-2.5 pl-10 pr-4 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <IconButton icon={<Bell className="w-5 h-5" />} count={12} />
          <IconButton icon={<MessageSquare className="w-5 h-5" />} count={6} />
          <IconButton icon={<Gift className="w-5 h-5" />} count={2} />

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500">{user?.role}</p>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{user?.name}</p>
              </div>

              <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-primary to-purple-600">
              <img
  src={user?.avatar ? user.avatar : fallbackImg}
  alt={user?.name || "User"}
  className="w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900"
/>

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
              </div>
            </div>

            {openProfile && (
  <AdminProfilePopup
    handleLogout={handleLogout}
    handleSettings={handleSettings}
  />
)}

          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Components ---------- */

const IconButton = ({ icon, count }) => (
  <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
    {icon}
    {count > 0 && (
      <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-900" />
    )}
  </button>
);

const AdminProfilePopup = ({ handleLogout, handleSettings }) => {

  const { user } = useSelector((state) => state.auth); // ✅ fix key

  return (
    <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
  <img
    src={user?.avatar && user.avatar !== "" ? user.avatar : fallbackImg}
    className="w-10 h-10 rounded-full border border-primary"
    alt={user?.name}
  />

  <div>
    <p className="font-semibold text-gray-800 dark:text-white">
      {user?.name}
    </p>
    <p className="text-xs text-gray-500 flex items-center gap-1">
      <ShieldCheck className="w-3 h-3 text-primary" />
      {user?.role}
    </p>
  </div>
</div>


      {/* Details */}
      <div className="py-3 space-y-2 text-sm">
        <InfoRow icon={<Mail />} text={user?.email} />
        {/* <InfoRow icon={<Phone />} text={user?.phone} />
        <InfoRow icon={<Clock />} text={`Last login: ${user?.lastLogin}`} /> */}
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
       
          <ActionItem
    icon={<Settings />}
    label="Settings"
    onClick={handleSettings}
  />
        <ActionItem
          icon={<LogOut />}
          label="Logout"
          danger
          onClick={handleLogout} // ✅ pass from Navbar
        />
      </div>
    </div>
  );
};

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    <span>{text}</span>
  </div>
);

const ActionItem = ({ icon, label, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition
      ${
        danger
          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
  >
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    {label}
  </button>
);

export default Navbar;
