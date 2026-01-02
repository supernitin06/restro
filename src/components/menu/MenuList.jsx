import React, { useEffect, useState } from "react";
import ActionButtons from "../ui/ActionButton";
import Table from "../ui/Table";
import menuData from "../../assets/json/menu.json";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditMenuModal from "./EditMenuModal";

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
      bestseller: item.tags.includes('BEST_SELLER')
    });
  });
  return {
    menus: [{
      categories: Object.values(categoriesMap)
    }]
  };
};

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("menuData");
    if (saved) {
      setMenus(JSON.parse(saved).menus);
    } else {
      setMenus(transformMenuData(menuData.data).menus);
    }
  }, []);

  // 🔴 DELETE WORKING
  const handleDelete = (itemId) => {
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
  };

  // 🟢 EDIT SAVE WORKING
  const handleEditSave = (updatedItem) => {
    const updated = { menus: [...menus] };

    updated.menus.forEach(menu => {
      menu.categories.forEach(cat => {
        cat.subCategories.forEach(sub => {
          sub.items = sub.items.map(item =>
            item.itemId === updatedItem.itemId ? updatedItem : item
          );
        });
      });
    });

    setMenus(updated.menus);
    localStorage.setItem("menuData", JSON.stringify(updated));
  };

  return (
    <>
      <div className="space-y-6">
        {menus.map((menu) =>
          menu.categories.map((category) => (
            <div key={category.categoryId} className="card">
              <h2 className="text-lg font-semibold mb-2">
                {category.name} ({category.status})
              </h2>

              {category.subCategories.map((subCat) => (
                <div key={subCat.subCategoryId} className="ml-6 mt-4">
                  <Table
                    data={subCat.items}
                    columns={[
                      { header: "Name", key: "name" },
                      { header: "Price", key: "price" },
                      { header: "Discount", key: "discountPrice", render: (item) => item.discountPrice || "-" },
                      { header: "Available", key: "available", render: (item) => item.available ? "Yes" : "No" },
                      { header: "Veg", key: "veg", render: (item) => item.veg ? "Veg" : "Non-Veg" },
                      { header: "Bestseller", key: "bestseller", render: (item) => item.bestseller ? "⭐" : "-" },
                    ]}
                    actions={[
                      {
                        key: "edit",
                        icon: FiEdit,
                        label: "Edit",
                        color: "blue",
                        onClick: (item) => setEditItem(item),
                      },
                      {
                        key: "delete",
                        icon: FiTrash2,
                        label: "Delete",
                        color: "rose",
                        onClick: (item) => handleDelete(item.itemId),
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* 🟢 EDIT MODAL */}
      <EditMenuModal
        open={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleEditSave}
      />
    </>
  );
};

export default MenuList;
