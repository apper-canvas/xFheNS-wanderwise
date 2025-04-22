import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-6">
          <div className="relative w-40 h-40 mx-auto">
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                y: [0, -10, 0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
              className="absolute inset-0"
            >
              <div className="w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-xl"></div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-primary">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary gap-2">
            <Home size={18} />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-outline gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;