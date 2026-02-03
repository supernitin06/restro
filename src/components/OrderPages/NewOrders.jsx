import { useEffect, useState, useMemo, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiX, FiTruck } from "react-icons/fi";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateKitchenStatusMutation,
  useAssignDeliveryMutation,
} from "../../api/services/orderApi";
import { useGenerateInvoiceMutation } from "../../api/services/invoice";
import { useGetDeliveryPartnersQuery } from "../../api/services/deliveryPartnerApi";
import { useSockets } from "../../context/SocketContext";
import Pagination from "../../components/ui/Pagination";
import OrderDetailsModal from "../../components/OrderPages/OrderDetailsModal";
import Button from "../../components/ui/Button";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";
import { Bike } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import TrackOrder from "./TrackOrder";
import TrackOrderButton from "./TrackOrderButton";

const STATUS_FLOW = ["PLACED", "ACCEPTED", "PREPARING", "READY", "ASSIGNED"];
const STATUS_COLORS = {
  PLACED: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800",
  ACCEPTED: "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800",
  PREPARING: "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800",
  READY: "bg-gradient-to-r from-green-200 to-green-300 text-green-800",
  ASSIGNED: "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800",
};

const NewOrders = () => {
  const { data, refetch } = useGetOrdersQuery(
    {
      page: 1,
      limit: 5000,
      refetchOnMountOrArgChange: true,
    },
    {
      refetchOnFocus: true,
    },
  );

  const {
    data: partnersData,
    isLoading: partnersLoading,
    refetch: partnersRefetch,
  } = useGetDeliveryPartnersQuery();

  const { ordersSocket } = useSockets();
  const ITEMS_PER_PAGE = 20;

  const [updateStatus, { isLoading: updateStatusLoading }] =
    useUpdateOrderStatusMutation();
  const [updateKitchenStatus, { isLoading: updateKitchenStatusLoading }] =
    useUpdateKitchenStatusMutation();
  const [assignDelivery, { isLoading: assignDeliveryLoading }] =
    useAssignDeliveryMutation();
  const [generateInvoice, { isLoading: generateInvoiceLoading }] =
    useGenerateInvoiceMutation();

  const [loadingAction, setLoadingAction] = useState({ id: null, type: null });

  const processingOrdersRef = useRef(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingOrder, setViewingOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [partnerSearch, setPartnerSearch] = useState("");
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [trackOrder, setTrackOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const allOrders = data?.data || [];
  const deliveryPartners = partnersData?.data || [];
const downloadInvoicePDF = (invoice) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(16);
  doc.text(`Invoice #${invoice.invoiceNumber}`, 14, 20);

  doc.setFontSize(11);
  doc.text(`Customer: ${invoice.customerDetails.name}`, 14, 30);
  doc.text(`Phone: ${invoice.customerDetails.phone}`, 14, 36);
  doc.text(`Address: ${invoice.customerDetails.address}`, 14, 42);

  const pType = invoice.payment?.type || invoice.type;
  const pMethod = invoice.payment?.method || invoice.method;
  const paymentDisplay =
    pType && pMethod && pType !== pMethod ? `${pType} - ${pMethod}` : pType || pMethod || "N/A";

  doc.text(
    `Payment: ${paymentDisplay} (${invoice.payment?.status || invoice.status || "PENDING"})`,
    14,
    48
  );

  // Items Table
  autoTable(doc, {
    startY: 55,
    head: [["Item", "Qty", "Total"]],
    body: invoice.items.map((item) => {
      const itemTotal = item.total ?? ((item.price ?? item.finalItemPrice ?? 0) * (item.quantity ?? 1));
      return [item.name, item.quantity, `₹${itemTotal}`];
    }),
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [240, 240, 240], textColor: 20 },
    columnStyles: { 0: { cellWidth: 90 }, 1: { cellWidth: 30, halign: "center" }, 2: { cellWidth: 40, halign: "right" } },
  });

  let finalY = doc.lastAutoTable.finalY + 8;
  doc.setFontSize(11);

  // SUBTOTAL
  const subTotal = invoice.amount?.subTotal ?? invoice.items?.reduce(
    (acc, item) => acc + (item.total ?? ((item.price ?? item.finalItemPrice ?? 0) * (item.quantity ?? 1))),
    0
  );
  if (subTotal > 0) {
    doc.text(`Subtotal: ₹${subTotal}`, 14, finalY);
    finalY += 6;
  }

  // TAX
  if (invoice.amount?.tax > 0) {
    doc.text(`Tax: +₹${invoice.amount.tax}`, 14, finalY);
    finalY += 6;
  }

  // DELIVERY
  let deliveryAmount = Number(invoice.amount?.deliveryCharge || invoice.amount?.deliveryFee || 0);
  // Fallback: Calculate delivery if missing but total implies it
  if (deliveryAmount <= 0) {
    const grandTotal = Number(invoice.amount?.grandTotal ?? invoice.amount?.payable ?? 0);
    const tax = Number(invoice.amount?.tax || 0);
    const discount = Number(invoice.amount?.discount || 0);
    const calculatedDelivery = grandTotal - subTotal - tax + discount;
    if (calculatedDelivery > 0.5) deliveryAmount = calculatedDelivery; // > 0.5 to avoid float rounding errors
  }

  if (deliveryAmount > 0) {
    doc.text(`Delivery: +₹${deliveryAmount}`, 14, finalY);
    finalY += 6;
  }

  // DISCOUNT
  if (invoice.amount?.discount > 0) {
    doc.text(`Discount: -₹${invoice.amount.discount}`, 14, finalY);
    finalY += 6;
  }

  finalY += 2; // Spacer

  // GRAND TOTAL
  doc.setFontSize(14);
  doc.text(
    `Grand Total: ₹${invoice.amount?.grandTotal ?? invoice.amount?.payable ?? 0}`,
    14,
    finalY
  );

  // Save PDF
  doc.save(`Invoice-${invoice.invoiceNumber}.pdf`);
};




  // ===== SOCKET AUTO REFRESH =====
  useEffect(() => {
    if (!ordersSocket) return;
    const refresh = (data) => {
      console.log("🔄 Socket Event Received - Refetching Orders...", data);
      refetch();
    };
    ordersSocket.on("ORDER_STATUS_UPDATED", refresh);
    ordersSocket.on("KITCHEN_STATUS_UPDATED", refresh);
    ordersSocket.on("DELIVERY_ASSIGNED", refresh);
    ordersSocket.on("NEW_ORDER", refresh); // Added NEW_ORDER listener
    ordersSocket.on("ORDER_PICKED_UP", refresh); // Added for track order
    ordersSocket.on("ORDER_DELIVERED_BY_PARTNER", refresh); // Added for completion

    return () => {
      ordersSocket.off("ORDER_STATUS_UPDATED", refresh);
      ordersSocket.off("KITCHEN_STATUS_UPDATED", refresh);
      ordersSocket.off("DELIVERY_ASSIGNED", refresh);
      ordersSocket.off("NEW_ORDER", refresh);
      ordersSocket.off("ORDER_PICKED_UP", refresh);
      ordersSocket.off("ORDER_DELIVERED_BY_PARTNER", refresh);
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
        o.status.toLowerCase().includes(term),
    );
  }, [allOrders, searchTerm]);

  // ===== SORTED =====
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [filteredOrders]);

  // ===== PAGINATION =====
  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);

  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
        p.city?.toLowerCase().includes(term),
    );
  }, [deliveryPartners, partnerSearch]);

  // ===== STATUS ACTIONS =====
  const handleAccept = async (orderId) => {
    if (processingOrdersRef.current.has(orderId)) return;
    processingOrdersRef.current.add(orderId);
    setLoadingAction({ id: orderId, type: "ACCEPT" });

    try {
      await updateStatus({ id: orderId, status: "ACCEPTED" }).unwrap();
      showSuccessAlert("Order Accepted");
      // Await refetch to ensure UI updates before re-enabling interactions
      await refetch();
    } catch (err) {
      console.error("handleAccept Error:", err);
      showErrorAlert(err?.data?.message || "Failed to accept order");
    } finally {
      processingOrdersRef.current.delete(orderId);
      setLoadingAction({ id: null, type: null });
    }
  };
  const handleReject = async (orderId) => {
    if (processingOrdersRef.current.has(orderId)) return;
    processingOrdersRef.current.add(orderId);
    setLoadingAction({ id: orderId, type: "REJECT" });
    try {
      await updateStatus({ id: orderId, status: "REJECTED" }).unwrap();
      showSuccessAlert("Order Rejected");
      await refetch();
    } catch (err) {
      console.error("handleReject Error:", err);
      showErrorAlert(err?.data?.message || "Failed to reject order");
    } finally {
      processingOrdersRef.current.delete(orderId);
      setLoadingAction({ id: null, type: null });
    }
  };
  const handlePrepare = async (orderId) => {
    if (processingOrdersRef.current.has(orderId)) return;
    processingOrdersRef.current.add(orderId);
    setLoadingAction({ id: orderId, type: "PREPARE" });
    try {
      await updateKitchenStatus({ orderId, status: "PREPARING" }).unwrap();
      showSuccessAlert("Order Preparing");
      await refetch();
    } catch (err) {
      console.error("handlePrepare Error:", err);
      showErrorAlert(err?.data?.message || "Failed to update status");
    } finally {
      processingOrdersRef.current.delete(orderId);
      setLoadingAction({ id: null, type: null });
    }
  };
  const handleReady = async (orderId) => {
    if (processingOrdersRef.current.has(orderId)) return;
    processingOrdersRef.current.add(orderId);
    setLoadingAction({ id: orderId, type: "READY" });
    try {
      // Also update the main status to READY so it can be assigned
      await updateKitchenStatus({ orderId, status: "READY" }).unwrap();
      console.log("handleReady Success ready");
      showSuccessAlert("Order is Ready for assignment!");
      await refetch();
    } catch (err) {
      console.error("handleReady Error:", err);
      showErrorAlert(err?.data?.message || "Failed to mark order as Ready");
    } finally {
      processingOrdersRef.current.delete(orderId);
      setLoadingAction({ id: null, type: null });
    }
  };
  const handleAssign = (order) => {
    setCurrentOrder(order);
    setDrawerOpen(true);
  };
  const assignPartner = async (partner) => {
    if (!currentOrder || processingOrdersRef.current.has(currentOrder)) return;
    processingOrdersRef.current.add(currentOrder);
    setLoadingAction({ id: currentOrder, type: "ASSIGN" });
    try {
      await assignDelivery({
        orderId: currentOrder,
        partnerId: partner._id,
      }).unwrap();
      showSuccessAlert(`Assigned ${partner.name}`);
      setDrawerOpen(false);
      setCurrentOrder(null);
      await refetch();
    } catch (err) {
      console.error("assignPartner Error:", err);
      // Attempt to verify if it actually succeeded despite the error (e.g. timeout)
      try {
        const { data: freshData } = await refetch();
        const updatedOrder = freshData?.data?.find(
          (o) => o.orderId === currentOrder,
        );

        if (updatedOrder && updatedOrder.status === "ASSIGNED") {
          showSuccessAlert(`Assigned ${partner.name}`);
          setDrawerOpen(false);
          setCurrentOrder(null);
          return;
        }
      } catch (e) {
        console.error("Verification refetch failed", e);
      }

      showErrorAlert(err?.data?.message || "Failed to assign partner");
    } finally {
      if (currentOrder) processingOrdersRef.current.delete(currentOrder);
      setLoadingAction({ id: null, type: null });
    }
  };

  const handleGenerateInvoiceProtected = async (orderId) => {
    if (processingOrdersRef.current.has(orderId)) return;
    processingOrdersRef.current.add(orderId);
    setLoadingAction({ id: orderId, type: "INVOICE" });
    try {
      await handleGenerateInvoice(orderId);
    } finally {
      processingOrdersRef.current.delete(orderId);
      setLoadingAction({ id: null, type: null });
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-600 tracking-tight">
          Order Management
        </h1>

        {/* Search Box */}
        <div className="flex items-center w-full md:w-80 bg-white/80 backdrop-blur-md border border-red-200 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-red-400 focus-within:border-red-400">
          <FiSearch
            size={20}
            className="text-red-400 mr-3 transition-colors duration-300 group-focus-within:text-red-500"
          />

          <input
            type="text"
            placeholder="Search order / customer / status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-800 placeholder-red-300 dark:text-gray-200 dark:placeholder-red-400 text-sm font-medium"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow justify-center relative">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-[10px]">
            <tr className="">
              <th className="sticky left-0 bg-gray-100 dark:bg-gray-700 z-20 text-center px-8 py-2 text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                S.No
              </th>

              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Order ID
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Customer
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Phone
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Placed On
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Timeline
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Current Status
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Amount
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Payment
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Delivery Partner
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Assigned On
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Track Order
              </th>
              <th className="px-8 py-2 text-left text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-[10px]">
            {currentOrders.map((order, idx) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="sticky left-0 bg-white dark:bg-gray-800 z-10 text-center px-2 py-2 shadow-md dark:shadow-sm dark:shadow-gray-700/50">
                  {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>
                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  {order.orderId?.orderId || order.orderId}
                </td>
                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  {order.customer?.name || order.userId?.name || "Unknown"}
                </td>
                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  {order.customer?.phone || order.userId?.phone || "N/A"}
                </td>
                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                {/* Timeline */}
                <td className="px-8 py-2 flex gap-1 items-center">
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
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                        }`}
                        title={
                          order.timestamps?.[s]
                            ? `At: ${new Date(
                                order.timestamps[s],
                              ).toLocaleString()}`
                            : ""
                        }
                      >
                        {s}
                      </div>
                    );
                  })}
                </td>

                <td className="px-8 py-2">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-semibold ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-8 py-2 text-gray-700 dark:text-gray-300 font-bold">
                  ₹
                  {order.amount?.payable ||
                    order.amount?.total ||
                    order.price?.grandTotal ||
                    0}
                </td>

                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  <div className="font-semibold text-[10px] uppercase">
                    {(() => {
                      const type = order.payment?.type || order.type;
                      const method = order.payment?.method || order.method;
                      return type && method && type !== method
                        ? `${type} - ${method}`
                        : type || method || "N/A";
                    })()}
                  </div>
                  <div
                    className={`text-[9px] font-bold ${
                      order.payment?.status === "PAID" ||
                      order.status === "PAID"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {order.payment?.status ||
                      (["PAID", "PENDING", "FAILED"].includes(order.status)
                        ? order.status
                        : "PENDING")}
                  </div>
                </td>

                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
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

                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  {order.delivery?.assignedAt
                    ? new Date(order.delivery.assignedAt).toLocaleString()
                    : "—"}
                </td>
                <td className="px-8 py-2 text-gray-700 dark:text-gray-300">
                  {order.status === "DELIVERED" ? (
                    "Already Delivered"
                  ) : (
                    <TrackOrderButton
                      order={order}
                      onClick={(o) => {
                        setOrderId(o.orderId?.orderId || o.orderId);
                        setTrackOrder(true);
                      }}
                    />
                  )}
                </td>

                {/* Actions */}
                <td className="px-8 py-2 flex flex-col gap-1">
                  {order.status === "PLACED" && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="success"
                        disabled={loadingAction.id === order._id}
                        onClick={() => handleAccept(order._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={loadingAction.id === order._id}
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
                      disabled={
                        loadingAction.id ===
                        (order.orderId?.orderId || order.orderId)
                      }
                      onClick={() =>
                        handlePrepare(order.orderId?.orderId || order.orderId)
                      }
                    >
                      Prepare
                    </Button>
                  )}
                  {order.status === "PREPARING" && (
                    <Button
                      size="sm"
                      variant="success"
                      disabled={
                        loadingAction.id ===
                        (order.orderId?.orderId || order.orderId)
                      }
                      onClick={() =>
                        handleReady(order.orderId?.orderId || order.orderId)
                      }
                    >
                      Ready
                    </Button>
                  )}
                  {order.status === "READY" && (
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={
                        loadingAction.id ===
                          (order.orderId?.orderId || order.orderId) &&
                        loadingAction.type === "ASSIGN"
                      }
                      onClick={() => {
                        partnersRefetch();
                        handleAssign(order.orderId?.orderId || order.orderId);
                      }}
                    >
                      Assign
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={false}
                    onClick={() => setViewingOrder(order)}
                  >
                    View
                  </Button>
                  {order.status === "ASSIGNED" && (
                    <Button
                      size="sm"
                      variant="warning"
                      disabled={loadingAction.id === order._id}
                      onClick={() => handleGenerateInvoiceProtected(order._id)}
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
                <td colSpan={13} className="text-center py-6 text-gray-400">
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

      {/* Track Order Modal */}
      {trackOrder && (
        <TrackOrder orderId={orderId} onClose={() => setTrackOrder(false)} />
      )}

      {/* Assign Drawer */}
      {drawerOpen && currentOrder && (
        <>
          <div className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              {/* Title with Truck Icon */}
              <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                <FiTruck size={24} className="text-red-600" />
                Assign Delivery Partner
              </h2>

              {/* Close Button */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition duration-200"
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
                className="w-full rounded-4xl px-4 py-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:border-red-500 transition duration400"
              />
              {filteredPartners.map((p) => (
                <div
                  key={p._id}
                  className={`p-3 rounded-lg mb-2 shadow flex justify-between items-center cursor-pointer ${
                    p.isAvailable === false
                      ? "bg-red-100 dark:bg-red-900/20 opacity-50 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => p.isAvailable !== false && assignPartner(p)}
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      {p.phone}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">
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
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        </>
      )}

{viewingInvoice && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white dark:bg-gray-900 w-[400px] md:w-[500px] p-6 rounded-2xl shadow-2xl text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
      
      {/* PDF CONTENT START */}
      <div id="invoice-pdf" className="w-full">
        {/* Header */}
        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Invoice #{viewingInvoice.invoiceNumber}
          </h2>
        </div>

        {/* Customer Details */}
        <div className="mb-4 text-sm space-y-1">
          <p className="text-gray-700 dark:text-gray-300"><b className="text-gray-800 dark:text-gray-100">Customer:</b> {viewingInvoice.customerDetails.name}</p>
          <p className="text-gray-700 dark:text-gray-300"><b className="text-gray-800 dark:text-gray-100">Phone:</b> {viewingInvoice.customerDetails.phone}</p>
          <p className="text-gray-700 dark:text-gray-300"><b className="text-gray-800 dark:text-gray-100">Address:</b> {viewingInvoice.customerDetails.address}</p>
          <p className="text-gray-700 dark:text-gray-300">
            <b>Payment:</b> {viewingInvoice.payment?.method || viewingInvoice.method} (
            {viewingInvoice.payment?.status || viewingInvoice.status || "PENDING"})
          </p>
        </div>

        {/* Items + Amount Table */}
        <table className="w-full border border-gray-200 dark:border-gray-700 text-sm table-fixed">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-2 text-left font-semibold text-gray-600 dark:text-gray-300">Item</th>
              <th className="py-2 px-2 text-center w-12 font-semibold text-gray-600 dark:text-gray-300">Qty</th>
              <th className="py-2 px-2 text-right w-20 font-semibold text-gray-600 dark:text-gray-300">Total</th>
            </tr>
          </thead>

          <tbody>
            {viewingInvoice.items.map((item) => {
              const itemTotal = item.total ?? ((item.price ?? item.finalItemPrice ?? 0) * (item.quantity ?? 1));
              return (
                <tr key={item._id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-2 break-words whitespace-normal text-gray-800 dark:text-gray-200">{item.name}</td>
                  <td className="py-2 px-2 text-center text-gray-700 dark:text-gray-300">{item.quantity}</td>
                  <td className="py-2 px-2 text-right font-medium text-gray-800 dark:text-gray-200">₹{itemTotal}</td>
                </tr>
              );
            })}

            {/* TAX */}
            {viewingInvoice.amount?.tax != null && viewingInvoice.amount.tax > 0 && (
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td colSpan="2" className="py-2 px-2 text-right text-gray-600 dark:text-gray-400">Tax</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">₹{viewingInvoice.amount.tax}</td>
              </tr>
            )}

            {/* DELIVERY */}
            {(() => {
              let deliveryVal = Number(viewingInvoice.amount?.deliveryCharge || viewingInvoice.amount?.deliveryFee || 0);
              if (deliveryVal <= 0) {
                 const subTotal = Number(viewingInvoice.amount?.subTotal || viewingInvoice.items?.reduce((acc, item) => acc + (item.total ?? ((item.price ?? item.finalItemPrice ?? 0) * (item.quantity ?? 1))), 0) || 0);
                 const grandTotal = Number(viewingInvoice.amount?.grandTotal ?? viewingInvoice.amount?.payable ?? 0);
                 const tax = Number(viewingInvoice.amount?.tax || 0);
                 const discount = Number(viewingInvoice.amount?.discount || 0);
                 const diff = grandTotal - subTotal - tax + discount;
                 if (diff > 0.5) deliveryVal = diff;
              }
              
              if (deliveryVal > 0) return (
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td colSpan="2" className="py-2 px-2 text-right text-gray-600 dark:text-gray-400">Delivery</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">
                  + ₹{deliveryVal.toFixed(2)}
                </td>
              </tr>
              );
            })()}

            {/* SUBTOTAL */}
            {viewingInvoice.amount?.subTotal != null && viewingInvoice.amount.subTotal > 0 && (
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td colSpan="2" className="py-2 px-2 text-right text-gray-600 dark:text-gray-400">Subtotal</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">₹{viewingInvoice.amount.subTotal}</td>
              </tr>
            )}

            {/* GRAND TOTAL */}
            <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-bold">
              <td colSpan="2" className="py-3 px-2 text-right text-gray-800 dark:text-gray-100">Grand Total</td>
              <td className="py-3 px-2 text-right text-gray-900 dark:text-white">
                ₹{viewingInvoice.amount?.grandTotal ?? viewingInvoice.amount?.payable ?? 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* PDF CONTENT END */}

      {/* Buttons */}
      <div className="mt-5 flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setViewingInvoice(null)}
        >
          Close
        </button>
        <button
          className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
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

export default NewOrders;
