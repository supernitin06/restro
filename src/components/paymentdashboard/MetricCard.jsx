import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import Badge from '../../components/ui/Badge';

const MetricCard = ({ title, value, change, icon: Icon, trend = 'up', loading = false }) => {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        {Icon && (
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-white mb-2">
            {loading ? '...' : value}
          </div>
          <div className="flex items-center gap-2">
            {trend === 'up' ? (
              <Badge type="active" size="sm">
                <ArrowUp className="w-3 h-3" />
                {change}
              </Badge>
            ) : (
              <Badge type="inactive" size="sm">
                <ArrowDown className="w-3 h-3" />
                {change}
              </Badge>
            )}
            <span className="text-gray-400 text-sm">vs last month</span>
          </div>
        </div>
        
        {!loading && (
          <div className="p-2 rounded-lg bg-white/5">
            <TrendingUp className={`w-6 h-6 ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;