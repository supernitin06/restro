import React, { useState } from "react";
import offersData from "../assets/json/offers.json";
import { normalizeCoupon, normalizeOffer } from "../utils/normalizeCoupon";

import SearchFilter from "../components/offers/SearchFilter";
import OffersTable from "../components/offers/OffersTable";
import CouponsTable from "../components/offers/CouponsTable";
import OfferModal from "../components/offers/OfferModal";
import CouponModal from "../components/offers/CouponModal";
import Button from "../components/ui/Button";
import {
  useGetOffersQuery,
  usePostOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation
} from "../api/services/offer";
import toast from "react-hot-toast";

const OffersManagement = () => {
  // \u091f\u0948\u092b \u0938\u094d\u091f\u0947\u091f
  const [activeTab, setActiveTab] = useState("offers"); // "offers" or "coupons"

  // API Hooks
  const { data: offersDataApi, isLoading, isError } = useGetOffersQuery();
  const [createOffer] = usePostOfferMutation(   { refetchOnMountOrArgChange: true }) ;
  const [updateOffer] = useUpdateOfferMutation(   { refetchOnMountOrArgChange: true });
  const [deleteOfferApi] = useDeleteOfferMutation(   { refetchOnMountOrArgChange: true });

  // Transform API Data
  const transformOffer = (apiOffer) => ({
    offerId: apiOffer._id,
    title: apiOffer.title,
    code: apiOffer.code || '',
    description: apiOffer.description,
    discountType: apiOffer.offerType?.toLowerCase() || 'percentage',
    discountValue: apiOffer.discountValue,
    minOrderValue: apiOffer.minOrderValue,
    status: apiOffer.isActive ? 'active' : 'inactive',
    validity: { startDate: apiOffer.validFrom, endDate: apiOffer.validUntil },
    image: apiOffer.image,
  });

  const offers = offersDataApi?.data?.map(transformOffer) || [];

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
    const matchSearch = o.title?.toLowerCase().includes(searchText.toLowerCase());
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

  const saveOffer = async (data) => {
    // Transform Modal Data to API Payload if needed
    // Assuming Modal returns clean data matching API expectation or close enough
    const payload = {
      title: data.title,
      description: data.description,
      offerType: data.discountType?.toUpperCase() || "PERCENTAGE",
      discountValue: Number(data.discountValue),
      minOrderValue: Number(data.minOrderValue),
      validFrom: data.validity?.startDate,
      validUntil: data.validity?.endDate,
      isActive: data.status === 'active',
      image: data.image
    };

    try {
      if (modalMode === "add") {
        await createOffer(payload).unwrap();
        toast.success("Offer added successfully");
        // Toast handled by API middleware or add here?
      } else {
        await updateOffer({ id: data.offerId, ...payload }).unwrap(); // Check if updateOffer expects (id, data) or ({id, ...data})
        toast.success("Offer updated successfully");
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save offer:", error);
      toast.error("Failed to save offer");
    }
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

  const deleteOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      await deleteOfferApi(id).unwrap();
    } catch (error) {
      console.error("Failed to delete offer:", error);
    }
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
            ? "border-highlight rounded-sm highlight text-blue-500"
            : "border-none text-gray-500"
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
            ? "border-highlight rounded-sm highlight text-blue-500"
            : "border-none text-gray-500"
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