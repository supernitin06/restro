import React from 'react';
import { Tag, Percent, DollarSign } from 'lucide-react';
import Badge from '../ui/Badge';
import Table from '../ui/Table';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

const CouponTable = ({
    coupons = [],
    onToggleStatus,
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

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 cursor-pointer ${className}`}>
            {coupons.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No coupons found.</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        Total coupons in system: {coupons.length}
                    </p>
                </div>
            ) : (
                <>
                    <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Showing {coupons.length} of {coupons.length} coupons
                    </div>
                    <Table
                        data={coupons}
                        columns={[
                { header: "Coupon Code", key: "code", render: (coupon) => (
                    <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-gray-500" />
                        <span className="font-mono font-bold text-white uppercase tracking-wider">
                            {coupon.code || 'N/A'}
                        </span>
                    </div>
                ) },
                { header: "Discount", key: "discountValue", render: (coupon) => (
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
                ) },
                { header: "Min Order", key: "minOrderAmount", render: (coupon) => (
                    <div className="flex items-center gap-2 text-gray-300">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span>{formatAmount(coupon.minOrderAmount)}</span>
                    </div>
                ) },
                { header: "Usage / Limit", key: "usedCount", render: (coupon) => (
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
                ) },
                { header: "Status", key: "status", render: (coupon) => (
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
                ) },
            ]}
            actions={[
                { key: 'view', icon: FiEye, color: 'blue', onClick: (coupon) => onView?.(coupon) },
                { key: 'edit', icon: FiEdit, color: 'cyan', onClick: (coupon) => onEdit?.(coupon) },
                { key: 'delete', icon: FiTrash2, color: 'rose', onClick: (coupon) => onDelete?.(coupon.id) }
            ]}
            title="Coupons"
                    />
                </>
            )}
        </div>
    );
};

const CouponsTable = CouponTable;
export default CouponsTable;
export { CouponTable };