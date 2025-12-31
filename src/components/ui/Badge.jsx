import React from 'react';
import { CheckCircle, XCircle, Star, Award } from 'lucide-react';

const BADGE_CONFIG = {
  active: {
    icon: CheckCircle,
    className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  inactive: {
    icon: XCircle,
    className: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  gold: {
    icon: Award,
    className:
      'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/30',
  },
  silver: {
    icon: Star,
    className:
      'bg-gradient-to-r from-gray-400/20 to-gray-300/20 text-gray-300 border-gray-400/30',
  },
  bronze: {
    icon: Star,
    className:
      'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30',
  },
  default: {
    className: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  },
};

const SIZE_CLASSES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

const Badge = ({ type = 'default', size = 'md', children }) => {
  const { icon: Icon, className } = BADGE_CONFIG[type] || BADGE_CONFIG.default;

  return (
    <span
      className={`
        ${SIZE_CLASSES[size]}
        ${className}
        rounded-full
        border
        backdrop-blur-sm
        flex items-center gap-1.5
        font-medium
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
};

export default Badge;
