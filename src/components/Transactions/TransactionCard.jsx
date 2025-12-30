import React from 'react';
import { CreditCard, User, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

const TransactionCard = ({ transaction }) => {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
            <CreditCard className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">#{transaction.id}</h4>
            <p className="text-sm text-gray-400">{transaction.description}</p>
          </div>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <User className="w-4 h-4" />
            Customer
          </div>
          <p className="text-white font-medium">{transaction.customer}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            Date
          </div>
          <p className="text-white font-medium">{transaction.date}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="text-sm text-gray-400">Amount</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {transaction.amount}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-400">Method</p>
          <p className="text-white font-medium">{transaction.method}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;