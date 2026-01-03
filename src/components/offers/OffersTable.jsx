import React from "react";
import { Tag, Percent, DollarSign, Calendar } from "lucide-react";
import Badge from "../ui/Badge";
import Table from "../ui/Table";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const OffersTable = ({ offers = [], onView, onEdit, onDelete }) => {
  if (offers.length === 0) {
    return (
      <div className="rounded-2xl border border-white/20 p-12 text-center text-gray-400 text-lg">
        No offers found
      </div>
    );
  }

  return (
    <Table
      data={offers}
      columns={[
        { header: "Offer ID", key: "offerId", render: (offer) => <span className="font-mono text-primary">{offer.offerId}</span> },
        { header: "Offer", key: "title", render: (offer) => (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <div>
              <p className="font-medium">{offer.title}</p>
              {offer.code && (
                <p className="text-xs text-gray-500">{offer.code}</p>
              )}s
            </div>
          </div>
        ) },
        { header: "Discount", key: "discountValue", render: (offer) => (
          <div className="flex items-center gap-2">
            {offer.discountType === "percentage" ? (
              <Percent className="w-4 h-4 text-emerald-400" />
            ) : (
              <DollarSign className="w-4 h-4 text-emerald-400" />
            )}
            <span className="font-medium">
              {offer.discountType === "percentage"
                ? `${offer.discountValue}%`
                : `₹${offer.discountValue}`}
            </span>
          </div>
        ) },
        { header: "Min Order", key: "minOrderValue", render: (offer) => (
          <span className="text-sm text-gray-400">
            {offer.minOrderValue
              ? `₹${offer.minOrderValue}`
              : "No minimum"}
          </span>
        ) },
        { header: "Status", key: "status", render: (offer) => <Badge>{offer.status}</Badge> },
        { header: "Validity", key: "validity", render: (offer) => (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            {new Date(offer.validity?.startDate).toLocaleDateString()} –{" "}
            {new Date(offer.validity?.endDate).toLocaleDateString()}
          </div>
        ) },
      ]}
      actions={[
        { key: 'view', icon: FiEye, color: 'blue', onClick: (offer) => onView(offer) },
        { key: 'edit', icon: FiEdit, color: 'cyan', onClick: (offer) => onEdit(offer) },
        { key: 'delete', icon: FiTrash2, color: 'rose', onClick: (offer) => onDelete(offer.offerId) }
      ]}
    />
  );
};

export default OffersTable;
