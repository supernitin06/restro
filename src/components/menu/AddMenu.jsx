import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Edit, Trash2, Upload, Eye, Utensils, Tag, DollarSign } from "lucide-react";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import Textarea from "../ui/Textarea";
// import Select from "../ui/Select";
import Modal from "../ui/Modal";
import { showSuccessAlert, showErrorAlert } from "../../utils/sweetAlert";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useToggleCategoryMutation,
  useAddMenuMutation,
} from "../../api/services/menuApi";

//  const params = useParams();
//  console.log(params);
const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ie", label: "Irish", flag: "🇮🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
];

const tagOptions = [
  { value: "BEST_SELLER", label: "Best Seller", icon: "🏆", activeClass: "bg-amber-50 border-amber-500 text-amber-700 shadow-amber-100" },
  { value: "CHEF_SPECIAL", label: "Chef's Special", icon: "👨‍🍳", activeClass: "bg-purple-50 border-purple-500 text-purple-700 shadow-purple-100" },
  { value: "SPICY", label: "Spicy", icon: "🌶️", activeClass: "bg-red-50 border-red-500 text-red-700 shadow-red-100" },
  { value: "NEW", label: "New", icon: "✨", activeClass: "bg-blue-50 border-blue-500 text-blue-700 shadow-blue-100" },
  { value: "KIDS", label: "Kids", icon: "👶", activeClass: "bg-green-50 border-green-500 text-green-700 shadow-green-100" },
];

// ✅ Helper: Convert File to Base64 (Server friendly)
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

const AddMenuItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* 🔑 restaurantId FROM REDUX */
  const restaurantId = useSelector(
    (state) => state.auth?.user?.restaurantId
  );
  console.log(restaurantId);
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesQuery(restaurantId, {
    skip: !restaurantId,
  });

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [toggleCategory] = useToggleCategoryMutation();
  const [addMenu] = useAddMenuMutation();

  const categories = categoriesData?.data || [];

  // Form States
  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("");

  // Category Modal States
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(1);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Item Details States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [foodType, setFoodType] = useState("VEG");
  const [isVeg, setIsVeg] = useState(true);
  const [tags, setTags] = useState([]);
  const [available, setAvailable] = useState(true);

  // Image States
  const [photo, setPhoto] = useState(null); // For Preview (Blob)
  const [imageFile, setImageFile] = useState(null); // For Upload (File Object)
  const [altText, setAltText] = useState("");

  // ✅ Fix: Restore pricingOptions state (Backend likely expects this)
  const [pricingOptions, setPricingOptions] = useState({
    priceLabel: false,
    priceUnit: false,
    priceRange: false,
  });

  // Variants & Add-ons
  const [variants, setVariants] = useState([]);
  const [addons, setAddons] = useState([]);

  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addAddon = () => {
    setAddons([...addons, { name: "", price: "" }]);
  };

  const removeAddon = (index) => {
    setAddons(addons.filter((_, i) => i !== index));
  };

  const updateAddon = (index, field, value) => {
    const newAddons = [...addons];
    newAddons[index][field] = value;
    setAddons(newAddons);
  };

  /* ✅ Auto-select first category */
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

  /* ✅ Improved Image Handler */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Immediate preview
      setImageFile(file); // Store file for Base64 conversion later
    }
  };

  /* ✅ Category Handlers */
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    if (!restaurantId) return showErrorAlert("Restaurant ID missing.");

    try {
      const result = await addCategory({
        restaurantId,
        name: newCategoryName,
        order: newCategoryOrder,
      }).unwrap();

      showSuccessAlert("Category added!");
      await refetchCategories();
      setCategory(result._id);
      setNewCategoryName("");
      setShowAddCategory(false);
    } catch (err) {
      showErrorAlert(err?.data?.message || "Failed to add category.");
    }
  };

  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim() || !editingCategory) return;
    try {
      await updateCategory({
        id: editingCategory._id,
        payload: { name: newCategoryName, order: newCategoryOrder },
      }).unwrap();
      showSuccessAlert("Category updated!");
      await refetchCategories();
      setEditingCategory(null);
      setShowAddCategory(false);
    } catch (err) {
      showErrorAlert("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await toggleCategory(id).unwrap();
      showSuccessAlert("Category deleted!");
      await refetchCategories();
      if (category === id) setCategory(categories[0]?._id || "");
    } catch (err) {
      showErrorAlert("Failed to delete category");
    }
  };

  const handleEditCategoryClick = (cat) => {
    setEditingCategory(cat);
    setNewCategoryName(cat.name);
    setNewCategoryOrder(cat.order || 1);
    setShowAddCategory(true);
    setShowCategoryDropdown(false);
  };

  /* ✅ SAVE MENU with Base64 Image */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!restaurantId) {
      showErrorAlert("Restaurant ID is missing. Please log in again.");
      return;
    }

    if (!name || !price || !category) {
      showErrorAlert("Please fill in all required fields (Name, Price, Category).");
      return;
    }

    try {
      let imagePayload = photo || ""; // ✅ Fix: Ensure image is a string (not null)
      // Convert file to Base64 before sending
      if (imageFile) {
        imagePayload = await convertToBase64(imageFile);
      }

      await addMenu({
        restaurantId,
        restaurant: restaurantId,
        category,
        name,
        description,
        basePrice: Number(price),
        foodType,
        isVeg,
        tags,
        isAvailable: available,
        variants: variants.map(v => ({ name: v.name, price: Number(v.price) })),
        addons: addons.map(a => ({ name: a.name, price: Number(a.price) })),
        image: imagePayload,
        altText,
      }).unwrap();

      showSuccessAlert(t("menuItemSaved"));
      navigate("/menu-management");
    } catch (err) {
      console.error("Add menu failed", err);
      // ✅ Fix: Show specific validation error from server
      const errorMessage = err?.data?.message || err?.data?.error || "Failed to save menu item";
      showErrorAlert(errorMessage);
    }
  };

  return (
    <div className="app page">
      <div className="mx-auto">
        {/* Header */}
        <div className="">
          <div className="mb-2 flex bg-primary flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div>
              <h1 className="highlight text-4xl font-extrabold tracking-tight">
                Create Menu Item
              </h1>
              <p className="text-primary opacity-70 mt-2 text-lg font-medium">
                Design your dish card exactly how customers will see it.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button onClick={() => navigate("/menu-management")} variant="outline" className="flex-1 md:flex-none">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="primary" className="flex-1 md:flex-none shadow-lg shadow-blue-500/30">
                Publish Item
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* LEFT COLUMN: The Editor (Form) */}
            <div className="lg:col-span-2 space-y-6">

              {/* 1. Basic Details Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                  <Utensils className="w-5 h-5 text-blue-500" />
                  Basic Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('itemName')} <span className="text-red-500">*</span></label>
                    <InputField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Truffle Mushroom Burger"
                      className="text-lg"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="relative">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('category')} <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {categories.find(cat => cat._id === category)?.name || 'Select Category'}
                        </span>
                        <span className="text-gray-400">▼</span>
                      </button>

                      {/* Custom Dropdown */}
                      {showCategoryDropdown && (
                        <div className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 max-h-60 overflow-auto animate-in fade-in zoom-in duration-200">
                          {categories.map((cat) => (
                            <div
                              key={cat._id}
                              className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-50 dark:border-gray-700/50 last:border-0"
                              onClick={() => { setCategory(cat._id); setShowCategoryDropdown(false); }}
                            >
                              <span className="text-sm font-medium">{cat.name}</span>
                              <div className="flex gap-2">
                                <button onClick={(e) => { e.stopPropagation(); handleEditCategoryClick(cat); }} className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600"><Edit size={14} /></button>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat._id); }} className="p-1.5 hover:bg-red-100 rounded-md text-red-600"><Trash2 size={14} /></button>
                              </div>
                            </div>
                          ))}
                          <div
                            className="p-3 text-center text-blue-600 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-t"
                            onClick={() => { setEditingCategory(null); setNewCategoryName(""); setShowAddCategory(true); }}
                          >
                            + Create New Category
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('price')} <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                      <InputField
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('description')}</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Describe the ingredients and taste..."
                    />
                  </div>
                </div>
              </div>

              {/* 2. Attributes & Media */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 ">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                  <Tag className="w-5 h-5 text-purple-500" />
                  Attributes & Media
                </h2>

                <div className="space-y-6">
                  {/* Food Type (Veg/Non-Veg) */}
                  <div className="flex flex-wrap gap-4">
                    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${foodType === 'VEG' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                      <input type="radio" className="hidden" checked={foodType === "VEG"} onChange={() => { setFoodType("VEG"); setIsVeg(true); }} />
                      <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-sm"><div className="w-2 h-2 bg-green-600 rounded-full"></div></div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">Vegetarian</span>
                    </label>

                    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${foodType === 'NON_VEG' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                      <input type="radio" className="hidden" checked={foodType === "NON_VEG"} onChange={() => { setFoodType("NON_VEG"); setIsVeg(false); }} />
                      <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center rounded-sm"><div className="w-2 h-2 bg-red-600 rounded-full"></div></div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">Non-Vegetarian</span>
                    </label>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300">{t('tags')}</label>
                    <div className="flex flex-wrap gap-3">
                      {tagOptions.map((tag) => {
                        const isSelected = tags.includes(tag.value);
                        return (
                          <button
                            key={tag.value}
                            type="button"
                            onClick={() => toggleTag(tag.value)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all duration-200 shadow-sm ${isSelected
                              ? `${tag.activeClass} shadow-md scale-105`
                              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              }`}
                          >
                            <span className="text-lg">{tag.icon}</span>
                            {tag.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300">Item Photo</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800/50">
                      <input
                        type="file"
                        accept="image/*"
                        id="photo-upload"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4">
                          <Upload size={24} />
                        </div>
                        <span className="text-lg font-medium text-gray-900 dark:text-white">Click to upload image</span>
                        <span className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </label>
                    </div>
                  </div>

                  {/* Availability Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Available for ordering?</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={available} onChange={() => setAvailable(!available)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Preview (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div className="flex items-center gap-2 text-gray-500 font-medium mb-2">
                  <Eye size={18} />
                  <span>Live Preview</span>
                </div>

                {/* THE CARD PREVIEW */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.02]">
                  {/* Image Area */}
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                    {photo ? (
                      <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <Utensils size={40} className="mb-2 opacity-50" />
                        <span className="text-sm">No image uploaded</span>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <div className={`w-6 h-6 flex items-center justify-center border-2 rounded-sm ${isVeg ? 'border-green-600 bg-white' : 'border-red-600 bg-white'} shadow-sm`}>
                        <div className={`w-3 h-3 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                      {tagOptions.filter(t => tags.includes(t.value)).map(tag => (
                        <div key={tag.value} className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full shadow-md border bg-white ${tag.activeClass.replace('scale-105', '')}`}>
                          <span>{tag.icon}</span> {tag.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {name || "Item Name"}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                      {description || "Delicious description will appear here..."}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Price</span>
                        <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                          ₹{price || "0"}
                        </span>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors ${available ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                        {available ? "Add +" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Helper Tip */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Pro Tip:</strong> High-quality images increase sales by up to 30%. Make sure your food looks appetizing!
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Variants & Add-ons */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <Tag className="w-5 h-5 text-green-500" />
                Variants & Add-ons
              </h2>

              <div className="space-y-6">
                {/* Variants Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Portion Sizes / Variants</label>
                    <Button onClick={addVariant} size="sm" variant="outline" className="text-sm py-1 h-auto">+ Add Variant</Button>
                  </div>

                  {variants.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No variants added (e.g., Half, Full)</p>
                  )}

                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <InputField
                            placeholder="Variant Name (e.g. Half)"
                            value={variant.name}
                            onChange={(e) => updateVariant(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <InputField
                            type="number"
                            placeholder="Price"
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          />
                        </div>
                        <button
                          onClick={() => removeVariant(index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-[2px]"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 my-4"></div>

                {/* Add-ons Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Add-ons (Extras)</label>
                    <Button onClick={addAddon} size="sm" variant="outline" className="text-sm py-1 h-auto">+ Add Add-on</Button>
                  </div>

                  {addons.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No add-ons (e.g., Extra Cheese)</p>
                  )}

                  <div className="space-y-3">
                    {addons.map((addon, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <InputField
                            placeholder="Add-on Name (e.g. Extra Cheese)"
                            value={addon.name}
                            onChange={(e) => updateAddon(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <InputField
                            type="number"
                            placeholder="Price"
                            value={addon.price}
                            onChange={(e) => updateAddon(index, 'price', e.target.value)}
                          />
                        </div>
                        <button
                          onClick={() => removeAddon(index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-[2px]"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Category Modal */}
        {showAddCategory && (
          <Modal
            onClose={() => { setShowAddCategory(false); setEditingCategory(null); setNewCategoryName(""); }}
            title={editingCategory ? "Edit Category" : "Create New Category"}
          >
            <div className="space-y-4 p-1">
              <InputField
                label="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Starters, Main Course"
              />
              <InputField
                label="Display Order"
                type="number"
                value={newCategoryOrder}
                onChange={(e) => setNewCategoryOrder(parseInt(e.target.value))}
                placeholder="1"
              />
              <div className="flex gap-3 justify-end mt-6">
                <Button onClick={() => setShowAddCategory(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={editingCategory ? handleUpdateCategory : handleAddCategory} variant="primary">
                  {editingCategory ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddMenuItem;
