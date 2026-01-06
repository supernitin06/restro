import React, { useState } from "react";
import SearchFilterBar from "../components/restaurant/SearchFilterBar";
import RestaurantStats from "../components/restaurant/RestaurantStats";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import ViewDetailsModal from "../components/restaurant/ViewDetailsModal";
import EditRestaurantModal from "../components/restaurant/EditRestaurantModal";
import {
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useToggleRestaurantStatusMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} from "../api/services/resturentsapi";

function RestaurantManagement() {
  const { data, isLoading, isError, refetch } = useGetRestaurantsQuery();
  const [toggleStatus] = useToggleRestaurantStatusMutation();
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const [updateRestaurant] = useUpdateRestaurantMutation();
  

  const restaurants = Array.isArray(data?.data) ? data.data : data ? [data] : [];

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const { data: restaurantDetails } = useGetRestaurantByIdQuery(
    selectedRestaurantId,
    { skip: !selectedRestaurantId } // only fetch if an ID exists
  );

  const [editRestaurant, setEditRestaurant] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ===== Handlers =====
const handleApprove = async (id) => {
  try {
    await toggleStatus(id).unwrap();
    refetch();
  } catch (err) {
    console.error("Approve failed", err);
  }
};


const handleSuspend = async (id) => {
  try {
    await toggleStatus(id).unwrap();
    refetch();
  } catch (err) {
    console.error("Suspend failed", err);
  }
};



const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    await deleteRestaurant(id).unwrap();
    refetch();
  } catch (err) {
    console.error("Delete failed", err);
  }
};
const handleUpdate = async () => {
  if (!editRestaurant) return;

  try {
    await updateRestaurant({
      id: editRestaurant._id,
      body: {
        name: editRestaurant.name,
        brandName: editRestaurant.brandName,
        logo: editRestaurant.logo,
      },
    }).unwrap();

    setEditRestaurant(null);
    refetch();
  } catch (err) {
    console.error("Update failed", err);
  }
};



  const handleEdit = (restaurant) => setEditRestaurant({ ...restaurant });
  const handleView = (restaurant) => setSelectedRestaurantId(restaurant._id);

  const handleCloseModal = () => {
    setSelectedRestaurantId(null);
  };

 

  // ===== Filtered Restaurants =====
const filteredRestaurants = restaurants.filter((r) => {
  const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());

  // handle boolean or string API response
  let matchesStatus = true;
  if (statusFilter === "Approved") {
    matchesStatus = r.isActive === "active" || r.isActive === true;
  } else if (statusFilter === "Suspended") {
    matchesStatus = r.isActive === "suspended" || r.isActive === false;
  }

  return matchesSearch && matchesStatus;
});


  const getStatusColor = (isActive) =>
    isActive ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300";

  if (isLoading) return <div className="p-8">Loading restaurants...</div>;
  if (isError) return <div className="p-8 text-red-500">Error loading restaurants</div>;

  return (
    <div className="page page-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 mb-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
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

      {/* Search & Filter */}
<SearchFilterBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm} // ✅ pass the setter directly
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  onAddNew={() => console.log("Add new clicked")}
/>


      {/* Stats */}


      {isLoading && <p className="text-center mt-6">Loading restaurants...</p>}
      {isError && <p className="text-center mt-6 text-red-500">Failed to load restaurants</p>}

      {/* Restaurant Grid */}
      <RestaurantGrid
         filteredRestaurants={filteredRestaurants}
        onApprove={handleApprove}
        onSuspend={handleSuspend}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getStatusColor={getStatusColor}
      />

      {/* View Details Modal */}
      {selectedRestaurantId && (
        <ViewDetailsModal
          restaurant={restaurantDetails?.data} // full details from API
          onClose={handleCloseModal} // ✅ FIXED
          onApprove={handleApprove}
          onSuspend={handleSuspend}
        />
      )}

      {/* Edit Modal */}
     {editRestaurant && (
  <EditRestaurantModal
    editRestaurant={editRestaurant}
    setEditRestaurant={setEditRestaurant}
    onCancel={() => setEditRestaurant(null)}
    onSave={handleUpdate}
  />
)}
    </div>
  );
}

export default RestaurantManagement;
