import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
 
const EditMenuModal = ({ open, item, onClose, onSave }) => {
  const [form, setForm] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (item) {
      setForm(item);
    }
  }, [item]);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open || !item) return null;
 
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
 
  const handleSubmit = () => {
    onSave(form);
    onClose();
  };
 
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl w-[420px] p-6 space-y-4 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Menu Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
 
        <InputField
          label="Item Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
 
        <InputField
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
 
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.available}
            onChange={() => handleChange("available", !form.available)}
          />
          Available
        </label>
 
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.veg}
            onChange={() => handleChange("veg", !form.veg)}
          />
          Veg
        </label>
 
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.bestseller}
            onChange={() =>
              handleChange("bestseller", !form.bestseller)
            }
          />
          Bestseller
        </label>
 
        <div className="flex justify-end gap-3 pt-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};
 
export default EditMenuModal;