import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Grid, List, Compass, Filter, AlertCircle } from "lucide-react";
import SearchFilters from "../components/SearchFilters";
import DestinationCard from "../components/DestinationCard";
import DestinationDetail from "../components/DestinationDetail";
import { fetchDestinations } from "../services/destinationService";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Destinations" },
    { id: "beach", name: "Beach" },
    { id: "mountain", name: "Mountain" },
    { id: "city", name: "City" },
    { id: "cultural", name: "Cultural" },
    { id: "adventure", name: "Adventure" },
  ];

  // Load destinations from Apper backend
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const destinationsData = await fetchDestinations({
          limit: 20,
          sortField: "rating",
          sortDirection: "desc"
        });
        
        setDestinations(destinationsData);
        setFilteredDestinations(destinationsData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load destinations. Please try again.");
        setIsLoading(false);
      }
    };
    
    loadDestinations();
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterDestinations(query, activeCategory);
  };

  // Handle category filtering
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    filterDestinations(searchQuery, categoryId);
  };

  // Filter destinations based on search query and category
  const filterDestinations = async (query, category) => {
    try {
      setIsLoading(true);
      
      const filterParams = {
        searchQuery: query,
        category: category !== "all" ? category : undefined
      };
      
      const filteredData = await fetchDestinations(filterParams);
      setFilteredDestinations(filteredData);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to filter destinations. Please try again.");
      setIsLoading(false);
    }
  };

  // Advanced filtering
  const handleAdvancedFilter = async (filters) => {
    try {
      setIsLoading(true);
      
      const filterParams = {
        searchQuery: searchQuery,
        category: activeCategory !== "all" ? activeCategory : undefined,
        priceRange: filters.priceRange,
        rating: filters.rating,
        regions: filters.regions
      };
      
      const filteredData = await fetchDestinations(filterParams);
      setFilteredDestinations(filteredData);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to apply filters. Please try again.");
      setIsLoading(false);
    }
  };

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
    setShowDetailModal(true);
  };

  return (
    <div className="bg-gray-50">
      <div className="relative bg-blue-600 text-white">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://source.unsplash.com/random/1920x600/?travel,destination"
            alt="Destinations"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Amazing Destinations
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Discover your next adventure from our curated collection of the world's most breathtaking destinations.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <SearchFilters 
          onSearch={handleSearch} 
          onFilter={handleAdvancedFilter} 
        />
        
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredDestinations.length} Destinations Found
            </h2>
            {searchQuery && (
              <p className="text-sm text-gray-600">
                Results for: "{searchQuery}"
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 mr-2">View:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"
              }`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
        
        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center mb-6">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}
        
        {/* Destinations Grid */}
        {!isLoading && !error && (
          <>
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Compass size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    filterDestinations("", "all");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {filteredDestinations.map(destination => (
                  <div key={destination.Id}>
                    <DestinationCard 
                      destination={destination} 
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Destination Detail Modal */}
      <DestinationDetail
        destination={selectedDestination}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Destinations;