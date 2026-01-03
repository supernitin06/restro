import React from "react";
import Button from "../../components/ui/Button";

const Orders = () => {
  return (
    <div className="card space-y-6">
      <h2 className="highlight text-3xl font-bold">Order Settings</h2>

      <div className="flex justify-between items-center">
        <p>Accept Online Orders</p>
        <Button variant="active" size="sm">Yes</Button>
      </div>

      <div className="flex justify-between items-center">
        <p>Auto Accept Orders</p>
        <Button variant="inactive" size="sm">No</Button>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Order Settings</Button>
      </div>
    </div>
  );
};

export default Orders;
