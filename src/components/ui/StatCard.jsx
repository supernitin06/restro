import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
    // Determine color theme styles
    const colorStyles = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            text: 'text-blue-600 dark:text-blue-400',
            border: 'border-blue-100 dark:border-blue-800'
        },
        green: {
            bg: 'bg-emerald-50 dark:bg-emerald-900/10',
            text: 'text-emerald-600 dark:text-emerald-400',
            border: 'border-emerald-100 dark:border-emerald-800'
        },
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-900/10',
            text: 'text-orange-600 dark:text-orange-400',
            border: 'border-orange-100 dark:border-orange-800'
        },
        red: {
            bg: 'bg-rose-50 dark:bg-rose-900/10',
            text: 'text-rose-600 dark:text-rose-400',
            border: 'border-rose-100 dark:border-rose-800'
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/10',
            text: 'text-purple-600 dark:text-purple-400',
            border: 'border-purple-100 dark:border-purple-800'
        },
        yellow: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/10',
            text: 'text-yellow-600 dark:text-yellow-400',
            border: 'border-yellow-100 dark:border-yellow-800'
        },
    };

    const style = colorStyles[color] || colorStyles.blue;
    const isPositive = trend === 'increase' || trend === 'up';

    return (
        <div
            onClick={onClick}
            className={`
                relative bg-white dark:bg-gray-800 
                rounded-2xl p-6 
                border border-gray-100 dark:border-gray-700
                shadow-sm hover:shadow-md 
                transition-all duration-300 ease-in-out cursor-pointer
                ${onClick ? 'cursor-pointer hover:border-gray-300 dark:hover:border-gray-600' : ''}
                ${className}
            `}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {value}
                    </h3>
                </div>

                {Icon && (
                    <div className={`p-3 rounded-xl ${style.bg} ${style.text} flex items-center justify-center transition-colors duration-300`}>
                        <Icon className="w-5 h-5" />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                {/* Trend Badge */}
                {trend && trendValue && (
                    <div className={`
                        flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
                        ${isPositive
                            ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                            : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}
                    `}>
                        {isPositive
                            ? <TrendingUp className="w-3 h-3" />
                            : <TrendingDown className="w-3 h-3" />
                        }
                        <span>{trendValue}</span>
                    </div>
                )}

                {/* Optional Progress Bar or subtle label */}
                {progress !== undefined ? (
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${style.bg.replace('bg-', 'bg-')}`}
                            style={{
                                width: `${Math.min(100, Math.max(0, progress))}%`,
                                backgroundColor: 'currentColor', // simplified color mapping
                            }}
                        />
                        {/* Note: The bg color logic above is a bit complex with Tailwind classes.
                             Let's just use the text color class logic or direct color mapping for simplicity.
                          */}
                    </div>
                ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                        vs last period
                    </span>
                )}
            </div>

            {/* Progress bar strictly implemented if requested */}
            {progress !== undefined && (
                <div className="mt-3 w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${style.text.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default StatCard;
