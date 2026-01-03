import React from "react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

const Delivery = () => {
  return (
    <div className="card space-y-6">
      <h2 className="highlight text-3xl font-bold">Delivery Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Minimum Order Amount" />
        <InputField label="Delivery Charge" />
        <InputField label="Delivery Radius (km)" />
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Delivery Settings</Button>
      </div>
    </div>
  );
};

export default Delivery;
