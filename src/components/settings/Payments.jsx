import React from "react";
import Button from "../../components/ui/Button";

const Payments = () => {
  return (
    <div className="card space-y-6">
      <h2 className="highlight text-3xl font-bold">Payment Methods</h2>

      <div className="space-y-3">
        <Button variant="active" fullWidth>Cash</Button>
        <Button variant="active" fullWidth>UPI</Button>
        <Button variant="inactive" fullWidth>Card</Button>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Payment Settings</Button>
      </div>
    </div>
  );
};

export default Payments;
