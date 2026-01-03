import React, { useState, useMemo } from 'react';
import { Star, Grid3x3, List, Search, Clock, CheckCircle, XCircle, AlertCircle, MessageSquare, Settings, X } from 'lucide-react';
import Button from '../../ui/Button';
import Card from '../../ui/GlassCard';
import ReviewCard from './ReviewCard';
import InputField from '../../ui/InputField';
import StatCard from '../../ui/StatCard';
import Select from '../../ui/Select';


const CustomerReviewsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    rating: 'all',
    category: 'all',
    dateRange: 'all',
  });

  const allReviews = [
    {
      id: 1,
      dishName: 'Classic Italian Penne',
      review: 'This pasta is divine! The flavors are prominent, creating a rich, savory, unforgettable taste. Highly recommended for pasta lovers!',
      reviewer: 'Sarah Mitchell',
      email: 'sarah.m@email.com',
      date: 'Oct 12, 2024',
      rating: 5,
      image: '🍝',
      gradient: 'from-orange-100 to-orange-50',
      status: 'approved',
      category: 'food',
      helpful: 24,
      comments: 3,
      orderId: '#ORD-1001',
      location: 'New York, NY',
      payment: 'Credit Card',
      orderTime: '7:30 PM',
    },
    {
      id: 2,
      dishName: 'Smokey Supreme Pizza',
      review: 'Crispy crust, generous cheese, and the perfect balance of spice in the pepperoni. A classic pizza done right!',
      reviewer: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      date: 'Oct 15, 2024',
      rating: 4.5,
      image: '🍕',
      gradient: 'from-red-100 to-red-50',
      status: 'approved',
      category: 'food',
      helpful: 18,
      comments: 2,
      orderId: '#ORD-1002',
      location: 'Los Angeles, CA',
      payment: 'PayPal',
      orderTime: '8:15 PM',
    },
    {
      id: 3,
      dishName: 'Classic Cheeseburger',
      review: 'Juicy, perfectly cooked patty with fresh ingredients. The cheese was melted to perfection. Best burger in town!',
      reviewer: 'Jessica Lee',
      email: 'jessica.l@email.com',
      date: 'Oct 18, 2024',
      rating: 5,
      image: '🍔',
      gradient: 'from-yellow-100 to-yellow-50',
      status: 'approved',
      category: 'food',
      helpful: 31,
      comments: 5,
      orderId: '#ORD-1003',
      location: 'Chicago, IL',
      payment: 'Credit Card',
      orderTime: '6:45 PM',
    },
    {
      id: 4,
      dishName: 'Sashimi Sushi Roll',
      review: 'Fresh and delicious! The fish quality is exceptional and the presentation is beautiful.',
      reviewer: 'David Kim',
      email: 'david.k@email.com',
      date: 'Oct 20, 2024',
      rating: 5,
      image: '🍣',
      gradient: 'from-blue-100 to-blue-50',
      status: 'pending',
      category: 'food',
      helpful: 12,
      comments: 1,
      orderId: '#ORD-1004',
      location: 'San Francisco, CA',
      payment: 'Apple Pay',
      orderTime: '7:00 PM',
    },
    {
      id: 5,
      dishName: 'Chocolate Lava Cake',
      review: 'Absolutely decadent. The molten chocolate center was perfect. A must-try for dessert lovers.',
      reviewer: 'Emily Chen',
      email: 'emily.c@email.com',
      date: 'Oct 21, 2024',
      rating: 5,
      image: '🍰',
      gradient: 'from-pink-100 to-pink-50',
      status: 'approved',
      category: 'food',
      helpful: 27,
      comments: 4,
      orderId: '#ORD-1005',
      location: 'Seattle, WA',
      payment: 'Credit Card',
      orderTime: '9:30 PM',
    },
    {
      id: 6,
      dishName: 'Express Delivery',
      review: 'The delivery was lightning fast! Food arrived hot and the packaging was excellent. Driver was very professional.',
      reviewer: 'James Parker',
      email: 'james.p@email.com',
      date: 'Oct 22, 2024',
      rating: 5,
      image: '🚚',
      gradient: 'from-green-100 to-green-50',
      status: 'approved',
      category: 'delivery',
      helpful: 15,
      comments: 2,
      orderId: '#ORD-1006',
      location: 'Boston, MA',
      payment: 'Cash',
      orderTime: '1:15 PM',
    },
    {
      id: 7,
      dishName: 'Restaurant Service',
      review: 'The staff was incredibly attentive and friendly. Our server made excellent recommendations. Great atmosphere!',
      reviewer: 'Linda Harris',
      email: 'linda.h@email.com',
      date: 'Oct 23, 2024',
      rating: 4,
      image: '👨‍🍳',
      gradient: 'from-purple-100 to-purple-50',
      status: 'approved',
      category: 'service',
      helpful: 9,
      comments: 1,
      orderId: '#ORD-1007',
      location: 'Miami, FL',
      payment: 'Credit Card',
      orderTime: '8:00 PM',
    },
    {
      id: 8,
      dishName: 'Eco-Friendly Packaging',
      review: 'I appreciate the sustainable packaging! Everything was well-protected and easy to recycle. Great initiative!',
      reviewer: 'Robert Green',
      email: 'robert.g@email.com',
      date: 'Oct 24, 2024',
      rating: 5,
      image: '📦',
      gradient: 'from-teal-100 to-teal-50',
      status: 'approved',
      category: 'packaging',
      helpful: 22,
      comments: 3,
      orderId: '#ORD-1008',
      location: 'Austin, TX',
      payment: 'Google Pay',
      orderTime: '7:45 PM',
    },
    {
      id: 9,
      dishName: 'Caesar Salad',
      review: 'The dressing was too tangy for my taste. The lettuce was fresh but portion size was small for the price.',
      reviewer: 'Amanda White',
      email: 'amanda.w@email.com',
      date: 'Oct 25, 2024',
      rating: 3,
      image: '🥗',
      gradient: 'from-lime-100 to-lime-50',
      status: 'pending',
      category: 'food',
      helpful: 5,
      comments: 0,
      orderId: '#ORD-1009',
      location: 'Denver, CO',
      payment: 'Credit Card',
      orderTime: '12:30 PM',
    },
    {
      id: 10,
      dishName: 'Late Night Delivery',
      review: 'Food arrived 45 minutes late and was cold. Very disappointed with the service tonight.',
      reviewer: 'Thomas Brown',
      email: 'thomas.b@email.com',
      date: 'Oct 26, 2024',
      rating: 2,
      image: '⏰',
      gradient: 'from-red-100 to-red-50',
      status: 'rejected',
      category: 'delivery',
      helpful: 8,
      comments: 1,
      orderId: '#ORD-1010',
      location: 'Phoenix, AZ',
      payment: 'Credit Card',
      orderTime: '11:00 PM',
    },
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'all',
      rating: 'all',
      category: 'all',
      dateRange: 'all',
    });
  };

  const filteredReviews = useMemo(() => {
    return allReviews.filter(review => {
      const matchesSearch = review.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.review.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || review.status === filters.status;
      const matchesRating = filters.rating === 'all' || 
                           (filters.rating === '5' && review.rating === 5) ||
                           (filters.rating === '4' && review.rating >= 4 && review.rating < 5) ||
                           (filters.rating === '3' && review.rating >= 3 && review.rating < 4) ||
                           (filters.rating === 'low' && review.rating < 3);
      const matchesCategory = filters.category === 'all' || review.category === filters.category;

      return matchesSearch && matchesStatus && matchesRating && matchesCategory;
    });
  }, [searchTerm, filters, allReviews]);

  const isFiltered = searchTerm !== '' || 
    filters.status !== 'all' || 
    filters.rating !== 'all' || 
    filters.category !== 'all' || 
    filters.dateRange !== 'all';

  const stats = {
    total: allReviews.length,
    approved: allReviews.filter(r => r.status === 'approved').length,
    pending: allReviews.filter(r => r.status === 'pending').length,
    rejected: allReviews.filter(r => r.status === 'rejected').length,
    avgRating: (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1),
  };

  const statsData = [
    { title: 'Total Reviews', value: stats.total, icon: MessageSquare, color: 'blue' },
    { title: 'Approved', value: stats.approved, icon: CheckCircle, color: 'green' },
    { title: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
    { title: 'Rejected', value: stats.rejected, icon: XCircle, color: 'red' },
    { title: 'Avg Rating', value: stats.avgRating, icon: Star, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
             
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Review Management</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">Monitor and manage customer feedback</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {statsData.map(stat => (
              <StatCard 
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                className="bg-white dark:bg-gray-800"
              />
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="p-4 overflow-visible relative z-20">
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="flex-1">
                <InputField
                  type="text"
                  placeholder="Search reviews, customers, dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startIcon={<Search className="w-5 h-5" />}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3 items-center">
                <div className="w-full lg:w-40">
                  <Select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    options={[
                      { value: 'all', label: 'All Status' },
                      { value: 'approved', label: 'Approved' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'rejected', label: 'Rejected' },
                    ]}
                  />
                </div>
                <div className="w-full lg:w-40">
                  <Select
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                    options={[
                      { value: 'all', label: 'All Ratings' },
                      { value: '5', label: '5 Stars' },
                      { value: '4', label: '4+ Stars' },
                      { value: '3', label: '3+ Stars' },
                      { value: 'low', label: 'Below 3 Stars' },
                    ]}
                  />
                </div>
                <div className="w-full lg:w-40">
                  <Select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    options={[
                      { value: 'all', label: 'All Categories' },
                      { value: 'food', label: '🍽️ Food Quality' },
                      { value: 'service', label: '👨‍🍳 Service' },
                      { value: 'delivery', label: '🚚 Delivery' },
                      { value: 'packaging', label: '📦 Packaging' },
                      { value: 'ambiance', label: '🏠 Ambiance' },
                      { value: 'value', label: '💰 Value' },
                    ]}
                  />
                </div>
                <div className="w-full lg:w-40">
                  <Select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                    options={[
                      { value: 'all', label: 'All Time' },
                      { value: 'today', label: 'Today' },
                      { value: 'week', label: 'This Week' },
                      { value: 'month', label: 'This Month' },
                    ]}
                  />
                </div>

                {/* Clear Filters Button */}
                {isFiltered && (
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                    className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50 px-3 w-full sm:w-auto"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}

                {/* View Settings Dropdown */}
                <div className="relative flex justify-end sm:block col-span-1 sm:col-span-2 lg:col-span-1">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowViewMenu(!showViewMenu)}
                    className="p-2"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                  
                  {showViewMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-[999]">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">View Layout</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            checked={viewMode === 'grid'} 
                            onChange={() => {
                              setViewMode('grid');
                              setShowViewMenu(false);
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Grid View</span>
                        </label>
                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            checked={viewMode === 'list'} 
                            onChange={() => {
                              setViewMode('list');
                              setShowViewMenu(false);
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">List View</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredReviews.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{allReviews.length}</span> reviews
          </p>
        </div>

        {/* Reviews Grid/List */}
        {filteredReviews.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredReviews.map(review => (
              <ReviewCard key={review.id} review={review} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Reviews Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
            <Button variant="primary" onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
    </div>
  );
};

export default CustomerReviewsPage;