// DeliveryPartnerManagement.jsx
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetDeliveryPartnersQuery } from "../api/services/deliveryPartnerApi";

import DeliveryPartner from "../components/delivery-partner-management/DeliveryPartner";
import DeliveryPartnerDetailsModal from "../components/delivery-partner-management/DeliveryPartnerDetailsModal";
import DeliveryPartnerForm from "../components/delivery-partner-management/DeliveryPartnerForm";
import DeliveryPartnerSearchFilter from "../components/delivery-partner-management/DeliveryPartnerSearchFilter";
import Button from "../components/ui/Button";

const DeliveryPartnerManagement = () => {
  const { data: apiResponse, isLoading, error } = useGetDeliveryPartnersQuery();
  const [partners, setPartners] = useState([]);

  const [filteredPartners, setFilteredPartners] = useState(partners);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('partnerViewMode') || 'grid');

  // Debugging logs
  console.log("Delivery Partners API Response:", apiResponse);
  console.log("Delivery Partners API Error:", error);

  // Sync API data to local state
  useEffect(() => {
    if (apiResponse?.success && apiResponse?.data) {
      const normalizedData = apiResponse.data.map((p) => ({
        partnerId: p._id,
        listView: {
          name: p.name,
          phone: p.phone,
          city: "N/A", // API does not provide city currently
          status: p.isActive ? "Active" : "Inactive",
          assignedOrdersCount: p.totalOrders || 0,
          vehicleType: p.vehicleType,
          kycStatus: p.kyc?.status || "PENDING",
          isOnline: p.isOnline
        },
        registrationData: {
          name: p.name,
          mobileNumber: p.phone,
          email: "",
          cityArea: "N/A",
          vehicleType: p.vehicleType,
          image: null,
        },
        orderHistory: [],
      }));
      setPartners(normalizedData);
    }
  }, [apiResponse]);

  // Persist view mode
  useEffect(() => {
    localStorage.setItem('partnerViewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    let filtered = partners.filter((p) =>
      p.listView.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (statusFilter !== "All") {
      filtered = filtered.filter((p) => p.listView.status === statusFilter);
    }
    setFilteredPartners(filtered);
  }, [partners, searchTerm, statusFilter]);

  const handleViewDetails = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPartner(null);
    setIsModalOpen(false);
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleAddPartner = (newPartner) => {
    const nextId = partners.length + 1;
    const partnerToAdd = {
      ...newPartner,
      partnerId: newPartner.partnerId || `DP${String(nextId).padStart(3, "0")}`,
      actions: {
        canActivate: false,
        canDeactivate: true,
        canViewOrderHistory: true,
        canManualAssign: true,
      },
    };
    const updated = [...partners, partnerToAdd];
    setPartners(updated);
    setFilteredPartners(updated);
    setIsFormOpen(false);
  };

  const updatePartner = (updatedPartner) => {
    const updatedList = partners.map((p) =>
      p.partnerId === updatedPartner.partnerId ? updatedPartner : p
    );
    setPartners(updatedList);
    setFilteredPartners(updatedList);
    if (selectedPartner?.partnerId === updatedPartner.partnerId) {
      setSelectedPartner(updatedPartner);
    }
  };

  const handleFilter = (value) => {
    let filtered = partners.filter((p) =>
      p.listView.name.toLowerCase().includes(value.toLowerCase())
    );
    if (statusFilter !== "All") {
      filtered = filtered.filter((p) => p.listView.status === statusFilter);
    }
    setFilteredPartners(filtered);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    let filtered = partners.filter((p) =>
      p.listView.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (status !== "All") {
      filtered = filtered.filter((p) => p.listView.status === status);
    }
    setFilteredPartners(filtered);
  };

  return (
    <div className="page page-background ">

      {/* Header */}
      <div className="flex bg-primary flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div >
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            Delivery Partner Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Manage delivery partners, assignments, and performance across your platform.
          </p>
        </div>
        <Button onClick={openForm} className="btn-primary w-auto px-4 py-2 mt-4 md:mt-0" fullWidth={false}>
          + Add Delivery Partner
        </Button>
      </div>

      {/* Search */}
      <DeliveryPartnerSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : (
        <DeliveryPartner
          partners={filteredPartners}
          onViewDetails={handleViewDetails}
          updatePartner={updatePartner}
          viewMode={viewMode}
        />
      )}

      {/* Details Modal */}
      {isModalOpen && selectedPartner && (
        <DeliveryPartnerDetailsModal
          partner={selectedPartner}
          onClose={closeModal}
          updatePartner={updatePartner}
        />
      )}

      {/* Add Form */}
      {isFormOpen && (
        <DeliveryPartnerForm
          onClose={closeForm}
          onSubmit={handleAddPartner}
        />
      )}
    </div>
  );
};

export default DeliveryPartnerManagement;
