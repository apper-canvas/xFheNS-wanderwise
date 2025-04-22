import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search, TrendingUp, Compass, Plane, Hotel, Car } from "lucide-react";
import MainFeature from "../components/MainFeature";
import DestinationCarousel from "../components/DestinationCarousel";

const Home = () => {
  const [activeTab, setActiveTab] = useState("flights");
  
  const tabs = [
    { id: "flights", label: "Flights", icon: <Plane size={18} /> },
    { id: "hotels", label: "Hotels", icon: <Hotel size={18} /> },
    { id: "packages", label: "Packages", icon: <Compass size={18} /> },
    { id: "cars", label: "Car Rentals", icon: <Car size={18} /> },
  ];
  
  const popularDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image: "https://source.unsplash.com/random/600x400/?bali",
      rating: 4.8,
      price: 1299,
    },
    {
      id: 2,
      name: "Santorini, Greece",
      image: "https://source.unsplash.com/random/600x400/?santorini",
      rating: 4.9,
      price: 1599,
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      image: "https://source.unsplash.com/random/600x400/?tokyo",
      rating: 4.7,
      price: 1499,
    },
    {
      id: 4,
      name: "Paris, France",
      image: "https://source.unsplash.com/random/600x400/?paris",
      rating: 4.6,
      price: 1199,
    },
    {
      id: 5,
      name: "New York City, USA",
      image: "https://source.unsplash.com/random/600x400/?newyork",
      rating: 4.7,
      price: 1399,
    },
    {
      id: 6,
      name: "Rome, Italy",
      image: "https://source.unsplash.com/random/600x400/?rome",
      rating: 4.8,
      price: 1299,
    },
    {
      id: 7,
      name: "Dubai, UAE",
      image: "https://source.unsplash.com/random/600x400/?dubai",
      rating: 4.8,
      price: 1599,
    },
    {
      id: 8,
      name: "Sydney, Australia",
      image: "https://source.unsplash.com/random/600x400/?sydney",
      rating: 4.7,
      price: 1899,
    },
  ];
  
  const trendingDestinations = [
    {
      id: 1,
      name: "Maldives",
      image: "https://source.unsplash.com/random/300x400/?maldives",
      change: "+24%",
    },
    {
      id: 2,
      name: "Barcelona",
      image: "https://source.unsplash.com/random/300x400/?barcelona",
      change: "+18%",
    },
    {
      id: 3,
      name: "Kyoto",
      image: "https://source.unsplash.com/random/300x400/?kyoto",
      change: "+15%",
    },
  ];

  // Ensure images are preloaded
  useEffect(() => {
    const preloadImages = () => {
      const heroImage = new Image();
      heroImage.src = "https://source.unsplash.com/random/1920x1080/?travel,landscape";
      
      popularDestinations.forEach(destination => {
        const img = new Image();
        img.src = destination.image;
      });
      
      trendingDestinations.forEach(destination => {
        const img = new Image();
        img.src = destination.image;
      });
    };
    
    preloadImages();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://source.unsplash.com/random/1920x1080/?travel,landscape"
            alt="Travel landscape"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/30 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Your Perfect Journey
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Explore the world with personalized travel experiences tailored just for you.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6">
              <div className="flex overflow-x-auto scrollbar-hide space-x-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 font-medium"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <MainFeature activeTab={activeTab} />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Destinations</h2>
            <a href="/destinations" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
              View all <span className="text-lg">→</span>
            </a>
          </div>
          
          <DestinationCarousel destinations={popularDestinations} />
        </div>
      </section>
      
      {/* Trending Destinations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-600" />
              Trending Now
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl h-80 group"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <span className="bg-blue-600/90 text-white px-2 py-1 rounded text-sm font-medium">
                      {destination.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Travel Categories */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Beach Escapes", icon: "🏖️", image: "https://source.unsplash.com/random/300x300/?beach" },
              { name: "Mountain Getaways", icon: "🏔️", image: "https://source.unsplash.com/random/300x300/?mountain" },
              { name: "City Breaks", icon: "🏙️", image: "https://source.unsplash.com/random/300x300/?city" },
              { name: "Cultural Tours", icon: "🏛️", image: "https://source.unsplash.com/random/300x300/?culture" }
            ].map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="relative rounded-lg overflow-hidden h-40 md:h-56 group cursor-pointer"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <h3 className="font-semibold text-center">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Travel Inspiration</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and receive exclusive offers, travel tips, and destination inspiration.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;