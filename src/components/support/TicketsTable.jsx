import React from 'react';
import { Calendar, User, MessageSquare } from 'lucide-react';
import TicketStatusBadge from './TicketStatusBadge';
import TicketPriorityBadge from './TicketPriorityBadge';
import ActionButtons from '../ui/ActionButton';
import { FiEye, FiMessageSquare, FiX } from 'react-icons/fi';

const TicketsTable = ({ tickets = [], onView, onReply, onClose }) => {
  if (tickets.length === 0) {
    return <div className="rounded-2xl border border-white/20 p-12 text-center text-gray-400 text-lg">No tickets found</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/20">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ticket ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Subject</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Priority</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Created</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {tickets.map((ticket) => (
            <tr key={ticket.ticketId} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-mono text-primary">{ticket.ticketId}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{ticket.subject}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{ticket.customerName}</p>
                    <p className="text-xs text-gray-500">{ticket.customerEmail}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4"><TicketPriorityBadge priority={ticket.priority} /></td>
              <td className="px-6 py-4"><TicketStatusBadge status={ticket.status} /></td>
              <td className="px-6 py-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <ActionButtons
                  actions={[
                    { key: 'view', icon: FiEye, color: 'blue', onClick: () => onView(ticket) },
                    { key: 'reply', icon: FiMessageSquare, color: 'cyan', onClick: () => onReply(ticket), disabled: ['closed', 'resolved'].includes(ticket.status) },
                    { key: 'close', icon: FiX, color: 'rose', onClick: () => onClose(ticket.ticketId), disabled: ticket.status === 'closed' }
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsTable;