import React, { useState } from "react";
import restaurantData from "../assets/json/resturant.json";
import SearchFilterBar from "../components/restaurant/SearchFilterBar";
import RestaurantStats from "../components/restaurant/RestaurantStats";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import ViewDetailsModal from "../components/restaurant/ViewDetailsModal";
import EditRestaurantModal from "../components/restaurant/EditRestaurantModal";

function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState(
    restaurantData.restaurantManagement.restaurantList
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ===== Handlers =====
  const handleApprove = (id) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.restaurantId === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const handleSuspend = (id) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.restaurantId === id ? { ...r, status: "Suspended" } : r
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants((prev) =>
        prev.filter((r) => r.restaurantId !== id)
      );
    }
  };

  const handleEdit = (r) => setEditRestaurant({ ...r });

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
    <div className="min-h-screen bg-[var(--bg-soft)] p-4 md:p-8">

      {/* ===== PREMIUM HEADER ===== */}
      <div className="card mb-6 p-6">
        <h1 className="text-3xl font-bold text-primary mb-1">
          Restaurant Management
        </h1>
        <p className="text-secondary text-sm">
          Manage restaurant pricing, rules, and priorities across your platform.
        </p>
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* ===== STATS ===== */}
      <RestaurantStats restaurants={restaurants} />

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
    </div>
  );
}

export default RestaurantManagement;
