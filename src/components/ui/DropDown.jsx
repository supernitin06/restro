
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SidebarDropdown = ({
  label,
  icon: Icon,
  subItems = [],
  badge,
  isCollapsed,
  onSubItemClick,
  activeItemId, 
  
  
  
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubItem, setActiveSubItem] = useState(null);

  // Check if any subitem is active initially
  useEffect(() => {
    // Agar parent ne activeItemId diya hai, to uske hisab se active set karo
    if (activeItemId) {
      const activeItem = subItems.find(item => item.id === activeItemId);
      if (activeItem) {
        setActiveSubItem(activeItem.id);
        setIsOpen(true); // Auto-open if active item exists
      }
    }
  }, [activeItemId, subItems]);

  // Check if any subitem in this dropdown is active
  const hasActiveSubItem = subItems.some(item => item.id === activeSubItem);

  const handleMainClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubItemClick = (item) => {
    // Set this item as active
    setActiveSubItem(item.id);
    
    // Tell parent about the click
    onSubItemClick(item);
    
    // Always keep dropdown open when clicking subitem
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="mb-1">
      {/* Main Trigger */}
      <div
        onClick={handleMainClick}
        className={`
          flex items-center justify-between px-4 py-3.5 cursor-pointer
          transition-all duration-300 relative rounded-xl
          ${hasActiveSubItem
            ? 'sidebar-item-active shadow-lg scale-[1.02] font-semibold'
            : 'text-sidebar hover:bg-white/10'}
          ${isCollapsed ? 'justify-center' : ''}
        `}
        title={isCollapsed ? label : ''}
      >
        {hasActiveSubItem && (
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

      {/* Dropdown Items - Always show if open OR has active item */}
      {(isOpen || hasActiveSubItem) && !isCollapsed && (
        <div className="mt-2 space-y-1">
          {subItems.map((item) => {
            const SubIcon = item.icon;
            const isActive = activeSubItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSubItemClick(item)}
                className={`
                  flex items-center gap-3 pl-12 pr-4 py-2.5 text-sm
                  rounded-lg cursor-pointer transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-green-500 font-semibold shadow-md'
                    : 'text-sidebar hover:bg-white/10 hover:text-white'}
                `}
              >
                {SubIcon && <SubIcon className="w-4 h-4" />}
                <span className="flex-1">{item.label}</span>

                {isActive ? (
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ) : (
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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