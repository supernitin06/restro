// src/pages/menu/MenuManagement.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuList from "../../components/menu/MenuList";
import MenuFilters from "../../components/menu/MenuFilter";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MenuStats from "../../components/menu/MenuStats";
import { useGetMenusQuery } from "../../api/services/menuApi";

const transformItemsData = (items) => {
  if (!Array.isArray(items)) return { menus: [] };

  const categoriesMap = {};

  items.forEach(item => {
    const cat = item.category || item.categoryId || { _id: 'uncategorized', name: 'Uncategorized' };
    const catId = cat._id || 'uncategorized';

    if (!categoriesMap[catId]) {
      categoriesMap[catId] = {
        categoryId: catId,
        name: cat.name || 'Uncategorized',
        status: 'active',
        subCategories: [{
          subCategoryId: `${catId}_sub`,
          name: cat.name || 'Uncategorized',
          items: []
        }]
      };
    }

    categoriesMap[catId].subCategories[0].items.push({
      itemId: item._id,
      name: item.name,
      image: item.image,
      price: item.basePrice,
      discountPrice: null,
      available: item.isAvailable,
      veg: item.isVeg,
      bestseller: item.tags?.includes('BEST_SELLER') || false,
      ...item
    });
  });

  return {
    menus: [{
      categories: Object.values(categoriesMap)
    }]
  };
};

const MenuManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all' });
  const [viewType, setViewType] = useState('list');
  const user = useSelector((state) => state.auth.user);
  const [restaurantId, setRestaurantId] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ status: 'all' });
    setSearchTerm('');
  };

  useEffect(() => {
    if (user) {
      setRestaurantId(user.restaurantId);
    }
  }, [user]);

  const { data, isLoading, isError, error } = useGetMenusQuery(
    { restaurantId },
    { skip: !restaurantId }
  );

  const menus = useMemo(() => (
    data?.data ? transformItemsData(data.data).menus : []
  ), [data]);

  return (
    <div className="app page">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-2">
          <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div>
              <h1 className="highlight text-4xl font-extrabold tracking-tight">
                Menu Management
              </h1>
              <p className="text-primary opacity-70 mt-2 text-lg font-medium">
                Track and manage all restaurant orders
              </p>
            </div>
            <Button onClick={() => navigate("/menu-management/add")} variant="primary">
              <Plus size={20} /> Add Menu
            </Button>
          </div>
        </div>

        <MenuStats menus={menus} />

        {/* Menu Filters */}
        <MenuFilters
          searchTerm={searchTerm}
          onSearch={(e) => setSearchTerm(e.target.value)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          viewType={viewType}
          onViewModeChange={setViewType}
        />

        {/* Menu List */}
        <MenuList
          menus={menus}
          isLoading={isLoading}
          isError={isError}
          error={error}
          key={viewType}
          searchTerm={searchTerm}
          statusFilter={filters.status}
          viewType={viewType}
        />
      </div>
    </div>

  );
};

export default MenuManagement;