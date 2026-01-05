import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
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
  const [addMenu] = useAddMenuMutation();

  const categories = categoriesData?.data || [];

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(1);
  const [showAddCategory, setShowAddCategory] = useState(false);



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

    try {
      const result = await addCategory({
        restaurantId,
        name: newCategoryName,
        order: newCategoryOrder,
      }).unwrap();

      alert("Category added successfully!");
      await refetchCategories(); // Refresh categories list
      setCategory(result._id); // Auto-select the new category
      setNewCategoryName("");
      setNewCategoryOrder(1);
      setShowAddCategory(false);
    } catch (err) {
      console.error("Add category failed", err);
      alert("Failed to add category. Please try again.");
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

      alert(t("menuItemSaved"));
      navigate("/menu-management");
    } catch (err) {
      console.error("Add menu failed", err);
      alert("Failed to save menu item");
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
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('category')}</label>
            <div className="flex gap-2">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories.map((cat) => ({ value: cat._id, label: cat.name }))}
                className="flex-1"
              />
              <Button onClick={() => setShowAddCategory(!showAddCategory)} variant="outline" size="sm">
                + Add
              </Button>
            </div>
            {showAddCategory && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                <h3 className="font-medium mb-3">Add New Category</h3>
                <div className="space-y-3">
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
                  <div className="flex gap-2">
                    <Button onClick={handleAddCategory} variant="primary" size="sm">
                      Add Category
                    </Button>
                    <Button onClick={() => setShowAddCategory(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Button variant="outline" size="sm">
                    {t('choose')}
                  </Button>
                </label>
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
    </div>
  );
};

export default AddMenuItem;
