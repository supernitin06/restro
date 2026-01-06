// DeliveryPartnerDetailsModal.jsx
import React from "react";
import DeliveryPartnerStatusBadge from "./DeliveryPartnerStatusBadge";
import Button from "../ui/Button";
import { X, Mail, Phone, MapPin, Truck, Bike, Shield, Calendar } from 'lucide-react';

const DeliveryPartnerDetailsModal = ({ partner, onClose, updatePartner }) => {
  if (!partner) return null;

  const { registrationData, listView, orderHistory, partnerId } = partner;

  const toggleStatus = () => {
    const newStatus = listView.status === "Active" ? "Inactive" : "Active";
    updatePartner({ ...partner, listView: { ...listView, status: newStatus } });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">

        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
             <img src={registrationData?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerId}`} alt={registrationData?.name} className="w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-gray-700" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{registrationData?.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Partner ID: {partnerId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DeliveryPartnerStatusBadge status={listView.status} />
            <button onClick={onClose} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DetailItem icon={Phone} label="Mobile Number" value={registrationData?.mobileNumber} color="blue" />
            <DetailItem icon={Mail} label="Email" value={registrationData?.email || 'N/A'} color="red" />
            <DetailItem icon={MapPin} label="City / Area" value={registrationData?.cityArea || 'N/A'} color="orange" />
            <DetailItem icon={listView.vehicleType === 'Bike' ? Bike : Truck} label="Vehicle Type" value={registrationData?.vehicleType} color="purple" />
            <DetailItem icon={Shield} label="KYC Status" value={listView.kycStatus} color={listView.kycStatus === 'VERIFIED' ? 'green' : 'yellow'} />
            <DetailItem icon={Calendar} label="Joined On" value={partner.registrationData?.createdAt ? new Date(partner.registrationData.createdAt).toLocaleDateString() : 'N/A'} color="teal" />
          </div>


          {/* Order History */}
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">Order History</h3>
            {orderHistory?.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">No order history available.</p>
              </div>
            ) : (
              <div className="max-h-[200px] overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0">
                    <tr>
                      {Object.keys(orderHistory[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{key.replace(/([A-Z])/g, " $1")}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {orderHistory.map((order, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                        {Object.values(order).map((val, i) => (
                          <td key={i} className="px-4 py-3 whitespace-nowrap">{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant={listView.status === "Active" ? "danger" : "success"} onClick={toggleStatus}>
            {listView.status === "Active" ? "Deactivate Partner" : "Activate Partner"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value, color = 'gray' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    teal: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  }
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{String(value).toLowerCase()}</p>
      </div>
    </div>
  )
}

export default DeliveryPartnerDetailsModal;
