import GradientButton from '../ui/GradientButton';

const TabNavigation = ({ activeTab, setActiveTab, orders }) => {
  const tabs = [
    { id: 'all', label: 'All', count: orders.length },
    { id: 'on-process', label: 'On Process', count: orders.filter(o => o.status === 'on-process').length },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  return (
    <div className="flex flex-wrap gap-3 bg-white rounded-2xl p-2 shadow-md">
      {tabs.map(tab => (
        <GradientButton
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          variant={activeTab === tab.id ? 'primary' : 'ghost'}
          className={activeTab !== tab.id ? 'text-gray-600 hover:bg-gray-100 border-transparent' : ''}
        >
          {tab.label}
          <span className={`
            px-2 py-0.5 rounded-full text-xs font-bold ml-2
            ${activeTab === tab.id ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-700'}
          `}>
            {tab.count}
          </span>
        </GradientButton>
      ))}
    </div>
  );
};
export default TabNavigation;