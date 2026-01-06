// src/pages/menu/MenuManagement.jsx
import React, { useState } from "react";
import MenuList from "../../components/menu/MenuList";
import MenuFilters from "../../components/menu/MenuFilter";
import Button from "../../components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MenuManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewType, setViewType] = useState('list');

  return (
    <div className="page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button onClick={() => navigate("/menu-management/add")}>
          <FiPlus /> Add Menu
        </Button>
      </div>

      <div className="relative z-10">
        {/* Menu Filters */}
        <MenuFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewType={viewType}
          setViewType={setViewType}
        />

        {/* Menu List */}
        <MenuList
          key={viewType}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          viewType={viewType}
        />
      </div>

    </div>
  );
};

export default MenuManagement;