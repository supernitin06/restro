import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Edit, Trash2 } from "lucide-react";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Modal from "../ui/Modal";
import { showSuccessAlert, showErrorAlert } from "../../utils/sweetAlert";

import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useToggleCategoryMutation,
  useAddMenuMutation,
} from "../../api/services/menuApi";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ie", label: "Irish", flag: "🇮🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
];

const tagsList = ["BEST_SELLER", "CHEF_SPECIAL", "SPICY"];

const AddMenuItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* 🔑 restaurantId FROM REDUX */
  const restaurantId = useSelector(
    (state) => state.auth?.user?.restaurantId
  );

  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesQuery(restaurantId, {
    skip: !restaurantId,
  });

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [toggleCategory] = useToggleCategoryMutation();
  const [addMenu] = useAddMenuMutation();

  const categories = categoriesData?.data || [];

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(1);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);



  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [foodType, setFoodType] = useState("VEG");
  const [isVeg, setIsVeg] = useState(true);
  const [tags, setTags] = useState([]);
  const [available, setAvailable] = useState(true);

  const [photo, setPhoto] = useState(null);
  const [altText, setAltText] = useState("");

  const [pricingOptions, setPricingOptions] = useState({
    priceLabel: false,
    priceUnit: false,
    priceRange: false,
  });

  /* ✅ FIX: auto select first category */
  useEffect(() => {
    if (categories.length && !category) {
      setCategory(categories[0]._id);
    }
  }, [categories, category]);

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  /* ✅ ADD CATEGORY API */
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    if (!restaurantId) {
      showErrorAlert("Restaurant ID is missing. Please log in again.");
      return;
    }

    try {
      const result = await addCategory({
        restaurantId,
        name: newCategoryName,
        order: newCategoryOrder,
      }).unwrap();

      showSuccessAlert("Category added successfully!");
      await refetchCategories(); // Refresh categories list
      setCategory(result._id); // Auto-select the new category
      setNewCategoryName("");
      setNewCategoryOrder(1);
      setShowAddCategory(false);
    } catch (err) {
      console.error("Add category failed", err);
      const errorMessage = err?.data?.message || "Failed to add category. Please try again.";
      showErrorAlert(errorMessage);
    }
  };

  /* ✅ EDIT CATEGORY */
  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setNewCategoryName(cat.name);
    setNewCategoryOrder(cat.order || 1);
    setShowAddCategory(true);
    setShowCategoryDropdown(false);
  };

  /* ✅ UPDATE CATEGORY API */
  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim() || !editingCategory) return;

    try {
      await updateCategory({
        id: editingCategory._id,
        payload: {
          name: newCategoryName,
          order: newCategoryOrder,
        },
      }).unwrap();

      showSuccessAlert("Category updated successfully!");
      await refetchCategories();
      setNewCategoryName("");
      setNewCategoryOrder(1);
      setEditingCategory(null);
      setShowAddCategory(false);
    } catch (err) {
      console.error("Update category failed", err);
      showErrorAlert("Failed to update category");
    }
  };

  /* ✅ DELETE CATEGORY API */
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await toggleCategory(id).unwrap(); // Assuming toggleCategory is used for deletion
      showSuccessAlert("Category deleted successfully!");
      await refetchCategories();
      if (category === id) {
        setCategory(categories.length > 1 ? categories.find(cat => cat._id !== id)._id : "");
      }
    } catch (err) {
      console.error("Delete category failed", err);
      showErrorAlert("Failed to delete category");
    }
  };

  /* ✅ REAL SAVE MENU API */
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await addMenu({
        restaurantId,
        categoryId: category,
        name,
        description,
        basePrice: Number(price),
        foodType,
        isVeg,
        tags,
        isAvailable: available,
        pricingOptions,
        image: photo,
        altText,
      }).unwrap();

      showSuccessAlert(t("menuItemSaved"));
      navigate("/menu-management");
    } catch (err) {
      console.error("Add menu failed", err);
      showErrorAlert("Failed to save menu item");
    }
  };

  return (
    <div className="page">
      {/* ===== HEADER (UNCHANGED) ===== */}
      <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border">
        <div>
          <h1 className="highlight text-4xl font-extrabold">
            Add Menu Item
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg">
            Add a new menu item to your restaurant.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button onClick={() => navigate("/menu-management")} variant="outline">
            ← Back
          </Button>
          <Button onClick={handleSave} variant="primary">
            Save
          </Button>
        </div>
      </div>

      <form className="p-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={languages.map((l) => ({
                value: l.code,
                label: `${l.flag} ${l.label}`,
              }))}
            />
            <Button variant="outline" size="sm">Translate</Button>
          </div>

          {/* Category */}
          <div className="relative">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('category')}</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full px-3 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.find(cat => cat._id === category)?.name || 'Select Category'}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {categories.map((cat) => (
                      <div
                        key={cat._id}
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => { setCategory(cat._id); setShowCategoryDropdown(false); }}
                      >
                        <span className="text-sm">{cat.name}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEditCategory(cat); }}
                            className="text-gray-400 hover:text-blue-600 p-1"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat._id); }}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={() => { setEditingCategory(null); setNewCategoryName(""); setNewCategoryOrder(1); setShowAddCategory(true); }} variant="outline" size="sm">
                + Add
              </Button>
            </div>
          </div>



          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('itemName')}</label>
            <InputField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('exampleBurger')}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('description')}</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder={t('addShortDescription')}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('price')}</label>
            <InputField
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t('pricePlaceholder')}
            />
          </div>

          {/* Food Type */}
          <div className="flex gap-6 items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">{t('foodType')}:</span>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={foodType === "VEG"}
                onChange={() => {
                  setFoodType("VEG");
                  setIsVeg(true);
                }}
              />
              {t('veg')}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={foodType === "NON_VEG"}
                onChange={() => {
                  setFoodType("NON_VEG");
                  setIsVeg(false);
                }}
              />
              {t('nonVeg')}
            </label>
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('tags')}</label>
            <div className="flex gap-2 flex-wrap">
              {tagsList.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  variant={tags.includes(tag) ? "primary" : "outline"}
                  size="sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
              <input
                type="checkbox"
                checked={available}
                onChange={() => setAvailable(!available)}
              />
              {t('available')}
            </label>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pricing Options */}
          <div className="border rounded-xl p-4 bg-gray-50">
            <h2 className="font-semibold mb-3">{t('pricingOptions')}</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pricingOptions.priceLabel}
                onChange={() =>
                  setPricingOptions((prev) => ({
                    ...prev,
                    priceLabel: !prev.priceLabel,
                  }))
                }
              />
              {t('priceLabel')}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pricingOptions.priceUnit}
                onChange={() =>
                  setPricingOptions((prev) => ({
                    ...prev,
                    priceUnit: !prev.priceUnit,
                  }))
                }
              />
              {t('priceUnit')}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pricingOptions.priceRange}
                onChange={() =>
                  setPricingOptions((prev) => ({
                    ...prev,
                    priceRange: !prev.priceRange,
                  }))
                }
              />
              {t('priceRange')}
            </label>
          </div>

          {/* Featured Photo */}
          <div className="border rounded-xl p-4 bg-gray-50">
            <h2 className="font-semibold mb-3">{t('featuredPhoto')}</h2>
            <div className="flex flex-col items-center">
              {photo ? (
                <img
                  src={photo}
                  alt={altText || t('preview')}
                  className="max-w-full max-h-48 object-contain rounded-lg mb-3"
                />
              ) : (
                <div className="text-gray-400 text-center text-sm">
                  <div className="text-5xl mb-2">🍔</div>
                  {t('clickBelowToUpload')}
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handlePhotoUpload}
                  />
                  <Button variant="outline" size="sm">
                    {t('choose')}
                  </Button>
                </div>
                {photo && (
                  <Button variant="danger" size="sm" onClick={() => setPhoto(null)}>
                    {t('remove')}
                  </Button>
                )}
              </div>
              {photo && (
                <InputField
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder={t('describeThePhoto')}
                  className="mt-2 text-sm"
                />
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Add/Edit Category Modal */}
      {showAddCategory && (
        <Modal
          onClose={() => { setShowAddCategory(false); setEditingCategory(null); setNewCategoryName(""); setNewCategoryOrder(1); }}
          title={editingCategory ? "Edit Category" : "Add New Category"}
        >
          <div className="space-y-4">
            <InputField
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
            />
            <InputField
              type="number"
              value={newCategoryOrder}
              onChange={(e) => setNewCategoryOrder(parseInt(e.target.value))}
              placeholder="Order"
            />
            <div className="flex gap-2 justify-end">
              <Button onClick={() => { setShowAddCategory(false); setEditingCategory(null); setNewCategoryName(""); setNewCategoryOrder(1); }} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={editingCategory ? handleUpdateCategory : handleAddCategory} variant="primary" size="sm">
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddMenuItem;
