import React, { useState } from 'react';
import { FaTruck, FaSortAmountDown } from 'react-icons/fa';
import OrderValueRules from '../components/DeliverySettings/OrderValueRules';
import DistanceRules from '../components/DeliverySettings/DistanceRules';
import CityBasedCharges from '../components/DeliverySettings/CityBasedCharges';
import RestaurantOverride from '../components/DeliverySettings/RestaurantOverride';
import RulePriority from '../components/DeliverySettings/RulePriority';

const DeliverySettings = () => {
    const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(true);
    const [activeTab, setActiveTab] = useState('rules'); // rules | priority

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
                    <div>
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">
                            Delivery Charge
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
                            Manage delivery pricing, rules, and priorities across your platform.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-600">
                            <span className={`text-sm font-bold ${isDeliveryEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {isDeliveryEnabled ? 'Delivery Charges Active' : 'Delivery Charges Disabled'}
                            </span>
                            <button
                                onClick={() => setIsDeliveryEnabled(!isDeliveryEnabled)}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${isDeliveryEnabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${isDeliveryEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 w-fit">
                    <button
                        onClick={() => setActiveTab('rules')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'rules'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <FaTruck className={activeTab === 'rules' ? 'animate-pulse' : ''} />
                        Pricing Rules
                    </button>
                    <button
                        onClick={() => setActiveTab('priority')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'priority'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <FaSortAmountDown />
                        Priority & Logic
                    </button>
                </div>

                <div className="transition-all duration-500 ease-in-out">
                    {activeTab === 'rules' ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-8">
                                <OrderValueRules />
                                <DistanceRules />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                <CityBasedCharges />
                                <RestaurantOverride />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Execution Priority</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
                                Determine which rule takes precedence when multiple rules apply to a single order. Drag and drop to reorder.
                            </p>
                            <RulePriority />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliverySettings;
