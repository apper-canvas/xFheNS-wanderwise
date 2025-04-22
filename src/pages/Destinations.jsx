import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Grid, List, Compass, Filter, AlertCircle } from "lucide-react";
import SearchFilters from "../components/SearchFilters";
import DestinationCard from "../components/DestinationCard";
import DestinationDetail from "../components/DestinationDetail";

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

  // Mock data load
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API fetch with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock destination data
        const mockDestinations = [
          {
            id: 1,
            name: "Bali, Indonesia",
            location: "Indonesia",
            image: "https://source.unsplash.com/random/800x600/?bali",
            description: "Experience the perfect blend of beautiful beaches, vibrant culture, and lush landscapes in this tropical paradise.",
            rating: 4.8,
            price: 1299,
            category: "beach",
            travelPeriod: "April - October",
            isPopular: true,
            activities: ["Surfing", "Temple Tour", "Rice Terraces", "Volcano Hiking"]
          },
          {
            id: 2,
            name: "Santorini, Greece",
            location: "Greece",
            image: "https://source.unsplash.com/random/800x600/?santorini",
            description: "Stunning white-washed buildings, blue domes, and breathtaking sunsets over the caldera make this island magical.",
            rating: 4.9,
            price: 1599,
            category: "beach",
            travelPeriod: "May - September",
            discount: 10,
            activities: ["Sunset Viewing", "Wine Tasting", "Sailing", "Beach Time"]
          },
          {
            id: 3,
            name: "Kyoto, Japan",
            location: "Japan",
            image: "https://source.unsplash.com/random/800x600/?kyoto",
            description: "Ancient temples, traditional tea houses, and beautiful gardens showcase Japan's rich cultural heritage.",
            rating: 4.7,
            price: 1499,
            category: "cultural",
            travelPeriod: "March - May & October - November",
            isPopular: true,
            activities: ["Temple Visits", "Tea Ceremony", "Cherry Blossom Viewing", "Geisha District"]
          },
          {
            id: 4,
            name: "Swiss Alps",
            location: "Switzerland",
            image: "https://source.unsplash.com/random/800x600/?swiss,alps",
            description: "Majestic mountain peaks, crystal-clear lakes, and charming villages offer year-round outdoor adventures.",
            rating: 4.8,
            price: 1699,
            category: "mountain",
            travelPeriod: "December - March (Winter) & June - September (Summer)",
            activities: ["Skiing", "Hiking", "Mountain Biking", "Paragliding"]
          },
          {
            id: 5,
            name: "New York City, USA",
            location: "United States",
            image: "https://source.unsplash.com/random/800x600/?newyork",
            description: "The city that never sleeps offers world-class entertainment, dining, shopping, and iconic landmarks.",
            rating: 4.6,
            price: 1299,
            category: "city",
            travelPeriod: "April - June & September - November",
            isPopular: true,
            activities: ["Broadway Shows", "Museum Tours", "Central Park", "Statue of Liberty"]
          },
          {
            id: 6,
            name: "Machu Picchu, Peru",
            location: "Peru",
            image: "https://source.unsplash.com/random/800x600/?machupicchu",
            description: "This ancient Incan citadel set high in the Andes Mountains offers a glimpse into a fascinating civilization.",
            rating: 4.9,
            price: 1799,
            category: "adventure",
            travelPeriod: "May - September",
            activities: ["Inca Trail", "Archaeological Tours", "Mountain Hiking", "Cultural Experiences"]
          },
          {
            id: 7,
            name: "Barcelona, Spain",
            location: "Spain",
            image: "https://source.unsplash.com/random/800x600/?barcelona",
            description: "Modernist architecture, vibrant street life, and beautiful beaches make this Mediterranean city irresistible.",
            rating: 4.7,
            price: 1199,
            category: "city",
            travelPeriod: "April - October",
            discount: 15,
            activities: ["Gaudi Architecture", "Gothic Quarter", "Beach Time", "Tapas Tasting"]
          },
          {
            id: 8,
            name: "Maldives",
            location: "Maldives",
            image: "https://source.unsplash.com/random/800x600/?maldives",
            description: "Overwater bungalows, crystal-clear turquoise waters, and white sandy beaches define this luxury island paradise.",
            rating: 4.9,
            price: 2499,
            category: "beach",
            travelPeriod: "November - April",
            isPopular: true,
            activities: ["Snorkeling", "Diving", "Spa Treatments", "Water Sports"]
          },
          {
            id: 9,
            name: "Paris, France",
            location: "France",
            image: "https://source.unsplash.com/random/800x600/?paris",
            description: "The City of Light enchants with its art, cuisine, iconic landmarks, and romantic atmosphere.",
            rating: 4.8,
            price: 1399,
            category: "city",
            travelPeriod: "April - June & September - October",
            activities: ["Eiffel Tower", "Louvre Museum", "River Seine Cruise", "French Cuisine"]
          },
          {
            id: 10,
            name: "Costa Rica",
            location: "Costa Rica",
            image: "https://source.unsplash.com/random/800x600/?costarica",
            description: "Lush rainforests, diverse wildlife, and stunning beaches make this eco-friendly destination perfect for nature lovers.",
            rating: 4.7,
            price: 1349,
            category: "adventure",
            travelPeriod: "December - April",
            activities: ["Zip-lining", "Wildlife Watching", "Surfing", "Volcano Tours"]
          },
          {
            id: 11,
            name: "Rome, Italy",
            location: "Italy",
            image: "https://source.unsplash.com/random/800x600/?rome",
            description: "Ancient ruins, Renaissance art, and incredible cuisine showcase Italy's rich cultural heritage.",
            rating: 4.8,
            price: 1299,
            category: "cultural",
            travelPeriod: "April - June & September - October",
            activities: ["Colosseum", "Vatican", "Roman Forum", "Italian Cuisine"]
          },
          {
            id: 12,
            name: "Canadian Rockies",
            location: "Canada",
            image: "https://source.unsplash.com/random/800x600/?canadianrockies",
            description: "Dramatic mountain scenery, turquoise lakes, and abundant wildlife create an outdoor enthusiast's paradise.",
            rating: 4.8,
            price: 1599,
            category: "mountain",
            travelPeriod: "June - September",
            activities: ["Hiking", "Wildlife Viewing", "Scenic Drives", "Canoeing"]
          },
        ];
        
        setDestinations(mockDestinations);
        setFilteredDestinations(mockDestinations);
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
  const filterDestinations = (query, category) => {
    let filtered = [...destinations];
    
    // Apply search query filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(lowercaseQuery) || 
        dest.location.toLowerCase().includes(lowercaseQuery) ||
        dest.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter
    if (category && category !== "all") {
      filtered = filtered.filter(dest => dest.category === category);
    }
    
    setFilteredDestinations(filtered);
  };

  // Advanced filtering
  const handleAdvancedFilter = (filters) => {
    let filtered = [...destinations];
    
    // Price range filter
    filtered = filtered.filter(dest => 
      dest.price >= filters.priceRange[0] && dest.price <= filters.priceRange[1]
    );
    
    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(dest => dest.rating >= filters.rating);
    }
    
    // Region filter
    if (filters.regions.length > 0) {
      // This is a mock implementation since we don't have regions in our data
      // In a real app, you would filter by region property
    }
    
    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(dest => 
        filters.categories.some(cat => dest.category === cat.toLowerCase())
      );
    }
    
    // Travel period filter
    if (filters.travelPeriod.length > 0) {
      // This is a mock implementation
      // In a real app, you would check if the destination's travel period includes any of the selected periods
    }
    
    // Still apply the active category if it's not "all"
    if (activeCategory !== "all") {
      filtered = filtered.filter(dest => dest.category === activeCategory);
    }
    
    // Apply search query if exists
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(lowercaseQuery) || 
        dest.location.toLowerCase().includes(lowercaseQuery) ||
        dest.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredDestinations(filtered);
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
                    setFilteredDestinations(destinations);
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
                  <div key={destination.id}>
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