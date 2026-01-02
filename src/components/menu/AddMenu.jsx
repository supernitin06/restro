// src/components/menu/AddMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ie", label: "Irish", flag: "🇮🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
];

const categories = [
  { _id: "695779ff6fc3958cd3972df2", name: "Starters" },
  { _id: "695779ff6fc3958cd3972df5", name: "Main Course" },
  { _id: "695779ff6fc3958cd3972df9", name: "Breads" },
  { _id: "695779ff6fc3958cd3972dfd", name: "Desserts" },
  { _id: "695779ff6fc3958cd3972e00", name: "Beverages" },
];

const tagsList = ["BEST_SELLER", "CHEF_SPECIAL", "SPICY"];

const AddMenuItem = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState(categories[0]._id);
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

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const categoryObj = categories.find((cat) => cat._id === category);

    const newItem = {
      _id: Date.now().toString(),
      restaurantId: "69576acfd4e05e92cee77736",
      categoryId: { _id: categoryObj._id, name: categoryObj.name },
      name,
      basePrice: parseFloat(price),
      foodType,
      isVeg,
      tags,
      isAvailable: available,
      variants: [],
      addons: [],
      image: photo || null,
      description,
      pricingOptions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem("menuData");
    const menuData = existing ? JSON.parse(existing) : [];
    menuData.push(newItem);
    localStorage.setItem("menuData", JSON.stringify(menuData));

    alert(t('menuItemSaved'));
    navigate("/menu-management/1");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div>
            <h1 className="text-heading">{t('addMenuItem')}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
              {t('addNewItem')}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button onClick={() => navigate("/menu-management/1")} variant="outline">
              ← {t('back')}
            </Button>
            <Button onClick={handleSave} variant="primary">
              {t('save')}
            </Button>
          </div>
        </div>

        {/* Form */}
        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <Button variant="outline" size="sm">{t('translate')}</Button>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('category')}</label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories.map((cat) => ({ value: cat._id, label: cat.name }))}
              />
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
    </div>
  );
};

export default AddMenuItem;
