import React from "react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

const Profile = () => {
  return (
    <div className="card space-y-6">
      <div>
        <h2 className="highlight text-3xl font-bold">Restaurant Profile</h2>
        <p className="text-muted mt-1">Public restaurant information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Owner Name" placeholder="Enter owner name" />
        <InputField label="Restaurant Email" type="email" />
        <InputField label="Phone Number" />
        <InputField label="Restaurant Address" />
      </div>

      <div className="flex justify-end">
        <Button variant="primary">Save Profile</Button>
      </div>
    </div>
  );
};

export default Profile;
