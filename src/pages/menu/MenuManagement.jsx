// src/pages/menu/MenuManagement.jsx
import MenuList from "../../components/menu/MenuList";
import Button from "../../components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MenuManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button onClick={() => navigate("/menu-management/add")}>
          <FiPlus /> Add Menu
        </Button>
      </div>

      <MenuList />
    </div>
  );
};

export default MenuManagement;
