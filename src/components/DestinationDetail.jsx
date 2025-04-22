import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Star, DollarSign, Clock, Users, Globe, Hash } from 'lucide-react';

const DestinationDetail = ({ destination, isOpen, onClose }) => {
  if (!destination) return null;
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            variants={modalVariants}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-64 object-cover object-center"
              />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white focus:outline-none"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{destination.name}</h2>
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <Star size={16} className="fill-blue-500 text-blue-500 mr-1" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-2" />
                <span>{destination.location}</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <DollarSign size={16} className="mr-1" />
                    <span className="text-sm font-medium">Price</span>
                  </div>
                  <p className="text-lg font-bold">${destination.price}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar size={16} className="mr-1" />
                    <span className="text-sm font-medium">Best Time</span>
                  </div>
                  <p className="text-lg font-medium">{destination.travelPeriod}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-lg font-medium">{destination.duration || '5-7 days'}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Globe size={16} className="mr-1" />
                    <span className="text-sm font-medium">Language</span>
                  </div>
                  <p className="text-lg font-medium">{destination.language || 'English'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">About this destination</h3>
                <p className="text-gray-600">
                  {destination.description || 'Explore this beautiful destination with its breathtaking views, rich culture, and unforgettable experiences. Perfect for travelers looking for adventure, relaxation, and authentic local experiences.'}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(destination.highlights || [
                    'Beautiful beaches and coastlines',
                    'Rich local culture and history',
                    'Delicious cuisine and food tours',
                    'Outdoor adventures and activities',
                    'Vibrant nightlife and entertainment',
                    'Historic landmarks and architecture'
                  ]).map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-100 text-blue-700 p-1 rounded mr-2 mt-0.5">
                        <Check size={14} />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {destination.activities && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Popular Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <Hash size={14} className="mr-1" />
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 font-medium"
              >
                Close
              </button>
              <a 
                href={`/booking?destination=${encodeURIComponent(destination.name)}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Book This Trip
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Check icon component for the highlights
const Check = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default DestinationDetail;