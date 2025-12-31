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
import Button from '../ui/Button';

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
      card
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurantDetail?.imageUrl || "/placeholder.jpg"}
          alt={restaurantDetail?.name}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Status */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>

        {/* Edit / Delete */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <Button
            onClick={() => onEdit(restaurant)}
            className="
              p-2 rounded-full bg-white/90 dark:bg-black/60
              hover:text-blue-600 hover:scale-110
              shadow transition items-center justify-center
            "
          >
            <FiEdit3 size={13} />
          </Button>
          <Button
            onClick={() => onDelete(restaurantId)}
            className="
              p-2 rounded-full bg-white/90 dark:bg-black/60
              hover:text-red-500 hover:scale-110
              shadow transition items-center justify-center
            "
          >
            <FiTrash2 size={13} />
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-4 space-y-2">
        {/* Name + Rating */}
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
            {restaurantDetail?.name || "Restaurant Name"}
          </h2>

          <div className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
            <AiFillStar />
            {restaurantDetail?.rating || "0.0"}
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-1 text-xs text-gray-600 dark:text-gray-300">
          <FiMapPin className="mt-[2px] opacity-70" />
          <span className="line-clamp-2">
            {address?.fullAddress || "Address not available"}
          </span>
        </div>

        {/* Owner + Phone */}
        <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <FiUser className="opacity-70" />
            {basicInfo?.ownerName || "-"}
          </div>
          <div className="flex items-center gap-1">
            <FiPhone className="opacity-70" />
            {basicInfo?.contactNumber || "-"}
          </div>
        </div>

        {/* GST + Commission */}
        <div className="flex justify-between items-center text-xs pt-1">
          <div className="flex items-center gap-1">
            {gst?.gstVerified ? (
              <FiCheckCircle className="text-green-500" />
            ) : (
              <FiXCircle className="text-red-500" />
            )}
            <span className="text-gray-600 dark:text-gray-300">
              {gst?.gstVerified ? "GST Verified" : "GST Not Verified"}
            </span>
          </div>

          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {restaurantDetail?.commissionPercentage || 0}%
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/10 my-2" />

        {/* ACTIONS */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => onApprove(restaurantId)}
            disabled={status === "Approved"}
            variant="active"
            size="sm"
            className={`
              w-full
              ${status === "Approved" ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            Approve
          </Button>

          <Button
            onClick={() => onSuspend(restaurantId)}
            disabled={status === "Suspended"}
            variant="inactive"
            size="sm"
            className={`
              w-full
              ${status === "Suspended" ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            Suspend
          </Button>

          <Button
            onClick={() => onView(restaurant)}
            variant="primary"
            size="sm"
            className="w-full hover:scale-105"
          >
            <FiEye size={12} />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
