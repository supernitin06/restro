import React from 'react';
import { Tag, Calendar, Percent, DollarSign } from 'lucide-react';
import Badge from '../ui/Badge';
import ActionButtons from '../ui/ActionButton';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

const OffersTable = ({
    offers = [],
    onView,
    onEdit,
    onDelete,
    className = '',
}) => {
    // Format discount
    const formatDiscount = (type, value) => {
        if (!value) return 'N/A';
        if (type === 'percentage') return `${value}%`;
        return `$${parseFloat(value).toFixed(2)}`;
    };

    // Format minimum order amount
    const formatAmount = (amount) => {
        if (!amount || amount === '' || amount === 0) return 'No minimum';
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    // Format validity dates
    const formatValidity = (validity) => {
        if (!validity?.startDate || !validity?.endDate) return 'N/A';
        return `${new Date(validity.startDate).toLocaleDateString('short')} - ${new Date(validity.endDate).toLocaleDateString('short')}`;
    };

    if (offers.length === 0) {
        return (
            <div className={`rounded-2xl border border-white/20 p-12 text-center ${className}`}>
                <p className="text-gray-400 text-lg">No offers found</p>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto rounded-2xl border border-white/20 scrollbar-hide ${className}`}
        >
            <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Offer Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Discount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Min Order
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Validity
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Usage Limit
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Status
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
                            className="hover:bg-white/5 transition-colors duration-200"
                        >
                            {/* Offer Title */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <Tag className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <span className="font-bold text-white block text-lg leading-tight">
                                            {offer.title || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            {/* Discount */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    {offer.discountType === 'percentage' ? (
                                        <Percent className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <DollarSign className="w-5 h-5 text-emerald-400" />
                                    )}
                                    <span className="font-bold text-emerald-400">
                                        {formatDiscount(offer.discountType, offer.discountValue)}
                                    </span>
                                    <span className="text-xs text-gray-500 capitalize">
                                        {offer.discountType}
                                    </span>
                                </div>
                            </td>

                            {/* Min Order */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                    <span>{formatAmount(offer.minOrderValue)}</span>
                                </div>
                            </td>

                            {/* Validity */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm">
                                        {formatValidity(offer.validity)}
                                    </span>
                                </div>
                            </td>

                            {/* Usage Limit */}
                            <td className="px-6 py-4">
                                <div className="text-sm">
                                    {offer.usageLimit ? (
                                        <p className="text-gray-300 font-medium">
                                            {offer.usageLimit} uses
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500">Unlimited</p>
                                    )}
                                </div>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4">
                                <Badge type={offer.status || 'inactive'}>
                                    {(offer.status || 'inactive').charAt(0).toUpperCase() +
                                        (offer.status || 'inactive').slice(1)}
                                </Badge>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                                <ActionButtons
                                    item={offer}
                                    actions={[
                                        { 
                                            key: 'view', 
                                            label: 'View', 
                                            icon: FiEye, 
                                            color: 'blue', 
                                            onClick: (item) => onView?.(item) 
                                        },
                                        { 
                                            key: 'edit', 
                                            label: 'Edit', 
                                            icon: FiEdit, 
                                            color: 'cyan', 
                                            onClick: (item) => offer.actions?.canEdit && onEdit?.(item) 
                                        },
                                        { 
                                            key: 'delete', 
                                            label: 'Delete', 
                                            icon: FiTrash2, 
                                            color: 'rose', 
                                            onClick: (item) => onDelete?.(item.offerId) 
                                        }
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