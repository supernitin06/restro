import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaCreditCard,
  FaCalendarAlt,
  FaIdBadge,
  FaInfoCircle,
  FaGlobe,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUndo,
  FaBan,
  FaRupeeSign,
  FaReceipt
} from 'react-icons/fa';
import { BsBank } from 'react-icons/bs';
import { SiBitcoin, SiPaypal, SiRazorpay } from 'react-icons/si';

const PaymentDetailsModal = ({ isOpen, onClose, paymentData }) => {
  const [payment, setPayment] = useState(null);

  // Update payment data when paymentData changes
  useEffect(() => {
    if (isOpen && paymentData) {
      const rawMethod = (paymentData?.paymentMethod || 'upi').toLowerCase();
      const finalMethod = rawMethod === 'cod' ? 'cash' : rawMethod;

      setPayment({
        id: paymentData?.id || '',
        customerName: paymentData?.customerName || '',
        customerEmail: paymentData?.customerEmail || '',
        amount: paymentData?.amount || '',
        currency: paymentData?.currency || 'INR',
        paymentMethod: finalMethod,
        status: paymentData?.status ? paymentData.status.toLowerCase() : 'pending',
        date: (() => {
          try {
            if (!paymentData?.date) return new Date().toISOString().split('T')[0];
            const d = new Date(paymentData.date);
            return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
          } catch (e) {
            return new Date().toISOString().split('T')[0];
          }
        })(),
        description: paymentData?.description || '',
        transactionId: paymentData?.transactionId || paymentData?.paymentId || '',
        referenceNumber: paymentData?.referenceNumber || '',
        paymentGateway: paymentData?.paymentGateway || '',
        notes: paymentData?.notes || ''
      });
    }
  }, [paymentData, isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
      case 'failed': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800';
      case 'refunded': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle className="inline mr-2" />;
      case 'pending': return <FaClock className="inline mr-2" />;
      case 'failed': return <FaTimesCircle className="inline mr-2" />;
      case 'refunded': return <FaUndo className="inline mr-2" />;
      case 'cancelled': return <FaBan className="inline mr-2" />;
      default: return null;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit_card': return <FaCreditCard className="text-xl" />;
      case 'paypal': return <SiPaypal className="text-xl text-blue-600" />;
      case 'bank_transfer': return <BsBank className="text-xl" />;
      case 'crypto': return <SiBitcoin className="text-xl text-orange-500" />;
      case 'upi': return <SiRazorpay className="text-xl text-blue-500" />;
      case 'cash': return <FaRupeeSign className="text-xl" />;
      default: return <FaCreditCard className="text-xl" />;
    }
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'INR': return '₹';
      case 'JPY': return '¥';
      default: return '₹';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (!isOpen || !payment) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">

              {/* Header */}
              <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
                        <FaReceipt className="text-2xl text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Payment Details
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          View payment information and transaction details
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="text-sm font-medium">
                          {payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:rotate-90 active:scale-95"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Transaction Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 mb-6 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction Amount</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {getCurrencySymbol(payment.currency)}{payment.amount}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{payment.currency}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
                      <p className="font-mono font-bold text-gray-900 dark:text-white text-lg">{payment.transactionId}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaUser className="text-gray-500" />
                      Customer Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Customer Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{payment.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                        <p className="font-medium text-gray-900 dark:text-white break-all">{payment.customerEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaCreditCard className="text-gray-500" />
                      Payment Information
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                          <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            {payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Currency</p>
                          <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <FaGlobe className="text-gray-500" />
                            {payment.currency}
                          </p>
                        </div>
                      </div>
                      {payment.referenceNumber && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Reference Number</p>
                          <p className="font-medium text-gray-900 dark:text-white">{payment.referenceNumber}</p>
                        </div>
                      )}
                      {payment.paymentGateway && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Gateway</p>
                          <p className="font-medium text-gray-900 dark:text-white">{payment.paymentGateway}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-500" />
                      Transaction Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction Date & Time</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(payment.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment ID</p>
                        <p className="font-medium text-gray-900 dark:text-white">{payment.id || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaInfoCircle className="text-gray-500" />
                      Status Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(payment.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description / Notes */}
                {(payment.description || payment.notes) && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaInfoCircle className="text-gray-500" />
                      Additional Information
                    </h4>
                    <div className="space-y-4">
                      {payment.description && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</p>
                          <p className="font-medium text-gray-900 dark:text-white">{payment.description}</p>
                        </div>
                      )}
                      {payment.notes && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Notes</p>
                          <p className="font-medium text-gray-900 dark:text-white">{payment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailsModal;