import React from "react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

const Tax = () => {
  return (
    <div className="card space-y-6">
      <h2 className="highlight text-3xl font-bold">Tax & Charges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="GST (%)" />
        <InputField label="Service Charge (%)" />
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Tax Settings</Button>
      </div>
    </div>
  );
};

export default Tax;
