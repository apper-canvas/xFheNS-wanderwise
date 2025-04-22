import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: 'all',
    price: 'all',
    activity: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDestinations = () => {
      setIsLoading(true);
      
      // Simulated API response
      const data = [
        {
          id: 1,
          name: 'Bali, Indonesia',
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          reviews: 348,
          price: 1250,
          description: 'Tropical paradise with beautiful beaches, rice terraces, and vibrant culture.',
          region: 'asia',
          activities: ['beach', 'culture', 'nature']
        },
        {
          id: 2,
          name: 'Santorini, Greece',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          reviews: 426,
          price: 1850,
          description: 'Stunning island with white-washed buildings and breathtaking sunset views.',
          region: 'europe',
          activities: ['beach', 'culture', 'romantic']
        },
        {
          id: 3,
          name: 'Kyoto, Japan',
          image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.7,
          reviews: 289,
          price: 1650,
          description: 'Ancient city with thousands of classical Buddhist temples and gardens.',
          region: 'asia',
          activities: ['culture', 'history', 'nature']
        },
        {
          id: 4,
          name: 'Machu Picchu, Peru',
          image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          reviews: 512,
          price: 2100,
          description: 'Iconic Incan citadel set against a breathtaking mountain backdrop.',
          region: 'south-america',
          activities: ['hiking', 'history', 'nature']
        },
        {
          id: 5,
          name: 'Amalfi Coast, Italy',
          image: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          reviews: 367,
          price: 1950,
          description: 'Stunning Mediterranean coastline with picturesque towns and azure waters.',
          region: 'europe',
          activities: ['beach', 'food', 'romantic']
        },
        {
          id: 6,
          name: 'Serengeti, Tanzania',
          image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          reviews: 278,
          price: 3200,
          description: 'Vast savanna plains teeming with wildlife and the annual great migration.',
          region: 'africa',
          activities: ['safari', 'nature', 'photography']
        },
        {
          id: 7,
          name: 'New York City, USA',
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.7,
          reviews: 529,
          price: 1850,
          description: 'Iconic metropolis with world-famous attractions and vibrant urban culture.',
          region: 'north-america',
          activities: ['city', 'food', 'culture']
        },
        {
          id: 8,
          name: 'Sydney, Australia',
          image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          reviews: 312,
          price: 2100,
          description: 'Harbor city known for its iconic Opera House and stunning beaches.',
          region: 'oceania',
          activities: ['beach', 'city', 'nature']
        }
      ];
      
      setDestinations(data);
      setFilteredDestinations(data);
      setIsLoading(false);
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = destinations;
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply region filter
    if (filters.region !== 'all') {
      results = results.filter(dest => dest.region === filters.region);
    }
    
    // Apply price filter
    if (filters.price !== 'all') {
      switch (filters.price) {
        case 'budget':
          results = results.filter(dest => dest.price < 1500);
          break;
        case 'moderate':
          results = results.filter(dest => dest.price >= 1500 && dest.price < 2000);
          break;
        case 'luxury':
          results = results.filter(dest => dest.price >= 2000);
          break;
        default:
          break;
      }
    }
    
    // Apply activity filter
    if (filters.activity !== 'all') {
      results = results.filter(dest => dest.activities.includes(filters.activity));
    }
    
    setFilteredDestinations(results);
  }, [searchTerm, filters, destinations]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-80 sm:h-96 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Travel destinations" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover Amazing Destinations
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-center mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore the world's most breathtaking locations and plan your next adventure
            </motion.p>
            <motion.div 
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Filter Destinations</h2>
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Results Count */}
        <div className="flex items-center mb-6">
          <MapPin className="text-blue-600 mr-2" size={20} />
          <h2 className="text-xl font-semibold">
            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
          </h2>
        </div>

        {/* Destinations Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div 
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <img 
              src="https://images.unsplash.com/photo-1580752300992-559f8e0734e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="No results found" 
              className="w-48 h-48 object-cover mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilters({ region: 'all', price: 'all', activity: 'all' });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;