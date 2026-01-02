import React from "react";
import Button from "../../components/ui/Button";

const Users = () => {
  return (
    <div className="card space-y-6">
      <h2 className="text-heading">Admin Users</h2>

      <div className="flex justify-between items-center">
        <p>Admin</p>
        <Button variant="danger" size="sm">Remove</Button>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Add New User</Button>
      </div>
    </div>
  );
};

export default Users;
