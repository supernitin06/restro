import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  className = "",
  startIcon = null,
  endIcon = null,
  helperText = "",
  disabled = false,
  min,
  max,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-bold mb-2 ml-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative group">
        {/* Start Icon */}
        {startIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2
                          text-gray-400 group-focus-within:text-indigo-500
                          transition-colors pointer-events-none">
            {startIcon}
          </div>
        )}

        {/* Input */}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          min={min}
          max={max}
          className={`
            w-full text-sm font-medium shadow-sm input
            transition-all duration-200
            ${startIcon ? "pl-14" : "pl-4"}
            ${endIcon ? "pr-12" : "pr-4"}
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          `}
          {...props}
        />

        {/* End Icon */}
        {endIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2
                          text-gray-400 group-focus-within:text-indigo-500
                          transition-colors pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-xs text-muted mt-1.5 ml-1">
          {helperText}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 ml-1
                        text-red-500 text-xs font-medium animate-fadeIn">
          <FaExclamationCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;
