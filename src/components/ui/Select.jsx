import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
    options = [],
    value,
    onChange,
    className = '',
    selectClassName = '',
    placeholder = 'Select option',
    icon: Icon,
    disabled = false,
    ...props
}) => {
    return (
        <div className={`relative ${className}`}>
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">
                    <Icon className="w-4 h-4" />
                </div>
            )}

            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`
          w-full appearance-none
          px-4 py-3 rounded-xl
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          text-sm font-medium
          text-gray-700 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]
          transition-all duration-200
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${Icon ? 'pl-10' : ''}
          pr-10
          ${selectClassName}
        `}
                {...props}
            >
                {/* Placeholder if value is empty and placeholder exists. 
            Note: Standard select doesn't support "placeholder" attribute like input, 
            so we often use a disabled first option. 
        */}
                {placeholder && <option value="" disabled>{placeholder}</option>}

                {options.map((option, index) => {
                    // Handle both object {value, label} and simple string/number array
                    const optionValue = typeof option === 'object' ? option.value : option;
                    const optionLabel = typeof option === 'object' ? option.label : option;

                    return (
                        <option key={index} value={optionValue}>
                            {optionLabel}
                        </option>
                    );
                })}
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                <ChevronDown className="w-4 h-4" />
            </div>
        </div>
    );
};

export default Select;
