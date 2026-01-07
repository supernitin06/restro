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
                              className={`group bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 ${!item.available ? 'opacity-60' : ''}`}
                            >
                              {/* Image Container with Overlay */}
                              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                                <img 
                                  src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60"} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                  onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Badges on Image */}
                                <div className="absolute top-3 left-3">
                                  <VegNonVegIcon isVeg={item.veg} />
                                </div>
                                {item.bestseller && (
                                  <div className="absolute top-3 right-3">
                                    <BestsellerTag />
                                  </div>
                                )}
                              </div>

                              {/* Card Content */}
                              <div className="px-4 py-3 space-y-3">
                                {/* Item Name */}
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {item.name}
                                </h3>

                                {/* Price & Status */}
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                      ₹{item.price}
                                    </span>
                                    {item.discountPrice && (
                                      <span className="text-sm text-gray-400 line-through">₹{item.discountPrice}</span>
                                    )}
                                  </div>
                                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                                    item.available 
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                  }`}>
                                    {item.available ? '✓ Available' : '✗ Out'}
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                                  <Button
                                    onClick={() => setEditItem(item)}
                                    variant="primary"
                                    className="flex-1"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(item.itemId)}
                                    variant="danger"
                                    className="flex-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* ===== LIST VIEW - PREMIUM TABLE ===== */
                        <Table
                          columns={[
                            {
                              header: 'Item Details',
                              render: (item) => (
                                <div className="flex items-center gap-3 cursor-pointer">
                                  <VegNonVegIcon isVeg={item.veg} />
                                  <div>
                                    <div className="font-bold text-gray-900 dark:text-white">{item.name}</div>
                                    {item.bestseller && (
                                      <div className="mt-1">
                                        <BestsellerTag />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ),
                            },
                            {
                              header: 'Type',
                              render: (item) => (
                                <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                                  item.veg 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                  {item.veg ? '🥬 Veg' : '🍗 Non-Veg'}
                                </span>
                              ),
                            },
                            {
                              header: 'Price',
                              render: (item) => (
                                <div className="flex flex-col">
                                  {item.discountPrice ? (
                                    <>
                                      <span className="text-lg font-extrabold text-red-600 dark:text-red-400">₹{item.discountPrice}</span>
                                      <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                      <span className="text-xs text-green-600 dark:text-green-400 font-bold">Save ₹{item.price - item.discountPrice}</span>
                                    </>
                                  ) : (
                                    <span className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹{item.price}</span>
                                  )}
                                </div>
                              ),
                            },
                            {
                              header: 'Status',
                              render: (item) => (
                                <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold shadow-sm ${
                                  item.available 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                  {item.available ? <><Check className="w-4 h-4" /> Available</> : <><X className="w-4 h-4" /> Unavailable</>}
                                </span>
                              ),
                            },
                            {
                              header: 'Bestseller',
                              render: (item) => (
                                <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold shadow-sm ${
                                  item.bestseller 
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' 
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                  {item.bestseller ? <><Star className="w-4 h-4 fill-current" /> Yes</> : <><X className="w-4 h-4" /> No</>}
                                </span>
                              ),
                            },
                            {
                              header: 'Actions',
                              render: (item) => (
                                <div className="flex items-center gap-2">
                                  <Button
                                    onClick={() => setEditItem(item)}
                                    variant="outline"
                                    size="icon"
                                    title="Edit Item"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(item.itemId)}
                                    variant="outline"
                                    size="icon"
                                    className="text-red-600 hover:text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/30"
                                    title="Delete Item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ),
                            },
                          ]}
                          data={subCat.items}
                        />
                      )}

                      {/* Empty State - Premium */}
                      {subCat.items.length === 0 && (
                        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-750">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Package className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No items in this category</h3>
                          <p className="text-gray-500 dark:text-gray-400">Add some delicious items to get started!</p>
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