import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiHome,
  FiTruck,
} from "react-icons/fi";
import DeliveryPartnerStatusBadge from "./DeliveryPartnerStatusBadge";

const DeliveryPartner = ({ partners, onViewDetails, updatePartner }) => {
  const toggleStatus = (partner) => {
    const newStatus =
      partner.listView.status === "Active" ? "Inactive" : "Active";

    updatePartner({
      ...partner,
      listView: {
        ...partner.listView,
        status: newStatus,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {partners.map((partner) => {
        const { partnerId, listView, registrationData, orderHistory } = partner;
        const isActive = listView.status === "Active";

        return (
          <div
            key={partnerId}
            className="card hover:shadow-md transition-all p-3"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={
                    registrationData?.image ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerId}`
                  }
                  className="w-9 h-9 rounded-md border"
                  alt={registrationData?.name}
                />

                <div className="min-w-0">
                  <h3 className="text-xs font-semibold truncate">
                    {registrationData?.name}
                  </h3>
                  <p className="text-[10px] text-secondary">
                    #{partnerId}
                  </p>
                </div>
              </div>

              {/* Smaller Status Badge */}
              <DeliveryPartnerStatusBadge
                status={listView.status}
                className="text-[9px] px-2 py-1 ml-2"
              />
            </div>

            {/* INFO */}
            <div className="flex flex-col gap-1 text-[10px] text-gray-500 bg-gray-50 rounded p-2 mb-2">
              <div className="flex items-center gap-1.5">
                <FiPhone className="text-primary text-xs shrink-0" />
                <span>{registrationData?.mobileNumber}</span>
              </div>

              <div className="flex items-center gap-1.5 min-w-0">
                <FiMail className="text-primary text-xs shrink-0" />
                <span className="truncate">
                  {registrationData?.email || "—"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <FiMapPin className="text-primary text-xs shrink-0" />
                <span>{listView.city}</span>
              </div>

              <div className="flex items-center gap-1.5 min-w-0">
                <FiHome className="text-primary text-xs shrink-0" />
                <span className="truncate">
                  {registrationData?.cityArea}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <FiTruck className="text-primary text-xs shrink-0" />
                <span>{registrationData?.vehicleType}</span>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
              <div className="bg-gray-100 rounded p-1.5 text-center">
                <p className="font-semibold">
                  {listView.assignedOrdersCount || 0}
                </p>
                <span className="text-secondary">Assigned</span>
              </div>

              <div className="bg-gray-100 rounded p-1.5 text-center">
                <p className="font-semibold">
                  {orderHistory?.length || 0}
                </p>
                <span className="text-secondary">Completed</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-1">
              <button
                className={`btn-sm flex-1 ${
                  isActive ? "btn-inactive" : "btn-active"
                }`}
                onClick={() => toggleStatus(partner)}
              >
                {isActive ? "Deactivate" : "Activate"}
              </button>

              <button
                className="btn-secondary btn-sm flex-1"
                onClick={() => onViewDetails(partner)}
              >
                View
              </button>

              <button
                className="btn-primary btn-sm flex-1"
                onClick={() => alert("Assign coming soon")}
              >
                Assign
              </button>
            </div>

            {/* STATUS BAR */}
            <div
              className={`h-0.5 mt-2 rounded ${
                isActive ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryPartner;
