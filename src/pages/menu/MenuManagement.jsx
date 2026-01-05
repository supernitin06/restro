import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/menu/MenuList";
import { useSelector } from "react-redux";

const MenuManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (user?.restaurantId) {
      setRestaurant(user.restaurantId);
    }
  }, [user]);
  console.log("restaurant", restaurant);

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