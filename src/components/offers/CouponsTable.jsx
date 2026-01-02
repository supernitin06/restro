import React from 'react';
import { Tag, Calendar, Percent, DollarSign } from 'lucide-react';
import Badge from '../ui/Badge';
import ActionButtons from '../ui/ActionButton';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

const CouponTable = ({
    coupons = [],
    actions = [],
    onToggleStatus,
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

    // Optional: Format dates (if you add expiry/createdAt later)
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (coupons.length === 0) {
        return (
            <div className={`rounded-2xl border border-white/20 p-12 text-center ${className}`}>
                <p className="text-gray-400 text-lg">No coupons found</p>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/20 scrollbar-hide">
                <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Coupon Code
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Discount
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Min Order
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Usage / Limit
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
                        {coupons.map((coupon) => (
                            <tr
                                key={coupon.id}
                                className="hover:bg-white/5 transition-colors duration-200"
                            >
                                {/* Coupon Code */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <Tag className="w-5 h-5 text-gray-500" />
                                        <span className="font-mono font-bold text-white uppercase tracking-wider">
                                            {coupon.code || 'N/A'}
                                        </span>
                                    </div>
                                </td>

                                {/* Discount */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {coupon.discountType === 'percentage' ? (
                                            <Percent className="w-5 h-5 text-emerald-400" />
                                        ) : (
                                            <DollarSign className="w-5 h-5 text-emerald-400" />
                                        )}
                                        <span className="font-bold text-emerald-400">
                                            {formatDiscount(coupon.discountType, coupon.discountValue)}
                                        </span>
                                        <span className="text-xs text-gray-500 capitalize">
                                            {coupon.discountType}
                                        </span>
                                    </div>
                                </td>

                                {/* Min Order */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <DollarSign className="w-4 h-4 text-gray-500" />
                                        <span>{formatAmount(coupon.minOrderAmount)}</span>
                                    </div>
                                </td>

                                {/* Usage & Limit */}
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <p className="text-gray-300 font-medium">
                                            {coupon.usedCount || 0} used
                                        </p>
                                        {coupon.usageLimit ? (
                                            <p className="text-xs text-gray-500">
                                                Limit: {coupon.usageLimit}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-600">Unlimited</p>
                                        )}
                                    </div>
                                </td>

                                {/* Status Toggle */}
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onToggleStatus?.(coupon.id)}
                                        disabled={!onToggleStatus}
                                        className="disabled:cursor-not-allowed hover:scale-105 transition-transform"
                                    >
                                        <Badge type={coupon.status || 'inactive'}>
                                            {(coupon.status || 'inactive').charAt(0).toUpperCase() +
                                                (coupon.status || 'inactive').slice(1)}
                                        </Badge>
                                    </button>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <ActionButtons
                                        item={coupon} // optional, the current row item
                                        actions={[
                                            { key: 'view', label: 'View', icon: FiEye, color: 'blue', onClick: (item) => console.log('View', item) },
                                            { key: 'edit', label: 'Edit', icon: FiEdit, color: 'cyan', onClick: (item) => console.log('Edit', item) },
                                            { key: 'delete', label: 'Delete', icon: FiTrash2, color: 'rose', onClick: (item) => console.log('Delete', item) }
                                        ]}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        className="bg-white/5 rounded-2xl border border-white/20 p-4 hover:bg-white/10 transition-colors duration-200"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Tag className="w-5 h-5 text-gray-500" />
                                <span className="font-mono font-bold text-white uppercase tracking-wider">
                                    {coupon.code || 'N/A'}
                                </span>
                            </div>
                            <button
                                onClick={() => onToggleStatus?.(coupon.id)}
                                disabled={!onToggleStatus}
                                className="disabled:cursor-not-allowed hover:scale-105 transition-transform"
                            >
                                <Badge type={coupon.status || 'inactive'}>
                                    {(coupon.status || 'inactive').charAt(0).toUpperCase() +
                                        (coupon.status || 'inactive').slice(1)}
                                </Badge>
                            </button>
                        </div>

                        <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2">
                                {coupon.discountType === 'percentage' ? (
                                    <Percent className="w-4 h-4 text-emerald-400" />
                                ) : (
                                    <DollarSign className="w-4 h-4 text-emerald-400" />
                                )}
                                <span className="font-bold text-emerald-400">
                                    {formatDiscount(coupon.discountType, coupon.discountValue)}
                                </span>
                                <span className="text-xs text-gray-500 capitalize">
                                    {coupon.discountType}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                                <DollarSign className="w-4 h-4 text-gray-500" />
                                <span>Min Order: {formatAmount(coupon.minOrderAmount)}</span>
                            </div>

                            <div className="text-sm">
                                <p className="text-gray-300 font-medium">
                                    {coupon.usedCount || 0} used
                                </p>
                                {coupon.usageLimit ? (
                                    <p className="text-xs text-gray-500">
                                        Limit: {coupon.usageLimit}
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-600">Unlimited</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <ActionButtons
                                item={coupon}
                                actions={[
                                    { key: 'view', label: 'View', icon: FiEye, color: 'blue', onClick: (item) => console.log('View', item) },
                                    { key: 'edit', label: 'Edit', icon: FiEdit, color: 'cyan', onClick: (item) => console.log('Edit', item) },
                                    { key: 'delete', label: 'Delete', icon: FiTrash2, color: 'rose', onClick: (item) => console.log('Delete', item) }
                                ]}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponTable;