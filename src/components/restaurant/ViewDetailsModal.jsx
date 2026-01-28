import React from "react";
import Button from "../ui/Button";
import { X } from "lucide-react"; // optional icon for close

const ViewDetailsModal = ({ restaurant, onClose, onApprove, onSuspend }) => {
  if (!restaurant) return null;

  const { _id, name, brandName, logo, isActive, createdAt, updatedAt } = restaurant;

  const handleApprove = () => onApprove && onApprove(_id);
  const handleSuspend = () => onSuspend && onSuspend(_id);

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50 backdrop-blur-sm bg-white/30">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold truncate">{name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="md:col-span-2 flex gap-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="w-24 h-24 rounded-xl shadow-md border border-gray-200 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl shadow-md border border-gray-200 bg-gray-200 flex items-center justify-center text-gray-400 font-bold">No Logo</div>
            )}
            <div className="text-gray-700 space-y-1">
              <p className="text-lg font-semibold text-gray-900">{brandName}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isActive ? "Active" : "Suspended"}
                </span>
              </div>
              <p className="text-xs text-gray-500">Created: {new Date(createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500">Last Update: {new Date(updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Address Info */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 border-b pb-1">Address Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              {restaurant.address ? (
                <>
                  <p><span className="font-semibold">Street:</span> {restaurant.address.street || "N/A"}</p>
                  <p><span className="font-semibold">City:</span> {restaurant.address.city || "N/A"}</p>
                  <p><span className="font-semibold">State:</span> {restaurant.address.state || "N/A"}</p>
                  <p><span className="font-semibold">Zip:</span> {restaurant.address.zipCode || "N/A"}</p>
                  <p><span className="font-semibold">Country:</span> {restaurant.address.country || "N/A"}</p>
                </>
              ) : (
                <p className="italic text-gray-400">No address provided</p>
              )}
            </div>
          </div>

          {/* Location & Ratings */}
          <div className="space-y-4">
            {/* Ratings */}
            <div>
              <h3 className="font-bold text-gray-900 border-b pb-1">Performance</h3>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg border border-yellow-200">
                  <span className="text-xl font-bold">{restaurant.ratings?.average || 0}</span>
                  <span className="text-xs">/ 5</span>
                </div>
                <div className="text-sm text-gray-500">
                  Based on <span className="font-semibold text-gray-900">{restaurant.ratings?.totalReviews || 0}</span> reviews
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div>
              <h3 className="font-bold text-gray-900 border-b pb-1">Geo Location</h3>
              <div className="mt-2 text-sm text-gray-600">
                {restaurant.location?.coordinates ? (
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                    {restaurant.location.coordinates[1]}, {restaurant.location.coordinates[0]}
                    <br />
                    <span className="text-[10px] text-gray-400">(Lat, Long)</span>
                  </p>
                ) : (
                  <p className="italic text-gray-400">No coordinates set</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
          <Button
            variant="active"
            className={`py-2 px-4 rounded-lg text-white transition ${isActive ? "opacity-50 cursor-not-allowed bg-green-300" : "bg-green-600 hover:bg-green-700"
              }`}
            onClick={handleApprove}
            disabled={isActive}
          >
            Approve
          </Button>

          <Button
            variant="inactive"
            className={`py-2 px-4 rounded-lg text-white transition ${!isActive ? "opacity-50 cursor-not-allowed bg-red-300" : "bg-red-600 hover:bg-red-700"
              }`}
            onClick={handleSuspend}
            disabled={!isActive}
          >
            Suspend
          </Button>

          <Button
            className="py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
