import React from 'react';
import { Home, ShoppingBag, Bike } from 'lucide-react';

const OrderTypes = () => {
  const orderTypes = [
    {
      id: 1,
      type: 'Dine-In',
      icon: Home,
      orders: 183,
      percentage: 45,
      color: '#2563eb',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'Pick-up',
      icon: ShoppingBag,
      orders: 142,
      percentage: 35,
      color: '#fbbf24',
      bgColor: 'bg-amber-50'
    },
    {
      id: 3,
      type: 'Delivery',
      icon: Bike,
      orders: 81,
      percentage: 20,
      color: '#10b981',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Order Types</h3>
        <button className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
          This Month ▼
        </button>
      </div>

      <div className="space-y-5">
        {orderTypes.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`${item.bgColor} p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="font-semibold text-gray-800">{item.type}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{item.orders}</p>
                </div>
              </div>
              
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-end mt-1">
                <span className="text-xs font-medium text-gray-500">{item.percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTypes;