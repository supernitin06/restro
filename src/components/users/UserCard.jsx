import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
// import Badge from '../ui/Badge';
import Button from '../ui/Button';

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  return (
    <GlassCard
      hover
      className="p-4 rounded-xl transition-all duration-200 
                  dark:from-gray-800 dark:to-gray-900 
                 border border-gray-200 dark:border-gray-700 
                 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Header with Avatar and Status */}
      <div className=" flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar with Status Ring */}
          <div className="relative bg-gray-200 rounded-4xl">
            <div className="absolute -inset-0.5 rounded-full  opacity-10"></div>
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold 
                       "
            >
              {user.name.charAt(0)}
            </div>
            {/* <div className="absolute -bottom-1 -right-1">
              <Badge 
                type={user.status} 
                size="sm" 
                className="text-[8px] px-1 py-0.5 border border-white dark:border-gray-800"
              >
                {user.status}
              </Badge>
            </div> */}
          </div>

          {/* Name & Email */}
          <div className="">
            <h3 className="">
              {user.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" />
              <span className="truncate">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Membership Badge */}
        {/* <Badge 
          type={user.membership.toLowerCase()} 
          className="text-xs px-2 py-1 border border-white dark:border-gray-800"
        >
          {user.membership}
        </Badge> */}
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-xs">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
            <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium truncate">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-xs">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
            <MapPin className="w-3 h-3 text-green-600 dark:text-green-400" />
          </div>
          <span className="font-medium truncate">{user.address}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg
                bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800
                border border-blue-100 dark:border-blue-800/30
                shadow-sm">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {user.totalOrders}
          </div>
          <div className="text-[10px] font-semibold text-blue-500 dark:text-blue-300 uppercase tracking-wider mt-0.5">
            Orders
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg
                bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800
                border border-purple-100 dark:border-purple-800/30
                shadow-sm">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            ₹{user.totalSpent}
          </div>
          <div className="text-[10px] font-semibold text-purple-500 dark:text-purple-300 uppercase tracking-wider mt-0.5">
            Spent
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => onView(user)}
          variant="primary"
          size="sm"
          fullWidth
          className="text-primary"
        >
          View
        </Button>
        <Button
          onClick={() => onEdit(user)}
          variant="secondary"
          size="sm"
          fullWidth
          className="btn rounded-lg text-xs py-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(user.id)}
          variant="danger"
          size="sm"
          className="rounded-lg text-xs py-2 px-3"
        >
          Delete
        </Button>
      </div>
    </GlassCard>
  );
};

export default UserCard;