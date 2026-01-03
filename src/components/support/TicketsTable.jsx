import React from 'react';
import { Calendar, User, MessageSquare } from 'lucide-react';
import TicketStatusBadge from './TicketStatusBadge';
import TicketPriorityBadge from './TicketPriorityBadge';
import Table from '../ui/Table';
import { FiEye, FiMessageSquare, FiX } from 'react-icons/fi';

const TicketsTable = ({ tickets = [], onView, onReply, onClose }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 cursor-pointer">
      {tickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No tickets found.</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Total tickets in system: {tickets.length}
          </p>
        </div>
      ) : (
        <>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Showing {tickets.length} of {tickets.length} tickets
          </div>
          <Table
            data={tickets}
            columns={[
        { 
          header: "Ticket ID", 
          key: "ticketId", 
          render: (ticket) => (
            <span className="font-mono text-primary font-medium">{ticket.ticketId}</span>
          )
        },
        { 
          header: "Subject", 
          key: "subject", 
          render: (ticket) => (
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900 dark:text-white">{ticket.subject}</span>
            </div>
          )
        },
        { 
          header: "Customer", 
          key: "customerName", 
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
          key: "priority", 
          render: (ticket) => <TicketPriorityBadge priority={ticket.priority} />
        },
        { 
          header: "Status", 
          key: "status", 
          render: (ticket) => <TicketStatusBadge status={ticket.status} />
        },
        { 
          header: "Created", 
          key: "createdAt", 
          render: (ticket) => (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {new Date(ticket.createdAt).toLocaleDateString()}
            </div>
          )
        },
      ]}
      actions={[
        { 
          key: 'view', 
          icon: FiEye, 
          color: 'blue', 
          onClick: (ticket) => onView(ticket) 
        },
        { 
          key: 'reply', 
          icon: FiMessageSquare, 
          color: 'cyan', 
          onClick: (ticket) => onReply(ticket), 
          disabled: (ticket) => ['closed', 'resolved'].includes(ticket.status) 
        },
        { 
          key: 'close', 
          icon: FiX, 
          color: 'rose', 
          onClick: (ticket) => onClose(ticket.ticketId), 
          disabled: (ticket) => ticket.status === 'closed' 
        }
      ]}
      title="Support Tickets"
          />
        </>
      )}
    </div>
  );
};

export default TicketsTable;
