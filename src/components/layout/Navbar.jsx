import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../api/services/authSlice";
import { socket } from "../../socket";

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
  const { user } = useSelector((state) => state.auth);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);
  const giftsRef = useRef(null);

  const [openProfile, setOpenProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gifts, setGifts] = useState([]);

  /* ---------------- SOCKET LISTENERS ---------------- */
  useEffect(() => {
    if (!user) return;

    socket.connect();
    socket.emit("register-user", { userId: user._id });

    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on("message", (data) => {
      setMessages((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
      socket.off("message");
    };
  }, [user]);

  /* ---------------- CLICK OUTSIDE ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(e.target)) {
        setIsMessagesOpen(false);
      }
      if (giftsRef.current && !giftsRef.current.contains(e.target)) {
        setIsGiftsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const handleLogout = () => {
    socket.disconnect();
    dispatch(logout());
  };

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

          {/* Notifications */}
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

          {/* Messages */}
          <div ref={messagesRef} className="relative">
            <IconButton
              icon={<MessageSquare />}
              count={messages.filter((m) => m.unread).length}
              onClick={() => setIsMessagesOpen(!isMessagesOpen)}
            />
            <MessagesDropdown
              isOpen={isMessagesOpen}
              messages={messages}
            />
          </div>

          {/* Gifts */}
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

          {/* PROFILE */}
          <div ref={profileRef} className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={user.avatar || fallbackImg}
                className="w-10 h-10 rounded-full border"
                alt={user.name}
              />
            </div>

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

/* ---------------- SMALL COMPONENTS ---------------- */

const IconButton = ({ icon, count, onClick }) => (
  <button onClick={onClick} className="relative p-2 rounded-xl">
    {icon}
    {count > 0 && (
      <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full" />
    )}
  </button>
);

const AdminProfilePopup = ({ user, handleLogout, handleSettings }) => (
  <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-4">
    <div className="flex items-center gap-3 pb-3 border-b">
      <img src={user.avatar || fallbackImg} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> {user.role}
        </p>
      </div>
    </div>

    <div className="py-3 space-y-2 text-sm">
      <InfoRow icon={<Mail />} text={user.email} />
    </div>

    <div className="pt-3 border-t space-y-1">
      <ActionItem icon={<Settings />} label="Settings" onClick={handleSettings} />
      <ActionItem icon={<LogOut />} label="Logout" danger onClick={handleLogout} />
    </div>
  </div>
);

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    <span>{text}</span>
  </div>
);

const ActionItem = ({ icon, label, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl
      ${danger ? "text-red-500" : ""}`}
  >
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    {label}
  </button>
);

export default Navbar;
