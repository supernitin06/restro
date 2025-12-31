import React, { useState, useEffect } from 'react';
import UserStats from '../../components/ui/UserStats';
import paymentStatsData from '../../assets/json/PaymentData/paymentStats.json';
import recentActivitiesData from '../../assets/json/PaymentData/recentActivities.json';
import transactionsData from '../../assets/json/PaymentData/transactions.json';

const PaymentDashboard = () => {
  const [paymentStats, setPaymentStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all data
    setPaymentStats(paymentStatsData);
    setRecentActivities(recentActivitiesData);
    setTransactions(transactionsData);
    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Function to update stats with real transaction data
  const getUpdatedPaymentStats = () => {
    if (!transactions.length) return paymentStats;

    // Calculate real stats from transactions
    const totalRevenue = transactions.reduce((sum, t) => {
      const amount = parseFloat(t.amount?.replace('$', '') || 0);
      return sum + amount;
    }, 0);

    const completedTransactions = transactions.filter(t => 
      t.status === 'completed'
    ).length;

    const successRate = transactions.length > 0 
      ? Math.round((completedTransactions / transactions.length) * 100)
      : 0;

    const avgTransaction = transactions.length > 0 
      ? totalRevenue / transactions.length
      : 0;

    const pendingTransactions = transactions.filter(t => 
      t.status === 'pending'
    ).length;

    // Map JSON data with real calculations
    return paymentStats.map(stat => {
      switch(stat.title) {
        case 'Total Revenue':
          return {
            ...stat,
            value: `$${totalRevenue.toFixed(2)}`,
            change: totalRevenue > 45000 ? '+20.1%' : '-5.2%',
            changeType: totalRevenue > 45000 ? 'increase' : 'decrease'
          };
        case 'Subscriptions':
          return {
            ...stat,
            value: transactions.length.toString(),
            change: transactions.length > 2300 ? '+180' : '-50',
            changeType: transactions.length > 2300 ? 'increase' : 'decrease'
          };
        case 'Avg. Transaction':
          return {
            ...stat,
            value: `$${avgTransaction.toFixed(2)}`,
            change: avgTransaction > 80 ? '+5.3%' : '-2.3%',
            changeType: avgTransaction > 80 ? 'increase' : 'decrease'
          };
        case 'Success Rate':
          return {
            ...stat,
            value: `${successRate}%`,
            change: successRate > 95 ? '+1.2%' : '-0.5%',
            changeType: successRate > 95 ? 'increase' : 'decrease'
          };
        default:
          return stat;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const updatedPaymentStats = getUpdatedPaymentStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Payment Dashboard
        </h1>
        <p className="text-gray-400">
          Real-time overview of your payment performance
        </p>
      </div>

      {/* Stats Grid - Apna UserStats component */}
      <UserStats paymentStats={updatedPaymentStats} />

      {/* Transaction Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Transactions Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10" />
          <div className="relative p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {transactions.slice(0, 4).map(transaction => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item"
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-4 ${
                      transaction.status === 'completed' ? 'bg-green-500' :
                      transaction.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-white">{transaction.name}</p>
                      <p className="text-sm text-gray-400">{transaction.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white text-lg">{transaction.amount}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10" />
          <div className="relative p-6">
            <h2 className="text-xl font-bold text-white mb-6">Payment Methods</h2>
            
            <div className="space-y-6">
              {['Credit Card', 'PayPal', 'Bank Transfer'].map((method, index) => {
                const count = transactions.filter(t => t.method === method).length;
                const percentage = transactions.length > 0 
                  ? Math.round((count / transactions.length) * 100)
                  : 0;
                
                const colors = [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500',
                  'from-emerald-500 to-green-500'
                ];
                
                return (
                  <div key={method} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{method}</span>
                      <span className="font-medium text-white">
                        {count} <span className="text-gray-400">({percentage}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full bg-gradient-to-r ${colors[index]} transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10" />
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              View All Activity →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.slice(0, 5).map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-4 ${
                    activity.action.includes('received') ? 'bg-green-500/20' :
                    activity.action.includes('failed') ? 'bg-red-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    {activity.action.includes('received') ? '💰' :
                     activity.action.includes('failed') ? '❌' : '📧'}
                  </div>
                  <div>
                    <p className="font-medium text-white">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{activity.amount}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;