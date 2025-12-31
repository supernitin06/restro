import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import GlassCard from './GlassCard';

const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = 'blue',
    progress,
    className = '',
    onClick
}) => {
    const isPositive = trend === 'up';

    // Color configurations
    const colorStyles = {
        blue: {
            gradient: 'from-blue-500 to-cyan-500',
            light: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-100 dark:bg-blue-900/40',
        },
        green: {
            gradient: 'from-emerald-500 to-green-500',
            light: 'bg-emerald-50 dark:bg-emerald-900/20',
            text: 'text-emerald-600 dark:text-emerald-400',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
        },
        orange: {
            gradient: 'from-orange-500 to-amber-500',
            light: 'bg-orange-50 dark:bg-orange-900/20',
            text: 'text-orange-600 dark:text-orange-400',
            iconBg: 'bg-orange-100 dark:bg-orange-900/40',
        },
        red: {
            gradient: 'from-rose-500 to-red-500',
            light: 'bg-rose-50 dark:bg-rose-900/20',
            text: 'text-rose-600 dark:text-rose-400',
            iconBg: 'bg-rose-100 dark:bg-rose-900/40',
        },
        purple: {
            gradient: 'from-purple-500 to-violet-500',
            light: 'bg-purple-50 dark:bg-purple-900/20',
            text: 'text-purple-600 dark:text-purple-400',
            iconBg: 'bg-purple-100 dark:bg-purple-900/40',
        },
        yellow: {
            gradient: 'from-yellow-400 to-orange-400',
            light: 'bg-yellow-50 dark:bg-yellow-900/20',
            text: 'text-yellow-600 dark:text-yellow-400',
            iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
        },
    };

    const currentStyle = colorStyles[color] || colorStyles.blue;

    return (
        <div
            onClick={onClick}
            className={`relative group cursor-default transition-all duration-300 hover:-translate-y-1 ${className}`}
        >
            <div className="absolute inset-0 bg-primary rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50" />


            {/* Glow effect on hover */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${currentStyle.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`} />

            <div className="relative p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>

                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 font-sans">
                            {title}
                        </p>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                            {value}
                        </h3>
                    </div>

                    <div className={`p-3 rounded-xl bg-gradient-to-br ${currentStyle.gradient} shadow-lg shadow-gray-200/50 dark:shadow-none text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        {Icon && <Icon className="w-6 h-6" />}
                    </div>
                </div>

                {(trend || progress !== undefined) && (
                    <div className="flex items-center gap-3 mt-2">
                        {trend && trendValue && (
                            <div
                                className={`
                  flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full
                  ${isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}
                `}
                            >
                                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {trendValue}
                            </div>
                        )}

                        {progress !== undefined && (
                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${currentStyle.gradient}`}
                                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                                />
                            </div>
                        )}

                        {/* If simple text/caption needed instead of trendBadge */}
                        {!trend && !progress && (
                            <span className="text-primary opacity-50 text-xs">Updated just now</span>

                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
