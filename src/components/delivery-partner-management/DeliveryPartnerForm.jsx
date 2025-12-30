// DeliveryPartnerForm.jsx
import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const DeliveryPartnerForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    cityArea: "",
    vehicleType: "Bike",
    passwordOrOtp: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-red-200 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-white via-red-50 to-red-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-600">Add Delivery Partner</h2>
          <Button onClick={onClose} className="bg-transparent text-red-600 hover:text-red-800 w-auto px-2 py-1" fullWidth={false}>
            ✕
          </Button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">

          {/* Image Upload */}
          <div className="col-span-2 flex justify-center mb-2">
            <label className="relative w-24 h-24 rounded-full border-2 border-dashed border-red-300 flex items-center justify-center cursor-pointer hover:border-red-500 transition">
              {formData.image ? (
                <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full rounded-full object-cover"/>
              ) : (
                <span className="text-xs text-gray-400 text-center">Upload Image</span>
              )}
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden"/>
            </label>
          </div>

          {/* Inputs */}
          <InputField name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
          <InputField name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required/>
          <InputField name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange}/>
          <InputField name="cityArea" placeholder="City / Area" value={formData.cityArea} onChange={handleChange} required/>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input">
            <option>Bike</option>
            <option>Cycle</option>
            <option>Walk</option>
          </select>
          <InputField name="passwordOrOtp" placeholder="Password / OTP" value={formData.passwordOrOtp} onChange={handleChange} required/>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <Button type="submit" className="btn-primary w-auto px-4 py-2" fullWidth={false}>Add Partner</Button>
            <Button type="button" onClick={onClose} className="btn-secondary w-auto px-4 py-2" fullWidth={false}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryPartnerForm;
