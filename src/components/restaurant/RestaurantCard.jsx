import React from "react";
import {
  FiEdit3,
  FiTrash2,
  FiMapPin,
  FiPhone,
  FiUser,
  FiEye,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const RestaurantCard = ({
  restaurant,
  onApprove,
  onSuspend,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
}) => {
  const { restaurantDetail, status, restaurantId } = restaurant;
  const basicInfo = restaurantDetail?.basicInfo || {};
  const gst = restaurantDetail?.gst || {};
  const address = restaurantDetail?.address || {};

  return (
    <div
      className="
        group relative bg-white rounded-2xl
        border border-gray-100
        shadow-sm hover:shadow-md
        transition-shadow duration-200
        overflow-hidden
      "
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurantDetail?.imageUrl || "/placeholder.jpg"}
          alt={restaurantDetail?.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

        {/* Status */}
        <span
          className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>

        {/* Hover Edit/Delete */}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(restaurant)}
            className="p-1.5 rounded-full bg-white shadow hover:text-blue-600"
          >
            <FiEdit3 size={13} />
          </button>
          <button
            onClick={() => onDelete(restaurantId)}
            className="p-1.5 rounded-full bg-white shadow hover:text-red-600"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-1.5">
        {/* Name + Rating */}
        <div className="flex justify-between items-start">
          <h2 className="text-[15px] font-semibold text-gray-900 leading-tight line-clamp-1">
            {restaurantDetail?.name || "Restaurant Name"}
          </h2>

          <div className="flex items-center gap-0.5 text-[11px] font-medium text-gray-800">
            <AiFillStar className="text-yellow-500 text-xs" />
            {restaurantDetail?.rating || "0.0"}
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-1 text-[12px] text-gray-600 leading-tight">
          <FiMapPin className="mt-[2px] text-gray-400" />
          <span className="line-clamp-2">
            {address?.fullAddress || "Address not available"}
          </span>
        </div>

        {/* Owner + Phone */}
        <div className="flex justify-between text-[12px] text-gray-700">
          <div className="flex items-center gap-1">
            <FiUser className="text-gray-400" />
            {basicInfo?.ownerName || "-"}
          </div>
          <div className="flex items-center gap-1">
            <FiPhone className="text-gray-400" />
            {basicInfo?.contactNumber || "-"}
          </div>
        </div>

        {/* GST + Commission */}
        <div className="flex justify-between items-center text-[12px] pt-0.5">
          <div className="flex items-center gap-1">
            {gst?.gstVerified ? (
              <FiCheckCircle className="text-green-600" />
            ) : (
              <FiXCircle className="text-red-500" />
            )}
            <span className="text-gray-700">
              {gst?.gstVerified ? "GST Verified" : "GST Not Verified"}
            </span>
          </div>

          <span className="text-sm font-semibold text-indigo-700">
            {restaurantDetail?.commissionPercentage || 0}%
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-1.5" />

        {/* Actions */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => onApprove(restaurantId)}
            disabled={status === "Approved"}
            className={`py-1.5 rounded-lg text-[10px] font-semibold ${
              status === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-green-500 text-white"
            }`}
          >
            Approve
          </button>

          <button
            onClick={() => onSuspend(restaurantId)}
            disabled={status === "Suspended"}
            className={`py-1.5 rounded-lg text-[10px] font-semibold ${
              status === "Suspended"
                ? "bg-red-100 text-red-700"
                : "bg-red-500 text-white"
            }`}
          >
            Suspend
          </button>

          <button
            onClick={() => onView(restaurant)}
            className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold bg-gray-900 text-white"
          >
            <FiEye size={11} />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
