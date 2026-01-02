import React from "react";
import Button from "../../components/ui/Button";

const Notifications = () => {
  return (
    <div className="card space-y-6">
      <h2 className="text-heading">Notifications</h2>

      <div className="space-y-3">
        <Button variant="active" fullWidth>Email Notifications</Button>
        <Button variant="inactive" fullWidth>SMS Notifications</Button>
        <Button variant="inactive" fullWidth>WhatsApp Notifications</Button>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Notification Settings</Button>
      </div>
    </div>
  );
};

export default Notifications;
