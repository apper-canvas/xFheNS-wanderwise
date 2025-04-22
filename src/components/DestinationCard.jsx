import { MapPin, Star, Calendar, DollarSign } from "lucide-react";

function DestinationCard({ destination, onClick }) {
  const { name, image, country, rating, type, budget, bestTime, description } = destination;
  
  return (
    <div 
      className="card card-hover cursor-pointer group h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span className="text-sm">{country}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-surface-800/90 rounded-full px-2 py-1 flex items-center">
          <Star size={14} className="text-yellow-500 mr-1" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        
        <div className="mb-3 flex flex-wrap gap-1">
          {type.map(t => (
            <span 
              key={t} 
              className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded text-xs"
            >
              {t}
            </span>
          ))}
        </div>
        
        <p className="text-surface-600 dark:text-surface-400 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="mt-auto flex justify-between text-xs text-surface-500 dark:text-surface-400">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{bestTime}</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={14} className="mr-1" />
            <span>${budget}/day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;