// DeliveryPartnerManagement.jsx
import React, { useState, useEffect } from "react";
import deliveryData from "../assets/json/delivery-partner-management.json";

import DeliveryPartner from "../components/delivery-partner-management/DeliveryPartner";
import DeliveryPartnerDetailsModal from "../components/delivery-partner-management/DeliveryPartnerDetailsModal";
import DeliveryPartnerForm from "../components/delivery-partner-management/DeliveryPartnerForm";
import DeliveryPartnerSearchFilter from "../components/delivery-partner-management/DeliveryPartnerSearchFilter";
import Button from "../components/ui/Button";

const DeliveryPartnerManagement = () => {
  const [partners, setPartners] = useState(
    deliveryData.deliveryPartnerManagement.deliveryPartnerList
  );

  const [filteredPartners, setFilteredPartners] = useState(partners);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
      <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-primary p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="text-heading">
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
      />

      {/* List */}
      <DeliveryPartner
        partners={filteredPartners}
        onViewDetails={handleViewDetails}
        updatePartner={updatePartner}
      />

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
