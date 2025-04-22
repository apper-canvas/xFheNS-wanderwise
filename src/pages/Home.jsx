import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search, TrendingUp, Compass, Plane, Hotel, Car } from "lucide-react";
import MainFeature from "../components/MainFeature";

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://source.unsplash.com/random/1920x1080/?travel,landscape"
            alt="Travel landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-900/60 to-surface-900/30 backdrop-blur-sm"></div>
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
                        ? "bg-white text-primary font-medium"
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
      <section className="py-12 md:py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Destinations</h2>
            <a href="/destinations" className="text-primary hover:text-primary-dark flex items-center gap-1 font-medium">
              View all <span className="text-lg">→</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                whileHover={{ y: -8 }}
                className="card card-hover group"
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {destination.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    {destination.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400 text-sm">Starting from</span>
                    <span className="text-lg font-bold">${destination.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Destinations */}
      <section className="py-12 md:py-16 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <TrendingUp size={24} className="text-accent" />
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <span className="bg-accent/90 text-white px-2 py-1 rounded text-sm font-medium">
                      {destination.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;