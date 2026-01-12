// src/pages/ProcessingOrders.jsx
import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Bike } from "lucide-react";
import OrderDetailsModal from "../../components/OrderPages/OrderDetailsModal";
import { useGetDeliveryPartnersQuery } from "../../api/services/deliveryPartnerApi";
import { useAssignDeliveryMutation, useGetOrdersQuery } from "../../api/services/orderApi";
import { ordersSocket } from "../../socket/ordersSocket";

import ActionButton from "../../components/ui/ActionButton";
import { Eye, CheckCircle, Truck } from "lucide-react";
import { showSuccessAlert } from "../../utils/toastAlert";

const ProcessingOrders = () => {
  const [assignDeliveryApi, { isLoading: assigning }] =
    useAssignDeliveryMutation();

  const { data: partnerApi } = useGetDeliveryPartnersQuery();
  console.log("📋 Delivery partners data:", partnerApi);
  const { data, refetch } = useGetOrdersQuery({ status: 'READY' });
  const orders = data?.data || [];
  const [partnerSearch, setPartnerSearch] = useState("");
  const [viewingOrder, setViewingOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const deliveryPartners = React.useMemo(() => {
    if (!partnerApi?.success) return [];
    return partnerApi.data; // 👈 FULL DATA
  }, [partnerApi]);
  const filteredPartners = React.useMemo(() => {
    const term = partnerSearch.toLowerCase().trim();
    if (!term) return deliveryPartners;

    return deliveryPartners.filter((p) =>
      p.name?.toLowerCase().includes(term) ||
      p.city?.toLowerCase().includes(term)
    );
  }, [deliveryPartners, partnerSearch]);

  const openDrawer = (order) => {
    console.log("🔍 Opening drawer for order:", order);
    setCurrentOrder(order);
    setDrawerOpen(true);
  };
  const assignPartner = async (partner) => {
    console.log("🟡 Assign partner function called with:", partner);

    if (!currentOrder) return;

    const payload = {
      order: {
        id: currentOrder.id,
        resId: currentOrder.resId,
        orderId: currentOrder.orderId,
        customer: currentOrder.customer,
        items: currentOrder.items,
        location: currentOrder.location,
        status: currentOrder.status,
      },
      deliveryPartner: {
        id: partner._id,
        name: partner.name,
        phone: partner.phone,
        vehicleType: partner.vehicleType,
      },
      timestamp: new Date().toISOString(),
    };

    console.log("📦 Emitting ASSIGN_DELIVERY:", payload);

    // API call first
    console.log("🚀 Calling assignDelivery API with orderId:", currentOrder.orderId, "partnerId:", partner._id);
    await assignDeliveryApi({ orderId: currentOrder.orderId, partnerId: partner._id });
    console.log("✅ Assign API call successful", partner._id, currentOrder.orderId);

    // Show success toast with partner name
    showSuccessAlert(`✅ Successfully assigned to ${partner.name}`);

    // Refetch to update the list
    refetch();

    setDrawerOpen(false);
    setCurrentOrder(null);
  };

  useEffect(() => {
    if (!ordersSocket) return;

    console.log("🧩 Registering socket listeners");

    ordersSocket.on("DELIVERY_ASSIGNED", (data) => {
      console.log("✅ DELIVERY_ASSIGNED:", data);
      if (data?.deliveryPartner?.name) {
        showSuccessAlert(`✅ ${data.deliveryPartner.name} is on the way!`);
      }
    });

    return () => {
      console.log("🧹 Removing socket listeners");
      ordersSocket.off("DELIVERY_ASSIGNED");
    };
  }, []);



  const orderActions = [
    // {
    //   key: "view",
    //   label: "View Order",
    //   icon: Eye,
    //   color: "blue",
    //   onClick: (order) => setViewingOrder(order),
    // },
    // {
    //   key: "ready",
    //   label: "Mark Ready",
    //   icon: CheckCircle,
    //   color: "emerald", // same as before
    //   show: (order) => order.status === "preparing",
    //   onClick: (order) => updateStatus(order, "ready"),
    // },
    // {
    //   key: "out",
    //   label: "Out for Delivery",
    //   icon: Truck,
    //   color: "amber", // changed from purple → amber
    //   show: (order) => order.status === "ready",
    //   onClick: (order) => updateStatus(order, "out_for_delivery"),
    // },
  ];
  const columns = [
    {
      header: "Order ID",
      render: (order) => (
        <span className="highlight font-bold">{order.orderId}</span>
      ),
    },
    {
      header: "Customer",
      render: (order) => (
        <div>
          <div className="font-medium">{order.customer.name}</div>
        </div>
      ),
    },

    {
      header: "Phone",
      render: (order) => (
        <div className="text-sm text-gray-600">{order.customer.phone}</div>
      ),
    },

    {
      header: "Items",
      render: (order) => (
        <div className="relative group min-w-[180px]">
          {/* Visible Items */}
          <div className="flex flex-col gap-1">
            {order.items.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-xs"
              >
                <span className="truncate max-w-[140px]" title={item.name}>
                  {item.name}
                </span>
                <span className="font-semibold bg-gray-100 px-2 py-0.5 rounded">
                  {item.quantity}
                </span>
              </div>
            ))}

            {order.items.length > 2 && (
              <span className="highlight font-medium cursor-pointer">
                +{order.items.length - 2} more
              </span>
            )}
          </div>

          {/* Hover Popover */}
          {order.items.length > 2 && (
            <div
              className="
      absolute
      left-full
      top-0
      ml-[-200px]
      z-[9999]
      opacity-0
      translate-x-2
      pointer-events-none
      transition-all
      duration-300
      ease-out
      group-hover:opacity-100
      group-hover:translate-x-0
      group-hover:pointer-events-auto
    "
            >
              <div className="bg-white shadow-2xl rounded-xl p-4 w-64 border border-purple-100">
                <h4 className="text-sm font-bold text-purple-700 mb-2">
                  All Items
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="truncate">{item.name}</span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },

    {
      header: "Payment",
      render: (order) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${order.payment?.status === "PAID"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {order.payment?.status || "PENDING"}
        </span>
      ),
    },
    {
      header: "Delivery Partner",
      render: (order) => (
        <div className="flex items-center gap-2">
          {order.delivery ? (
            <>
              <Bike size={16} className="text-purple-500" />
              <span className="text-sm font-medium">{order.delivery.partner?.name || 'Assigned'}</span>
            </>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => openDrawer(order)}
            >
              Assign
            </Button>
          )}
        </div>
      ),
    },

    {
      header: "Actions",
      render: (order) => (
        <ActionButton
          item={order}
          actions={orderActions}
          maxVisible={2}
          size="sm"
        />
      ),
    },
  ];

  return (
    <div className="app page p-6">
      {/* Page Header */}
      <div className="mb-6 bg-gradient-to-r from-purple-50 via-white to-purple-50 shadow-lg rounded-xl p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="highlight text-4xl font-extrabold">
            Processing Orders
          </h1>
          <span className="highlight font-bold bg-purple-100 px-3 py-1 rounded-full">
            {orders.length} Orders
          </span>
        </div>
        <p className="text-gray-500 mt-2">
          Manage all ongoing orders and assign delivery partners efficiently
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No processing orders
        </div>
      ) : (
        <div className="bg-gradient-to-r from-white to-gray-50 shadow-2xl rounded-xl p-6">
          <div className="overflow-x-auto">
            <Table columns={columns} data={orders} />
          </div>
        </div>
      )}

      {viewingOrder && (
        <OrderDetailsModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white origin-top shadow-2xl z-50 transform transition-transform duration-500 ${drawerOpen ? "scale-100" : "scale-0"
          } flex flex-col rounded-l-3xl overflow-hidden`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white shadow-md">
          <h2 className="text-2xl font-extrabold text-red-600 tracking-wide">
            Assign Delivery Partner
          </h2>
        </div>

        {/* Drawer Content: Scrollable Partner List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {/* Search Input */}
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search by name or location"
              value={partnerSearch}
              onChange={(e) => setPartnerSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Partner List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {filteredPartners.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                No delivery partners found
              </div>
            ) : (
              filteredPartners.map((partner) => (
                <div
                  key={partner._id}
                  className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-md"
                  onClick={() => assignPartner(partner)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{partner.name}</span>
                    <span className="text-sm text-gray-500">{partner.phone}</span>
                    <span className="text-xs text-gray-400">
                      {partner.vehicleType} • {partner.isOnline ? "🟢 Online" : "🔴 Offline"}
                    </span>
                  </div>
                  <Bike className="text-red-500" />
                </div>

              ))
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-500 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setDrawerOpen(false)}
      ></div>
    </div>
  );
};

export default ProcessingOrders;
