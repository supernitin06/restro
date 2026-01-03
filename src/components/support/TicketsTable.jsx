import React from 'react';
import { Calendar, User, MessageSquare } from 'lucide-react';
import TicketStatusBadge from './TicketStatusBadge';
import TicketPriorityBadge from './TicketPriorityBadge';
import ActionButtons from '../ui/ActionButton';
import { FiEye, FiMessageSquare, FiX } from 'react-icons/fi';
import Table from '../ui/Table';

const TicketsTable = ({ tickets = [], onView, onReply, onClose }) => {

  const columns = [
    {
      header: "Ticket ID",
      render: (ticket) => (
        <span className="font-mono text-primary font-medium">{ticket.ticketId}</span>
      )
    },
    {
      header: "Subject",
      render: (ticket) => (
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900 dark:text-white">{ticket.subject}</span>
        </div>
      )
    },
    {
      header: "Customer",
      render: (ticket) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{ticket.customerName}</p>
            <p className="text-xs text-gray-500">{ticket.customerEmail}</p>
          </div>
        </div>
      )
    },
    {
      header: "Priority",
      render: (ticket) => (
        <TicketPriorityBadge priority={ticket.priority} />
      )
    },
    {
      header: "Status",
      render: (ticket) => (
        <TicketStatusBadge status={ticket.status} />
      )
    },
    {
      header: "Created",
      render: (ticket) => (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          {new Date(ticket.createdAt).toLocaleDateString()}
        </div>
      )
    },
    {
      header: "Actions",
      render: (ticket) => (
        <ActionButtons
          item={ticket}
          actions={[
            { key: 'view', icon: FiEye, color: 'blue', onClick: () => onView(ticket) },
            { key: 'reply', icon: FiMessageSquare, color: 'cyan', onClick: () => onReply(ticket), disabled: ['closed', 'resolved'].includes(ticket.status) },
            { key: 'close', icon: FiX, color: 'rose', onClick: () => onClose(ticket.ticketId), disabled: ticket.status === 'closed' }
          ]}
        />
      )
    }
  ];

  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center text-gray-500 dark:text-gray-400">
        No tickets found
      </div>
    );
  }

  return (
    <Table
      data={tickets}
      columns={columns}
      title="Recent Tickets"
      subtitle={`${tickets.length} total • ${tickets.filter(t => t.status === "open").length} open`}
    />
  );
};

export default TicketsTable;