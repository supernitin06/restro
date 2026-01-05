import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  Gift,
  Search,
  Menu
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import InputField from "../ui/InputField";
import NotificationDropdown from "./NavbarCom/NotificationDropdown";
import MessagesDropdown from "./NavbarCom/MessagesDropdown";
import GiftsDropdown from "./NavbarCom/GiftsDropdown";
import CreateOfferModal from "./NavbarCom/CreateOfferModal";

const Navbar = ({ toggleSidebar }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);
  const giftsRef = useRef(null);

  // Mock data lifted to parent to manage count
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order #1234",
      message: "Table 5 has requested the bill.",
      time: "2 min ago",
      type: "alert",
    },
    {
      id: 2,
      title: "Kitchen Update",
      message: "Chef requires approval for inventory.",
      time: "15 min ago",
      type: "warning",
    },
    {
      id: 3,
      title: "New Reservation",
      message: "Booking for 4 people at 7:00 PM.",
      time: "1 hour ago",
      type: "info",
    },
  ]);

  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      content: "Hey, can you approve the new menu items?",
      time: "5 min ago", 
      timestamp: new Date().toISOString(),
      unread: true,
    },
    {
      id: 2,
      sender: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      content: "Table 12 is asking for a special request.",
      time: "Yesterday",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      unread: true,
    },
    {
      id: 3,
      sender: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      content: "Shift schedule for next week is updated.",
      time: "2 days ago",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      unread: false,
    },
  ]);

  // Mock data for gifts/offers
  const [gifts, setGifts] = useState([
    {
      id: 1,
      title: "Summer Splash Sale",
      description: "Get flat 25% off on all cold beverages and desserts.",
      code: "SUMMER25",
      expiry: "Ends in 2 days",
      type: "offer",
    },
    {
      id: 2,
      title: "Loyalty Reward",
      description: "Special reward for Gold members: Free appetizer.",
      code: "GOLDUSER",
      expiry: "Active",
      type: "gift",
    },
  ]);

  // Simulate typing effect for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setIsMessagesOpen(false);
      }
      if (giftsRef.current && !giftsRef.current.contains(event.target)) {
        setIsGiftsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationAction = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAllMessagesRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, unread: false })));
  };

  const handleCreateOffer = () => {
    setIsOfferModalOpen(true);
  };

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sticky top-0 z-40 w-full h-22 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="px-6 py-4 flex items-center justify-between gap-4">

        {/* Left Section - Search & Toggle */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Toggle (Visible on smaller screens if needed) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* Search Bar */}
          <div className="hidden md:flex items-center w-full max-w-md relative group">
            <Search className="absolute left-3 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <InputField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full bg-gray-100 dark:bg-gray-800/50 border-none outline-none py-2.5 pl-10 pr-4 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <IconButton 
                count={notifications.length} 
                icon={<Bell className="w-5 h-5" />} 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsMessagesOpen(false);
                  setIsGiftsOpen(false);
                }}
              />
              <NotificationDropdown 
                isOpen={isNotificationsOpen} 
                notifications={notifications}
                onAction={handleNotificationAction}
                onClose={() => setIsNotificationsOpen(false)}
                onClearAll={handleClearAll}
              />
            </div>

            {/* Messages */}
            <div className="relative" ref={messagesRef}>
              <IconButton 
                count={messages.filter(m => m.unread).length} 
                icon={<MessageSquare className="w-5 h-5" />} 
                onClick={() => {
                  setIsMessagesOpen(!isMessagesOpen);
                  setIsNotificationsOpen(false);
                  setIsGiftsOpen(false);
                }}
              />
              <MessagesDropdown 
                isOpen={isMessagesOpen}
                messages={filteredMessages}
                onClose={() => setIsMessagesOpen(false)}
                isTyping={isTyping}
                onMarkAllRead={handleMarkAllMessagesRead}
              />
            </div>

            {/* Gifts / Offers */}
            <div className="relative" ref={giftsRef}>
              <IconButton 
                count={gifts.length} 
                icon={<Gift className="w-5 h-5" />} 
                onClick={() => {
                  setIsGiftsOpen(!isGiftsOpen);
                  setIsNotificationsOpen(false);
                  setIsMessagesOpen(false);
                }}
              />
              <GiftsDropdown 
                isOpen={isGiftsOpen}
                gifts={gifts}
                onClose={() => setIsGiftsOpen(false)}
                onCreateNew={handleCreateOffer}
              />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-primary transition-colors">Super Admin</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white leading-none mt-0.5">James Sullivan</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full p-0.5 bg-linear-to-tr from-primary to-purple-600">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="User"
                  className="w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />

            </div>
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

/* Reusable Icon Button */
const IconButton = ({ icon, count, onClick }) => (
  <button
    onClick={onClick}
    className="relative p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:text-primary dark:hover:text-primary group"
  >
    {icon}
    {count > 0 && (
      <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-gray-900"></span>
      </span>
    )}
  </button>
);

export default Navbar;
