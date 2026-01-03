import React from 'react';
import { Tag, Calendar, Percent, DollarSign } from 'lucide-react';
import Badge from '../ui/Badge';
import ActionButtons from '../ui/ActionButton';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import Table from '../ui/Table';

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

    const columns = [
        {
            header: "Coupon Code",
            render: (coupon) => (
                <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-gray-500" />
                    <span className="font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        {coupon.code || 'N/A'}
                    </span>
                </div>
            )
        },
        {
            header: "Discount",
            render: (coupon) => (
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
            )
        },
        {
            header: "Min Order",
            render: (coupon) => (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>{formatAmount(coupon.minOrderAmount)}</span>
                </div>
            )
        },
        {
            header: "Usage / Limit",
            render: (coupon) => (
                <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {coupon.usedCount || 0} used
                    </p>
                    {coupon.usageLimit ? (
                        <p className="text-xs text-gray-500">
                            Limit: {coupon.usageLimit}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-600 dark:text-gray-400">Unlimited</p>
                    )}
                </div>
            )
        },
        {
            header: "Status",
            render: (coupon) => (
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
            )
        },
        {
            header: "Actions",
            render: (coupon) => (
                <ActionButtons
                    item={coupon}
                    actions={[
                        { key: 'view', label: 'View', icon: FiEye, color: 'blue', onClick: (item) => console.log('View', item) },
                        { key: 'edit', label: 'Edit', icon: FiEdit, color: 'cyan', onClick: (item) => console.log('Edit', item) },
                        { key: 'delete', label: 'Delete', icon: FiTrash2, color: 'rose', onClick: (item) => console.log('Delete', item) }
                    ]}
                />
            )
        }
    ];

    if (coupons.length === 0) {
        return (
            <div className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center text-gray-500 dark:text-gray-400 ${className}`}>
                <p>No coupons found</p>
            </div>
        );
    }

    return (
        <Table
            data={coupons}
            columns={columns}
            title="Active Coupons"
            subtitle={`${coupons.length} total • ${coupons.filter(c => c.status === "active").length} active`}
            className={className}
        />
    );
};

export default CouponTable;