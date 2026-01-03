import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiHome,
  FiTruck,
} from "react-icons/fi";
import DeliveryPartnerStatusBadge from "./DeliveryPartnerStatusBadge";
import Button from "../ui/Button";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {partners.map((partner) => {
        const { partnerId, listView, registrationData, orderHistory } = partner;
        const isActive = listView.status === "Active";

        return (
          <div
            key={partnerId}
            className="
              bg-white dark:bg-gray-900/80
              rounded-lg 
              shadow-sm dark:shadow-none
              border border-gray-200 dark:border-gray-700/50
              overflow-hidden
              transition-all duration-300 ease-out ju
              hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/50
              hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600
            "
          >
            {/* Top Status Bar */}
            <div className={`h-0.5 ${isActive ? "bg-green-500" : "bg-gray-400 dark:bg-gray-500"}`} />

            <div className="p-2.5 flex flex-col h-full justify-between">
              {/* HEADER - Name aur ID niche, badge chhota aur right mein */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      registrationData?.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerId}`
                    }
                    className="
                      w-8 h-8 rounded-full object-cover shrink-0
                      border border-gray-300 dark:border-gray-600
                    "
                    alt={registrationData?.name}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                      {registrationData?.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      #{partnerId}
                    </p>
                  </div>
                </div>

                {/* Badge ko aur chhota aur clean banaya */}
                <DeliveryPartnerStatusBadge
                  status={listView.status}
                  className="text-[7px] font-semibold px-1.5 py-0.5 rounded-md"
                />
              </div>

              {/* INFO */}
              <div className="space-y-1 mb-2 text-[10px] text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1.5">
                  <FiPhone className="text-blue-600 dark:text-blue-400 w-3 h-3 shrink-0" />
                  <span className="truncate">{registrationData?.mobileNumber}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiMail className="text-blue-600 dark:text-blue-400 w-3 h-3 shrink-0" />
                  <span className="truncate">{registrationData?.email || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="text-blue-600 dark:text-blue-400 w-3 h-3 shrink-0" />
                  <span>{listView.city || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiHome className="text-blue-600 dark:text-blue-400 w-3 h-3 shrink-0" />
                  <span className="truncate">{registrationData?.cityArea || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiTruck className="text-blue-600 dark:text-blue-400 w-3 h-3 shrink-0" />
                  <span>{registrationData?.vehicleType || "—"}</span>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded px-2 py-1.5 text-center border border-gray-200/50 dark:border-gray-700/40">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {listView.assignedOrdersCount || 0}
                  </p>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400">Assigned</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded px-2 py-1.5 text-center border border-gray-200/50 dark:border-gray-700/40">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {orderHistory?.length || 0}
                  </p>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400">Completed</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-1">
                <Button
                  className={`btn-sm flex-1 text-[10px] ${isActive ? "btn-inactive" : "btn-active"}`}
                  onClick={() => toggleStatus(partner)}
                >
                  {isActive ? "Deactivate" : "Activate"}
                </Button>

                <Button
                  className="btn-secondary btn-sm flex-1 text-[10px]"
                  onClick={() => onViewDetails(partner)}
                >
                  View
                </Button>

                <Button
                  className="btn-primary btn-sm flex-1 text-[10px]"
                  onClick={() => alert("Assign coming soon")}
                >
                  Assign
                </Button>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-1.5 text-center border border-gray-100 dark:border-gray-700">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {listView.assignedOrdersCount || 0}
                </p>
                <span className="text-gray-500 dark:text-gray-400">Assigned</span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded p-1.5 text-center border border-gray-100 dark:border-gray-700">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {orderHistory?.length || 0}
                </p>
                <span className="text-gray-500 dark:text-gray-400">Completed</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-1">
              <Button
                className={`btn-sm flex-1 ${isActive ? "btn-inactive" : "btn-active"
                  }`}
                onClick={() => toggleStatus(partner)}
              >
                {isActive ? "Deactivate" : "Activate"}
              </Button>

              <Button
                className="btn-secondary btn-sm flex-1"
                onClick={() => onViewDetails(partner)}
              >
                View
              </Button>

              <Button
                className="btn-primary btn-sm flex-1"
                onClick={() => alert("Assign coming soon")}
              >
                Assign
              </Button>
            </div>

            {/* STATUS BAR */}
            <div
              className={`h-0.5 mt-2 rounded ${isActive ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
            />

          </div>
        );
      })}
    </div>
  );
};

export default DeliveryPartner;