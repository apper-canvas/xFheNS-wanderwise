import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ destination, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 focus:outline-none transition-colors"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : ""} />
        </button>
        {destination.isPopular && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
        {destination.discount && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {destination.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span>{destination.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{destination.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {destination.description}
        </p>
        
        {destination.travelPeriod && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Calendar size={14} className="mr-1" />
            <span>Best time: {destination.travelPeriod}</span>
          </div>
        )}
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="text-lg font-bold text-blue-600">${destination.price}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onViewDetails(destination);
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded flex items-center gap-1"
            >
              <Info size={16} />
              Details
            </button>
            <Link 
              to={`/booking?destination=${encodeURIComponent(destination.name)}`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;