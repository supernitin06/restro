
import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuList from "../../components/menu/MenuList";
import MenuFilters from "../../components/menu/MenuFilter";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MenuStats from "../../components/menu/MenuStats";
import { useGetMenusQuery } from "../../api/services/menuApi";

const mapItem = (item) => ({
  itemId: item._id,
  name: item.name,
  image: item.image,
  price: item.basePrice,
  discountPrice: null,
  available: item.isAvailable,
  veg: item.isVeg || item.foodType === 'VEG',
  bestseller: item.tags?.includes('BEST_SELLER') || false,
  description: item.description,
  inStock: item.inStock,
  ...item
});

const transformItemsData = (apiData) => {
  if (!apiData) return { menus: [] };

  const categories = [];

  // 1. Process structured categories
  if (apiData.categories && Array.isArray(apiData.categories)) {
    apiData.categories.forEach(cat => {
      categories.push({
        categoryId: cat._id,
        name: cat.name,
        status: cat.isActive !== false ? 'active' : 'inactive', // Default to active if undefined
        description: cat.description,
        subCategories: [{
          subCategoryId: cat._id,
          name: cat.name,
          items: (cat.items || []).map(mapItem)
        }]
      });
    });
  }

  // 2. Process uncategorized items
  if (apiData.uncategorized && Array.isArray(apiData.uncategorized) && apiData.uncategorized.length > 0) {
    categories.push({
      categoryId: 'uncategorized',
      name: 'Uncategorized',
      status: 'active',
      subCategories: [{
        subCategoryId: 'uncategorized_main',
        name: 'Others',
        items: apiData.uncategorized.map(mapItem)
      }]
    });
  }

  return {
    menus: [{ categories }]
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
    { skip: !restaurantId, refetchOnMountOrArgChange: true }
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