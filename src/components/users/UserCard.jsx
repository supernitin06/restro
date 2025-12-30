import React from 'react';
import { Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import GradientButton from '../ui/GradientButton';

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  return (
    <GlassCard hover className="card card-elevated p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl"
              style={{ background: 'var(--primary)', color: '#000' }}>
              {user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <Badge type={user.status} size="sm">
                {user.status}
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-muted text-sm">{user.email}</p>
          </div>
        </div>
        <Badge type={user.membership.toLowerCase()}>
          {user.membership}
        </Badge>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-muted">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.address}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl card">
          <div className="text-2xl font-bold">{user.totalOrders}</div>
          <div className="text-muted text-xs">Orders</div>
        </div>
        <div className="text-center p-3 rounded-xl card">
          <div className="text-2xl font-bold">{user.totalSpent}</div>
          <div className="text-muted text-xs">Spent</div>
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