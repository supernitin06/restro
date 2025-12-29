import React, { useState } from 'react';
import { FaStore, FaSearch, FaGlobe, FaCog } from 'react-icons/fa';

const RestaurantOverride = () => {
    // Mock Data
    const [restaurants, setRestaurants] = useState([
        { id: 1, name: 'Spicy Treats', mode: 'global' },
        { id: 2, name: 'Burger King - CP', mode: 'custom' },
        { id: 3, name: 'Pizza Hut', mode: 'global' },
        { id: 4, name: 'Dominos', mode: 'global' },
        { id: 5, name: 'KFC', mode: 'custom' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMode = (id) => {
        setRestaurants(restaurants.map(r =>
            r.id === id ? { ...r, mode: r.mode === 'global' ? 'custom' : 'global' } : r
        ));
    };

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white h-[300px] max-h-[450px] rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        <FaStore />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Restaurant Overrides</h3>
                        <p className="text-xs text-gray-500">Set specific rules per outlet</p>
                    </div>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Restaurants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-gray-50"
                    />
                </div>

                {/* List */}
                <div className="overflow-y-auto max-h-[300px] border border-gray-100 rounded-lg divide-y divide-gray-100">
                    {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="p-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">{restaurant.name}</span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    {restaurant.mode === 'global' ? (
                                        <><FaGlobe size={10} /> Using Global Rules</>
                                    ) : (
                                        <><FaCog size={10} /> Custom Configuration</>
                                    )}
                                </span>
                            </div>

                            {/* Toggle */}
                            <button
                                onClick={() => toggleMode(restaurant.id)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${restaurant.mode === 'global'
                                        ? 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                                        : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
                                    }`}
                            >
                                {restaurant.mode === 'global' ? 'Switch to Custom' : 'Manage Custom Rules'}
                            </button>
                        </div>
                    ))}
                    {filteredRestaurants.length === 0 && (
                        <div className="p-4 text-center text-gray-400 text-sm">No restaurants found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantOverride;
