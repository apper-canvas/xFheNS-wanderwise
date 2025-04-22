import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    region: 'all',
    price: 'all',
    activity: 'all'
  });

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters, [category]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'north-america', label: 'North America' },
    { value: 'south-america', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const prices = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget (< $1500)' },
    { value: 'moderate', label: 'Moderate ($1500-$2000)' },
    { value: 'luxury', label: 'Luxury (> $2000)' }
  ];

  const activities = [
    { value: 'all', label: 'All Activities' },
    { value: 'beach', label: 'Beach' },
    { value: 'culture', label: 'Culture' },
    { value: 'nature', label: 'Nature' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'history', label: 'History' },
    { value: 'hiking', label: 'Hiking' },
    { value: 'safari', label: 'Safari' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'city', label: 'City' },
    { value: 'photography', label: 'Photography' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select
            value={activeFilters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            value={activeFilters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {prices.map((price) => (
              <option key={price.value} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>
        </div>

        {/* Activity Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
          <select
            value={activeFilters.activity}
            onChange={(e) => handleFilterChange('activity', e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {activities.map((activity) => (
              <option key={activity.value} value={activity.value}>
                {activity.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tag Pills - Show active filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(activeFilters).map(([category, value]) => {
          if (value === 'all') return null;
          
          let label;
          if (category === 'region') {
            label = regions.find(r => r.value === value)?.label;
          } else if (category === 'price') {
            label = prices.find(p => p.value === value)?.label;
          } else if (category === 'activity') {
            label = activities.find(a => a.value === value)?.label;
          }
          
          return (
            <div key={`${category}-${value}`} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              {label}
              <button 
                onClick={() => handleFilterChange(category, 'all')} 
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          );
        })}
        
        {Object.values(activeFilters).some(v => v !== 'all') && (
          <button 
            onClick={() => {
              const resetFilters = { region: 'all', price: 'all', activity: 'all' };
              setActiveFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
            className="text-sm text-gray-600 hover:text-gray-800 underline ml-2"
          >
            Reset all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;