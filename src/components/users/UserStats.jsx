import React from "react";
import GlassCard from "../ui/GlassCard";
import { Users, CheckCircle, Star, CreditCard, TrendingUp } from "lucide-react";

const UserStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Customers",
      value: stats.total,
      icon: Users,
      color: "from-cyan-500 to-blue-600",
      change: "+12%",
    },
    {
      title: "Active Users",
      value: stats.active,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-600",
      change: "+5%",
    },
    {
      title: "Premium Members",
      value: stats.premium,
      icon: Star,
      color: "from-yellow-500 to-amber-600",
      change: "+18%",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: CreditCard,
      color: "from-purple-500 to-pink-600",
      change: "+23%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <GlassCard key={index} hover className="p-6">
          <div className="flex items-start justify-between">
            <div>
              {/* Title */}
              <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                {stat.title}
              </p>

              {/* Value + Change */}
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
            </div>

            {/* Icon */}
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
              style={{ width: `${Math.min(100, stat.value)}%` }}
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default UserStats;
