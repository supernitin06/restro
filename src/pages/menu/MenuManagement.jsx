// src/pages/menu/MenuManagement.jsx
import MenuList from "../../components/menu/MenuList";
import Button from "../../components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MenuManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (user?.restaurantId) {
      setRestaurant(user.restaurantId);
    }
  }, [user]);
  console.log("restaurant", restaurant);

  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button onClick={() => navigate("/menu-management/add")}>
          <FiPlus /> Add Menu
        </Button>
      </div>


      <div className="relative z-10">
        {/* Menu List */}
        <MenuList
          menus={menuList}
          onEdit={handleEdit}
        />
      </div>

    </div>
  );
};

export default MenuManagement;