import React, { useState } from 'react';
import { FaCity, FaPlus, FaTrash, FaMapPin } from 'react-icons/fa';

const CityBasedCharges = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [cityRules, setCityRules] = useState([
        { id: 1, city: 'Delhi', fee: 30 },
        { id: 2, city: 'Noida', fee: 40 },
        { id: 3, city: 'Mumbai', fee: 50 },
    ]);
    const [newCity, setNewCity] = useState('');
    const [newFee, setNewFee] = useState('');

    const addCity = (e) => {
        e.preventDefault();
        if (!newCity || !newFee) return;
        setCityRules([...cityRules, { id: Date.now(), city: newCity, fee: parseInt(newFee) }]);
        setNewCity('');
        setNewFee('');
    };

    const removeCity = (id) => {
        setCityRules(cityRules.filter(r => r.id !== id));
    };

    return (
        <div className={`transition-all duration-300 ${!isEnabled ? 'opacity-60 grayscale' : ''}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <FaCity />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Flat City Fees</h3>
                            <p className="text-xs text-gray-500">Fixed rate per city</p>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-center gap-2">
                            <span className="label-text text-xs font-medium uppercase tracking-wider text-gray-500">{isEnabled ? 'Active' : 'Inactive'}</span>
                            <input type="checkbox" className="toggle toggle-secondary toggle-sm" checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} />
                        </label>
                    </div>
                </div>

                {isEnabled && (
                    <div className="p-6 flex-1 flex flex-col">

                        {/* Add New City Form */}
                        <form onSubmit={addCity} className="flex gap-2 mb-4">
                            <div className="relative flex-1">
                                <FaMapPin className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter City Name"
                                    value={newCity}
                                    onChange={(e) => setNewCity(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                />
                            </div>
                            <div className="relative w-24">
                                <span className="absolute left-3 top-2 text-gray-400">₹</span>
                                <input
                                    type="number"
                                    placeholder="Fee"
                                    value={newFee}
                                    onChange={(e) => setNewFee(e.target.value)}
                                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                />
                            </div>
                            <button type="submit" disabled={!newCity || !newFee} className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors">
                                <FaPlus />
                            </button>
                        </form>

                        {/* City List */}
                        <div className="overflow-y-auto max-h-[300px] pr-2 space-y-2">
                            {cityRules.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-sm">No specific city rules added.</div>
                            ) : (
                                cityRules.map((rule) => (
                                    <div key={rule.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 group hover:border-purple-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-500 font-bold border border-gray-100 shadow-sm text-xs">
                                                {rule.city.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-700">{rule.city}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-gray-800">₹{rule.fee}</span>
                                            <button
                                                onClick={() => removeCity(rule.id)}
                                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityBasedCharges;
