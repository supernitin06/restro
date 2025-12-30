import React from 'react';
import { Star, Heart } from 'lucide-react';

const TrendingMenu = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Grilled Chicken Delight',
      category: 'Main Course',
      rating: 4.9,
      reviews: 490,
      price: '$16.00',
      image: '🍗',
      gradient: 'from-orange-100 to-orange-50'
    },
    {
      id: 2,
      name: 'Sunny Citrus Cake',
      category: 'Dessert',
      rating: 4.8,
      reviews: 400,
      price: '$8.50',
      image: '🍰',
      gradient: 'from-yellow-100 to-yellow-50'
    },
    {
      id: 3,
      name: 'Fiery Shrimp Salad',
      category: 'Appetizer',
      rating: 4.7,
      reviews: 380,
      price: '$12.00',
      image: '🥗',
      gradient: 'from-red-100 to-red-50'
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Trending Menus</h3>
        <button className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
          This Week ▼
        </button>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300 group border border-gray-100 hover:border-gray-200"
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
              {item.image}
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-base mb-1">{item.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-800">{item.rating}</span>
                  <span className="text-xs text-gray-400">({item.reviews})</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xl font-bold text-[#eb2528] mb-2">{item.price}</p>
              <button className="p-2 rounded-lg hover:bg-red-50 transition-colors group/like">
                <Heart className="w-5 h-5 text-gray-300 group-hover/like:text-red-500 group-hover/like:fill-red-500 transition-colors" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        View All Menu
      </button>
    </div>
  );
};

export default TrendingMenu;