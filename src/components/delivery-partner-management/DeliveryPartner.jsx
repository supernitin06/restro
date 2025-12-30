import React from "react";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {partners.map((partner) => {
        const { listView, registrationData, partnerId, metrics } = partner;
        const isActive = listView.status === "Active";
        const stats = {
          completed: listView.completedOrders || 0,
          active: listView.assignedOrdersCount || 0,
          total: listView.totalOrders || (metrics?.totalOrders || 0),
          rating: listView.rating || 4.8,
          earnings: metrics?.totalEarnings || 0,
          onTimeDelivery: metrics?.onTimeDelivery || "95%",
        };

        return (
          <div
            key={partnerId}
            className="card relative overflow-hidden p-2 hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
          >
            {/* STATUS GLOW */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isActive
                  ? "bg-gradient-to-br from-green-50/30 to-transparent"
                  : "bg-gradient-to-br from-gray-50/30 to-transparent"
              }`}
            />

            {/* HEADER */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-gray-100">
                  <img
                    src={
                      registrationData?.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerId}&backgroundColor=4f46e5`
                    }
                    alt={listView.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                      isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {listView.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    #{partnerId.slice(-6)}
                  </p>
                </div>
              </div>
              <DeliveryPartnerStatusBadge status={listView.status} />
            </div>

            {/* INFO */}
            <div className="flex justify-around mb-2 py-1 bg-gray-50 rounded-md text-xs">
              <div className="text-center">
                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mx-auto mb-1">
                  📍
                </div>
                <p className="font-medium text-gray-700 truncate">{listView.city}</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center mx-auto mb-1">
                  📞
                </div>
                <p className="font-medium text-gray-700 truncate">{listView.phone}</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mx-auto mb-1">
                  🛵
                </div>
                <p className="font-medium text-gray-700 truncate">
                  {listView.vehicleType || "Bike"}
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-1 mb-2 text-center text-xs">
              <div className="p-1.5 bg-gray-50 rounded-md">
                <div className="font-bold text-gray-900">{stats.completed}</div>
                <div className="text-gray-500 font-medium">Completed</div>
              </div>
              <div className="p-1.5 bg-gray-50 rounded-md">
                <div className="font-bold text-gray-900">{stats.active}</div>
                <div className="text-gray-500 font-medium">Active</div>
              </div>
              <div className="p-1.5 bg-gray-50 rounded-md">
                <div className="font-bold text-gray-900">{stats.total}</div>
                <div className="text-gray-500 font-medium">Total</div>
              </div>
            </div>

            <div className="flex justify-between text-xs mb-2">
              <div className="flex items-center gap-1">
                <span className="text-amber-500 font-bold">★</span>
                <span className="font-semibold text-gray-900">{stats.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                {stats.onTimeDelivery} on-time
              </div>
              {stats.earnings > 0 && (
                <div className="text-blue-600 font-semibold">${stats.earnings} earned</div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-1">
              <button
                onClick={() => toggleStatus(partner)}
                className={`flex-1 btn-secondary btn-sm ${
                  isActive ? "hover:bg-red-600 border-red-600" : "bg-green-500 text-white border-green-500"
                }`}
              >
                {isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => onViewDetails(partner)}
                className="flex-1 btn-secondary btn-sm hover:bg-gray-700"
              >
                View
              </button>
              <button
                onClick={() => onViewDetails(partner)}
                className="flex-1 btn-primary btn-sm hover:bg-blue-700"
              >
                Assign
              </button>
            </div>

            {/* BOTTOM ACCENT */}
            <div
              className={`h-0.5 w-full mt-2 ${
                isActive ? "bg-green-500/50" : "bg-gray-400/50"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryPartner;
