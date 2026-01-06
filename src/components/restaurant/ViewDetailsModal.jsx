import React from "react";
import Button from "../ui/Button";
import { X } from "lucide-react"; // optional icon for close

const ViewDetailsModal = ({ restaurant, onClose, onApprove, onSuspend }) => {
  if (!restaurant) return null;

  const { _id, name, brandName, logo, isActive, createdAt, updatedAt } = restaurant;

  const handleApprove = () => onApprove && onApprove(_id);
  const handleSuspend = () => onSuspend && onSuspend(_id);

  return (
   <div className="fixed inset-0 flex justify-center items-center p-4 z-50 backdrop-blur-sm bg-white/30">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold truncate">{name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 gap-4">
          <div className="flex gap-4 items-center">
            {logo && (
              <img
                src={logo}
                alt={name}
                className="w-24 h-24 rounded-xl shadow-md border border-gray-200 object-cover"
              />
            )}
            <div className="text-gray-700 space-y-1">
              <p><strong>Brand:</strong> {brandName}</p>
              <p><strong>Active:</strong> {isActive ? "Yes" : "No"}</p>
              <p><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</p>
              <p><strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
          <Button
            variant="active"
            className={`py-2 px-4 rounded-lg text-white transition ${
              isActive ? "opacity-50 cursor-not-allowed bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleApprove}
            disabled={isActive}
          >
            Approve
          </Button>

          <Button
            variant="inactive"
            className={`py-2 px-4 rounded-lg text-white transition ${
              !isActive ? "opacity-50 cursor-not-allowed bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={handleSuspend}
            disabled={!isActive}
          >
            Suspend
          </Button>

          <Button
            className="py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
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
