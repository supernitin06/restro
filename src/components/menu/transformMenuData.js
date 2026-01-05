const transformMenuData = (data = []) => {
  const categoriesMap = {};

  data.forEach((item) => {
    const catId = item.categoryId && item.categoryId._id;
    const catName =
      (item.categoryId && item.categoryId.name) || "Uncategorized";

    if (!categoriesMap[catId]) {
      categoriesMap[catId] = {
        categoryId: catId,
        name: catName,
        status: "active",
        subCategories: [
          {
            subCategoryId: catId + "_sub",
            name: catName,
            status: "active",
            items: [],
          },
        ],
      };
    }

    categoriesMap[catId].subCategories[0].items.push({
      itemId: item._id,
      name: item.name,
      price: item.basePrice,
      discountPrice: null,
      available: item.isAvailable,
      veg: item.isVeg,
      bestseller:
        Array.isArray(item.tags) && item.tags.includes("BEST_SELLER"),
    });
  });

  return {
    menus: [
      {
        categories: Object.values(categoriesMap),
      },
    ],
  };
};

export default transformMenuData;
