import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCarousel = ({ destinations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [paused, setPaused] = useState(false);

  // Calculate number of visible items based on current viewport
  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 2; // md
    return 1; // sm
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Update visible count on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide effect with pause on hover
  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, paused, destinations.length, visibleCount]);

  // Adjust currentIndex if it would result in empty spaces
  useEffect(() => {
    const maxStartIndex = Math.max(0, destinations.length - visibleCount);
    if (currentIndex > maxStartIndex) {
      setCurrentIndex(maxStartIndex);
    }
  }, [visibleCount, destinations.length, currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : destinations.length - visibleCount
    );
  };

  const handleNext = () => {
    setDirection(1);
    const maxStartIndex = Math.max(0, destinations.length - visibleCount);
    setCurrentIndex(prevIndex => 
      prevIndex < maxStartIndex ? prevIndex + 1 : 0
    );
  };

  const visibleDestinations = destinations.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  // Fill with items from the beginning if needed
  const paddedDestinations = [...visibleDestinations];
  if (paddedDestinations.length < visibleCount) {
    const neededItems = visibleCount - paddedDestinations.length;
    paddedDestinations.push(...destinations.slice(0, neededItems));
  }

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex justify-between absolute -left-4 -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={handlePrev}
          className="bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-md focus:outline-none"
          aria-label="Previous destinations"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-md focus:outline-none"
          aria-label="Next destinations"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          initial={false}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <AnimatePresence initial={false} custom={direction}>
            {paddedDestinations.map((destination, index) => (
              <motion.div
                key={`${destination.id}-${index}`}
                custom={direction}
                initial={{ 
                  opacity: 0,
                  x: direction > 0 ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1,
                  x: 0 
                }}
                exit={{ 
                  opacity: 0,
                  x: direction < 0 ? 100 : -100 
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                className={`w-full md:w-1/2 lg:w-1/4 px-3 flex-shrink-0`}
              >
                <Link 
                  to={`/destinations?destination=${encodeURIComponent(destination.name)}`}
                  className="block h-full"
                >
                  <div className="overflow-hidden rounded-lg shadow-md h-full bg-white hover:shadow-lg transition-shadow">
                    <div className="relative aspect-w-16 aspect-h-9 h-48">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                        <span className="text-yellow-500">★</span> {destination.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-blue-600" />
                        {destination.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Starting from</span>
                        <span className="text-lg font-bold">${destination.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(destinations.length / visibleCount) }).map((_, index) => {
          const isActive = Math.floor(currentIndex / visibleCount) === index;
          return (
            <button
              key={index}
              onClick={() => {
                setDirection(index > Math.floor(currentIndex / visibleCount) ? 1 : -1);
                setCurrentIndex(index * visibleCount);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                isActive ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DestinationCarousel;