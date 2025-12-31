// src/components/sidebar/SidebarDropdown.jsx
import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SidebarDropdown = ({
  label,
  icon: Icon,
  isOpen,
  onToggle,
  subItems = [],
  badge,
  isActive,
  isCollapsed,
  onSubItemClick
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onToggle(false); // 🔥 explicit close
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="mb-1" ref={dropdownRef}>
      {/* Main Trigger */}
      <div
        onClick={() => onToggle(!isOpen)}
        className={`
          flex items-center justify-between px-4 py-3.5 cursor-pointer
          transition-all duration-300 relative rounded-xl
          ${isActive
            ? 'sidebar-item-active shadow-lg scale-[1.02] font-semibold'
            : 'text-sidebar hover:bg-white/10'}
          ${isCollapsed ? 'justify-center' : ''}
        `}
        title={isCollapsed ? label : ''}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
        )}

        <div className="flex items-center gap-3 flex-1">
          <Icon className="w-5 h-5" />

          {!isCollapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-2">
            {badge && (
              <span className="px-2 py-0.5 text-xs rounded-full font-bold bg-primary text-sidebar">
                {badge}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        )}
      </div>

      {/* Dropdown Items */}
      {isOpen && !isCollapsed && (
        <div className="mt-2 space-y-1">
          {subItems.map((item) => {
            const SubIcon = item.icon;
            const active = item.isActive;

            return (
              <div
                key={item.id}
                onClick={() => onSubItemClick(item)}
                className={`
                  flex items-center gap-3 pl-12 pr-4 py-2.5 text-sm
                  rounded-lg cursor-pointer transition-all
                  ${active
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'text-sidebar hover:bg-white/10'}
                `}
              >
                {SubIcon && <SubIcon className="w-4 h-4" />}
                <span className="flex-1">{item.label}</span>

                {!active && (
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
