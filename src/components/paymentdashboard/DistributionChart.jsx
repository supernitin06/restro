import React from 'react';
import { CreditCard, Wallet, Building, Smartphone } from 'lucide-react';

const DistributionChart = () => {
  const methods = [
    { name: 'Credit Card', value: 45, color: 'from-cyan-500 to-blue-600', icon: CreditCard },
    { name: 'Digital Wallet', value: 25, color: 'from-emerald-500 to-green-600', icon: Wallet },
    { name: 'Bank Transfer', value: 20, color: 'from-violet-500 to-purple-600', icon: Building },
    { name: 'Mobile Payment', value: 10, color: 'from-amber-500 to-orange-600', icon: Smartphone },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
        <span className="text-sm text-gray-400">Distribution</span>
      </div>
      
      <div className="space-y-4">
        {methods.map((method, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color}/20`}>
                  <method.icon className={`w-4 h-4 bg-gradient-to-br ${method.color} bg-clip-text text-transparent`} />
                </div>
                <span className="text-gray-300">{method.name}</span>
              </div>
              <span className="font-semibold text-white">{method.value}%</span>
            </div>
            
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${method.color}`}
                style={{ width: `${method.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionChart;