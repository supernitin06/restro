import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Badge from '../ui/Badge';
import ActionButtons from '../users/UserAction';
import Button from '../ui/Button';

const UserTable = ({ users, onView, onEdit, onDelete, onToggleStatus }) => {
  const handleAction = (action, user) => {
    switch (action) {
      case 'view':
        onView(user);
        break;
      case 'edit':
        onEdit(user);
        break;
      case 'delete':
        onDelete(user.id);
        break;
      default:
        console.log(`Action ${action} triggered for user:`, user);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/20">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gradient-to-r from-white/10 to-white/5 border-b border-white/20">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Membership</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stats</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-gray-400 text-sm">Joined {user.joinDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge type={user.membership.toLowerCase()}>
                  {user.membership}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="text-white font-medium">{user.totalOrders} orders</div>
                  <div className="text-gray-400 text-sm">{user.totalSpent} spent</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Button
                  onClick={() => onToggleStatus(user.id)}
                  className="transition-transform hover:scale-105 active:scale-95 p-0 bg-transparent shadow-none w-auto h-auto min-h-0"
                >
                  <Badge type={user.status}>
                    {user.status}
                  </Badge>
                </Button>
              </td>
              <td className="px-6 py-4">
                <ActionButtons
                  item={user}
                  onAction={handleAction}
                  showMoreMenu={true}
                  className="justify-start"
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