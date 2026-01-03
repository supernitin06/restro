import React, { useState } from "react";
import offersData from "../assets/json/offers.json";
import { normalizeCoupon, normalizeOffer } from "../utils/normalizeCoupon"; // मान लो दोनों normalize फंक्शन हैं

import SearchFilter from "../components/offers/SearchFilter";
import OffersTable from "../components/offers/OffersTable";     // नया टेबल बनाया
import CouponsTable from "../components/offers/CouponsTable";
import OfferModal from "../components/offers/OfferModal";       // नया modal
import CouponModal from "../components/offers/CouponModal";
import Button from "../components/ui/Button";

const OffersManagement = () => {
  // टैब स्टेट
  const [activeTab, setActiveTab] = useState("offers"); // "offers" या "coupons"

  // डेटा
  const [offers, setOffers] = useState(
    offersData.offersManagement.offersList.map(normalizeOffer)
  );
  const [coupons, setCoupons] = useState(
    offersData.offersManagement.couponsList.map(normalizeCoupon)
  );

  // सर्च और फिल्टर
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // मॉडल स्टेट
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState(""); // add, edit, view
  const [isModalOpen, setIsModalOpen] = useState(false);

  // फिल्टर लॉजिक (दोनों के लिए एक ही सर्च/फिल्टर यूज कर रहे हैं)
  const filteredOffers = offers.filter((o) => {
    const matchSearch = o.title.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = filterStatus ? o.status === filterStatus.toLowerCase() : true;
    return matchSearch && matchStatus;
  });

  const filteredCoupons = coupons.filter((c) => {
    const matchSearch = c.code.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = filterStatus ? c.status === filterStatus.toLowerCase() : true;
    return matchSearch && matchStatus;
  });

  // मॉडल हैंडलर्स
  const openModal = (item, mode) => {
    setSelectedItem(item);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalMode("");
    setIsModalOpen(false);
  };

  const saveOffer = (data) => {
    if (modalMode === "add") {
      setOffers((prev) => [
        { ...data, offerId: "OFF" + Date.now(), actions: { canEdit: true } },
        ...prev,
      ]);
    } else {
      setOffers((prev) => prev.map((o) => (o.offerId === data.offerId ? data : o)));
    }
    closeModal();
  };

  const saveCoupon = (data) => {
    if (modalMode === "add") {
      setCoupons((prev) => [
        { ...data, couponId: "CUP" + Date.now(), actions: { canEdit: true } },
        ...prev,
      ]);
    } else {
      setCoupons((prev) => prev.map((c) => (c.couponId === data.couponId ? data : c)));
    }
    closeModal();
  };

  const deleteOffer = (id) => {
    if (!window.confirm("Delete this offer?")) return;
    setOffers((prev) => prev.filter((o) => o.offerId !== id));
  };

  const deleteCoupon = (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    setCoupons((prev) => prev.filter((c) => c.couponId !== id));
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="flex bg-primary flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">Offers & Coupons Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
            Manage offers, coupons, and promotions across your platform.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            onClick={() => openModal(null, "add")}
          >
            + Add {activeTab === "offers" ? "Offer" : "Coupon"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setActiveTab("offers");
            setSearchText("");
            setFilterStatus("");
          }}
          className={`pb-3 px-1 font-medium text-lg border-b-4 transition-colors ${activeTab === "offers"
            ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          Offers
        </button>
        <button
          onClick={() => {
            setActiveTab("coupons");
            setSearchText("");
            setFilterStatus("");
          }}
          className={`pb-3 px-1 font-medium text-lg border-b-4 transition-colors ${activeTab === "coupons"
            ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          Coupons
        </button>
      </div>

      {/* Search & Filter */}
      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Conditional Table */}
      {activeTab === "offers" ? (
        <>
          <OffersTable
            offers={filteredOffers}
            onView={(o) => openModal(o, "view")}
            onEdit={(o) => openModal(o, "edit")}
            onDelete={deleteOffer}
          />
          <OfferModal
            isOpen={isModalOpen}
            mode={modalMode}
            offer={selectedItem}
            onClose={closeModal}
            onSave={saveOffer}
          />
        </>
      ) : (
        <>
          <CouponsTable
            coupons={filteredCoupons}
            onView={(c) => openModal(c, "view")}
            onEdit={(c) => openModal(c, "edit")}
            onDelete={deleteCoupon}
          />
          <CouponModal
            isOpen={isModalOpen}
            mode={modalMode}
            coupon={selectedItem}
            onClose={closeModal}
            onSave={saveCoupon}
          />
        </>
      )}
    </div>
  );
};

export default OffersManagement;