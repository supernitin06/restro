import React, { useEffect, useState } from "react";
import Button from "../ui/Button";

const EMPTY_FORM = {
  id: "",
  code: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "",
  status: "active",
  canEdit: true,
};

const CouponModal = ({ isOpen, mode, coupon, onClose, onSave }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "add") {
      setFormData(EMPTY_FORM);
    } else {
      setFormData(coupon || EMPTY_FORM);
    }
  }, [isOpen, mode, coupon]);

  if (!isOpen) return null;

  const isView = mode === "view";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="card card-elevated w-full max-w-2xl bg-[var(--bg-card)] p-6 rounded-xl animate-scaleIn">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {mode} Coupon
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={isView}
              className="input"
              placeholder="Coupon Code"
            />

            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              disabled={isView}
              className="input"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>

            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              disabled={isView}
              className="input"
              placeholder="Discount Value"
            />

            <input
              type="number"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={handleChange}
              disabled={isView}
              className="input"
              placeholder="Min Order Amount"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isView}
              className="input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="inactive" onClick={onClose}>
              Cancel
            </Button>

            {!isView && (
              <Button variant="primary" onClick={() => onSave(formData)}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponModal;
