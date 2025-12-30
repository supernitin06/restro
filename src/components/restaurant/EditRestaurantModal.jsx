import React from "react";

const EditRestaurantModal = ({
  editRestaurant,
  setEditRestaurant,
  onSave,
  onCancel,
}) => {
  if (!editRestaurant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Edit Restaurant</h2>
            <button
              className="text-white hover:text-red-200 text-2xl"
              onClick={onCancel}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.name}
                onChange={(e) =>
                  setEditRestaurant({ ...editRestaurant, name: e.target.value })
                }
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.rating}
                onChange={(e) =>
                  setEditRestaurant({
                    ...editRestaurant,
                    rating: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            {/* Number of Tables */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Tables
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.table}
                onChange={(e) =>
                  setEditRestaurant({
                    ...editRestaurant,
                    table: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.basicInfo.address}
                onChange={(e) =>
                  setEditRestaurant({
                    ...editRestaurant,
                    basicInfo: {
                      ...editRestaurant.basicInfo,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.basicInfo.phone}
                onChange={(e) =>
                  setEditRestaurant({
                    ...editRestaurant,
                    basicInfo: {
                      ...editRestaurant.basicInfo,
                      phone: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.status}
                onChange={(e) =>
                  setEditRestaurant({ ...editRestaurant, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Commission Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Percentage
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editRestaurant.commissionPercentage}
                onChange={(e) =>
                  setEditRestaurant({
                    ...editRestaurant,
                    commissionPercentage: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={onSave}
              >
                Save Changes
              </button>
              <button
                className="flex-1 py-3 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRestaurantModal;