import React, { useState } from 'react';
import { ArrowRight, Bike, ClipboardList, MoreVertical, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSummaryCard = ({ title, orders, icon: Icon, color, type, deliveryBoys }) => {
  const [assigningOrderId, setAssigningOrderId] = useState(null);
  const [statusUpdateOrderId, setStatusUpdateOrderId] = useState(null);
  const [actionsMenuOrderId, setActionsMenuOrderId] = useState(null);

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
  const navigate = useNavigate();

  const nextStatuses = ['Preparing', 'Cooking', 'Packing', 'Ready for Pickup'];

  const handleConfirmOrder = (orderId) => {
    if (window.confirm(`Confirm order ${orderId}?`)) {
      console.log(`Order ${orderId} confirmed.`);
      // API call to update status to 'confirmed' would go here
      setActionsMenuOrderId(null);
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Cancel order ${orderId}?`)) {
      console.log(`Order ${orderId} cancelled.`);
      // API call to update status to 'cancelled' would go here
      setActionsMenuOrderId(null);
    }
  };

  const handleAssign = (orderId, boyName) => {
    if (window.confirm(`Assign ${boyName} to order ${orderId}?`)) {
      console.log(`Order ${orderId} assigned to ${boyName}`);
      // Here you would typically make an API call to update the order
      setAssigningOrderId(null); // Close dropdown after assignment
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    if (window.confirm(`Update order ${orderId} to "${newStatus}"?`)) {
      console.log(`Order ${orderId} status updated to ${newStatus}`);
      // API call would go here
      setStatusUpdateOrderId(null); // Close dropdown
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

  const handleDropdownClick = (e) => {
    // Prevent card click from closing dropdowns
    e.stopPropagation();
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${classes.iconBg}`}>
            <Icon size={20} className={classes.text} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {orders.map((order) => (
            <div key={order.id} className={`p-3 rounded-lg flex justify-between items-center ${classes.bg}`}>
              <div>
                <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{order.id}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{order.customer}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`font-bold text-sm ${classes.text}`}>${order.amount.toFixed(2)}</p>
                  {order.status && (
                    <span className={`mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${statusStyles[order.status.toLowerCase()] || 'bg-gray-200 text-gray-800'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  )}
                </div>
                {type === 'upcoming' ? (
                  <div className="relative" onClick={handleDropdownClick}>
                    <button
                      onClick={() => setActionsMenuOrderId(actionsMenuOrderId === order.id ? null : order.id)}
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      title="Actions"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {actionsMenuOrderId === order.id && (
                      <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-10">
                        <button onClick={() => handleConfirmOrder(order.id)} className="w-full text-left text-sm px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-green-600 dark:text-green-400 cursor-pointer">
                          <Check size={14} /> Confirm Order
                        </button>
                        <button onClick={() => handleCancelOrder(order.id)} className="w-full text-left text-sm px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400 cursor-pointer">
                          <X size={14} /> Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                ) : type === 'confirmed' ? (
                  <div className="flex gap-1 pl-2" onClick={handleDropdownClick}>
                    {/* Status Update Button */}
                    <div className="relative">
                      <button
                        onClick={() => setStatusUpdateOrderId(statusUpdateOrderId === order.id ? null : order.id)}
                        className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors cursor-pointer"
                        title="Update Status"
                      >
                        <ClipboardList size={14} />
                      </button>
                      {statusUpdateOrderId === order.id && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-10">
                          <p className="text-xs font-bold p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-200">Update to:</p>
                          {nextStatuses.map(status => (
                            <button key={status} onClick={() => handleStatusUpdate(order.id, status)} className="w-full text-left text-sm px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 cursor-pointer">
                              {status}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Assign/Change Delivery Boy Button */}
                    <div className="relative">
                      <button
                        onClick={() => setAssigningOrderId(assigningOrderId === order.id ? null : order.id)}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center font-bold text-xs
                          ${order.deliveryBoy
                            ? 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-300 dark:hover:bg-purple-700 w-6 h-6'
                            : 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800'
                          }`}
                        title={order.deliveryBoy ? `Assigned to: ${order.deliveryBoy.name}. Click to change.` : 'Assign Delivery Partner'}
                      >
                        {order.deliveryBoy ? getDeliveryBoyInitials(order.deliveryBoy.name) : <Bike size={14} />}
                      </button>
                      {assigningOrderId === order.id && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-10">
                          <p className="text-xs font-bold p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-200">Assign to:</p>
                          {(deliveryBoys || []).map(boy => (
                            <button key={boy.id} onClick={() => handleAssign(order.id, boy.name)} className="w-full text-left text-sm px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 cursor-pointer">
                              {boy.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <button
          onClick={() => navigate('/orders')}
          className="w-full text-sm font-bold text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 flex items-center justify-center gap-2 transition-colors cursor-pointer">
          View All
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryCard;