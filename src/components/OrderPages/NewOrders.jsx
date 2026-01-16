import { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiX, FiTruck } from "react-icons/fi";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateKitchenStatusMutation,
  useAssignDeliveryMutation,
} from "../../api/services/orderApi";
// OrderFlowTable.jsx ke top me
import { useGenerateInvoiceMutation } from "../../api/services/invoiceApi";

import { useGetDeliveryPartnersQuery } from "../../api/services/deliveryPartnerApi";
import { useSockets } from "../../context/SocketContext";
import Pagination from "../../components/ui/Pagination";
import OrderDetailsModal from "../../components/OrderPages/OrderDetailsModal";
import Button from "../../components/ui/Button";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";
import { Bike } from "lucide-react";
import { FiSearch } from "react-icons/fi";

const STATUS_FLOW = ["PLACED", "ACCEPTED", "PREPARING", "READY", "ASSIGNED"];
const STATUS_COLORS = {
  PLACED: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800",
  ACCEPTED: "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800",
  PREPARING: "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800",
  READY: "bg-gradient-to-r from-green-200 to-green-300 text-green-800",
  ASSIGNED: "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800",
};

const OrderFlowTable = () => {
  const { data, refetch } = useGetOrdersQuery({
    page: 1,
    limit: 10000, // 🔹 Fetch all orders
    refetchOnMountOrArgChange: true,
  });

  const { data: partnersData } = useGetDeliveryPartnersQuery();
  const { ordersSocket } = useSockets();
  const ITEMS_PER_PAGE = 20;

  const [updateStatus] = useUpdateOrderStatusMutation();
  const [updateKitchenStatus] = useUpdateKitchenStatusMutation();
  const [assignDelivery] = useAssignDeliveryMutation();
  const [generateInvoice] = useGenerateInvoiceMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingOrder, setViewingOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [partnerSearch, setPartnerSearch] = useState("");
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const allOrders = data?.data || [];
  const deliveryPartners = partnersData?.data || [];
  const downloadInvoicePDF = (invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Invoice #${invoice.invoiceNumber}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Customer: ${invoice.customerDetails.name}`, 14, 30);
    doc.text(`Phone: ${invoice.customerDetails.phone}`, 14, 36);
    doc.text(`Address: ${invoice.customerDetails.address}`, 14, 42);
    doc.text(
      `Payment: ${invoice.payment.method} (${invoice.payment.status})`,
      14,
      48
    );

   autoTable(doc, {
  startY: 55,
  head: [["Item", "Qty", "Total"]],
  body: invoice.items.map((item) => [
    item.name,
    item.quantity,
    item.total,
  ]),
  theme: "grid",
});

let finalY = doc.lastAutoTable.finalY + 10;

doc.text(`Subtotal: ₹${invoice.amount.subTotal}`, 14, finalY);

if (invoice.amount.tax) {
  finalY += 6;
  doc.text(`Tax: ₹${invoice.amount.tax}`, 14, finalY);
}

if (invoice.amount.deliveryCharge) {
  finalY += 6;
  doc.text(
    `Delivery: ₹${invoice.amount.deliveryCharge}`,
    14,
    finalY
  );
}

finalY += 8;
doc.setFontSize(14);
doc.text(
  `Grand Total: ₹${invoice.amount.grandTotal}`,
  14,
  finalY
);

    doc.text(
      `Grand Total: ₹${invoice.amount.grandTotal}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save(`Invoice-${invoice.invoiceNumber}.pdf`);
  };

  // ===== SOCKET AUTO REFRESH =====
  useEffect(() => {
    if (!ordersSocket) return;
    const refresh = () => refetch();
    ordersSocket.on("ORDER_STATUS_UPDATED", refresh);
    ordersSocket.on("KITCHEN_STATUS_UPDATED", refresh);
    ordersSocket.on("DELIVERY_ASSIGNED", refresh);
    return () => {
      ordersSocket.off("ORDER_STATUS_UPDATED", refresh);
      ordersSocket.off("KITCHEN_STATUS_UPDATED", refresh);
      ordersSocket.off("DELIVERY_ASSIGNED", refresh);
    };
  }, [ordersSocket, refetch]);

  // ===== FILTERED ORDERS =====
  // Reset current page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filtered and sorted orders
  // ===== FILTERED ORDERS =====
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return allOrders;
    const term = searchTerm.toLowerCase();
    return allOrders.filter(
      (o) =>
        o.orderId.toLowerCase().includes(term) ||
        o.customer.name.toLowerCase().includes(term) ||
        o.customer.phone.includes(term) ||
        o.status.toLowerCase().includes(term)
    );
  }, [allOrders, searchTerm]);

  // ===== SORTED =====
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredOrders]);

  // ===== PAGINATION =====
  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);
  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleGenerateInvoice = async (orderId) => {
    try {
      const invoice = await generateInvoice(orderId).unwrap();
      console.log("Invoice generated:", invoice);
      setViewingInvoice(invoice.data); // ← set here for modal & PDF
    } catch (err) {
      console.error("Invoice generation failed:", err);
      showErrorAlert(err?.data?.message || "Failed to generate invoice");
    }
  };

  // ===== SEARCH DELIVERY PARTNERS =====
  const filteredPartners = useMemo(() => {
    const term = partnerSearch.toLowerCase();
    if (!term) return deliveryPartners;
    return deliveryPartners.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.city?.toLowerCase().includes(term)
    );
  }, [deliveryPartners, partnerSearch]);

  // ===== STATUS ACTIONS =====
  const handleAccept = async (orderId) => {
    try {
      await updateStatus({ id: orderId, status: "ACCEPTED" }).unwrap();
      showSuccessAlert("Order Accepted");
      refetch();
    } catch (err) {
      console.error("handleAccept Error:", err);
      showErrorAlert(err?.data?.message || "Failed to accept order");
    }
  };
  const handleReject = async (orderId) => {
    try {
      await updateStatus({ id: orderId, status: "REJECTED" }).unwrap();
      showSuccessAlert("Order Rejected");
      refetch();
    } catch (err) {
      console.error("handleReject Error:", err);
      showErrorAlert(err?.data?.message || "Failed to reject order");
    }
  };
  const handlePrepare = async (orderId) => {
    try {
      await updateKitchenStatus({ orderId, status: "PREPARING" }).unwrap();
      showSuccessAlert("Order Preparing");
      refetch();
    } catch (err) {
      console.error("handlePrepare Error:", err);
      showErrorAlert(err?.data?.message || "Failed to update status");
    }
  };
  const handleReady = async (orderId) => {
    try {
      // Also update the main status to READY so it can be assigned
      await updateKitchenStatus({ orderId, status: "READY" }).unwrap();
      console.log("handleReady Success ready");
      showSuccessAlert("Order is Ready for assignment!");
      refetch();
    } catch (err) {
      console.error("handleReady Error:", err);
      showErrorAlert(err?.data?.message || "Failed to mark order as Ready");
    }
  };
  const handleAssign = (order) => {
    setCurrentOrder(order);
    setDrawerOpen(true);
  };
  const assignPartner = async (partner) => {
    if (!currentOrder) return;
    try {
      await assignDelivery({
        orderId: currentOrder,
        partnerId: partner._id,
      }).unwrap();
      showSuccessAlert(`Assigned ${partner.name}`);
      setDrawerOpen(false);
      setCurrentOrder(null);
      refetch();
    } catch (err) {
      console.error("assignPartner Error:", err);
      showErrorAlert(err?.data?.message || "Failed to assign partner");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 p-4 bg-white rounded-lg border border-gray-200">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-600 tracking-tight">
          Order Management
        </h1>

        {/* Search Box */}
        <div className="flex items-center w-full md:w-72 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-dark-400 transition">
          <FiSearch size={18} className="text-gray-400 mr-3" />

          <input
            type="text"
            placeholder="Search order / customer / status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-black-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow justify-center relative">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-[10px]">
            <tr>
              <th className="sticky left-0 bg-gray-100 z-20 text-center px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">
                S.No
              </th>

              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Placed On
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Timeline
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Current Status
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Delivery Partner
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Assigned On
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-[10px]">
            {currentOrders.map((order, idx) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="sticky left-0 bg-white z-10 text-center px-2 py-2 shadow-md">
                  {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.customer.name}</td>
                <td className="px-4 py-2">{order.customer.phone}</td>
                <td className="px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                {/* Timeline */}
                <td className="px-4 py-2 flex gap-1 items-center">
                  {STATUS_FLOW.map((s) => {
                    const completed =
                      STATUS_FLOW.indexOf(order.status) >=
                      STATUS_FLOW.indexOf(s);
                    return (
                      <div
                        key={s}
                        className={`px-2 py-1 text-[10px] rounded font-semibold ${
                          completed
                            ? STATUS_COLORS[s]
                            : "bg-gray-100 text-gray-400"
                        }`}
                        title={
                          order.timestamps?.[s]
                            ? `At: ${new Date(
                                order.timestamps[s]
                              ).toLocaleString()}`
                            : ""
                        }
                      >
                        {s}
                      </div>
                    );
                  })}
                </td>

                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-semibold ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-4 py-2">
                  {order.delivery?.partner ? (
                    <>
                      {order.delivery.partner.name} <br />
                      <span className="text-[10px] text-gray-500">
                        {order.delivery.partner.phone}
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="px-4 py-2">
                  {order.delivery?.assignedAt
                    ? new Date(order.delivery.assignedAt).toLocaleString()
                    : "—"}
                </td>

                {/* Actions */}
                <td className="px-4 py-2 flex flex-col gap-1">
                  {order.status === "PLACED" && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleAccept(order._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleReject(order._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {order.status === "ACCEPTED" && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handlePrepare(order.orderId)}
                    >
                      Prepare
                    </Button>
                  )}
                  {order.status === "PREPARING" && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleReady(order.orderId)}
                    >
                      Ready
                    </Button>
                  )}
                  {order.status === "READY" && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleAssign(order.orderId)}
                    >
                      Assign
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setViewingOrder(order)}
                  >
                    View
                  </Button>
                  {order.status === "ASSIGNED" && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleGenerateInvoice(order._id)}
                      className="bg-orange-500"
                    >
                      Generate Invoice
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {currentOrders.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 space-x-2 justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Order Modal */}
      {viewingOrder && (
        <OrderDetailsModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}

      {/* Assign Drawer */}
      {drawerOpen && currentOrder && (
        <>
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white shadow-sm">
              {/* Title with Truck Icon */}
              <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                <FiTruck size={24} className="text-red-600" />
                Assign Delivery Partner
              </h2>

              {/* Close Button */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-red-100 text-red-600 transition duration-200"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <input
                type="text"
                placeholder="Search Partner"
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
                className="w-full rounded-4xl px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:border-red-500 transition duration400"
              />
              {filteredPartners.map((p) => (
                <div
                  key={p._id}
                  className={`p-3 rounded-lg mb-2 shadow flex justify-between items-center cursor-pointer ${
                    p.isAvailable === false
                      ? "bg-red-100 opacity-50 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => p.isAvailable !== false && assignPartner(p)}
                >
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-[10px] text-gray-500">{p.phone}</div>
                    <div className="text-[10px] text-gray-400">
                      {p.vehicleType} {p.isAvailable === false ? "(Busy)" : ""}
                    </div>
                  </div>
                  <Bike className="text-purple-500" />
                </div>
              ))}
              {filteredPartners.length === 0 && (
                <div className="text-center text-gray-400 mt-6">
                  No partners found
                </div>
              )}
            </div>
          </div>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        </>
      )}

     {viewingInvoice && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white w-[400px] md:w-[500px] p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[80vh] animate-slideIn">

      {/* Header */}
      <div className="mb-4 pb-2 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
          Invoice #{viewingInvoice.invoiceNumber}
        </h2>
        <button
          className="text-gray-400 hover:text-gray-600 text-xl"
          onClick={() => setViewingInvoice(null)}
        >
          ✕
        </button>
      </div>

      {/* Customer Details */}
      <div className="mb-4 text-sm space-y-1">
        <p><span className="font-semibold">Customer:</span> {viewingInvoice.customerDetails.name}</p>
        <p><span className="font-semibold">Phone:</span> {viewingInvoice.customerDetails.phone}</p>
        <p><span className="font-semibold">Address:</span> {viewingInvoice.customerDetails.address}</p>
        <p>
          <span className="font-semibold">Payment:</span>{" "}
          {viewingInvoice.payment.method} ({viewingInvoice.payment.status})
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left text-gray-600">Item</th>
              <th className="py-2 px-3 text-center text-gray-600">Qty</th>
              <th className="py-2 px-3 text-right text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {viewingInvoice.items.map((item, idx) => (
              <tr key={item._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-3">{item.name}</td>
                <td className="py-2 px-3 text-center">{item.quantity}</td>
                <td className="py-2 px-3 text-right">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Amount Breakdown */}
      <div className="mt-4 text-sm space-y-1 border-t pt-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{viewingInvoice.amount.subTotal}</span>
        </div>

        {viewingInvoice.amount.tax && (
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{viewingInvoice.amount.tax}</span>
          </div>
        )}

        {viewingInvoice.amount.deliveryCharge && (
          <div className="flex justify-between text-gray-600">
            <span>Delivery</span>
            <span>₹{viewingInvoice.amount.deliveryCharge}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="mt-3 flex justify-between text-lg font-bold">
        <span>Grand Total</span>
        <span className="text-red-500">
          ₹{viewingInvoice.amount.grandTotal}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          onClick={() => setViewingInvoice(null)}
        >
          Close
        </button>
        <button
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
          onClick={() => downloadInvoicePDF(viewingInvoice)}
        >
          Download PDF
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default OrderFlowTable;