import React, { useState } from "react";
import LoginForm from "../../components/Auth/Login";

const AuthContainer = () => {
  const [role, setRole] = useState("admin"); // admin | sub_admin

  return (
    <div className="app page flex items-center justify-center">
      <LoginForm
        role={role}
        onRoleChange={setRole}
      />
    </div>
  );
};

export default AuthContainer;
