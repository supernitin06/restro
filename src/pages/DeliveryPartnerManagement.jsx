// DeliveryPartnerManagement.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { useGetDeliveryPartnersQuery } from "../api/services/deliveryPartnerApi";

import DeliveryPartner from "../components/delivery-partner-management/DeliveryPartner";
import DeliveryPartnerDetailsModal from "../components/delivery-partner-management/DeliveryPartnerDetailsModal";
import DeliveryPartnerForm from "../components/delivery-partner-management/DeliveryPartnerForm";
import DeliveryPartnerSearchFilter from "../components/delivery-partner-management/DeliveryPartnerSearchFilter";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";

const DeliveryPartnerManagement = () => {
  const { data: apiResponse, isLoading, error } = useGetDeliveryPartnersQuery();
  const [partners, setPartners] = useState([]);

  const [filteredPartners, setFilteredPartners] = useState(partners);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('partnerViewMode') || 'grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
          email: p.email || "",
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
    setCurrentPage(1); // Reset to first page on filter change
  }, [partners, searchTerm, statusFilter]);

  const partnerCounts = useMemo(() => {
    return {
      all: partners.length,
      active: partners.filter(p => p.listView.status === 'Active').length,
      inactive: partners.filter(p => p.listView.status === 'Inactive').length,
    }
  }, [partners]);

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const currentPartners = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredPartners.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPartners, currentPage, itemsPerPage]);
  const handleViewDetails = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPartner(null);
    setIsModalOpen(false);
  };

  const handleAddPartner = () => {
    setEditingPartner(null);
    setIsFormOpen(true);
  };

  const handleEditPartner = (partner) => {
    setEditingPartner(partner);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingPartner(null);
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
        <Button onClick={handleAddPartner} variant="primary" className="mt-4 md:mt-0">
          <UserPlus size={18} />
          Add Partner
        </Button>
      </div>

      {/* Search */}
      <DeliveryPartnerSearchFilter
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={partnerCounts}
      />

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : (
        <DeliveryPartner
          partners={currentPartners}
          onViewDetails={handleViewDetails}
          onEdit={handleEditPartner}
          updatePartner={updatePartner}
          viewMode={viewMode}
        />
      )}

      {/* Details Modal */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
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
          partner={editingPartner}
        />
      )}
    </div>
  );
};

export default DeliveryPartnerManagement;
