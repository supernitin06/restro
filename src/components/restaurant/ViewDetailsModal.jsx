import React from "react";
import Button from "../ui/Button";

const ViewDetailsModal = ({ restaurant, onClose, onApprove, onSuspend }) => {
  if (!restaurant) return null;

  const { restaurantDetail, status, restaurantId } = restaurant;
  const basicInfo = restaurantDetail?.basicInfo || {};
  const gst = restaurantDetail?.gst || {};
  const address = restaurantDetail?.address || {};

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const handleApprove = () => {
    if (onApprove) onApprove(restaurantId);
  };

  const handleSuspend = () => {
    if (onSuspend) onSuspend(restaurantId);
  };

  // Button styles based on status
  const approveStyle =
    status === "Approved"
      ? "bg-green-300 opacity-50 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700";

  const suspendStyle =
    status === "Suspended"
      ? "bg-red-300 opacity-50 cursor-not-allowed"
      : status === "Approved"
        ? "bg-red-600 hover:bg-red-700"
        : "bg-red-500 hover:bg-red-600";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl">
        {/* Header */}
        <div className="bg-gradient-sidebar p-5 text-white rounded-t-3xl">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{restaurantDetail?.name}</h2>
            <Button
              className="text-white hover:text-white/80 text-2xl font-semibold transition p-0 bg-transparent shadow-none w-auto"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full font-medium text-white">
              ⭐ {restaurantDetail?.rating || "-"}
            </span>
            <span className="text-white/70">•</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-medium text-white">
              {restaurantDetail?.tables || 0} Tables
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Info</h3>
            <div className="space-y-1 text-gray-700 text-sm">
              <p className="flex items-center gap-1">📍 {address?.fullAddress || "N/A"}</p>
              <p className="flex items-center gap-1">📞 {basicInfo?.contactNumber || "-"}</p>
              <p className="flex items-center gap-1">✉️ {basicInfo?.email || "-"}</p>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Details</h3>
            <div className="grid grid-cols-1 gap-1 text-gray-700 text-sm">
              <p><span className="font-medium">Owner:</span> {basicInfo?.ownerName || "-"}</p>
              <p><span className="font-medium">Timings:</span> {basicInfo?.openingHours || "-"}</p>
              <p><span className="font-medium">Cuisine:</span> {basicInfo?.cuisine ? basicInfo.cuisine.join(", ") : "-"}</p>
              <p><span className="font-medium">Commission:</span> {restaurantDetail?.commissionPercentage}%</p>
              <p><span className="font-medium">Joined:</span> {restaurantDetail?.joinedDate || "-"}</p>
              <p><span className="font-medium">GST No:</span> {gst?.gstNumber || "-"}</p>
              <p><span className="font-medium">Bank Details:</span> {basicInfo?.bankDetails || "-"}</p>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-3 rounded-lg shadow border border-gray-200 text-center transition hover:scale-105">
                <div className="text-2xl font-bold text-red-500">{restaurantDetail?.orders || 0}</div>
                <div className="text-xs text-gray-500 mt-1">Total Orders</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow border border-gray-200 text-center transition hover:scale-105">
                <div className="text-2xl font-bold text-red-500">
                  {formatCurrency(restaurantDetail?.revenue || 0).split(".")[0]}
                </div>
                <div className="text-xs text-gray-500 mt-1">Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-6">
          {/* Approve Button */}
          <Button
            variant="active"
            className={`py-2 px-4 text-sm ${status === "Approved" ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleApprove}
            disabled={status === "Approved"}
          >
            Approve
          </Button>

          {/* Suspend Button */}
          <Button
            variant="inactive"
            className={`py-2 px-4 text-sm ${status === "Suspended" || status === "Approved" ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSuspend}
            disabled={status === "Suspended" || status === "Approved"}
          >
            Suspend
          </Button>

          {/* Close Button */}
          <Button
            className="py-2 px-4 text-sm border border-gray-400 text-gray-700 hover:bg-gray-50 bg-white"
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
