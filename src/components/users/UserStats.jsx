import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Users, CheckCircle, Star, CreditCard, TrendingUp } from 'lucide-react';

const UserStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Customers',
      value: stats.total,
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: stats.active,
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-600',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Premium Members',
      value: stats.premium,
      icon: Star,
      color: 'from-yellow-500 to-amber-600',
      change: '+18%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: CreditCard,
      color: 'from-purple-500 to-pink-600',
      change: '+23%',
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <GlassCard key={index} hover className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium mb-2">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
              style={{ width: `${Math.min(100, (stat.value / 100) * 100)}%` }}
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default UserStats;