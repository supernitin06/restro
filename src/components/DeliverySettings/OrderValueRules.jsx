import React, { useState } from 'react';
import { FaPlus, FaTrash, FaMoneyBillWave } from 'react-icons/fa';

const OrderValueRules = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [slabs, setSlabs] = useState([
        { id: 1, min: 0, max: 299, fee: 40 },
        { id: 2, min: 300, max: 599, fee: 20 },
        { id: 3, min: 600, max: Infinity, fee: 0 },
    ]);

    const addSlab = () => {
        const lastSlab = slabs[slabs.length - 1];
        const newMin = lastSlab ? (lastSlab.max === Infinity ? lastSlab.min + 100 : lastSlab.max + 1) : 0;
        setSlabs([...slabs, { id: Date.now(), min: newMin, max: Infinity, fee: 20 }]);
    };

    const removeSlab = (id) => {
        setSlabs(slabs.filter(s => s.id !== id));
    };

    const updateSlab = (id, field, value) => {
        setSlabs(slabs.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    return (
        <div className={`transition-all duration-300 ${!isEnabled ? 'opacity-60 grayscale' : ''}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <FaMoneyBillWave />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Order Value Rules</h3>
                            <p className="text-xs text-gray-500">Charge based on total cart amount</p>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-center gap-2">
                            <span className="label-text text-xs font-medium uppercase tracking-wider text-gray-500">{isEnabled ? 'Active' : 'Inactive'}</span>
                            <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} />
                        </label>
                    </div>
                </div>

                {isEnabled && (
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Cart Value Range (₹)</th>
                                        <th className="px-4 py-3">Delivery Fee (₹)</th>
                                        <th className="px-4 py-3 rounded-r-lg w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {slabs.map((slab, index) => (
                                        <tr key={slab.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={slab.min}
                                                        onChange={(e) => updateSlab(slab.id, 'min', parseInt(e.target.value))}
                                                        className="w-20 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-center"
                                                    />
                                                    <span className="text-gray-400 font-medium">to</span>
                                                    {slab.max === Infinity ? (
                                                        <span className="w-20 text-center font-medium text-gray-600">Above</span>
                                                    ) : (
                                                        <input
                                                            type="number"
                                                            value={slab.max}
                                                            onChange={(e) => updateSlab(slab.id, 'max', parseInt(e.target.value))}
                                                            className="w-20 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-center"
                                                        />
                                                    )}
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
                                                    title="Remove Slab"
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
                            className="mt-4 flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all font-medium text-sm gap-2"
                        >
                            <FaPlus size={12} /> Add New Pricing Slab
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderValueRules;
