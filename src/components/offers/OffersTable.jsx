import React from "react";
import { Tag, Percent, DollarSign, Calendar } from "lucide-react";
import Badge from "../ui/Badge";
import ActionButtons from "../ui/ActionButton";
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
    <div className="overflow-x-auto rounded-2xl border border-white/20">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Offer ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Offer
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Discount
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Min Order
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Validity
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {offers.map((offer) => (
            <tr
              key={offer.offerId}
              className="hover:bg-white/5 transition-colors"
            >
              {/* Offer ID */}
              <td className="px-6 py-4 font-mono text-primary">
                {offer.offerId}
              </td>

              {/* Offer */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{offer.title}</p>
                    {offer.code && (
                      <p className="text-xs text-gray-500">{offer.code}</p>
                    )}
                  </div>
                </div>
              </td>

              {/* Discount */}
              <td className="px-6 py-4">
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
              </td>

              {/* Min Order */}
              <td className="px-6 py-4 text-sm text-gray-400">
                {offer.minOrderValue
                  ? `₹${offer.minOrderValue}`
                  : "No minimum"}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <Badge>{offer.status}</Badge>
              </td>

              {/* Validity */}
              <td className="px-6 py-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(offer.validity?.startDate).toLocaleDateString()} –{" "}
                  {new Date(offer.validity?.endDate).toLocaleDateString()}
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <ActionButtons
                  actions={[
                    {
                      key: "view",
                      icon: FiEye,
                      color: "blue",
                      onClick: () => onView(offer),
                    },
                    {
                      key: "edit",
                      icon: FiEdit,
                      color: "cyan",
                      onClick: () => onEdit(offer),
                    },
                    {
                      key: "delete",
                      icon: FiTrash2,
                      color: "rose",
                      onClick: () => onDelete(offer.offerId),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffersTable;
