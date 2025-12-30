// DeliveryPartnerManagement.jsx
import React, { useState } from "react";
import deliveryData from "../assets/json/delivery-partner-management.json";

import DeliveryPartnerList from "../components/delivery-partner-management/DeliveryPartner";
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
    const filtered = partners.filter((p) =>
      p.listView.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPartners(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Delivery Partner Management</h1>
        <Button onClick={openForm} className="btn-primary w-auto px-4 py-2" fullWidth={false}>
          + Add Delivery Partner
        </Button>
      </div>

      {/* Search */}
      <DeliveryPartnerSearchFilter onSearch={handleFilter} />

      {/* List */}
      <DeliveryPartnerList
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
