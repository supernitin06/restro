import React from "react";
import { Check, X, Clock, Bell } from "lucide-react";

const NotificationDropdown = ({ isOpen, notifications, onAction, onClose, onClearAll }) => {
  return (
    <div
      className={`absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 transition-all duration-300 ease-in-out origin-top-right ${
        isOpen ? "opacity-100 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 translate-x-12 scale-95 pointer-events-none"
      }`}
    >
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" /> Notifications
        </h3>
        <div className="flex items-center gap-3">
          <span onClick={onClearAll} className="text-xs font-medium text-primary cursor-pointer hover:text-primary/80 transition-colors">
            Clear All
          </span>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            No new notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div key={item.id} className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-linear-to-r hover:from-gray-50 hover:to-white dark:hover:from-gray-800 dark:hover:to-gray-900/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title}</h4>
                <span className="flex items-center text-[10px] text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 mr-1" /> {item.time}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{item.message}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => onAction(item.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <Check className="w-4 h-4" /> Accept
                </button>
                <button 
                  onClick={() => onAction(item.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-3 text-center bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
        <button className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
          View all history
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;