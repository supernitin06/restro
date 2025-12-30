const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
          {item.image}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
          <p className="text-xs text-gray-500">x{item.quantity}</p>
        </div>
      </div>
      <span className="font-bold text-blue-600">${item.price.toFixed(2)}</span>
    </div>
  );
};

export default OrderItem;
