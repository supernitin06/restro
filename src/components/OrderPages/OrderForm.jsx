import React, { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import InputField from '../ui/InputField';
import GradientButton from '../ui/GradientButton';

const OrderFormModal = ({ order, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customer: order?.customer || '',
    type: order?.type || 'Dine-In',
    table: order?.table || '',
    status: order?.status || 'on-process',
    items: order?.items || []
  });

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    price: 0,
    image: '🍽️'
  });

  const foodEmojis = ['🍝', '🍕', '🍔', '🥗', '🍱', '🍗', '🥖', '🍜', '🍛', '🌮', '🍣', '🥙', '🫘', '☕', '🧃'];

  const handleAddItem = () => {
    if (newItem.name && newItem.price > 0) {
      setFormData({
        ...formData,
        items: [...formData.items, { ...newItem, id: Date.now() }]
      });
      setNewItem({ name: '', quantity: 1, price: 0, image: '🍽️' });
    }
  };

  const handleRemoveItem = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId)
    });
  };

  const handleUpdateItemQuantity = (itemId, delta) => {
    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = () => {
    if (formData.customer && formData.items.length > 0) {
      onSubmit({
        ...order,
        ...formData,
        total: calculateTotal()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{order ? 'Edit Order' : 'Add New Order'}</h2>
          <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Customer Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <InputField
                label="Customer Name"
                required
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none transition-all"
              >
                <option value="Dine-In">Dine-In</option>
                <option value="Takeaway">Takeaway</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <InputField
                label="Table Number"
                value={formData.table}
                onChange={(e) => setFormData({ ...formData, table: e.target.value })}
                placeholder="e.g., Table 5"
                disabled={formData.type !== 'Dine-In'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none transition-all"
              >
                <option value="on-process">On Process</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Add Items Section */}
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add Items</h3>
            <div className="grid md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <InputField
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Item name"
                />
              </div>
              <div>
                <InputField
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                  placeholder="Qty"
                  min="1"
                />
              </div>
              <div>
                <InputField
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                  placeholder="Price"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <select
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 outline-none text-xl"
                >
                  {foodEmojis.map(emoji => (
                    <option key={emoji} value={emoji}>{emoji}</option>
                  ))}
                </select>
              </div>
            </div>
            <GradientButton
              onClick={handleAddItem}
              className="mt-3 w-full"
              icon={Plus}
            >
              Add Item
            </GradientButton>
          </div>

          {/* Items List */}
          {formData.items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Order Items ({formData.items.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {formData.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQuantity(item.id, -1)}
                          className="p-1 hover:bg-white rounded transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQuantity(item.id, 1)}
                          className="p-1 hover:bg-white rounded transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold text-blue-600 w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <GradientButton
              onClick={onClose}
              variant="ghost"
              className="flex-1 text-gray-700 bg-gray-100 hover:bg-gray-200 border-none"
            >
              Cancel
            </GradientButton>
            <GradientButton
              onClick={handleSubmit}
              className="flex-1"
              disabled={!formData.customer || formData.items.length === 0}
            >
              {order ? 'Update Order' : 'Create Order'}
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFormModal;
