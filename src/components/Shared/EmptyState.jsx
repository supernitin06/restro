import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  title = "No data found", 
  description = "There's nothing to display here yet.",
  icon: Icon = Inbox 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-cyan-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;