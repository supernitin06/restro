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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const safeUser = {
    _id: user._id,
    name: user.name || 'Unknown User',
    email: user.email || 'No Email',
    phone: user.mobile || 'No Phone',
    role: user.role || 'USER',
    profile: (user.profile && user.profile !== 'not available') ? user.profile : null,

    // Status Logic
    status: user.isBlocked ? 'Blocked' : (user.isActive ? 'Active' : 'Inactive'),
    isBlocked: user.isBlocked,
    isActive: user.isActive,

    // Verification
    isEmailVerified: user.isEmailVerified,
    isMobileVerified: user.isMobileVerified,

    // Dates
    joinDate: formatDate(user.createdAt),
    lastLogin: formatDate(user.lastLogin),
    dob: user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A',
    gender: user.gender || 'N/A',

    // Addresses
    addresses: Array.isArray(user.addresses) ? user.addresses : [],

    // Stats (from reviewStats)
    reviewStats: {
      totalReviews: user.reviewStats?.totalReviews || 0,
      averageRatingGiven: user.reviewStats?.averageRatingGiven || 0,
      helpfulVotes: user.reviewStats?.helpfulVotes || 0,
      badges: user.reviewStats?.badges || []
    },

    // Preferences
    preferences: {
      favCuisines: user.preferences?.favCuisines || [],
      vegOnly: !!user.preferences?.vegOnly
    },
    reviewPreferences: user.reviewPreferences || {},

    // Provider
    provider: user.provider || 'local',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col">

        {/* Header - Simple and Solid */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex-none">
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

        <div className="overflow-y-auto p-6 bg-white dark:bg-gray-900 flex-1">
          <div className="relative">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                <div className="relative">
                  {safeUser.profile ? (
                    <img
                      src={safeUser.profile}
                      alt={safeUser.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white dark:border-gray-800"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {safeUser.name.charAt(0)}
                    </div>
                  )}

                  <div className="absolute -bottom-2 -right-2">
                    <Badge type={safeUser.status.toLowerCase()}>
                      {safeUser.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {safeUser.name}
                    </h2>
                    <div className="flex gap-2">
                      {safeUser.role === 'ADMIN' && <Badge type="purple">Admin</Badge>}
                      <Badge variant="outline">{safeUser.provider}</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {safeUser.email}
                      {safeUser.isEmailVerified && <Shield className="w-3 h-3 text-green-500" title="Verified Email" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {safeUser.phone}
                      {safeUser.isMobileVerified && <Shield className="w-3 h-3 text-green-500" title="Verified Mobile" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined {safeUser.joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Reviews', value: safeUser.reviewStats.totalReviews, icon: Star },
                { label: 'Avg Rating Given', value: safeUser.reviewStats.averageRatingGiven.toFixed(1), icon: Heart },
                { label: 'Helpful Votes', value: safeUser.reviewStats.helpfulVotes, icon: Award },
                { label: 'Gender', value: safeUser.gender, icon: Users, capitalize: true }
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
                  <div className={`text-xl font-bold text-gray-900 dark:text-white mt-1 ${stat.capitalize ? 'capitalize' : ''}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Info Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Addresses */}
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" /> Addresses ({safeUser.addresses.length})
                </h3>

                <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar">
                  {safeUser.addresses.length > 0 ? safeUser.addresses.map((addr, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                      <div className="flex-shrink-0 mt-1">
                        {addr.type === 'home' ? <Heart className="w-4 h-4 text-rose-400" /> : <Package className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold capitalize text-gray-900 dark:text-gray-100">
                          {addr.type}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {addr.street}
                        </div>
                        {addr.coordinates?.lat && (
                          <div className="text-xs text-gray-400 mt-1">
                            Lat: {addr.coordinates.lat}, Lng: {addr.coordinates.lng}
                          </div>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="text-center text-gray-500 py-4">No addresses found</div>
                  )}
                </div>
              </div>

              {/* Account Details */}
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-400" /> Account Security & Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-gray-600 dark:text-gray-400">Last Login</span>
                    <span className="text-gray-900 dark:text-white font-medium text-right text-sm">{safeUser.lastLogin}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-gray-600 dark:text-gray-400">Provider</span>
                    <span className="text-gray-900 dark:text-white font-medium capitalize">{safeUser.provider}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-gray-600 dark:text-gray-400">Date of Birth</span>
                    <span className="text-gray-900 dark:text-white font-medium">{safeUser.dob}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="text-gray-400" /> Preferences
                </h3>

                <div className="flex flex-wrap gap-3">
                  {safeUser.preferences.vegOnly && (
                    <span className="px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium border border-green-100 dark:border-green-900/30">
                      Vegetarian Only
                    </span>
                  )}
                  {!safeUser.preferences.vegOnly && (
                    <span className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium border border-gray-200 dark:border-gray-700">
                      Standard Diet
                    </span>
                  )}
                  {safeUser.reviewPreferences?.autoReminders && (
                    <span className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-900/30">
                      Auto Review Reminders
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="text-gray-400" /> Favorite Cuisines
                </h3>

                <div className="flex flex-wrap gap-2">
                  {safeUser.preferences.favCuisines && safeUser.preferences.favCuisines.length > 0 ? (
                    safeUser.preferences.favCuisines.map((item, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No favorite cuisines listed</span>
                  )}
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
