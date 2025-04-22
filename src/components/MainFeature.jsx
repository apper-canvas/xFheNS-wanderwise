import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Search, Plane, Hotel, Car, Compass, AlertCircle, Check } from "lucide-react";
import { format, addDays } from "date-fns";

const MainFeature = ({ activeTab }) => {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd"));
  const [returnDate, setReturnDate] = useState(format(addDays(new Date(), 14), "yyyy-MM-dd"));
  const [travelers, setTravelers] = useState(1);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const dropdownRef = useRef(null);
  
  const popularDestinations = {
    flights: ["New York", "Tokyo", "London", "Paris", "Sydney"],
    hotels: ["Bali", "Cancun", "Santorini", "Maldives", "Barcelona"],
    packages: ["Thailand", "Italy", "Costa Rica", "Morocco", "Japan"],
    cars: ["Los Angeles", "Miami", "Las Vegas", "Orlando", "San Francisco"]
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!destination) {
      setError("Please enter a destination");
      return;
    }
    
    const today = new Date();
    const departureDay = new Date(departureDate);
    const returnDay = new Date(returnDate);
    
    if (departureDay < today) {
      setError("Departure date cannot be in the past");
      return;
    }
    
    if (returnDay < departureDay) {
      setError("Return date must be after departure date");
      return;
    }
    
    // Clear any previous errors
    setError("");
    
    // Show loading state
    setIsSearching(true);
    setSearchResults([]);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock results based on the active tab
      const mockResults = generateMockResults(activeTab, destination);
      setSearchResults(mockResults);
      setIsSearching(false);
      
      // Show success message
      setSuccess(`Found ${mockResults.length} ${activeTab} for your search!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }, 1500);
  };
  
  const generateMockResults = (type, destination) => {
    const results = [];
    const count = Math.floor(Math.random() * 5) + 3; // 3-7 results
    
    for (let i = 0; i < count; i++) {
      if (type === "flights") {
        results.push({
          id: `flight-${i}`,
          airline: ["Air Wanderwise", "Global Airways", "Sky Express", "Horizon Air"][Math.floor(Math.random() * 4)],
          departure: format(addDays(new Date(departureDate), 0), "HH:mm"),
          arrival: format(addDays(new Date(departureDate), 0), "HH:mm"),
          duration: `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 50) + 10}m`,
          price: Math.floor(Math.random() * 500) + 200,
          stops: Math.floor(Math.random() * 2)
        });
      } else if (type === "hotels") {
        results.push({
          id: `hotel-${i}`,
          name: ["Grand Hotel", "Ocean View Resort", "City Suites", "Luxury Palace"][Math.floor(Math.random() * 4)],
          rating: (Math.random() * 2 + 3).toFixed(1),
          price: Math.floor(Math.random() * 200) + 100,
          perNight: true,
          amenities: ["Pool", "Spa", "Free WiFi", "Breakfast"]
        });
      } else if (type === "packages") {
        results.push({
          id: `package-${i}`,
          name: ["Adventure Package", "Relaxation Getaway", "Cultural Experience", "Family Fun"][Math.floor(Math.random() * 4)],
          duration: `${Math.floor(Math.random() * 7) + 3} days`,
          price: Math.floor(Math.random() * 1000) + 500,
          includes: ["Flights", "Hotel", "Activities", "Some meals"]
        });
      } else if (type === "cars") {
        results.push({
          id: `car-${i}`,
          type: ["Economy", "Compact", "SUV", "Luxury"][Math.floor(Math.random() * 4)],
          company: ["Hertz", "Avis", "Enterprise", "Budget"][Math.floor(Math.random() * 4)],
          price: Math.floor(Math.random() * 50) + 30,
          perDay: true,
          features: ["Automatic", "A/C", "GPS", "Unlimited miles"]
        });
      }
    }
    
    return results;
  };
  
  const handleDestinationSelect = (dest) => {
    setDestination(dest);
    setShowDestinationDropdown(false);
  };
  
  const handleTravelersChange = (value) => {
    if (value >= 1 && value <= 10) {
      setTravelers(value);
    }
  };
  
  // Reset form when tab changes
  useEffect(() => {
    setDestination("");
    setSearchResults([]);
    setError("");
    setSuccess("");
    setShowDestinationDropdown(false);
  }, [activeTab]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDestinationDropdown(false);
        setShowTravelersDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const renderTabIcon = () => {
    switch (activeTab) {
      case "flights":
        return <Plane size={20} />;
      case "hotels":
        return <Hotel size={20} />;
      case "packages":
        return <Compass size={20} />;
      case "cars":
        return <Car size={20} />;
      default:
        return <Search size={20} />;
    }
  };
  
  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    if (searchResults.length === 0) {
      return null;
    }
    
    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Search Results</h3>
        
        <div className="space-y-3">
          {searchResults.map((result) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              {activeTab === "flights" && (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{result.airline}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="text-lg font-semibold">{result.departure}</div>
                      <div className="text-xs text-gray-500">
                        {result.duration}
                      </div>
                      <div className="text-lg font-semibold">{result.arrival}</div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {result.stops === 0 ? "Direct" : `${result.stops} stop${result.stops > 1 ? "s" : ""}`}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-gray-900">${result.price}</div>
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm">Select</button>
                  </div>
                </div>
              )}
              
              {activeTab === "hotels" && (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{result.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span>{result.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.amenities.map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-gray-900">${result.price}</div>
                    <div className="text-sm text-gray-500">per night</div>
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm">Select</button>
                  </div>
                </div>
              )}
              
              {activeTab === "packages" && (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{result.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Duration: {result.duration}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.includes.map((item, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                          <Check size={12} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-gray-900">${result.price}</div>
                    <div className="text-sm text-gray-500">total</div>
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm">Select</button>
                  </div>
                </div>
              )}
              
              {activeTab === "cars" && (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{result.type}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {result.company}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-gray-900">${result.price}</div>
                    <div className="text-sm text-gray-500">per day</div>
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm">Select</button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div ref={dropdownRef}>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <div 
              className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-white"
              onClick={() => setShowDestinationDropdown(true)}
            >
              <span className="pl-3 text-white">
                <MapPin size={18} />
              </span>
              <input
                type="text"
                placeholder={`Where to${activeTab === "flights" ? " fly" : activeTab === "hotels" ? " stay" : activeTab === "cars" ? " pick up" : ""}`}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (e.target.value === '') {
                    setShowDestinationDropdown(true);
                  } else {
                    setShowDestinationDropdown(false);
                  }
                }}
                onFocus={() => setShowDestinationDropdown(true)}
                className="w-full bg-transparent border-0 text-white placeholder-white/70 p-3 focus:outline-none"
              />
            </div>
            
            {showDestinationDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1">
                    Popular {activeTab}
                  </div>
                  {popularDestinations[activeTab].map((dest, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDestinationSelect(dest)}
                      className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-gray-800"
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-white">
              <span className="pl-3 text-white">
                <Calendar size={18} />
              </span>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent border-0 text-white p-3 focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-white">
              <span className="pl-3 text-white">
                <Calendar size={18} />
              </span>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent border-0 text-white p-3 focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg overflow-hidden cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowTravelersDropdown(!showTravelersDropdown);
              }}
            >
              <div className="flex items-center">
                <span className="pl-3 text-white">
                  <Users size={18} />
                </span>
                <span className="p-3 text-white">
                  {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                </span>
              </div>
            </div>
            
            {showTravelersDropdown && (
              <div 
                className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-10 p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Travelers</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTravelersChange(travelers - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800"
                    >
                      -
                    </button>
                    <span className="text-gray-800 w-4 text-center">{travelers}</span>
                    <button
                      type="button"
                      onClick={() => handleTravelersChange(travelers + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg flex items-center gap-2 transition-colors"
          >
            {renderTabIcon()}
            Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>
      </form>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-red-500/80 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-green-500/80 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Check size={18} />
            {success}
          </motion.div>
        )}
      </AnimatePresence>
      
      {renderSearchResults()}
    </div>
  );
};

export default MainFeature;