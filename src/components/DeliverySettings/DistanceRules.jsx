import React, { useState } from 'react';
import { FaPlus, FaTrash, FaMapMarkedAlt, FaRoad } from 'react-icons/fa';

const DistanceRules = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [maxDistance, setMaxDistance] = useState(20);
    const [slabs, setSlabs] = useState([
        { id: 1, min: 0, max: 5, fee: 0 },
        { id: 2, min: 5, max: 10, fee: 20 },
        { id: 3, min: 10, max: 15, fee: 40 },
        { id: 4, min: 15, max: 20, fee: 60 },
    ]);

    const addSlab = () => {
        const lastSlab = slabs[slabs.length - 1];
        const newMin = lastSlab ? lastSlab.max : 0;
        const newMax = newMin + 5;
        setSlabs([...slabs, { id: Date.now(), min: newMin, max: newMax, fee: 30 }]);
    };

    const removeSlab = (id) => {
        setSlabs(slabs.filter(s => s.id !== id));
    };

    const updateSlab = (id, field, value) => {
        setSlabs(slabs.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    return (
        <div className={`transition-all duration-300 ${!isEnabled ? 'opacity-60 grayscale' : ''}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-teal-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                            <FaMapMarkedAlt />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Distance Based Rules</h3>
                            <p className="text-xs text-gray-500">Calculate fee based on KM</p>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-center gap-2">
                            <span className="label-text text-xs font-medium uppercase tracking-wider text-gray-500">{isEnabled ? 'Active' : 'Inactive'}</span>
                            <input type="checkbox" className="toggle toggle-accent toggle-sm" checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} />
                        </label>
                    </div>
                </div>

                {isEnabled && (
                    <div className="p-6 space-y-6">

                        {/* Max Distance Config */}
                        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm text-teal-500">
                                    <FaRoad />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Max Serviceable Distance</h4>
                                    <p className="text-xs text-gray-500">Orders beyond this won't be accepted</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-teal-200">
                                <input
                                    type="number"
                                    value={maxDistance}
                                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                                    className="w-12 text-center outline-none font-bold text-gray-700"
                                />
                                <span className="text-sm text-gray-400 font-medium">km</span>
                            </div>
                        </div>

                        {/* Slabs */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Distance Range (KM)</th>
                                        <th className="px-4 py-3">Delivery Fee (₹)</th>
                                        <th className="px-4 py-3 rounded-r-lg w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {slabs.map((slab) => (
                                        <tr key={slab.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={slab.min}
                                                        onChange={(e) => updateSlab(slab.id, 'min', parseInt(e.target.value))}
                                                        className="w-16 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                    />
                                                    <span className="text-gray-400 font-medium">-</span>
                                                    <input
                                                        type="number"
                                                        value={slab.max}
                                                        onChange={(e) => updateSlab(slab.id, 'max', parseInt(e.target.value))}
                                                        className="w-16 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 outline-none text-center"
                                                    />
                                                    <span className="text-gray-400 font-medium text-xs">km</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="relative">
                                                    <span className="absolute left-3 top-2 text-gray-400">₹</span>
                                                    <input
                                                        type="number"
                                                        value={slab.fee}
                                                        onChange={(e) => updateSlab(slab.id, 'fee', parseInt(e.target.value))}
                                                        className={`w-24 pl-6 p-2 border rounded-md focus:ring-2 outline-none text-right font-semibold ${slab.fee === 0 ? 'text-green-600 border-green-200 bg-green-50' : 'text-gray-700 border-gray-200'}`}
                                                    />
                                                    {slab.fee === 0 && <span className="ml-2 text-xs font-bold text-green-600 uppercase">Free</span>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => removeSlab(slab.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button
                            onClick={addSlab}
                            className="flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-teal-500 hover:text-teal-500 transition-all font-medium text-sm gap-2"
                        >
                            <FaPlus size={12} /> Add Distance Slab
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistanceRules;
