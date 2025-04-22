import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import DestinationDetail from "../components/DestinationDetail";
import { destinations } from "../data/destinationsData";

function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    regions: [],
    types: [],
    budget: null
  });

  // Filter destinations based on search query and filters
  useEffect(() => {
    let results = [...destinations];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.country.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query)
      );
    }
    
    // Apply region filter
    if (filters.regions.length > 0) {
      results = results.filter(dest => filters.regions.includes(dest.region));
    }
    
    // Apply type filter
    if (filters.types.length > 0) {
      results = results.filter(dest => 
        dest.type.some(type => filters.types.includes(type))
      );
    }
    
    // Apply budget filter
    if (filters.budget) {
      results = results.filter(dest => dest.budget <= filters.budget);
    }
    
    setFilteredDestinations(results);
  }, [searchQuery, filters]);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (category === 'budget') {
        newFilters.budget = value;
        return newFilters;
      }
      
      const categoryArray = [...prev[category]];
      const valueIndex = categoryArray.indexOf(value);
      
      if (valueIndex === -1) {
        categoryArray.push(value);
      } else {
        categoryArray.splice(valueIndex, 1);
      }
      
      newFilters[category] = categoryArray;
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      regions: [],
      types: [],
      budget: null
    });
    setSearchQuery("");
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDetail = () => {
    setSelectedDestination(null);
  };

  // Get unique regions and types for filters
  const allRegions = [...new Set(destinations.map(dest => dest.region))];
  const allTypes = [...new Set(destinations.flatMap(dest => dest.type))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Destinations</h1>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
              Explore the world's most beautiful places and plan your next adventure
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-surface-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search destinations, countries, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  className="px-4 py-2 mr-1 rounded-lg bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors flex items-center gap-1"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {/* Filters */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter Destinations</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearFilters} 
                  className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Region filters */}
              <div>
                <h3 className="font-medium mb-2">Regions</h3>
                <div className="space-y-2">
                  {allRegions.map(region => (
                    <label key={region} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={filters.regions.includes(region)}
                        onChange={() => toggleFilter('regions', region)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span>{region}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Type filters */}
              <div>
                <h3 className="font-medium mb-2">Destination Types</h3>
                <div className="space-y-2">
                  {allTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={filters.types.includes(type)}
                        onChange={() => toggleFilter('types', type)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Budget filter */}
              <div>
                <h3 className="font-medium mb-2">Budget (Daily)</h3>
                <div className="space-y-2">
                  {[50, 100, 200, 500].map(budget => (
                    <label key={budget} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="budget"
                        checked={filters.budget === budget}
                        onChange={() => toggleFilter('budget', budget)}
                        className="rounded-full text-primary focus:ring-primary"
                      />
                      <span>Under ${budget}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results summary */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'}
            </h2>
            {(searchQuery || filters.regions.length > 0 || filters.types.length > 0 || filters.budget) && (
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Filtered results
                {filters.regions.length > 0 && ` • Regions: ${filters.regions.join(', ')}`}
                {filters.types.length > 0 && ` • Types: ${filters.types.join(', ')}`}
                {filters.budget && ` • Budget: Under $${filters.budget}`}
                {searchQuery && ` • Search: "${searchQuery}"`}
              </p>
            )}
          </div>
        </div>

        {/* Destinations grid */}
        {filteredDestinations.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDestinations.map(destination => (
              <motion.div key={destination.id} variants={itemVariants}>
                <DestinationCard 
                  destination={destination} 
                  onClick={() => handleDestinationClick(destination)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 text-surface-400 dark:text-surface-500">
              <MapPin size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-4 btn-outline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Destination detail modal */}
      {selectedDestination && (
        <DestinationDetail 
          destination={selectedDestination} 
          onClose={closeDetail} 
        />
      )}
    </>
  );
}

export default Destinations;