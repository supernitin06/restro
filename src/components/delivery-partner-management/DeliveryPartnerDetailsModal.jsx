// DeliveryPartnerDetailsModal.jsx
import React from "react";
import DeliveryPartnerStatusBadge from "./DeliveryPartnerStatusBadge";
import Button from "../ui/Button";

const DeliveryPartnerDetailsModal = ({ partner, onClose, updatePartner }) => {
  if (!partner) return null;

  const { registrationData, listView, orderHistory, partnerId } = partner;

  const toggleStatus = () => {
    const newStatus = listView.status === "Active" ? "Inactive" : "Active";
    updatePartner({ ...partner, listView: { ...listView, status: newStatus } });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-white via-red-100 to-red-300 px-5 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-red-900">{registrationData?.name}</h2>
            <p className="text-xs text-red-800/70">Partner ID : <span className="font-medium">{partnerId}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <DeliveryPartnerStatusBadge status={listView.status} />
            <Button onClick={onClose} className="bg-transparent text-red-900 hover:text-red-700 w-auto px-2 py-1" fullWidth={false}>✕</Button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Profile */}
          <div className="flex gap-4 items-start">
            <img src={registrationData?.image || "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1"} alt={registrationData?.name} className="w-20 h-20 rounded-xl object-cover border"/>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm">
                {Object.entries(registrationData || {}).map(([key, value]) => (
                  <div key={key} className="text-gray-700">
                    <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")} :</span>{" "}
                    <span className="font-medium">{value || "N/A"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button onClick={toggleStatus} className={listView.status === "Active" ? "btn-secondary" : "btn-primary"} fullWidth={false}>
              {listView.status === "Active" ? "Deactivate" : "Activate"}
            </Button>
            <Button className="btn-secondary" fullWidth={false}>Manual Assign</Button>
          </div>

          {/* Order History */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Order History</h3>
            {orderHistory?.length === 0 ? (
              <p className="text-xs text-gray-500">No orders yet</p>
            ) : (
              <div className="max-h-[200px] overflow-auto border rounded-lg">
                <table className="w-full text-xs">
                  <thead className="bg-red-50 text-red-700 sticky top-0">
                    <tr>
                      {Object.keys(orderHistory[0]).map((key) => (
                        <th key={key} className="p-2 border text-left font-medium">{key.replace(/([A-Z])/g, " $1")}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        {Object.values(order).map((val, i) => (
                          <td key={i} className="p-2 border">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerDetailsModal;
