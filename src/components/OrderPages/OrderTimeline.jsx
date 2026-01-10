
import React from 'react';
import { CheckCircle, Clock, ChefHat, Bike, Package } from 'lucide-react';

const steps = [
    { status: 'PLACED', label: 'Placed', icon: Clock },
    { status: 'ACCEPTED', label: 'Accepted', icon: CheckCircle },
    { status: 'READY', label: 'Ready', icon: ChefHat },
    { status: 'OUT_FOR_DELIVERY', label: 'On Way', icon: Bike },
    { status: 'DELIVERED', label: 'Delivered', icon: Package },
];

const OrderTimeline = ({ currentStatus, timeline = [] }) => {
    // Find current step index
    const currentIndex = steps.findIndex(s => s.status === currentStatus);

    // Helper to get time for a specific status from timeline
    const getTimeForStatus = (status) => {
        const entry = timeline.find(t => t.status === status);
        if (!entry) return null;
        return new Date(entry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="w-full py-4">
            <div className="relative flex justify-between items-center w-full px-2">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -z-10 rounded-full" />

                {/* Active Progress Bar */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-green-500 rounded-full transition-all duration-500 -z-0"
                    style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const time = getTimeForStatus(step.status);
                    const Icon = step.icon;

                    return (
                        <div key={step.status} className="flex flex-col items-center gap-2 relative group">
                            {/* Step Circle */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 
                  ${isCompleted
                                        ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20'
                                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'
                                    }
                  ${isCurrent ? 'scale-110 ring-4 ring-green-500/20' : ''}
                `}
                            >
                                <Icon size={14} />
                            </div>

                            {/* Label & Time */}
                            <div className="absolute top-10 flex flex-col items-center">
                                <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                  ${isCompleted ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}
                `}>
                                    {step.label}
                                </span>
                                {time && (
                                    <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                                        {time}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTimeline;
