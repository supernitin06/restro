// src/modules/payment/components/InvoiceGenerator/InvoiceGenerator.tsx
import React, { useState } from 'react';
// import { Card } from '../../components/Shared/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/InputField';
// import { Select } from '../../components/ui/Select';
// import InvoicePreview from './InvoicePreview';

const InvoiceGenerator = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: 'INV-2024-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, City, Country'
    },
    items: [
      { id: 1, description: 'Premium Plan Subscription', quantity: 1, price: 99.99, amount: 99.99 },
      { id: 2, description: 'Additional Users', quantity: 3, price: 25.00, amount: 75.00 },
      { id: 3, description: 'Support Package', quantity: 1, price: 50.00, amount: 50.00 }
    ],
    tax: 19.99,
    total: 244.98
  });

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: invoice.items.length + 1, description: '', quantity: 1, price: 0, amount: 0 }]
    });
  };

  const updateItem = (id, field, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'price') {
            updatedItem.amount = updatedItem.quantity * updatedItem.price;
          }
          return updatedItem;
        }
        return item;
      })
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
          <p className="text-gray-600 mt-2">Create and manage professional invoices</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Save Draft</Button>
          <Button>Generate Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Details</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
              <Input value={invoice.invoiceNumber} onChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <Input type="date" value={invoice.date} onChange={(e) => setInvoice({...invoice, date: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <Input type="date" value={invoice.dueDate} onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <Select>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Customer Information</h4>
            <div className="space-y-4">
              <Input placeholder="Customer Name" value={invoice.customer.name} />
              <Input placeholder="Email Address" type="email" value={invoice.customer.email} />
              <Input placeholder="Billing Address" value={invoice.customer.address} />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Invoice Items</h4>
              <Button size="sm" onClick={addItem}>Add Item</Button>
            </div>
            
            <div className="space-y-4">
              {invoice.items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg">
                  <div className="col-span-5">
                    <Input 
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div className="col-span-2 font-semibold text-gray-900">
                    ${item.amount.toFixed(2)}
                  </div>
                  <div className="col-span-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setInvoice({...invoice, items: invoice.items.filter(i => i.id !== item.id)})}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${(invoice.items.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <div>
          {/* <InvoicePreview invoice={invoice} /> */}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;