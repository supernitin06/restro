import React from "react";
import StatCard from "../ui/StatCard";
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
      color: "red",
      trend: "up",
      trendValue: "+2", // Placeholder logic
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle,
      color: "green",
      trend: "up",
      trendValue: "100%",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "yellow",
      trend: pending > 0 ? "up" : null,
      trendValue: "Needs Action"
    },
    {
      title: "Suspended",
      value: suspended,
      icon: Slash,
      color: "red",
      trend: suspended > 0 ? "down" : null,
      trendValue: "Alert"
    }
  ];

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
          trendValue={stat.trendValue}
        />
      ))}
    </div>
  );
};

export default RestaurantStats;
