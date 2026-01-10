import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { logout } from "../../api/services/authSlice";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";

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
import NotificationDropdown from "./NavbarCom/NotificationDropdown";
import MessagesDropdown from "./NavbarCom/MessagesDropdown";
import GiftsDropdown from "./NavbarCom/GiftsDropdown";
import CreateOfferModal from "./NavbarCom/CreateOfferModal";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, authToken } = useSelector((state) => state.auth);

  const restaurantId = user?.restaurantId;

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);
  const giftsRef = useRef(null);

  const socketRef = useRef(null);

  const [openProfile, setOpenProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gifts, setGifts] = useState([]);

 
  /* =====================================================
     ACTIONS
  ===================================================== */
  const handleLogout = () => dispatch(logout());
  const handleSettings = () => navigate("/settings");

  if (!user) return null;

  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1">
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex w-full max-w-md relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <InputField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div ref={notificationRef} className="relative">
            <IconButton
              icon={<Bell />}
              count={notifications.length}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            />
            <NotificationDropdown
              isOpen={isNotificationsOpen}
              notifications={notifications}
              onClearAll={() => setNotifications([])}
            />
          </div>

          <div ref={messagesRef} className="relative">
            <IconButton
              icon={<MessageSquare />}
              count={messages.filter((m) => m.unread).length}
              onClick={() => setIsMessagesOpen(!isMessagesOpen)}
            />
            <MessagesDropdown isOpen={isMessagesOpen} messages={messages} />
          </div>

          <div ref={giftsRef} className="relative">
            <IconButton
              icon={<Gift />}
              count={gifts.length}
              onClick={() => setIsGiftsOpen(!isGiftsOpen)}
            />
            <GiftsDropdown
              isOpen={isGiftsOpen}
              gifts={gifts}
              onCreateNew={() => setIsOfferModalOpen(true)}
            />
          </div>

          <div className="h-8 w-px bg-gray-300 mx-2" />

          <div ref={profileRef} className="relative">
            <img
              onClick={() => setOpenProfile(!openProfile)}
              src={user.avatar || fallbackImg}
              className="w-10 h-10 rounded-full border cursor-pointer"
              alt={user.name}
            />

            {openProfile && (
              <AdminProfilePopup
                user={user}
                handleLogout={handleLogout}
                handleSettings={handleSettings}
              />
            )}
          </div>
        </div>
      </div>

      <CreateOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const IconButton = ({ icon, count, onClick }) => (
  <button
    onClick={onClick}
    className="relative p-2.5 rounded-xl hover:bg-primary/10"
  >
    {React.cloneElement(icon, { className: "w-5 h-5" })}
    {count > 0 && (
      <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
    )}
  </button>
);

const AdminProfilePopup = ({ user, handleLogout, handleSettings }) => (
  <div className="absolute right-0 mt-4 w-80 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">

    {/* Header Section */}
    <div className="relative p-6 pb-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={user.avatar || fallbackImg}
            className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white dark:border-gray-800"
            alt={user.name}
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center gap-1 w-fit">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Body Section */}
    <div className="px-4 py-2 -mt-4 bg-white dark:bg-gray-900 rounded-t-3xl border-t border-gray-100 dark:border-gray-800">
      <div className="py-4 space-y-3">
        <InfoRow icon={<Mail />} text={user.email} label="Email Address" />
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

      <div className="pb-2 space-y-1">
        <ActionItem
          icon={<Settings />}
          label="Account Settings"
          description="Manage your preferences"
          onClick={handleSettings}
        />
        <ActionItem
          icon={<LogOut />}
          label="Sign Out"
          description="End your session securely"
          danger
          onClick={handleLogout}
        />
      </div>
    </div>
  </div>
);

const InfoRow = ({ icon, text, label }) => (
  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </div>
    <div className="flex-1 min-w-0">
      {label && <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">{label}</p>}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{text}</p>
    </div>
  </div>
);

const ActionItem = ({ icon, label, description, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group text-left
      ${danger
        ? "hover:bg-red-50 dark:hover:bg-red-900/10"
        : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
      ${danger
        ? "bg-red-50 text-red-500 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/40"
        : "bg-gray-100 text-gray-500 dark:bg-gray-800 group-hover:bg-primary/10 group-hover:text-primary"
      }`}>
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </div>

    <div className="flex-1">
      <p className={`text-sm font-medium ${danger ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
        {label}
      </p>
      {description && (
        <p className={`text-xs ${danger ? "text-red-400/70" : "text-gray-400"}`}>
          {description}
        </p>
      )}
    </div>
  </button>
);

export default Navbar;
