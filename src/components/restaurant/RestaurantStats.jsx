import React from "react";
import { Users, CheckCircle, Clock, Slash } from "lucide-react";

const RestaurantStats = ({ restaurants }) => {
  const total = restaurants.length;
  const approved = restaurants.filter(r => r.status === "Approved").length;
  const pending = restaurants.filter(r => r.status === "Pending").length;
  const suspended = restaurants.filter(r => r.status === "Suspended").length;

  const stats = [
    {
      title: "Total Restaurants",
      value: total,
      icon: Users,
      color: "text-red-600",
      border: "border-gray-200",
      bgGradient: "bg-gradient-to-br from-red-400 to-red-500"
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle,
      color: "text-green-600",
      border: "border-gray-200",
      bgGradient: "bg-gradient-to-br from-green-400 to-green-500"
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "text-yellow-600",
      border: "border-gray-200",
      bgGradient: "bg-gradient-to-br from-yellow-400 to-yellow-500"
    },
    {
      title: "Suspended",
      value: suspended,
      icon: Slash,
      color: "text-red-600",
      border: "border-gray-200",
      bgGradient: "bg-gradient-to-br from-red-400 to-red-500"
    }
  ];

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-white p-6 rounded-xl shadow-sm ${stat.border} flex items-center justify-between transition-transform duration-300 hover:scale-105`}
          >
            <div className={`p-3 rounded-xl ${stat.bgGradient} text-white flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantStats;
