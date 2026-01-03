import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/menu/MenuList";
import Button from "../../components/ui/Button";
import { FiPlus } from "react-icons/fi";

/**
 * Unified Add Menu Page
 * Combines Add Category, SubCategory, and Product in a single form
 */
const MenuManagement = () => {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]); // Local menu list state

  // Navigate to Add Menu Page
  const handleAddMenu = () => {
    navigate("/menu-management/add");
  };

  // Handle Edit Menu (placeholder for now)
  const handleEdit = (item) => {
    // TODO: Implement edit functionality
    console.log("Edit item:", item);
  };

  return (
    <div className="p-6">
      {/* ✅ Header */}
      <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="text-heading">Menu Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
            Manage your restaurant menu items.
          </p>
        </div>
        <Button onClick={handleAddMenu} variant="primary" className="flex items-center gap-2 mt-4 md:mt-0">
          <FiPlus className="w-4 h-4" />
          Add Menu
        </Button>
      </div>

      {/* ✅ Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Menu List */}
        <MenuList
          menus={menuList}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default MenuManagement;
