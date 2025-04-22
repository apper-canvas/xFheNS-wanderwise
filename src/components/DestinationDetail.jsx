import { motion } from "framer-motion";
import { X, MapPin, Star, Calendar, DollarSign, Globe, Clock, Users, Heart, Share2, Tag } from "lucide-react";
import { format } from "date-fns";

function DestinationDetail({ destination, onClose }) {
  const {
    name,
    image,
    country,
    region,
    description,
    rating,
    budget,
    bestTime,
    type,
    duration,
    language,
    currency,
    timezone,
    activities,
    details
  } = destination;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative bg-white dark:bg-surface-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-full p-2 text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white transition-colors"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
          
          <div className="relative h-64 md:h-80">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="mr-1.5" />
                <span>{country}, {region}</span>
              </div>
              <h2 className="text-3xl font-bold">{name}</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                <Star size={16} className="mr-1.5" />
                <span className="font-medium">{rating.toFixed(1)} Rating</span>
              </div>
              
              <div className="flex items-center px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                <DollarSign size={16} className="mr-1.5" />
                <span className="font-medium">${budget}/day</span>
              </div>
              
              <div className="flex items-center px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                <Calendar size={16} className="mr-1.5" />
                <span className="font-medium">{bestTime}</span>
              </div>
            </div>
            
            <div className="flex gap-3 mb-6">
              <button className="btn-primary flex items-center gap-2">
                <Heart size={18} />
                <span>Save</span>
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-3">About {name}</h3>
                <p className="text-surface-600 dark:text-surface-300 mb-4">
                  {description}
                </p>
                <p className="text-surface-600 dark:text-surface-300">
                  {details}
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Popular Activities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-3 bg-surface-50 dark:bg-surface-800 rounded-lg"
                    >
                      <Tag className="mr-2 text-primary mt-0.5" size={18} />
                      <div>
                        <h4 className="font-medium">{activity.name}</h4>
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="card p-4">
                  <h3 className="font-bold mb-4">Destination Info</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-surface-500 dark:text-surface-400 mb-1">
                        <Tag size={14} className="mr-1.5" />
                        <span className="text-sm">Types</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {type.map(t => (
                          <span 
                            key={t} 
                            className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-surface-500 dark:text-surface-400 mb-1">
                        <Clock size={14} className="mr-1.5" />
                        <span className="text-sm">Suggested Duration</span>
                      </div>
                      <p className="font-medium">{duration}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-surface-500 dark:text-surface-400 mb-1">
                        <Globe size={14} className="mr-1.5" />
                        <span className="text-sm">Language</span>
                      </div>
                      <p className="font-medium">{language}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-surface-500 dark:text-surface-400 mb-1">
                        <DollarSign size={14} className="mr-1.5" />
                        <span className="text-sm">Currency</span>
                      </div>
                      <p className="font-medium">{currency}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-surface-500 dark:text-surface-400 mb-1">
                        <Clock size={14} className="mr-1.5" />
                        <span className="text-sm">Timezone</span>
                      </div>
                      <p className="font-medium">{timezone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 card p-4">
                  <h3 className="font-bold mb-2">Current Local Time</h3>
                  <p className="text-2xl font-mono">
                    {format(new Date(), "HH:mm")}
                  </p>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    {format(new Date(), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DestinationDetail;