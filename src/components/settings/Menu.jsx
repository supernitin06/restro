import React from "react";
import Button from "../../components/ui/Button";

const Menu = () => {
  return (
    <div className="card space-y-6">
      <h2 className="text-heading">Menu Settings</h2>

      <div className="flex justify-between items-center">
        <p className="font-medium">Show Menu on Website</p>
        <Button variant="active" size="sm">Enabled</Button>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">Allow Out of Stock Items</p>
        <Button variant="inactive" size="sm">Disabled</Button>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Menu Settings</Button>
      </div>
    </div>
  );
};

export default Menu;
