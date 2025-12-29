import React, { useState } from 'react';
import { FaTruck, FaMoneyBillWave, FaMapMarkedAlt, FaStore, FaSortAmountDown } from 'react-icons/fa';
import OrderValueRules from '../components/DeliverySettings/OrderValueRules';
import DistanceRules from '../components/DeliverySettings/DistanceRules';
import CityBasedCharges from '../components/DeliverySettings/CityBasedCharges';
import RestaurantOverride from '../components/DeliverySettings/RestaurantOverride';
import RulePriority from '../components/DeliverySettings/RulePriority';

const DeliverySettings = () => {
    const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(true);
    const [activeTab, setActiveTab] = useState('rules'); // rules | priority

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Delivery Configuration
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage how your customers are charged for delivery across all platforms.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
                            <span className={`text-sm font-semibold ${isDeliveryEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                                {isDeliveryEnabled ? 'Delivery Charges Active' : 'Delivery Charges Disabled'}
                            </span>
                            <button
                                onClick={() => setIsDeliveryEnabled(!isDeliveryEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isDeliveryEnabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDeliveryEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation (Optional if we want to separate configuration from priority) */}
                <div className="flex space-x-4 border-b border-gray-200 pb-1">
                    <button
                        onClick={() => setActiveTab('rules')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'rules' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <FaTruck /> Pricing Rules
                    </button>
                    <button
                        onClick={() => setActiveTab('priority')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'priority' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <FaSortAmountDown /> Priority & Logic
                    </button>
                </div>

                {activeTab === 'rules' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <RulePriority />
                    </div>
                )}

            </div>
        </div>
    );
};

export default DeliverySettings;
