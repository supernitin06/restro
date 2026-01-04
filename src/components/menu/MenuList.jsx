import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiStar,
  FiCheck,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { List } from "lucide-react";

import StatCard from "../ui/StatCard";
import EditMenuModal from "./EditMenuModal";
import UserFilters from "../ui/UserFilters";

import {
  useGetMenusQuery,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from "../../api/services/menuApi";

/* ---------------- TRANSFORM API DATA ---------------- */

const transformMenuData = (data) => {
  const categoriesMap = {};

  data.forEach((item) => {
    const catId = item.categoryId._id;
    const catName = item.categoryId.name;

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
      bestseller: item.tags?.includes("BEST_SELLER") || false,
    });
  });

  return [
    {
      categories: Object.values(categoriesMap),
    },
  ];
};

/* ---------------- COMPONENT ---------------- */

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* 🔥 API CALL */
  const { data, isLoading, isError, error } = useGetMenusQuery();
  const [deleteMenu] = useDeleteMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();

  /* 🧠 API → UI */
  useEffect(() => {
    if (data?.data) {
      setMenus(transformMenuData(data.data));
    }
  }, [data]);

  /* ---------------- ACTIONS ---------------- */

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
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

  /* ---------------- STATS ---------------- */

  const calculateStats = () => {
    let totalItems = 0;
    let availableItems = 0;
    let bestsellers = 0;

    menus.forEach((menu) => {
      menu.categories.forEach((cat) => {
        cat.subCategories.forEach((sub) => {
          totalItems += sub.items.length;
          availableItems += sub.items.filter((i) => i.available).length;
          bestsellers += sub.items.filter((i) => i.bestseller).length;
        });
      });
    });

    return { totalItems, availableItems, bestsellers };
  };

  const stats = calculateStats();

  /* ---------------- FILTER ---------------- */

  const filteredMenus = menus.map((menu) => ({
    ...menu,
    categories: menu.categories.map((category) => ({
      ...category,
      subCategories: category.subCategories.map((sub) => ({
        ...sub,
        items: sub.items.filter((item) => {
          const matchSearch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchStatus =
            statusFilter === "all" ||
            (statusFilter === "available" && item.available) ||
            (statusFilter === "unavailable" && !item.available) ||
            (statusFilter === "bestseller" && item.bestseller);

          return matchSearch && matchStatus;
        }),
      })),
    })),
  }));

  if (isLoading) return <div>Loading menus...</div>;
  if (isError) {
    if (error?.status === 401) {
      return <div>Please log in to view the menu.</div>;
    }
    return <div>Error loading menu: {error?.data?.message || error?.status || 'Unknown error'}</div>;
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid mt-6 grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Total Items" value={stats.totalItems} icon={List} />
        <StatCard title="Available Now" value={stats.availableItems} icon={FiCheck} />
        <StatCard title="Bestsellers" value={stats.bestsellers} icon={FiStar} />
      </div>

      {/* Filters */}
      <UserFilters
        search={{
          value: searchTerm,
          placeholder: "Search menu items...",
          onChange: setSearchTerm,
        }}
        filters={[
          {
            key: "status",
            value: statusFilter,
            options: [
              { value: "all", label: "All" },
              { value: "available", label: "Available" },
              { value: "unavailable", label: "Unavailable" },
              { value: "bestseller", label: "Bestseller" },
            ],
          },
        ]}
        onFilterChange={(k, v) => k === "status" && setStatusFilter(v)}
      />

      {/* Categories */}
      {filteredMenus.map((menu) =>
        menu.categories.map((category) => (
          <div key={category.categoryId} className="border rounded-xl">
            <div
              onClick={() => toggleCategory(category.categoryId)}
              className="p-5 flex justify-between cursor-pointer"
            >
              <h2 className="text-xl font-bold">{category.name}</h2>
              {expandedCategories[category.categoryId] ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            {expandedCategories[category.categoryId] &&
              category.subCategories.map((sub) =>
                sub.items.map((item) => (
                  <div key={item.itemId} className="p-4 flex justify-between">
                    <span>{item.name}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditItem(item)}>
                        <FiEdit />
                      </button>
                      <button onClick={() => handleDelete(item.itemId)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))
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
