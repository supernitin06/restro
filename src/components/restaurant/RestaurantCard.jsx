import React, { useState } from "react";
import { FiEdit3, FiTrash2, FiEye } from "react-icons/fi";
import Button from "../ui/Button";

const RestaurantCard = ({
  restaurant,
  onApprove,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
}) => {
  if (!restaurant) return null;

  const isActive = Boolean(restaurant.isActive); // ✅ SAFE
  const restaurantId = restaurant._id;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {/* CARD */}
      <div className="card group border rounded-xl overflow-hidden shadow hover:shadow-lg transition">

        {/* IMAGE */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={restaurant.logo || "/placeholder.jpg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />

          {/* STATUS BADGE */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold ${getStatusColor(
              isActive
            )}`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>

          {/* EDIT / DELETE */}
          <div className="absolute top-3 right-3 flex gap-3 opacity-0 group-hover:opacity-100 transition">
            <button onClick={() => onEdit(restaurant)}>
              <FiEdit3 className="text-white hover:text-blue-400" />
            </button>

            <button onClick={() => setShowDeleteModal(true)}>
              <FiTrash2 className="text-white hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-4 py-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">
            {restaurant.name || "Unnamed"}
          </h2>

          {/* ACTIVE / DEACTIVE STATUS */}


          <div className="h-px bg-gray-200" />

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-2">

            <Button
  onClick={() => onApprove(restaurantId)} // or any handler
  size="sm"
  className={`py-2 px-4 rounded-lg text-white transition-colors duration-300 ease-in-out
    ${isActive ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
>
  {isActive ? "Active" : "Inactive"}
</Button>


            <Button
              onClick={() => onView(restaurant)}
              variant="primary"
              size="sm"
            >
              <FiEye size={12} /> View
            </Button>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-red-200">

            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                <FiTrash2 size={26} />
              </div>
            </div>

            <h2 className="text-lg font-bold text-center text-gray-800">
              Delete Restaurant?
            </h2>

            <p className="text-sm text-center text-gray-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                className="flex-1"
                onClick={() => {
                  onDelete(restaurantId);
                  setShowDeleteModal(false);
                }}
              >
                Delete
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantCard;
