import React from 'react';
import Badge from '../ui/Badge'; // Your existing Badge component

const StatusBadge = ({ status }) => {
  const statusConfig = {
    completed: {
      type: 'active',
      text: 'Completed'
    },
    pending: {
      type: 'gold',
      text: 'Pending'
    },
    failed: {
      type: 'inactive',
      text: 'Failed'
    },
    refunded: {
      type: 'silver',
      text: 'Refunded'
    }
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <Badge type={config.type} size="md">
      {config.text}
    </Badge>
  );
};

export default StatusBadge;