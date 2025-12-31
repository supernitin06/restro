import React from "react";
import StatCard from "../ui/StatCard";
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  CheckCircle,
  Clock,
  Percent,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const UserStats = ({ paymentStats = [] }) => {
  
  // Icon mapping for JSON data
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dollar-sign': return DollarSign;
      case 'users': return Users;
      case 'credit-card': return CreditCard;
      case 'check-circle': return CheckCircle;
      case 'clock': return Clock;
      case 'percent': return Percent;
      default: return DollarSign;
    }
  };

  // Color mapping based on icon or type
  const getColor = (iconName, changeType) => {
    if (changeType === 'decrease') return 'red';
    
    switch (iconName) {
      case 'dollar-sign': return 'green';
      case 'users': return 'blue';
      case 'credit-card': return 'purple';
      case 'check-circle': return 'emerald';
      case 'clock': return 'orange';
      case 'percent': return 'yellow';
      default: return 'blue';
    }
  };

  // Calculate progress based on change percentage
  const calculateProgress = (change, changeType) => {
    if (!change) return 50;
    const percent = parseInt(change.replace(/[+\-%]/g, ''));
    return Math.min(Math.max(percent, 0), 100);
  };

  // If no data provided, show empty state
  if (!paymentStats || paymentStats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 animate-pulse" />
            <div className="relative p-6">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
              <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {paymentStats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={getIcon(stat.icon)}
          color={getColor(stat.icon, stat.changeType)}
          trend={stat.changeType}
          trendValue={stat.change}
          progress={calculateProgress(stat.change, stat.changeType)}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default UserStats;