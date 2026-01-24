import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Phone,
  MapPin,
  Truck,
  Bike,
  Eye,
  Info,
  Edit,
  User,
} from "lucide-react";
import DeliveryPartnerStatusBadge from "./DeliveryPartnerStatusBadge";
import Button from "../ui/Button";
import Card from "../ui/GlassCard";
import { useUpdateDeliveryPartnerMutation } from "../../api/services/deliveryPartnerApi";
import PartnerOrderHistoryModal from "./PartnerOrderHistoryModal";

const DeliveryPartner = ({
  partners,
  onViewDetails,
  onEdit,
  viewMode = "grid",
}) => {
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [updateDeliveryPartner] = useUpdateDeliveryPartnerMutation();

  const toggleStatus = async (partner) => {
    const currentStatus = partner.listView.status;
    const newIsActive = currentStatus !== "Active";

    try {
      await toast.promise(
        updateDeliveryPartner({
          id: partner.partnerId,
          isActive: newIsActive,
        }).unwrap(),
        {
          loading: "Updating status...",
          success: `Partner ${newIsActive ? "activated" : "deactivated"}!`,
          error: "Failed to update status",
        },
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleViewOrders = (e, id) => {
    e.stopPropagation();
    setSelectedPartnerId(id);
    setShowOrdersModal(true);
  };

  const handleDetailsClick = (e, partner) => {
    e.stopPropagation();
    onViewDetails(partner);
  };

  const handleEditClick = (e, partner) => {
    e.stopPropagation();
    onEdit(partner);
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-3 mt-6">
        {partners.map((partner) => {
          // 1️⃣ FIRST: destructure
          const {
            name,
            phone,
            profileImage,
            status,
            kyc,
            assignedOrders,
            vehicle,
          } = partner;

          const topVehicleType = partner.vehicleType;
          const topVehicleNumber = partner.vehicleNumber;

          const partnerId = partner._id;
          const listView = {
            name,
            phone,
            status,
            vehicleType: vehicle?.type || topVehicleType || "N/A",
            vehicleNumber:
              vehicle?.number || topVehicleNumber || "Not Assigned",
            vehicleModel: vehicle?.model || "N/A",
            assignedOrdersCount: assignedOrders?.length || 0,
            kycStatus: kyc?.status || "N/A",
            city: partner.address?.city || "N/A", // <-- remove this
            fullAddress: partner.address
              ? `${partner.address.street || ""}, ${partner.address.area || ""}, ${partner.address.city || ""}, ${partner.address.state || ""}, ${partner.address.zipCode || ""}`
                  .replace(/(,\s?)+$/, "")
                  .replace(/,\s?,/g, ", ")
              : "N/A",
          };

          // 4️⃣ NOW it is safe to use listView
          const isActive = listView.status === "Active";

          // 5️⃣ Other helpers
          const registrationData = { name };
          const profileImg = profileImage;
          return (
            <Card
              key={partnerId}
              className="p-5 group hover:border-primary/50 transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => onViewDetails(partner)}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Partner Info */}
                <div className="md:col-span-3 flex items-center gap-3 min-w-0">
                  <img
                    src={profileImg}
                    className="w-11 h-11 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                    alt={registrationData?.name}
                  />
                  <div className="min-w-0">
                    <p
                      className="font-bold text-sm text-gray-900 dark:text-white truncate"
                      title={listView.name}
                    >
                      {listView.name}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      ID: #{partnerId ? partnerId.slice(-6) : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Contact & Vehicle */}
                <div className="md:col-span-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Phone size={13} className="text-blue-500" />
                    <span className="font-medium">{listView.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    {listView?.vehicle?.type === "BIKE" ? (
                      <Bike size={13} className="text-purple-500" />
                    ) : (
                      <Truck size={13} className="text-purple-500" />
                    )}

                    <span className="capitalize font-medium">
                      {listView?.vehicle?.type
                        ? listView.vehicle.type.toLowerCase()
                        : "n/a"}
                    </span>
                  </div>
                </div>

                {/* Orders & KYC */}
                <div className="md:col-span-2 text-xs flex flex-col gap-1">
                  <p className="text-gray-500 dark:text-gray-400">
                    Orders:{" "}
                    <span className="font-bold text-gray-800 dark:text-white">
                      {listView.assignedOrdersCount}
                    </span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    KYC:{" "}
                    <span
                      className={`font-bold ${
                        listView.kycStatus === "VERIFIED" ||
                        listView.kycStatus === "APPROVED"
                          ? "text-green-500"
                          : listView.kycStatus === "PENDING"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {listView.kycStatus}
                    </span>
                  </p>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <DeliveryPartnerStatusBadge status={listView.status} />
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDetailsClick(e, partner)}
                  >
                    <Info size={14} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleEditClick(e, partner)}
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleViewOrders(e, partnerId)}
                  >
                    <Eye size={14} />
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Assign Order");
                    }}
                  >
                    Assign
                  </Button>

                  <Button
                    variant={isActive ? "danger" : "success"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(partner);
                    }}
                  >
                    {isActive ? "Off" : "On"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
        {showOrdersModal && (
          <PartnerOrderHistoryModal
            partnerId={selectedPartnerId}
            onClose={() => setShowOrdersModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {partners.map((partner) => {
          const { partnerId, listView, registrationData } = partner;
          const isActive = listView.status === "Active";
          const profileImage =
            registrationData?.image ||
            `${import.meta.env.VITE_API_URL}admin/uploads/delivery/${registrationData?.image}`;

          return (
            <div className="relative h-[340px]" key={partnerId}>
              {/* Normal Card - Always Visible */}
              <Card
                className="absolute inset-0 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6 overflow-hidden z-10 bg-white dark:bg-gray-900"
                onClick={() => onViewDetails(partner)}
              >
                {/* Clean Solid Background - No blur */}
                <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>

                {/* Profile Image - Clear */}
                <div className="relative mb-4 z-10">
                  <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden">
                    {profileImage && profileImage.includes("http") ? (
                      <img
                        src={profileImage}
                        className="w-full h-full object-cover"
                        alt={registrationData?.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                              <User size={28} class="text-white" />
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <User size={28} className="text-white" />
                      </div>
                    )}
                  </div>
                  {/* Active Dot */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 ${isActive ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>

                {/* Name - Clear */}
                <h3 className="text-base font-bold text-gray-900 dark:text-white text-center mb-1 px-2 truncate w-full z-10">
                  {registrationData?.name || listView.name}
                </h3>

                {/* ID - Clear */}
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2 z-10">
                  ID: {partnerId.slice(-6)}
                </p>

                {/* Status Badge - Clear */}
                <div className="mb-2 z-10">
                  <DeliveryPartnerStatusBadge status={listView.status} />
                </div>

                {/* Quick Stats - Clear */}
                <div className="flex gap-4 mt-2 z-10">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      Orders
                    </p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {listView.assignedOrdersCount || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      KYC
                    </p>
                    <p
                      className={`text-xs font-bold ${
                        listView.kycStatus === "VERIFIED" ||
                        listView.kycStatus === "APPROVED"
                          ? "text-green-500"
                          : listView.kycStatus === "PENDING"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {listView.kycStatus?.slice(0, 3) || "N/A"}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Hover Card - Shows on Hover */}
              <Card className="absolute inset-0 p-2 flex flex-col justify-between opacity-0 hover:opacity-100 transition-all duration-300 z-20 bg-white dark:bg-gray-900">
                {/* Content Container */}
                <div className="h-full flex flex-col">
                  {/* Top Section */}
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                          {registrationData?.name || listView.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">
                          ID: {partnerId.slice(-6)}
                        </p>
                      </div>
                      <DeliveryPartnerStatusBadge status={listView.status} />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Phone
                            size={12}
                            className="text-blue-600 dark:text-blue-400"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-400">
                            Phone
                          </p>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">
                            {registrationData?.mobileNumber ||
                              listView.phone ||
                              "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          {registrationData?.vehicleType === "Bike" ? (
                            <Bike
                              size={12}
                              className="text-purple-600 dark:text-purple-400"
                            />
                          ) : (
                            <Truck
                              size={12}
                              className="text-purple-600 dark:text-purple-400"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-400">
                            Vehicle
                          </p>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white capitalize">
                            {registrationData?.vehicleType ||
                              listView.vehicleType ||
                              "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <MapPin
                            size={12}
                            className="text-orange-600 dark:text-orange-400"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-400">
                            Location
                          </p>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white break-words">
                            {listView.fullAddress || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="my-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-1">
                          Assigned Orders
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {listView.assignedOrdersCount || 0}
                        </p>
                      </div>
                      <div
                        className={`rounded-lg p-2 text-center ${
                          listView.kycStatus === "VERIFIED" ||
                          listView.kycStatus === "APPROVED"
                            ? "bg-green-50 dark:bg-green-900/20"
                            : listView.kycStatus === "PENDING"
                              ? "bg-yellow-50 dark:bg-yellow-900/20"
                              : "bg-red-50 dark:bg-red-900/20"
                        }`}
                      >
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-1">
                          KYC Status
                        </p>
                        <p
                          className={`text-sm font-bold ${
                            listView.kycStatus === "VERIFIED" ||
                            listView.kycStatus === "APPROVED"
                              ? "text-green-600 dark:text-green-400"
                              : listView.kycStatus === "PENDING"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {listView.kycStatus || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Primary Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="text-xs h-8"
                        onClick={(e) => handleViewOrders(e, partner.partnerId)}
                      >
                        View Orders
                      </Button>
                      <Button
                        variant={isActive ? "danger" : "success"}
                        size="sm"
                        className="text-xs h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(partner);
                        }}
                      >
                        {isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs h-7"
                        onClick={(e) => handleDetailsClick(e, partner)}
                      >
                        <Info size={10} className="mr-1" />
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs h-7"
                        onClick={(e) => handleEditClick(e, partner)}
                      >
                        <Edit size={10} className="mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Orders Modal */}
      {showOrdersModal && (
        <PartnerOrderHistoryModal
          partnerId={selectedPartnerId}
          onClose={() => setShowOrdersModal(false)}
        />
      )}
    </>
  );
};

export default DeliveryPartner;
