import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, ChevronDown } from "lucide-react";

const SearchFilters = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: 0,
    regions: [],
    categories: [],
    travelPeriod: []
  });

  const regionOptions = [
    "Asia", "Europe", "North America", "South America", 
    "Africa", "Oceania", "Caribbean", "Middle East"
  ];
  
  const categoryOptions = [
    "Beach", "Mountain", "City", "Cultural", 
    "Adventure", "Wildlife", "Luxury", "Budget"
  ];
  
  const periodOptions = [
    "Spring", "Summer", "Fall", "Winter"
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (category, value) => {
    let updatedFilters;
    
    if (category === "priceRange") {
      updatedFilters = { ...filters, priceRange: value };
    } else if (category === "rating") {
      updatedFilters = { ...filters, rating: value };
    } else {
      // For checkboxes (regions, categories, periods)
      const currentValues = [...filters[category]];
      
      if (currentValues.includes(value)) {
        updatedFilters = { 
          ...filters, 
          [category]: currentValues.filter(item => item !== value) 
        };
      } else {
        updatedFilters = { 
          ...filters, 
          [category]: [...currentValues, value] 
        };
      }
    }
    
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value, 10);
    
    // Ensure min <= max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[0] = newRange[1];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[1] = newRange[0];
    }
    
    handleFilterChange("priceRange", newRange);
  };

  const clearFilters = () => {
    const resetFilters = {
      priceRange: [0, 5000],
      rating: 0,
      regions: [],
      categories: [],
      travelPeriod: []
    };
    
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.rating > 0 ||
      filters.regions.length > 0 ||
      filters.categories.length > 0 ||
      filters.travelPeriod.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 5000
    );
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.rating > 0) count++;
    if (filters.regions.length > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.travelPeriod.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations, cities, or attractions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-gray-700 font-medium"
        >
          <Filter size={18} className="mr-2" />
          Filters
          {activeFilterCount() > 0 && (
            <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount()}
            </span>
          )}
          <ChevronDown
            size={18}
            className={`ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </button>

        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <X size={14} className="mr-1" />
            Clear all
          </button>
        )}
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Min: ${filters.priceRange[0]}</span>
                  <span className="text-sm text-gray-500">Max: ${filters.priceRange[1]}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e.target.value)}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-xs text-gray-500">Min Price</span>
                  </div>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e.target.value)}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-xs text-gray-500">Max Price</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange("rating", rating)}
                      className="mr-2 accent-blue-600"
                    />
                    <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                      <span className="mr-1">{rating}+</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                        ))}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <h3 className="font-medium mb-2">Region</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {regionOptions.map(region => (
                  <div key={region} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`region-${region}`}
                      checked={filters.regions.includes(region)}
                      onChange={() => handleFilterChange("regions", region)}
                      className="mr-2 accent-blue-600"
                    />
                    <label htmlFor={`region-${region}`} className="text-sm cursor-pointer">
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {categoryOptions.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onChange={() => handleFilterChange("categories", category)}
                      className="mr-2 accent-blue-600"
                    />
                    <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Period Filter */}
            <div>
              <h3 className="font-medium mb-2">Best Time to Visit</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {periodOptions.map(period => (
                  <div key={period} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`period-${period}`}
                      checked={filters.travelPeriod.includes(period)}
                      onChange={() => handleFilterChange("travelPeriod", period)}
                      className="mr-2 accent-blue-600"
                    />
                    <label htmlFor={`period-${period}`} className="text-sm cursor-pointer">
                      {period}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => onFilter(filters)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilters;