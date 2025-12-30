import React from 'react';
import { Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import GradientButton from '../ui/GradientButton';

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  return (
    <GlassCard hover className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              {user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <Badge type={user.status} size="sm">
                {user.status}
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <Badge type={user.membership.toLowerCase()}>
          {user.membership}
        </Badge>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-gray-300">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.address}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold text-white">{user.totalOrders}</div>
          <div className="text-gray-400 text-xs">Orders</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold text-white">{user.totalSpent}</div>
          <div className="text-gray-400 text-xs">Spent</div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <GradientButton 
          onClick={() => onView(user)}
          variant="primary"
          className="flex-1"
        >
          View
        </GradientButton>
        <GradientButton 
          onClick={() => onEdit(user)}
          variant="secondary"
          className="flex-1"
        >
          Edit
        </GradientButton>
        <GradientButton 
          onClick={() => onDelete(user.id)}
          variant="danger"
        >
          Delete
        </GradientButton>
      </div>
    </GlassCard>
  );
};

export default UserCard;