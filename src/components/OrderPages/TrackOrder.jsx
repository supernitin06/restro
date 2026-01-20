import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useTrackDeliveryPartnerQuery } from "../../api/services/trackdeliverypartner";
const TrackOrder = ({ orderId, onClose }) => {
  const { data: trackData, isLoading } = useTrackDeliveryPartnerQuery(orderId, {
    pollingInterval: 5000
  });



  return (
    <div
      className="w-full h-full fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // click outside to close
    >
      <div
        className="w-[500px] bg-white p-4 rounded-lg relative"
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-2">
          Track Order: {orderId}
        </h2>

        {/* Modal Content */}
        {isLoading ? (
          <p className="text-gray-500">Loading tracking details...</p>
        ) : (
          <div className="mt-4">
            {/* Placeholder for valid data structure */}
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-60">
              {JSON.stringify(trackData?.data?.delivery?.partner?.currentLocation.coordinates, null, 2)}
            </pre>
          </div>
        )}
      </div>    </div>
  );
};

export default TrackOrder;
