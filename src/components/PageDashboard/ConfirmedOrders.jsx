import React, { useState } from 'react';
import { ArrowRight, Bike, ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const ConfirmedOrders = ({ title, orders, icon: Icon, color, deliveryBoys }) => {
    // We'll track which menu is open by ID and Type ('status' or 'assign')
    const [activeMenu, setActiveMenu] = useState({ id: null, type: null });
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();

    const colorClasses = {
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-900/20',
            text: 'text-orange-600 dark:text-orange-400',
            iconBg: 'bg-orange-100 dark:bg-orange-900/30',
        },
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        },
    };

    const statusStyles = {
        placed: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
        preparing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        packing: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
        confirmed: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
        cooking: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
    };

    const classes = colorClasses[color] || colorClasses.blue;
    const nextStatuses = ['Preparing', 'Cooking', 'Packing', 'Ready for Pickup'];

    const handleAssign = (orderId, boyName) => {
        if (window.confirm(`Assign ${boyName} to order ${orderId}?`)) {
            console.log(`Order ${orderId} assigned to ${boyName}`);
            closeMenu();
        }
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        if (window.confirm(`Update order ${orderId} to "${newStatus}"?`)) {
            console.log(`Order ${orderId} status updated to ${newStatus}`);
            closeMenu();
        }
    };

    const getDeliveryBoyInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        if (parts.length > 1 && parts[parts.length - 1]) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const toggleMenu = (e, orderId, type) => {
        e.stopPropagation();
        if (activeMenu.id === orderId && activeMenu.type === type) {
            closeMenu();
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            // Calculate position differently based on menu type width if needed, but centering/align right is standard
            setMenuPosition({
                top: rect.bottom + window.scrollY + 8,
                left: type === 'assign' ? rect.left + window.scrollX - 200 : rect.left + window.scrollX - 160
            });
            setActiveMenu({ id: orderId, type });
        }
    };

    const closeMenu = () => {
        setActiveMenu({ id: null, type: null });
        setMenuPosition(null);
    };

    const toggleExpand = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };


    return (
        <div className="h-full max-h-[600px] overflow-hidden flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 dark:border-gray-800 transition-all duration-300 relative group ring-1 ring-black/5">

            {/* Background Aesthetic */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-${color}-500/20 to-teal-500/20 rounded-full blur-[80px] -z-10 transition-all duration-700`} />

            {/* Header */}
            <div className="px-6 py-5 flex-shrink-0 border-b border-gray-100/50 dark:border-gray-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${classes.iconBg} backdrop-blur-md shadow-lg shadow-${color}-500/10 ring-1 ring-black/5 ring-inset group-hover:scale-105 transition-transform duration-500 ease-out`}>
                            <Icon size={26} className={classes.text} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">{title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`flex w-2 h-2 rounded-full bg-${color}-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]`}></span>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {orders.length} In Progress
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 scroll-smooth">
                {orders.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                            <Icon size={40} className="text-gray-300 dark:text-gray-600 opacity-50" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-200">No Active Orders</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-[200px]">
                            The kitchen is quiet. Time to prep for the rush!
                        </p>
                    </div>
                ) : (
                    orders.map((order, index) => (
                        <div
                            key={order.id}
                            style={{ animationDelay: `${index * 50}ms` }}
                            className="relative p-5 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-300 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-800/30 animate-in slide-in-from-bottom-2 fill-mode-backwards"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-2.5 py-1 rounded-lg shadow-md">
                                        <span className="text-xs font-bold tracking-wider">#{order.id}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ring-1 ring-inset ring-black/5 ${statusStyles[order.status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xl font-extrabold ${classes.text} tracking-tight`}>${order.amount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex-1">
                                    <p className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1 leading-none">{order.customer}</p>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                                        <span>{order.time}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                        <button
                                            onClick={() => toggleExpand(order.id)}
                                            className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none"
                                        >
                                            {order.items ? order.items.length : 0} Items
                                            {expandedOrderId === order.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pl-2">
                                    {/* Status Update Button */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => toggleMenu(e, order.id, 'status')}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-100 dark:border-green-800/50 hover:border-green-200 transition-all duration-200 shadow-sm hover:shadow-green-500/10"
                                            title="Update Status"
                                        >
                                            <ClipboardList size={18} />
                                        </button>
                                    </div>

                                    {/* Assign/Change Delivery Boy Button */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => toggleMenu(e, order.id, 'assign')}
                                            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 shadow-sm
                                                ${order.deliveryBoy
                                                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:shadow-purple-500/10'
                                                    : 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                                                }`}
                                            title={order.deliveryBoy ? `Assigned to: ${order.deliveryBoy.name}` : 'Assign Delivery Partner'}
                                        >
                                            {order.deliveryBoy ? getDeliveryBoyInitials(order.deliveryBoy.name) : <Bike size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details Accordion */}
                            {expandedOrderId === order.id && order.items && (
                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/50 animate-in slide-in-from-top-2 fade-in duration-200">
                                    <ul className="space-y-2">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                                                <div className="flex gap-2">
                                                    <span className="font-bold text-gray-400 dark:text-gray-500">{item.quantity}x</span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <span className="font-medium">${item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-100/50 dark:border-gray-800/50">
                <button
                    onClick={() => navigate('/orders')}
                    className="group relative w-full py-3 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-primary"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        View All Orders
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </div>

            {/* Portal Dropdown Menus */}
            {(activeMenu.id && menuPosition) && createPortal(
                <div className="fixed inset-0 z-[9999] isolate" style={{ zIndex: 9999 }}>
                    <div className="absolute inset-0 bg-transparent" onClick={closeMenu} />

                    {/* Status Update Menu */}
                    {activeMenu.type === 'status' && (
                        <div
                            className="absolute w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5 origin-top-left"
                            style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
                        >
                            <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">Set Status</p>
                            </div>
                            <div className="p-1.5 space-y-0.5">
                                {nextStatuses.map(status => (
                                    <button key={status} onClick={() => handleStatusUpdate(activeMenu.id, status)} className="w-full text-left text-sm px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 cursor-pointer transition-colors font-medium">
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Assignment Menu */}
                    {activeMenu.type === 'assign' && (
                        <div
                            className="absolute w-60 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5 origin-top-left"
                            style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
                        >
                            <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">Delivery Partner</p>
                            </div>
                            <div className="p-1.5 space-y-0.5 max-h-56 overflow-y-auto custom-scrollbar">
                                {(deliveryBoys || []).length > 0 ? (
                                    (deliveryBoys || []).map(boy => (
                                        <button key={boy.id} onClick={() => handleAssign(activeMenu.id, boy.name)} className="w-full text-left text-sm px-3 py-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transition-colors flex items-center gap-3 font-medium">
                                            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-[10px] font-bold text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-black/5">
                                                {getDeliveryBoyInitials(boy.name)}
                                            </div>
                                            {boy.name}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl m-1 border border-dashed border-gray-200 dark:border-gray-700">
                                        <Bike size={20} className="mx-auto text-gray-300 mb-2" />
                                        <p className="text-xs text-gray-400 font-medium">No partners active</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
};
export default ConfirmedOrders;
