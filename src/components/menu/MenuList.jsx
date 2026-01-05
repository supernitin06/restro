import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit, FiTrash2, FiStar, FiCheck, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GiChickenLeg, GiFruitBowl } from "react-icons/gi";
import { List } from "lucide-react";
import StatCard from "../ui/StatCard";
import EditMenuModal from "./EditMenuModal";
import UserFilters from "../ui/UserFilters";
import {
  useGetMenusQuery,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from "../../api/services/menuApi";
import transformMenuData from "./transformMenuData";

const transformMenuData = (data) => {
  const categoriesMap = {};
  data.forEach(item => {
    const catId = item.categoryId._id;
    const catName = item.categoryId.name;
    if (!categoriesMap[catId]) {
      categoriesMap[catId] = {
        categoryId: catId,
        name: catName,
        status: 'active',
        subCategories: [{
          subCategoryId: catId + '_sub',
          name: catName,
          status: 'active',
          items: []
        }]
      };
    }
    categoriesMap[catId].subCategories[0].items.push({
      itemId: item._id,
      name: item.name,
      price: item.basePrice,
      discountPrice: null,
      available: item.isAvailable,
      veg: item.isVeg,
      bestseller: item.tags?.includes('BEST_SELLER') || false
    });
  });
  return {
    menus: [{
      categories: Object.values(categoriesMap)
    }]
  };
};

const transformCategoryData = (categoryData) => {
  const categories = categoryData.map(category => ({
    categoryId: category.id,
    name: category.name,
    status: category.isActive ? 'active' : 'inactive',
    subCategories: [{
      subCategoryId: category.id + '_sub',
      name: category.name,
      status: category.isActive ? 'active' : 'inactive',
      items: (category.products || []).map(product => ({
        itemId: product._id,
        name: product.name,
        price: product.basePrice,
        discountPrice: null,
        available: product.isAvailable,
        veg: product.isVeg,
        bestseller: false
      }))
    }]
  }));

  return {
    menus: [{
      categories
    }]
  };
};

const MenuList = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("jfnvjinfov nionfkov ", user);
  const [restaurant , setRestaurant] = useState(null);
  useEffect(() => {

    if(user){
      setRestaurant(user.restaurantId);
    }

  }, [user]);
  console.log("restaurant", restaurant);

  const [editItem, setEditItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  /* 🔥 API CALL WITH FILTERS */
  const { data, isLoading, isError, error } = useGetMenusQuery({
    restaurantId: restaurant || RESTAURANT_ID,
    categoryId: CATEGORY_ID,
    search: searchTerm,
    status: statusFilter,
  });
  const [deleteMenu] = useDeleteMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();

  /* 🧠 API → UI */
  const menus = data?.data ? transformMenuData(data.data).menus : [];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const updated = { menus: [...menus] };
    updated.menus.forEach(menu => {
      menu.categories.forEach(cat => {
        cat.subCategories.forEach(sub => {
          sub.items = sub.items.filter(i => i.itemId !== itemId);
        });
      });
    });
    setMenus(updated.menus);
    localStorage.setItem("menuData", JSON.stringify(updated));
    await deleteMenu(itemId);
  };

  const handleEditSave = async (updatedItem) => {
    await updateMenu({
      id: updatedItem.itemId,
      payload: {
        name: updatedItem.name,
        basePrice: updatedItem.price,
        isAvailable: updatedItem.available,
      },
    });
    setEditItem(null);
  };

  // Calculate stats
  const calculateStats = () => {
    let totalItems = 0;
    let availableItems = 0;
    let bestsellers = 0;

    menus.forEach(menu => {
      menu.categories.forEach(cat => {
        cat.subCategories.forEach(sub => {
          totalItems += sub.items.length;
          availableItems += sub.items.filter(item => item.available).length;
          bestsellers += sub.items.filter(item => item.bestseller).length;
        });
      });
    });

    return { totalItems, availableItems, bestsellers };
  };

  const stats = calculateStats();

  const getVegColor = (isVeg) => isVeg ? 'text-green-600' : 'text-red-600';
  const getVegBg = (isVeg) => isVeg ? 'bg-green-50' : 'bg-red-50';
  const getVegBorder = (isVeg) => isVeg ? 'border-green-200' : 'border-red-200';
  const getVegIcon = (isVeg) => isVeg ?
    <div className="w-4 h-4 rounded-full border-2 border-green-600 bg-green-100"></div> :
    <div className="w-4 h-4 rounded-full border-2 border-red-600 bg-red-100"></div>;

  const getFilteredMenus = () => {
    return menus.map(menu => ({
      ...menu,
      categories: menu.categories.map(category => ({
        ...category,
        subCategories: category.subCategories.map(subCat => ({
          ...subCat,
          items: subCat.items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
              statusFilter === 'all' ||
              (statusFilter === 'available' && item.available) ||
              (statusFilter === 'unavailable' && !item.available) ||
              (statusFilter === 'bestseller' && item.bestseller);
            return matchesSearch && matchesStatus;
          })
        }))
      }))
    }));
  };

  const filteredMenus = getFilteredMenus();

  if (isLoading) return <div>Loading menus...</div>;
  if (isError) {
    if (error?.status === 401) {
      return <div>Please log in to view the menu.</div>;
    }
    return <div>Error loading menu: {error?.data?.message || error?.status || 'Unknown error'}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Items"
          value={stats.totalItems}
          icon={List}
          color="blue"
        />
        <StatCard
          title="Available Now"
          value={stats.availableItems}
          icon={FiCheck}
          color="green"
        />
        <StatCard
          title="Bestsellers"
          value={stats.bestsellers}
          icon={FiStar}
          color="yellow"
        />
      </div>

      {/* Menu Filters */}
      <UserFilters
        search={{
          value: searchTerm,
          placeholder: 'Search menu items...',
          onChange: setSearchTerm
        }}
        filters={[
          {
            key: 'status',
            value: statusFilter,
            options: [
              { value: 'all', label: 'All' },
              { value: 'available', label: 'Available' },
              { value: 'unavailable', label: 'Unavailable' },
              { value: 'bestseller', label: 'Bestseller' }
            ]
          }
        ]}
        onFilterChange={(key, value) => {
          if (key === 'status') {
            setStatusFilter(value);
          }
        }}
      />

      {/* Menu Categories */}
      {filteredMenus.map((menu) =>
        menu.categories.map((category) => (
          <div key={category.categoryId} className="bg-[var(--bg-card)] rounded-xl shadow-sm overflow-hidden border border-[var(--border)]">
            {/* Category Header */}
            <div
              className="flex justify-between items-center p-5 cursor-pointer hover:bg-[var(--bg-hover)] transition-all"
              onClick={() => toggleCategory(category.categoryId)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.status === 'active' ? 'bg-green-50 border border-green-200' : 'bg-gray-100 border border-gray-300'}`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${category.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-main)]">{category.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {category.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">
                      {category.subCategories.reduce((total, sub) => total + sub.items.length, 0)} items
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {expandedCategories[category.categoryId] ? (
                  <FiChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                )}
              </div>
            </div>

            {/* Category Items - Collapsible */}
            {expandedCategories[category.categoryId] && (
              <div className="border-t border-[var(--border)]">
                {category.subCategories.map((subCat) => (
                  <div key={subCat.subCategoryId}>
                    {category.subCategories.length > 1 && (
                      <div className="px-5 pt-4">
                        <h3 className="text-lg font-semibold text-[var(--text-main)] mb-3">{subCat.name}</h3>
                      </div>
                    )}

                    {/* Menu Items - Single Row Layout */}
                    <div className="px-5 py-2">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[var(--border)]">
                              <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Item</th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Type</th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Price</th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Bestseller</th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--border)]">
                            {subCat.items.map((item) => (
                              <tr
                                key={item.itemId}
                                className={`hover:bg-[var(--bg-hover)] transition-colors ${!item.available ? 'opacity-60' : ''}`}
                              >
                                {/* Item Name with Bestseller */}
                                <td className="py-4 px-2">
                                  <div className="flex items-center gap-3">
                                    {getVegIcon(item.veg)}
                                    <div>
                                      <div className="font-medium text-[var(--text-main)]">{item.name}</div>
                                      {item.bestseller && (
                                        <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
                                          <FiStar className="w-3 h-3" />
                                          <span>Bestseller</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                {/* Veg/Non-Veg Type */}
                                <td className="py-4 px-2">
                                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${item.veg ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    <span>{item.veg ? 'Veg' : 'Non-Veg'}</span>
                                  </div>
                                </td>

                                {/* Price */}
                                <td className="py-4 px-2">
                                  <div className="space-y-1">
                                    <div className="flex items-baseline gap-2">
                                      {item.discountPrice ? (
                                        <>
                                          <span className="text-lg font-semibold text-red-600">₹{item.discountPrice}</span>
                                          <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                        </>
                                      ) : (
                                        <span className="text-lg font-semibold text-[var(--text-main)]">₹{item.price}</span>
                                      )}
                                    </div>
                                    {item.discountPrice && (
                                      <div className="text-xs text-green-600 font-medium">
                                        Save ₹{item.price - item.discountPrice}
                                      </div>
                                    )}
                                  </div>
                                </td>

                                {/* Availability Status */}
                                <td className="py-4 px-2">
                                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${item.available ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    {item.available ? (
                                      <>
                                        <FiCheck className="w-4 h-4" />
                                        <span>Available</span>
                                      </>
                                    ) : (
                                      <>
                                        <FiX className="w-4 h-4" />
                                        <span>Not Available</span>
                                      </>
                                    )}
                                  </div>
                                </td>

                                {/* Bestseller */}
                                <td className="py-4 px-2">
                                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${item.bestseller ? 'bg-amber-50 text-amber-800' : 'bg-gray-50 text-gray-800'}`}>
                                    {item.bestseller ? (
                                      <>
                                        <FiStar className="w-4 h-4" />
                                        <span>Yes</span>
                                      </>
                                    ) : (
                                      <>
                                        <FiX className="w-4 h-4" />
                                        <span>No</span>
                                      </>
                                    )}
                                  </div>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-2">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setEditItem(item)}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium text-sm transition-colors"
                                    >
                                      <FiEdit className="w-4 h-4" />

                                    </button>
                                    <button
                                      onClick={() => handleDelete(item.itemId)}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium text-sm transition-colors"
                                    >
                                      <FiTrash2 className="w-4 h-4" />

                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Empty State */}
                        {subCat.items.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-[var(--border)] rounded-lg">
                            <div className="text-[var(--text-muted)] text-lg mb-2">No items in this category</div>
                            <div className="text-[var(--text-muted)]">Add items to get started</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}


      <EditMenuModal
        open={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default MenuList;