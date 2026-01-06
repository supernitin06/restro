import React from 'react';
import {
  X, Mail, Phone, MapPin, Calendar, Clock, Award,
  Heart, Trash2, CreditCard, Star, Package, Users,
  Shield, ChevronRight
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const UserModal = ({ user, onClose, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
        <GlassCard className="p-8 rounded-2xl shadow-2xl">
          <div className="text-white text-lg animate-pulse">
            Loading user details...
          </div>
        </GlassCard>
      </div>
    );
  }

  if (!user) return null;

  const safeUser = {
    ...user,
    membership: user.membership || 'Standard',
    joinDate: user.joinDate || 'N/A',
    totalOrders: user.totalOrders || 0,
    totalSpent: user.totalSpent || 0,
    loyaltyPoints: user.loyaltyPoints || 0,
    favoriteItems: user.favoriteItems || [],
    dietaryPreferences: user.dietaryPreferences || [],
    name: user.name || 'Unknown User',
    email: user.email || 'No Email',
    status: user.status || 'active'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">

        {/* Header - Simple and Solid */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            User Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 bg-white dark:bg-gray-900">
          <div className="relative">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {safeUser.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <Badge type={safeUser.status}>
                      {safeUser.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {safeUser.name}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    {safeUser.email}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Badge type={safeUser.membership.toLowerCase()} className="px-3 py-1">
                      <Shield className="w-3 h-3 mr-1.5" />
                      {safeUser.membership}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      Joined {safeUser.joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Orders', value: safeUser.totalOrders, icon: Package },
                { label: 'Total Spent', value: `₹${safeUser.totalSpent}`, icon: CreditCard },
                { label: 'Loyalty Points', value: safeUser.loyaltyPoints, icon: Star },
                { label: 'Success Rate', value: '98%', icon: Award }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm text-cyan-500 dark:text-cyan-400">
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Info Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" /> Contact Info
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <Phone className="text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{safeUser.phone}</span>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <MapPin className="text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{safeUser.address}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" /> Account Info
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <Calendar className="text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{safeUser.joinDate}</span>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <Clock className="text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{safeUser.lastOrder}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="text-gray-400" /> Dietary Preferences
                </h3>

                <div className="flex flex-wrap gap-2">
                  {safeUser.dietaryPreferences.map((pref, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium border border-emerald-100 dark:border-emerald-900/30"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="text-gray-400" /> Favorite Items
                </h3>

                <div className="space-y-3">
                  {safeUser.favoriteItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <span className="text-gray-700 dark:text-gray-200">{item}</span>
                      <Heart className="text-rose-400 w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1 sm:flex-none"
                >
                  Close
                </Button>

                {onEdit && (
                  <GradientButton onClick={() => onEdit(user)} className="flex-1 sm:flex-none">
                    Edit Profile
                  </GradientButton>
                )}

                <GradientButton variant="secondary" className="flex-1 sm:flex-none">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </GradientButton>

                {onDelete && (
                  <GradientButton
                    variant="danger"
                    onClick={() => {
                      if (window.confirm(`Delete ${safeUser.name}?`)) {
                        onDelete(user._id || user.id);
                        onClose();
                      }
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </GradientButton>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
