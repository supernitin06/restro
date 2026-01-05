import React, { useState } from "react";
import SearchFilterBar from "../components/restaurant/SearchFilterBar";
import RestaurantStats from "../components/restaurant/RestaurantStats";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import ViewDetailsModal from "../components/restaurant/ViewDetailsModal";
import EditRestaurantModal from "../components/restaurant/EditRestaurantModal";
import AddRestaurantModal from "../components/restaurant/AddRestaurantModal";

function RestaurantManagement() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  

  const handleEdit = (r) => setEditRestaurant({ ...r });

  const handleAddNew = () => setIsAddModalOpen(true);

  const handleAddSave = async (restaurantData) => {
    try {
      await createRestaurant(restaurantData).unwrap();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    }
  };

  // ===== Filtered Restaurants =====
  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      r.restaurantDetail.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      r.address.fullAddress
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ===== Status Color Function =====
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Suspended":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border";
    }
  };

  return (
    <div className="page page-background ">

      {/* ===== PREMIUM HEADER ===== */}
      <div className="flex bg-primary flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            Restaurant Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Manage restaurant pricing, rules, and priorities across your platform.
          </p>
        </div>
      </div>
      <RestaurantStats restaurants={restaurants} />

      {/* ===== SEARCH & FILTER ===== */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddNew={handleAddNew}
      />

      {/* ===== STATS ===== */}

      {/* ===== RESTAURANT GRID ===== */}
      <RestaurantGrid
        filteredRestaurants={filteredRestaurants}
        onApprove={handleApprove}
        onSuspend={handleSuspend}
        onView={setSelectedRestaurant}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getStatusColor={getStatusColor} // ✅ PASS
      />

      {/* ===== VIEW DETAILS MODAL ===== */}
      <ViewDetailsModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onApprove={handleApprove}
        onSuspend={handleSuspend}
      />

      {/* ===== EDIT MODAL ===== */}
      <EditRestaurantModal
        editRestaurant={editRestaurant}
        setEditRestaurant={setEditRestaurant}
        onCancel={() => setEditRestaurant(null)}
      />

      {/* ===== ADD RESTAURANT MODAL ===== */}
      <AddRestaurantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSave}
      />
    </div>
  );
}

export default RestaurantManagement;
