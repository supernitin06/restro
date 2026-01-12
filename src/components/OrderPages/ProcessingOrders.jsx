// src/pages/ProcessingOrders.jsx
import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Bike } from "lucide-react";
import OrderDetailsModal from "../../components/OrderPages/OrderDetailsModal";
import { useGetDeliveryPartnersQuery } from "../../api/services/deliveryPartnerApi";
import { useAssignDeliveryMutation, useUpdateOrderStatusMutation, useGetOrdersQuery } from "../../api/services/orderApi";
import { ordersSocket } from "../../socket/ordersSocket";
import ActionButton from "../../components/ui/ActionButton";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";

const ProcessingOrders = () => {
  const [assignDeliveryApi] = useAssignDeliveryMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const { data: partnerApi } = useGetDeliveryPartnersQuery();
  const { data, refetch } = useGetOrdersQuery({});
  const allOrders = data?.data || [];
  const orders = allOrders.filter(order => order.status === "READY" || order.status === "REJECTED");
  const [partnerSearch, setPartnerSearch] = useState("");
  const [viewingOrder, setViewingOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [rejectingOrderId, setRejectingOrderId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const deliveryPartners = React.useMemo(() => {
    if (!partnerApi?.success) return [];
    return partnerApi.data;
  }, [partnerApi]);

  // Filter: show all partners that are available, optional search
  const filteredPartners = React.useMemo(() => {
    const term = partnerSearch.toLowerCase().trim();
    const filtered = deliveryPartners.filter(
      (p) =>
        p.isAvailable && // only check availability
        (!term ||
          p.name?.toLowerCase().includes(term) ||
          p.city?.toLowerCase().includes(term))
    );
    console.log("🔎 Filtered partners (available):", filtered);
    return filtered;
  }, [deliveryPartners, partnerSearch]);

  const openDrawer = (order) => {
    console.log("🔍 Opening drawer for order:", order);
    setCurrentOrder(order);
    setDrawerOpen(true);
  };

  const assignPartner = async (partner) => {
    if (!currentOrder) return;

    console.log("🟡 Assigning partner:", partner);

    try {
      await assignDeliveryApi({ orderId: currentOrder.orderId, partnerId: partner._id }).unwrap();
      console.log("✅ Partner assigned successfully:", partner.name);
      showSuccessAlert(`✅ Assigned to ${partner.name}`);
      refetch();
    } catch (err) {
      console.error("❌ Assign API failed:", err);
    }

    setDrawerOpen(false);
    setCurrentOrder(null);
  };

  const handleReject = async (orderId, reason) => {
    try {
      await updateOrderStatus({ id: orderId, status: "REJECTED", message: reason }).unwrap();
      showSuccessAlert("Order rejected and customer notified");
      refetch();
      setRejectingOrderId(null);
      setRejectReason("");
    } catch (err) {
      console.error("REJECT ERROR:", err);
      showErrorAlert("Failed to reject order");
    }
  };

  useEffect(() => {
    if (!ordersSocket) return;
    console.log("🧩 Registering socket listener for DELIVERY_ASSIGNED");

    ordersSocket.on("DELIVERY_ASSIGNED", (data) => {
      console.log("✅ DELIVERY_ASSIGNED received via socket:", data);
      if (data?.deliveryPartner?.name) {
        showSuccessAlert(`✅ ${data.deliveryPartner.name} is on the way!`);
      }
    });

    return () => {
      console.log("🧹 Removing socket listener");
      ordersSocket.off("DELIVERY_ASSIGNED");
    };
  }, []);

  const columns = [
    { header: "Order ID", render: (order) => <span className="highlight font-bold">{order.orderId}</span> },
    { header: "Customer", render: (order) => <div className="font-medium">{order.customer.name}</div> },
    { header: "Phone", render: (order) => <div className="text-sm text-gray-600">{order.customer.phone}</div> },
    { header: "Items", render: (order) => <div>{order.items.map(i => i.name).join(", ")}</div> },
    {
      header: "Payment",
      render: (order) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${order.payment?.status === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {order.payment?.status || "PENDING"}
        </span>
      ),
    },
    {
      header: "Delivery Partner",
      render: (order) =>
        order.delivery ? (
          <div className="flex items-center gap-2">
            <Bike size={16} className="text-purple-500" />
            <span className="text-sm font-medium">{order.delivery.partner?.name || "Assigned"}</span>
          </div>
        ) : (
          <Button size="sm" variant="primary" onClick={() => openDrawer(order)}>
            Assign
          </Button>
        ),
    },
    { header: "Actions", render: (order) => (
      order.status === "REJECTED" ? (
        <span className="text-red-600 font-semibold">Rejected</span>
      ) : (
        rejectingOrderId === order.orderId ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
            <div className="flex gap-1">
              <Button size="sm" variant="danger" onClick={() => handleReject(order.orderId, rejectReason)} disabled={!rejectReason.trim()}>
                Confirm
              </Button>
              <Button size="sm" variant="secondary" onClick={() => { setRejectingOrderId(null); setRejectReason(""); }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button size="sm" variant="danger" onClick={() => setRejectingOrderId(order.orderId)}>
            Reject
          </Button>
        )
      )
    ) },
  ];

  return (
    <div className="app page p-6">
      <div className="mb-6 bg-gradient-to-r from-purple-50 via-white to-purple-50 shadow-lg rounded-xl p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="highlight text-4xl font-extrabold">Processing Orders</h1>
          <span className="highlight font-bold bg-purple-100 px-3 py-1 rounded-full">{orders.length} Orders</span>
        </div>
        <p className="text-gray-500 mt-2">Manage all ongoing orders and assign delivery partners efficiently</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No processing orders</div>
      ) : (
        <div className="bg-gradient-to-r from-white to-gray-50 shadow-2xl rounded-xl p-6 overflow-x-auto">
          <Table columns={columns} data={orders} />
        </div>
      )}

      {viewingOrder && <OrderDetailsModal order={viewingOrder} onClose={() => setViewingOrder(null)} />}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white origin-top shadow-2xl z-50 transform transition-transform duration-500 ${drawerOpen ? "scale-100" : "scale-0"} flex flex-col rounded-l-3xl overflow-hidden`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white shadow-md">
          <h2 className="text-2xl font-extrabold text-red-600 tracking-wide">Assign Delivery Partner</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search by name or location"
              value={partnerSearch}
              onChange={(e) => setPartnerSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {filteredPartners.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">No delivery partners found</div>
            ) : (
              filteredPartners.map((partner) => (
                <div
                  key={partner._id}
                  className={`flex justify-between items-center p-4 rounded-2xl shadow-md cursor-pointer hover:bg-gray-50`}
                  onClick={() => assignPartner(partner)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{partner.name}</span>
                    <span className="text-sm text-gray-500">{partner.phone}</span>
                    <span className="text-xs text-gray-400">
                      {partner.vehicleType} • {partner.isOnline ? "🟢 Online" : "🔴 Offline"} • {partner.isActive ? "✅ Active" : "❌ Inactive"} • {partner.isAvailable ? "✅ Available" : "❌ Busy"}
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
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-500 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default ProcessingOrders;
