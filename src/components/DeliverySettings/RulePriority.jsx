import React, { useState } from 'react';
import { FaSortAmountDown, FaArrowUp, FaArrowDown, FaGripLines } from 'react-icons/fa';

const RulePriority = () => {
    const [rules, setRules] = useState([
        { id: 'restaurant', name: 'Restaurant Specific Rules', description: 'Overrides all other logic if set for a restaurant.', active: true },
        { id: 'distance', name: 'Distance Based Pricing', description: 'Calculates fee based on KM distance.', active: true },
        { id: 'orderValue', name: 'Order Value Slabs', description: 'Fee based on cart total (e.g. Free above ₹500).', active: true },
        { id: 'city', name: 'Flat City Fee', description: 'Fixed fee based on user location city.', active: false },
    ]);

    const moveRule = (index, direction) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === rules.length - 1)) return;

        const newRules = [...rules];
        const temp = newRules[index];
        newRules[index] = newRules[index + direction];
        newRules[index + direction] = temp;
        setRules(newRules);
    };

    const toggleRule = (id) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Logic Priority</h2>
                <p className="text-gray-500 text-sm mt-1">
                    Define the order in which delivery rules are checked. The <strong>first active rule</strong> that matches the criteria will be applied.
                </p>
            </div>

            <div className="space-y-3">
                {rules.map((rule, index) => (
                    <div key={rule.id} className={`flex items-center gap-4 bg-white p-4 rounded-xl border-2 transition-all ${rule.active ? 'border-indigo-100 shadow-sm' : 'border-gray-100 bg-gray-50 opacity-70'}`}>
                        <div className="text-gray-400 cursor-move">
                            <FaGripLines />
                        </div>

                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm border border-indigo-100">
                            {index + 1}
                        </div>

                        <div className="flex-1">
                            <h3 className={`font-bold ${rule.active ? 'text-gray-800' : 'text-gray-500'}`}>{rule.name}</h3>
                            <p className="text-xs text-gray-500">{rule.description}</p>
                        </div>

                        <div className="flex items-center gap-2 border-l pl-4 border-gray-100">
                            <button
                                onClick={() => moveRule(index, -1)}
                                disabled={index === 0}
                                className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-30 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                                <FaArrowUp />
                            </button>
                            <button
                                onClick={() => moveRule(index, 1)}
                                disabled={index === rules.length - 1}
                                className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-30 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                                <FaArrowDown />
                            </button>
                        </div>

                        <div className="pl-4">
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={rule.active}
                                onChange={() => toggleRule(rule.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                <strong>Preview Logic:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-blue-700">
                    {rules.filter(r => r.active).map((rule, idx) => (
                        <li key={rule.id}>
                            Step {idx + 1}: Check <strong>{rule.name}</strong>. If applicable, use this fee.
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RulePriority;
