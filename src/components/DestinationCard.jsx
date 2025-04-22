import { Star, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination }) => {
  const { name, image, rating, reviews, price, description } = destination;

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
          ${price}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
          <div className="flex items-center">
            <Star className="text-yellow-500 w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <MapPin className="text-gray-400 w-4 h-4" />
          <span className="ml-1 text-sm text-gray-500">{name.split(',')[1] || 'Destination'}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
          <span className="mr-1">Explore</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;