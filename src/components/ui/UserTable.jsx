import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Badge from './Badge';
import ActionButtons from '../../components/ui/UserAction';

const UserTable = ({ users = [], actions = [], onToggleStatus }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-2xl border border-white/20 scrollbar-hide max-h-[500px]">
      <table className="min-w-full">
        <thead>
          <tr className="bg-white/10 border-b border-white/20">
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Contact</th>
            <th className="px-6 py-4 text-left">Membership</th>
            <th className="px-6 py-4 text-left">Stats</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
              <td className="px-6 py-4 font-semibold">{user.name}</td>

              <td className="px-6 py-4 text-sm text-gray-300 space-y-1">
                <div className="flex gap-2"><Mail className="w-4 h-4" />{user.email}</div>
                <div className="flex gap-2"><Phone className="w-4 h-4" />{user.phone}</div>
              </td>

              <td className="px-6 py-4">
                <Badge type={user.membership}>{user.membership}</Badge>
              </td>

              <td className="px-6 py-4">
                {user.totalOrders} orders
              </td>

              <td className="px-6 py-4">
                <button onClick={() => onToggleStatus(user.id)}>
                  <Badge type={user.status}>{user.status}</Badge>
                </button>
              </td>

              <td className="px-6 py-4">
                <ActionButtons
                  item={user}
                  actions={actions}
                  showMoreMenu={true}
                  size="sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
