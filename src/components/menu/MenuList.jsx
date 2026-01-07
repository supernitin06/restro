// src/components/menu/MenuList.jsx - PREMIUM VERSION
import React, { useEffect, useState, useMemo } from "react";
import { Check, Star, Edit, Trash2, ChevronDown, ChevronUp, ImageOff, X, Package } from "lucide-react";
import EditMenuModal from "./EditMenuModal";
import { showConfirmAlert } from "../../utils/sweetAlert";
import { showSuccessAlert, showErrorAlert } from "../../utils/sweetAlert";

import Button from "../ui/Button";
import Table from "../ui/Table";
import {
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from "../../api/services/menuApi";

// ===== REUSABLE COMPONENTS =====

const VegNonVegIcon = ({ isVeg }) => (
  <div className={`w-5 h-5 flex items-center justify-center border-2 rounded-sm ${isVeg ? 'border-green-600' : 'border-red-600'} shadow-sm`}>
    <div className={`w-2.5 h-2.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
  </div>
);

const BestsellerTag = () => (
  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-md">
    <Star className="w-3.5 h-3.5 fill-white" />
    <span>Bestseller</span>
  </div>
);

// ===== MAIN COMPONENT =====

const MenuList = ({ menus, isLoading, isError, error, searchTerm = '', statusFilter = 'all', viewType = 'list' }) => {
  const [editItem, setEditItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [deleteMenu] = useDeleteMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();

  // Categories are collapsed by default.

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleDelete = React.useCallback(async (itemId) => {
    const result = await showConfirmAlert("Are you sure you want to delete this item?", "Delete", "Cancel");
    if (!result.isConfirmed) return;
    try {
      await deleteMenu(itemId).unwrap();
      showSuccessAlert("Item deleted successfully.");
    } catch (err) {
      showErrorAlert("Failed to delete item.");
      console.error("Delete failed", err);
    }
  }, [deleteMenu]);

  const handleEditSave = React.useCallback(async (updatedItem) => {
    await updateMenu({
      id: updatedItem.itemId,
      payload: {
        name: updatedItem.name,
        basePrice: updatedItem.price,
        isAvailable: updatedItem.available,
      },
    });
    setEditItem(null);
  }, [updateMenu]);

  // Memoize filtering logic
  const filteredMenus = useMemo(() => {
    if (!menus) return [];
    return menus.map(menu => {
      const filteredCategories = menu.categories.map(category => {
        const filteredSubCategories = category.subCategories.map(subCat => {
          const filteredItems = subCat.items.filter(item => {
            const name = item.name || '';
            const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
              statusFilter === 'all' ||
              (statusFilter === 'available' && item.available) ||
              (statusFilter === 'unavailable' && !item.available) ||
              (statusFilter === 'bestseller' && item.bestseller);
            return matchesSearch && matchesStatus;
          });
          return { ...subCat, items: filteredItems };
        }).filter(subCat => subCat.items.length > 0);
        return { ...category, subCategories: filteredSubCategories };
      }).filter(category => category.subCategories.length > 0);
      return { ...menu, categories: filteredCategories };
    });
  }, [menus, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-900"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 dark:border-t-blue-400 absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading menu items...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
            <X className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-red-800 dark:text-red-300 mb-2">Error Loading Menu</h3>
            <p className="text-red-600 dark:text-red-400">{error?.data?.message || "Unknown error occurred"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Menu Categories */}
      {filteredMenus.map((menu) =>
        menu.categories.map((category) => (
          <div key={category.categoryId} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            {/* Category Header */}
            <div
              className="flex justify-between items-center px-6 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => toggleCategory(category.categoryId)}
            >
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {category.subCategories.reduce((total, sub) => total + sub.items.length, 0)} items in this category
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {category.status === 'active' && (
                  <span className="relative flex h-3 w-3" title="Active">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700/60 transition-transform duration-300 ${expandedCategories[category.categoryId] ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </div>

            {/* Category Items - Collapsible */}
            {expandedCategories[category.categoryId] && (
              <div className="border-t-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                {category.subCategories.map((subCat) => (
                  <div key={subCat.subCategoryId}>
                    {category.subCategories.length > 1 && (
                      <div className="px-6 pt-5">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                          {subCat.name}
                        </h3>
                      </div>
                    )}

                    {/* Menu Items */}
                    <div className="px-6 py-4">
                      {viewType === 'grid' ? (
                        /* ===== GRID VIEW - PREMIUM ===== */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {subCat.items.map((item) => (
                            <div
                              key={item.itemId}
                              className={`group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 ${!item.available ? 'opacity-60 grayscale' : ''}`}
                            >
                              {/* Image Container */}
                              <div className="relative h-48 overflow-hidden">
                                <img
                                  src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                                <div className="absolute top-3 left-3 flex gap-2">
                                  <VegNonVegIcon isVeg={item.veg} />
                                </div>
                                {item.bestseller && (
                                  <div className="absolute top-3 right-3">
                                    <BestsellerTag />
                                  </div>
                                )}

                                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                                  <div className="font-bold text-xl drop-shadow-md">₹{item.price}</div>
                                  {!item.available && (
                                    <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider backdrop-blur-sm">
                                      Sold Out
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-4 space-y-3">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {item.name}
                                </h3>

                                {item.description && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {item.description}
                                  </p>
                                )}

                                {/* Actions */}
                                <div className="pt-2 flex gap-2">
                                  <Button
                                    onClick={() => setEditItem(item)}
                                    variant="outline"
                                    className="flex-1 text-xs py-1.5 h-8 border-gray-200 dark:border-gray-600"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(item.itemId)}
                                    variant="outline"
                                    className="px-3 text-red-500 border-red-100 h-8 hover:bg-red-50 hover:border-red-200 dark:border-red-900/30 dark:hover:bg-red-900/20"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* ===== LIST VIEW - CLASSIC MENU STYLE ===== */
                        <div className="space-y-4">
                          {subCat.items.map((item) => (
                            <div
                              key={item.itemId}
                              className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all duration-300"
                            >
                              {/* Item Image */}
                              <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                  src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
                                  alt={item.name}
                                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!item.available ? 'grayscale' : ''}`}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                                  }}
                                />
                                {item.bestseller && (
                                  <div className="absolute top-2 left-2">
                                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                                      <Star className="w-3.5 h-3.5 text-white fill-white" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Item Details */}
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                      <VegNonVegIcon isVeg={item.veg} />
                                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.name}
                                      </h3>
                                    </div>
                                    <div className="text-right">
                                      <span className="block text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
                                        ₹{item.price}
                                      </span>
                                      {item.discountPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                          ₹{item.discountPrice}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-w-2xl">
                                    {item.description || "No description available for this delicious item."}
                                  </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${item.available
                                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                                      }`}>
                                      {item.available ? 'Available' : 'Unavailable'}
                                    </span>
                                    {item.bestseller && (
                                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                                        Bestseller
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Button
                                      onClick={() => setEditItem(item)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      onClick={() => handleDelete(item.itemId)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Empty State */}
                      {subCat.items.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No items found</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mt-1">
                            This category appears to be empty. Add some items to populate your menu.
                          </p>
                        </div>
                      )}
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