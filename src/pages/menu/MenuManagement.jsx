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
    <div className="page">
      {/* ✅ Header */}
      <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            Menu Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Manage Menu, SubCategory, and Product across your platform.
          </p>
        </div>
      </div>

        {/* ✅ Glow Effects */}
        {/* <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div> */}

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