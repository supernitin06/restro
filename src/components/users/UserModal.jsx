import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, Clock, Award, Heart, Trash2, CreditCard, Star, Package, Users, Shield, ChevronRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const UserModal = ({ user, onClose, onEdit, onDelete }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Custom scrollbar container */}
        <div className="overflow-y-auto max-h-[90vh] scrollbar-hide">
          <GlassCard className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">

            {/* Header with gradient background */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-t-2xl" />

            <div className="relative">
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-sm shadow-cyan-500/30">
                      {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-3 -right-3 transform rotate-12">
                      <Badge type={user.status} className="shadow-sm">
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                        {user.name}
                      </h2>
                      <ChevronRight className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-300">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        type={user.membership.toLowerCase()}
                        className="shadow-sm px-4 py-1.5 backdrop-blur-md"
                      >
                        <Shield className="w-3 h-3 mr-1.5" />
                        {user.membership} Member
                      </Badge>
                      <span className="text-gray-400 text-sm">• Joined {user.joinDate}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all" />
                </Button>
              </div>

              {/* Stats Cards - Animated hover effects */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  {
                    label: 'Total Orders',
                    value: user.totalOrders,
                    icon: Package,
                    color: 'from-cyan-500/20 to-blue-500/20',
                    iconColor: 'text-cyan-400'
                  },
                  {
                    label: 'Total Spent',
                    value: `₹${user.totalSpent}`,
                    icon: CreditCard,
                    color: 'from-emerald-500/20 to-green-500/20',
                    iconColor: 'text-emerald-400'
                  },
                  {
                    label: 'Loyalty Points',
                    value: user.loyaltyPoints,
                    icon: Star,
                    color: 'from-amber-500/20 to-orange-500/20',
                    iconColor: 'text-amber-400'
                  },
                  {
                    label: 'Success Rate',
                    value: '98%',
                    icon: Award,
                    color: 'from-purple-500/20 to-pink-500/20',
                    iconColor: 'text-purple-400'
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden"
                  >
                    <GlassCard className="p-6 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative z-10 text-center">
                        <div className="flex justify-center mb-3">
                          <div className={`p-3 rounded-xl bg-white/5 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Contact Information Card */}
                <GlassCard className="p-6 backdrop-blur-md border border-white/10 group hover:border-cyan-500/30 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Phone className="w-5 h-5 text-cyan-400" />
                    </div>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <div className="p-2.5 rounded-lg bg-cyan-500/20">
                        <Phone className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-sm">Phone</div>
                        <div className="text-white font-medium">{user.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <div className="p-2.5 rounded-lg bg-emerald-500/20">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-sm">Address</div>
                        <div className="text-white font-medium">{user.address}</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Account Information Card */}
                <GlassCard className="p-6 backdrop-blur-md border border-white/10 group hover:border-purple-500/30 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    Account Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <div className="p-2.5 rounded-lg bg-purple-500/20">
                        <Calendar className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-sm">Join Date</div>
                        <div className="text-white font-medium">{user.joinDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <div className="p-2.5 rounded-lg bg-orange-500/20">
                        <Clock className="w-5 h-5 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-sm">Last Order</div>
                        <div className="text-white font-medium">{user.lastOrder}</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Preferences & Favorites */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Dietary Preferences */}
                <GlassCard className="p-6 backdrop-blur-md border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/20">
                      <Heart className="w-5 h-5 text-emerald-400" />
                    </div>
                    Dietary Preferences
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {user.dietaryPreferences?.map((pref, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 rounded-full text-sm text-emerald-300 hover:scale-105 hover:border-emerald-500/40 transition-all duration-300"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                {/* Favorite Items */}
                <GlassCard className="p-6 backdrop-blur-md border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-rose-500/20">
                      <Star className="w-5 h-5 text-rose-400" />
                    </div>
                    Favorite Items
                  </h3>
                  <div className="space-y-3">
                    {user.favoriteItems?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 transition-all duration-300 group"
                      >
                        <span className="text-white font-medium group-hover:text-cyan-200 transition-colors">
                          {item}
                        </span>
                        <Heart className="w-5 h-5 text-rose-400 group-hover:scale-125 transition-transform" />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Action Buttons - Floating effect */}
              <div className="sticky bottom-0 pt-8 mt-8 border-t border-white/10 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <GradientButton
                    onClick={() => onEdit(user)}
                    variant="primary"
                    className="flex-1 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Edit Profile</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </GradientButton>

                  <GradientButton
                    onClick={() => {
                      if (window.confirm(`Send message to ${user.name}?`)) {
                        alert(`Message sent to ${user.name}`);
                      }
                    }}
                    variant="secondary"
                    className="flex-1 group"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Send Message
                  </GradientButton>

                  <GradientButton
                    onClick={() => {
                      if (window.confirm(`Delete ${user.name} permanently?`)) {
                        onDelete(user.id);
                        onClose();
                      }
                    }}
                    variant="danger"
                    className="group relative overflow-hidden"
                  >
                    <Trash2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Delete User
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </GradientButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default UserModal;